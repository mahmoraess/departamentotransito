const path = require("path");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

class UsuarioController {
    static async cadastrar(req, res) {
        const{ nome, email, senha} = req.body;

        const salt = bcryptjs.genSaltSync(8);
        const hashSenha = bcryptjs.hashSync(senha, salt);

        const usuario = await client.usuario.create({
            data: {
                nome,
                email,
                senha:hashSenha,
            },
        })

        res.json({
            usuarioId: usuario.id,
        });

    }

    static async login(req, res) {
        const {email, senha} = req.body;

        //Verificar se usuário existe
        const usuario = await client.usuario.findUnique({
            where: {
                email: email,
            },
        });
        if(!usuario){
            return res.json({
                msg: "Usuário não encontrado!",
            });
        }

        //Verificar se a senha está correta
        const senhaCorreta = bcryptjs.compareSync(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.json({
                msg: "Senha incorreta!",
            });
        }

        //Emitir um token 
        const token = jwt.sign({ id: usuario.id }, process.env.SENHA_SERVIDOR, {
            expiresIn: "1h",
            });  
            res.json({
                msg: "Autenticado!",
                token: token,
            })
    }

    static async verificaAutenticacao(req, res, next) {
        const authHeader = req.headers["authorization"];
        
        if(authHeader){
            const token = authHeader.split(" ")[1];

            jwt.verify(token, process.env.SENHA_SERVIDOR, (err, payload) => {
                if(err){
                    return res.json({
                        msg: "Token inválido!",
                    });
                }

                req.usuarioId = payload.id;
                next();
            });
        }else{
            
            return res.json({
            msg: "token não encontrado!"
        });
      }
    }

    static async verificaIsAdmin(req, res, next){
        if(!req.usuarioId){
            return res.json({
                msg: "Você não está autenticado!",
            });
        }

        const usuario = await client.usuario.findUnique({
            where: {
                id: req.usuarioId, 
            },
        });

        if(!usuario.isAdmin){
            return res.json({
                msg: "Acesso negado! Você não é um administrador!",
            });
        }

        next();
    }
}

module.exports = UsuarioController;
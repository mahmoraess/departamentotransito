const path = require("path");

const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

class VeiculoController{
    static async cadastrar(req, res) {

        const {modelo, placa, ano, cor} = req.body;

        const veiculo = await client.veiculo.create({data: {
            modelo,
            placa,
            ano: parseInt(ano),
            cor
        }});

        res.json({
            veiculoId: veiculo.id,
        });
    }

    static async buscarTodos(req, res) {
        const id = req.params.id;
        let veiculos;

        if(id != null){
            veiculos = await client.veiculo.findUnique({
                where: {
                    id:parseInt(id),
                },
            });
        }else{
            veiculos = await client.veiculo.findMany({});
        }

      res.json(veiculos);
    }
}

module.exports = VeiculoController;

// 1° criar o model usuario
// 2° npx prisma migrate dev --> create_usuario_model
// 3° usar o client.usuario.create ( ou .find ou .opdate)
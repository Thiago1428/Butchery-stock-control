import { FastifyInstance } from "fastify"
import { createSteak, getAllSteaks, deleteSteak, updateSteak, getSteakById } from "../controllers/steak.controllers"


export default async function steakRoutes(app: FastifyInstance){

    //CreateSteak
    app.post('/create', async (request, reply) => {
        const { name, price } = request.body as { name: string, price: number }

        try {
            const result = await createSteak(name, price)
            return reply.code(200).send(result)
        } catch (err) {
            return reply.code(500).send({ error: "Erro ao criar bife", err })
        }
    })


    //GetSteakById
    app.get('/get/:id', async (request, reply) => {
        const { id } = request.params as { id: string }

        try {
            const result = await getSteakById(Number(id))
            return reply.code(200).send(result)
        } catch (err) {
            return reply.code(500).send({ error: "Erro ao retornar bife", err })
        }
    })

    //GetAllSteaks
    app.get('/getAll', async (_, reply) => {
        try {
            const result = await getAllSteaks()
            return reply.code(200).send(result)
        } catch (err) {
            return reply.code(500).send({ error: "Erro ao retornar bifes", err })
        }
    })

    //UpdateSteak
    app.post('/update/:id', async (request, reply) => {
        const { id } = request.params as { id: string }
        const { name, price } = request.body as { name: string, price: number }

        try {
            const result = await updateSteak(Number(id), name, price)
            return reply.code(200).send(result)
        } catch (err) {
            return reply.code(500).send({ error: "Erro ao atualizar bife", err })
        }
    })

    //DeleteSteak
    app.delete('/delete/:id', async (request, reply) => {
        const { id } = request.params as { id: string }

        try {
            const result = await deleteSteak(Number(id))
            return reply.code(200).send(result)
        } catch (err) {
            return reply.code(500).send({ error: "Erro ao deletar bife", err })
        }
    })

}
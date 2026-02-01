import { FastifyInstance } from "fastify"
import { createCustomer, deleteCustomer, getCustomerById, getAllCustomers, updateCustomer } from "../controllers/customers.controller"


export default async function customersRoutes(app: FastifyInstance) {

    // CreateCustomer
    app.post('/create', {
        schema: {
            body: {
                type: 'object',
                required: ['name'],
                properties: {
                    name: { type: 'string' }
                }
            }
        }
    }, async (request, reply) => {
        const { name } = request.body as { name: string }
        try {
            const result = await createCustomer(name)
            return reply.code(201).send(result)
        } catch (err) {
            return reply.code(500).send({ error: "Erro ao criar cliente" })
        }
    })

    app.post('/update/:id', async (request, reply) => {
        const { id } = request.params as { id: string }
        const { name } = request.body as { name: string }
        try {
            const result = await updateCustomer(Number(id), name)
            return reply.code(200).send(result)
        } catch (err) {
            return reply.code(500).send({ error: "Erro ao atualizar cliente" })
        }
    })


    app.get('/get/:id', async (request, reply) => {
        const { id } = request.params as { id: string }
        try {
            const result = await getCustomerById(Number(id))
            return reply.code(200).send(result)
        } catch (err) {
            return reply.code(500).send({ error: "Erro ao retornar cliente" })
        }
    })

    // GetAllCostumers
    app.get('/getAll', async (_, reply) => {
        try {
            const result = await getAllCustomers()
            return reply.code(200).send(result)
        } catch (err) {
            return reply.code(500).send({ error: "Erro ao retornar lista de clientes" })
        }
    })


    // deleteCustomers
    app.delete("/delete/:id", async (request, reply) => {
        const { id } = request.params as { id: string }

        try {
            const result = await deleteCustomer(Number(id))
            return reply.code(200).send(result)
        } catch (err) {
            return reply.code(500).send({ error: "Erro ao deletar cliente" })
        }
    })

    // MUITO CUIDADO APAGA TODOS OS CLIENTES CADASTRADOS
    /* app.delete('/delete/all/confirm', async (_, reply) => {
        try{
            const result = await deleteAllConstumers()
            return reply.code(200).send(result)
        } catch (err){
            return reply.code(500).send({ erro: "Não foi possivel apagar todos os clientes" })
        }
    }) */
}
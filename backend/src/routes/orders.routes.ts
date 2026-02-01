import { FastifyInstance } from "fastify"
import { createOrder, deleteOrder, getAllOrders, getOrderById, getOrderByIdCustomer } from "../controllers/orders.controller"

interface createOrderProps {
    customer_id: number,
    total_value: number,
    payment_method: string,
    payment_received?: number,
    obs?: string,
    items?: Array<{ steakId: number, weight: number, subtotal: number }>
}


export default async function ordersRoutes(app: FastifyInstance) {

    //CreateOrder
    app.post('/create', {
        schema: {
            body: {
                type: 'object',
                required: ['customer_id', 'payment_method', 'total_value'],
                properties: {
                    customer_id: { type: 'integer' },
                    payment_method: { type: 'string' },
                    total_value: { type: 'number' },
                    payment_received: { type: 'number' },
                    obs: { type: 'string' },
                    created_at: { type: 'string' },
                    items: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required: ['steakId', 'weight', 'subtotal'],
                            properties: {
                                steakId: { type: 'integer' },
                                weight: { type: 'number' },
                                subtotal: { type: 'number' }
                            }
                        }
                    }
                }
            }
        }
    }, async (request, reply) => {
        const { customer_id, total_value, payment_method, payment_received, obs, items, created_at } = request.body as createOrderProps & { created_at?: string }

        try {
            const result = await createOrder({ customer_id, total_value, payment_method, payment_received, obs, items, created_at })
            return reply.code(200).send(result)
        } catch (err) {
            return reply.code(500).send({ error: "Erro ao criar pedido", err })
        }

    })

    //GetOrderByIdCustomer
    app.get('/get/customer/:id', async (request, reply) => {
        const { id } = request.params as { id: string }
        try {
            const result = await getOrderByIdCustomer(Number(id))
            return reply.code(200).send(result)
        } catch (err) {
            return reply.code(500).send({ error: "Não foi possivel retornar o pedido", err })
        }
    })


    //GetOrderById
    app.get('/get/:id', async (request, reply) => {
        const { id } = request.params as { id: string }

        try {
            const result = await getOrderById(Number(id))
            return reply.code(200).send(result)
        } catch (err) {
            return reply.code(500).send({ error: "Não foi possivel retornar o pedido", err })
        }
    })


    //GetAllOrders
    app.get('/getAll', async (_, reply) => {
        try {
            const result = await getAllOrders()
            return reply.code(200).send(result)
        } catch (err) {
            return reply.code(500).send({ message: "Erro ao retornar pedidos", err })
        }
    })


    //DeleteOrder
    app.delete('/delete/:id', async (request, reply) => {
        const { id } = request.params as { id: string }

        try {
            const result = await deleteOrder(Number(id))
            return reply.code(200).send(result)
        } catch (err) {
            return reply.code(500).send({ error: "Não foi possivel apagar o pedido", err })
        }

    })
}
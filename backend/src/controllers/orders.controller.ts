import { db } from "../config/database"


interface CreateOrderResult {
    id: number
    message: string
}

interface Order {
    id: number
    customer_id: number
    total_value: number
    payment_method: string
    payment_received: number
    obs: string | null
    created_at: string
}

interface DeleteResult {
    message: string
    deletedId: number
}

type createOrderProps = {
    customer_id: number,
    total_value: number,
    payment_method: string,
    payment_received?: number,
    obs?: string,
    created_at?: string,
    items?: Array<{ steakId: number, weight: number, subtotal: number }>
}

export function createOrder({ customer_id, total_value, payment_method, payment_received, obs, items, created_at }: createOrderProps): Promise<CreateOrderResult> {
    return new Promise((resolve, reject) => {
        const sql =
            `
            INSERT INTO orders
                (
                    customer_id,
                    total_value,
                    payment_method,
                    payment_received,
                    obs,
                    created_at
                )
                    VALUES (?,?,?,?,?,?)
        `

        db.run(sql, [customer_id, total_value, payment_method, payment_received || 0, obs || null, created_at || new Date().toISOString()], async function (err) {
            if (err) return reject(err)

            const orderId = this.lastID

            if (items && items.length > 0) {
                try {
                    await insertOrderItems(orderId, items)
                    resolve({
                        id: orderId,
                        message: "Pedido e itens criados com sucesso",
                    })
                } catch (itemErr) {
                    reject(itemErr)
                }
            } else {
                resolve({
                    id: orderId,
                    message: "Pedido criado com sucesso (sem itens)",
                })
            }
        })
    })
}

function insertOrderItems(orderId: number, items: Array<{ steakId: number, weight: number, subtotal: number }>): Promise<void> {
    return new Promise(async (resolve, reject) => {
        const insertions = items.map(item => {
            return new Promise<void>((resolveIgnore, rejectIgnore) => {
                const unitPrice = item.weight > 0 ? (item.subtotal / item.weight) : 0

                db.run(
                    `INSERT INTO order_items (order_id, steak_id, weight, unit_price, subtotal) 
                     VALUES (?, ?, ?, ?, ?)`,
                    [orderId, item.steakId, item.weight, unitPrice, item.subtotal],
                    function (err) {
                        if (err) rejectIgnore(err)
                        else resolveIgnore()
                    }
                )
            })
        })

        try {
            await Promise.all(insertions)
            resolve()
        } catch (err) {
            reject(err)
        }
    })
}

export function getOrderByIdCustomer(id: number): Promise<Order[]> {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM orders WHERE customer_id = ?`

        db.all(sql, [id], async function (err, rows: Order[]) {
            if (err) return reject(err)

            try {
                const ordersWithItems = await Promise.all(rows.map(async (order) => {
                    return new Promise<Order>((resolveItem, rejectItem) => {
                        const sqlItems = `
                            SELECT oi.*, s.name as steak_name 
                            FROM order_items oi
                            LEFT JOIN steaks s ON oi.steak_id = s.id
                            WHERE oi.order_id = ?
                        `

                        db.all(sqlItems, [order.id], (errItems, items) => {
                            if (errItems) rejectItem(errItems)
                            else resolveItem({ ...order, items } as any)
                        })
                    })
                }))
                resolve(ordersWithItems)
            } catch (error) {
                reject(error)
            }
        })
    })
}

export function getOrderById(id: number): Promise<Order & { items: any[] }> {
    return new Promise((resolve, reject) => {
        const sqlOrder = `SELECT * FROM orders WHERE id = ?`
        const sqlItems = `
            SELECT oi.*, s.name as steak_name 
            FROM order_items oi
            LEFT JOIN steaks s ON oi.steak_id = s.id
            WHERE oi.order_id = ?
        `

        db.get(sqlOrder, [id], function (err, order: Order) {
            if (err) return reject(err)
            if (!order) return reject(new Error('Pedido não encontrado'))

            db.all(sqlItems, [id], function (errItems, items) {
                if (errItems) return reject(errItems)

                resolve({
                    ...order,
                    items
                })
            })
        })
    })
}


export function getAllOrders(): Promise<Order[]> {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT o.*, c.name as customer_name 
            FROM orders o
            LEFT JOIN customers c ON o.customer_id = c.id
            ORDER BY o.created_at DESC
        `

        db.all(sql, [], async function (err, rows: any[]) {
            if (err) return reject(err)

            try {
                const ordersWithItems = await Promise.all(rows.map(async (order) => {
                    return new Promise<any>((resolveItem, rejectItem) => {
                        const sqlItems = `
                            SELECT oi.*, s.name as steak_name 
                            FROM order_items oi
                            LEFT JOIN steaks s ON oi.steak_id = s.id
                            WHERE oi.order_id = ?
                        `

                        db.all(sqlItems, [order.id], (errItems, items) => {
                            if (errItems) rejectItem(errItems)
                            else resolveItem({ ...order, items })
                        })
                    })
                }))
                resolve(ordersWithItems)
            } catch (error) {
                reject(error)
            }
        })
    })
}


export function deleteOrder(id: number): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM orders WHERE id = ?`

        db.run(sql, [id], function (err) {
            if (err) {
                reject(err)
            } else {
                if (this.changes === 0) {
                    reject(new Error('Pedido não encontrado'))
                } else {
                    resolve({
                        message: "Pedido deletado com sucesso",
                        deletedId: id
                    })
                }
            }
        })

    })
}
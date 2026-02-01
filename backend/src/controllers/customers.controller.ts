import { db } from "../config/database"

interface CreateCustomerResult {
    id: number
    name: string
}

interface Customer {
    id: number
    name: string
    orders_count?: number
    total_spent?: number
}

interface DeleteResult {
    message: string
    deletedCount: number
}

export function createCustomer(name: string): Promise<CreateCustomerResult> {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO customers (name) VALUES (?)`

        db.run(sql, [name || null], function (err) {
            if (err) {
                reject(err)
            }
            else {
                resolve({
                    id: this.lastID,
                    name,
                })
            }
        })
    })
}

export function getCustomerById(id: number): Promise<Customer> {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                c.*, 
                COUNT(o.id) as orders_count,
                COALESCE(SUM(o.total_value), 0) as total_spent
            FROM customers c
            LEFT JOIN orders o ON c.id = o.customer_id
            WHERE c.id = ?
            GROUP BY c.id
        `

        db.get(sql, [id], (err, row: Customer) => {
            if (err) reject(err)
            else resolve(row)
        })
    })
}

export function updateCustomer(id: number, name: string): Promise<Customer> {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE customers SET name = ? WHERE id = ?`

        db.run(sql, [name, id], function (err) {
            if (err) reject(err)
            else resolve({ id, name })
        })
    })
}

export function getAllCustomers(): Promise<Customer[]> {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                c.*, 
                COUNT(o.id) as orders_count,
                COALESCE(SUM(o.total_value), 0) as total_spent
            FROM customers c
            LEFT JOIN orders o ON c.id = o.customer_id
            GROUP BY c.id
        `

        db.all(sql, [], (err, rows: Customer[]) => {
            if (err) reject(err)
            else resolve(rows)
        })
    })
}



export function deleteCustomer(id: number): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM customers WHERE id = ?`

        db.run(sql, [id], function (err) {
            if (err) {
                reject(err)
            } else {
                if (this.changes === 0) {
                    reject(new Error('Cliente não encontrado'))
                } else {
                    resolve({
                        message: 'Cliente deleteado com sucesso',
                        deletedCount: this.changes
                    })
                }
            }
        })

    })
}


// Caso queira apagar tudo
export function deleteAllConstumers(): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM customers`

        db.run(sql, [], function (err) {
            if (err) reject(err)
            else resolve({
                message: "Tudo apagado",
                deletedCount: this.changes
            })
        })
    })
} 

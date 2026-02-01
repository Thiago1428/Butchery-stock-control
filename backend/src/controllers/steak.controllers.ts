import { db } from "../config/database"


export function createSteak(name: string, price: number){
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO steaks (name, price)
            VALUES (?, ?)
        `

        db.run(sql, [name, price], function(err){
            if(err) reject(err)
            resolve({ id: this.lastID, name, price })
        })
    })
}

export function getSteakById(id: number){
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT * FROM steaks WHERE id = ?
        `

        db.get(sql, [id], (err, row) => {
            if(err) reject(err)
            resolve(row)
        })
    })
}

export function getAllSteaks(){
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT * FROM steaks
        `

        db.all(sql, [], (err, rows) => {
            if(err) reject(err)
            resolve(rows)
        })
    })
}

export function updateSteak(id: number, name: string, price: number){
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE steaks SET name = ?, price = ? WHERE id = ?
        `

        db.run(sql, [name, price, id], function(err){
            if(err) reject(err)
            resolve({ id, name, price })
        })
    })
}

export function deleteSteak(id: number){
    return new Promise((resolve, reject) => {
        const sql = `
            DELETE FROM steaks WHERE id = ?
        `

        db.run(sql, [id], function(err){
            if(err) reject(err)
            resolve({ id })
        })
    })
}
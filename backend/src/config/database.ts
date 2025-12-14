import sqlite3  from "sqlite3"

export const db = new sqlite3.Database("./backend/src/data/butchery.db")

export function initializeDatabase(){
    

    db.run(`
            CREATE TABLE IF NOT EXISTS customers(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL
            )
        `, (err) =>{
            if(err) console.error("Erro ao criar tabela customers: ", err)
        }
    )

    db.run(`
            CREATE TABLE IF NOT EXISTS orders(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                customer_id INTEGER NOT NULL,
                total_value REAL NOT NULL,
                payment_method TEXT NOT NULL,
                payment_received REAL DEFAULT 0,
                obs TEXT,
                created_at DATETIME DEFAULT (datetime('now', 'localtime')),
                FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
            )
        `, (err) =>{
            if(err) console.error("Erro ao criar tabela orders: ", err)
        }
    )

    db.run(`
            CREATE TABLE IF NOT EXISTS order_items(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                order_id INTEGER NOT NULL,
                steak_id INTEGER NOT NULL,
                weight REAL NOT NULL,
                unit_price REAL NOT NULL,
                subtotal REAL NOT NULL,
                FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
                FOREIGN KEY (steak_id) REFERENCES steaks(id)
            )
        `, (err) =>{
            if(err) console.error("Erro ao criar tabela order_items: ", err)
        }
    )


    db.run(`
            CREATE TABLE IF NOT EXISTS steaks(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price REAL NOT NULL
            )
        `, (err) =>{
            if(err) console.error("Erro ao criar tabela steaks: ", err)
            else console.log("Todas as tabelas criadas com sucesso")
        }
    )

    
    
}

// CUIDADO: Apaga TODAS as tabelas e recria
export function dropAllTables() {
    db.run(`DROP TABLE IF EXISTS order_items`, (err) => {
        if(err) console.error("Erro ao dropar order_items:", err)
    })
    
    db.run(`DROP TABLE IF EXISTS orders`, (err) => {
        if(err) console.error("Erro ao dropar orders:", err)
    })
    
    db.run(`DROP TABLE IF EXISTS customers`, (err) => {
        if(err) console.error("Erro ao dropar customers:", err)
    })
    
    db.run(`DROP TABLE IF EXISTS steaks`, (err) => {
        if(err) console.error("Erro ao dropar steaks:", err)
        else {
            console.log("✅ Todas as tabelas foram deletadas")
            initializeDatabase()
        }
    })
}

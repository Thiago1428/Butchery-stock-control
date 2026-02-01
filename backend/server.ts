import { fastify } from "fastify"
import cors from "@fastify/cors"
import { dropAllTables, initializeDatabase } from "./src/config/database"
import customersRoutes from "./src/routes/customers.routes"
import ordersRoutes from "./src/routes/orders.routes"
import steakRoutes from "./src/routes/steak.routes"


const app = fastify()
app.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
})

initializeDatabase()

app.register(customersRoutes, { prefix: '/customers' })
app.register(ordersRoutes, { prefix: "/orders" })
app.register(steakRoutes, { prefix: "/steaks" })

app.get("/", () => {
    return "Hello world"
})

app.get("/drop", () => {
    dropAllTables()
    return "Droped all tables :)"
})


app.listen({ port: 3333 }).then(() => {
    console.log("Backend Online")
    console.log("Na porta: 3333")
})


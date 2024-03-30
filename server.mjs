import express from "express"
import cors from "cors"
import "./Config/database.mjs"
    
const app = express()

app.use(cors({
    origin: "*",
    methods: "*"
}))
app.use(express.json())

app.listen(process.env.PORT || 5001, () => {
    console.log(`Running server`)
})
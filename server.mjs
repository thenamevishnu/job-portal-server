import express from "express"
import cors from "cors"
import "./Config/database.mjs"
import userRoute from "./Routes/user.route.mjs"
import jobRoute from "./Routes/job.route.mjs"
import statusRoute from "./Routes/status.route.mjs"
import cron from "node-cron"
import axios from "axios"
    
const app = express()

app.use(cors({
    origin: "*",
    methods: "*"
}))
app.use(express.json())

// cron job added to prevent Instance spin down with inactivity

cron.schedule("* * * * *", async () => {
    axios.get(`${process.env.SERVER}/status/v1`).then(({ data }) => {
        console.log(data.message)
    }).catch(err => {
        console.log(err.message)
    })
})

app.use("/status", statusRoute)
app.use("/user", userRoute)
app.use("/job", jobRoute)

app.listen(process.env.PORT || 5001, () => {
    console.log(`Running server`)
})
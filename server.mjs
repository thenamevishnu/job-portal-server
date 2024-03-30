import express from "express"
import cors from "cors"
import "./Config/database.mjs"
import userRoute from "./Routes/user.route.mjs"
import jobRoute from "./Routes/job.route.mjs"
    
const app = express()

app.use(cors({
    origin: "*",
    methods: "*"
}))
app.use(express.json())

app.use("/user", userRoute)
app.use("/job", jobRoute)

app.listen(process.env.PORT || 5001, () => {
    console.log(`Running server`)
})
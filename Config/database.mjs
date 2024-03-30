import { connect } from "mongoose";

connect(process.env.DB_URL).then(() => {
    console.log("Database connected")
}).catch(err => {
    console.log(err.message)
})
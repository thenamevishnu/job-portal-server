import { Schema, model } from "mongoose"

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRBqTeY-dTImnv-0qS4j32of8dVtWelSEMw&s"
    }
},{
    timestamps: true
})

export const userDB = model("users", userSchema)
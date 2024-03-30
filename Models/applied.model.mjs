import { Schema, Types, model } from "mongoose"

const applied = new Schema({
    user_id:{
        type: Types.ObjectId,
        required: true
    },
    job_id: {
        type: Types.ObjectId,
        required: true
    },
    resume: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    coverletter: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

export const applyDB = model("applications", applied)
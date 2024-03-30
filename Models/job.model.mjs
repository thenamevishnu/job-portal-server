import { Schema, Types, model } from "mongoose"

const jobSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    responsibilities: {
        type: String,
        required: true
    },
    qualifications:{
        type: String,
        required: true
    },
    pending: {
        type: Array,
        default: []
    },
    accepted: {
        type: Array,
        default: []
    },
    rejected: {
        type: Array,
        default: []
    },
    postedBy: {
        type: Types.ObjectId,
        required: true
    }
},{
    timestamps: true
})

export const jobDB = model("jobs", jobSchema)
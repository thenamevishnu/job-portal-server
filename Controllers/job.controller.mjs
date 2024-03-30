import { Types } from "mongoose"
import { jobDB } from "../Models/job.model.mjs"
import { applyDB } from "../Models/applied.model.mjs"

const postJob = async (req, res) => {
    try{
        const postData = req.body
        const response = await jobDB.create(postData)
        if(response._id){
            return res.status(201).send({status: "OK", message: "job created"})
        }
        return res.status(500).send({message: "Something went wrong"})
    }catch(err){
        console.log(err.message)
        return res.status(500).send({message: "Internal server error"})
    }
}

const getJobs = async (req, res) => {
    try {
        const { filter, page } = req.query
        const skip = page * 3 - 3
        const regexp = new RegExp(`${filter}`,`i`)
        let obj = {}
        if (filter) {
            obj = {$or:[{title: {$regex: regexp}, description: {$regex: regexp}}]}
        }
        const response = await jobDB.find(obj).skip(skip).limit(3)
        const total = await jobDB.countDocuments(obj)
        if (Array.isArray(response)) {
            return res.status(200).send({ result: response, pages: Math.ceil(total/3)})
        } else {
            return res.status(500).send({ message: "Something went wrong"})
        }
    }catch(err){
        return res.status(500).send({message: "Internal server error"})
    }
}

const getJobWithId = async (req, res) => {
    try {
        const { job_id } = req.params
        const response = await jobDB.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(job_id)
                }
            }, {
                $lookup: {
                    from: "users",
                    localField: "postedBy",
                    foreignField: "_id",
                    as: "posted"
                }
            }

        ])
        console.log(response);
        if(response.length > 0){
            return res.status(200).send({ result: response[0] })
        }
        return res.status(500).send({ message: "Something went wrong"})
    }catch(err){
        return res.status(500).send({message: "Internal server error"})
    }
}

const applyJob = async (req, res) => {
    try {
        const { user_id, job_id, userForm } = req.body
        console.log(await jobDB.updateOne({ _id: new Types.ObjectId(job_id) }, {
            $addToSet:{
                pending: new Types.ObjectId(user_id)
            }
        }))
        userForm.job_id = job_id
        userForm.user_id = user_id
        await applyDB.create(userForm)
        return res.status(200).send({ status: "OK", message: "updated"})
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({message: "Internal server error"})
    }
}

export default { postJob, getJobs, getJobWithId, applyJob }
import { userDB } from "../Models/user.model.mjs"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Types } from "mongoose"

const createNewAccount = async (req, res) => {
    try{
        const {confirm, ...userData} = req.body
        const obj = {}
        const usernameMatch = await userDB.findOne({username: userData.username})
        if (usernameMatch) {
            return res.status(409).send({message: "Username already exist"})
        }
        const emailMatch = await userDB.findOne({email: userData.email})
        if(emailMatch){
            return res.status(409).send({message: "Email already exist"})
        }
        userData.password = await bcrypt.hash(userData.password, 10)
        const response = await userDB.create(userData)
        if(response._id){
            obj.statusCode = 200
            obj.message = "Account created"
            const token = jwt.sign({sub: response._id}, process.env.JWT_KEY, {expiresIn: "3d"})
            obj.userData = {
                id: response._id,
                name: response.name,
                username: response.username,
                picture: response.picture,
                type: response.type,
                email: response.email,
                token: token
            }
            return res.status(201).send({ result: obj, message: "new user created" })
        }
        return res.status(500).send({ message: "Something went wrong" })
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: "Internal server error" })
    }
}

const userLogin = async (req, res) => {
    try{
        const {email, password} = req.query
        const obj = {}
        const emailMatch = await userDB.findOne({email: email})
        if (!emailMatch) {
            return res.status(404).send({ message: "User not found" })
        }
        const passwordMatch = await bcrypt.compare(password, emailMatch.password)
        if (!passwordMatch) {
            return res.status(404).send({ message: "Invalid login credentials" })
        }
        const token = jwt.sign({sub: emailMatch._id}, process.env.JWT_KEY, {expiresIn: "3d"})
        obj.userData = {
            id: emailMatch._id,
            name: emailMatch.name,
            username: emailMatch.username,
            picture: emailMatch.picture,
            type: emailMatch.type,
            email: emailMatch.email,
            token: token
        }
        return res.status(200).send({ result: obj, message: "logged in" })
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: "Internal server error" })
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await userDB.findOne({ _id: id })
        return res.status(200).send({ result: user })
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: "Internal server error" })
    }
}

export default { createNewAccount, userLogin, getUser}
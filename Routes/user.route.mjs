import { Router } from "express"
import userController from "../Controllers/user.controller.mjs"
import { Auth } from "../Middleware/Auth.mjs"

const app = Router()

app.post("/register", userController.createNewAccount)
app.get("/login", userController.userLogin)
app.get("/info/:id", Auth, userController.getUser)

export default app
import { Router } from "express"
import statusController from "../Controllers/status.controller.mjs"

const app = Router()

app.get("/v1", statusController.status)

export default app
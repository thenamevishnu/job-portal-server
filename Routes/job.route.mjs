import { Router } from "express"
import jobController from "../Controllers/job.controller.mjs"
import { Auth } from "../Middleware/Auth.mjs"

const app = Router()

app.post("/create", Auth, jobController.postJob)
app.get("/get-jobs", Auth, jobController.getJobs)
app.get("/single/:job_id", Auth, jobController.getJobWithId)
app.post("/apply", Auth, jobController.applyJob)
app.get("/applied-list", Auth, jobController.getAppliedList)

export default app
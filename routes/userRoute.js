import express from "express"
import { newListItemController } from "../controllers/listControllers.js"
// import { requireSignIn } from "../middlewares/authMiddlewares"

const router = express.Router()

router.post("/list", newListItemController)
// router.post("/list", requireSignIn,newListItemController)

export default router

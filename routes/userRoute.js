import express from "express"
import { getAllListController, newListItemController } from "../controllers/listControllers.js"
// import { requireSignIn } from "../middlewares/authMiddlewares"

const router = express.Router()

router.post("/list", newListItemController)
router.get("/:userId", getAllListController)
// router.post("/list", requireSignIn,newListItemController)

export default router

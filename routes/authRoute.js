import express from "express"
import { forgotPasswordController, loginController, registerController } from "../controllers/authController.js"
import { requireSignIn } from "../middlewares/authMiddlewares.js"
const router = express.Router()

router.post("/register", registerController)

router.post("/login", loginController)

router.post("/forgot-password", forgotPasswordController)
// router.post("/login", loginController)

router.get("/user-auth", requireSignIn, (req, res) => {
	res.status(200).send({ ok: true })
})

export default router

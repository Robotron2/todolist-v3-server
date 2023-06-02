import { User } from "../model/userModel.js"
import bcrypt from "bcrypt"

const saltRounds = 10

export const registerController = async (req, res) => {
	try {
		const { name, email, password, answer } = req.body

		await User.findOne({ email }).then((existingUser) => {
			if (existingUser) {
				res.status(200).send({
					success: false,
					message: "Already registered! Please login"
				})
			} else {
				bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
					const newUser = await new User({
						name,
						email,
						password: hashedPassword,
						answer
					}).save()
					res.status(201).send({
						success: true,
						message: "User saved successfully",
						newUser
					})
				})
			}
		})
	} catch (error) {
		console.log(error)
		res.status(500).send({
			success: false,
			message: "Error in registration",
			error
		})
	}
}

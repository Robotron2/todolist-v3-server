import { User } from "../model/userModel.js"
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
import _ from "lodash"

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
						name: _.upperFirst(name),
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

export const loginController = async (req, res) => {
	try {
		const { email, password } = req.body
		User.findOne({ email })
			.then(async (user) => {
				if (user) {
					bcrypt.compare(password, user.password, async (err, result) => {
						if (!result) {
							return res.status(200).send({
								success: false,
								message: "Invalid Password."
							})
						} else {
							let token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
							res.status(200).send({
								success: true,
								message: "Logged in successfully",
								user: { _id: user._id, name: user.name, email: user.email },
								token
							})
						}
					})
				} else {
					return res.status(404).send({
						success: false,
						message: "Email is not registered."
					})
				}
			})
			.catch((err) => {
				console.log(err)
			})
	} catch (error) {
		console.log(error)
		res.status(500).send({
			success: false,
			message: "Error in login",
			error
		})
	}
}

export const forgotPasswordController = async (req, res) => {
	try {
		const { email, answer, newPassword } = req.body
		await User.findOne({ email, answer }).then((user) => {
			if (!user) {
				return res.status(404).send({
					success: false,
					message: "Wrong email or answer"
				})
			} else {
				bcrypt.hash(newPassword, saltRounds, async (err, hashedPassword) => {
					await User.findByIdAndUpdate(user._id, { password: hashedPassword }).then(async () => {
						await res.status(200).send({
							success: true,
							message: "Passord reset successfully"
						})
					})
				})
			}
		})
	} catch (error) {
		console.log(error)
	}
}

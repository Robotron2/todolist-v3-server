import mongoose from "mongoose"
import { Item, User } from "../model/userModel.js"

export const newListItemController = async (req, res) => {
	const { newItem, userId } = req.body

	let todoItem = new Item({
		name: newItem,
		_id: Math.floor(Math.random() * 84600)
	})

	await User.findById(userId)
		.then(async (user) => {
			user.userTodo.push(todoItem)
			let todoArray = user.userTodo
			await user.save().then(() => {
				console.log("Updated successfully.")
				res.status(201).send({
					success: true,
					message: "Updated successfully.",
					todoArray
				})
			})
		})
		.catch((err) => {
			console.log(err)
			res.status(500).send({
				success: false,
				message: "Internal server error. Contact us if you see this."
			})
		})
}

export const getAllListController = async (req, res) => {
	try {
		let user = await User.findById(req.params.userId)
		let todoArray = user.userTodo
		res.status(200).send({
			success: true,
			todoArray
		})
		console.log(user)
	} catch (error) {
		console.log(error)
		res.status(500).send({
			success: false,
			message: "Internal server error. Contact us if you see this."
		})
	}
}

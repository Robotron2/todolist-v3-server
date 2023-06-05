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
		})
}

import mongoose from "mongoose"

const itemsSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		_id: Number
	},
	{ timestamps: true }
)

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			unique: true,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		answer: {
			type: String,
			required: true
		},
		userTodo: [itemsSchema]
	},
	{ timestamps: true }
)

export const User = mongoose.model("user", userSchema)

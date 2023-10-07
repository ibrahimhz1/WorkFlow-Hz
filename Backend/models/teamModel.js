const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
	orgId: {
		type: mongoose.Schema.ObjectId,
		ref: "Organisation",
		required: true
	},
	projectId: {
		type: mongoose.Schema.ObjectId,
		ref: "Project",
		required: true
	},
	teamId: {
		type: String,
		required: true,
		validate: {
			validator: async function (teamId) {
				const team = await this.constructor.findOne({ teamId });
				return !team; // Return true if userId is unique, false otherwise
			},
			message: "userId must be unique",
		},
	},
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
	},
	teamLeader: {
		type: String,
		required: true
	},
	members: [
		{
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: true
		}
	],
	createdAt: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model("Team", teamSchema);
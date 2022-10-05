const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		userName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		registrationTime: { type: String },
		lastLoginTime: { type: String },
		activeStatus: { type: Boolean, default: true },
	},
	{
		collection: 'userData',
	}
);

const model = mongoose.model('User', userSchema);

module.exports = model;

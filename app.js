const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
let port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

app.post('/api/register', async (req, res) => {
	console.log(req.body);
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10);
		const time = new Date().toLocaleString();
		await User.create({
			userName: req.body.userName,
			email: req.body.email,
			password: newPassword,
			registrationTime: time,
		});
		res.json({ status: 'ok' });
	} catch (err) {
		res.json({ status: 'error', error: 'duplicated email' });
	}
});

app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	});

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	);

	if (isPasswordValid) {
		const token = jwt.sign(
			{ userName: user.userName, email: user.email },
			'secret123'
		);
		const time = new Date().toLocaleString();
		await User.updateOne(
			{ email: user.email },
			{ $set: { lastLoginTime: time } }
		);

		res.json({ status: 'ok', user: token });
	} else {
		res.json({ status: 'error', user: false });
	}
});

app.get('/api/getUsers', (req, res) => {
	User.find({}, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.json(result);
		}
	});
});

app.post('/api/deleteUser', (req, res) => {
	const userList = req.body.checkedUsers;
	console.log(userList);
	const query = { _id: { $in: userList } };
	User.deleteMany(query, function (err, result) {
		if (err) console.log(err);
		else {
			console.log(res.json(result));
		}
	});
});

app.post('/api/blockUser', (req, res) => {
	const userList = req.body.checkedUsers;
	console.log(userList);
	const query = { _id: { $in: userList } };
	User.updateMany(
		query,
		{ $set: { activeStatus: false } },
		function (err, result) {
			if (err) console.log(err);
			else {
				console.log(res.json(result));
			}
		}
	);
});

app.post('/api/unblockUser', (req, res) => {
	const userList = req.body.checkedUsers;
	console.log(userList);
	const query = { _id: { $in: userList } };
	User.updateMany(
		query,
		{ $set: { activeStatus: true } },
		function (err, result) {
			if (err) console.log(err);
			else {
				console.log(res.json(result));
			}
		}
	);
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	// const path =
}

app.listen(port, () => {
	console.log(`Server running on port ${port}.`);
});

import db from "../../database/db.js";
import bcrypt from "bcrypt";
import jwtGenerator from "../utils/jwtGenerator.js";

const userControllers = {
	registerUser: async (req, res, next) => {
		console.log(`made it to registerController`);

		const { user_name, email, password_hash, role, cohort_id } = req.body;

		try {
			const user = await db.query(
				"SELECT * FROM users WHERE email = $1",
				[email]
			);

			if (user.rows.length > 0) {
				return res.status(401).send("User already exists");
			}

			const saltRounds = 10;
			const salt = await bcrypt.genSalt(saltRounds);
			const bcryptPassword = await bcrypt.hash(password_hash, salt);

			const newPassword = {
				hash: bcryptPassword,
			};

			const newUser = await db.query(
				"INSERT INTO users (user_name, email, password_hash, role, cohort_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
				[user_name, email, newPassword, role, cohort_id]
			);

			const token = jwtGenerator(newUser.rows[0].user_id);

			res.json(token);
		} catch (err) {
			console.error("Error", err);
			next(err);
		}
	},

	loginUser: async (req, res, next) => {
		console.log("Made it to loginController");

		const { email, password_hash } = req.body;

		try {
			const user = await db.query(
				"SELECT * FROM users WHERE email = $1",
				[email]
			);

			if (user.rows.length < 1) {
				return res.status(404).send("User does not exist");
			}

			const validPassword = await bcrypt.compare(
				password_hash,
				user.rows[0].password_hash.hash
			);

			if (!validPassword) {
				return res.status(401).send("Password or Username incorrect");
			}

			const token = jwtGenerator(user.rows[0].user_id);

			res.json({ token });
		} catch (err) {
			console.error("Error", err);
			next(err);
		}
	},

	verifyUser: async (req, res, next) => {
		console.log("made it to verifyUser");
		try {
			res.json(true);
		} catch (err) {
			console.error("Error", err);
			next(err);
		}
	},

	changePassword: async (req, res, next) => {
		console.log("made it to changePassword");
		const user_id = req.params.id
		const {oldPassword, newPassword } = req.body;

		try {
			const user = await db.query(
				"SELECT * FROM users WHERE user_id = $1",
				[user_id]
			);

			if (user.rows.length < 1) {
				return res.status(404).send("User does not exist");
			}

			const validPassword = await bcrypt.compare(
				oldPassword,
				user.rows[0].password_hash.hash
			);

			if (!validPassword) {
				return res.status(401).send("Password incorrect");
			}

			const saltRounds = 10;
			const salt = await bcrypt.genSalt(saltRounds);
			const bcryptPassword = await bcrypt.hash(newPassword, salt);

			const updatedPassword = {
				hash: bcryptPassword,
			};

			const updatedUser = await db.query(
				"UPDATE users SET password_hash = $1 WHERE user_id = $2 RETURNING *",
				[updatedPassword, user_id]
			);

			res.status(200).send("Password updated successfully");
		} catch (err) {
			console.error("Error", err);
			next(err);
		}
	},
};

export default userControllers;

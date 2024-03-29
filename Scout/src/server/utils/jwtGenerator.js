/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//This function takes in a user_id and returns a token.

const jwtGenerator = (user_id) => {
	const payload = {
		user: {
			id: user_id,
		},
	};

	return jwt.sign(payload, process.env.secret);
};

export default jwtGenerator;
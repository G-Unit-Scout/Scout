import db from "../../database/db.js";
import bcrypt from "bcrypt";
import jwtGenerator from "../utils/jwtGenerator.js";

const userControllers = {

    registerUser: async (err, req, res, next) => {
        
		const { user_name, email, password_hash, role, cohort_id } = req.body;

		try {
			const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

			if (user.rows.length > 0) {
				return res.status(401).send("User already exists");
			}

			const saltRounds = 10;
			const salt = await bcrypt.genSalt(saltRounds);
			const bcryptPassword = await bcrypt.hash(password_hash, salt);

			const newUser = await db.query(
				"INSERT INTO users (user_name, email, password_hash, role, cohort_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [user_name, email, bcryptPassword, role, cohort_id]
            );

            const token = jwtGenerator(newUser.rows[0].user_id);

            res.json(token);
            
		} catch (err) {
			console.err("Error", err);
			next(err);
		}
    },
    
    loginUser: async (err, req, res, next){
        
        const { email, password_hash } = req.body;

        try {
            const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

            if (user.rows.length < 1) {
                return res.status(404).send("User does not exist");
            };

            const validPassword = await bcrypt.compare(password_hash, user.rows[0].password_hash);

            if (!validPassword) {
                return res.status(401).send("Password or Username incorrect");
            };

            const token = jwtGenerator(user.rows[0].user_id);

            res.json({ token });

        } catch (err) {
            console.error("Error", err);
            next(err);
        }
    },

    verifyUser: async (err, req, res, next) => {
        
        try {
            res.json(true);

        } catch (err) {
            console.error("Error", err);
            next(err);
        };
    }
};

export default userControllers;

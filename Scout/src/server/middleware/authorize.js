import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authorize = async (req, res, next) => {

    try {

        const { token } = req.headers;

        if(!token) {
            return res.status(403).send("Not Authorized");
        };

        const payload = jwt.verify(token, process.env.secret);

        req.user = payload.user;

        next();

    } catch (err) {
        console.error("Error", err);
        return res.status(403).send("Not Authorized");
    }
};

export default authorize;
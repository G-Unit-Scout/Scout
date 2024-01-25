/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authorize = async (req, res, next) => {
    console.log('/api/verify hit');
    const { token } = req.headers;

    //Tokens must be sent in the headers.
    //Header name is "token"
    //Header value is the token itself in a non-stringified format. ( no quotes )
    
    try {
    
        console.log(token);

        if(!token) {
            return res.status(403).send("Not Authorized");
        }

        const payload = jwt.verify(token, process.env.secret);

        req.user = payload.user;

        next();

    } catch (err) {
        console.error("Error", err);
        return res.status(403).send("Not Authorized");
    }
};

export default authorize;
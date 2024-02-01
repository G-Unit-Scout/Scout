
export default function ValidInfo(req, res, next) {
    console.log('made it To Valid Info');
    const { email, password_hash } = req.body;
    console.log(req.body)
    function validEmail(userEmail) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if (req.path === "/register") {

        if (![email, password_hash].every(Boolean)) {
            return res.status(401).json("Missing Credentials");

        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }

    } else if (req.path === "/login") {

        if (![email, password_hash].every(Boolean)) {
            return res.status(401).json("Missing Credentials");

        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    }

    next();
}
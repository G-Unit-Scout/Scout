
const adminControllers = {

    testRoute: async (req, res, next) => {

        console.log('Made it to testRoute');

        try {
            
            res.json(req.user);

        } catch (err) {

            console.error(err.message);
            res.status(500).send('server error for admin get route')
        }
    }
};

export default adminControllers;
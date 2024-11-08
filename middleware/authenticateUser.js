

//Middleware to simulate JWT authentication
module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Simulating token retrieval

    if (token && users[token]) {
        req.userId = users[token].userId; // Attach userId to the request
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

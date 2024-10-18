// Hardcoded user data
const users = {
    token1: { userId: 'user1', email: 'user1@example.com', role: 'volunteer' },
    token2: { userId: 'user2', email: 'user2@example.com', role: 'volunteer' },
};

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

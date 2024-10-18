// Hardcoded notification data
let notifications = [
    { id: '1', userId: 'user1', message: 'Event A is coming soon!', isRead: false, timestamp: Date.now() },
    { id: '2', userId: 'user1', message: 'Your profile was updated successfully.', isRead: false, timestamp: Date.now() },
    { id: '3', userId: 'user2', message: 'Event B has been canceled.', isRead: false, timestamp: Date.now() },
];

// Function to get notifications for a user
exports.getNotifications = (req, res) => {
    const userId = req.userId; // Assuming you get userId from JWT
    const userNotifications = notifications.filter(notification => notification.userId === userId);
    res.json(userNotifications);
};

// Function to mark notifications as read
exports.markAsRead = (req, res) => {
    const notificationId = req.params.id;
    const notification = notifications.find(n => n.id === notificationId);

    if (notification) {
        notification.isRead = true;
        res.json({ message: 'Notification marked as read' });
    } else {
        res.status(404).json({ error: 'Notification not found' });
    }
};

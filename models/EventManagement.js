// Switch to the volunteer database (will create it if it doesn’t exist)
volunteerDB;

// 1. Skills Collection
db.Skills.createIndex({ skill_name: 1 }, { unique: true });
db.Skills.insertMany([
    { skill_name: 'Programming' },
    { skill_name: 'Design' },
    { skill_name: 'Marketing' },
    { skill_name: 'Management' },
    { skill_name: 'Communication' }
]);

// 2. Volunteers Collection (References skills with skill_id array)
db.Volunteers.insertOne({
    name: "John Doe",
    email: "john@example.com",
    skills: [
        { skill_id: ObjectId("SkillObjectID1"), skill_name: "Programming" },
        { skill_id: ObjectId("SkillObjectID2"), skill_name: "Design" }
    ]
    // other volunteer fields as needed
});

// 3. Events Collection (Embedded requirements as an array of strings)
db.Events.insertOne({
    event_name: "Community Clean-up",
    date: ISODate("2024-11-10"),
    requirements: ["Physical Stamina", "Teamwork"],
    // other event fields as needed
});

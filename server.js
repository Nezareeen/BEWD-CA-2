const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 7868;

app.use(express.json());

const users = [
    { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
    { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
    { id: 3, name: 'Charlie', age: 35, email: 'charlie@example.com' }
];

app.get('/users', (req, res) => {
    try {
        const userId = parseInt(req.query.id);
        if (!userId) {
            return res.status(400).send("User ID is required");
        }
        
        const user = users.find(u => u.id === userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        
        res.status(200).send({message: "User found", user: user});
    } catch (error) {
        console.log("Something went wrong", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/', (req,res) => {
    try {
        res.status(200).send("Server is running successfully!");
    } catch (error) {
        console.log("Something went wrong", error);
        res.status(500).send("Internal Server Error");
    }
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Successfully connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    })
});
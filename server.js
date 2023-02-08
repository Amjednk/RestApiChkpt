const express = require("express");
const mongoose = require("mongoose");
const TODOS = require("./models/todo");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({path:"./config/.env"});
mongoose.set("strictQuery", false);
const app = express();
app.use(express.json());

const bodyParser = require("body-parser");
app.use(bodyParser.json())

app.use(cors());

mongoose.connect(process.env.DBURL, () => {
    console.log("DB Connected");
});

app.post("/todos", async (req, res) => {
    try {
    const todos = await TODOS.create(req.body);
    res.json(todos);
    } catch (error) {
    console.log(error);
    }
});
app.get("/todos", async (req, res) => {
    try {
    const todos = await TODOS.find();
    res.json(todos);
    } catch (error) {
    console.log(error);
    }
});

app.put("/todos/:id", async (req, res) => {
    try {
    const updatedTodo = await TODOS.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updatedTodo);
    } catch (error) {
    console.log(error);
    }
});

app.delete("/todos/:id", async (req, res) => {
    try {
    const deletedTodo = await TODOS.findByIdAndDelete(
        req.params.id
    );
    res.json(deletedTodo);
    } catch (error) {
    console.log(error);
    }
});

app.listen(process.env.URL, () => {
    console.log(`Server is running on ${process.env.URL}`);
});

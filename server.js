const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path')

const PORT = process.env.PORT || 3003;

const Workout = require("./models/workoutModel.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"))
})
app.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"))
})

app.put('api/workouts/:id', ({ body, params }, res) => {
    Workout.findByIdAndUpdate(params.id, { $push: { exercises: body } }, { new: true, runValidators: true }).then((response) => {
        res.json(response)
    })

})

app.get("/api/workouts", (req, res) => {
    Workout.aggregate([{ $addFields: { sumExercises: { $sum: '$exercises.duration' } } }])
        .then((response) => {
            res.json(response)
        })

})

app.post("/api/workouts", ({ body }, res) => {
    const workout = new Workout(body);

    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

app.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([{ $addFields: { sumExercises: { $sum: '$exercises.duration' } } }])
        .then((response) => {
            res.json(response)
        })
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
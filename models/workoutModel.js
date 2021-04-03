const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "type is Required"
            },
            name: {
                type: String,
                trim: true,
                required: "name is Required"
            },
            duration: {
                type: Number,
                required: "duration is Required"
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            distance: {
                type: Number
            },

        }
    ]

})

const Workout = mongoose.model("Workout", WorkoutSchema);

// Export the User model
module.exports = Workout;
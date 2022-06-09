const mongoose = require('mongoose')

const { Schema } = mongoose;

const ClassesSchema =   new Schema( {
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date
    },
    type: String
})

export default  mongoose.model("classes", ClassesSchema);
const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    phototest :{
        type:Buffer,
        required: false
    }
})

const Test = mongoose.model('Test', testSchema)

module.exports = Test
const mongoose = require('mongoose')
const { mongoPath } = require('dotenv')
module.exports = async () => {
    await mongoose.connect(process.env.mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    return mongoose
}
const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}
const userSchema = mongoose.Schema({
_id: reqString, 
userID: reqString,
muted: reqString
})
module.exports = mongoose.model('users', userSchema)
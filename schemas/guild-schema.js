const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}
const reqArray = {
    type: Array, 
    required: true
}
const guildSchema = mongoose.Schema({
_id: reqString, 
mutedRole: reqString
})
module.exports = mongoose.model('guilds', guildSchema)
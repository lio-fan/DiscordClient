const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}
const reqArray = {
    type: Array, 
    required: true
}
const eventSchema = mongoose.Schema({
_id: reqString,
information: reqArray,
teamtype: reqString, 
eventtype: reqString,
period: reqString,
rewards: reqString
})
module.exports = mongoose.model('events', eventSchema)
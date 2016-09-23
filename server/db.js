var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/carloan')
mongoose.set('debug', true)

var Schema = mongoose.Schema

var userSchema = new Schema({
	name: String,
	password: String
})

var User = mongoose.model('User', userSchema)

var db = mongoose.connection

db.on('error', function () {
	console.log('error')
})
db.once('open', function () {
	console.log('opend');
})

module.exports = {
	User: User
}
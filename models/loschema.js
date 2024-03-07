//Require mongoose
const mongoose = require("mongoose");

//Create schema contains a single field named 'name.'
//The 'name' field is of type String
const loSchema = new mongoose.Schema({
	name: String,
	email: String,
	country: String,
	city: String,
	descr: String,
	category: String,
	status: String,
	image: String,
});

//Export the Mongoose model with the collection name "Todo"
module.exports = mongoose.model("LiableObserver", loSchema);

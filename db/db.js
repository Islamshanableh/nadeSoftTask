const mongoose = require('mongoose');
require('dotenv').config();

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

// connecting mongoose
mongoose.connect("mongodb://localhost:27017/Countries", options).then(
	() => {
		console.log('DB Ready To Use');
	},
	(err) => {
		console.log(err);
	},
);

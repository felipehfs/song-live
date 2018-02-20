var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

let _schema = {
	name: {
		type: String,
		required: true
	},
	artist: {
		type: String,
		required: true
	},
	file: {
		type: String,
		trim: true
	}
};

let songSchema = new Schema(_schema);
let songModel = mongoose.model('audios', songSchema);

module.exports = songModel;

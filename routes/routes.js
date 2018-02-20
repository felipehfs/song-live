var express = require("express"),
	songCtrl = require('../controllers/song'),
	router = express.Router();

router.route('/')
.post(songCtrl.create)
.get(function(req, res) {
	res.send("Hello World");		
});

router.get("/:id", songCtrl.find);
router.delete("/:id", songCtrl.remove);

module.exports = router;

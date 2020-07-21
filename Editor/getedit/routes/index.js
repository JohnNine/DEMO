var express = require('express');
var router = express.Router();
var{ getVideoSource } = require('../utils/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/md", async function(req, res) {
	let json = req.body
  console.log(json);

	res.json(json);
});


module.exports = router;

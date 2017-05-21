const express = require('express');
const morgan = require('morgan');
const needle = require('needle');
const config = require('./config');

const app = express();
app.use(morgan('tiny'));

app.get('/', (req, res) => {
	needle.post(config.requestCounterUrl, {}, err => {
		if (err) console.error(`Cannot call request counter at ${config.requestCounterUrl}`);
	})
	res.status(200).send('Hello World !!\n');
});

app.get('/count', (req, res) => {
	needle.get(config.requestCounterUrl, (err, result) => {
		if (err) return res.status(500).send(`Cannot call request counter at ${config.requestCounterUrl}`);
		res.json(result.body);
	});
});

var server = app.listen(config.port, () => {
	console.log(`Example app listening on port ${server.address().port}!`);
});

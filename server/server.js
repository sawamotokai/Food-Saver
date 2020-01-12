const mysql = require('mysql');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
dotenv.config();

let con;
const createPool = async () => {
	con = await mysql.createPool({
		user: process.env.USERNAME,
		password: process.env.PASSWORD,
		database: process.env.DATABASE,
		// If connecting via unix domain socket, specify the path
		// sockePath: '/cloudsql/nwhacks2020-264901:us-west1:nwhacks2020'
		// If connecting via TCP, enter the IP and port instead
		host: process.env.HOST,
		port: process.env.PORT
	});
};
createPool();

// home view
app.get('/', (req, res) => {
	res.send('Konnichiwa This should be replaced by front-end homepage view');
});

// api endpoints
app.get('/api/get/:food', (req, res) => {
	const q = `SELECT * FROM entries WHERE item LIKE "%${req.params.food}%" ORDER BY item LIMIT 5`;
	con.query(q, (err, results) => {
		if (err) throw err;
		console.log(results);
		res.json(results);
	});
});

app.post('/api/add_many', (req, res) => {
	let { items } = req.data.body;
	con.query('INSERT INTO entries (item, expiryDate) VALUES ?', [ items ], (err, results) => {
		if (err) throw err;
		console.log(results);
		return res.redirect('/');
	});
});

app.post('/api/add_one', (req, res) => {
	let { item, expiryDate } = req.data.body;
	let q = 'INSERT INTO entries SET ?';
	con.query(q, { item: item, expiryDate: expiryDate }, (err, results) => {
		if (err) throw err;
		console.log(results);
		return res.redirect('/');
	});
});

const PORT = 8080;
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
	console.log(`http://localhost:8080/`);
	console.log('Press Ctrl+C to quit.');
});

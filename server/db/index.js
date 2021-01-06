import pkg from 'pg'

const {Pool} = pkg
const pool = new Pool({
	user:'postgres',
	host: 'localhost',
	database: 'yelp',
	password: 'admin',
	port:5432,
});
const db =   {
	query: (text, params) => pool.query(text, params),
};

export default db
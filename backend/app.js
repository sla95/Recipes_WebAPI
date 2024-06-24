const Koa = require('koa');
const cors = require('@koa/cors');
const app = new Koa();

app.use(cors());

const special = require('./routes/special.js')
const recipes = require('./routes/recipes.js');
const users = require('./routes/users.js');

app.use(special.routes());
app.use(recipes.routes());
app.use(users.routes());

let port = process.env.PORT || 3000;

module.exports = app;
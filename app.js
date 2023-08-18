const app = require('express')()
const body = require('body-parser');
app.use(body.urlencoded({extended: true}));
app.use(body.json());
require('dotenv').config()
require('./config/db')
require('./routes')(app)

const port = 4000;


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
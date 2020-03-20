const express = require('express')
const app = express()
var path = require('path');
const bodyParser = require('body-parser');

const port = 3000
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, ''));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('dist'))

app.get('*', (req, res) => {
  res.render('dist/index')
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
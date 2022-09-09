const express = require('express');
const { errorHandler } = require('./middleware/errormiddleware');
const dotenv = require('dotenv').config()
const app = express();

const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals',require('./routes/goalRoutes'))

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

//Run app, then load http://localhost:port in a browser to see the output. 
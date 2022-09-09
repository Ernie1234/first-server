const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
  res.status(200).json({msg: 'This is working bro!'})
});

app.listen(PORT, () => {
  console.log(`Listening to server at: ${PORT}`);
});

//Run app, then load http://localhost:port in a browser to see the output.
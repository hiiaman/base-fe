const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
app.use(express.static(path.join(__dirname, 'prod')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'prod', 'index.html'));
});

app.listen(port, function () {
  console.log('Server listen to port: ' + port);
});

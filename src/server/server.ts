const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static(process.cwd() + '/build/client'));
console.log(process.cwd() + '/build/client');

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
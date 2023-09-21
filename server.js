const express = require('express');

const app = express();
const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send({ express: 'Hello From Express' });
}, (error) => {
    console.log(error);
});

app.listen(port, () => console.log(`Escuchando en el puerto ${port}`));

// ENDPOINTS DE LA API 5000
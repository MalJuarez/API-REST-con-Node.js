import express from 'express';
import fs from 'fs';
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error){
        console.log(error);
    }
};
const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error){
        console.log(error);
    }
}

app.get('/', (req, res)=> {
    res.send('API with Nodejs');
});

app.get('/motos', (req, res)=> {
    const data = readData();
    res.json(data.motos);
});

app.get("/motos/:id", (req, res)=> {
    const data = readData();
    const id = parseInt(req.params.id);
    const moto = data.motos.find((moto) => moto.id == id);
    res.json(moto);
});

app.post("/motos", (req, res)=> {
    const data = readData();
    const body = req.body;
    const newMoto = {
        id: data.motos.length + 1,
        ...body, 
    };
    data.motos.push(newMoto);
    writeData(data);
    res.json(newMoto);
});

app.put("/motos/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const motosIndex = data.motos.findIndex((motos) => motos.id === id);
    data.motos[motosIndex] = {
        ...data.motos[motosIndex],
        ...body,
    };
    writeData(data);
    res.json({ massage: "Moto actualizada exitosamente"});
});

app.delete("/motos/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const motosIndex = data.motos.findIndex((motos) => motos.id === id);
    data.motos.splice(motosIndex, 1);
    writeData(data);
    res.json({ massage: "Moto eliminada exitosamente"});
});

app. listen(3000, () => {
    console.log('Server listening on port 3000');
});


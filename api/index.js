import cors from 'cors';
import express from 'express';
import fs from 'fs';
import https from 'https';
import Harvest from '../src/services/harvest';
import Forecast from '../src/services/forecast';

const app = express();

const harvest = new Harvest();
const forecast = new Forecast();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/harvest/clients', (req, res) => {
    harvest
        .clients(req.query)
        .then(clients =>
            res.send(clients)
        )
});

app.get('/forecast/projects', (req, res) => {
    forecast
        .clients({is_active: true})
        .then(clients => {
            forecast
                .projects()
                .then(projects =>
                    {
                        res.send(projects.map(project => {
                            project.client = clients.find(client => (client.id === project.client_id));
                            return project
                        }))
                    }
                )
        })
});

app.get('/forecast/milestones', (req, res) => {
    forecast
        .milestones()
        .then(milestones =>
            res.send(milestones)
        )
});

app.get('/forecast/people', (req, res) => {
    forecast
        .people()
        .then(people =>
            res.send(people)
        )
});

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)
.listen(3000, () =>
    console.log('listening on port 3000')
);
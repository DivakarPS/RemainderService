const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');
const { sendBasicEmail } = require('./services/email-service');

const jobs = require('./utils/jobs');
const TicketController = require('./controller/ticket-controller');

const setupAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.post('/api/v1/tickets',TicketController.create);

    app.listen(PORT, () => {
        console.log('Server is up and running in the PORT:',PORT)
        process.env['NODE_TLS_REJECT_UNAUTHORIZED']=0;

        jobs();
        // sendBasicEmail(
        //     'serviceemail382@gmail.com',
        //     'divavisha2000@gmail.com',
        //     'Testing mail',
        //     'Hey, how are you?! hope you are fine'
        // );
    })
}

setupAndStartServer();
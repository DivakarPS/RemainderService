const sender = require('../config/emailConfig');
const TicketRepository = require('../repository/ticket-repository');

const repo = new TicketRepository();
const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
    try {
        const response = await sender.sendMail({
            from : mailFrom,
            to: mailTo,
            subject: mailSubject,
            text: mailBody
        });
        // console.log(response);
    } catch (error) {
        console.log(error);
    }
}

const fetchpendingEmails = async (timestamp) => {
    try {
        const response = await repo.get({status:"PENDING"});
    
        return response;
    } catch (error) {
        console.log(error);
    }
}

const createNotification = async (data) => {
    try {
        const respose = await repo.create(data);
        return respose;
    } catch (error) {
        throw error;
    }
}

const updateTicket = async (ticketId, data) => {
    try {
        const response = await repo.update(ticketId,data);
        return response;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendBasicEmail,
    fetchpendingEmails,
    createNotification,
    updateTicket
}
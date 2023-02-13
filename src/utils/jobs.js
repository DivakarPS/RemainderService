const cron = require('node-cron');
const emailService = require('../services/email-service');
const sender = require('../config/emailConfig');



const setUpJobs = () => {
    cron.schedule('*/1 * * * *', async () => {
        const response = await emailService.fetchpendingEmails();
        // console.log("response:", response);
        response.forEach( async (email) => {
            await sender.sendMail({
                // to: email.recepientEmail,
                // subject: email.subject,
                // text: email.content
                from: "serviceemail382@gmail.com",
                to: email.recepientEmail,
                subject: email.subject,
                text: email.content
            }, async (err, data) => {
            if(err){
                console.log(err);
            }
            else{
                console.log(data);
                await emailService.updateTicket(email.id, {status : "SUCCESS"});
            }
        });
    });

});
}

module.exports = setUpJobs;
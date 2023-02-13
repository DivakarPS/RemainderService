const TicketService = require('../services/email-service');


const create = async (req, res) => {
    try {
        const response = await TicketService.createNotification(req.body);
        return res.status(201).json({
            success: true,
            data: response,
            err:{},
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            data : {},
            message : "unable to register a email remainder",
            success: false,
            err : error
        });
    }
}

module.exports = {
    create
}
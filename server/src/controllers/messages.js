import Model from '../models/model';

const messageModel = new Model('messages');

export const messagesPage = async (req, res) => {
    try{
        const data = await messageModel.select('name, message');
        res.status(200).json({messages: data.rows});

    } catch (err) {
        res.status(200).json({messages: err.stack});
    };
};

export const addMessage = async (req, res) => {
    const {name, message} = req.body;
    const columns = 'name, message';
    const values = `'${name}', '${message}'`;

    try{
        const data = await messageModel.insertWithReturn(columns, values, true);
        res.status(200).json({messages: data.rows});
    } catch (err) {
        res.status(200).json({messages: err.stack});
    };
};
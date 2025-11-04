import db from '../db.js';
import { scryptSync } from 'crypto';

const createUser = async (form) => {
    const key = scryptSync(form.password, process.env.SALT, 64);
    return await db.User.create({
        username: form.username,
        password: key.toString('base64')
    })
}

const authenticateUser = async(form) => {
    const key = scryptSync(form.password, process.env.SALT, 64)
    const isResult =  await db.User.findOne({
        username: form.username,
        password: key.toString('base64')
    })
    return isResult ? true : false;
}

export default {
    createUser,
    authenticateUser
}

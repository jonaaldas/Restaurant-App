import {connect} from '@planetscale/database';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();
import btoa from 'btoa';

const config = {
    fetch,
    btoa,
    host: process.env.HOST,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
};

const conn = connect(config);

async function queryDB(query, values) {
    try {
        const results = await conn.execute(query, values);
        return results;
    } catch (error) {
        console.log('🚀 ~ file: planetScale.js:37 ~ error:', error);
    }
}

export default queryDB;

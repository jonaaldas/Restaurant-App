import {connect} from '@planetscale/database';
import fetch from 'node-fetch';
const config = {
    fetch,
    host: 'aws.connect.psdb.cloud',
    username: 'qtzwn3m3r2q2wijwpxuy',
    password: 'pscale_pw_qgRU4vlP7bg4gAGzOyhnHIosdiZV7HqcaP0Jr1vLDk6',
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

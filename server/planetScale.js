import mysql from 'mysql2';
const uri = 'mysql://rsme9lgkangjvjosmdga:pscale_pw_6OqH2aduELIC6zZTEGOQ9WCy5URDzsCxLkFm4Rdlqsr@aws.connect.psdb.cloud/restaurants?ssl={"rejectUnauthorized":true}';
const pool = mysql.createPool(uri);

function queryDB(query, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) reject(err);
            connection.query(query, values, (error, results) => {
                connection.release();
                if (error) reject(error);
                resolve(results);
            });
        });
    });
}

export default queryDB;

process.env.HOST = 'localhost';
process.env.PORT = '26257';

const pg = require('pg');
const bcrypt = require('bcryptjs');
const UUID = require('uuid/v4');

const params = {
    user: 'kiwiAdmin',
    host: process.env.HOST,
    database: 'logins',
    port: process.env.PORT
};
 
let pool = new pg.Pool(params);

module.exports = {

    login: function(encoded) {
        let token = encoded.split(/\s+/).pop()||'',            
        auth = new Buffer.from(token, 'base64').toString().split(/:/),    
        username = auth[0],
        password = auth[1];

        return new Promise((resolve, reject) => {
            pool.connect(function (err, client, callback) {          
                if (err) {
                    let finished = {
                        code: 500,
                        message: "We are having trouble getting user accounts. Please try again later."
                    };
                    reject(finished);
                }
                else {
                    client.query("SELECT password FROM accounts WHERE username ='" + username + "';").then((res) => {
                        if(res.rows === undefined || res.rows.length == 0) {
                            let finished = {
                                code: 404,
                                message: "No account with this username exists."
                            };
                            reject(finished);
                        } else {
                            if(bcrypt.compareSync(password, res.rows[0].password)) {
                                resolve();
                                //generate tokens
                            } else {
                                let finished = {
                                    code: 401,
                                    message: "Your password is incorrect."
                                };
                                reject(finished);
                            }
                        }
                    });
                }    
            });                          
        });    
    },

    register: function(encoded) {
        let token = encoded.split(/\s+/).pop()||'',            
        auth = new Buffer.from(token, 'base64').toString().split(/:/),    
        username = auth[0],
        password = auth[1],
        salt = bcrypt.genSaltSync(10),
        hash = bcrypt.hashSync(password, salt),
        id = UUID().replace(/-/g, '');
            
        return new Promise((resolve, reject) => {
            pool.connect(function (err, client, callback) {          
                if (err) {
                    let finished = {
                        code: 500,
                        message: "We are having trouble getting user accounts. Please try again later."
                    };
                    reject(finished);
                }
                else {
                    client.query("SELECT * FROM accounts WHERE username ='" + username + "';").then((res) => {
                        if(res.rows === undefined || res.rows.length == 0) {
                            let queryString = "'" + id + "', '" + username + "', '" + hash + "'";
                            console.log(queryString);
                            client.query("INSERT INTO accounts VALUES (" + queryString + ");").then(() => {
                                //blockchain stuff
                                resolve({success: true});    
                            });
                        } else {
                            let finished = {
                                code: 401,
                                message: "This username already exists."
                            };
                            reject(finished);
                        }
                    });
                }    
            });                          
        });    
    }
}
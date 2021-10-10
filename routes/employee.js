const db = require('../db/connection');

const viewEmployees = () => {
    db.query(`SELECT first_name, last_name FROM employee`, (err, results) => {
        if(err) {
            console.log(`error: ${ err.message}`);
            return;
        }
        return console.table(results);
    });
};

module.exports = viewEmployees;
const db = require('../db/connection');

const viewRoles = () => {
    db.query(`SELECT title AS Roles FROM role`, (err, results) => {
        if(err) {
            console.log(`error: ${ err.message}`);
            return;
        }
        return console.table(results);
    });
};

module.exports = viewRoles;
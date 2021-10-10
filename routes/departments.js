const db = require('../db/connection');

 
const viewDepartments = () => {
    db.query(`SELECT department_name from department`, (err, results) => {
        if(err) {
            console.log(`error: ${ err.message}`);
            return;
        }
        return console.table(results);
    });
};

module.exports = viewDepartments;
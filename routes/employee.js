const db = require('../db/connection');

const viewEmployees = () => {
    const sql = `SELECT * FROM employee LEFT JOIN role ON employee.manager_id = role.id LEFT JOIN department ON role.department_id ORDER BY employee.id`
    
    db.query(sql, (err, results) => {
        if(err) {
            console.log(`error: ${ err.message}`);
            return;
        }
        return console.table(results);
    });
};

const viewEmployeesByManager = () => {
    db.query(`SELECT first_name, last_name, manager_id  FROM employee ORDER BY manager_id`, (err, results) => {
        if(err) {
            console.log(`error: ${ err.message}`);
            return;
        }
        return console.table(results);
    });
};

module.exports = { viewEmployees, viewEmployeesByManager };
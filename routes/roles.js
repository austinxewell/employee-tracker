const db = require('../db/connection');

const viewRoles = () => {
    const sql = `SELECT role.title, role.id AS role_ID, role.salary, department.department_name FROM role JOIN department ON role.department_id;`
    
    db.query(sql, (err, results) => {
        if(err) {
            console.log(`error: ${ err.message}`);
            return;
        }
        return console.table(results);
    });
};

module.exports = viewRoles;
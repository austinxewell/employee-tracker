const db = require('../db/connection');

const viewRoles = (init) => {
    const sql = `SELECT role.id, role.title, role.salary, department.department_name AS department_name
    FROM role
    JOIN department 
    ON role.department_id =  department.id;`
    
    db.promise().query(sql).then(results => {
        console.table(results[0]);
        init()
    }).catch(err => {
        if(err) {
            console.log(`error: ${ err.message}`);
            return;
        }
    })
};


module.exports = viewRoles;
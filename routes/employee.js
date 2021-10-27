const db = require('../db/connection');

const viewEmployees = (init) => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, department.department_name AS department, role.salary AS salary, CONCAT(mngr.first_name, ' ', mngr.last_name, ' ') AS manager
    FROM employee
    JOIN role
    ON employee.role_id = role.id
    JOIN department
    ON role.department_id = department.id
    LEFT JOIN employee AS mngr
    ON employee.manager_id = mngr.id
    ORDER BY employee.id`
    
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

const viewEmployeesByManager = () => {
    // const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, department.department_name AS department, role.salary AS salary, CONCAT(mngr.first_name, ' ', mngr.last_name, ' ') AS manager
    // FROM employee
    // JOIN role
    // ON employee.role_id =  role.id
    // JOIN department
    // ON role.department_id = department.id
    // LEFT JOIN employee AS mngr
    // ON employee.manager_id = mngr.id
    // WHERE mngr.id = ?
    // ORDER BY e.id`

    db.query(`SELECT first_name, last_name, manager_id  FROM employee ORDER BY manager_id`, (err, results) => {
        if(err) {
            console.log(`error: ${ err.message}`);
            return;
        }
        return console.table(results);
    });
};

module.exports = { viewEmployees, viewEmployeesByManager };
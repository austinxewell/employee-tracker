const db = require('../db/connection');
const inquirer = require('inquirer')

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

const addEmployee = (init) => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: `What is the Employee's first name?`,
            validate:  nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log('Please enter the first name of the Employee.')
                    return false;
                }
            }          
        },
        {
            type: 'input',
            name: 'last_name',
            message: `What is the Employee's last name?`,
            validate:  nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log('Please enter the last name of the Employee.')
                    return false;
                }
            }          
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the role ID for this employee?',
            validate:  nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log('Please enter the role ID for this position.')
                    return false;
                }
            }          
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is the manager ID for this employee?',
            validate:  nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log('Please enter the department ID for this position.')
                    return false;
                }
            }          
        },
    ])
    .then((answer) => {
        db.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
            [answer.first_name, answer.last_name, answer.role_id, answer.manager_id],
            function (err) {
                if (err) throw err;
                console.log('Employee successfully added! View Employees to verify.');
                init()              
            }
        );
    });
};


module.exports = { viewEmployees, addEmployee };
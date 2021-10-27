const db = require('../db/connection');
const inquirer = require('inquirer');

// View all the roles
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

// Adding a Role Function
const addRole = (init) => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What role would you like to add?',
            validate:  nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log('Please enter the name of the role you would like to add.')
                    return false;
                }
            }          
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this position?',
            validate:  nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log('Please enter the salary for this position.')
                    return false;
                }
            }          
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department ID for this position?',
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
            `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
            [answer.title, answer.salary, answer.department_id],
            function (err) {
                if (err) throw err;
                console.log('Role successfully added! View roles to verify.');
                init()              
            }
        );
    });
};


module.exports = { viewRoles, addRole }
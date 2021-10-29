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

// Adding a Role to DB
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


// Updates employee's role in DB
const updateEmployeeRole = async(init) => {

    const sqlEmployee = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, department.department_name AS department, role.salary AS salary, CONCAT(mngr.first_name, ' ', mngr.last_name, ' ') AS manager
    FROM employee
    JOIN role
    ON employee.role_id = role.id
    JOIN department
    ON role.department_id = department.id
    LEFT JOIN employee AS mngr
    ON employee.manager_id = mngr.id
    ORDER BY employee.id`


    const sqlRoles = `SELECT role.id, role.title, role.salary, department.department_name AS department_name
    FROM role
    JOIN department 
    ON role.department_id =  department.id;`

    const resultsEmployee = await db.promise().query(sqlEmployee).then(results => {
        return (results[0])
    })

    const resultsRoles = await db.promise().query(sqlRoles).then(results => {
        return (results[0])

    })
    inquirer.prompt([
        {
            name: "name",
            type: "list",
            message: "Which employee would you like to update?",
            choices:
            function () {
                return resultsEmployee.map((employee) => ({
                    name: employee.first_name + " " + employee.last_name,
                    value: employee.id,
                }));
            },
        },
            {
                name: "newrole",
                type: "list",
                message: "What is the employee's new role ID?",
                choices:
                function () {
                    return resultsRoles.map((role) => ({
                        name: role.title,
                        value: role.id,
                    }));
                },
            },
        ])
        .then((answer) => {
            db.query(
                "UPDATE employee SET employee.role_id = ? WHERE employee.id = ?",
                [answer.newrole, answer.name],
                (err) => {
                    if (err) throw err;
                    console.log(`Employee's role has been updated successfully! View employees to verify.`);
                    init();
                }
            );
        });
}

module.exports = { viewRoles, addRole, updateEmployeeRole }
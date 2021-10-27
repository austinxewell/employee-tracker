const inquirer = require('inquirer');
const db = require('./db/connection');
const { addDepartment, viewDepartments } = require('./routes/departments');
const { viewRoles, addRole, updateEmployeeRole} = require('./routes/roles');
const { viewEmployees, addEmployee} = require('./routes/employee');

db.connect(err => {
    if(err) throw err;
});

// start up prompt
const init = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'routeOption',
            message: 'What would you like to do?',
            choices: [
                'View all departments.',
                'View all roles.',
                'View all Employees.',
                'Add a department.',
                'Add a role.',
                'Add an Employee.',
                'Update an Employee role',
                'Exit'
            ],
        }
    ])
    .then(data => {
        switch(data.routeOption){
            case 'View all departments.':
                viewDepartments().then(data => {
                    console.table(data)
                    init();
                    });
                break;
            case 'View all roles.':
                viewRoles(init)
                break;
            case 'View all Employees.':
                viewEmployees(init)
                break;
            case 'Add a department.':
                addDepartment(init)
                break;
            case 'Add a role.':
                addRole(init)
                break;
            case 'Add an Employee.':
                addEmployee(init)
                break;
            case 'Update an Employee role':
                updateEmployeeRole(init)
                break;
            case 'Exit':
            default:
                console.log('Goodbye!');
        };   
    })
}

init();
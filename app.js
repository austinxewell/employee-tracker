const inquirer = require('inquirer');
const db = require('./db/connection');
const { addDepartment, viewDepartments } = require('./routes/departments');
const { viewRoles, addRole} = require('./routes/roles');
const { viewEmployees, viewEmployeesByManager} = require('./routes/employee');



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
                'View all employees.',
                'View employees by manager.',
                'Add a department.',
                'Add a role.',
                'Add an Employee.',
                'Update an Employee Role',
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
            case 'View all employees.':
                viewEmployees(init)
                break;
            case 'View employees by manager.':
                viewEmployeesByManager()
                break;
            case 'Add a department.':
                addDepartment(init)
                break;
            case 'Add a role.':
                addRole(init)
                break;
            default:
                console.log('everything else');
        };   
    })

}






init();
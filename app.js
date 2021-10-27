const inquirer = require('inquirer');
const db = require('./db/connection');
const { addDepartment, viewDepartments } = require('./routes/departments');
const viewRoles = require('./routes/roles');
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
                '**View employees by department',
                'Add a department.',
                'Add a role.',
                'Add an Employee.',
                '**Delete a department**',
                '**Delete a role.**',
                '**Delete an employee**',
                'Update an Employee Role',
                '**Update employee managers.**'
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
                viewEmployees()
                break;
            case 'View employees by manager.':
                viewEmployeesByManager()
                break;
            case 'Add a department.':
                addDepartment()
                break;
            default:
                console.log('everything else');
        };   
    })

}






init();
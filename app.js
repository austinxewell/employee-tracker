const inquirer = require('inquirer');
const db = require('./db/connection');
const viewDepartments = require('./routes/departments');
const viewRoles = require('./routes/roles');
const { viewEmployees, viewEmployeesByManager} = require('./routes/employee')


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
                console.table(viewDepartments());
                init();
                break;
            case 'View all roles.':
                viewRoles()
                break;
            case 'View all employees.':
                viewEmployees()
                break;
            case 'View employees by manager.':
                viewEmployeesByManager()
                break;
            default:
                console.log('everything else');
        };   
    })

}






init();
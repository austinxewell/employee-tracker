const inquirer = require('inquirer');
const db = require('./db/connection');

db.connect(err => {
    if(err) throw err;
    console.log('Database connected.');
});

// start up prompt
const int = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'routeOption',
            message: 'What would you like to do?',
            choices: [
                'View all departments.',
                'View all roles.',
                'View all employees.',
                '**View employees by manager.**',
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
}

int();
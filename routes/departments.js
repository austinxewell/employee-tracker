const inquirer = require('inquirer');
const db = require('../db/connection');

//experimenting with another way to run the function left in code intentionally.
async function viewDepartments() {
    const sql = `SELECT * FROM department`

    let newPromise = new Promise((resolve, reject) => {
    
        db.query(sql, (err, results) => {
            if(err) {
                reject(err)
                return;
            } 
            resolve(results);
        });
    });
    return await newPromise
};


const addDepartment = (init) => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What department would you like to add?',
            validate:  nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log('Please enter the name of the department you would like to add.')
                    return false;
                }
            }
        },
    ])
    .then((answer) => {
        db.query(
            `INSERT INTO department (department_name) VALUES (?)`,
            [answer.name],
            function (err, results) {
                if (err) throw err;
                console.log('Department successfully added! View departments to verify.');
                init()              
            }
        );
    });
};



module.exports = { viewDepartments, addDepartment }
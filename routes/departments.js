const inquirer = require('inquirer');
const db = require('../db/connection');

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


const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What department would you like to add?',
        },
    ]).then(data => console.log(data))
};



module.exports = { viewDepartments, addDepartment }
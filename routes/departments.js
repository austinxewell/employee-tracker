const db = require('../db/connection');

async function viewDepartments() {
    let newPromise = new Promise((resolve, reject) => {
    try {
        db.query(`SELECT department_name AS Departments FROM department`, (err, results) => {
            if(err) {
                console.log(`error: ${ err.message }`);
                return;
            } 
            resolve(results);
            // console.table(results);
        });
    } catch (err) { 
        reject(err)
    }
    });
    await newPromise
};



module.exports = viewDepartments;
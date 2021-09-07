"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const fs_2 = __importDefault(require("fs"));
const dbPath = path_1.default.resolve('.', './database/database.json');
function getDatabase() {
    if (!fs_2.default.existsSync(dbPath)) {
        fs_2.default.writeFileSync(dbPath, JSON.stringify([]));
    }
    let dbContent = JSON.parse(fs_2.default.readFileSync(dbPath).toString());
    return dbContent;
}
function findCompanyById(id) {
    return new Promise((resolve, reject) => {
        const companiesFromDatabase = getDatabase();
        let company = companiesFromDatabase.find((company) => company.id == id) || {};
        if (Object.keys(company).length > 0) {
            resolve(company);
        }
        else {
            resolve(false);
        }
    });
}
function findAllCompanies() {
    return new Promise((resolve, reject) => {
        const companiesFromDatabase = getDatabase();
        resolve(companiesFromDatabase);
    });
}
function addCompany(obj) {
    const companiesFromDatabase = getDatabase();
    const id = companiesFromDatabase.length + 1;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const noOfEmployees = obj.employees.length;
    companiesFromDatabase.push({
        ...obj,
        id,
        createdAt,
        updatedAt,
        noOfEmployees
    });
    fs_1.writeFileSync(dbPath, JSON.stringify(companiesFromDatabase, null, " "));
}
function updateCompany(obj, id) {
    //get index for company
    const companiesFromDatabase = getDatabase();
    const index = companiesFromDatabase.findIndex((company) => company.id === Number(id));
    //get object with the passed id
    const companyObj = companiesFromDatabase[index];
    const noOfEmployees = companyObj.employees.length;
    if (companyObj) {
        //object exist in db
        const updatedAt = new Date().toISOString();
        const updatedObj = {
            ...companyObj,
            ...obj,
            updatedAt,
            noOfEmployees,
            id
        };
        companiesFromDatabase.splice(index, 1, updatedObj);
        fs_1.writeFileSync(dbPath, JSON.stringify(companiesFromDatabase, null, " "));
        return true;
    }
    else {
        return false;
    }
}
function deleteCompany(id) {
    return new Promise((resolve, reject) => {
        const companiesFromDatabase = getDatabase();
        //if company not in database return false
        let indexOfCompany = companiesFromDatabase.findIndex((company) => company.id === id);
        if (indexOfCompany > -1) {
            //delete the company
            companiesFromDatabase.splice(indexOfCompany, 1);
            fs_1.writeFileSync(dbPath, JSON.stringify(companiesFromDatabase, null, " "));
            resolve(true);
            return;
        }
        else {
            resolve(false);
        }
    });
}
module.exports = {
    findCompanyById,
    findAllCompanies,
    addCompany,
    updateCompany,
    deleteCompany,
};

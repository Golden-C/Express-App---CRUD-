import { writeFileSync } from "fs";
import { Organization } from "../interfaces/interface";
import path from 'path';
import fs from "fs"

const dbPath = path.resolve('.','./database/database.json');



function getDatabase() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([]));
  }
   let dbContent =  JSON.parse(fs.readFileSync(dbPath).toString())
   return dbContent as Array<Organization>;
  }                   
  
  
  function findCompanyById(id: number) {
    return new Promise((resolve, reject) => {
      const companiesFromDatabase = getDatabase()
      let company = companiesFromDatabase.find((company) => company.id == id) || {}
      if (Object.keys(company).length > 0) {
        resolve(company);
      } else {
        resolve(false);
      }
    });
  }
  
  function findAllCompanies() {
    return new Promise((resolve, reject) => {
      const companiesFromDatabase = getDatabase()
      resolve(companiesFromDatabase);
    });
  }
  
  function addCompany(obj: any) {

      const companiesFromDatabase = getDatabase()
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
      writeFileSync(dbPath, JSON.stringify(companiesFromDatabase, null, " "));   
  }
  
  function updateCompany(obj: Organization, id: number): boolean {
    //get index for company
    const companiesFromDatabase = getDatabase()
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
      writeFileSync(dbPath, JSON.stringify(companiesFromDatabase, null, " "));
      return true;
    } else {
        return false
    }
  }
  
  function deleteCompany(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const companiesFromDatabase = getDatabase()
      //if company not in database return false
      let indexOfCompany = companiesFromDatabase.findIndex((company) => company.id === id);
      if (indexOfCompany > -1) {
        //delete the company
        companiesFromDatabase.splice(indexOfCompany, 1);
        writeFileSync(dbPath, JSON.stringify(companiesFromDatabase, null, " "));
        resolve(true);
        return;
      } else {
        resolve(false);
      }
    });
  }
   
  export = {
    findCompanyById,
    findAllCompanies,
    addCompany,
    updateCompany,
    deleteCompany,
  };
  
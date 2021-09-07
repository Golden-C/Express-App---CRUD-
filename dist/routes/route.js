"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const model_1 = __importDefault(require("../models/model"));
/* GET home page. */
router.get('/', async (req, res) => {
    const companies = await model_1.default.findAllCompanies();
    res.status(200).json({
        status: "Success",
        data: companies
    });
});
router.get('/:id', async (req, res) => {
    const company = await model_1.default.findCompanyById(+req.params.id);
    if (company) {
        res.status(200).json({
            status: "Success",
            data: company
        });
    }
    else {
        res.status(404).json({
            status: "Failed",
            msg: "Company not found"
        });
    }
});
router.post('/', (req, res) => {
    try {
        const receivedCompany = req.body;
        if (receivedCompany) {
            const companyAdded = model_1.default.addCompany(receivedCompany);
            res.status(201).json({
                status: "success",
                data: receivedCompany
            });
        }
    }
    catch {
        res.status(400).json({
            status: "Failed",
            data: "Unable to create Company, invalid upload."
        });
    }
});
router.put('/:id', (req, res) => {
    try {
        if (Object.values(req.body).length > 0) {
            const companyUpdated = model_1.default.updateCompany(req.body, +req.params.id);
            console.log('company updated: ', companyUpdated);
            if (companyUpdated) {
                res.status(201).json({
                    status: "success",
                    data: "company updated."
                });
            }
            else {
                throw EvalError("Invalid Id");
            }
        }
        {
            // console.log(err)
            res.status(400).json({
                status: "Failed",
                data: "Unable to update Company, invalid upload."
            });
        }
    }
    catch {
        res.status(403).json({
            status: "Failed",
            data: "Unable to update Company, invalid id."
        });
    }
});
router.delete('/:id', async (req, res) => {
    const companyIsDeleted = await model_1.default.deleteCompany(+req.params.id);
    if (companyIsDeleted) {
        res.status(200).json({
            status: "Success",
            msg: "Company deleted"
        });
    }
    else {
        res.status(404).json({
            status: "Fail",
            msg: "Unable to delete Company, invalid id"
        });
    }
});
router.use("*", (req, res) => {
    res.status(404).json({
        status: 'fail',
        msg: "Page not found, please check your url and try and again."
    });
});
exports.default = router;

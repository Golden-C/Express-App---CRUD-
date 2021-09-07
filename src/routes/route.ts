import express, { Request, Response } from 'express';
const router = express.Router();
import model from "../models/model"

/* GET home page. */
router.get('/', async (req: Request, res: Response) => {
    const companies = await model.findAllCompanies()
    res.status(200).json({
        status: "Success",
        data: companies
    });
});

router.get('/:id', async (req: Request, res: Response) => {
    const company = await model.findCompanyById( +req.params.id)
    if (company) {
        res.status(200).json({
            status: "Success",
            data: company
        });
    } else {
        res.status(404).json({
            status: "Failed",
            msg: "Company not found"
        });
    }
});

router.post('/', (req: Request, res: Response) => {
    try{
        const receivedCompany = req.body;
        if (receivedCompany) {
            const companyAdded = model.addCompany(receivedCompany)
            res.status(201).json({
                status: "success",
                data: receivedCompany
            });
        }
    }catch{
        res.status(400).json({
            status: "Failed",
            data: "Unable to create Company, invalid upload."
        });
    }


});

router.put('/:id', (req: Request, res: Response) => {
    try{
        if( Object.values(req.body).length > 0){
    
            const companyUpdated = model.updateCompany(req.body, +req.params.id);
            console.log('company updated: ', companyUpdated);
            
            if(companyUpdated){
                res.status(201).json({
                    status: "success",
                    data: "company updated."
                });
            }else {
                throw EvalError("Invalid Id");
                  } 
        }  {
                // console.log(err)
                res.status(400).json({
                    status: "Failed",
                    data: "Unable to update Company, invalid upload."
                });
            }

    }catch{
        res.status(403).json({
            status: "Failed",
            data: "Unable to update Company, invalid id."
        });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const companyIsDeleted = await model.deleteCompany( +req.params.id )
    if (companyIsDeleted) {
        res.status(200).json({
            status: "Success",
            msg: "Company deleted"
        });  
    } else {
        res.status(404).json({
            status: "Fail",
            msg: "Unable to delete Company, invalid id"
        })
    }
})



router.use("*", (req:Request, res: Response)=>{
    res.status(404).json({
        status:'fail',
        msg:"Page not found, please check your url and try and again."
    })
})
export default router;

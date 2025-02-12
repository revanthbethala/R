import express from "express"
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js"
//import {registerCompany} from "../controllers/company.controller.js"
// import { singleUpload } from "../middlewares/multer.js"


const router = express.Router()

router.route('/register').post(registerCompany)
router.route('/get').post(getCompany)
router.route('/get/:id').get(getCompanyById)
router.route('/update/:id').put(updateCompany)

export default router
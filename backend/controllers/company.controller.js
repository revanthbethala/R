import Company from "../models/company.model.js"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import fs from 'fs';


export const registerCompany = async (req, res) => {
    try {
      const {companyname,userId} = req.body;
      console.log(companyname)
      if (!companyname) {
        res.status(400).json({
          message: "provide an company name",
          success: false,
        });
      }
      let company = await Company.findOne({ name: companyname });
      if (company) {
        res.status(400).json({
          message: "you cant register the same company",
          success: false,
        });
      }
      company = await Company.create({
        name: companyname,
        userId: userId,
      });
      return res.status(201).json({
        message: "company created successfully",
        company,
        success: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  export const getCompany = async (req, res) => {
    try {
      const {userId} = req.body;
      const companies = await Company.find({ userId });
      if (!companies) {
        res.status(404).json({
          message: "companies not found",
          success: false,
        });
      }
      return res.status(200).json({
          companies,
          success:true
      })
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getCompanyById = async (req, res) => {
    try {
      const companyId = req.params.id;
      const company = await Company.findById(companyId);
      if (!company) {
        return res.status(400).json({
          message: "company not found",
          success: false,
        });
      }
      return res.status(200).json({
        company,
        success: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        
        const file = {
          originalname: 'test-image.jpg',  // Name of the file
          buffer: fs.readFileSync('../backend/assets/test-image.jpg') // Read the file as a buffer
        };
        //const file = req.file;
        // idhar cloudinary ayega
        const fileUri = getDataUri(file);
        console.log(fileUri);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        console.log(cloudResponse);
        const logo = cloudResponse.secure_url;
        console.log(logo);
    
        const updateData = { name, description, website, location, logo };
  
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
  
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            message:"Company information updated.",
            success:true
        })
  
    } catch (error) {
        console.log(error);
    }
  }
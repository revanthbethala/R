import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";
import CoursePurchase from "../models/coursePurchase.model.js";

dotenv.config();

const PHONEPE_MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
const PHONEPE_SALT_KEY = process.env.PHONEPE_SALT_KEY;
const PHONEPE_SALT_INDEX = process.env.PHONEPE_SALT_INDEX;
const PHONEPE_BASE_URL = process.env.PHONEPE_BASE_URL; 

export const initiatePayment = async (req, res) => {
    try {
        const { userId, courseId, amount, mobileNumber } = req.body;

        const transaction = new CoursePurchase({
            userId,
            courseId,
            amount,
            transactionId: `TXN_${Date.now()}`,
            status: "PENDING",
        });

        await transaction.save();

        const payload = {
            merchantId: PHONEPE_MERCHANT_ID,
            transactionId: transaction.transactionId,
            amount: amount * 100, 
            currency: "INR",
            redirectUrl: `${process.env.BASE_URL}/api/payment/success`,
            callbackUrl: `${process.env.BASE_URL}/api/payment/callback`,
            mobileNumber,
            paymentInstrument: {
                type: "UPI_INTENT",
            },
        };

        const data = JSON.stringify(payload);
        const checksum = crypto.createHash("sha256").update(data + PHONEPE_SALT_KEY).digest("hex");
        const finalXVerify = `${checksum}###${PHONEPE_SALT_INDEX}`;  

        const response = await axios.post(`${PHONEPE_BASE_URL}/pay`, data, {
            headers: {
                "Content-Type": "application/json",
                "X-VERIFY": finalXVerify,
            },
        });

        return res.status(200).json({ success: true, data: response.data, transactionId: transaction.transactionId });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const paymentCallback = async (req, res) => {
    try {
        const { transactionId, status } = req.body;

        const transaction = await CoursePurchase.findOne({ transactionId });

        if (!transaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }

        transaction.status = status;
        await transaction.save();

        if (status === "SUCCESS") {
            return res.redirect(`${process.env.FRONTEND_URL}/payment-success`);
        } else {
            return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

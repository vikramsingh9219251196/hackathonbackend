
import express from 'express';
import { addMessage, getMessages } from '../controllers/messageController.js';

const router = express.Router();

router.post('/addmsg/', addMessage);
router.post('/getmsg/', getMessages);

export default router;

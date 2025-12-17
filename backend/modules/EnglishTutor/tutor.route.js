import express from 'express'
import { getExplanation } from './tutor.controller.js'
const router = express.Router()

router.post('/tutor',getExplanation)

export default router
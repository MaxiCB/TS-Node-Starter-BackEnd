import express from 'express'
// import {} from './analytics-model'

import {privateRoute } from '../auth/auth-middleware'

const router = express.Router();

router.get('/', (req, res) => {
    res.json({message: 'Welcome to analytics'})
})

export default router
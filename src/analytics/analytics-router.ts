import express from 'express'
// import {} from './analytics-model'

import {privateRoute } from '../auth/auth-middleware'

const router = express.Router();

// Total count of users
// Total count of posts
// Total count of images
// Total count of accounts with images
// Total count of posts with images

router.get('/', (_req, res) => {
    res.json({message: 'Welcome to analytics'})
})

export default router
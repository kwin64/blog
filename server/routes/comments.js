import {Router} from 'express'
import { createComment } from '../controllers/comment-controller.js'
import authMiddleware from '../middlewares/auth-middleware.js'
const router = new Router()

router.post('/:id',authMiddleware,createComment)

export default router
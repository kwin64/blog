
import { Router } from 'express'
import { create, getAllPosts, getOne, getTags, remove, update } from '../controllers/post-controller.js'
import authMiddleware from '../middlewares/auth-middleware.js'
import validationErrorsMiddleware from '../middlewares/validationErrors-middleware.js'
import { postCreateValidation } from '../validation/post.js'
const router = new Router()

router.get('/',getAllPosts)
router.get('/tags',getTags)
router.get('/:id',getOne)
router.post('/',authMiddleware,postCreateValidation,validationErrorsMiddleware,create)
router.delete('/:id',authMiddleware,remove)
router.patch('/:id',authMiddleware,postCreateValidation,validationErrorsMiddleware,update)

export default router
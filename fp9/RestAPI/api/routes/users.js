const express = require('express')

const usersController = require('../controllers/usersController')

const usersRouter = express.Router()

/**
 * @swagger
 * /users:
 *   get:
 *     description: Returns all users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 */

usersRouter.get('/users/', usersController.getAllUsers)
usersRouter.get('/users/:userId', usersController.getUserById)
usersRouter.get('/users/:userId/products', usersController.getUserProducts)

usersRouter.post('/users/', usersController.createUser)
usersRouter.put('/users/:userId', usersController.updateUser)

usersRouter.delete('/users/:userId', usersController.deleteUser)

// this will set the product on req.product - for any route that contains
usersRouter.param('userId', usersController.setUserById)

module.exports = usersRouter

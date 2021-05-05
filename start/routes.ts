/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import authConfig from 'Config/auth'
// import {authConfig as auth} from '../app/Middleware/Auth'




Route.group(()=> {
    // Route.on('/').render('welcome')
Route.get('/', 'TasksController.index')
// To contain new tasks
Route.post('/tasks', 'TasksController.store')
// Task Completed
Route.patch('/tasks/:id', 'TasksController.update')
// Task deleted
Route.delete('/tasks/:id', 'TasksController.destroy')
}).middleware(['auth'])
Route.get('/register', 'AuthController.showRegister').middleware(['guest'])
Route.post('/register', 'AuthController.register')
Route.post('/logout', 'AuthController.logout')
Route.get('/login', 'AuthController.showlogin').middleware(['guest'])
Route.post('/login', 'AuthController.login')


// Route.get('/about/:name?', 'PagesController.about')
// Route.get('/contact', 'PagesController.contact')

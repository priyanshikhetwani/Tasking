import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import View from '@ioc:Adonis/Core/View'
import Task from 'App/Models/Task'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import authConfig from 'Config/auth'

export default class TasksController {
    public async index({view}:HttpContextContract ){
        const tasks = await Task.all()
        // const user = auth.user
        // await user?.preload('tasks')
        return view.render('tasks/index', {tasks})
        // return view.render('tasks/index', {tasks: user?.tasks})
}

    public async store({request, response, session, auth, params}: HttpContextContract){
        const validationSchema = schema.create({
            title: schema.string({trim: true}, [
                rules.maxLength(255),
            ])
        })
        const validatedData = await request.validate({
            schema: validationSchema,
            messages: {
                'title.required': 'Enter task title',
                'title.maxLength': 'Task title can not exceed 255 characters'
            }
        })

        // const user = auth.user

        //     const auth
        //      .authenticator('jwt')
        //      .generate(user)


        

        // const user = auth.user
        await auth.user?.related('tasks').create({
            title: validatedData.title,
            userId: auth.user.id,
        })


        //  await Task.create({
        //     title: validatedData.title,
            // userId: auth.user.id,
        // })
        session.flash('notification', 'Task added!')

        return response.redirect('back')
    }

    public async update({request, response, session, params}:HttpContextContract ){
        const task =  await Task.findOrFail(params.id)
        task.isCompleted= !!request.input('completed')
        await task.save()
        session.flash('notification', 'Task updated')
        return response.redirect('back')

    }

    public async destroy({params, session, response}: HttpContextContract){
        const task = await Task.findOrFail(params.id)
        await task.delete()

        session.flash('notification', 'Task deleted')
        return response.redirect('back')

    }




}
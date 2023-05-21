const {Router} = require('express');
const Course = require('../models/course')
const router = Router();

router.get('/', (req, res) => {
    res.status(200)
    res.render('add', {
        title: 'Add page',
        isAdd: true
    })
})

router.post('/' , async (req, res) => {
    const course =  new Course(req.body.title, req.body.price, req.body.img)

    course.save()
    console.log(req.body)
    res.redirect('/courses')
})

module.exports = router
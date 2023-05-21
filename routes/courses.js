const {Router} = require('express');
const router = Router();
const Course = require('../models/course');


router.get('/', async (req, res) => {
    const courses = await Course.getAll()
    res.status(200)
    res.render('courses', {
        title: 'Course page',
        isCourses: true,
        courses
    })
})

router.get('/:id/edit' , async (req,res) => {
    if(!req.query.allow) {
        return res.redirect('/')
    }
})

router.get('/:id', async (req, res) => {
    const course = await Course.getById(req.params.id)
    res.render('course', {
     
        title: `course ${course.title}`,
        course
    })
})

module.exports = router
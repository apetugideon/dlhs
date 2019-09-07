var express = require('express');
var router  = express.Router();


/**
 * import controllers
 */
var students = require('../controllers/Students');
/*var staffs = require('../controllers/Staffs');
var classes = require('../controllers/Classes');
var titles = require('../controllers/Titles');
var parents = require('../controllers/Parents');
var audits = require('../controllers/Audits');*/

/**
 * Import middlewares
 */
var cache    = require('../middlewares/cache');
var validate = require('../middlewares/validate');

/**
 * Students Endpoints
 * url: http://localhost:3000/students
 */
router.post('/students', students.createStudents, cache.clear);
router.get('/get_students', cache.get, students.getStudents, cache.set);
//router.get('/get_students_admno', cache.get, students.getStudentsByAdmNo, cache.set);
router.get('/get_students_admno/:admission_num/:surname/:class_id/:gender/', cache.get, students.getStudentsByAdmNo, cache.set);
/*router.get('/students/:student_id', cache.get, 
    students.getStudentById, cache.set);
router.put('/students/:student_id', 
    students.updateStudentById, cache.clear);
router.delete('/students/:student_id', students.destroy, cache.clear);*/
module.exports = router;
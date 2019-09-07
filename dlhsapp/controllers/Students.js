const models = require('../models/index');
const Student = require('../models/Student')(models.sequelize, models.Sequelize);

module.exports.createStudents = (req, res, next) => {
    Student.create(req.body)
    .then(student => {
        return res.json({
            "status":"success",
            "message":"Student data saved, successfully."
        });
    })
    .catch((err) => {
        console.log(err);
        return res.json({
            "status":"fail",
            "message":err.statusCode + err.statusText
        });
    });
}


module.exports.getStudents = (req, res, next) => {
    Student.findAll()
    .then((users) => {
        return res.json(users);
    })
    .catch((err) => {
        return res.json({
            "status":"Could not fetch records",
            "message":err.statusCode + err.statusText
        });
    });
}


const isEmptyObj = (obj) => {
    return Object.keys(obj).length === 0;
}


module.exports.getStudentsByAdmNo = (req, res, next) => {
    const whereClause = {};
    if((req.params.admission_num) && (req.params.admission_num != "__NA__")) {
        whereClause.admission_num = req.params.admission_num;
    }
    if((req.params.surname) && (req.params.surname != "__NA__")) {
        whereClause.surname = req.params.surname;
    }
    if((req.params.class_id) && (req.params.class_id != "__NA__")) {
        whereClause.class_id = req.params.class_id;
    }
    if((req.params.gender) && (req.params.gender != "__NA__")) {
        whereClause.gender = req.params.gender;
    }

    Student.findAll({
        where:whereClause
    })
    .then((users) => {
        return res.json(users);
    })
    .catch((err) => {
        return res.json({
            "status":"Could not fetch records",
            "message":err.statusCode + err.statusText
        });
    });
}
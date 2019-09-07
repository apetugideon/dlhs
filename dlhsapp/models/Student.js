module.exports = (sequelize, DataTypes) => {
    return sequelize.define('student', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        admission_num:{
            type: DataTypes.STRING,
            unique: 'CompositeIndex',
            allowNull: false
        },
        surname:{
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        middle_name: DataTypes.STRING,
        date_of_birth:{
            type: DataTypes.DATE,
            allowNull: false
        },
        gender: DataTypes.STRING,
        class_id: DataTypes.INTEGER,
        parent_id: DataTypes.INTEGER,
        year_of_admission: DataTypes.DATE,
        passport: DataTypes.STRING,
        created_by: DataTypes.INTEGER, 
        modified_by: DataTypes.INTEGER
    },{timestamp: false});
}

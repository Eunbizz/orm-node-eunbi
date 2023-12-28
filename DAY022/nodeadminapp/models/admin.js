module.exports = function(sequelize, DataTypes) {
    return sequelize.define('member',{
        admin_member_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false,
            comment:'관리자고유번호'},
        company_code:{
            type:DataTypes.INTEGER,
            allowNull:false,
            comment:'회사코드'},
        admin_id:{
            type:DataTypes.STRING(100),
            allowNull:false,
            comment:'관리자id'},
        admin_password:{
            type:DataTypes.STRING(500),
            allowNull:false,
            comment:'비밀번호'},
        admin_name:{
            type:DataTypes.STRING(100),
            allowNull:false,
            comment:'이름'},
        email:{
            type:DataTypes.STRING(100),
            allowNull:false,
            comment:'이메일'},
        telephone:{
            type:DataTypes.STRING(20),
            allowNull:false,
            comment:'전화번호'},
        dept_name:{
            type:DataTypes.STRING(100),
            allowNull:false,
            comment:'부서명'},
        used_yn_code: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment: '접속상태코드 0:아웃 1:접속중',
            },
        reg_user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '등록id',
            },
        edit_user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '수정id',
            },
        edit_date: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '수정일시',
            },
        reg_date: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '등록일시',
            }},
        {
        sequelize,
        tableName:'admin',
        timestamps:false,
        comment:'관리자테이블',
        indexes: [
            {
                name:'PRIMARY',
                unique:true,
                using:'BTREE',
                fields: [{name:'admin_member_id'}]
            }
        ]
    }
    )
        }

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('member',{
        member_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true, // 이 부분을 추가하면 됨
            comment: '멤버고유번호'},
        email:{
            type:DataTypes.STRING(100),
            allowNull:false,
            comment:'이메일'},
        member_password:{
            type:DataTypes.STRING(500),
            allowNull:false,
            comment:'비밀번호'},
        name:{
            type:DataTypes.STRING(100),
            allowNull:true,
            comment:'이름'},
        profile_img_path:{
            type:DataTypes.STRING(300),
            allowNull:true,
            comment:'이미지경로'},
        telephone:{
            type:DataTypes.STRING(20),
            allowNull:true,
            comment:'전화번호'},
        entry_type_code:{
            type:DataTypes.TINYINT,
            allowNull:true,
            comment:'가입경로 0:일반 1:SNS'},
        use_state_code: {
            type: DataTypes.TINYINT,
            allowNull: true,
            comment: '접속상태코드 0:아웃 1:접속중',
            },
        birth_date: {
            type: DataTypes.STRING(6),
            allowNull: true,
            comment: '생년월일',
            },
        reg_date: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '등록일시',
            },
        reg_member_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '등록자고유번호',
            },
        edit_date: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '등록일시',
            },
        edit_member_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '수정자고유번호',
            }},
        {
        sequelize,
        tableName:'member',
        timestamps:false,
        comment:'멤버테이블',
        indexes: [
            {
                name:'PRIMARY',
                unique:true,
                using:'BTREE',
                fields: [{name:'member_id'}]
            }
        ]
    }
    )
        }

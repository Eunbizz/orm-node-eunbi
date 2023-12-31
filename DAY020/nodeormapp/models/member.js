module.exports = function (sequelize, DataTypes) {

    // sequelize.define() 해당 모델 구조를 통해 물리적 테이블을 생성시키는 기능 제공
    // sequelize.define('테이블명', 관리항목(컬럼) 구조 정의, 테이블생성옵션)
    return sequelize.define(
      'member',
      {
          member_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          comment: '회원고유번호',
        },
        email: {
          type: DataTypes.STRING(100), //VARCHAR(100)
          primaryKey: false,
          allowNull: false,
          comment: '사용자메일주소',
        },
        password: {
            type: DataTypes.STRING(200), //VARCHAR(100)
            primaryKey: false,
            allowNull: false,
            comment: '사용자메일주소',
          }
        },
      {
         timestamps: true, // 등록일시(createdAT), 수정일시(updatedAT) 컬럼 자동생성
         paranoid: true  // 데이터 삭제 컬럼 자동 생성(deletedAT) 및 물리적 데이터 삭제안함 기능
     });
  };
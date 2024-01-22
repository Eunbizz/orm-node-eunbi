
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('channel',{
        channel_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: '채널고유번호',
            },
        community_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '커뮤니티id',
            },
        category_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '카테고리코드 1:공지 2:잡담',
            },
        channel_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '채널이름',
            },
        user_limit: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '최대접속자수',
            },
        channel_img_path: {
            type: DataTypes.STRING(200),
            allowNull: true,
            comment: '채널이미지경로',
            },
        channel_desc: {
            type: DataTypes.STRING(1000),
            allowNull: true,
            comment: '채널설명',
            },
        channel_state_code: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment: '채널상태코드 0:사용안함 1:사용중',
            },
        reg_date: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '등록일시',
            },
        reg_member_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
            }
        },
        {
        sequelize,
        tableName: 'channel',  // 기본 테이블명 옵션 복수형이 아닌 여기 지정한 테이블명으로 생성
        timestamps: false,
        comment: '채널정보테이블',
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'channel_id' }], // 여러개의 컬럼이 프라이머리키인 경우(복합키) {} 추가하여 설정
            },
        ],
        }
        );
        };
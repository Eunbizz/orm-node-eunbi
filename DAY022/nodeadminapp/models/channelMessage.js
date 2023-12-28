module.exports = function(sequelize, DataTypes) {
    return sequelize.define('channelMessage',{
        channel_msg_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: '채널메시지고유번호',
            },
        channel_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '커뮤니티id',
            },
        member_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '카테고리코드',
            },
        nick_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '채널이름',
            },
        msg_type_code: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment: '메시지유형코드 0:퇴장 1:입장 2:일반메시지 3:파일메시지',
            },
        connection_id: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: 'id',
            },
        message: {
            type: DataTypes.STRING(1000),
            allowNull: true,
            comment: '채팅',
            },
        ip_address: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: 'ip주소',
            },
        top_chanel_msg_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '',
            },
        msg_state_code: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '접속상태코드 0:아웃 1:접속중',
            },
        msg_date: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '등록일시',
            },
        edit_date: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '수정일시',
            },
        del_date: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '삭제일시',
            },
        },
        {
        sequelize,
        tableName: 'channel_msg',  // 기본 테이블명 옵션 복수형이 아닌 여기 지정한 테이블명으로 생성
        timestamps: false,
        comment: '채널메시지정보테이블',
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'channel_msg_id' }], // 여러개의 컬럼이 프라이머리키인 경우(복합키) {} 추가하여 설정
            },
        ],
        }
        );
        };

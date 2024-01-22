module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'channel_msg',
        {
            channel_msg_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                comment: '채널 메시지 고유번호',
            },
            channel_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                comment: '채널고유번호',
            },
            member_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '회원 고유번호',
            },
            nick_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: '채팅닉네임',
            },
            msg_type_code: {
                type: DataTypes.TINYINT,
                allowNull: false,
                comment: '메시지 유형코드 3:일반메시지, 4:파일메시지',
            },
            connection_id: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: '접속 ID',
            },
            message: {
                type: DataTypes.STRING(1000),
                allowNull: false,
                comment: '원본채팅메시지',
            },
            ip_address: {
                type: DataTypes.STRING(20),
                allowNull: true,
                comment: 'IP주소',
            },
            top_channel_msg_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: '최상위메시지고유번호',
            },
            msg_state_code: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: '메시지 상태코드 1:입장, 0:퇴장',
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
            tableName: 'channel_msg',
            comment: '채널채팅이력정보',
            timestamps: false,   // 등록일시(createAT), 수정일시(updateAT) 컬럼 자동생성
            indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "channel_msg_id" }],
				},
				{
					name: "FK_channel_id",
					using: "BTREE",
					fields: [{ name: "channel_id" }],
				},
			],
        }
    );
};

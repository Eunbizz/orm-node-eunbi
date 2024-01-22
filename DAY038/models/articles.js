module.exports = function(sequelize, DataTypes){
    return sequelize.define(
        'article',
    {
        article_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: '게시글고유번호',
        },
        board_type_code: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment: '게시판고유번호 1:공지사항게시판,2:일반사용자 게시판',
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false,
            comment: '글제목',
        },
        article_type_code: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment: '게시글유형코드 0:일반게시글 1:상단고정게시글',
        },
        contents: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '글내용',
        },
        view_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '조회수',
        },
        ip_address: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '작성자IP주소',
        },
        is_display_code: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment: '게시여부 0:게시안함 1:게시함',
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
        timestamps: false, 
        comment: '게시글정보', // 테이블에 대한 설명
        indexes: [ // 인덱스 설정
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'article_id' }] // 여러 개의 컬럼이 primaryKey인 경우 (복합키) {}로 묶어서 표현
            }
        ]
    });
}
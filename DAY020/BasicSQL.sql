USE modu_chat;

# member 테이블의 전체 컬럼(*) 데이터 조회
SELECT * FROM member;

# CREATE DATA - 데이터 등록/INSERT 구문
INSERT INTO member(email,member_password,name,profile_img_path,telephone,entry_type_code,use_state_code,birth_date,reg_date,reg_member_id)
VALUES('test1@test.co.kr','1234','김은비','','010-7640-7278',1,1,'001020',now(),1);

INSERT INTO member(email,member_password,name,profile_img_path,telephone,entry_type_code,use_state_code,birth_date,reg_date,reg_member_id)
VALUES('test1@test.co.kr','1234','김은비1','','010-7640-7270',1,1,'001020',now(),1);

INSERT INTO member(email,member_password,name,profile_img_path,telephone,entry_type_code,use_state_code,birth_date,reg_date,reg_member_id)
VALUES('test1@test.co.kr','1234','김은비2','','010-7640-7279',1,1,'001020',now(),1);

# READ DATA
SELECT * FROM member;
SELECT * FROM member WHERE email='test1@test.co.kr';
SELECT * FROM member WHERE entry_type_code=1 AND name='김은비';
SELECT * FROM member WHERE entry_type_code=1 OR name='김은비';
SELECT member_id,email,name,telephone FROM member WHERE member_id >=3;
SELECT * FROM member WHERE name IN('김은비2','김은비3');
SELECT * FROM member WHERE name LIKE '%김%';  # 패턴매칭
SELECT * FROM member ORDER BY member_id DESC;
SELECT * FROM member ORDER BY member_id ASC;

# UPDATE DATA
UPDATE member SET name='김은비0', profile_img_path='http://naver.com/images/test.png' WHERE member_id=1;
UPDATE member SET use_state_code=0 WHERE member_id>2;

# DELETE DATA
DELETE FROM member WHERE email='test4@test.co.kt';
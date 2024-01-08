// 회원 정보관리 RESTful API 전용 라우팅
// http://localhost:3000/api/member

var express = require('express');
var router = express.Router();

const Member = require('../schemas/member');

// Get all members
router.get('/all', async(req, res)=>{
    
    try{
        const members = await Member.find();
        res.json(members);
    } catch(err) {
        console.error(err) 
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// Create a new member
router.post('/create', async(req, res)=>{
    try {
        var email = req.body.email;
        var name = req.body.name;
        var password = req.body.password;
        var telephone = req.body.telephone;
        var birthDate = req.body.birthDate;
        
        var member = {
            email,
            name,
            member_password:password,
            telephone,
            birthDate,
            entry_type_code:1,
            use_state_code:1,
            reg_date:Date.now()
        }

        var member = await Member.create(member);
        res.json(member);
    } catch(err) {
        console.error(err) 
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// Modify an existing member
router.post('/modify/:id', async(req, res) =>{
    try {
        var memberId = req.params.id;

        var email = req.body.email;
        var name = req.body.name;
        var password = req.body.password;
        var telephone = req.body.telephone;
        var birthDate = req.body.birthDate;
        
        var member = {
            email,
            name,
            member_password:password,
            telephone,
            birthDate,
            entry_type_code:1,
            use_state_code:1,
            reg_date:Date.now()
        }

        var updatedMember = await Member.updateOne({where:{member_id:memberId}});
        res.json({updatedMember});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a member
router.post('/delete/:id', async(req, res) =>{
    try {
        var memberId = req.params.id;

        // deleteOne을 사용하여 멤버 삭제
        var deletedMember = await Member.deleteOne({ member_id: memberId });

        res.json({ deletedMember });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

// Get a single member by ID
router.get('/:mid', async(req, res) =>{
    try {
        var memberId = parseInt(req.params.cid, 10); // 10진수 정수로 변환

        var member = await Member.findOne({where:{member_id:memberId}});

        res.json({member});

    }catch (error) {
        console.error(error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

module.exports = router;
// 회원 정보관리 RESTful API 전용 라우팅
// http://localhost:3001/api/member

var express = require('express');
var router = express.Router();

var db = require('../models/index.js');
var Op = db.Sequelize.Op;

// router.post('/login', async(req,res)=>{
//     var email = req.body.email;
//     var password = req.body.password;

//     login = {
//         email,
//         member_password:password
//     };

//     var member = await db.Member.findOnde({where:{email:login.email}});

    
// })

// Get all members
router.get('/all', async(req, res)=>{

    var members = await getMembersData();
    res.json(members);
});

// Create a new member
router.post('/create', async(req, res)=>{
    // Logic to create a new member
    res.json({ message: "member created" });
});

// Modify an existing member
router.post('/modify', async(req, res) =>{
    // Logic to modify an existing member
    res.json({ message: "member modified" });
});

// Delete a member
router.post('/delete', async(req, res) =>{
    // Logic to delete a member
    res.json({ message: "member deleted" });
});

// Get a single member by ID
router.get('/:mid', async(req, res) =>{
    var memberId = parseInt(req.params.mid, 10); // 10진수 정수로 변환

    var members = await getMembersData();
    var member = members.find(m => m.member_id === memberId);

    res.json({ member});
});

module.exports = router;
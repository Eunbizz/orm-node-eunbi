// 회원 정보관리 RESTful API 전용 라우팅
// http://localhost:3000/api/member

var express = require('express');
var router = express.Router();

var fs = require('fs').promises;
var path = require('path');

var MEMBERS_FILE = path.join(__dirname, '../DB/members.json');

async function getMembersData() {
    const data = await fs.readFile(MEMBERS_FILE, 'utf8');
    return JSON.parse(data);
  }

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
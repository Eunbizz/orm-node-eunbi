// 회원 정보관리 RESTful API 전용 라우팅
// http://localhost:3000/api/member

// routes/memberAPI.js
var express = require('express');
var router = express.Router();

// Get all members
router.get('/all', function(req, res) {
    // Logic to fetch all members
    res.json({ message: "All members data" });
});

// Create a new member
router.post('/create', function(req, res) {
    // Logic to create a new member
    res.json({ message: "Member created" });
});

// Modify an existing member
router.post('/modify', function(req, res) {
    // Logic to modify an existing member
    res.json({ message: "Member modified" });
});

// Delete a member
router.post('/delete', function(req, res) {
    // Logic to delete a member
    res.json({ message: "Member deleted" });
});

// Get a single member by ID
router.get('/:mid', function(req, res) {
    var memberId = req.params.mid;
    // Logic to fetch a single member by memberId
    res.json({ message: "Single member data", memberId: memberId });
});

module.exports = router;
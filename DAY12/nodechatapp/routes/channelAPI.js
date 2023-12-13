// 채널/채팅 정보관리 RESTful API 전용 라우팅
// http://localhost:3001/api/channel

var express = require('express');
var router = express.Router();

// Get all channel
router.get('/all', function(req, res) {
    // Logic to fetch all channel
    res.json({ message: "All channel data" });
});

// Create a new channel
router.post('/create', function(req, res) {
    // Logic to create a new channel
    res.json({ message: "channel created" });
});

// Modify an existing channel
router.post('/modify', function(req, res) {
    // Logic to modify an existing channel
    res.json({ message: "channel modified" });
});

// Delete a channel
router.post('/delete', function(req, res) {
    // Logic to delete a channel
    res.json({ message: "channel deleted" });
});

// Get a single channel by ID
router.get('/:cid', function(req, res) {
    var channelId = req.params.cid;
    // Logic to fetch a single member by memberId
    res.json({ message: "Single channel data", channelId: channelId });
});

module.exports = router;

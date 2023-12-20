// 채널/채팅 정보관리 RESTful API 전용 라우팅
// http://localhost:3001/api/channel

var express = require('express');
var router = express.Router();

var fs = require('fs').promises;
var path = require('path');

var CHANNELS_FILE = path.join(__dirname, '../DB/channels.json');

async function getChannelsData() {
    const data = await fs.readFile(CHANNELS_FILE, 'utf8');
    return JSON.parse(data);
  }

// Get all channel
router.get('/all', async(req, res)=>{

    var channels = await getChannelsData();
    res.json(channels);
});

// Create a new channel
router.post('/create', async(req, res)=>{
    // Logic to create a new channel
    var channelName = req.body.channel_name;
    var channelDescription = req.body.channel_desc;
    
    var channel = {
        channel_id:1,
        channel_name:channelName,
        channel_desc:channelDescription
    };

    res.json(channel);
});
``
// Modify an existing channel
router.post('/modify', async(req, res) =>{
    // Logic to modify an existing channel
    res.json({ message: "channel modified" });
});

// Delete a channel
router.post('/delete', async(req, res) =>{
    // Logic to delete a channel
    res.json({ message: "channel deleted" });
});

// Get a single channel by ID
router.get('/:cid', async(req, res) =>{
    var channelId = parseInt(req.params.cid, 10); // 10진수 정수로 변환

    var channels = await getChannelsData();
    var channel = channels.find(c => c.channel_id === channelId);

    res.json({ channel});
});

module.exports = router;



var express = require('express');
var router = express.Router();

router.get('/join', function(req, res){
    res.render('member/join.ejs')
});

router.get('/entry', function(req, res){
    res.render('member/entry.ejs')
});

router.post('/entry', function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    var telephone = req.body.telephone;

    res.redirect('/auth/login')
});

module.exports = router;
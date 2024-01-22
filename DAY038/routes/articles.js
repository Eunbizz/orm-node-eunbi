// 라우터 기본 주소
// http://localhost:3001/articles
var express = require('express');
var router = express.Router();
const path = require('path');
var db = require('../models/index.js');
var Op = db.Sequelize.Op;

var searchOption = {
    board_type_code:0, 
    title:"",
    is_display_code:9
};

router.get('/list', async(req, res)=>{
    searchOption = {
        board_type_code:0, 
        title:"",
        is_display_code:9
    };
    try {
        var articles = await db.articles.findAll()
        res.render('articles/list',{articles, searchOption});
    } catch (err) {
        console.error("Error reading the file:", err);
        res.status(500).send("Error reading the user data.");
    }
});

router.post('/list', async(req, res)=>{
    const { board_type_code, title, is_display_code } = req.body;
    let whereClause = {};
    if (board_type_code !== '0') {whereClause.board_type_code = board_type_code;}
    if (title) {whereClause.title = { [Op.like]: `%${title}%` };}
    if (is_display_code !== '9') {whereClause.is_display_code = is_display_code;}
    try {
        var articles = await db.articles.findAll({ where: whereClause });
        searchOption = { board_type_code, title, is_display_code }; 
        res.render('articles/list',{articles, searchOption});
    } catch (err) {
        console.error("Error reading the file:", err);
        res.status(500).send("Error reading the user data.");
    }

});

router.get('/create',async(req,res)=>{
    res.render('articles/create');
});

router.post('/create',async(req,res)=>{
    var board_type_code = req.body.board_type_code;
    var title = req.body.title;
    var article_type_code = req.body.article_type_code;
    var contents = req.body.contents;
    var view_count = 0;
    var ip_address = '123.123.111.1';
    var is_display_code = req.body.is_display_code;
    var reg_date = Date.now();
    var reg_member_id = 1;

    var article = {
        board_type_code,
        title,
        article_type_code,
        contents,
        view_count,
        ip_address,
        is_display_code,
        reg_date,
        reg_member_id
    }

    await db.articles.create(article);

    res.redirect("/articles/list");
});

router.get('/modify/:aid',async(req,res)=>{
    var article_id = req.params.aid;
    var article = await db.articles.findOne({
        where:{
            article_id
        }
    });
    res.render('articles/modify', {article});
});

router.post('/modify/:aid',async(req,res)=>{
    var article_id = req.params.aid;
    console.log(typeof(req.body.is_display_code))
    var board_type_code = req.body.board_type_code;
    var title = req.body.title;
    var article_type_code = req.body.article_type_code;
    var contents = req.body.contents;
    var view_count = 0;
    var ip_address = '123.123.111.1';
    var is_display_code = req.body.is_display_code;
    var edit_date = Date.now();
    var edit_member_id = 1;

    var article = {
        board_type_code,
        title,
        article_type_code,
        contents,
        view_count,
        ip_address,
        is_display_code,
        edit_date,
        edit_member_id
    }
    try {
        await db.articles.update(article,{
            where:{
                article_id
            }
        });
        res.redirect("/articles/list");

    } catch (err) {
        console.error("Error updating the file:", err);
        res.status(500).send("Error updating the user data.");
    }
});

router.get('/delete/:aid',async(req, res)=>{
    var article_id = req.params.aid;
    try {
        await db.articles.destroy({
            where:{
                article_id
            }
        });
        res.redirect("/articles/list");
    } catch (err) {
        console.error("Error deleting the file:", err);
        res.status(500).send("Error deleting the user data.");
    }
});

module.exports = router;
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// express-ejs-layouts 패키지 참조
var expressLayouts = require('express-ejs-layouts');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var adminRouter = require('./routes/admin')
var articleRouter = require('./routes/article')
var memberRouter = require('./routes/member')
var channelRouter = require('./routes/channel')
var messageRouter = require('./routes/message')

var sequelize = require('./models/index.js').sequelize;

var app = express();

sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 레이아웃 설정
app.set('layout', 'layout.ejs'); // 해당 노드앱의 모든 (콘텐츠) 뷰파일의 기본 레이아웃 ejs 파일 설정
app.set("layout extractScripts", true); // 콘텐츠 페이지 내 script 태그를 레이아웃에 통합할지 여부
app.set("layout extractStyles", true);
app.set("layout extractMetas", true); 
app.use(expressLayouts);

// 레이아웃 설정
app.set('loginLayout', 'loginLayout.ejs'); // 해당 노드앱의 모든 (콘텐츠) 뷰파일의 기본 레이아웃 ejs 파일 설정
app.set("layout extractScripts", true); // 콘텐츠 페이지 내 script 태그를 레이아웃에 통합할지 여부
app.set("layout extractStyles", true);
app.set("layout extractMetas", true); 
app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/admin', adminRouter);
app.use('/article', articleRouter);
app.use('/member', memberRouter);
app.use('/channel', channelRouter);
app.use('/message', messageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

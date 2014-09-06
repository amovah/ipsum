var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/ipsum', {maxAge: 60*60*24*7}));

module.exports.app = app;

app.get(/.*\/.*\/.*/, function(req, res) {

  res.end('<head><meta charset="UTF-8"></head><p dir="rtl">' + go(req.url) + '</p>');
})

if(!String.prototype.repeat) {
  String.prototype.repeat = function(n) {
    return new Array(n+1).join(this);
  }
}


/* IPSUM GENERATOR */
var general = require('./general.json');
var dictionary = {
  'design': require('./design.json')
}
var normal = 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیستری را برای طراحان رایانه ای و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.';
function randomAlamat() {
  if(Math.floor(Math.random() * 4) > 0) return ' ';
  else {
    if(Math.floor(Math.random() * 4) > 0) return ' ';
    else return '، ';
  }
}
function loremipsum(data) {
  var method = data[0],
      unit = data[1],
      amount = +data[2];


  if(method == 'normal') {
    switch(unit) {
      case 'c':
        return normal.slice(0, amount);
      case 'p':
        return normal.repeat(amount);
      case 'w':
        return normal.split(' ').slice(0, amount).join(' ');
    }
  }

  var d = dictionary[method].concat(general),
      r = d.sort(function(a, b) {
        return Math.random() > 0.5;
      });

  var stretch = function stretch(a, n) {
    var d = a;
    while(d.length < n) {
      d = d.concat(a);
    }
    return d;
  }

  switch(unit) {
    case 'c':
      r = stretch(r, amount/2);
      return r.slice(0, amount/2).join(' ').slice(0, amount + (amount/4-1));
    case 'w':
      r = stretch(r, amount);
      return r.slice(0, amount).join(' ');
    case 'p':
      r = stretch(r, 15*(Math.random()+1));
      var s = r.join(' ') + '. <br>';
      for(var i = 1; i < amount; i++) {
        r = r.sort(function() { return Math.random() > 0.5; });
        r = stretch(r, 15*(Math.random()*3+2));

        s += r.join(' ') + '. <br>';
      }
      return s;
  }
}
function go(url) {
  var req = url.split('/'),
      data = {};
  req.splice(0, 1);
  for(var i = 0, len = req.length; i < len; i++) {
    data[i] = req[i];
  }
  return loremipsum(data);
}
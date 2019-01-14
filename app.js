var express = require('express');
var app= express();
var cors = require('cors');
var bodyParser = require("body-parser");
global.__base = process.cwd() + '/';
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(global.__base + '/view'));
app.enable('trust proxy')
app.set('trust proxy', true)
app.options(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*'); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors())
function getdata(filename,ip){
    var arr = []
    var text = fs.readFileSync(filename, 'utf8');
    var file = text.toString().split("\n")
    for(var i = 0; i < file.length;i++){
        if(arr.length >= 30 && file[i] === "") {
            break
        }
        else if(file[i] === "") arr.push("END")
        else {
            arr.push(file[i])
        }
    }
    var count = 0
    for ( var i =0; i < arr.length;i++) { 
        if( arr[i] === ""){
            arr.splice(i,1)
        }
    }
    var a = text.toString().split("\n")
    a.splice(0,arr.length)
    // fs.writeFileSync(filename,a.join("\n"))
    return arr  
}

function gettag(num){
    switch(num){
        case 0 : return "OTHER";
        case 1 : return "NUMBER";
        case 2 : return "PRO_TYPE";
        case 3 : return "B_PRO";
        case 4: return "I_PRO";
        case 5 : return "STREET_TYPE";
        case 6 : return "B_STREET";
        case 7 : return "I_STREET";
        case 8 : return "WARD_TYPE" ;
        case 9 : return "B_WARD";
        case 10 : return "I_WARD";
        case 11 : return "DIST_TYPE";
        case 12 : return "B_DIST";
        case 13 : return "I_DIST";
        case 14 : return "CITY_TYPE";
        case 15 : return "B_CITY";
        case 16 : return "I_CITY";
        case 17 : return "NUMBER_TYPE"
        default : return "OTHER";
    }
}

app.get('/', function(req, res, next) {
    res.sendFile(__dirname+'/view/'+'index.html');
  });

app.post('/tag', function(req, res, next) {
    var s = req.ip
    var data = req.body.data
    for(var i = 0; i < data.length;i++){
        for(var j = 0; j < data[i].length;j++){
            var name = data[i][j]["name"]
            var tag = Number(data[i][j]["tag"])
            fs.appendFileSync(__dirname+'/data/results/res-'+s+'.txt', name + " " + gettag(tag));
            fs.appendFileSync(__dirname+'/data/results/res-'+s+'.txt', "\n");
        }
        fs.appendFileSync(__dirname+'/data/results/res-'+s+'.txt', "\n");
    }
    fs.close
    res.end("")
  });

app.get('/data',function(req,res,next){
    var num = Math.floor(Math.random() * 98) + 1;
    var filename = __dirname+'/data/source/tag_'+num.toString()+'.txt';
    var data = getdata(filename)
    res.send(data)
})  ;

app.post('/exit',function(req,res,next){
    var num = Math.floor(Math.random() * 98) + 1;
    var filename = __dirname+'/data/source/tagt_'+num.toString()+'.txt';
    var data = req.body.data
    for(var i = 0; i < data.length;i++){
        if(data[i]==="END"){
            fs.appendFileSync(filename,"\n");
        }else{
            fs.appendFileSync(filename,data[i])
            fs.appendFileSync(filename,"\n");
        }
    }
    fs.close
    res.end("OK")
});

app.get('/out',function(req,res,next){
    res.sendFile(__dirname+'/view/'+'exit.html');
});

app.listen(process.env.PORT||3000);

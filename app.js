var express = require('express');
var app= express();
var bodyParser = require("body-parser");
global.__base = process.cwd() + '/';
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(global.__base + '/view'));

function getdata(filename){
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
    fs.writeFileSync(filename,a.join("\n"))
    return arr  
}

function gettag(num){
    switch(num){
        case 0 : return "O";
        case 1 : return "SO";
        case 2 : return "DU_AN_TYPE";
        case 3 : return "DU_AN";
        case 4 : return "DUONG_TYPE";
        case 5 : return "DUONG";
        case 6 : return "PHUONG_XA_TYPE";
        case 7 : return "PHUONG_XA" ;
        case 8 : return "QUAN_HUYEN_TYPE";
        case 9 : return "QUAN_HUYEN";
        case 10 : return "THANH_PHO_TYPE";
        case 11 : return "THANH_PHO";
        default : return "O";
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
            fs.appendFileSync(__dirname+'/data/res-'+s+'.txt', name + " " + gettag(tag));
            fs.appendFileSync(__dirname+'/data/res-'+s+'.txt', "\n");
        }
        fs.appendFileSync(__dirname+'/data/res-'+s+'.txt', "\n");
    }
    res.redirect("http://localhost:8000/")
  });

app.get('/data',function(req,res,next){
    var filename = __dirname+'/data/tag.txt';
    var data = getdata(filename)
    res.send(data)
})  ;

app.listen(process.env.PORT||8000);

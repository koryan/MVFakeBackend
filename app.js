var express = require('express');
var http = require('http');
var app = module.exports = express();

var postNotGetString = "<h2>Упрлс? Постом надо! Постом!</h2>"
var validDataString = "<h4>Валидные тестовые данные:</h4>"


app.set('port', 8000);



app.get('/sendMsg/:text/:chatId', function(req, res, next){ 
    
    if(!chats[req.params.chatId]){
        res.send("Chat "+ req.params.chatId + " not found ^(");
        console.log("Chat "+ req.params.chatId + " not found ^(")
        return
    }

    chats[req.params.chatId].sendMsg(req.params.text)
    res.send("sended private to "+getChatName(chats[req.params.chatId].data));
}); 


app.get('/login', function(req, res, next){ 
    res.send(postNotGetString+validDataString+`        
        <p>`+JSON.stringify({login:'alexandr',password:'buyanov'})+`</p>
    `);
})

app.post('/login', function(req, res, next){ 
    console.log(req.body.login)
    console.log(req.body.password)
})

app.get('/logout', function(req, res, next){ 
    res.send(postNotGetString);
})

app.post('/logout', function(req, res, next){ 
    
    res.send("Ok");
})


app.get('/', function(req, res, next){ 
    var urls = [
        {
            url: "login",
            name: "авторизация",
            input: {login:'%login%', password: '%password%'},
            output: [200, 403]
        },
        {
            url: "logout",
            name: "деавторизация",
            input: {},
            output: [200]
        },


        
        //"sendMsg/<b>строка</b>":"рассылка строки во ВСЕМ комнатам", 
        //"sendMsg/<b>строка</b>/<i>id комнаты</i>":"отсылка строки в конкретную комнату"}
        ]
    var ans = ""
    for(var i in urls){
        ans+="<tr><td>/"+urls[i].url+"</td><td>"+urls[i].name+"</td><td>"+JSON.stringify(urls[i].input)+"</td><td>"+JSON.stringify(urls[i].output)+"</td>"
    }
    var ans = "<h3>Urls list</h3><table border='1'>"+ ans +"</table>"
    res.send(ans);
}); 

app.get('*', function(req, res, next){ 
    res.send("<h1>Упрлс? 404!</h1>");
});



http.createServer(app).listen(app.get('port'), function () {
  console.log('Server listening on port ' + app.get('port'));
});
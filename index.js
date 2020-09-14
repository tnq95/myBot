var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const axios = require('axios')

app.use(bodyParser.json()) 
app.use(
  bodyParser.urlencoded({
    extended: true
  })
) 


app.post('/new-message', function(req, res) {
  const { message } = req.body


  if (!message || message.text.toLowerCase().indexOf('Hello!') < 0) {
    return res.end()
  }

  axios
    .post(
      'https://api.telegram.org/bot1211275130:AAHo1tuRtPXcdWVSSLoH_iqKJs3HrnYTbq8/sendMessage',
      {
        chat_id: message.chat.id,
        text: 'Hello master!'
      }
    )
    .then(response => {
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      console.log('Error :', err)
      res.end('Error :' + err)
    })
})


app.listen(5000, function() {
  console.log('Telegram app listening on port 5000!')
})
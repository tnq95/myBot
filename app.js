const Bot = require('node-telegram-bot-api');
const request = require('request');

const token = "1324585775:AAGtjdNMMHTolUtiVVYHcuqzc9Ol8Q0MPTU";
//const url = 'https://launchlibrary.net/1.3/launch';
const trigger = 'E ku!';
const reqs = {
    'request_1': 'Bật đèn cho tao',
    'request_2': 'Tắt đèn cho tao'
};

const bot = new Bot(token, { polling: true });

const prepareData = (body) => {
    const launches = JSON.parse(body).launches;
    return launches.filter((launch) => launch !== undefined)
        .map((launch) => `${launch.name} on ${launch.net}`)
        .join('\n\n');
};

bot.on('message', (msg) => {
    if (msg.text.toString().trim() === trigger) {
        // return request(url, (err, resp, body) => {
        //     bot.sendMessage(msg.chat.id, prepareData(body));
        // });
        return bot.sendMessage(msg.chat.id, 'Hi, What do you want?', {
            reply_markup: {
                keyboard: [[reqs.request_1], [reqs.request_2]]  //Bulk option
            }
        });
    }

    if (msg.text.toString().trim() === reqs.request_1) {

        var config = {
            method: 'post',
            url: 'https://maker.ifttt.com/trigger/Button_press/with/key/n5kB6YSspISACrKA5TBf6jplW4xQIkxJ3beMl95zV6g/?value1=1',
            headers: {}
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
                return bot.sendMessage(msg.chat.id, 'Lỗi rồi boss ơi!');
            });
        return bot.sendMessage(msg.chat.id, 'OK, chờ tí');

    }

    if (msg.text.toString().trim() === reqs.request_2) {
        var config = {
            method: 'post',
            url: 'https://maker.ifttt.com/trigger/Button_press/with/key/n5kB6YSspISACrKA5TBf6jplW4xQIkxJ3beMl95zV6g/?value1=0',
            headers: {}
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
                return bot.sendMessage(msg.chat.id, 'Lỗi rồi boss ơi!');
            });
        return bot.sendMessage(msg.chat.id, 'OK, chờ tí');
    }
});


const Discord = require("discord.js")
const config = require("./config.json")
const cheerio = require('cheerio')
const request = require('request')

const client = new Discord.Client();


const prefixo = "+" // Adiciona o prefixo quando o usuário for digitar no discord +comando



client.on("message", (message) => {
    if (message.author.bot) return
    if (!message.content.startsWith(prefixo)) return

    const tirarPrefixo = message.content.slice(prefixo.length)
    const tirarAspas = tirarPrefixo.split(' ')
    const comando = tirarAspas.shift().toLocaleLowerCase()
    if (comando === "comandos") {
        message.reply(`os comandos são : 
        +ping
        +noticias
        +bitcoin
        +dollar
        `)
    }
    else if (comando === "ping") {
        const tempoLevado = (Date.now() - message.createdTimestamp) * -1
        message.reply(`pong , o delay  é de ${tempoLevado}`)
    } else if (comando === "noticias") {
        function lerPagina(url) {
            request(url, (err, resp, body) => {
                if (err) throw new Error(err)

                const $ = cheerio.load(body)

                const noticia = $('.tileItem > h6').text()

                return message.reply(`aqui estão as notícias do IFGoiano Campus Urutaí ${noticia}`)
            })
        }
        lerPagina('https://www.ifgoiano.edu.br/home/index.php/urutai.html')
    } else if (comando === "bitcoin") {
        request('https://economia.awesomeapi.com.br/json/all', (err, res, body) => {
            const valorFormatado = JSON.parse(body)
            message.reply(`A o valor do Bitcoin atualmente é de : ${valorFormatado.BTC.bid}R$`)
        })
    } else if (comando === "dollar") {
        request('https://economia.awesomeapi.com.br/json/all', (err, res, body) => {
            const valorFormatado = JSON.parse(body)
            message.reply(`o valor do Dollar comercial hoje é de : ${valorFormatado.USD.bid}R$`)
        })
    }
})



client.login(config.BOT_TOKEN);

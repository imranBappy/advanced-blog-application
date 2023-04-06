const cheerio = require('cheerio')
const truncate = (html) => {
    let node = cheerio.load(html)
    let text = node.text()
    text = text.replace(/(\r\r|\n|\r)/gm, '')
    if (text.length <= 100) return text
    return text.substring(0, 100) + '...'
}

console.log(truncate('<p><img src="xxx.jpg">Hello from earth!</p>'));
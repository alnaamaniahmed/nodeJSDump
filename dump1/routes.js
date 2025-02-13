const fs = require('fs');
const { Module } = require('module');



const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write("<html>");
        res.write("<head><title>My Node Page</title></head>");
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><br><button type="submit">Send</button></form></body>');
        res.write("</html>");
        return res.end();
    }
    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync("message.txt", message);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
}

module.exports = requestHandler;
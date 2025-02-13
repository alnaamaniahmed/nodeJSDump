const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>plughty server</title></head>');
        res.write('<body><h1>Greetings pluh</h1><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">SEND PLUH</button></form></body');
        res.write('</html>');
        return res.end();
    }
    if(url === '/users'){
        res.write('<html>');
        res.write('<head><title>plughty server</title></head>');
        res.write('<body><ul><li>user1</li><li>user2</li><li>user3</li></ul></body');
        res.write('</html>');
        return res.end();
    }
    if(url === '/create-user' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            console.log(username);
        });
    }
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
}

module.exports = requestHandler;
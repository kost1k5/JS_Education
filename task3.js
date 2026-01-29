const http = require('http');
const url = require('url');

function gcd(a, b) {
    
    while (b) {
        a %= b;
        [a, b] = [b, a];
    }
    return a;
}

function lcm(x, y) {
const numX = Number(x);
const numY = Number(y);

if (isNaN(numX) || isNaN(numY) || numX <= 0 || numY <= 0 || !Number.isInteger(numX) || !Number.isInteger(numY))
     {
    return "NaN";
}
    return (numX * numY) / gcd(numX, numY);
}

const server = http.createServer((req, res) => {
  
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname; 
    const query = parsedUrl.query;      

    
    const myPath = '/kostyatv1790_gmail_com'; 

    if (pathname === myPath) {
       
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        
       
        const result = lcm(query.x, query.y);
        
        
        res.end(String(result));
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000' + '/kostyatv1790_gmail_com');
});


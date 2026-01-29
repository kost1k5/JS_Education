const http = require('http');
const url = require('url');

function gcd(a, b) {
    
    while (b > 0n) {
        a %= b;
        [a, b] = [b, a];
    }
    return a;
}

function lcm(x, y) {
    try {
        // 1. Пытаемся превратить входные данные в BigInt
        const bigX = BigInt(x);
        const bigY = BigInt(y);

        // 2. Проверка на натуральность (должны быть > 0)
        if (bigX <= 0n || bigY <= 0n) {
            return "NaN";
        }

        // 3. Считаем НОК через BigInt
        // Формула та же, но используем BigInt-логику
        const result = (bigX * bigY) / gcd(bigX, bigY);
        
        // Возвращаем как строку, BigInt автоматически уберет "e+" и даст только цифры
        return result.toString();
        
    } catch (e) {
        // Если пришла дробь (1.5) или буквы, BigInt() выдаст ошибку, ловим её и возвращаем NaN
        return "NaN";
    }
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

const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});


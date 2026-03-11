const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// This handles the "Pre-flight" OPTIONS request browsers send
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use('/', createProxyMiddleware({
    target: 'https://api.groq.com',
    changeOrigin: true,
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy running on port ${PORT}`);
});

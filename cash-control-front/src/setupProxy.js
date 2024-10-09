const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',  // You can define the route you want to proxy here
        createProxyMiddleware({
            target: process.env.REACT_APP_PROXY_URL,
            changeOrigin: true,
        })
    );
};

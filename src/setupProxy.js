const { createProxyMiddleware } = require('http-proxy-middleware');

const proxies = [
  {
    target: process.env.REACT_APP_API_ITEMS_URL,
    url: '/api/items',
  },
];

module.exports = (app) => {
  proxies.forEach(({ target, url }) => {
    app.use(
      url,
      createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: {
          [`^${url}`]: '',
        },
        // for debug
        // onProxyReq: function onProxyReq(proxyReq, req, res) {
        //   // Log outbound request to remote target
        //   console.log('-->  ', req.method, req.path, '->', proxyReq.baseUrl + proxyReq.path);
        // },
        // onError: function onError(err, req, res) {
        //   console.error(err);
        //   res.status(500);
        //   res.json({ error: 'Error when connecting to remote server.' });
        // },
        // logLevel: 'debug',
      })
    );
  });
};

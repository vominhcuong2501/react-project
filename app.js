/* eslint-disable @typescript-eslint/no-var-requires */

const express = require('express');
const next = require('next');
const httpProxy = require('http-proxy');
const path = require('path');
const requestIp = require('request-ip');

const port = parseInt(process.env.PORT, 10) || 3000;
const hostname = 'localhost';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
const cookieParser = require('cookie-parser');
const routes = require('./server/routes/index');

app.prepare().then(() => {
  const server = express();
  server.use(express.json());
  server.use(requestIp.mw());
  server.use(express.static(path.join(__dirname, './public')));
  server.use('/_next', express.static(path.join(__dirname, './.next')));
  server.use(express.urlencoded({ extended: false }));
  server.use(cookieParser());

  const proxy = httpProxy.createProxyServer();
  routes.routes(server);

  server.use((req, res, nextFn) => {
    let ip = req.clientIp;
    let user_agent = req.get('User-Agent');
    if (ip.substr(0, 7) === '::ffff:') ip = ip.substr(7);
    res.cookie('ip', ip, { maxAge: 6000000 });
    res.cookie('user_agent', user_agent, { maxAge: 6000000 });
    nextFn();
  });

  server.all('/api/*', (req, res) => {
    req.url = req.url.replace('/api', '');
    proxy.web(req, res, {
      target: process.env.NEXT_PUBLIC_API_URL,
      changeOrigin: true,
    });
  });

  server.all('*', (req, res) => {
    handle(req, res);
  });

  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`>>> Ready on: http://localhost:${port}`);
  });
});

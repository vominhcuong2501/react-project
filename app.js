/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const next = require('next');
const httpProxy = require('http-proxy');
const path = require('path');

const port = parseInt(process.env.PORT, 10) || 3000;
const hostname = 'localhost';
const app = next({ dev: false, hostname, port });
const handle = app.getRequestHandler();
const routes = require('./server/routes/index');

app.prepare().then(() => {
  const server = express();
  server.use(express.json());
  server.use(express.static(path.join(__dirname, './public')));
  server.use('/_next', express.static(path.join(__dirname, './.next')));
  server.use(express.urlencoded({ extended: false }));

  const proxy = httpProxy.createProxyServer();
  routes.routes(server);

  server.all('/api/*', (req, res) => {
    req.url = req.url.replace('/api', '');
    proxy.web(req, res, {
      target: process.env.NEXT_PUBLIC_API_URL,
      changeOrigin: true,
    });
  });

  server.all('*', (req, res) => handle(req, res));

  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`>>> Ready on: http://localhost:${port}`);
  });
});

const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const containers = {};

const server = http.createServer((req, res) => {
  const {host} = req.headers;
  const subdomain = host.substring(0, host.indexOf('.'));
  const {containerName, port} = containers[subdomain];
  proxy.web(req, res, { target: `http://${containerName}:${port}/` });
});

console.log("Nodez proxy is listening on port 5050.");
server.listen(5050);

const addProxy = (subdomain, containerName, port) => {
  containers[subdomain] = {
    containerName,
    port,
  };
};

module.exports = {
  addProxy,
};

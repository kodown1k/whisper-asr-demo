const https = require("https");
const fs = require("fs");
const express = require('express')
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware')

const port = 3000
const app = express()
https.createServer(
	{
		key: fs.readFileSync("ssl/test.key"),
		cert: fs.readFileSync("ssl/test.crt"),
	},
	app
)
	.listen(port, '0.0.0.0', ()=>{
		console.log(`CORS proxy server is running at https, port ${port}`);
	});
app.use(cors())

app.use(
  '/proxy',
  createProxyMiddleware({
//	target: 'http://127.0.0.1:9005',
    target: 'http://asr-webservice:9000',
    changeOrigin: true,
    pathRewrite: {
      '^/proxy': '',
    },
  })
)

//app.listen(port, '0.0.0.0', () => {
//  console.log(`CORS proxy server is running at http://localhost:${port}`)
//})

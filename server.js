import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const PORT = process.env.PORT || 3000;

const serveHtml = (res, filename) => {
  const filePath = path.join(__dirname, "public", filename);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>Server Error</h1>");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
};

const server = http.createServer((req, res) => {
  // Handle CSS File rendering
  if (req.url === "/style.css") {
    const cssPath = path.join(__dirname, "public", "style.css");
    fs.readFile(cssPath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("CSS file not found");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      }
    });
    return;
  }

  //   Handle HTML Page rendering
  if (req.url === "/" || req.url === "/index") {
    serveHtml(res, "index.html");
  } else if (req.url === "/about") {
    serveHtml(res, "about.html");
  } else if (req.url === "/contact") {
    serveHtml(res, "contact.html");
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - Page Not Found</h1>");
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

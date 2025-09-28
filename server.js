import http from "http";
import url from "url";
import fs from "fs";
import Utils from "./utils.js";

const util = new Utils();

const data = JSON.parse(fs.readFileSync("en.json"));
const rawMessage = data.landing;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const name = parsedUrl.query.name;
    const message = rawMessage.replace("{name}", name).replace("{date}", util.getDate());

    res.writeHead(200, {"Content-Type": "text/html" });
    res.end(`<p style="color: blue;">${message}</p>`);
});

server.listen(8000, () => {
    console.log("Server listening on port 8000");
});
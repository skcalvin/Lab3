import http from "http";
import url from "url";
import fs from "fs";
import Utils from "./utils.js";

const util = new Utils();

const data = JSON.parse(fs.readFileSync("en.json"));
const rawMessage = data.landing;

// server creation
const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // root path
    if (pathname === "/") {
        const name = parsedUrl.query.name;
        const message = rawMessage.replace("{name}", name).replace("{date}", util.getDate());

        res.writeHead(200, {"Content-Type": "text/html" });
        res.end(`<p style="color: blue;">${message}</p>`);
    // writeFile path
    } else if (pathname === "/writeFile") {

        const text = parsedUrl.query.text;
        // write to file.txt
        fs.appendFile("./file.txt", text + "\n", (err) => {
            if (err) {
                res.writeHead(500, {"Content-Type": "text/plain" });
                res.end("Error writing file");
            } else {
                res.writeHead(200, {"Content-Type": "text/plain" });
                res.end("File written successfully");
            }
        });
    // readFile path
    } else if (pathname.startsWith("/readFile/")) {
        const requestedFile = pathname.replace("/readFile/", "");
        // read from file.txt
        fs.readFile(`./${requestedFile}`, "utf8", (err, data) => {
            if (err) {
                res.writeHead(500, {"Content-Type": "text/plain" });
                res.end("Error reading file");
            } else {
                res.writeHead(200, {"Content-Type": "text/plain" });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("404 Not Found");
    }
});

server.listen(8000, () => {
    console.log("Server listening on port 8000");
});
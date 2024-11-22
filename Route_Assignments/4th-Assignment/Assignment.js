const os = require("os");
const http = require("http");
const path = require("path");
const fs = require("fs");
const EventEmitter = require("events");
const { isUtf8 } = require("buffer");
const fileEmitter = new EventEmitter();
const zlib = require("zlib");
const Port = 3000;
fileEmitter.on("fileCreated", (fileName) => {
  console.log(`Event emitted: fileCreated for ${fileName}`);
});
fileEmitter.on("fileDeleted", (fileName) => {
  console.log(`Event emitted: fileDeleted for ${fileName}`);
});
const app = http.createServer((request, response) => {
  const { url, method } = request;

  if (method === "POST" && url === "/path-info") {
    let data = "";
    request.on("data", (chunk) => {
      data += chunk;
    });
    request.on("end", () => {
      const { filePath } = JSON.parse(data);
      const parsedPath = path.parse(filePath);
      const responseBody = {
        parsedpath: {
          root: parsedPath.root,
          dir: parsedPath.dir,
          base: parsedPath.base,
          ext: parsedPath.ext,
          name: parsedPath.name,
        },
        formattedPath: filePath,
      };
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(responseBody));
    });
  } else if (method === "POST" && url === "/path-check") {
    let data = "";
    request.on("data", (chunk) => {
      data += chunk;
    });
    request.on("end", () => {
      const { filePath } = JSON.parse(data);
      const isAbsolute = path.isAbsolute(filePath);
      const resolvedPath = path.resolve(filePath);
      const basename = path.basename(filePath);
      const joinedPath = path.join(filePath);
      const responseBody = {
        isAbsolute,
        joinedPath,
        resolvedPath,
        basename,
        fileName: path.basename(filePath),
        extension: path.extname(filePath),
      };
      response.writeHead(200, { "Content-type": "Application/json" });
      response.end(JSON.stringify(responseBody));
    });
  } else if (method === "POST" && url === "/create-file") {
    let data = "";
    request.on("data", (chunk) => {
      data += chunk;
    });
    request.on("end", () => {
      const { fileName, content } = JSON.parse(data);
      const filePath = path.join(__dirname, fileName);
      fs.writeFile(filePath, content, (error) => {
        if (error) {
          response.writeHead(404, { "content-type": "application/json" });
          return response.end(JSON.stringify("error"));
        }
        fileEmitter.emit("fileCreated", fileName);
        response.writeHead(200, { "content-type": "application/json" });
        response.end(JSON.stringify({ message: "file is created", fileName }));
      });
    });
  } else if (method === "DELETE" && url === "/delete-file") {
    let data = "";
    request.on("data", (chunk) => {
      data += chunk;
    });
    request.on("end", () => {
      const { fileName } = JSON.parse(data);
      const filePath = path.join(__dirname, fileName);
      fs.unlink(filePath, (error) => {
        if (error) {
          response.writeHead(404, { "content-type": "application/json" });
          return response.end(
            JSON.stringify("error, there's not file to delete")
          );
        }
        fileEmitter.emit("fileDeleted", fileName);
        response.writeHead(200, { "content-type": "application/json" });
        response.end(JSON.stringify({ message: "file is deleted", fileName }));
      });
    });
  } else if (method === "GET" && url === "/system-info") {
    const systemInfo = {
      architecture: os.arch(),
      platform: os.platform(),
      freeMemory: os.freemem(),
      totalMemory: os.totalmem(),
    };
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(systemInfo));
  } else if (method === "POST" && url === "/append-Async") {
    let data = "";
    request.on("data", (chunk) => {
      data += chunk;
    });
    request.on("end", () => {
      const { fileName, content } = JSON.parse(data);
      const filePath = path.join(__dirname, fileName);
      fs.appendFile(filePath, content, (error) => {
        if (error) {
          response.writeHead(404, { "content-type": "application/json" });
          response.end(JSON.stringify({ message: "error" }));
        }
        response.writeHead(200, { "content-type": "application/json" });
        response.end(
          JSON.stringify({
            message: "File Appended successfully",
            content: data,
          })
        );
      });
    });
  } else if (method === "POST" && url === "/stream-file") {
    let data = "";
    request.on("data", (chunk) => {
      data += chunk;
    });
    request.on("end", () => {
      const { fileName } = JSON.parse(data);
      const filePath = path.join(__dirname, fileName);
      const readStream = fs.createReadStream(filePath, {
        highWaterMark: 16,
      });
      readStream.on("open", () => {
        console.log("Data opened");
        response.writeHead(200, { "content-type": "application/json" });
      });
      readStream.on("data", (chunk) => {
        console.log("Data received");
        response.write(chunk);
      });
      readStream.on("end", () => {
        console.log("Stream ended ");
        response.end();
      });
      readStream.on("error", (error) => {
        console.log(error.message);
        response.writeHead(404, { "content-type": "application/json" });
      });
    });
  } else if (method === "POST" && url === "/read-Async") {
    let data = "";
    request.on("data", (chunk) => {
      data += chunk;
    });
    request.on("end", () => {
      const { fileName } = JSON.parse(data);
      const filePath = path.join(__dirname, fileName);
      fs.readFile(filePath, "utf-8", (error, data) => {
        if (error) {
          response.writeHead(404, { "content-type": "application/json" });
          response.end(JSON.stringify({ message: "error" }));
        }
        response.writeHead(200, { "content-type": "application/json" });
        response.end(
          JSON.stringify({ message: "File readed successfully", content: data })
        );
      });
    });
  }
  else if (method === "POST" && url === "/copy-file") {
    let data = "";
    request.on("data", (chunk) => {
      data += chunk;
    });
    request.on("end", () => {
      const { sourceFile, destinationFile } = JSON.parse(data);
      const filePath = path.join(__dirname, sourceFile);
      const fileCopy = path.join(__dirname, destinationFile);
      if (!fs.existsSync(filePath)) {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end("Source file not found");
        return;
      }
      const readStream = fs.createReadStream(filePath);
      const writeStream = fs.createWriteStream(fileCopy);
      readStream.pipe(writeStream);
      writeStream.on("finish", () => {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify({ message: "The file is successfully copied" })
        );
      });
    });
  }  
  else if (method === "POST" && url === "/compress-file") {
    let data = "";
    request.on("data", (chunk) => {
      data += chunk;
    });
    
    request.on("end", () => {
      try {
        const { sourceFile } = JSON.parse(data);
        const filePath = path.join(__dirname, sourceFile);
  
        if (!fs.existsSync(filePath)) {
          response.writeHead(404, { "Content-Type": "text/plain" });
          return response.end("Source file not found");
        }
  
        const compressedFilePath = filePath + ".gz";
        const readStream = fs.createReadStream(filePath);
        const writeStream = fs.createWriteStream(compressedFilePath);
        const gzip = zlib.createGzip(); // Create the Gzip stream
  
        // Pipe the read stream through the Gzip stream and into the write stream
        readStream.pipe(gzip).pipe(writeStream);
  
        writeStream.on("finish", () => {
          response.writeHead(200, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ message: "The file is successfully compressed" }));
        });
        
      } catch (error) {
        console.error("Error:", error.message);
        response.writeHead(500, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ error: "Internal Server Error" }));
      }
    });
  }  
  else {
    response.writeHead(400, { "Content-Type": "text/plain" });
    response.end("route not found");
  }
});
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
////////////////////////////////////////////////////1st question/////////////////////////////////////////////
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const port = 3000;
app.use(express.json());
app.post("/addUser", (req, res) => {
const { name, age, email } = req.body;
const usersFilePath = path.join(__dirname, "users.json");
fs.readFile(usersFilePath, "utf-8", (error, data) => {
    if (error) {
        return res.status(500).json({ message: "Error reading users file"});
    }
    let users;
    try {
        users = JSON.parse(data);
    } catch (parseError) {
        return res.status(500).json({ message: "Error parsing users file"});
    }
    const isExist = users.find((user) => user.email === email);
    if (isExist) {
        return res.status(409).json({ message: "Email already exists"});
    }
    const newId = users.length ? users[users.length - 1].id + 1 : 1;
    users.push({ id: newId, name, age, email });
    fs.writeFile(usersFilePath,JSON.stringify(users, null, 2),(writeError) => {
        if (writeError) {
            return res.status(500).json({ message: "Error writing to users file." });
        }
        res.status(200).json({message: "User added successfully"});});
    });
});

app.patch("/updateUser/:id", (req, res) => {
    const userId = parseInt(req.params.id); 
    const { name, age, email } = req.body;
    fs.readFile(path.join(__dirname, "users.json"), "utf-8", (error, data) => {
        if (error) {
            return res.status(500).json({ message: "Error reading users file." });
        }
        let users;
        try {
            users = JSON.parse(data);
        } 
        catch {
            return res.status(500).json({ message: "Error parsing users file." });
        }
        const userIndex = users.findIndex((user) => user.id === userId);
        if (userIndex === -1) {
            return res.status(404).json({ message: "User ID not found." });
        }
        if (name) users[userIndex].name = name;
        if (age) users[userIndex].age = age;
        if (email) {
            const isEmailTaken = users.some((user, index) => user.email === email && index !== userIndex);
            if (isEmailTaken) {
                return res.status(409).json({ message: "Email already exists." });
            }
            users[userIndex].email = email;
        }
        fs.writeFile(path.join(__dirname, "users.json"),JSON.stringify(users, null, 2),"utf-8",(writeError) => {
            if (writeError) {
                return res.status(500).json({ message: "Error writing to users file." });
            }
            res.status(200).json({ message: "User updated successfully." });
        });
    });
});

app.delete("/deleteUser/:id?", (req, res) => {
    const userId = req.params.id || req.body.id; 
    if (userId === undefined) {
        return res.status(400).json({ message: "User ID is required." });
    }
    const usersFilePath = path.join(__dirname, "users.json");
    fs.readFile(usersFilePath, "utf-8", (err, data) => {
    if (err) {
        return res.status(500).json({ message: "Could not read users file." });
    }
    let users;
    try {
        users = JSON.parse(data);
    } catch {
        return res.status(500).json({ message: "Error parsing users file." });
    }
    let found = false;
    const updatedUsers = [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === Number(userId)) {
            found = true;
        }
        else {
            updatedUsers.push(users[i]);
        }
    }
    if (!found) {
        return res.status(404).json({ message: "User ID not found." });
    }
    fs.writeFile(usersFilePath, JSON.stringify(updatedUsers, null, 2), (error) => {
    if (error) {
        return res.status(500).json({ message: "Could not save updated users file." });
    }
        res.status(200).json({ message: "User deleted successfully." });});
    });
});

app.get("/getUserByName", (req, res) => {
    const userName = req.query.name;
    if (!userName) {
        return res.status(400).json({ message: "Name query parameter is required." });
    }
    const usersFilePath = path.join(__dirname, "users.json");
    fs.readFile(usersFilePath, "utf-8", (err, data) => {
    if (err) {
        return res.status(500).json({ message: "Could not read users file." });
    }
    let users;
    try {
        users = JSON.parse(data); 
    } catch {
        return res.status(500).json({ message: "Error parsing users file." });
    }
    const user = users.find((user) => user.name === userName);
    if (!user) {
        return res.status(404).json({ message: "User name not found." });
    }
    res.status(200).json(user); 
    });
});

app.get('/getUserById/:id', (req, res) => {
    const userId = Number(req.params.id);
    const filePath = path.join(__dirname, 'users.json');
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ message: "Error reading users file." });
        try {
            const users = JSON.parse(data);
            const user = users.find(user => user.id === userId); 
            if (user) {
                return res.status(200).json(user); 
            } else {
                return res.status(404).json({ message: "User id not found" }); 
            }
        } catch {
            return res.status(500).json({ message: "Error parsing users file." });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

////////////////////////////////////////////////////2nd question/////////////////////////////////////////////
//2.1- What is the Node.js Event Loop?
/*
The Node.js Event Loop is a mechanism that handles and processes asynchronous operations, allowing Node.js to perform non-blocking I/O, 
it continuously cycles through phases to execute callbacks, process timers, handle I/O events, and execute pending tasks, 
enabling high performance and scalability.
*/

//2.2: What is the Role of the V8 Engine?
/*
The V8 engine is responsible for executing JavaScript code in Node.js. It compiles JavaScript into machine code, making it fast and efficient. 
V8 also manages memory allocation and garbage collection, ensuring smooth execution of programs.
*/

//2.3: What is the Node.js Thread Pool and How to Set the Thread Pool Size?
/*
Node.js Thread Pool is a part of the libuv library that manages multiple threads for handling tasks like file system operations, 
cryptographic hashing, and DNS lookups. It allows these tasks to run concurrently without blocking the main event loop.
*/

//2.4: What is the purpose of the libuv library in Node.js?
/*
1- Event Loop: libuv manages the event loop, which is the core of Node.js's non-blocking, asynchronous behavior.
2- Thread Pool: It provides a thread pool for handling tasks that require more complex operations, like file I/O and DNS lookups, without blocking the main thread.
3- Asynchronous I/O: It enables asynchronous operations, allowing Node.js to handle multiple I/O requests concurrently without blocking the event loop.
4- Cross-platform Compatibility: libuv abstracts platform-specific differences (like Windows vs. Unix-based systems), providing a unified API for Node.js across different platforms.
*/

//2.5: Explain how Node.js handles asynchronous I/O operations.
/*
1- Event Loop:
The event loop is the core mechanism that drives the asynchronous behavior in Node.js. It continuously checks for events (like I/O operations) and handles them when they are ready.
It operates in a single-threaded manner, meaning it doesn’t need to wait for one operation to finish before starting another.

2- Non-blocking I/O:
In Node.js, when an I/O operation (like reading a file, querying a database, or making an HTTP request) is requested, it doesn’t block the main thread.
Instead, Node.js passes the task to the underlying libuv library, which offloads the operation to the system's thread pool or handles it asynchronously.

3- Callback Functions:
When the I/O operation completes, a callback function (or Promise, in modern JavaScript) is executed to process the result.
This callback is queued in the event loop, where it will run once the current task is finished, and the event loop is ready.

4- libuv:
libuv, a library that Node.js uses, manages the threading model and performs the I/O operations in the background, ensuring the main event loop is never blocked.
For heavy tasks like file reading or DNS lookups, libuv uses a thread pool to handle those tasks asynchronously.
*/
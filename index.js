const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use("/src", express.static("src"));

const generateHex = () => {
    const availableDigit = "1234567890abcdef";

    let result = [];

    for (let i = 0; i < 12; i++) {
        result.push(availableDigit.charAt(Math.floor(Math.random() * availableDigit.length)));
    }

    return result.join("");
}

let jobs = [
    {
        id: "12a114ef6880",
        title: "Front-end Developer",
        description: "Do code the display interface of website"
    },
    {
        id: "45ca6980807f",
        title: "Data Science Developer",
        description: "Make data analysis using Python"
    },
    {
        id: "e11764d19cea",
        title: "ML Developer",
        description: "Use machine learning (ML) for predict future stock"
    },
    {
        id: "eaeaa375f28e",
        title: "Back-end Developer",
        description: "Create web purchasing system using Node.js"
    }
];

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/api/jobs", (request, response) => {
    response.status(200).json(jobs);
});

app.get("/api/jobs/:id", (request, response) => {
    const result = jobs.filter(job => job.id === request.params.id);
    response.status(200).json(result);
});

app.post("/api/jobs", (request, response) => {
    const job = {
        id: generateHex(),
        title: request.body.title,
        description: request.body.description
    };
    
    console.log(job);
    jobs.push(job);

    response.status(201).json(job);
});

app.delete("/api/jobs/:id", (request, response) => {
    const result = jobs.filter(job => job.id !== request.params.id);
    jobs = result;
    response.status(200).json(jobs);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})
const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

const jobs = [
    {
        title: "Front-end Developer",
        description: "Do code the display interface of website"
    },
    {
        title: "Data Science Developer",
        description: "Make data analysis using Python"
    }
];

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/api/jobs", (request, response) => {
    response.json(jobs);
});

app.post("/api/jobs", (request, response) => {

    const job = {
        title: request.body.title,
        description: request.body.description
    };
    
    console.log(job);
    jobs.push(request.body);

    response.json(jobs);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})
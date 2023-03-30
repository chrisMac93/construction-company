const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

let jobListings = [];

// Add a route to fetch all job listings
app.get("/api/job-listings", (req, res) => {
  res.json(jobListings);
});

// Add a route to add a new job opening
app.post("/api/job-listings", (req, res) => {
  const newJob = {
    id: Date.now(),
    title: req.body.title,
    location: req.body.location,
    salary: req.body.salary,
    jobType: req.body.jobType,
    shiftAndSchedule: req.body.shiftAndSchedule,
  };

  jobListings.push(newJob);
  res.status(201).json(newJob);
});

// Add a route to delete a job opening
app.delete("/api/job-listings/:id", (req, res) => {
  const jobId = parseInt(req.params.id, 10);
  jobListings = jobListings.filter((job) => job.id !== jobId);
  res.status(204).send();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

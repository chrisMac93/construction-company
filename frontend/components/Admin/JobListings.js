import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import styles from "../../styles/Home.module.css";


const JobListings = () => {
  const [jobListings, setJobListings] = useState([]);
  const [newJob, setNewJob] = useState({
    title: "",
    location: "",
    salary: "",
    jobType: "",
    shiftAndSchedule: "",
  });

  useEffect(() => {
    const jobListingsRef = collection(firestore, "jobListings");
    const unsubscribe = onSnapshot(jobListingsRef, (snapshot) => {
      const jobs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setJobListings(jobs);
    });

    return () => unsubscribe();
  }, []);

  const handleAddJob = async () => {
    try {
      const jobListingsRef = collection(firestore, "jobListings");
      const newDoc = await addDoc(jobListingsRef, newJob);
      setJobListings([...jobListings, { id: newDoc.id, ...newJob }]);
      setNewJob({
        title: "",
        location: "",
        salary: "",
        jobType: "",
        shiftAndSchedule: "",
      });
    } catch (error) {
      console.error("Error adding new job:", error);
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      const jobRef = doc(firestore, "jobListings", id);
      await deleteDoc(jobRef);
      setJobListings(jobListings.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddJob();
        }}
        className="bg-neutral-700 p-6 rounded-md space-y-6"
      >
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Add Job Opening
        </h3>
        <div>
          <label htmlFor="title" className="block mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            required
            className="w-full p-3 bg-neutral-600 rounded-md text-neutral-100"
          />
        </div>
        <div>
          <label htmlFor="location" className="block mb-2">
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={newJob.location}
            onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
            required
            className="w-full p-3 bg-neutral-600 rounded-md text-neutral-100"
          />
        </div>
        <div>
          <label htmlFor="salary" className="block mb-2">
            Salary:
          </label>
          <input
            type="text"
            id="salary"
            name="salary"
            value={newJob.salary}
            onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
            required
            className="w-full p-3 bg-neutral-600 rounded-md text-neutral-100"
          />
        </div>
        <div>
          <label htmlFor="jobType" className="block mb-2">
            Job Type:
          </label>
          <select
            id="jobType"
            name="jobType"
            value={newJob.jobType}
            onChange={(e) => setNewJob({ ...newJob, jobType: e.target.value })}
            required
            className="w-full p-3 bg-neutral-600 rounded-md text-neutral-100"
          >
            <option value="" disabled>
              Select a job type
            </option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="temporary">Temporary</option>
          </select>
        </div>
        <div>
          <label htmlFor="shiftAndSchedule" className="block mb-2">
            Shift and Schedule:
          </label>
          <input
            type="text"
            id="shiftAndSchedule"
            name="shiftAndSchedule"
            value={newJob.shiftAndSchedule}
            onChange={(e) =>
              setNewJob({ ...newJob, shiftAndSchedule: e.target.value })
            }
            required
            className="w-full p-3 bg-neutral-600 rounded-md text-neutral-100"
          />
        </div>
        <button
          type="submit"
          className={`w-full p-3 rounded-md text-neutral-800 ${styles.mcBackColor} ${styles.backHov}`}
        >
          Add Job
        </button>
      </form>
      <h3 className="text-2xl font-semibold my-8 text-center">Job Listings</h3>
      <ul className="space-y-4">
        {jobListings.map((job) => (
          <li
            key={job.id}
            className="bg-neutral-700 p-4 rounded-md flex justify-between items-center"
          >
            <span>
              {job.title} - {job.location} - {job.salary} - {job.jobType} -{" "}
              {job.shiftAndSchedule}
            </span>
            <button
              type="button"
              className="bg-red-600 hover:bg-red-500 ml-1 p-2 rounded-md text-neutral-100"
              onClick={() => handleDeleteJob(job.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default JobListings;

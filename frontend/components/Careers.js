import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/Home.module.css";

const Careers = () => {
  const [jobListings, setJobListings] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/job-listings")
      .then((res) => res.json())
      .then((data) => setJobListings(data));
  }, []);

  const handleFileInputClick = () => {
    document.getElementById("resume").click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  const handleJobSelect = (job) => {
    if (selectedJob && selectedJob.id === job.id) {
      setSelectedJob(null);
    } else {
      setSelectedJob(job);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., sending data to your backend.
    alert(`Application submitted for the position of ${selectedJob.title}.`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Your logic when the Enter key is pressed
    }
  };

  return (
    <section className="bg-neutral-800 text-neutral-100 py-20 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-semibold pt-12 pb-6">
          Careers
        </h2>
        <p className="pb-6">
          Nulla convallis tempus dolor, nec mattis elit ornare in. Maecenas id
          sapien ex. Curabitur tincidunt elit at velit imperdiet ultricies.
          Donec vulputate faucibus sollicitudin. Curabitur vel cursus metus, a
          pellentesque mauris.
        </p>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="list-group mb-4">
          {jobListings.map((job) => (
            <div
              key={job.id}
              role="button"
              tabIndex={0}
              className={`bg-neutral-700 ${
                styles.borderHov
              } p-2 rounded-md mb-2 block w-full text-left ${
                selectedJob && selectedJob.id === job.id
                  ? "border-l-4 border-[#B6B024]"
                  : ""
              }`}
              onClick={() => handleJobSelect(job)}
              onKeyDown={handleKeyDown}
            >
              <div className="text-center p-4 bg-neutral-800 text-neutral-100 rounded-md">
                <h1 className="font-bold text-2xl">{job.title}</h1>
                <h2 className="font-semibold text-xl text-neutral-300">
                  {job.location}
                </h2>
                <button
                  className={`btn btn-primary text-neutral-800 font-semibold px-4 py-2 rounded-md my-4 ${styles.mcBackColor} ${styles.backHov}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails((prevDetails) =>
                      prevDetails !== job.id ? job.id : null
                    );
                  }}
                >
                  See details
                </button>
                <AnimatePresence>
                  {showDetails === job.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div>
                        <h3 className="font-semibold">{job.salary}</h3>
                        <h3 className="font-semibold">{job.jobType}</h3>
                        <h3 className="font-semibold">
                          {job.shiftAndSchedule}
                        </h3>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        {selectedJob && (
          <form
            className="bg-neutral-700 p-8 rounded-md"
            onSubmit={handleSubmit}
          >
            <h3 className="text-2xl font-semibold mb-6">
              Apply for {selectedJob.title}
            </h3>
            <div className="mb-6">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control bg-neutral-600 text-neutral-100 border-none w-full p-2 rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control bg-neutral-600 text-neutral-100 border-none w-full p-2 rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="phone" className="form-label">
                Phone:
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-control bg-neutral-600 text-neutral-100 border-none w-full p-2 rounded-md"
                required
              />
            </div>
            <label htmlFor="resume" className="form-label">
              Upload Resume:
            </label>
            <div
              className="form-control text-neutral-100 border-none w-full p-2 rounded-md cursor-pointer"
              onClick={handleFileInputClick}
            >
              <input
                type="file"
                id="resume"
                name="resume"
                className="hidden"
                accept=".pdf,.doc,.docx"
                required
                onChange={handleFileInputChange}
              />
              <span
                className={`inline-block px-2 py-1 bg-neutral-700 text-neutral-100 border border-neutral-500 ${styles.borderHov} rounded`}
              >
                Choose a File
              </span>
              {fileName && (
                <span className="inline-block px-2 py-1 ml-2 text-neutral-100 rounded">
                  {fileName}
                </span>
              )}
            </div>
            <div className="mb-6 flex justify-center">
              <button
                type="submit"
                className={`text-neutral-800 font-semibold px-4 py-2 rounded-md ${styles.mcBackColor} ${styles.backHov} `}
              >
                Submit Application
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default Careers;

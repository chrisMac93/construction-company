import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { firestore } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Apply } from "../../utils/emailService";

import styles from "../../styles/Home.module.css";

const Careers = () => {
  const [jobListings, setJobListings] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const fetchJobListings = async () => {
      try {
        const jobListingsRef = collection(firestore, "jobListings");
        const querySnapshot = await getDocs(jobListingsRef);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Job listings fetched successfully:", data);
        setJobListings(data);
      } catch (error) {
        console.error("Error fetching job listings:", error);
      }
    };

    fetchJobListings();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve form data
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const resume = e.target.resume.files[0];

    // Prepare formData to send the resume file
    const formData = new FormData();
    formData.append("from_name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append(
      "message",
      `Application submitted for the position of ${selectedJob.title}.`
    );
    formData.append("resume", resume);

    try {
      await Apply(formData);
      alert(`Application submitted for the position of ${selectedJob.title}.`);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Error submitting application. Please try again.");
    }

    e.target.reset();
    setFileName("");
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
          At Martin Construction &amp; Coatings, we are passionate about
          delivering quality results to our clients. Our team is made up of
          dedicated professionals who take pride in their work and strive for
          excellence in everything they do. We offer a supportive and
          collaborative work environment where every team member has the
          opportunity to grow and develop their skills. If you're looking for a
          challenging and rewarding career in the construction industry, we
          invite you to apply and join our team.
        </p>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="list-group mb-4">
          {jobListings.length === 0 ? (
            <div className="text-center p-4 bg-neutral-800 text-neutral-100 rounded-md">
              <h1 className="font-bold text-2xl">
                No Positions Currently Available
              </h1>
              <p className="font-semibold text-xl text-neutral-300">
                We're sorry, but there are no open positions at this time.
                Please check back later as we update our job postings regularly.
              </p>
            </div>
          ) : (
            jobListings.map((job) => (
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
            ))
          )}
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
                onClick={() => {
                  handleSubmit;
                }}
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

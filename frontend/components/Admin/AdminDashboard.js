import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "../../lib/auth";

import JobListings from "./JobListings";
import ImageHandler from './ImageHandler';
import ServicesHandler from "./ServicesHandler";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("jobListings");

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin");
    }
  }, []);

  const renderTabs = () => {
    return (
      <div className="flex mb-8 justify-center">
        <button
          className={`p-2 ${selectedTab === "jobListings" && "font-bold"}`}
          onClick={() => setSelectedTab("jobListings")}
        >
          Job Listings
        </button>
        <button
          className={`p-2 ${selectedTab === "services" && "font-bold"}`}
          onClick={() => setSelectedTab("services")}
        >
          Services
        </button>
        <button
          className={`p-2 ${selectedTab === "images" && "font-bold"}`}
          onClick={() => setSelectedTab("images")}
        >
          Images
        </button>
        <button
          className={`p-2 ${selectedTab === "priceUpdates" && "font-bold"}`}
          onClick={() => setSelectedTab("priceUpdates")}
        >
          Price Updates
        </button>
      </div>
    );
  };

  return (
    <div className="bg-neutral-800 text-neutral-100 py-20 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">
          Admin Dashboard
        </h2>
        {renderTabs()}
        {selectedTab === "jobListings" && <JobListings />}
        {selectedTab === "images" && <ImageHandler />}
        {selectedTab === "services" && <ServicesHandler />}
      </div>
    </div>
  );
};

export default AdminDashboard;

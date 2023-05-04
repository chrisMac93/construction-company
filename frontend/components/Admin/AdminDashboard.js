import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "../../hooks/useAuth";

import JobListings from "./JobListings";
import ImageHandler from "./ImageHandler";
import ServicesHandler from "./ServicesHandler";
import PriceUpdates from "./PriceUpdates/PriceUpdatesHandler";
import TestimonialHandler from "./TestimonialsHandler";

const AdminDashboard = ({ userEmail }) => {
  const [selectedTab, setSelectedTab] = useState("priceUpdates");
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/admin");
    }
  }, []);

  const renderTabs = () => {
    return (
      <div className="flex mb-8 justify-center">
        <div
          className="flex overflow-x-auto py-2 px-4 space-x-4"
          style={{ maxWidth: "100%" }}
        >
          <button
            className={`p-2 ${selectedTab === "jobListings" && "font-bold"}`}
            onClick={() => setSelectedTab("jobListings")}
          >
            Job Listings
          </button>
          <button
            className={`p-2 ${selectedTab === "testimonials" && "font-bold"}`}
            onClick={() => setSelectedTab("testimonials")}
          >
            Testimonials
          </button>
          <button
            className={`p-2 ${selectedTab === "priceUpdates" && "font-bold"}`}
            onClick={() => setSelectedTab("priceUpdates")}
          >
            Price Updates
          </button>
          {userEmail === "christopher.j.mcelwain@gmail.com" && (
            <button
              className={`p-2 ${selectedTab === "services" && "font-bold"}`}
              onClick={() => setSelectedTab("services")}
            >
              Services
            </button>
          )}
          <button
            className={`p-2 ${selectedTab === "images" && "font-bold"}`}
            onClick={() => setSelectedTab("images")}
          >
            Images
          </button>
        </div>
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
        {selectedTab === "testimonials" && <TestimonialHandler />}
        {selectedTab === "jobListings" && <JobListings />}
        {selectedTab === "priceUpdates" && <PriceUpdates />}
        {selectedTab === "images" && <ImageHandler />}
        {selectedTab === "services" &&
          userEmail === "christopher.j.mcelwain@gmail.com" && (
            <ServicesHandler />
          )}
      </div>
    </div>
  );
};

export default AdminDashboard;

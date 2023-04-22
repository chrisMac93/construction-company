import React from "react";
import { motion } from "framer-motion";

const ProjectTypes = ({ handleChange, formData }) => {

  return (
    <div className="form-control">
      <label htmlFor="projectType" className="block mb-2">
        Project Type
      </label>
      <motion.select
        name="projectType"
        id="projectType"
        className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        onChange={handleChange}
        value={formData.projectType}
        whileFocus={{ scale: 1.05 }}
      >
        <option value="">Select a project type</option>
        <option value="wholeHome">Whole Home Remodel</option>
        <option value="interior">Interior Remodel</option>
        <option value="exterior">Exterior Remodel</option>
        <option value="flooring">Flooring</option>
        <option value="deckPatio">Deck/Patio</option>
        <option value="epoxy">Epoxy</option>
        <option value="coatings">Coatings</option>
        <option value="kitchen">Kitchen</option>
        <option value="bath">Bathroom</option>
        <option value="concrete">Concrete</option>
      </motion.select>
    </div>
  );
};

export default ProjectTypes;

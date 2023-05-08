import React from "react";
import { motion } from "framer-motion";

const ProjectTypes = ({ handleChange, formData }) => {

  return (
    <div className="w-full text-center">
     
      <motion.select
        name="projectType"
        id="projectType"
        className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100 mt-3 text-center font-bold"
        onChange={handleChange}
        value={formData.projectType}
        whileFocus={{ scale: 1.05 }}
      >
        <option value="">Project Type</option>
        <option value="interior">Interior Remodel</option>
        <option value="exterior">Exterior Remodel</option>
        <option value="kitchen">Kitchen</option>
        <option value="bath">Bathroom</option>
        <option value="deckPatio">Deck/Patio</option>
        <option value="flooring">Flooring</option>
        <option value="epoxy">Epoxy</option>
        <option value="coatings">Coatings</option>
        <option value="concrete">Concrete</option>
      </motion.select>
    </div>
  );
};

export default ProjectTypes;

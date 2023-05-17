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
        <option value="interior" className="font-semibold">Interior Remodel</option>
        <option value="exterior" className="font-semibold">Exterior Remodel</option>
        <option value="kitchen" className="font-semibold">Kitchen</option>
        <option value="bath" className="font-semibold">Bathroom</option>
        <option value="deckPatio" className="font-semibold">Deck/Patio</option>
        <option value="flooring" className="font-semibold">Flooring</option>
        <option value="epoxy" className="font-semibold">Epoxy</option>
        <option value="coatings" className="font-semibold">Coatings</option>
        <option value="concrete" className="font-semibold">Concrete</option>
      </motion.select>
    </div>
  );
};

export default ProjectTypes;

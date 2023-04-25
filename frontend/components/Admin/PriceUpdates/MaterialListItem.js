import React from "react";

const MaterialListItem = ({ material, handleUpdateMaterial, handleDeleteMaterial }) => {
    return (
      <li key={material.id} className="bg-neutral-700 p-4 rounded-md flex justify-between items-center">
        <span>
          {material.name} - ${material.price}
        </span>
        <div className="flex">
          <input
            type="number"
            step="any"
            value={material.price}
            onChange={(e) => handleUpdateMaterial(material.id, e.target.value)}
            className="w-full p-3 bg-neutral-600 rounded-md text-neutral-100 mr-4"
          />
          <button
            onClick={() => handleDeleteMaterial(material.id)}
            className="ml-4 p-3 bg-red-500 text-neutral-100 rounded-md hover:bg-red-400"
          >
            Delete
          </button>
        </div>
      </li>
    );
  };

export default MaterialListItem;
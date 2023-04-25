import React from "react";

export const KitchenExtrasNew = ({ data, onUpdatePrice }) => {
  return (
    <div>
      <ul className="space-y-4">

        {data.map((item) => (
          <li
            key={item.id}
            className="bg-neutral-700 p-4 rounded-md flex justify-between items-center"
          >
            <span>
              {item.name} - ${item.price}
            </span>
            <div className="flex">
              <input
                type="number"
                step="any"
                value={item.price}
                onChange={(e) => onUpdatePrice(item.id, e.target.value)}
                className="w-full p-3 bg-neutral-600 rounded-md text-neutral-100 mr-4"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


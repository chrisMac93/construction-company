import React from "react";
import { Switch } from "@headlessui/react";


export const renderSwitch = (id, name, checked, handleChange, cost) => (
    <Switch
      id={id}
      name={name}
      checked={checked}
      onChange={(value) =>
        handleChange({
          target: {
            name,
            value,
            cost,
          },
        })
      }
      className={`${
        checked ? "bg-B6B024" : "bg-neutral-700"
      } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
    >
      <span className="sr-only">{name}</span>
      <span
        className={`${
          checked ? "translate-x-6" : "translate-x-1"
        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
      />
    </Switch>
  );
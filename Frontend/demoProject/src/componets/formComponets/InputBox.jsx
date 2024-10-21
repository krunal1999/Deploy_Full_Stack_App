import { useId } from "react";
import React from "react";

const InputBox = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },  
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}  
        className={`w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default InputBox;

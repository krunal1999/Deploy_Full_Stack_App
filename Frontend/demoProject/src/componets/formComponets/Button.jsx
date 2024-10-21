import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  hoverColor = "bg-blue-700",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 hover:${hoverColor}  ${className} ${bgColor} ${textColor}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

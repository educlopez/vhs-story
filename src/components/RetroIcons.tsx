import React from "react";

// Define the props for the Icon component
interface IconProps {
  name: keyof typeof icons;
  size?: number;
  color?: string;
}

// Create an object to store all your SVG icons
const icons = {
  play: (
    <path d="M10 20H8V4h2v2h2v3h2v2h2v2h-2v2h-2v3h-2v2z" fill="currentColor" />
  ),
  // Add more icons here as needed
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "currentColor",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      {icons[name]}
    </svg>
  );
};

// Export the icon names for type checking
export type IconName = keyof typeof icons;

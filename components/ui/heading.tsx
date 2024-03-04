import React from "react";

interface HeadingProps {
  title: string;
  description: string;
}

const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div className="my-5">
      <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Heading;

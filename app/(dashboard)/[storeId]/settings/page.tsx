import React from "react";

const Settings = ({ params }: { params: { storeId: string } }) => {
  return <div>Settings of {params.storeId}</div>;
};

export default Settings;

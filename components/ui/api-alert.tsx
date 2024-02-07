"use client";

import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};
const variantMap: Record<ApiAlertProps["variant"], string> = {
  public: "secondary",
  admin: "destructive",
};

const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  const onCopy = () => {
    window.navigator.clipboard.writeText(description);
    toast.success("Copied.");
  };
  return (
    <Alert className="flex items-center justify-between mt-5 ">
      <Server />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="flex items-center gap-5">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-semibold">
          {description}
        </code>
        <Button onClick={() => onCopy()}>
          <Copy />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;

import { Copy, CopyCheck, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge } from "./badge";
import { Button } from "./button";

interface ApiAlertProps {
  title: string;
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
  return (
    <Alert className="flex items-center justify-between">
      <Server />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription>
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-semibold">
          {description}
        </code> 
        <Button onClick={() => {}}>
          <Copy />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;

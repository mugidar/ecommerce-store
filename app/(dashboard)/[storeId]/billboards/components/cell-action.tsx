"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { BillboardColumn } from "./columns";
import { Copy, Edit2Icon, MenuIcon, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

interface CellActionProps {
  data: BillboardColumn;

}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const router = useRouter()
    const params = useParams()
  const onCopy = () => {
    window.navigator.clipboard.writeText(data.id);
    toast.success("Copied.");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex ">
        <MenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="flex gap-3">
          <Trash2 />
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)} className="flex gap-3">
          <Edit2Icon />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onCopy} className="flex gap-3">
          <Copy />
          Copy ID
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellAction;

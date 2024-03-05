"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {  OrderColumn } from "./columns";
import { Copy, Edit2Icon, MenuIcon, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import AlertModal from "@/components/modals/allert-modal";
import Heading from "@/components/ui/heading";

interface CellActionProps {
  data: OrderColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  const onCopy = () => {
    window.navigator.clipboard.writeText(data.id);
    toast.success("ID Copied.");
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${params.storeId}/categories/${data.id}`);
      toast.success("Deleted.");
      router.refresh();
    } catch (error) {
      toast.error("Existing products of this category are left.");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger className="flex ">
          <MenuIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => setIsOpen(true)}
            className="flex gap-3"
          >
            <Trash2 />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/categories/${data.id}`)
            }
            className="flex gap-3"
          >
            <Edit2Icon />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onCopy} className="flex gap-3">
            <Copy />
            Copy ID
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
    </>
  );
};

export default CellAction;

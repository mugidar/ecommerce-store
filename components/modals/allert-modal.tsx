"use client";

import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  isLoading,
  onConfirm,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Are you sure?"
      description="You can't undone this action"
    >
      <div className="flex gap-4 justify-end">
        <Button
          variant={"destructive"}
          disabled={isLoading}
          onClick={onConfirm}
        >
          Yes, I&#39;m sure
        </Button>
        <Button disabled={isLoading} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;

"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash2 } from "lucide-react";
import Image from "next/image";

interface imageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}
const ImageUpload = ({ disabled, onChange, onRemove, value }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  if (!mounted) return null;

  return (
    <div>
      <div>
        {value.map((url) => (
          <div className="relative w-[240px] h-[180px]" key={url}>
            <div className="absolute right-0 top-0 z-10 m-2">
              <Button
                type="button"
                variant={"destructive"}
                onClick={() => onRemove(url)} className="w-12 h-10"
              >
                <Trash2 />
              </Button>
            </div>
            <Image alt="" src={url} fill className="object-fit " />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="gdk96liq">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant={"secondary"}
              onClick={onClick}
            >
              <ImagePlus />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;

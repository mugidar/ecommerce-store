// @ts-nocheck
"use client";
import { Billboard, Category, Store } from "@prisma/client";
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import AlertModal from "@/components/modals/allert-modal";
import ApiAlert from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "@/components/ui/image-upload";
import { useParams } from "next/navigation";

interface CategoryFormProps {
  initialData: Category | null;
  billboards: Billboard[];
};

const formSchema = z.object({
  name: z.string(),
  billboardId: z.string(),
});
type CategoryFormValues = z.infer<typeof formSchema>;

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  billboards,
}) => {
  const origin = useOrigin();
  const [isOpen, setIsOpen] = useState(false);
  const { storeId, categoryId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      billboardId: '',
    }
  });
  const title = initialData ? "Edit category" : "Create category";
  const description = initialData ? "Edit category" : "Add a new category";
  const toastMessage = initialData ? "Category updated" : "Category created";
  const action = initialData ? "Save changes" : "Create";

  const router = useRouter();
  const onSubmit = async (values: CategoryFormValues) => {
    try {
      setIsLoading(true);
      if (initialData) {
        await axios.patch(`/api/${storeId}/categories/${categoryId}`, values);
      } else {
        await axios.post(`/api/${storeId}/categories`, values);
        form.reset();
      }
      
      toast.success(toastMessage);
      router.refresh();
    } catch (error) {
      toast.error("Error.");
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${storeId}/categories/${categoryId}`);  form.reset()
      toast.success("Deleted.");
      router.refresh();
    } catch (error) {
      toast.error("Existing categories are left.");
    } finally {
      setIsLoading(false);
    }
  };
  console.log(billboards)
  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onConfirm={onDelete}
        onClose={() => setIsOpen(false)}
        isLoading={isLoading}
      />
      <div className="flex justify-between items-center">
        <Heading title={title} description={description} />
        {initialData && (
          <Button onClick={() => setIsOpen(true)} variant={"destructive"}>
            <Trash2 />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="flex flex-col mt-5 "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <FormMessage />

                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue
                          placeholder="Select a billboard"
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                   
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isLoading}
            className="self-start mt-5"
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>
      {/* <ApiAlert title="TTT" description={`${origin}/api/${storeId}`} /> */}
    </>
  );
};

export default CategoryForm;

import { ServiceStatus } from "@/api/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

type UserInfo = {
  name: string;
  code: string;
  is_active: string;
};

type DialogCategoryProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DialogSubService({ open, onOpenChange }: DialogCategoryProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserInfo>();
  const mutation = useMutation({
    mutationFn: ServiceStatus,
    onError: (error) => {
      console.error("Login error:", error);
    },
    onSuccess: (data) => {
      console.log("Login success:", data);
      // console.log("Login success:", data.data.response.data.access);
    },
  });

  const onSubmit: (data: UserInfo) => void = (data) => {
    console.log(data);
    const formattedData = {
      ...data,
      is_active: data.is_active === "active",
    };
    mutation.mutate(formattedData);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Status</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {errors.name && (
                <span className="text-xs text-red-500">
                  <i className="fi fi-rr-exclamation mr-1"></i>
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="code">Short Form</Label>
              <Input
                id="code"
                {...register("code", {
                  required: "Short Form is required",
                })}
              />
              {errors.code && (
                <span className="text-xs text-red-500">
                  <i className="fi fi-rr-exclamation mr-1"></i>
                  {errors.code.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label>Status</Label>
              <Controller
                name="is_active"
                control={control}
                defaultValue="active"
                rules={{ required: "Status is required" }}
                render={({ field }) => (
                  <RadioGroup
                    className="flex space-x-6"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="active" id="r1" />
                      <Label htmlFor="r1">Active</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="inactive" id="r2" />
                      <Label htmlFor="r2">Inactive</Label>
                    </div>
                  </RadioGroup>
                )}
              />
              {errors.is_active && (
                <span className="text-xs text-red-500">
                  {errors.is_active.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

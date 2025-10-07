import { fetchServiceStatus, submitService } from "@/api/api";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";

type Status = {
  id: string;
  name: string;
};

type StatusOrder = {
  status_id: string | null;
  mandatory: boolean;
  order: string;
};

type ServiceInfo = {
  name: string;
  code: string;
  price: string;
  dispatch_duration: string;
  effective_date: string;
  status_order: StatusOrder[];
  admin_status: string;
  approval_approve_status: string;
  approval_rejected_status: string;
};

type DialogCategoryProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function transformServiceData(data: any) {
  return {
    ...data,
    price: Number(data.price),
    dispatch_duration: Number(data.dispatch_duration),
    effective_date: data.effective_date, // Assuming this is already in yyyy-mm-dd format

    // Convert admin and approval statuses from strings to integers or null
    admin_status: data.admin_status ? Number(data.admin_status) : null,
    approval_approve_status: data.approval_approve_status
      ? Number(data.approval_approve_status)
      : null,
    approval_rejected_status: data.approval_rejected_status
      ? Number(data.approval_rejected_status)
      : null,

    // Transform status_order array
    status_order: data.status_order.map((item: any) => ({
      status_id: item.status_id ? Number(item.status_id) : null,
      mandatory: Boolean(item.mandatory),
    })),
  };
}

export function ServiceForm({ open, onOpenChange }: DialogCategoryProps) {
  const { data } = useQuery<Status[]>({
    queryKey: ["ServiceStatus"],
    queryFn: fetchServiceStatus,
    retry: false,
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceInfo>({
    defaultValues: {
      status_order: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "status_order",
  });

  const mutation = useMutation({
    mutationFn: submitService,
    onError: (error) => {
      console.error("Submit error:", error);
    },
    onSuccess: (data) => {
      console.log("Submit success:", data);
      onOpenChange(false);
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    const transformedData = transformServiceData(data);
    mutation.mutate(transformedData);
  };

  useEffect(() => {
    if (fields.length === 0) {
      append({
        status_id: null,
        order: "1",
        mandatory: false,
      });
    }
  }, [fields, append]);

  const statusOrder = useWatch({ control, name: "status_order" });
  const selectedStatusIds =
    statusOrder?.map((s) => s.status_id).filter(Boolean) || [];

  console.log(selectedStatusIds);

  // const availableApprovedStatuses: any = []

  const availableApprovedStatuses = data?.filter((status) =>
    selectedStatusIds.includes(String(status.id))
  );

  console.log(availableApprovedStatuses);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Service</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            {/* Service Name */}
            <div className="grid gap-3">
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-xs text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Service Code */}
            <div className="grid gap-3">
              <Label htmlFor="code">Service Code</Label>
              <Input
                id="code"
                {...register("code", { required: "Service Code is required" })}
              />
              {errors.code && (
                <span className="text-xs text-red-500">
                  {errors.code.message}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="grid gap-3">
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                id="price"
                {...register("price", { required: "Price is required" })}
              />
              {errors.price && (
                <span className="text-xs text-red-500">
                  {errors.price.message}
                </span>
              )}
            </div>

            {/* Dispatch Duration */}
            <div className="grid gap-3">
              <Label htmlFor="dispatch_duration">Dispatch Duration</Label>
              <Input
                type="number"
                id="dispatch_duration"
                {...register("dispatch_duration", {
                  required: "Dispatch Duration is required",
                })}
              />
              {errors.dispatch_duration && (
                <span className="text-xs text-red-500">
                  {errors.dispatch_duration.message}
                </span>
              )}
            </div>

            {/* Effective Date */}
            <div className="grid gap-3">
              <Label htmlFor="effective_date">Effective Date</Label>
              <Input
                type="date"
                id="effective_date"
                {...register("effective_date", {
                  required: "Effective Date is required",
                })}
              />
              {errors.effective_date && (
                <span className="text-xs text-red-500">
                  {errors.effective_date.message}
                </span>
              )}
            </div>

            {/* Status Order */}
            <div className="grid gap-3">
              <Label>Status Order</Label>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center gap-2 border p-2 rounded"
                >
                  {/* Status ID Select */}
                  <Controller
                    control={control}
                    name={`status_order.${index}.status_id`}
                    rules={{ required: "Status is required" }}
                    render={({ field: selectField }) => (
                      <Select onValueChange={selectField.onChange}>
                        <SelectTrigger className="w-full border-current/20">
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                          {data?.map((status) => (
                            <SelectItem
                              key={status.id}
                              value={String(status.id)}
                            >
                              {status.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {/* Order Input (Read-only) */}
                  <Input
                    type="text"
                    className="w-20"
                    readOnly
                    value={(index + 1).toString()}
                    {...register(`status_order.${index}.order`)}
                  />

                  {/* Mandatory Checkbox */}
                  <input
                    type="checkbox"
                    {...register(`status_order.${index}.mandatory`)}
                    id={`mandatory-${index}`}
                  />

                  {/* Add / Remove Button */}
                  {index === fields.length - 1 ? (
                    <button
                      type="button"
                      onClick={() =>
                        append({
                          status_id: "",
                          order: (fields.length + 1).toString(),
                          mandatory: false,
                        })
                      }
                      className="btn btn-sm btn-success"
                      title="Add"
                    >
                      +
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="btn btn-sm btn-danger"
                      title="Remove"
                    >
                      -
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Admin Status */}
            <div className="grid gap-3">
              <Label>Allotment Default Status</Label>
              <Controller
                control={control}
                name="admin_status"
                // rules={{ required: "Admin Status is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full border-current/20">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableApprovedStatuses?.map((status) => (
                        <SelectItem key={status.id} value={String(status.id)}>
                          {status.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.admin_status && (
                <span className="text-xs text-red-500">
                  {errors.admin_status.message}
                </span>
              )}
            </div>

            {/* Approval Approved Status */}
            <div className="grid gap-3">
              <Label>Report Approval Approved Status</Label>
              <Controller
                control={control}
                name="approval_approve_status"
                // rules={{ required: "Approval Approved Status is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full border-current/20">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableApprovedStatuses?.map((status) => (
                        <SelectItem key={status.id} value={String(status.id)}>
                          {status.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.approval_approve_status && (
                <span className="text-xs text-red-500">
                  {errors.approval_approve_status.message}
                </span>
              )}
            </div>

            {/* Approval Rejected Status */}
            <div className="grid gap-3">
              <Label>Report Approval Rejected Status</Label>
              <Controller
                control={control}
                name="approval_rejected_status"
                // rules={{ required: "Approval Rejected Status is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full border-current/20">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableApprovedStatuses?.map((status) => (
                        <SelectItem key={status.id} value={String(status.id)}>
                          {status.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.approval_rejected_status && (
                <span className="text-xs text-red-500">
                  {errors.approval_rejected_status.message}
                </span>
              )}
            </div>
          </div>

          <DialogFooter className="mt-4">
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

import {
  fetchServices,
  fetchSubServicesByServiceId,
  ServiceCategory,
} from "@/api/api";
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
import { Controller, useForm, useWatch } from "react-hook-form";

type ServiceOption = {
  id: number;
  name: string;
};

type SubServiceOption = {
  id: number;
  name: string;
};

type CategoryInfo = {
  service: string;
  sub_service: string;
  name: string;
  effective_date: string;
};

type DialogCategoryProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CategoryForm({ open, onOpenChange }: DialogCategoryProps) {
  // Fetch services
  const {
    data: services,
    isLoading: servicesLoading,
    isError: servicesError,
    error: servicesErrorMsg,
  } = useQuery<ServiceOption[]>({
    queryKey: ["services"],
    queryFn: fetchServices,
    retry: false,
  });

  // Setup react-hook-form
  const {
    register,
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<CategoryInfo>({
    defaultValues: {
      service: '',
      sub_service: '',
    },
  });

  // Watch the selected service
  const selectedService = useWatch({
    control,
    name: "service",
  });

  // Fetch sub-services for selected service
  const {
    data: subServices,
    isLoading: subServicesLoading,
    isFetching: subServicesFetching,
    isError: subServicesError,
    error: subServicesErrorMsg,
  } = useQuery<SubServiceOption[]>({
    queryKey: ["subServices", selectedService],
    queryFn: () => fetchSubServicesByServiceId(selectedService!),
    enabled: !!selectedService,
    retry: false,
  });

  // Reset sub_service when service changes
  useEffect(() => {
    resetField("sub_service");
  }, [selectedService, resetField]);

  // Mutation to submit category
  const mutation = useMutation({
    mutationFn: ServiceCategory,
    onError: (error) => {
      console.error("Submission error:", error);
    },
    onSuccess: (data) => {
      console.log("Submitted successfully:", data);
      onOpenChange(false); // Close dialog on success
    },
  });

  const onSubmit = (data: CategoryInfo) => {
    console.log("Form submitted:", data);
    mutation.mutate(data);
  };

  if (servicesLoading) return <p>Loading services...</p>;
  if (servicesError) return <p>Error: {(servicesErrorMsg as Error).message}</p>;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">

          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Category name is required" })}
            />
            {errors.name && (
              <span className="text-xs text-red-500">
                <i className="fi fi-rr-exclamation mr-1"></i>
                {errors.name.message}
              </span>
            )}
          </div>
          
          {/* Service Select */}
          <div className="grid gap-2">
            <Label htmlFor="service">Service Type</Label>
            <Controller
              name="service"
              control={control}
              rules={{ required: "Service is required" }}
              render={({ field }) => (
                <Select
                  value={field.value ? String(field.value) : ""}
                  onValueChange={(val) => field.onChange(Number(val))}
                >
                  <SelectTrigger className="w-full border-current/20">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services?.map((service: any) => (
                      <SelectItem
                        key={service.id}
                        value={String(service.id)}
                      >
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.service && (
              <span className="text-xs text-red-500">
                <i className="fi fi-rr-exclamation mr-1"></i>
                {errors.service.message}
              </span>
            )}
          </div>

          {/* Sub Service Select */}
          <div className="grid gap-2">
            <Label htmlFor="sub_service">Sub Service</Label>
            <Controller
              name="sub_service"
              control={control}
              rules={{ required: "Sub Service is required" }}
              render={({ field }) => (
                <Select
                  value={field.value ? String(field.value) : ""}
                  onValueChange={(val) => field.onChange(Number(val))}
                  disabled={
                    !selectedService ||
                    subServicesLoading ||
                    subServicesFetching
                  }
                >
                  <SelectTrigger className="w-full border-current/20">
                    <SelectValue
                      placeholder={
                        selectedService
                          ? "Select a sub service"
                          : "Select service first"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {subServices?.map((sub) => (
                      <SelectItem key={sub.id} value={String(sub.id)}>
                        {sub.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.sub_service && (
              <span className="text-xs text-red-500">
                <i className="fi fi-rr-exclamation mr-1"></i>
                {errors.sub_service.message}
              </span>
            )}
            {subServicesError && (
              <span className="text-xs text-red-500">
                <i className="fi fi-rr-exclamation mr-1"></i>
                {(subServicesErrorMsg as Error).message}
              </span>
            )}
          </div>

          {/* Effective Date */}
          <div className="grid gap-2">
            <Label htmlFor="effective_date">Effective Date</Label>
            <Input
              id="effective_date"
              type="date"
              {...register("effective_date", {
                required: "Effective date is required",
              })}
            />
            {errors.effective_date && (
              <span className="text-xs text-red-500">
                <i className="fi fi-rr-exclamation mr-1"></i>
                {errors.effective_date.message}
              </span>
            )}
          </div>

          <DialogFooter className="pt-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

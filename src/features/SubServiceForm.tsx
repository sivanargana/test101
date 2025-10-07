import { fetchServices, submitSubService, ServiceStatusById } from "@/api/api";
import { MultiSelect } from "@/components/MultiSelect";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";

type ServiceOption = {
  id: number;
  name: string;
};

type CategoryInfo = {
  parent_id: number | null;
  name: string;
  code: string;
  effective_date: string;
  dispatch_duration: string;
  price: string;
  service_status: [];
  service_tax: string;
  standard_doc: string;
  case_report: string;
};

type DialogCategoryProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SubServiceForm({ open, onOpenChange }: DialogCategoryProps) {
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
  const methods = useForm<CategoryInfo>({
    defaultValues: {
      parent_id: null,
      service_status: [],
    },
  });

  const { handleSubmit, register, resetField, control, formState: { errors } } = methods;

  // Watch the selected service
  const selectedService = useWatch({
    control,
    name: "parent_id",
  });

  const { data: subServices } = useQuery<[]>({
    queryKey: ["subServices", selectedService],
    queryFn: () => ServiceStatusById(selectedService!),
    enabled: !!selectedService,
    retry: false,
  });

  // Reset sub_service when service changes
  useEffect(() => {
    resetField("service_status");
  }, [selectedService, resetField]);

  // Mutation to submit category
  const mutation = useMutation({
    mutationFn: submitSubService,
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
    <FormProvider {...methods}>

      <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Sub Service</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {/* Service Select */}
          <div className="grid gap-2">
            <Label htmlFor="service">Service Type</Label>
            <Controller
              name="parent_id"
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
                    {services?.map((service) => (
                      <SelectItem key={service.id} value={String(service.id)}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.parent_id && (
              <span className="text-xs text-red-500">
                <i className="fi fi-rr-exclamation mr-1"></i>
                {errors.parent_id.message}
              </span>
            )}
          </div>

          {/* Category Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Subservice Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Subservice name is required" })}
            />
            {errors.name && (
              <span className="text-xs text-red-500">
                <i className="fi fi-rr-exclamation mr-1"></i>
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Category Name */}
          <div className="grid gap-2">
            <Label htmlFor="code">Subservice Code</Label>
            <Input
              id="code"
              {...register("code", { required: "Subservice code is required" })}
            />
            {errors.code && (
              <span className="text-xs text-red-500">
                <i className="fi fi-rr-exclamation mr-1"></i>
                {errors.code.message}
              </span>
            )}
          </div>
          {/* Category Name */}
          <div className="grid gap-2">
            <Label htmlFor="dispatch_duration">Dispatch Duration</Label>
            <Input
              id="dispatch_duration"
              {...register("dispatch_duration", {
                required: "Subservice code is required",
              })}
            />
            {errors.dispatch_duration && (
              <span className="text-xs text-red-500">
                <i className="fi fi-rr-exclamation mr-1"></i>
                {errors.dispatch_duration.message}
              </span>
            )}
          </div>

          {/* Category Name */}
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              {...register("price", {
                required: "Subservice code is required",
              })}
            />
            {errors.price && (
              <span className="text-xs text-red-500">
                <i className="fi fi-rr-exclamation mr-1"></i>
                {errors.price.message}
              </span>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Service Tax</Label>
            <Controller
              name="service_tax"
              control={control}
              defaultValue="not_applicable"
              rules={{ required: "Service Tax is required" }}
              render={({ field }) => (
                <RadioGroup
                  className="flex space-x-6"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="applicable" id="r1" />
                    <Label htmlFor="r1">Applicable</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="not_applicable" id="r2" />
                    <Label htmlFor="r2">Not Applicable</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.service_tax && (
              <span className="text-xs text-red-500">
                {errors.service_tax.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <Label>Standard documents</Label>
            <Controller
              name="standard_doc"
              control={control}
              defaultValue="not_required"
              rules={{ required: "Status is required" }}
              render={({ field }) => (
                <RadioGroup
                  className="flex space-x-6"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="required" id="r1" />
                    <Label htmlFor="r1">Required</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="not_required" id="r2" />
                    <Label htmlFor="r2">Not Required</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.standard_doc && (
              <span className="text-xs text-red-500">
                {errors.standard_doc.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <Label>Final Report(CR)</Label>
            <Controller
              name="case_report"
              control={control}
              defaultValue="not_required"
              rules={{ required: "Case Report is required" }}
              render={({ field }) => (
                <RadioGroup
                  className="flex space-x-6"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="required" id="r1" />
                    <Label htmlFor="r1">Required</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="not_required" id="r2" />
                    <Label htmlFor="r2">Not Required</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.case_report && (
              <span className="text-xs text-red-500">
                {errors.case_report.message}
              </span>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="sub_service">Assign Status Count</Label>

            <Controller
              control={control}
              name="service_status"
              rules={{ required: "Please select at least one status" }}
              render={() => (
                <MultiSelect
                  name="service_status"
                  options={subServices}
                  placeholder="Select your Sub Service"
                />
              )}
            />

            {/* <MultiSelect
              name="service_status"
              options={subServices}
              placeholder="Select your Sub Service"
            /> */}
            {/* <MultiSelect
              control={control}
              rules={{ required: "Sub Service is required" }}
              options={subServices}
              placeholder="Select your languages"
              selected={[]}
              onChange={function (
                selected: { label: string; value: string }[]
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
            <Controller
              name="service_status"
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
                    {subServices?.map((sub: any) => (
                      <SelectItem key={sub.id} value={String(sub.id)}>
                        {sub.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.service_status && (
              <span className="text-xs text-red-500">
                <i className="fi fi-rr-exclamation mr-1"></i>
                {errors.service_status.message}
              </span>
            )}
            {subServicesError && (
              <span className="text-xs text-red-500">
                <i className="fi fi-rr-exclamation mr-1"></i>
                {(subServicesErrorMsg as Error).message}
              </span>
            )} */}
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
    </FormProvider>
  );
}

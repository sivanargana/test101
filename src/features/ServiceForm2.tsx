import { useForm, useFieldArray } from "react-hook-form";

type StatusOrder = {
  status: string;
  hidden_status: string;
  order: string;
  skip: boolean;
  hidden_number: number;
};

type FormData = {
  Service: {
    type: string;
    id?: string;
    name: string;
    subservice_code: string;
    price: string;
    dispatch_duration: string;
    effective_date: string;
    status_order: StatusOrder[];
    admin_status: string;
    approval_approve_status: string;
    approval_rejected_status: string;
  };
};

const STATUS_OPTIONS = [
  { value: "19005", label: "Pending for Allotment" },
  { value: "25008", label: "Additional Services post Dispatch" },
  { value: "19017", label: "Awaiting Further Material" },
  { value: "23015", label: "Chemical Analysis Results Received" },
  // ... add all options here as per your HTML
];

export default function ServiceForm2() {
  const { register, control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      Service: {
        type: "service",
        status_order: [
          {
            status: "19005",
            hidden_status: "",
            order: "1",
            skip: false,
            hidden_number: 0,
          },
        ],
        name: "",
        subservice_code: "",
        price: "",
        dispatch_duration: "",
        effective_date: "",
        admin_status: "",
        approval_approve_status: "",
        approval_rejected_status: "",
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "Service.status_order",
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted", data);
    // Handle form submission here, e.g. send data to your API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-horizontal col-md-10" noValidate>
      {/* Hidden inputs */}
      <input type="hidden" value="POST" {...register("Service.type")} />
      <input type="hidden" {...register("Service.id")} />

      {/* Service Name */}
      <div className="form-group col-sm-12 required">
        <label htmlFor="ServiceName" className="col-lg-4 col-md-4 col-xs-4">
          Service Name
        </label>
        <div className="col-xs-6">
          <input
            id="ServiceName"
            {...register("Service.name", { required: true, maxLength: 255 })}
            className="form-control"
            placeholder="Service Name"
            required
          />
        </div>
      </div>

      {/* Service Code */}
      <div className="form-group col-sm-12 required">
        <label htmlFor="ServiceSubserviceCode" className="col-lg-4 col-md-4 col-xs-4">
          Service Code
        </label>
        <div className="col-xs-6">
          <input
            id="ServiceSubserviceCode"
            {...register("Service.subservice_code", { required: true, maxLength: 10 })}
            className="form-control"
            placeholder="Service Code"
            required
          />
        </div>
      </div>

      {/* Price */}
      <div className="form-group col-sm-12">
        <label htmlFor="ServicePrice" className="col-lg-4 col-md-4 col-xs-4">
          Price
        </label>
        <div className="col-xs-6">
          <input
            id="ServicePrice"
            {...register("Service.price", { required: true, maxLength: 11 })}
            className="form-control"
            placeholder="Price"
            required
          />
        </div>
      </div>

      {/* Dispatch Duration */}
      <div className="form-group col-sm-12">
        <label htmlFor="ServiceDispatchDuration" className="col-lg-4 col-md-4 col-xs-4">
          Dispatch Duration
        </label>
        <div className="col-xs-6">
          <input
            id="ServiceDispatchDuration"
            {...register("Service.dispatch_duration", { required: true, maxLength: 11 })}
            className="form-control"
            placeholder="Dispatch Duration"
            required
          />
        </div>
      </div>

      {/* Effective Date */}
      <div className="form-group col-sm-12 required">
        <label htmlFor="effective_date" className="col-lg-4 col-md-4 col-xs-4">
          Effective Date
        </label>
        <div className="col-xs-6">
          <input
            type="text"
            id="effective_date"
            {...register("Service.effective_date", { required: true })}
            className="form-control datepicker"
            placeholder="DD/MM/YYYY"
            readOnly
            required
          />
        </div>
      </div>

      {/* Dynamic Status Order Rows */}
      <div className="morerow col-sm-12" id="button_pro">
        {fields.map((field, index) => (
          <div key={field.id} className="form-group col-lg-12 displayrow rows mainrow">
            <div className="col-lg-4 col-md-4 col-xs-4 status_label_div">
              <label>Status</label>
            </div>
            <div className="col-lg-3 col-md-3 col-xs-4 status_div">
              <select
                {...register(`Service.status_order.${index}.status` as const)}
                className="form-control status"
                defaultValue={field.status}
                id={`status${index}`}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <select
              {...register(`Service.status_order.${index}.hidden_status` as const)}
              className="form-control"
              id={`status_${index}`}
              style={{ display: "none" }}
              defaultValue={field.hidden_status}
            >
              <option value="">--Select Status--</option>
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <div className="col-xs-2 order_div">
              <input
                {...register(`Service.status_order.${index}.order` as const)}
                className="form-control order neg-sp-exp"
                placeholder="Order"
                id={`order${index}`}
                maxLength={3}
                readOnly
                defaultValue={field.order}
                type="text"
              />
            </div>

            <div className="col-xs-1">
              <input
                type="hidden"
                {...register(`Service.status_order.${index}.hidden_number` as const)}
                defaultValue={field.hidden_number}
                className="hidden_real_number"
              />
              <input
                type="hidden"
                name={`data[Service][status_order][${index}][skip][]`}
                id={`skip${index}_`}
                value="0"
              />
              <input
                {...register(`Service.status_order.${index}.skip` as const)}
                className="skip"
                id={`skip${index}`}
                type="checkbox"
                value="1"
              />
            </div>

            <div className="col-xs-1 action">
              {index === fields.length - 1 ? (
                <button
                  type="button"
                  className="btn btn-sm btn-success"
                  onClick={() =>
                    append({
                      status: "19005",
                      hidden_status: "",
                      order: (fields.length + 1).toString(),
                      skip: false,
                      hidden_number: fields.length,
                    })
                  }
                  title="Add"
                >
                  +
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => remove(index)}
                  title="Remove"
                >
                  -
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Admin Default Status */}
      <div className="form-group col-sm-12 required">
        <label htmlFor="ServiceAdminStatus" className="col-lg-4 col-md-4 col-xs-4">
          Allotment Default status<span className="red_color">*</span>
        </label>
        <div className="col-md-6 col-lg-6 col-xs-6">
          <select
            {...register("Service.admin_status", { required: true })}
            className="form-control"
            id="ServiceAdminStatus"
          >
            <option value="">--Select Status--</option>
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Report Approval Approved Default Status */}
      <div className="form-group col-sm-12 required">
        <label htmlFor="ServiceApprovalApproveStatus" className="col-lg-4 col-md-4 col-xs-4">
          Report Approval Approved Default Status<span className="red_color">*</span>
        </label>
        <div className="col-md-6 col-lg-6 col-xs-6">
          <select
            {...register("Service.approval_approve_status", { required: true })}
            className="form-control"
            id="ServiceApprovalApproveStatus"
          >
            <option value="">--Select Status--</option>
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Report Approval Rejected Default Status */}
      <div className="form-group col-sm-12 required">
        <label htmlFor="ServiceApprovalRejectedStatus" className="col-lg-4 col-md-4 col-xs-4">
          Report Approval Rejected Default Status<span className="red_color">*</span>
        </label>
        <div className="col-md-6 col-lg-6 col-xs-6">
          <select
            {...register("Service.approval_rejected_status", { required: true })}
            className="form-control"
            id="ServiceApprovalRejectedStatus"
          >
            <option value="">--Select Status--</option>
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="form-group">
        <div className="col-sm-offset-4 col-xs-8">
          <button type="submit" className="btn newbtn btn-primary form-submit">
            Submit
          </button>
          &nbsp;&nbsp;
          <a href="/trulims_beta/services/manage_services" className="btn newbtn btn-secondary">
            Cancel
          </a>
        </div>
      </div>
    </form>
  );
}

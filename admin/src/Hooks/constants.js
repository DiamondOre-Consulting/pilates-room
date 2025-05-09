export const formState = [
    {
      label: "Title",
      inputType: "text",
      name: "title",
      error: {
        required: "Name is required",
        minLength: { value: 2, message: "Minimum 2 characters required" },
      },
    },

    {
      label: "Location",
      inputType: "text",
      name: "location",
      error: {
        required: "location is required",
        // minLength: { value: 2, message: "Minimum 2 characters required" },
      },
    },

    {
      label: "Price",
      inputType: "number",
      name: "price",
      error: {
        required: "Price is required",
        // minLength: { value: 2, message: "Minimum 2 characters required" },
      },
    },

    {
      label: "Category",
      inputType: "select",
      name: "category",
      error: {
        required: "Title is required",
        minLength: { value: 2, message: "Minimum 2 characters required" },
      },
    },

    {
      label: "Start Time",
      inputType: "time",
      name: "startTime",
      required: true,
      error: { required: "Start time is required" },
    },
    {
      label: "End Time",
      inputType: "time",
      name: "endTime",
      required: true,
      error: { required: "End time is required" },
    },
    {
      label: "Date",
      inputType: "date",
      name: "date",
      error: {
        required: "Date is required",
        minLength: { value: 2, message: "Minimum 2 characters required" },
      },
    },

    {
      label: "Available",
      inputType: "checkbox",
      value: true,
      name: "available",
      required: true,

      error: {
        required: "available is required",
      },
    },

    {
      label: "Thumbnail Image",
      inputType: "file",
      name: "thumbnail",
      required: true,
      error: {
        required: "package image is required",
      },
    },

    {
      label: "Description",
      inputType: "textarea",
      name: "description",
      required: true,

      error: {
        required: "Description is required",
      },
    },
  ];
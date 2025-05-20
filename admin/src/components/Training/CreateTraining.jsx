import { formState } from "@/Hooks/constants";
import React, { useState, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import JoditEditor from "jodit-react";
import TimePicker from "react-time-picker";
import { createTraining } from "@/Redux/Slices/trainingSlice";
import { useDispatch } from "react-redux";

const CreateTraining = ({setCreateTrainigPopUp  , createTrainingPopUp  ,handleGetAllTrainings}) => {
  const [trainingImage, setTrainingImage] = useState([]);
  const [thumbnailImage, setThumbnailImage] = useState();
  const dispatch = useDispatch()
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const editor = useRef(null);

  const config = {
    readonly: false,
    placeholder: "Enter text here...",
    height: 200,
  };

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      moreInfo: [
        {
          title: "",
          description: "",
          uniqueCode: "",
          image: { publicId: "", secureUrl: "" },
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "moreInfo",
  });

  const getUniqueCode = () => {
    return uuidv4().slice(0, 10);
  };

  const getFileExtension = (fileName) => {
    return fileName.split(".").pop();
  };

  const handleFileChange = (e,ind) => {
    const selectedFile = e?.target?.files?.[0];
    if (e.target.name === "thumbnailImage") {
      setThumbnailPreview(URL.createObjectURL(selectedFile));
      setThumbnailImage(
        new File([selectedFile], "thumbnailImage", { type: selectedFile.type })
      );
    } else if (selectedFile && e.target.name !== "thumbnailImage") {
      const uniqueCode = getUniqueCode();
      const fileExtension = getFileExtension(selectedFile.name);
      if (!getValues(`moreInfo.${ind}.uniqueId`)) {
        const fileName = `${uniqueCode}.${fileExtension}`;
        setValue(`moreInfo.${ind}.uniqueId`, uniqueCode);
        setValue(
          `moreInfo.${ind}.image.secureUrl`,
          URL.createObjectURL(selectedFile)
        );

        setTrainingImage((prevFiles) => {
          const newFiles = [...(prevFiles || [])];
          newFiles[ind] = new File([selectedFile], fileName, {
            type: selectedFile.type,
          });
          return newFiles;
        });
      } else {
        const uniqueId = getValues(`moreInfo.${ind}.uniqueId`);
        const fileName = `${uniqueId}.${fileExtension}`;
        setValue(`moreInfo.${ind}.uniqueId`, uniqueCode);
        setValue(
          `moreInfo.${ind}.image.secureUrl`,
          URL.createObjectURL(selectedFile)
        );

        setTrainingImage((prevFiles) => {
          const newFiles = [...(prevFiles || [])];
          newFiles[ind] = new File([selectedFile], fileName, {
            type: selectedFile.type,
          });
          return newFiles;
        });
      }
    }
  };

  console.log(watch(`moreInfo[0].image.secureUrl`))

  const handleCreateTraining = async (data) => {
    try {
        console.log(data)
       
      const formData = new FormData();

      if (data.startTime) {
        const [hour, minute] = data.startTime.split(":");
        const start = new Date();
        start.setHours(hour);
        start.setMinutes(minute);
        const formattedStart = start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        formData.append("startTime", formattedStart);
      }

      if (data.endTime) {
        const [hour, minute] = data.endTime.split(":");
        const end = new Date();
        end.setHours(hour);
        end.setMinutes(minute);
        const formattedEnd = end.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        formData.append("endTime", formattedEnd);
      }

      Object.keys(data).forEach((key) => {
        if (!["startTime", "endTime", "trainingImages"].includes(key)) {
          if (key === "moreInfo") {
            data.moreInfo.forEach((item, index) => {
              if (item.title) {
                formData.append(`moreInfo[${index}][title]`, item.title);
                formData.append(
                  `moreInfo[${index}][description]`,
                  item.description
                );
                formData.append(
                    `moreInfo[${index}][uniqueId]`,
                    item.uniqueId
                  );
              }
            });
          } else {
            formData.append(key, data[key]);
          }
        }
      });
      console.log(data);

      trainingImage.forEach((file) => {
        formData.append("trainingImage", file);
      });

      formData.append("thumbnailImage", thumbnailImage);

      // Send the FormData to the server
      const response = await dispatch(createTraining(formData));

      if (response?.payload?.success === true) {
        setCreateTrainigPopUp(false);
       await handleGetAllTrainings()
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-40 min-h-full    transition flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => setCreateTrainigPopUp(false)}
      ></div>

      <div className="relative w-full max-w-4xl p-4 mx-auto bg-white rounded-xl z-50">
        <button
          type="button"
          onClick={() => setCreateTrainigPopUp(false)}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <svg
            className="h-5 w-5 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414 5.707 15.707a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <form
          onSubmit={handleSubmit(handleCreateTraining)}
          className="text-gray-700 md:grid grid-cols-3 gap-4 h-[90vh] overflow-y-auto text-sm"
        >
          {formState?.map((input, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                input.inputType === "textarea" ? "col-span-3" : ""
              }`}
            >
              <label className="mb-1">
                {input.label}{" "}
                {input.required && <span className="text-red-500">*</span>}
              </label>
              {input.inputType === "textarea" ? (
                <JoditEditor
                  ref={editor}
                  value={watch("description")}
                  config={config}
                  onBlur={(newContent) => setValue("description", newContent)}
                  onChange={() => {}}
                  className={`border px-2 py-1 w-full rounded border-black   ${
                    errors[input.name] ? "border-red-500" : "border-gray-400"
                  }`}
                />
              ) : input.inputType === "time" ? (
                <TimePicker
                  onChange={(value) => setValue(input.name, value)}
                  value={watch(input.name)}
                  format="hh:mm a"
                  disableClock={true}
                  className={`border px-2 py-1 rounded w-full ${
                    errors[input.name] ? "border-red-500" : "border-gray-400"
                  }`}
                />
              ) : input.inputType === "select" ? (
                <>
                  <select
                    {...register(input.name, input.error)}
                    className={`border px-2 py-1 rounded ${
                      errors[input.name] ? "border-red-500" : "border-gray-400"
                    }`}
                  >
                    <option value="">Select category</option>
                    <option value="teacherTraining">Teacher Training</option>
                    <option value="youMayAlsoLike">You May Also Like</option>
                  </select>
                  {errors[input.name] && (
                    <span className="text-red-500 text-xs">
                      {errors[input.name].message}
                    </span>
                  )}
                </>
              ) : input.inputType === "file" ? (
                <div className="flex justify-between items-center">
                  <input
                    type="file"
                    name="thumbnailImage"
                    onChange={handleFileChange}
                    className={`border px-2 py-1  w-40 rounded ${
                      errors[input.name] ? "border-red-500" : "border-gray-400"
                    }`}
                  />
                  {thumbnailPreview && (
                    <img
                      src={thumbnailPreview}
                      className="size-12 border border-1 border-gray-600 object-cover rounded-full  "
                      alt=""
                    />
                  )}
                </div>
              ) : input.inputType === "checkbox" ? (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register(input.name)}
                    className="h-5 w-5 accent-black"
                  />
                  {/* {input.label} */}
                  {/* {input.required && <span className="text-red-500">*</span>} */}
                </label>
              ) : (
                <input
                  type={input.inputType}
                  {...register(input.name, input.error)}
                  className={`border px-2 py-1 rounded ${
                    errors[input.name] ? "border-red-500" : "border-gray-400"
                  }`}
                />
              )}
              {errors[input.name] && (
                <span className="text-red-500 text-xs">
                  {errors[input.name].message}
                </span>
              )}
            </div>
          ))}

          {fields?.map((item, index) => (
            <div
              key={item.id}
              className="border col-span-3 space-y-1 p-3 rounded-md mt-2"
            >
              <input
                type="text"
                placeholder="Title"
                {...register(`moreInfo.${index}.title`, {
                  required: "Title is required",
                })}
                className="border p-1 rounded w-full"
              />
              {errors.moreInfo?.[index]?.title && (
                <span className="text-red-500 text-xs">
                  {errors.moreInfo[index].title.message}
                </span>
              )}

              <div className="col-span-2 flex flex-col">
                <label>Description</label>
                <JoditEditor
                  value={watch(`moreInfo.${index}.description`)}
                  config={config}
                  onBlur={(newContent) =>
                    setValue(`moreInfo.${index}.description`, newContent)
                  }
                />
                {errors?.moreInfo?.[index]?.description && (
                  <span className="text-red-500 text-xs">
                    {errors.moreInfo[index].description.message}
                  </span>
                )}
              </div>

              {/* <textarea
              placeholder="Description"
              {...register(`moreInfo.${index}.description`, {
                required: "Description is required",
              })}
              className="border p-1 rounded w-full mt-2"
            /> */}
              {errors.moreInfo?.[index]?.description && (
                <span className="text-red-500 text-xs">
                  {errors.moreInfo[index].description.message}
                </span>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, index)}
              />

              {watch(`moreInfo.[${index}].image.secureUrl`) && (
                <img
                  src={watch(`moreInfo.[${index}].image.secureUrl`)}
                  alt="Preview"
                  className="w-24 h-24 object-cover border rounded"
                />
              )}

              {errors.moreInfo?.[index]?.image && (
                <span className="text-red-500 text-xs">
                  {errors.moreInfo[index].image.message}
                </span>
              )}

              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-900 bg-red-400  px-2  py-1  rounded-sm ml-2 text-sm mt-2"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              append({
                title: "",
                description: "",
                uniqueId: "",
                image: { publicId: "", secureUrl: "" },
              })
            }
            className="bg-black text-white px-3 py-1 rounded"
          >
            Add More Info
          </button>

          <div className="col-span-3">
            <button
              type="submit"
              className="bg-black text-white cursor-pointer py-2 w-full rounded mt-2"
            >
              {isSubmitting ? (
                <div className="border-2 mx-auto rounded-full border-dashed animate-spin border-white size-5"></div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTraining;

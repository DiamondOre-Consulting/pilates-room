import { HomeLayout } from "@/Layout/HomeLayout";
import {
  createTraining,
  deleteTraining,
  editTraining,
  getAllTrainings,
} from "@/Redux/Slices/trainingSlice";
import React, { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import JoditEditor from "jodit-react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { Cards } from "@/components/Training/Cards";
import CreateTraining from "@/components/Training/CreateTraining";
import EditTraining from "@/components/Training/EditTraining";
import { Edit } from "lucide-react";

const TeacherTraining = () => {
  const dispatch = useDispatch();
  const [createTrainingPopUp, setCreateTrainigPopUp] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [previewImage, setPreviewImage] = useState();
  const [moreInfoPreviews, setMoreInfoPreviews] = useState([]);
  const [newMoreInfoPreviews, setNewMoreInfoPreviews] = useState([]);
  const [trainingImages, setTrainingImages] = useState([]);
  const [allTrainings, setAllTrainings] = useState([]);
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [trainingImage, setTrainingImage] = useState();
  const [trainingId, setTrainingId] = useState();
  const [data, setData] = useState();
  const [editTrainingData, setTrainingData] = useState(null);
  const [editTrainingPopUp, setEditTrainingPopUp] = useState(false);
  const [moreInfoEditImagesIndex, setMoreInfoEditImagesIndex] = useState([]);
  //   const [moreInfoNewEditImageIndex , setMoreInfoNewEditImagesIndex] = useState()
  const [newTrainningImages, setNewTrainingImages] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      moreInfo: [{ title: "", description: "", image: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "moreInfo",
  });

  const {
    fields: newFields,
    append: newAppend,
    remove: newRemove,
  } = useFieldArray({
    control,
    name: "newMoreInfo",
  });

  const handleMoreInfoImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);

      // Update preview images
      const updatedPreviews = [...moreInfoPreviews];
      updatedPreviews[index] = preview;
      setMoreInfoPreviews(updatedPreviews);

      // Update all training images
      const updatedImages = [...trainingImages];
      updatedImages[index] = file;
      setTrainingImages(updatedImages);

      // Mark the image field as "attached" in form
      setValue(`moreInfo.${index}.image`, "attached");

      // Track index for updating existing image
      setMoreInfoEditImagesIndex((prev) => {
        if (!Array.isArray(prev)) prev = [];
        if (!prev.includes(index)) {
          return [...prev, index];
        }
        return prev;
      });

      // Update only new/replaced training images
      setNewTrainingImages((prev) => {
        const updatedNew = [...prev];
        updatedNew[index] = file;
        return updatedNew;
      });
    }
  };

  console.log(trainingImages);
  console.log("new ", newTrainningImages);
  console.log("indexing number", moreInfoEditImagesIndex);

  const editor = useRef(null);

  const config = {
    readonly: false,
    placeholder: "Enter text here...",
    height: 200,
  };

  const handleGetAllTrainings = async () => {
    try {
      const response = await dispatch(getAllTrainings({ page, limit }));
      console.log(response);
      setAllTrainings(response?.payload?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllTrainings();
  }, []);

  console.log(allTrainings);

  const handleFileUpload = (e) => {
    const uploadedImage = e.target.files[0];
    const previewImage = URL.createObjectURL(uploadedImage);
    setPreviewImage(previewImage);
    setThumbnailImage(uploadedImage);
    console.log(uploadedImage);

    console.log(thumbnailImage);
  };

  const handleDeleteTraining = async (id) => {
    try {
      console.log(id);
      const response = await dispatch(deleteTraining(id));
      console.log(response);
      //   if (response?.payload?.statusCode == 200) {
      // console.log(response?.payload.statusCode);
      await handleGetAllTrainings();
      //   }
    } catch (error) {
      console.log(error);
    }
  };

  const editTrainingClicked = (id, data) => {
    setTrainingId(id);
    setTrainingData(data);
    console.log("this is  data onclicking", data);
    const formatTime = (timeStr) => {
      if (!timeStr) return "";
      const date = new Date(`01/01/2000 ${timeStr}`); // example fallback date
      if (isNaN(date.getTime())) return "";
      return date.toTimeString().slice(0, 5); // returns "HH:mm"
    };
    reset({
      ...data,
      startTime: formatTime(data.startTime),
      endTime: formatTime(data.endTime),
      date: data?.date?.split("T")[0],
    });

    setValue("date", data?.date.split("T")[0]);
    // setValue("thumbnailImage", data?.thumbnail?.secureUrl);
    setPreviewImage(data?.thumbnail?.secureUrl);
    setThumbnailImage("");

    if (Array.isArray(data.moreInfo)) {
      const previews = data.moreInfo.map((item) => item.image?.secureUrl || "");
      setMoreInfoPreviews(previews);

      data.moreInfo.forEach((item, index) => {
        setValue(`moreInfo.${index}.title`, item.title);
        setValue(`moreInfo.${index}.description`, item.description);
        setValue(`moreInfo.${index}.image`, item.image?.secureUrl || "");
      });
    }
    console.log(id, data);
    setEditTrainingPopUp(true);
  };

  const handleEditTraining = async (data) => {
    try {
      const formData = new FormData();
      console.log("this is data after clicking on edit", data);
      // Handle start time
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

      // Handle end time
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
              }
            });
          } else {
            formData.append(key, data[key]);
          }
        }
      });
      console.log(data);

      trainingImages.forEach((file) => {
        if (file instanceof File) {
          formData.append("updateTrainingImage", file);
        }
      });

      newTrainningImages.forEach((file) => {
        if (file instanceof File) {
          formData.append("newTrainingImages", file);
        }
      });

      if (thumbnailImage instanceof File) {
        formData.append("thumbnailImage", thumbnailImage);
      }

      moreInfoEditImagesIndex.forEach((index, i) => {
        formData.append(`moreInfoImagesIndex[${i}]`, index);
      });

      console.log("This is form data:", formData);

      const response = await dispatch(editTraining({ trainingId, formData }));
      console.log(response);

      //   if (response?.payload?.success === true) {
      // setEditTrainingPopUp(false);
      await handleGetAllTrainings();
      //   }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("new training image ", newTrainningImages);

  return (
    <HomeLayout>
      <div>
        <div className="flex justify-between py-2">
          <div className="flex flex-col">
            <h1 className="text-2xl">All Trainings</h1>
            <div className="w-20 h-1 bg-black"></div>
          </div>

          <div className="flex flex-col space-y-2">
            <button
              onClick={() => {
                reset();
                setCreateTrainigPopUp(true);
              }}
              className="bg-black text-white px-4 py-2 rounded-md  cursor-pointer text-sm"
            >
              Add Training
            </button>

            <div className="flex space-x-2 items-center  text-sm">
              <span>Page Limit : </span>
              <select
                className="border  px-2 cursor-pointer  py-1  border-gray-700 rounded-md"
                onChange={(e) => setLimit(e.target.value)}
              >
                <option value={1}>10</option>
                <option value={2}>20</option>
                <option value={3}>30</option>
              </select>
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 mt-12 gap-6">
          {allTrainings?.map((trn) => (
            <Cards
              trn={trn}
              setData={setData}
              handleGetAllTrainings={handleGetAllTrainings}
              setEditTrainingPopUp={setEditTrainingPopUp}
            />
          ))}
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
          {allTrainings?.map((ele) => (
            <div
              key={ele._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative h-16 bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-900">
                <button
                  onClick={() => {
                    setData(ele);
                    setEditTrainingPopUp(true);
                  }}
                  className=" bg-green-50 z-10 size-9 flex items-center justify-center text-green-700 rounded absolute top-2 right-2 cursor-pointer hover:bg-blue-100 transition-colors duration-200 font-medium"
                >
                  <Edit className="size-5" />
                </button>
                <div className="absolute -bottom-10 w-full flex justify-center">
                  <div
                    className={`h-20 w-20 z-1 relative rounded-full border-4  ${
                      ele?.available ? "border-green-500" : "border-red-500"
                    }  bg-white shadow-lg`}
                  >
                    <img
                      src={ele?.thumbnail?.secureUrl}
                      alt={ele?.title}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-12 p-6">
                <p className="text-blue-600 capitalize font-medium text-center mb-4">
                  {ele?.title}
                </p>

                <div className="flex flex-col md:min-w-[19rem] p-1 pb-0 gap-1 text-[15px]  text-gray-500   capitalize">
                  <p className="p-1 flex w-full items-center justify-between border-b-[1px] text-sm border-gray-300 text-gray-500 ">
                    Location
                    <span className="text-[1.01rem] capitalize dark:text-white text-black">
                      {ele?.location}
                    </span>
                  </p>
                  <p
                    dangerouslySetInnerHTML={{ __html: ele?.description }}
                    className="p-1 line-clamp-4 w-full text-sm  text-gray-500 "
                  />
                </div>
                {/* 
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => editClassClicked(ele?._id, ele)}
                    className="px-6 py-2 bg-blue-50 w-full text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-medium"
                  >
                    Edit Class
                  </button>
                  <button
                    onClick={() => handleDeleteClass(ele?._id)}
                    className="px-6 py-2 bg-red-600 w-full text-white rounded-lg hover:bg-red-100 transition-colors duration-200 font-medium"
                  >
                    Delete
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>

        {createTrainingPopUp && (
          <CreateTraining
            handleGetAllTrainings={handleGetAllTrainings}
            createTrainingPopUp={createTrainingPopUp}
            setCreateTrainigPopUp={setCreateTrainigPopUp}
          />
        )}

        {editTrainingPopUp && (
          <EditTraining
            setEditTrainingPopUp={setEditTrainingPopUp}
            editData={data}
            handleGetAllTrainings={handleGetAllTrainings}
          />
        )}
      </div>
    </HomeLayout>
  );
};

export default TeacherTraining;

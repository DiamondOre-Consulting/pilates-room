import { deleteTraining } from '@/Redux/Slices/trainingSlice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

export const Cards = ({trn , setEditTrainingPopUp , setData , handleGetAllTrainings}) => {
const dispatch = useDispatch()

    const handleDeleteTraining = async (id) => {
      try {
        console.log(id);
        const response = await dispatch(deleteTraining(id));
        console.log(response);
       
        await handleGetAllTrainings();
        //   }
      } catch (error) {
        console.log(error);
      }
    };


  return (
    <article className="shadow-lg relative bg-white dark:shadow-none dark:bg-[#1E2735] rounded overflow-hidden h-full">
              <img
                src={trn?.thumbnail?.secureUrl}
                className="h-40 object-cover w-full"
              />
              <div className="p-3 pb-8 md:p-6 md:pb-12">
                <h4 className="font-medium text-xl leading-7 flex  items-center   mb-2">
                  {trn?.title}{" "}
                  <div
                    className={`${
                      trn?.available
                        ? "bg-green-400 ml-2 animate-pulse size-4 rounded-full "
                        : "bg-red-400 ml-2 animate-pulse size-4 rounded-full"
                    }`}
                  ></div>
                </h4>
                <p>
                  <p className="text-blue-600 opacity-70  mb-2">{trn?.location}</p>

                  {/* <p className="text-blue-600 bg-blue-400/50 w-fit px-2 rounded-md opacity-70">
                    ₹ {pkg?.price}
                  </p> */}

                  <span>{/* At <span>{date}</span> */}</span>
                </p>
                {/* <p
                  dangerouslySetInnerHTML={{ __html: trn?.description }}
                  className="opacity-60 mt-3 mb-8 text-xs"
                /> */}

                <div className="flex space-x-4    bottom-4">
                  <button
                    onClick={(e) => {
                        setEditTrainingPopUp(true);
                        setData(trn)
                        
                    }}
                    className="bg-transparent hover:bg-black border border-black cursor-pointer hover:text-white py-2 px-5 rounded transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => handleDeleteTraining(trn?._id)}
                    className="bg-transparent hover:bg-black border border-black cursor-pointer hover:text-white py-2 px-5 rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
  )
}

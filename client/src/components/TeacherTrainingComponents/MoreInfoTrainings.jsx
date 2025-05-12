import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BookingSection from '../BookingSection';

const MoreInfoTrainings = () => {
    const {state} = useLocation();
    console.log("info in state",state)

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

      
  return (
    <div>
   <section className="w-full">
        <div
          className="w-full h-[32rem] bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center relative"
          style={{ backgroundImage: `url(${state?.data?.thumbnail?.secureUrl})` }}
        >
          <div className="absolute inset-0 bg-black/20 z-0"></div>
          <div className="z-10">
            <h1 className="text-white uppercase tracking-wider widers text-center xl:text-7xl lg:text-4xl md:text-3xl sm:text-2xl text-4xl">
              {state?.data?.title}
            </h1>
          </div>
        </div>
      </section>

      <section className='px-8 md:px-20 py-10'>
    <video src='https://exhalepilateslondon.com/wp-content/uploads/2023/01/Gaby-to-camera-2-intro.mp4' className='rounded-2xl' controls autoplay muted/>
   </section>

      {
  state?.data?.moreInfo?.map((info , index)=>(
    <div className={`flex px-4 md:space-y-0 space-y-4 ${index%2 ===0 ? "bg-dark text-white " : "bg-white flex-col  md:flex-row-reverse "}  py-20 md:flex-row flex-col`}>
    <div className="flex flex-col justify-center  items-center space-y-4 max-w-xl mx-auto ">
      <h1 className="text-4xl uppercase">{info?.title}</h1>
      <p className={`text-center ${index%2 ===0 ? "text-gray-200" : "text-black"} text-center`}dangerouslySetInnerHTML={{__html :info?.description}} >
      
      </p>
 
    </div>

    <div className="justify-center items-center w-full md:w-[35rem] flex mx-auto rounded-lg h-80 " style={{backgroundImage : `url('${info?.image?.secureUrl}')` , backgroundSize : "cover"}}>
      {/* <img
        src="https://exhalepilateslondon.com/wp-content/uploads/2025/01/Exhale_Nov24_111-1-scaled.jpg"
        className="w-[30rem] h-[25rem]  objet-cover  rounded-lg"
        alt=""
      /> */}
    </div>
  </div>
  ))
}

      <div className="absolute fixed bottom-0 w-full z-40 md:block hidden ">
          <BookingSection />
      </div>
    </div>
  )
}

export default MoreInfoTrainings
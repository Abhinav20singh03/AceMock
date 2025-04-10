"use client"
import React, { useEffect,useState } from 'react'
import {db} from "/utils/db.js"
import {MockInterview} from "/utils/schema.js"
import { eq } from "drizzle-orm";
import { ClipLoader } from 'react-spinners';
import "./page.css"
import Webcam from 'react-webcam';
import { WebcamIcon } from 'lucide-react';
import { FaRegLightbulb } from "react-icons/fa";
import{ useRouter } from 'next/navigation';

const Interview = ({params}) => {
     const router = useRouter();
     const [jsonData,setJsonData] = useState([]);
     const [interviewData,setInterviewData] = useState(null);
     const [loading,setLoading] = useState(true);
     const [webcam,setWebcam] = useState(false);

    const getInterview = async()=>{
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId,params.interviewId));
        setInterviewData(result);
        console.log("data:",JSON.parse(result[0].jsonMockRes));
        setJsonData(JSON.parse(result[0].jsonMockRes));
        setLoading(false);
        console.log("result",result);
    }

    useEffect(()=>{
       getInterview();
     },[])


  return (
    <div className={loading?'loading-container':"question-container"}>
      {loading
      ? 
      <div className='loading-comp'>
        Loading
        <ClipLoader
      loading={loading}
      size={30}
      aria-label="Loading Spinner"
      data-testid="loader"
      color='Black'
     />
      </div>
      
      :
        <div className='interview-webcam'>
        <div className='interview-heading'>Let's Get Started</div>
        {
          webcam
          ?
          <div className='webcam-parent'>
            <div className='left-side'>
          <div className='interview-info'>
              <div className='info'><b>Job Role/Job Position:</b> {interviewData[0].jobPosition}</div>
              <div className='info'><b>Job Description/Tech Stack:</b> {interviewData[0].jobDesc}</div>
              <div className='info'><b>Years of Experience:</b> {interviewData[0].jobExperience}</div>
          </div>
          <div className='noted-info'>
              <div className='flex gap-3'><FaRegLightbulb size={20} color='orange'/><b className='text-yellow-500'>Information</b></div>
              <div>Enable Video Webcam and Microphone to Start your Al Generated Mock Interview, It Has 5 question which you answer and at the last you will get the report on the basis of your answer. <b>NOTE:</b> We never record your video, Web cam access you can disable at any time if you want</div>
          </div>
        </div>
          <div className='Truewebcam'>
          <Webcam
      audio={false}
      height={300}
      width={300}
      screenshotFormat="image/jpeg"
      videoConstraints={{ facingMode: "user" }}
    />
          <button className='button' onClick={()=>{setWebcam(false)}}>Disable Camera Access</button>
          </div>
          
          </div>
          :
          <div className='webcam-parent'>
            <div className='left-side'>
          <div className='interview-info'>
              <div className='info'><b>Job Role/Job Position:</b> {interviewData[0].jobPosition}</div>
              <div className='info'><b>Job Description/Tech Stack:</b> {interviewData[0].jobDesc}</div>
              <div className='info'><b>Years of Experience:</b> {interviewData[0].jobExperience}</div>
          </div>
          <div className='noted-info'>
              <div className='flex gap-3'><FaRegLightbulb size={20} color='orange'/><b className='text-yellow-500'>Information</b></div>
              <div>Enable Video Webcam and Microphone to Start your Al Generated Mock Interview, It Has 5 question which you answer and at the last you will get the report on the basis of your answer. <b>NOTE:</b> We never record your video, Web cam access you can disable at any time if you want</div>
          </div>
        </div>
              <div className='webcam'>
          <div className='webcam-container'>
          <WebcamIcon className='webcam-icon'/>
          </div>
          <button className='button' onClick={()=>{setWebcam(true)}}>Enable Webcam and Microphone</button>
          </div>
          </div>
          
        }
        </div>
      }
      <div className='start-interview'>
      <button className='button-2' onClick={()=>{router.push("/dashboard/interview/"+params.interviewId+"/start")}}>Start interview</button>
      </div>
    </div>
  )
}

export default Interview;

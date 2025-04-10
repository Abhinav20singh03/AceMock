"use client"
import React, { useEffect, useState } from 'react';
import './page.css';
import {db} from "/utils/db.js"
import { eq } from "drizzle-orm";
import {UserAnswer} from "/utils/schema.js"
import { useParams, useRouter } from 'next/navigation';
import { FaAngleDoubleDown } from "react-icons/fa";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "/@/components/ui/collapsible"
  
const Feedback = ({ score }) => {
    const router = useRouter();
    const {interviewId} = useParams();
    const [feedbackList,setFeedbackList] = useState([]);
    const [totalRating,setTotalRating] = useState(0);
    const getFeedback= async() =>{
        const  feedback = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef,interviewId)).orderBy(UserAnswer.id);
        console.log(feedback);
        setFeedbackList(feedback);
    }
    useEffect(()=>{
        getFeedback();
    },[])


    useEffect(()=>{
        let marks = 0;
        let number = 0;
        feedbackList.forEach((ele)=>{
            marks += parseInt(ele.rating);
            number++;
        })
        console.log(marks);
        setTotalRating(Math.floor(marks/number));
    },[feedbackList]);

  return (
    <div className="feedback-container">
      <h1 className="feedback-title">Congratulation!</h1>
      <h2 className="feedback-subtitle">Here is your interview feedback</h2>
      <p className="feedback-rating">
        Your overall interview rating: <span className="rating-score">{totalRating}/10</span>
      </p>
      <p className="feedback-description">
        Find below interview question with correct answer, Your answer and feedback for improvement
      </p>
      <div className='question-collapser-container'>
      {feedbackList&&feedbackList.map((ele,index)=>{
            return <Collapsible  key={index}>
            <CollapsibleTrigger className="question-collapser">
            <div className='question-box'>
            <div>
            {ele.question}
            </div>
            <div className='icon'>
            <FaAngleDoubleDown size={20} />
            </div>
            </div>
            
            
            </CollapsibleTrigger>
            <CollapsibleContent>
            <div className='collapser-feedback'>
            <div className='rating'><b>Rating: {ele.rating}</b></div>
            <div className='userans'><b>User Answer: </b>{ele.userAns}</div>
            <div className='correctans'><b>Expected Answer: </b>{ele.correctAns}</div>
            <div className='feedback-giver'><b>Feedback: </b>{ele.feedback}</div>
            </div>
            
            </CollapsibleContent>
          </Collapsible>
      })}
      </div>
     <div className='gohome'>
        <button className='button' onClick={()=>{router.push("/dashboard")}}>
            Go Home
        </button>
     </div>
      
    </div>
  );
};

export default Feedback;

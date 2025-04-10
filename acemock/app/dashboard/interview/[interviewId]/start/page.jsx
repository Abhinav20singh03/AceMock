"use client";  
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; 
import { db } from "/utils/db.js";
import { MockInterview } from "/utils/schema.js";
import { eq } from "drizzle-orm";
import QuestionSection from "/app/dashboard/_components/QuestionSection"
import AnswerSection from "/app/dashboard/_components/AnswerSection"
import "./page.css"
const StartPage = () => {
  const params = useParams();  
  const interviewId = params?.interviewId; 

  const [interviewData, setInterviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jsonData, setJsonData] = useState(null);
  const [activeQuestion,setActiveQuestion] = useState(null);



  const ActiveQuestionMaker = (ele)=>{
    setActiveQuestion(ele);
  }

  useEffect(()=>{
    console.log("startpage",jsonData);
  },[jsonData])


  const getInterview = async () => {

    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));

      setInterviewData(result);
      setJsonData(JSON.parse(result[0].jsonMockRes));
      setLoading(false);

      console.log("Data:", JSON.parse(result[0].jsonMockRes));
      console.log("Result:", result);
    } catch (error) {
      console.error("Error fetching interview data:", error);
    }
  };

  useEffect(() => {
    if (interviewId) getInterview();  
  }, [interviewId]);

  return (
    <div className="startpage-container">
      {jsonData ? (
        <><QuestionSection ActiveQuestionMaker={ActiveQuestionMaker} questions={jsonData} />
        <AnswerSection questions={jsonData} activeQuestion={activeQuestion} interviewData={interviewData}/></>
      ) : (
        <p>Loading...</p>
      )}
        
      
    </div>
  );
};

export default StartPage;

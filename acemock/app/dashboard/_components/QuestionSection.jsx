"use client"
import React, { useEffect, useState } from 'react'
import "./QuestionSection.css"
const QuestionSection = ({questions,ActiveQuestionMaker}) => {

  const [ques,setQues] = useState(questions);
  const [mainQues,setMainQues] = useState("Click on a question to select it, then press 'Start Recording' to begin your answer. When you're finished, click 'Stop Recording'");
  
  useEffect(()=>{
    console.log("ques",ques);
  },[])

  return (
    <div className='question-container'>
      <div>
      <div className='question-header'>
      {ques.map((ele,index)=>{
        return <button className='question-button' onClick={()=>{
          setMainQues(ele.question);
          ActiveQuestionMaker(ele);
        }} key={index}>Question: {index+1}</button>
      })}
      </div>
      <div className='question-show'>{mainQues}</div>
      </div>
      <div className='question-note'>
        <h2>Helpful Tip: </h2>
        <div>You answer the interview questio with video recording. We then trascribe your video recording to text and will save your answer and at the last we will give feedback on how well you answer the question</div>
      </div>
    </div>
  )
}

export default QuestionSection

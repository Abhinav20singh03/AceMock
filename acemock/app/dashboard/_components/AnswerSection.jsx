"use client";
import React, { useEffect, useState } from 'react';
import "./AnswerSection.css";
import {  WebcamIcon } from 'lucide-react';
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from 'react-webcam';
import { toast } from 'sonner';
import useGemini from '/Hooks/useGemini.js';
import {db} from "/utils/db.js"
import { UserAnswer } from '/utils/schema';
import { useUser } from '@clerk/nextjs';

const AnswerSection = ({ questions, activeQuestion, interviewData }) => {
  const { user } = useUser();
  const [userAnswer, setUserAnswer] = useState("");
  const [openCamera, setOpenCamera] = useState(true);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [myResults, setMyResults] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    console.log("Active", activeQuestion);
  }, [activeQuestion]);

  useEffect(() => {
    console.log("interview", interviewData);
  }, [interviewData]);

  useEffect(() => {
    console.log("userAnsbefore", userAnswer);
    if (!isRecording && userAnswer.length > 10) {
      SaveUserAnswerInDb();
    }
    console.log("userAnsafter", userAnswer);
  }, [userAnswer]);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (!isSaved && isRecording) {
      setMyResults(results); 
    }
  }, [results, isSaved, isRecording]);

  useEffect(() => {
    if (!isSaved && isRecording) {
      const combinedTranscript = myResults.map(r => r.transcript).join(" ");
      setUserAnswer(combinedTranscript);
    }
  }, [myResults, isSaved, isRecording]);


  useEffect(() => {
    console.log("result", result);
  }, [result]);

  const StartStopRecording = async () => {
    if (isRecording) {
      if (activeQuestion == null) {
        toast("Please Select a Valid Question, Click on the Question Number Stated Above !");
        stopSpeechToText();
        return;
      }
  
      stopSpeechToText();
  
      if (userAnswer?.length < 10) {
        setLoading(false);
        toast("Error While Saving Your Answer, Please Record Again !");
        return;
      }
  
      await SaveUserAnswerInDb();
    } else {
      startSpeechToText();
      setUserAnswer("");     
     
    }
  };

  const SaveUserAnswerInDb = async () => {
    setLoading(true);

    const feedbackPrompt = 
`You are an interview coach.
Please read the following question and user answer, then provide feedback and a strict rating in JSON format.

## Question:
"${activeQuestion?.question}"

## User Answer:
"${userAnswer}"

Your task:
- Give a rating between 1 to 5 based on the quality of the answer.
- Be strict; only give more than 1 if the answer is relevant and structured.
- Provide feedback in 3-5 lines on how the answer could be improved.

Respond *only in JSON* with the following structure:
{
  "rating": <number>,
  "feedback": "<brief constructive feedback>"
};`;

    try {
      const resultresponse = await useGemini({
        jobPosition: null,
        jobDescription: null,
        experience: null,
        prompt2: feedbackPrompt,
      });

      const newResponse = resultresponse
        .replace("json", "")
        .replace("", "")
        .trim();

      const parsedResult = JSON.parse(newResponse);
      setResult(parsedResult);

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData[0]?.mockId,
        question: activeQuestion?.question,
        correctAns: activeQuestion?.answer,
        userAns: userAnswer,
        feedback: parsedResult.feedback,
        rating: parsedResult.rating,
        userEmal: user?.primaryEmailAddress?.emailAddress,
        createdAt: new Date(),
      });

      if (resp) toast("User Answer & Feedback Recorded Successfully");
    } catch (error) {
      console.error("Feedback error:", error);
      toast("AI did not return valid feedback. Please try again.");
    }
   setUserAnswer("");
  };

 

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div className='answersection-container'>
      <div className='answer-webcam'>
        {
          isRecording
            ? <Webcam style={{ height: 300, width: 300 }} />
            : <><WebcamIcon size={100} className='webcam-icon' /></>
        }
      </div>

      <button className='button' onClick={StartStopRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>

      <button className='button' onClick={() => { console.log(userAnswer) }}>
        show answer
      </button>
    </div>
  );
};

export default AnswerSection;
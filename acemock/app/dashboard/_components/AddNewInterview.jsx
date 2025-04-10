"use client"
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./AddNewInterview.css";
import button from "/components/ui/button.jsx"
import ClipLoader from "react-spinners/ClipLoader";
import useGemini from "/Hooks/useGemini.js"
import {db} from "/utils/db.js"
import {MockInterview} from "/utils/schema.js"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "/@/components/ui/dialog.jsx"
import { useUser } from '@clerk/nextjs';
import { useRouter } from "next/navigation";


const AddNewInterview = () => {
    const {user} = useUser();
    const[loading,setloading] = useState(false);
    const [dialogBox,openDialogBox] = useState(false);
    const[jobPosition,setJobPosition] = useState("");
    const[jobDescription,setJobDescription] = useState("");
    const[experience,setExprience] = useState("");
    const router = useRouter();
    const prompt2 = null;

    const quesfetcher = async ()=>{
        setloading(true);
        const ques =await useGemini({jobPosition,jobDescription,experience,prompt2});
        setloading(false);
        const newques = ques.replace("```json","").replace("```","");
        const newquesjson = JSON.parse(newques)
        console.log(newquesjson);


        const resp = await db.insert(MockInterview).values({
          mockId : uuidv4(),
          jsonMockRes : JSON.stringify(newquesjson),
          jobPosition,
          jobDesc : jobDescription,
          jobExperience : experience,
          createdBy : user?.primaryEmailAddress?.emailAddress,
          createdAt : new Date()
        }).returning({mockId : MockInterview.mockId});

        console.log(resp);



        if(resp){
          openDialogBox(false);
          router.push("/dashboard/interview/"+resp[0]?.mockId);
        }
    }
   



  return (
    <div className='addnewinterview'>
       <div className='addnewinterview-comp' onClick={()=>{openDialogBox(true)}}>
         <h2>+ Add New</h2>
       </div>
       <Dialog open={dialogBox}>
        <DialogContent>
            <DialogHeader>
            <div className='dia-form'>
                <div className='dia-heading'>Tell us more about the Job you are Interviewing</div>
                <div className='dia-subheading'>Add details about the job position, Your skills and Years of experience</div>
                <div className='dia-form'>
                    <div className='dia-subheading'>Job Position/Role Name</div>
                    <input className='dia-input' type='text' value={jobPosition} onChange={(e)=>{setJobPosition(e.target.value)}} placeholder='Ex. Full Stack Developer'/>
                    <div className='dia-subheading'>Job Description/Tech Stack in Short</div>
                    <input className='dia-input' type='text' value={jobDescription} onChange={(e)=>{setJobDescription(e.target.value)}} placeholder='Ex. React, Angular, NodeJs, MySQL etc'/>
                    <div className='dia-subheading' >No. of year Experience</div>
                    <input className='dia-input' type='number' min={0} max={20} value={experience} onChange={(e)=>{setExprience(e.target.value)}} placeholder='Ex. 3'/>
                </div>
            </div>
            
            <div className='dialog-box-container'>
                <button className='dialog-box-button' onClick={()=>{openDialogBox(false)}}>Cancel</button>
                <button className='dialog-box-button' onClick={quesfetcher}>{loading?
                  <div className='generating-ques'>Generating questions...
                <ClipLoader
                  loading={loading}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                  color='White'
                 />
                 </div>
      :<>Start Interviewing</>}</button>
            </div>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    </div>
  )
}

export default AddNewInterview;

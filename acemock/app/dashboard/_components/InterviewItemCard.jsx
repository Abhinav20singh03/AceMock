import React from 'react'
import { useRouter } from 'next/navigation';
import "./InterviewItemCard.css"
const InterviewItemCard = ({interview}) => {

    const router = useRouter()
    const onStart = ()=>{
        router.push("/dashboard/interview/"+interview?.mockId)
    }
    const onFeedback = ()=>{
        router.push("/dashboard/interview/"+interview?.mockId+"/feedback")
    }
  return (
    <div className="bg-white border border-gray-300 shadow-md rounded-xl p-5 transition hover:shadow-lg">
  <h2 className="text-xl font-semibold text-black">{interview?.jobPosition}</h2>
  <h2 className="text-sm text-gray-700 mt-1">
    {interview?.jobExperience} Years of experience
  </h2>
  <h2 className="text-xs text-gray-500 mt-1">
    Created At: {new Date(interview?.createdAt).toLocaleDateString()}
  </h2>

  <div className="flex justify-end items-center gap-3 mt-4">
    <button
      className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition"
      onClick={onFeedback}
    >
      Feedback
    </button>
    <button
      className="px-4 py-2 bg-gray-700 text-white text-sm font-medium rounded-lg hover:bg-gray-900 transition"
      onClick={onStart}
    >
      Start
    </button>
  </div>
</div>


  )
}

export default InterviewItemCard
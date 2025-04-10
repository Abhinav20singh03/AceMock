import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyBL6av-AKKzMEeMHor2nMdVWDaavOpXK7g" });

async function useGemini({ jobPosition, jobDescription, experience,prompt2 }) {
  if(prompt2==null){
    const prompt = `Based on the job position "${jobPosition}", job description "${jobDescription}", and experience "${experience}", provide 5 interview questions with their answers in JSON format.give question and answer as field in json`;
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
  
    return response.text ;
  }else{
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt2,
    });
  
    return response.text ;
  }
 
}

export default useGemini;

import { useEffect, useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Takes up most of the screen, a iframe to surveymonkey
const SurveyDialog = ({ activityId }) => {
  const [ personId, setPersonId ] = useState(null);
  const [ surveyComplete, setSurveyComplete ] = useState(false);

  useEffect(() => {
    fetch("/api/getid", {
      method: "GET",
      credentials: "include",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`bad response from backend ${response}`);
      }
      return response.json();
    })
    .then((responsejson) => setPersonId(responsejson.person_id))
    .catch((error) => console.error("Error fetching id:", error));

    const surveyCompletion = () => {
      fetch(`/api/surveycompletion?activity_id=${activityId}&person_id=${personId}`)
      .then((response) => response.json())
      .then((responsejson) => {
        if (responsejson.completed === "complete") {
          setSurveyComplete(true);  
        }
      })
      .catch((error) => console.error("Error:", error));
    }
    surveyCompletion();
    const intervalId = setInterval(surveyCompletion, 2000);
    return () => clearInterval(intervalId);
  });
  const surveylink = `https://www.surveymonkey.com/r/DVLXTFR?person_id=${personId}` 
  return (<>
    <Dialog>
      <VisuallyHidden>
        <DialogTitle>SurveyMonkey Link</DialogTitle>
      </VisuallyHidden>
      <DialogTrigger asChild>
        <button
          disabled={surveyComplete}
          className={`items-center px-4 py-2 mx-2 rounded ${
            surveyComplete
            ? "bg-gray-400 text-gray-600"
            : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {surveyComplete ? "Priority Bumped. Thank you!" : "Answer a quick survey for priority"}
        </button>
      </DialogTrigger>
      <DialogContent className="w-11/12 max-w-4xl h-[90vh] overflow-y-auto flex flex-col">
        <iframe
          src={surveylink}
          className="flex-1 w-full h-full border-0 pt-5" 
          title="Survey Link"
        ></iframe>
        {surveyComplete && (
          <p className="text-center">Survey Complete! You can close the window</p>
        )}
      </DialogContent>
    </Dialog>
  </>);
}

export { SurveyDialog }

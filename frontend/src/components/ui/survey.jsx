import { Button }  from "@/components/ui/button"
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
const SurveyDialog = () => {
  const [ personId, setPersonId ] = useState(null);
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
    .then((responsejson) => {
      setPersonId(responsejson.person_id);
    })
    .catch((error) => {
      console.error("Error fetching id:", error);
    });
  });
  const surveylink = `https://www.surveymonkey.com/r/DVLXTFR?person_id=${personId}` 
  return (<>
    <Dialog>
      <VisuallyHidden>
        <DialogTitle>SurveyMonkey Link</DialogTitle>
      </VisuallyHidden>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full">
          Answer a question for priority
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 max-w-4xl h-[90vh] overflow-y-auto">
        <iframe
          src={surveylink}
          className="w-full h-full border-0" 
          title="Survey Link"
        ></iframe>
      </DialogContent>
    </Dialog>
  </>);
}

export { SurveyDialog }

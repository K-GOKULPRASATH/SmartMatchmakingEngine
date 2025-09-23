"use client";

import { useFormState, useFormStatus } from "react-dom";
import { runMatchingAlgorithm, type AlgorithmState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Loader2, Rocket } from "lucide-react";
import DataTables from "./data-tables";
import ResultsDisplay from "./results-display";
import { students, companies } from "@/lib/data";

const initialState: AlgorithmState = {
  result: null,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        <Rocket className="mr-2 h-5 w-5" />
      )}
      Run AI Matching Engine
    </Button>
  );
}

export default function Dashboard() {
  const [state, formAction] = useFormState(runMatchingAlgorithm, initialState);

  return (
    <div className="space-y-8">
      <DataTables students={students} companies={companies} />

      <form action={formAction} className="text-center">
        <SubmitButton />
      </form>

      {state.result && <ResultsDisplay result={state.result} />}
    </div>
  );
}

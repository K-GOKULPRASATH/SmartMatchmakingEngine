import { BrainCircuit } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <BrainCircuit className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Internship AI Match
            </h1>
          </div>
        </div>
        <p className="pb-4 text-muted-foreground">
          An AI-powered tool to match students with internships based on skills and fairness metrics.
        </p>
      </div>
    </header>
  );
}

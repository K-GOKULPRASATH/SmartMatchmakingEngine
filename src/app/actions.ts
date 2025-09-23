"use server";

import { runMatchingAlgorithm as performMatching } from "@/lib/matching";
import { students, companies } from "@/lib/data";
import type { AlgorithmResult } from "@/lib/definitions";

export type AlgorithmState = {
  result: AlgorithmResult | null;
  message: string;
};

export async function runMatchingAlgorithm(
  prevState: AlgorithmState,
  formData: FormData
): Promise<AlgorithmState> {
  try {
    const result = performMatching(students, companies);
    return {
      result,
      message: "Successfully ran the matching algorithm.",
    };
  } catch (error) {
    console.error("Error running matching algorithm:", error);
    return {
      result: null,
      message: "An error occurred while running the algorithm.",
    };
  }
}

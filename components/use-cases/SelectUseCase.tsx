"use client";

import { getUseCasesAction } from "@/app/actions/getUseCasesAction";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { UseCase } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect, useState, useTransition } from "react";

export default function SelectUseCase() {
  // State in URL to be able to share screens
  const [useCaseId, setUseCaseId] = useQueryState("use_case_id");
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  const getUseCases = () => {
    startTransition(async () => {
      const data = await getUseCasesAction();
      setUseCases(data);
      //   TODO: Error handling
    });
  };

  const handleContinue = () => {
    if (!useCaseId) return;
    router.push(`/use-case?use_case_id=${useCaseId}`);
  };

  const handleErase = () => {
    setUseCaseId("");
    router.push("/");
  };

  useEffect(() => {
    /**
     * If we want, we could redirect to the use case page if there is a use case id in the URL.
     * For the sake of the demo, we'll just redirect when clicking the "Continue" button.
     *
     * if (useCaseId) router.push(`/use-case?use_case_id=${useCaseId}`);
     */
    getUseCases();
  }, []);

  return (
    <div className="flex flex-col items-start gap-2 justify-center">
      <p className="text-sm text-gray-700 font-medium">Select a use case</p>
      <Select
        onValueChange={setUseCaseId}
        disabled={isLoading}
        value={useCaseId || undefined}
        key={useCaseId || "empty"}
      >
        <SelectTrigger className="w-[300px] bg-white">
          <SelectValue placeholder="Select a use case" />
        </SelectTrigger>
        <SelectContent>
          {useCases.map((useCase) => (
            <SelectItem key={useCase.id} value={useCase.id}>
              {useCase.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        disabled={isLoading || !useCaseId}
        className="w-full"
        onClick={handleContinue}
      >
        Continue
      </Button>
      <p
        className="mt-4 text-xs text-gray-400 duration-300 cursor-pointer hover:text-gray-500"
        onClick={handleErase}
      >
        Erase query
      </p>
    </div>
  );
}

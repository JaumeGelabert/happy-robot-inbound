"use client";

import { getRunByRunIdAction } from "@/app/actions/getRunByRunIdAction";
import ContentWrapper from "@/components/ContentWrapper";
import { RunEvents } from "@/components/runs/RunEvents";
import { DetailedRun } from "@/lib/types";
import { useQueryState } from "nuqs";
import { useEffect, useState, Suspense } from "react";
import { Loader2Icon } from "lucide-react";

function UseCasePageContent() {
  const [runId] = useQueryState("run_id");
  const [run, setRun] = useState<DetailedRun | null>(null);
  /**
   * Again, we should check if the useCaseId and runId are valid and belongs to the authenticated user...
   */

  const getRun = async () => {
    const run = await getRunByRunIdAction(runId!);
    setRun(run);
  };

  useEffect(() => {
    getRun();
  }, []);

  return (
    <ContentWrapper>
      <div className="flex flex-col justify-start items-start gap-2 w-full">
        <div className="flex flex-col justify-start items-start gap-2 w-full">
          <div className="flex flex-row justify-start items-center gap-2">
            <p className="text-sm text-zinc-500">Use Case ID:</p>
            <p className="text-sm text-zinc-700 font-medium">
              {run?.use_case_id}
            </p>
          </div>
          <div className="flex flex-row justify-start items-center gap-2">
            <p className="text-sm text-zinc-500">Run ID:</p>
            <p className="text-sm text-zinc-700 font-medium">{run?.id}</p>
          </div>
          <div className="flex flex-row justify-start items-center gap-2">
            <p className="text-sm text-zinc-500">Version:</p>
            <p className="text-sm text-zinc-700 font-medium">
              {run?.version.version_number}
            </p>
          </div>
          <div className="flex flex-row justify-start items-center gap-2">
            <p className="text-sm text-zinc-500">Status:</p>
            <p className="text-sm text-zinc-700 font-medium">{run?.status}</p>
          </div>
          <div className="flex flex-row justify-start items-center gap-2">
            <p className="text-sm text-zinc-500">Completed at:</p>
            <p className="text-sm text-zinc-700 font-medium">
              {run?.completed_at
                ? new Date(run?.completed_at).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>
        {run && <RunEvents run={run} />}
      </div>
    </ContentWrapper>
  );
}

export default function UseCasePage() {
  return (
    <Suspense
      fallback={
        <ContentWrapper>
          <div className="flex justify-center items-center h-full">
            <Loader2Icon className="w-4 h-4 animate-spin text-zinc-500" />
          </div>
        </ContentWrapper>
      }
    >
      <UseCasePageContent />
    </Suspense>
  );
}

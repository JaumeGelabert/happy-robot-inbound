"use client";

import { getRunByRunIdAction } from "@/app/actions/getRunByRunIdAction";
import ContentWrapper from "@/components/ContentWrapper";
import { Run } from "@/lib/types";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";

export default function UseCasePage() {
  const [runId] = useQueryState("run_id");
  const [run, setRun] = useState<Run | null>(null);
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
      </div>
    </ContentWrapper>
  );
}

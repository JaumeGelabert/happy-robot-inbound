"use client";

import { getRunsByUseCaseIdAction } from "@/app/actions/getRunsByUseCaseIdAction";
import { columns } from "@/components/runs/columns";
import { DataTable } from "@/components/runs/data-table";
import ContentWrapper from "@/components/ContentWrapper";
import { Run } from "@/lib/types";
import { useQueryState } from "nuqs";
import { useTransition, useState, useEffect } from "react";

export default function UseCasePage() {
  const [useCaseId] = useQueryState("use_case_id");
  const [runs, setRuns] = useState<Run[]>([]);
  const [isLoading, startTransition] = useTransition();
  // TODO: Add loading state

  /**
   * We need to check if the use case id is valid and belongs to the authenticated user.
   * If not, we need to redirect to the home page.
   * In case the user manually changes the URL and arrives to this page,
   * we need to check if the query param is set and valid.
   *
   * For the sake of the demo, I will assume a happy path.
   */
  const getRuns = () => {
    startTransition(async () => {
      const data = await getRunsByUseCaseIdAction(useCaseId!);
      setRuns(data);
    });
  };

  useEffect(() => {
    getRuns();
  }, []);

  return (
    <ContentWrapper>
      <p className="text-sm text-gray-700 font-medium">Runs</p>
      <DataTable columns={columns} data={runs} />
    </ContentWrapper>
  );
}

"use client";

import { useQueryState } from "nuqs";
import { Button } from "../ui/button";

export default function EraseQuery() {
  const [, setUseCaseId] = useQueryState("use_case_id");

  const handleErase = () => {
    setUseCaseId(null);
  };

  return (
    <Button variant="link" onClick={handleErase}>
      Erase
    </Button>
  );
}

import SelectUseCase from "@/components/use-cases/SelectUseCase";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="bg-zinc-50 h-dvh flex flex-col items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <SelectUseCase />
      </Suspense>
    </div>
  );
}

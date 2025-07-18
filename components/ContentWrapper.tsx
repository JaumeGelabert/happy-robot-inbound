export default function ContentWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row items-start gap-2 justify-center w-full px-6 py-10 h-dvh">
      <div className="flex flex-col items-start gap-2 justify-center w-full max-w-screen-md">
        {children}
      </div>
    </div>
  );
}

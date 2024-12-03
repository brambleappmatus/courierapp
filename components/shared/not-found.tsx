export function NotFound({ message = "Not Found" }: { message?: string }) {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <h3 className="mt-4 text-lg font-semibold">{message}</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          The requested resource could not be found.
        </p>
      </div>
    </div>
  );
}
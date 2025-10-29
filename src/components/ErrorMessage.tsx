export const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-red-100 text-red-600 text-center my-4 p-3 font-semibold uppercase text-sm rounded-md">
      {children}
    </div>
  );
};

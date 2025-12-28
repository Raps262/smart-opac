export const ErrorMessage = ({
  message = "Terjadi kesalahan saat memuat data.",
}) => {
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <p className="text-red-600 text-center">{message}</p>
    </div>
  );
};

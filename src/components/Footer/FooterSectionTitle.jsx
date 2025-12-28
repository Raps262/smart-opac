export default function FooterSectionTitle({ title, id }) {
  return (
    <h3 id={id} className="text-base font-bold text-white mb-6 flex items-center gap-2">
      <span className="w-1 h-5 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></span>
      {title}
    </h3>
  );
}
export default function InputField({ label, id, placeholder, ...props }) {
  return (
    <div className="mb-4">
      {label && <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>}
      <input
        id={id}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-blue-600 transition-all text-sm bg-white"
        {...props}
      />
    </div>
  );
}

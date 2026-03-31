export default function InputField( { label, type, placeholder } ) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full p-2 border border-gray-300 rounded"
            />
        </div>
    );
}

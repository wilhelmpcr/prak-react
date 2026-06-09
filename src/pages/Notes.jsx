import { useState } from "react";
import { notesAPI } from "../services/notesAPI";

export default function Notes() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [notes, setNotes] = useState([]);

    const [dataForm, setDataForm] = useState({
        title: "",
        content: "",
        status: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;

        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            await notesAPI.createNote(dataForm);

            const newNote = {
                title: dataForm.title,
                content: dataForm.content,
            };

            setNotes((prev) => [...prev, newNote]);

            setSuccess("Catatan berhasil ditambahkan!");

            setDataForm({
                title: "",
                content: "",
                status: "",
            });

            setTimeout(() => {
                setSuccess("");
            }, 3000);

        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

   return (
    <>
        {loading && (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center">
                    <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>

                    <p className="mt-3 text-gray-700 font-medium">
                        Menyimpan data...
                    </p>
                </div>
            </div>
        )}

        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Notes App
            </h2>

            {/* FORM */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Tambah Catatan Baru
                </h3>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        value={dataForm.title}
                        placeholder="Judul catatan"
                        onChange={handleChange}
                        disabled={loading}
                        required
                        className="w-full p-3 border rounded-xl"
                    />

                    <textarea
                        name="content"
                        value={dataForm.content}
                        placeholder="Isi catatan"
                        onChange={handleChange}
                        disabled={loading}
                        required
                        rows="3"
                        className="w-full p-3 border rounded-xl"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-70 flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Menyimpan...
                            </>
                        ) : (
                            "Tambah Data"
                        )}
                    </button>
                </form>
            </div>

            {/* TABEL CATATAN */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Daftar Catatan ({notes.length})
                </h3>

                <div className="overflow-hidden rounded-xl border">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-emerald-600 text-white">
                                <th className="px-4 py-3">#</th>
                                <th className="px-4 py-3 text-left">
                                    Judul
                                </th>
                                <th className="px-4 py-3 text-left">
                                    Isi Catatan
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {notes.length > 0 ? (
                                notes.map((note, index) => (
                                    <tr
                                        key={index}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-3 text-center">
                                            {index + 1}
                                        </td>

                                        <td className="px-4 py-3">
                                            {note.title}
                                        </td>

                                        <td className="px-4 py-3">
                                            {note.content}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="text-center py-6 text-gray-500"
                                    >
                                        Belum ada catatan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
);
}
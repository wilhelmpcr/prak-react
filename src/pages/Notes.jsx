import PagesHeader  from "@/components/PagesHeader";        

import { notesAPI } from "../services/notesAPI"
import { useState } from "react";

export default function Notes() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    
    const [dataForm, setDataForm] = useState({
        title: "", content: "", status: ""
    })

    // Handle perubahan nilai input form
    const handleChange = (evt) => {
        const { name, value } = evt.target
        setDataForm({
            ...dataForm,
            [name]: value,
        })
    }

	return (
		<div className="max-w-2xl mx-auto p-6">
        <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Notes App
            </h2>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Tambah Catatan Baru
            </h3>

            <form className="space-y-4">
                <input
                    type="text"
                    name="title"
                    value={dataForm.title}
                    placeholder="Judul catatan"
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none
                        focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all
                        duration-200"
                />

                <textarea
                    name="content"
                    value={dataForm.content}
                    placeholder="Isi catatan"
                    onChange={handleChange}
                    required
                    rows="2"
                    className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none
                        focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all
                        duration-200 resize-none"
                />

                <button
                    type="submit"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold
                        rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500
                        focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
                        transition-all duration-200 shadow-lg"
                >
                    Tambah Catatan
                </button>
            </form>
        </div>
    </div>
)
}
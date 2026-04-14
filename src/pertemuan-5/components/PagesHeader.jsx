export default function PageHeader() {
    return (
        /* 2. Terapkan layout dan flexbox untuk container utama */
        <div id="pageheader-container" className="flex items-center justify-between p-4">
            
            {/* 3. Styling untuk Sisi Kiri */}
            <div id="pageheader-left" className="flex flex-col">
                <span id="pageheader-title" className="text-3xl font-semibold">
                    Dashboard
                </span>
                <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2">
                    <span id="breadcrumb-home" className="text-gray-500">Dashboard</span>
                    <span id="breadcrumb-separator" className="text-gray-500">/</span>
                    <span id="breadcrumb-current" className="text-gray-500">Order List</span>
                </div>
            </div>

            {/* 4. Styling untuk Sisi Kanan (Tombol) */}
            <div id="action-button">
                <button id="add-button" className="bg-green-600 text-white px-4 py-2 rounded-lg transition-colors hover:bg-green-700">
                    Add Button
                </button>
            </div>
        </div>
    );
}
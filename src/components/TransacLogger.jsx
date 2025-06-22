import { useState } from 'react';
import homeimg from '../assets/homeimg.jpg';
import RecordForm from './RecordForm';

function TransacLogger() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = async (data) => {
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        try {
            const response = await fetch("http://localhost:3000/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                setSubmittedData(result);
                setSuccessMsg("✅ Expense recorded successfully!");
                setIsFormOpen(false);
            } else {
                throw new Error(result.message || "Something went wrong.");
            }
        } catch (err) {
            console.error(err);
            setErrorMsg("❌ Failed to record expense.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto h-[90vh] max-w-7xl bg-[#2ea9b8] p-2">
            <div className="flex justify-between pt-10">
                <div className="mx-auto h-auto bg-[#2ea9b8]">
                    <div>
                        <h1 className="text-4xl font-bold mt-12 text-white">Welcome to Spendly</h1>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mt-4 text-white">Track your spending and stay financially aware.</h2>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mt-[120px] text-white">Record today's transactions</h2>
                        <div className='ml-2 mt-4'>
                            <button
                                className='px-4 py-2 bg-[#fcca3e] font-semibold text-xl text-white rounded-lg w-28 border-4 border-[#e7b01f] shadow hover:bg-yellow-500 transition'
                                onClick={() => setIsFormOpen(true)}
                            >
                                Record
                            </button>

                            {isFormOpen && (
                                <RecordForm
                                    onClose={() => setIsFormOpen(false)}
                                    onSubmit={handleSubmit}
                                    loading={loading}
                                />
                            )}

                            {successMsg && (
                                <div className="mt-4 text-green-100 bg-green-700 px-4 py-2 rounded shadow">{successMsg}</div>
                            )}
                            {errorMsg && (
                                <div className="mt-4 text-red-100 bg-red-600 px-4 py-2 rounded shadow">{errorMsg}</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mx-auto h-auto bg-[#2ea9b8] p-1 flex items-center justify-center">
                    <div className='flex justify-center items-center h-[360px] w-[360px] rounded-full bg-black overflow-hidden border-4'>
                        <img className='w-full h-full object-cover' src={homeimg} alt="img" />
                    </div>
                </div>
            </div>

            <div className='bg-[#2ea9b8]'>
                <h1 className="text-4xl font-bold ml-16 mt-12 text-white">Features</h1>
                <div className='ml-16 flex justify-between mt-4'>
                    <h2 className="text-xl font-bold mt-4 text-white">✅ Log expenses</h2>
                    <h2 className="text-xl font-bold mt-4 text-white">📊 View trends</h2>
                    <h2 className="text-xl font-bold mt-4 text-white">🔒 Safe & secure</h2>
                </div>
            </div>
        </div>
    );
}

export default TransacLogger;

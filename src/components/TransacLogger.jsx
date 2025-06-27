import { useState, useEffect } from 'react';
import homeimg from '../assets/homeimg.jpg';
import RecordForm from './RecordForm';

function TransacLogger() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const [spentToday, setSpentToday] = useState(0);
    const [avgDailySpending, setAvgDailySpending] = useState(0);
    const [monthlySpending, setMonthlySpending] = useState(0);
    const [dominantCategory, setDominantCategory] = useState('—');

    // Auto-hide successMsg after 10 seconds
    useEffect(() => {
        if (successMsg) {
            const timer = setTimeout(() => {
                setSuccessMsg("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMsg]);

    // Auto-hide errorMsg after 10 seconds
    useEffect(() => {
        if (errorMsg) {
            const timer = setTimeout(() => {
                setErrorMsg("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errorMsg]);


    useEffect(() => {
        fetch("http://localhost:3000/home/spent-today")
            .then(res => res.json())
            .then(data => setSpentToday(data.total || 0));

        fetch("http://localhost:3000/home/average-daily")
            .then(res => res.json())
            .then(data => setAvgDailySpending(data.average || 0));

        fetch("http://localhost:3000/home/monthly-total")
            .then(res => res.json())
            .then(data => setMonthlySpending(data.total || 0));

        fetch("http://localhost:3000/home/dominant-category")
            .then(res => res.json())
            .then(data => setDominantCategory(data.category || '—'));
    }, []);

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
        <div className="mx-auto h-[90vh] max-w-7xl bg-spendly-gray p-2">
            <div className='flex flex-col mt-10'>
                <div className='font-semibold text-5xl text-black mb-3'><p>Welcome to Spendly</p></div>
                <div className='text-2xl text-black'><p>Track your spending and stay financially aware</p></div>
            </div>

            <div className='grid grid-rows-4 grid-flow-row grid-cols-2 border-spendly-yellow border-2 rounded-3xl p-6 mt-14 max-w-7xl h-80 mx-auto gap-x-8 gap-y-4'>
                <div className='font-medium text-4xl text-black flex justify-start'><p>Spent Today</p></div>
                <div className='font-bold text-4xl text-black flex justify-end'><p>₹{spentToday}</p></div>
                <div className='font-medium text-4xl text-black flex justify-start'><p>Average Spending(Daily)</p></div>
                <div className='font-bold text-4xl text-black flex justify-end'><p>₹{avgDailySpending}</p></div>
                <div className='font-medium text-4xl text-black flex justify-start'><p>Spending this Month</p></div>
                <div className='font-bold text-4xl text-black flex justify-end'><p>₹{monthlySpending}</p></div>
                <div className='font-medium text-4xl text-black flex justify-start'><p>Dominant Category</p></div>
                <div className='font-bold text-4xl text-black flex justify-end'><p>{dominantCategory}</p></div>
            </div>

            <button
                className="flex items-center justify-center w-14 h-14 bg-spendly-yellow rounded-full absolute bottom-5 right-8 md:right-16 lg:right-24 shadow-lg hover:bg-yellow-500 transition z-50"
                onClick={() => setIsFormOpen(true)}
                aria-label="Add new record"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-spendly-gray" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {isFormOpen && (
                <RecordForm
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleSubmit}
                    loading={loading}
                />
            )}

            {/* Success Message Popup */}
            {successMsg && (
                <div className="fixed bottom-24 right-6 md:right-16 lg:right-24 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-500 ease-in-out">
                    {successMsg}
                </div>
            )}

            {/* Error Message Popup */}
            {errorMsg && (
                <div className="fixed bottom-24 right-6 md:right-16 lg:right-24 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-500 ease-in-out">
                    {errorMsg}
                </div>
            )}

        </div>
    );
}

export default TransacLogger;

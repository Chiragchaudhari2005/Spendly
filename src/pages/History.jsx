// 📁 src/pages/History.jsx
import { useEffect, useState } from 'react';

function History() {
    const [transactions, setTransactions] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');

    const filterOptions = ['All', 'Daily', 'Weekly', 'Monthly', 'Yearly'];

    const fetchFilteredTransactions = async (filter) => {
        let endpoint = 'http://localhost:3000/get-expenses'; // Default (All)

        switch (filter) {
            case 'Daily':
                endpoint = 'http://localhost:3000/history/daily';
                break;
            case 'Weekly':
                endpoint = 'http://localhost:3000/history/weekly';
                break;
            case 'Monthly':
                endpoint = 'http://localhost:3000/history/monthly';
                break;
            case 'Yearly':
                endpoint = 'http://localhost:3000/history/yearly';
                break;
            default:
                endpoint = 'http://localhost:3000/get-expenses';
        }

        try {
            const res = await fetch(endpoint);
            const data = await res.json();

            const formatted = data.map((tx) => {
                const rawTimestamp = tx.timestamp?.value || tx.timestamp;
                const ts = new Date(rawTimestamp);

                return {
                    date: ts.toLocaleDateString() || 'Invalid Date',
                    time: ts.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || 'Invalid Time',
                    category: tx.category || 'Uncategorized',
                    amount: `₹${tx.amount}` || '₹0',
                    note: tx.note || '',
                };
            });

            setTransactions(formatted);
        } catch (err) {
            console.error("❌ Failed to fetch filtered data:", err);
        }
    };

    useEffect(() => {
        fetchFilteredTransactions(activeFilter);
    }, [activeFilter]);

    const handleFilter = (filter) => {
        setActiveFilter(filter);
        setFilterOpen(false);
    };

    return (
        <div className="flex flex-col h-screen max-w-7xl mx-auto p-6 bg-spendly-gray">
            <div className="flex flex-col h-[35vw] w-[60vw] max-w-7xl mt-16 mx-auto p-6 bg-white rounded-lg shadow">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-black">Spending History</h1>
                    <div className="relative">
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            className="px-4 py-2 bg-spendly-yellow text-black font-medium rounded-lg hover:bg-yellow-500 transition flex items-center"
                        >
                            Filter
                            <svg className={`ml-2 w-4 h-4 ${filterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {filterOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                <div className="py-1">
                                    {filterOptions.map(option => (
                                        <button
                                            key={option}
                                            onClick={() => handleFilter(option)}
                                            className={`block w-full text-left px-4 py-2 text-sm ${activeFilter === option
                                                ? 'bg-spendly-yellow text-black'
                                                : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {activeFilter !== 'All' && (
                    <div className="mb-4 text-sm text-gray-600">
                        Showing: {activeFilter} transactions
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Note</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {transactions.map((tx, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 text-sm text-gray-900">{tx.date}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{tx.time}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{tx.category}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{tx.amount}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{tx.note}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default History;

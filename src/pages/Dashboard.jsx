import React, { useEffect, useState } from "react";
import ChartTabs from "../components/ChartTabs";
import DailyExpensesChart from "../components/DailyExpensesChart";
import WeeklyExpensesChart from "../components/WeeklyExpensesChart";

function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/get-expenses")
            .then((res) => res.json())
            .then((data) => {
                setExpenses(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, []);

    return (
        // <div className="p-8 min-h-screen bg-gray-100 text-gray-800 mx-auto max-w-7xl">
        //     {/* <h1 className="text-4xl font-bold mb-6 text-center text-[#2ea9b8]">📊 Spendly Dashboard</h1>

        //     {loading ? (
        //         <p className="text-xl text-center">Loading expenses...</p>
        //     ) : expenses.length === 0 ? (
        //         <p className="text-xl text-center">No expenses found.</p>
        //     ) : (
        //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        //             {expenses.map((expense) => (
        //                 <div
        //                     key={expense.id}
        //                     className="bg-white shadow-md rounded-lg p-4 border-l-4 border-yellow-400"
        //                 >
        //                     <h2 className="text-xl font-semibold text-[#2ea9b8]">{expense.category}</h2>
        //                     <p className="text-gray-700 mt-2">💰 Amount: ₹{expense.amount}</p>
        //                     <p className="text-gray-700">📝 Note: {expense.note || "—"}</p>
        //                     <p className="text-sm text-gray-500 mt-2">
        //                         ⏰ {new Date(expense.timestamp).toLocaleString("en-IN", {
        //                             dateStyle: "medium",
        //                             timeStyle: "short",
        //                         })}
        //                     </p>
        //                 </div>
        //             ))}
        //         </div>
        //     )} */}
        //     <ChartTabs/>
        // </div>
        <div className="mt-16 bg-spendly-gray h-screen max-w-7xl mx-auto ">
            {/* <div className="flex border-black">
                <div className="border-spendly-yellow w-[640px] h-52">
                    <DailyExpensesChart/>
                </div>
                <div className="border-spendly-yellow w-[640px]">
                    <WeeklyExpensesChart/>
                </div>
            </div> */}
            <ChartTabs/>
        </div>
    );
}

export default Dashboard;

import { useState } from 'react';
import DateDisplay from './DateDisplay';
import TimeDisplay from './TimeDisplay';

const RecordForm = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        category: 'food',
        amount: '',
        notes: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare payload
        const dataToSend = {
            date: new Date().toISOString().split('T')[0], // e.g. 2025-06-22
            time: new Date().toLocaleTimeString(),         // e.g. 3:20:12 PM
            category: formData.category,
            amount: parseFloat(formData.amount),
            notes: formData.notes
        };

        // Call parent handler
        onSubmit(dataToSend);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg w-[30vw] h-[72vh]"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-black">Record Expense</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-4xl"
                    >
                        &times;
                    </button>
                </div>

                <div className="flex-col text-black text-xl font-medium">
                    <div className='m-4'><DateDisplay /></div>
                    <div className='m-4'><TimeDisplay /></div>

                    <div className='m-4'>
                        <span>Category: </span>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className='bg-white border-2 border-black rounded-md w-64'
                        >
                            <option value="food">Food</option>
                            <option value="travel">Travel</option>
                            <option value="shopping">Shopping</option>
                            <option value="lent">Lent</option>
                        </select>
                    </div>

                    <div className='m-4'>
                        <span>Amount: </span>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            min="0"
                            required
                            className='bg-white border-2 border-black rounded-md w-64 ml-2'
                        />
                    </div>

                    <div className='mr-4 ml-4'>
                        <span>Note: </span>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows={4}
                            cols={30}
                            maxLength={100}
                            className='bg-white border-2 border-black rounded-md w-[348px]'
                        ></textarea>
                    </div>

                    <div className='flex justify-center'>
                        <button
                            type="submit"
                            className='mt-4 px-4 py-2 bg-[#fcca3e] text-white rounded-lg h-12 border-4 border-[#e7b01f] shadow hover:bg-yellow-500 transition'
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RecordForm;

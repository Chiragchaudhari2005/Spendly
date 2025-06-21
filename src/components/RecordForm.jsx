import DateDisplay from './DateDisplay';
import TimeDisplay from './TimeDisplay';

const RecordForm = ({ onClose, onSubmit }) => {
    // const [formData,setFormData] = useState({});

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[24vw] h-[54vh]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-black">Record Expense</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        &times;
                    </button>
                </div>
                <div className="flex-col text-black text-xl font-medium">
                    <div className='m-4'><DateDisplay /></div>
                    <div className='m-4'><TimeDisplay /></div>
                    <div className='m-4'>
                        <span>Category: </span>
                        <select name="category" id="category" className='bg-white border-2 border-black rounded-md w-64'>
                            <option value="food">Food</option>
                            <option value="travel">Travel</option>
                            <option value="shopping">Shopping</option>
                            <option value="lent">Lent</option>
                        </select>
                    </div>
                    <div className='m-4 '>
                        <span>Amount: </span> <input type="number" name="amt" id="amt" min="0" className='bg-white border-2 border-black rounded-md w-64 ml-2'/>
                    </div>
                    <div className='mr-4 ml-4'>
                        <span>Note: </span> <textarea name='txtArea' rows={4} cols={30} maxLength={100} className='bg-white border-2 border-black rounded-md w-[348px]'></textarea>
                    </div>
                    <div className='flex justify-center'>
                        <button type='submit' className=' mt-1 px-4 py-2 bg-[#fcca3e] text-white rounded-lg h-12 border-4 border-[#e7b01f] shadow hover:bg-yellow-500 transition'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecordForm;
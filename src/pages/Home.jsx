import Navbar from '../components/Navbar';
import TransacLogger from '../components/TransacLogger';
import Dashboard from './Dashboard';
import '../index.css';

function Home() {

  return (
    <div className='h-screen w-screen flex flex-col bg-spendly-gray'>
      <Navbar />
      <div className='flex-grow pt-16 w-[100%] bg-spendly-gray'>
        <TransacLogger />
      </div>
    </div>

  )
}

export default Home;
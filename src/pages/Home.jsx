import Navbar from '../components/Navbar';
import TransacLogger from '../components/TransacLogger';

function Home() {

  return (
    <div className='h-screen w-screen flex flex-col bg-[#2ea9b8]'>
      <Navbar />
      <div className='flex-grow pt-16 bg-[#2ea9b8]'>
        <TransacLogger />
      </div>
    </div>
  )
}

export default Home;
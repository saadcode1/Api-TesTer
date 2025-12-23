import { useEffect, useState } from 'react'
import './App.css';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import RequestForm from './components/RequestForm';

function App() {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);


  return (
      <>
      {showLoader ? (
        <Loader />
      ) : (
        <>
        <Navbar />
        <RequestForm />
        </>
      )}
    </>
    
  )
}

export default App

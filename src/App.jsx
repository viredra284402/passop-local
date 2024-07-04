import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {


  return (
    <>
    <Navbar/>
    <div className='min-h-[74.9vh]'>

    <Manager/>
    </div>
    <Footer/>
    </>
  )
}

export default App

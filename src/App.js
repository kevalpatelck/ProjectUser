import Homepage from './components/Homepage';
import Properties from './components/Properties';
import Singleproperty from './components/Singleproperty';
import Contact from './components/Contact';
import{BrowserRouter,Route,Routes} from 'react-router-dom';

import Footer from './components/Footer';
import Subhed from './components/Subhed';

function App() {
  return (
    <div >
      {/* <Homepage/> */}
      {/* <Properties/> */}
      {/* <Mainbanner/> */}
      {/* <Singleproperty/> */}
      {/* <Contact/> */}

      <BrowserRouter>
<Subhed/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contact" element={< Contact/>} />
        <Route path="/properties" element={< Properties/>} />
        <Route path="/properties/:id" element={< Singleproperty/>} />
      


      </Routes>
  <Footer/>

    </BrowserRouter>

 {/* <Header/> */}


    
    {/* <Adminpannel/> */}



    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Adminpannel />}>
          <Route path="dash" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
          <Route path="addturf" element={<AddTurfForm />} />
          <Route path="manageturf" element={<ManageTurfs />} />
          <Route path="manageBookings" element={<ManageBookings/>} />
          <Route path="viewbookings" element={<ViewBookings />} />


        </Route>
      </Routes>
    </BrowserRouter> */}
    </div>
  );
}



  
export default App;

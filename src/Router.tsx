import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingComponent from './components/Landing/LandingComponent';
import ServiceComponent from './components/Service/ServiceComponent';
import ServiceDetailComponent from './components/ServiceDetail/ServiceDetailComponent';
import LoginComponent from './components/Login/LoginComponent';
import FeedBackComponent from './components/FeedBack/FeedBackComponent';


export function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingComponent />} />
        <Route path='ourservice' element={<ServiceComponent />} />
        <Route path='service/:serviceId' element={<ServiceDetailComponent />} />
        <Route path='admin/login' element={<LoginComponent />} />
        <Route path='feedback' element={<FeedBackComponent />} />
      </Routes>
    </BrowserRouter>
  )
};

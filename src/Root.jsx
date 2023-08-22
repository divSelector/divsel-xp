import Desktop from './components/Desktop';
import Welcome from './components/Welcome';
import Loading from './components/Loading';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Assets from './components/Assets';

export default function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/xp" element={
          <Loading action="welcome" />
        } />
        <Route path="/xp/welcome" element={
          <Welcome msg="welcome" />
        } />
        <Route path="/xp/desktop" element={
          <Desktop />
        } />
        <Route path="/xp/gameover" element={
          <Welcome msg="gameover" />
        } />
        <Route path="/xp/loading" element={
          <Loading action="desktop" />
        } />
        
        {/* <Route path="/xp/assets" element={
          <Assets />
        } /> */}

      </Routes>
    </BrowserRouter>

  );
}
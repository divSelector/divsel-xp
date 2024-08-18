import Desktop from './components/Desktop';
import Welcome from './components/Welcome';
import Loading from './components/Loading';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ScenarioProvider } from './context/scenario';

export default function Root() {
  return (
    <BrowserRouter>
      <ScenarioProvider>
        <Routes>
          <Route path="/" element={
            <Loading action="welcome" />
          } />
          <Route path="/welcome" element={
            <Welcome msg="welcome" />
          } />
          <Route path="/desktop" element={
            <Desktop />
          } />
          <Route path="/gameover" element={
            <Welcome msg="gameover" />
          } />
          <Route path="/loading" element={
            <Loading action="desktop" />
          } />

        </Routes>
      </ScenarioProvider>
    </BrowserRouter>

  );
}
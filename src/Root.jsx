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

        </Routes>
      </ScenarioProvider>
    </BrowserRouter>

  );
}
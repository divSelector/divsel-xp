import Desktop from './components/Desktop';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" Component={Desktop} />
      </Routes>
    </BrowserRouter>

  );
}
import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.jsx'
import './style/desktop.css';
import './style/welcome.css';
import './style/loading.css';
import "xp.css/dist/XP.css";
import { backgroundImages } from './assets/manifest.jsx';

function preload(imageUrls, callback) {
  let loadedImages = 0;

  imageUrls.forEach(url => {
    console.log(url)
    const img = document.createElement('img');
    img.style.display = 'none';
    img.src = url
    

    img.onload = () => {
      loadedImages++;
      document.body.removeChild(img);

      if (loadedImages === imageUrls.length) {
        callback();
      }
    };

    document.body.appendChild(img);
  });
}

preload(backgroundImages, () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
  )
});


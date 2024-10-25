import React, {useEffect} from "react";
import Desktop from "../components/Desktop";
import '../styles/styleDesktop.css';

function HomePage() {

  useEffect(() => {
    document.documentElement.className = 'home-page-html';
    document.body.className = 'home-page-body';
    
    return () => {
      document.documentElement.className = '';
      document.body.className = '';
    };
  }, []);

  return (
      <div className="App">
        <Desktop />
      </div>
    );
  }

export default HomePage;

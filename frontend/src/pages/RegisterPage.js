import React, {useEffect} from "react";
import RegisterWindow from "../components/RegisterWindow";
import '../styles/style.css';

function RegisterPage() {
    useEffect(() => {
        document.body.className = 'register-page-body';
    
        return () => {
          document.documentElement.className = '';
          document.body.className = '';
        };
      }, []);

    return (
      <div>
        <RegisterWindow />
      </div>
    );
}
  
export default RegisterPage;
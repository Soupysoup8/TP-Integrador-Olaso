import React, { useEffect } from 'react';
import WindowComponent from '../components/LoginWindowsComponent';
import '../styles/style.css';

function LoginPage() {
  useEffect(() => {
    document.body.className = 'login-page-body';

    return () => {
      document.documentElement.className = '';
      document.body.className = '';
    };
  }, []);

  return (
    <div>
      <WindowComponent />
    </div>
  );
}

export default LoginPage;

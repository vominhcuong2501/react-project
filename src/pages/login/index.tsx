import { MainLayout } from '@components/compound';
import LoginForm from '@containers/Login/LoginForm';
import style from '@scss/pages/login/login.scss';
import { useState } from 'react';

export default function Login() {
  const [user, setUser] = useState(null);
  const handleLoginFormSubmit = (values) => {
    setUser(values);
  };

  return (
    <>
      <style jsx>{style}</style>
      <div>
        <LoginForm onSubmit={handleLoginFormSubmit}></LoginForm>
      </div>
      <div>Data Submit: {user ? JSON.stringify(user) : 'null'}</div>
    </>
  );
}

Login.Layout = MainLayout;

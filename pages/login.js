import React, {useState} from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Logo from './img/logo.png';
import api from '../api/api';
import "./page-styles.css";

const LoginPage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPass, setShowPass] = useState(false);

  const onSubmit = (data) => {
    api.post('/auth/signin', data).then(response => {
      if (response.status === 200) {
        console.log('Login bem-sucedido:', response.data);
        // Cookie expira em 32 dias
        Cookies.set('wlt-token', response.data.token, { expires: 32 });

        router.push('/items');
      } else {
        console.error('Erro no login:', response.statusText);
      }
    }).catch(error => console.error('Erro na requisição:', error));
  };

  return (
    <>
    <Head>
      <title>Mini Wallet On - Login</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)}>
      <Image src={Logo} alt="Mini Wallet Online Logo" className='login-logo'/>
        <h2>Login</h2>
        <div className="input-group">
          <label>Usuário</label>
          <input 
            type="text" 
            {...register('login', { required: 'Login é obrigatório' })} 
            />
          {errors.login && <p className="error">{errors.login.message}</p>}
        </div>
        <div className="input-group">
          <label>Senha</label>
          <input 
            type={showPass === true ? 'text' : 'password'}
            {...register('password', { required: 'Senha é obrigatória' })} 
            />
          {errors.password && <p className="error">{errors.password.message}</p>}
          <small onClick={() => setShowPass(!showPass)}>
            {showPass === true ? '🙈 Esconda a senha' : '👁️ Mostre a senha'}</small>
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
    </>
  );
};

export default LoginPage;


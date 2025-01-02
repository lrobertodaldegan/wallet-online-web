import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import api from '../api/api';
import './page-styles.css';

const RegisterPage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    api.post('/auth/signup', data).then(response => {
      if (response.status === 201) {
        router.push('/login');
      } else {
        console.error('Erro no cadastro:', response.statusText);
      }
    }).catch(error => console.error('Erro na requisição:', error));
  };

  return (
    <>
    <Head>
      <title>Mini Wallet On - Registro</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <div className="register-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label>Login</label>
          <input 
            type="text" 
            {...register('login', { required: 'Login é obrigatório' })} 
          />
          {errors.login && <p className="error">{errors.login.message}</p>}
        </div>
        <div className="input-group">
          <label>Email</label>
          <input 
            type="email" 
            {...register('email', { required: 'Email é obrigatório' })} 
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="input-group">
          <label>Senha</label>
          <input 
            type="password" 
            {...register('password', { required: 'Senha é obrigatória' })} 
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
    </>
  );
};

export default RegisterPage;

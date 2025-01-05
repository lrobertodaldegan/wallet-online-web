import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Logo from './img/logo.png';
import api from '../api/api';
import './page-styles.css';

const Months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
const YearsB = Array.from(new Array(2), (_, index) => ((new Date().getFullYear() - (index+1)).toString()));
const YearsF = Array.from(new Array(3), (_, index) => ((new Date().getFullYear() + index).toString()));
const Years = [...YearsB, ...YearsF].sort();

const Types = ['Entrada (creditou)', 'Saída (debitou)'];
const Cats = ['Cartão de Crédito', 'Seguro automotivo', 'Seguro imobiliário', 'Combustível', 'Alimentação', 'Lazer', 'Imposto', 'Conta', 'Financiamento de automóvel', 'Financiamento de imóvel', 'Roupas', 'Manutenção de automóvel', 'Manutenção de imóvel', 'Empréstimo', 'Salário', 'Outros'].sort();
const Recs = ['Mensal', 'Eventual'];

const AddItemPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  // Verificar se o usuário está autenticado
  React.useEffect(() => {
    const token = Cookies.get('wlt-token');
    if (!token) {
      router.push('login');
    }
  }, [router]);

  const onSubmit = (data) => {
    const token = Cookies.get('wlt-token');

    api.post('/item', data, {
      headers: {
        'Authorization': `${token}`,
      }
    }).then(response => {
      if (response.status === 201) {
        console.log('Item cadastrado com sucesso:', response.data);
        // Redirecionar para a página de listagem de itens ou mostrar uma mensagem de sucesso
        router.push('items');
      } else {
        console.error('Erro no cadastro do item:', response.statusText);
      }
    }).catch(error => console.error('Erro na requisição:', error));
  };

  const validateCurrency = value => {
    const regex = /^\d+(\.\d{1,2})?$/;
    return regex.test(value) || "Digite um valor de moeda válido";
  };

  return (
    <>
    <Head>
      <title>Mini Wallet On - Novo item</title>
      <link rel="icon" type="image/png" href="/favicon.png"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <div className="add-item-container">
      <div className='add-item-header'>
        <h2>Novo Item</h2>
        <Image src={Logo} alt='Mini Wallet On Logo'/>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label>Descrição</label>
          <input 
            type="text" 
            placeholder='Conta de luz'
            {...register('desc', { required: 'Descrição é obrigatório' })} 
          />
          {errors.desc && <p className="error">{errors.desc.message}</p>}
        </div>
        <div className="input-group">
          <label>Valor</label>
          <input 
            type="number" 
            placeholder='100.00'
            {...register('val', { required: 'Valor é obrigatório e deve ter formato numérico: 1234.12', validate: validateCurrency})} 
          />
          {errors.val && <p className="error">{errors.val.message}</p>}
        </div>
        <div className="input-group">
          <label>Tipo</label>
          <br/>
          <select {...register('type', { required: 'Tipo é obrigatório' })}>
            <option value="">Selecione o tipo</option>
            {Types.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.type && <p className="error">{errors.type.message}</p>}
        </div>
        <div className="input-group">
          <label>Categoria</label>
          <br/>
          <select {...register('cat', { required: 'Categoria é obrigatória' })}>
            <option value="">Selecione uma categoria</option>
            {Cats.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.cat && <p className="error">{errors.cat.message}</p>}
        </div>
        <div className='period'>
          <div className="input-group">
            <label>Mês</label>
            <br/>
            <select {...register('month', { required: 'Mês é obrigatório' })}>
              <option value="">Selecione um mês</option>
              {Months.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            {errors.month && <p className="error">{errors.month.message}</p>}
          </div>
          <div className="input-group">
            <label>Ano</label>
            <br/>
            <select {...register('year', { required: 'Ano é obrigatório' })}>
              <option value="">Selecione um ano</option>
              {Years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            {errors.year && <p className="error">{errors.year.message}</p>}
          </div>
        </div>
        <div className="input-group">
          <label>Recorrência</label>
          <br/>
          <select {...register('rec', { required: 'Recorrência é obrigatória' })}>
            <option value="">Selecione uma categoria</option>
            {Recs.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          {errors.rec && <p className="error">{errors.rec.message}</p>}
        </div>
        <button type="submit">Salvar</button>
        <button type="reset" onClick={() => router.back()}>Voltar</button>
      </form>
    </div>
    </>
  );
};

export default AddItemPage;

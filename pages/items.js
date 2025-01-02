import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import api from '../api/api';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Logo from './img/logo.png';
import './page-styles.css';

const Months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
const YearsB = Array.from(new Array(2), (_, index) => ((new Date().getFullYear() - (index+1)).toString()));
const YearsF = Array.from(new Array(3), (_, index) => ((new Date().getFullYear() + index).toString()));
const Years = [...YearsB, ...YearsF].sort();

const ItemsPage = () => {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);

  useEffect(() => {
    const token = Cookies.get('wlt-token');

    if (!token) {
      router.push('/login');

      return;
    }

    fetchItems();
  }, [router]);

  useEffect(() => {
    setMonth(Months[(new Date().getMonth())]);
    setYear((new Date().getFullYear()));
  }, []);

  useEffect(() => {
    fetchItems();
  }, [month, year]);

  const fetchItems = () => {
    const token = Cookies.get('wlt-token');

    api.get(`/item?month=${month}&year=${year}`, {
      headers: {
        'Authorization': `${token}`,
      }
    }).then(response => {
      setItems(response.data);
    }).catch(error => console.error('Erro ao buscar itens:', error));
  };

  const handleMarkItem = (item) => {
    const token = Cookies.get('wlt-token');

    api.put(item.paid === true ? `/item/unpay` : `/item/pay`, {id:item._id}, {
      headers: {
        'Authorization': `${token}`,
      }
    }).catch(error => console.error('Erro ao marcar ou desmarcar item:', error));

    setItems(items.map(i =>
      i._id === item._id ? { ...i, paid: !item.paid } : i
    ));
  };

  const handleDelItem = (item) => {
    const token = Cookies.get('wlt-token');

    api.delete(`/item?id=${item._id}`, {
      headers: {
        'Authorization': `${token}`,
      }
    }).catch(error => console.error('Erro ao deletar item:', error));

    setItems(items.filter(i => i._id !== item._id));
  };

  const handleMonthChange = (event) => {
    let val = event.target.value;

    if(Months.includes(val))
      setMonth(val);
  };

  const handleYearChange = (event) => {
    let val = event.target.value;

    if(Years.includes(val))
      setYear(val);
  };

  const formatValues = (val) => {
    const f = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2 
    });

    return f.format(val);
  };

  const renderTypeTag = (type) => {
    if(type && type.includes('debit')){
      return (<span className='tags tags-d'>📉 {type}</span>);
    } else {
      return (<span className='tags tags-c'>📈 {type}</span>);
    }
  };

  const renderPayTag = (item) => {
    if(item.paid && item.paid === true){
      return (<span className='tags tags-unp' onClick={() => handleMarkItem(item)}>↩️ Desfazer</span>);
    } else {
      return (<span className='tags tags-pay' onClick={() => handleMarkItem(item)}>✅ Pagar</span>);
    }
  };

  const renderItemDate = (item) => {
    if(item.rec && item.rec.includes('Mensal')){
      return <></>;
    }

    return (
      <span className='tags tags-a'>📅 {item.month}/{item.year}</span>
    );
  };

  return (
    <>
    <Head>
      <title>Mini Wallet On - Itens</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <div className="items-container">
      <Image src={Logo} alt="Mini Wallet Online Logo" className='login-logo'/>
      <div className="items-header">
        <h2>Lista de Itens</h2>
        <button onClick={() => router.push('/add-item')}>Adicionar item</button>
      </div>
      <div className="items-filter">
        <p>Filtro:</p>
        <select onChange={handleMonthChange}>
          <option value={month}>{month}</option>
          {Months.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <select onChange={handleYearChange}>
          <option value={year}>{year}</option>
          {Years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {items.map(item => (
        <div key={item._id} className="item">
          <div className='item-header'>
            <h3>{item.desc} {`${item.paid === true ? '(✅ pago)' : ''}`}</h3>
            <h4 className={item.type.includes('debit') ? 'val-n' : 'val-p'}>
              {formatValues(item.val)}
            </h4>
          </div>
          <div className='item-tags'>
            {renderPayTag(item)}

            {renderTypeTag(item.type)}

            {renderItemDate(item)}
            
            <span className='tags tags-a'>🗂️ {item.cat}</span>
            <span className='tags tags-a'>🔁 {item.rec}</span>
            <span className='tags tags-del' onClick={() => handleDelItem(item)}>
              🗑️ Excluir
            </span>
          </div>
          <hr/>
        </div>
      ))}
    </div>
  </>
  );
};

export default ItemsPage;

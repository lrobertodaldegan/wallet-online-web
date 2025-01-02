'use client'

import React, { useEffect } from 'react';
import "./page.css";
import Image from 'next/image';
import Logo from './logo.png';

export default function Home() {

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      });
      
      document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
      });
    }
  }, []);

  return (
    <div className="about-container">
      <header className="header">
        <section className="options">
          <ul>
            <li>
              <a href="/login"><b>Entrar</b></a>
            </li>
            <li>
              <a blank="_blank" href="/register">Cadastro</a>
            </li>
            <li>
              <a target="_blank" href="#">Baixar no Google Play</a>
            </li>
          </ul>
        </section>
        <Image src={Logo} alt="Mini Wallet Online Logo"/>
        <h1>Bem-vindo ao <span className="highlight">Mini Wallet On</span>!</h1>
      </header>
      <main className="content">
        <section className="animate-on-scroll">
          <p>Gerencie suas finanças com facilidade, simplicidade e eficiência usando o <span className="highlight">Mini Wallet On</span>, o app gratuito de controle de despesas projetado para tornar sua vida financeira mais organizada e tranquila.</p>
        </section>
        <section className="animate-on-scroll">
          <h2>🌐 Dados Online</h2>
          <p>Acesse suas informações financeiras de qualquer lugar, a qualquer hora. Agora nosso app é online, você tem a conveniência e a segurança que precisa para acompanhar suas finanças em tempo real.</p>
        </section>
        <section className="animate-on-scroll">
          <h2>📊 Cadastro e Listagem de Despesas e Recebimentos</h2>
          <p>Registre todas as suas despesas e recebimentos de forma rápida e intuitiva. Nosso app permite a listagem detalhada para que você nunca perca de vista suas transações.</p>
        </section>
        <section className="animate-on-scroll">
          <h2>📈 Cálculo Automático de Saldo Mensal</h2>
          <p>Deixe os cálculos com a gente! Nosso sistema calcula automaticamente o seu saldo mensal, permitindo que você veja facilmente quanto entrou, saiu w quanto vai sobrar do seu orçamento.</p>
        </section>
        <section className="animate-on-scroll">
          <h2>✅ Controle dos Itens Pagos e a Pagar</h2>
          <p>Mantenha-se no controle total dos seus compromissos financeiros. Marque itens como pagos ou a pagar, e acompanhe suas pendências com facilidade.</p>
        </section>
        <section className="animate-on-scroll">
          <p>Transforme a maneira como você gerencia suas finanças pessoais gratuitamente com o <span className="highlight">Mini Wallet On</span>. Comece hoje e descubra uma nova forma de controlar seu dinheiro! 🚀</p>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Lucas Roberto Desenvolvimento. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}


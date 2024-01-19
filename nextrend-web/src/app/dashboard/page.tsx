"use client"
import { useEffect } from 'react';
import styles from '../../sass/dashboard.module.sass'

const DashboardPage = () => {
  useEffect(() => {
    // Coloca aquí el código de embebido proporcionado por Power BI
    const embedCode = '<iframe title="Report Section" width="1200" height="750" src="https://app.powerbi.com/view?r=eyJrIjoiYzNlYjhlYjktZDA4Yy00OWFlLWJmODgtZjY0Yzc2ODg1ODY1IiwidCI6ImZkNjljZTFiLTIwYzYtNDJlYy1iNTRlLTZkMWIzODcwYWM2ZSIsImMiOjR9" frameborder="0" allowFullScreen="true"></iframe>';

    // Encuentra el contenedor en tu página (puede ser un div con un id específico)
    const container = document.getElementById('powerBiContainer');

    // Inserta el código de embebido en el contenedor
    if (container) {
      container.innerHTML = embedCode;
    }

    // Asegúrate de limpiar cuando el componente se desmonta
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

  return (
    <section className={styles.Dashboard}>
        <h1>FRIENDS & BUBBLES</h1>

        <div className={styles.dashboardContainer}><p>Frindes  & Bubbles es uno de nuestros proyectos predilectos en el que hemos sabido poner nuestros mejores esfuerzos para darte a conocer todo lo que necesitas saber respecto al negocio de Bares en una de las regiones turísticas y con mas activa vida nocturna de la costa de Florida, Tampa Bay </p></div>
        
        <div className={styles.dashboardContainer}>
       
        <div id="powerBiContainer" ></div>
        </div>
        
    </section>
  );
};

export default DashboardPage;

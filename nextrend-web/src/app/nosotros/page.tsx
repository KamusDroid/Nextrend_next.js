import React from 'react';
import { useState } from 'react';
import styles from '../../components/Home/Description/Description.module.sass';
import Image from 'next/image';
import classNames from 'classnames/bind';
import Linkbutton from '../../components/Linkbutton';
import Link from 'next/link';


const Nosotros: React.FC = () => {
  return (
    <section className={styles.Description}>
        <main>
         <div className={styles.Description__imageContainer}>
              <Image
                  src="/images/Guido.jpg"
                  alt="Guido"                  
                  fill
              />
          </div><div><Link href="https://www.linkedin.com/in/guido-lujan/" /></div>
          <div className={styles.Description__imageContainer}>
              <Image
                  src="/images/Hans.jfif"
                  alt="Hans"                  
                  fill
              />
          </div><div><Link href="https://www.linkedin.com/in/hans-pulido001/" /></div>
          <div className={styles.Description__imageContainer}>
              <Image
                  src="/images/ger.jpeg"
                  alt="GER"                  
                  fill
              />
          </div><div>< Link href="https://www.linkedin.com/in/gerardocor175/" /></div>
          <div className={styles.Description__imageContainer}>
              <Image
                  src="/images/may.jpeg"
                  alt="MAY"                  
                  fill
              />
          </div><div><Link href="https://www.linkedin.com/in/mayrasierraat/" /></div>
          <div className={styles.Description__imageContainer}>
              <Image
                  src="/images/matias.jpg"
                  alt="MATIAS"                  
                  fill
              />
          </div><div><Link href="https://www.linkedin.com/in/sumakorama/" /></div>
       
      </main>
    </section>
  );
};

export default Nosotros;

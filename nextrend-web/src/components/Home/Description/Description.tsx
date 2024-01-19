"use client"
import { useState } from 'react';
import styles from './Description.module.sass';
import Image from 'next/image';
import classNames from 'classnames/bind';



export const Description = () => {
    const [hasBorder, setBorder] = useState(false);

    const handleClick = () => setBorder(!hasBorder);

    const cx = classNames.bind(styles);

    const buttonStyles = cx('Description__button', {'Description__button--border': hasBorder});

    return (
      <section className={styles.Description}>
        <button onClick={handleClick} className={buttonStyles}>
          <div className={styles.Description__imageContainer}>
              <Image
                  src="/images/flyer.jpg"
                  alt="Logo Nextrend"
                  fill
              />
          </div>
        </button>
        <div className={styles.Description__text}>
          <p>Nuestro equipo de Data Science trabaja arduamente en la realización de diversas clases de Proyectos atrapantes, con los cuales puedan ayudarte a cumplir tus metas, a travez de conocimientos muy específicos y tecnología de vanguardia</p>
        </div>
      </section>
    )
}

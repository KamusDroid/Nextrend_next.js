import Link from 'next/link'
import styles from './Header.module.sass'


export const Header = () => {
    return (
        <header className={styles.Header}>
          <nav >
            <ul className={styles.Header__list}>             
              <li><Link href="/">Home</Link></li>
              <li><Link href="/buscador">Search</Link></li>
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li><Link href="/Location">Recomendation</Link></li>
              <li><Link href="/nosotros">About us</Link></li>              
            </ul>
          </nav>
        </header>
    )
}
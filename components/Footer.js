import Link from 'next/link'
import styles from '@/styles/Footer.module.css'

const Footer = () => (
    <footer className={styles.footer}>
        <p>Copyright &copy; DJ Events </p>
        <p>
            <Link href="/about">About This Project</Link>
        </p>
    </footer>
)

export default Footer
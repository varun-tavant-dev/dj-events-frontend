import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import Search from './Search'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { useContext } from 'react'
import AuthContext from '@/context/AuthContext'

const Header = () => {
    const { user, logout } = useContext(AuthContext)

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'>DJ Events
                </Link>
            </div>

            <Search />
            <nav>
                <ul>
                    <li>
                        <Link href="/events">Events</Link>
                    </li>
                    {user ? (
                        // If logged in
                        <>
                            <li> <Link href="/events/add">Add Events</Link></li>
                            <li>
                                <Link href='/account/dashboard'>Dashboard</Link>
                            </li>
                            <li>
                                <button onClick={() => logout()} className='btn-secondary btn-icon'>
                                    <FaSignOutAlt /> Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        // If logged out
                        <li>
                            <Link href='/account/login' className='btn-secondary btn-icon'>
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header
import Link from 'next/link';
import css from '@/components/Header/Header.module.css';

interface HeaderProps {
    menuItems?: { title: string; href: string }[];
}

const Header = ({
    menuItems = [
        { title: 'Home', href: '/' },
        { title: 'Notes', href: '/notes/filter/all' }, 
    ],
}: HeaderProps) => {
    return (
        <header className={css.header}>
            <Link href="/" aria-label="Home" className={css.logo}>
                NoteHub
            </Link>

            <nav>
                <ul className={css.navigation}>
                    {menuItems.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href}>{item.title}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
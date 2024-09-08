import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from 'next/link';

export const Nav = () => {
    return (
        <header className='flex flex-row align-center justify-between h-16'>
            <span role='image' className='font-bold text-lg cursor-pointer user-select-none'>Stanley J</span>
            <Link href='/'>
                <i className="fab fa-github"></i>
            </Link>
        </header>
    )
}
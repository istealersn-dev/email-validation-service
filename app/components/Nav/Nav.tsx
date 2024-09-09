import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from 'next/link';

/**
 * The navigation bar component.
 *
 * This component renders a navigation bar with the name
 * "Stanley J" and a link to the GitHub repository.
 *
 * @returns {JSX.Element} The navigation bar component.
 */
export const Nav = (): JSX.Element => {
    return (
        <header className='flex flex-row align-center justify-between h-16'>
            <span role='image' className='font-semibold text-lg cursor-pointer select-none opacity-75'>
                {/* The name of the author */}
                Stanley J
            </span>
            <Link href='https://github.com/istealersn-dev/email-validation-service'>
                {/* The link to the GitHub repository */}
                <i className="fab fa-github"></i>
            </Link>
        </header>
    )
}

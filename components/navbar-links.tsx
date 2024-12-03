import React from 'react';
import { Book, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { onlineUser } from '@/atom/application-atom';

interface NavbarLinksProps {
    isMobile: boolean;
}

const NavbarLinks: React.FC<NavbarLinksProps> = ({ isMobile }) => {
    const navigate = useRouter();
    const token = Cookies.get('isLoggedIn');
    const [userOnline] = useAtom(onlineUser);
    const user = userOnline ? userOnline : '';
    console.log("userOnline", userOnline);
    console.log("user", user);

    const handleLogout = () => {
        Cookies.remove('isLoggedIn');
        Cookies.remove('username');

    };

    return (
        <div className={isMobile ? 'flex flex-col p-4 space-y-3' : 'hidden md:flex space-x-6'}>
            <a href="#catalog" className="hover:text-indigo-200 transition flex items-center">
                <Book className="mr-2 w-4 h-4" /> Catálogo
            </a>
            <a href="#about" className="hover:text-indigo-200 transition flex items-center">Sobre</a>
            <a href="#contact" className="hover:text-indigo-200 transition flex items-center">Contato</a>
            {token ? (
                <div className="flex items-center space-x-3">
                    <span className="text-green-600 font-medium">
                        {user}
                    </span>
                    <button
                        className="text-red-600 hover:text-red-800 transition flex items-center"
                        onClick={handleLogout}
                    >
                        <LogOut className="mr-1 w-4 h-4" /> Sair
                    </button>
                </div>
            ) : (
                <button
                    className="bg-white text-indigo-700 px-4 py-2 rounded-full hover:bg-gray-300 transition flex items-center"
                    onClick={() => navigate.push('/auth')}
                >
                    <User className="mr-2 w-4 h-4" /> Login
                </button>
            )}
        </div>
    );
};

export default NavbarLinks;
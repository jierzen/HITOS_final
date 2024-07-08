import { createContext, useState } from 'react';

export const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
    const [userSession, setUserSession] = useState({
        email: '',
        role: '',
        id: '',
    });

    const [isLoggedIn, setisLoggedIn] = useState(false);

    const logIn = () => {
		// Iniciar sesión inmediatamente
		setisLoggedIn(true);
		setUserSession({
			email: 'tester@tester.com',
			role: 'admin',
			id: 1,
		});
	};

    const logOut = () => {
        setTimeout(() => {
        setisLoggedIn(false);
        setUserSession({
            email: '',
            role: '',
            id: '',
        });
        }, 300);
    };

    return (
        <MarketplaceContext.Provider
        value={{ isLoggedIn, userSession, logOut, logIn }}>
        {children}
        </MarketplaceContext.Provider>
);
};

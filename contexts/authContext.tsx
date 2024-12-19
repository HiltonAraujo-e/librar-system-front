'use client';

import { onlineUser } from '@/atom/application-atom';
import { setAuthToken } from '@/data/client/token.utils';
import { useAtom } from 'jotai';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { API_ENDPOINTS } from '@/data/client/endpoints';
import axios from 'axios';
import { usePost } from '@/data/hooks';

type User = {
    id: number
    name: string
    email: string
    role: 'admin' | 'client'
}

type AuthContextType = {
    user: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
};

type DecodedToken = {
    sub: string;
    exp: number;
    role: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null)
    const [userOnline, setOnlineUser] = useAtom(onlineUser);

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const router = useRouter();
    const { post } = usePost({
        endpoint: API_ENDPOINTS.LOGIN,
        successAction: (data: any) => {
            handleSuccess(data);
        },
        errorAction: (error: any) => {
            handleError(error);
        },
    });

    const login = async (email: string, password: string) => {
        try {
            const loginInput = { username: email, password };
            await post(loginInput);

            return true;
        } catch (error) {
            return false;
        }
    };

    const handleSuccess = (data: any) => {
        const token = data?.data?.token;
        if (token) {
            setAuthToken(token);
            const decoded: DecodedToken = jwtDecode(token);
            setOnlineUser(decoded.sub);
            console.log("decoded", decoded);

            // if (userOnline) {
            setUser(decoded.sub)
            localStorage.setItem('user', JSON.stringify(decoded.sub))
            //     return true
            // }

            router.push(`/`);
            Cookies.set("isLoggedIn", "true");
        } else {
            console.error("Token not received or invalid.");
        }
    };

    const handleError = (error: any) => {
        console.error("Error during login:", error);
    };


    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

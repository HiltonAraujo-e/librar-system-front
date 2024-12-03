/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { User, Lock, Mail, EyeOff, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { setAuthToken } from "@/data/client/token.utils";
import { jwtDecode } from "jwt-decode";
import { usePost } from "@/data/hooks";
import { API_ENDPOINTS } from "@/data/client/endpoints";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { onlineUser } from "@/atom/application-atom";

type DecodedToken = {
    sub: string;
    exp: number;
    role: string;
};

type LoginInput = {
    username: string;
    password: string;
};

const LoginPage = () => {
    const [_, setOnlineUser] = useAtom(onlineUser);
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const handleSuccess = (data: any) => {
        setAuthToken(data?.data.token);
        const decoded: DecodedToken = jwtDecode(data?.data.token);
        setOnlineUser(decoded.sub);
        router.push(`/library/book/be93e090-16c0-47b9-85a7-60a509f7b3d1`);
        Cookies.set("isLoggedIn", "true");
    };

    const handleError = () => { };

    const { post, isPending } = usePost({
        endpoint: API_ENDPOINTS.LOGIN,
        successAction: (data: any) => {
            handleSuccess(data);
        },
        errorAction: (error: any) => {
            handleError();
        },
    });

    const loginInput: LoginInput = {
        username: "",
        password: "",
    };

    const formik = useFormik({
        initialValues: loginInput,
        validationSchema: Yup.object({
            username: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
        }),
        onSubmit: (values, { setSubmitting }) => {
            post(values);
            setSubmitting(false);
        },
    });



    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white p-6 text-center">
                        <h2 className="text-3xl font-bold">
                            {isLogin ? "Bem-vindo de Volta" : "Crie Sua Conta"}
                        </h2>
                        <p className="mt-2 text-indigo-100">
                            {isLogin
                                ? "Faça login para acessar sua biblioteca"
                                : "Registre-se para começar sua jornada"}
                        </p>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="p-8 space-y-6">
                        {!isLogin && (
                            <div className="relative">
                                <label className="block mb-2 text-gray-600">Nome Completo</label>
                                <div className="flex items-center border rounded-lg">
                                    <User className="ml-3 text-gray-500" />
                                    <input
                                        type="text"
                                        {...formik.getFieldProps("name")}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Digite seu nome"
                                        required={!isLogin}
                                        className="w-full p-3 pl-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="relative">
                            <label className="block mb-2 text-gray-600">Email</label>
                            <div className="flex items-center border rounded-lg">
                                <Mail className="ml-3 text-gray-500" />
                                <input
                                    type="email"
                                    {...formik.getFieldProps("username")}
                                    value={email}
                                    onChange={(e) => {
                                        formik.setFieldValue("username", e.target.value);
                                        setEmail(e.target.value)
                                    }}
                                    placeholder="Digite seu email"
                                    required
                                    className="w-full p-3 pl-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block mb-2 text-gray-600">Senha</label>
                            <div className="flex items-center border rounded-lg">
                                <Lock className="ml-3 text-gray-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...formik.getFieldProps("password")}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        formik.setFieldValue("password", e.target.value);
                                    }}
                                    placeholder="Digite sua senha"
                                    required
                                    className="w-full p-3 pl-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="mr-3 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff className="text-gray-500" /> : <Eye className="text-gray-500" />}
                                </button>
                            </div>
                        </div>

                        {!isLogin && (
                            <div className="relative">
                                <label className="block mb-2 text-gray-600">Confirmar Senha</label>
                                <div className="flex items-center border rounded-lg">
                                    <Lock className="ml-3 text-gray-500" />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirme sua senha"
                                        required={!isLogin}
                                        className="w-full p-3 pl-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                        )}

                        {isLogin && (
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        className="mr-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember" className="text-gray-600">Lembrar-me</label>
                                </div>
                                <a href="#forgot-password" className="text-indigo-600 hover:text-indigo-800">
                                    Esqueceu a senha?
                                </a>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
                        >
                            {isLogin ? "Entrar" : "Cadastrar"}
                        </button>

                        <div className="text-center mt-4">
                            <p className="text-gray-600">
                                {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="ml-2 text-indigo-600 hover:text-indigo-800 font-bold"
                                >
                                    {isLogin ? "Cadastre-se" : "Fazer Login"}
                                </button>
                            </p>
                        </div>
                    </form>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        © 2024 Biblioteca. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

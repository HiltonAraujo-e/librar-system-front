"use client";
import React, { useState } from 'react';
import { Users, Book, BarChart2 } from 'lucide-react';

// Mock data for client-specific content
const mockClientData = {
    totalOrders: 5,
    totalSpent: 1200.00,
    recentActivities: [
        { id: 1, activity: 'Order #12345 placed', date: '2024-11-25' },
        { id: 2, activity: 'Order #12346 shipped', date: '2024-11-20' },
        { id: 3, activity: 'Order #12347 delivered', date: '2024-11-15' },
    ]
};

const ClientDashboard = () => {
    const [activeSection, setActiveSection] = useState('overview');

    const renderOverview = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-gray-500">Total de Pedidos</h3>
                        <p className="text-3xl font-bold text-indigo-600">{mockClientData.totalOrders}</p>
                    </div>
                    <Book className="w-12 h-12 text-indigo-500" />
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-gray-500">Total Gasto</h3>
                        <p className="text-3xl font-bold text-green-600">{mockClientData.totalSpent.toFixed(2)} MZN</p>
                    </div>
                    <Users className="w-12 h-12 text-green-500" />
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-gray-500">Atividades Recentes</h3>
                        <ul className="space-y-2 text-sm">
                            {mockClientData.recentActivities.map((activity) => (
                                <li key={activity.id} className="text-gray-500">{activity.activity} - {activity.date}</li>
                            ))}
                        </ul>
                    </div>
                    <BarChart2 className="w-12 h-12 text-orange-500" />
                </div>
            </div>
        </div>
    );

    const renderAccountSettings = () => (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6">Configurações da Conta</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm">Nome</label>
                    <input type="text" placeholder="Seu Nome" className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-sm">Email</label>
                    <input type="email" placeholder="seu@email.com" className="w-full p-2 border rounded" />
                </div>
                <button className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
                    Salvar Alterações
                </button>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeSection) {
            case 'overview': return renderOverview();
            case 'settings': return renderAccountSettings();
            default: return renderOverview();
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg fixed h-full">
                <div className="p-6 border-b flex items-center justify-center">
                    <h1 className="text-2xl font-bold">Cliente</h1>
                </div>
                <nav className="p-4">
                    <button
                        onClick={() => setActiveSection('overview')}
                        className="w-full text-left py-2 px-4 hover:bg-gray-200 rounded"
                    >
                        Visão Geral
                    </button>
                    <button
                        onClick={() => setActiveSection('settings')}
                        className="w-full text-left py-2 px-4 hover:bg-gray-200 rounded"
                    >
                        Configurações
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 ml-64">
                {renderContent()}
            </div>
        </div>
    );
};

export default ClientDashboard;

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Select, Textarea, Button } from '../../components/ui';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Search } from 'lucide-react';
import apiClient from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';
import LineChart from '../../components/charts/LineChart';
import { Card } from '../../components/ui';
import { DataTable } from '../../components/tables/DataTable';

const FrmNewDashboard2 = () => {
    const { user } = useAuth();

    return (
         <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">

            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-8">
                
            </div>
        </div>

    )
}
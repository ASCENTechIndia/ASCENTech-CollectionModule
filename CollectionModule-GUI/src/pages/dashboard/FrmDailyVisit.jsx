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
import TailwindGridTable from '../../components/reports/TailwindGridTable';

function FrmDailyVisit() {
    const { user } = useAuth();
    const userId = user?.userId;
    const brCategory = user?.brCategory;
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        defaultValues: {
            fromDate: new Date().toISOString().split('T')[0],
            toDate: new Date().toISOString().split('T')[0]
        }
    });

    const [showDetails, setShowDetails] = useState(false);

    const fetchDailyVisitData = async () => { };

    const onSubmit = async (values) => {
        console.log(values);
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
                <h1 className="text-2xl font-semibold text-gray-900">Daily Visit Report</h1>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-8">
                <form onSubmit={handleSubmit(onSubmit)}>

                </form>
            </div>
        </div>
    )
}

export default FrmDailyVisit;
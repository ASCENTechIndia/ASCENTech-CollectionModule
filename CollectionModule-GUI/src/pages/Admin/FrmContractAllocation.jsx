import { useState, useEffect } from 'react'
import { Form, useForm } from 'react-hook-form'
import { Input, Select, Textarea, Button, Checkbox } from '../../components/ui';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { AlertCircle } from 'lucide-react';


const FrmContractAllocation = () => {
    const { user } = useAuth();
    const [isChecked, setIsChecked] = useState(false);
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
                <h1 className="text-2xl font-semibold text-gray-900">Account Allocation</h1>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="flex flex-col items-center gap-3">
                    <div>
                        <Checkbox
                            label="Along with SMA Status"
                            checked={isChecked}
                            onChange={setIsChecked}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        >
                            Allocate Accounts
                        </button>
                    </div>
                    <div>
                        <span className='text-sm font-semibold'>No New records for allocation</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FrmContractAllocation;
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
    const [count, setCount] = useState("");
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    

    const fetchRecordCount = async () => {
        try {
            const response = await apiClient.get("/admin/getAccCounts", {});

            if (response.data.success) {
                setCount(response.data.data[0].NULLFOSCOUNT);
            }
        } catch (error) {
            console.error(error?.response);
        }
    }

    const handleAllocateAccounts = async () => {
        try {
            const response = await apiClient.post("/admin/allocateAccount", {});

            if (response.data.success && response.data.data.success) {
                setMessage(response.data.data.message);
                setShowMessage(true);
            }
        } catch (error) {
            console.error(error?.response);
        }
    }


    useEffect(() => {
        fetchRecordCount();
    }, []);


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
                    {showMessage && (
                        <div>
                            <span className="text-green-600">{message}</span>
                        </div>
                    )}
                    <div>
                        <button
                            type="button"
                            className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            onClick={() => {
                                handleAllocateAccounts();
                            }}
                        >
                            Allocate Accounts
                        </button>
                    </div>
                    <div>
                        {count === 0 ? <span className='text-sm font-semibold'>No New records for allocation</span> : <span className="text-sm font-semibold">{`Count: ${count}`}</span> }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FrmContractAllocation;
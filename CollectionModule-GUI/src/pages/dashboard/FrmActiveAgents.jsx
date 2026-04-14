import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Select, Textarea, Button } from '../../components/ui';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Search } from 'lucide-react';
import apiClient from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';

function FrmActiveAgents() {
    const { user } = useAuth();
    const userId = user?.userId;
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        monthYear: ""
    });

    const onSubmit = async (values) => {
        try {
            const [month, year] = values.monthYear.split("-");
            const userNo = userId.split("E")[1];

            const response = await apiClient.get(`/active-agents/dashboard?userId=${userNo}&month=${month}&year=${year}`);

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">

            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col md:flex-row gap-8 my-3">
                        <p className='font-bold'>Collection Associate</p>
                        <div className='flex flex-col md:flex-row gap-5'>
                            <label className="block text-sm font-medium text-gray-900" >Select Month & Year:</label>
                            <select
                                {...register('monthYear', {
                                    required: 'Month Year is required'
                                })}
                                defaultValue=""
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                            >
                                <option value="4-25">April 2025</option>
                                <option value="5-25">May 2025</option>
                                <option value="6-25">June 2025</option>
                                <option value="7-25">July 2025</option>
                                <option value="8-25">August 2025</option>
                                <option value="9-25">September 2025</option>
                                <option value="10-25">October 2025</option>
                                <option value="11-25">November 2025</option>
                                <option value="12-25">December 2025</option>
                                <option value="1-26">January 2026</option>
                                <option value="2-26">February 2026</option>
                                <option value="3-26">March 2026</option>
                                <option value="4-26">April 2026</option>
                            </select>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="p-5 mt-7">

            </div>
        </div>
    )
}

export default FrmActiveAgents
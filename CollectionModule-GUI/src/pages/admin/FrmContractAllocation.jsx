import { useState, useEffect } from "react";
import { Button } from "../../components/ui";
import apiClient from "../../services/apiService";





const ContractAllocation = () => {

    const [withSMA, setWithSMA] = useState(false);
    const [message, setMessage] = useState("");
    const [pendingCount, setPendingCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const handleAllocate = (e) => {
        e.preventDefault();
       const message= apiClient.post('', { userid: 1 })
        console.log("Allocate clicked");
        console.log({message});
        setMessage('');
    };

    useEffect(() => {
        // simulate API call
        setTimeout(() => {
            const countFromAPI = 5; // change to 0 to test

            setPendingCount(countFromAPI);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">

                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Contract Allocation
                    </h1>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-8">

                    {/* Checkbox */}
                    <div className="mb-4">
                        <label className="flex items-center gap-2 text-gray-700">
                            <input
                                type="checkbox"
                                checked={withSMA}
                                onChange={(e) => setWithSMA(e.target.checked)}
                            />
                            Along with SMA Status
                        </label>
                    </div>

                    {/* 🔥 STEP 5 UI STARTS HERE */}

                    {/* Loading */}
                    {loading && <p>Loading...</p>}

                    {/* Show Button */}
                    {!loading && pendingCount > 0 && (
                        <form onSubmit={handleAllocate}>
                            <Button type="submit">Allocate Accounts</Button>
                        </form>
                    )}

                    {/* Show No Record */}
                    {!loading && pendingCount === 0 && (
                        <p className="text-red-600 font-semibold">
                            No New Record Found For Allocation
                        </p>
                    )}

                    {/* Show Count */}
                    {!loading && pendingCount > 0 && (
                        <p className="mt-2 text-gray-700">
                            Pending Count: {pendingCount}
                        </p>
                    )}

                    {/* 🔥 STEP 5 UI ENDS HERE */}

                    {/* Message */}
                    {message && (
                        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">
                            {message}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ContractAllocation;
import { useEffect, useState } from 'react';
import { Loader2, Search, AlertCircle, Check } from 'lucide-react';
import apiClient from '../../services/apiService';
import { useNotification } from '../../context/NotificationContext';

function FrmUnassignCases() {
  const { showSuccess, showError } = useNotification();
  
  const [users, setUsers] = useState([]);
  const [selectedCases, setSelectedCases] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch users and their pincodes on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Monitor selectedCases changes
  useEffect(() => {
    console.log('selectedCases updated:', selectedCases);
  }, [selectedCases]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/admin/unassign-cases/users');
      
      if (response?.data?.success && response?.data?.data) {
        setUsers(response.data.data);
        
        // Initialize selected cases from fetched data
        const initialSelected = {};
        response.data.data.forEach(user => {
          initialSelected[user.userId] = {
            allSelected: false,
            pincodes: {}
          };
          user.pincodes.forEach(pincode => {
            initialSelected[user.userId].pincodes[pincode] = false;
          });
        });
        setSelectedCases(initialSelected);
      } else {
        showError(response?.data?.message || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
      showError(error?.response?.data?.message || error?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.userId.includes(searchTerm)
  );

  // Handle user checkbox change (select/deselect all pincodes for that user)
  const handleUserCheckChange = (userId) => {
    console.log('Toggling user:', userId, 'Current state:', selectedCases[userId]);
    
    setSelectedCases(prev => {
      const newState = JSON.parse(JSON.stringify(prev)); // Deep clone
      const currentAllSelected = newState[userId]?.allSelected || false;
      const newAllSelected = !currentAllSelected;
      
      // Toggle all pincodes for this user
      if (newState[userId]?.pincodes) {
        Object.keys(newState[userId].pincodes).forEach(pincode => {
          newState[userId].pincodes[pincode] = newAllSelected;
        });
      }
      
      newState[userId].allSelected = newAllSelected;
      console.log('New state after toggle:', newState[userId]);
      return newState;
    });
  };

  // Handle individual pincode checkbox change
  const handlePincodeCheckChange = (userId, pincode) => {
    console.log('Toggling pincode:', pincode, 'for user:', userId);
    
    setSelectedCases(prev => {
      const newState = JSON.parse(JSON.stringify(prev)); // Deep clone
      const currentValue = newState[userId]?.pincodes[pincode] || false;
      newState[userId].pincodes[pincode] = !currentValue;
      
      // Check if all pincodes are now selected
      const allPincodesSelected = Object.values(newState[userId]?.pincodes || {}).every(val => val);
      newState[userId].allSelected = allPincodesSelected;
      
      console.log('New state after pincode toggle:', newState[userId]);
      return newState;
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Build selections array
      const selections = [];
      
      Object.entries(selectedCases).forEach(([userId, userSelection]) => {
        const selectedPincodes = Object.entries(userSelection.pincodes)
          .filter(([_, isSelected]) => isSelected)
          .map(([pincode, _]) => pincode);
        
        if (selectedPincodes.length > 0) {
          selections.push({
            userId,
            pincodes: selectedPincodes
          });
        }
      });

      if (selections.length === 0) {
        showError('Please select at least one case to unassign');
        return;
      }

      setSubmitting(true);
      const response = await apiClient.post('/admin/unassign-cases', {
        selections
      });

      if (response?.data?.success) {
        showSuccess(response?.data?.data.message || 'Cases unassigned successfully');
        // Re-fetch users and their cases from API
        await fetchUsers();
      } else {
        showError(response?.data?.message || 'Failed to unassign cases');
      }
    } catch (error) {
      console.error('Failed to unassign cases:', error);
      showError(error?.response?.data?.message || error?.message || 'Failed to unassign cases');
    } finally {
      setSubmitting(false);
    }
  };

  // Count selected cases
  const selectedCount = Object.values(selectedCases).reduce((total, userSel) => {
    return total + Object.values(userSel.pincodes).filter(Boolean).length;
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          <span className="text-gray-700">Loading users...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="max-w-6xl mx-auto w-full px-4 py-6 space-y-6 flex flex-col h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Unassign Cases For Users</h1>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8 flex flex-col flex-grow overflow-hidden">
          {/* Search Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Search User(s) / Pincode(s)
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Users and Pincodes List */}
          <div className="border border-gray-200 rounded-lg overflow-hidden flex-grow overflow-y-auto">
            {filteredUsers.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                {searchTerm ? 'No users found matching your search' : 'No users available'}
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <div key={user.userId} className="p-4 hover:bg-gray-50 transition-colors">
                    {/* User Checkbox */}
                    <div className="flex items-center mb-3">
                      <button
                        type="button"
                        onClick={() => handleUserCheckChange(user.userId)}
                        aria-checked={selectedCases[user.userId]?.allSelected || false}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 cursor-pointer ${
                          selectedCases[user.userId]?.allSelected
                            ? 'bg-blue-600 border-blue-600 shadow-sm'
                            : 'bg-white border-gray-400 hover:border-gray-600 hover:shadow-sm'
                        }`}
                      >
                        {selectedCases[user.userId]?.allSelected && (
                          <Check className="w-4 h-4 text-white stroke-2" />
                        )}
                      </button>
                      <label 
                        htmlFor={`user-${user.userId}`}
                        className="ml-3 text-sm font-semibold text-gray-900 cursor-pointer flex-1"
                      >
                        {user.userId}
                        <span className="ml-2 text-xs text-gray-500 font-normal">
                          ({Object.values(selectedCases[user.userId]?.pincodes || {}).filter(Boolean).length}/{user.pincodes.length} selected)
                        </span>
                      </label>
                    </div>

                    {/* Pincodes Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 ml-7">
                      {user.pincodes.map((pincode) => (
                        <div key={pincode} className="flex items-center">
                          <button
                            type="button"
                            onClick={() => handlePincodeCheckChange(user.userId, pincode)}
                            aria-checked={selectedCases[user.userId]?.pincodes[pincode] || false}
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 cursor-pointer ${
                              selectedCases[user.userId]?.pincodes[pincode]
                                ? 'bg-blue-600 border-blue-600 shadow-sm'
                                : 'bg-white border-gray-400 hover:border-gray-600 hover:shadow-sm'
                            }`}
                          >
                            {selectedCases[user.userId]?.pincodes[pincode] && (
                              <Check className="w-4 h-4 text-white stroke-2" />
                            )}
                          </button>
                          <label 
                            className="ml-2 text-sm text-gray-700 cursor-pointer"
                          >
                            {pincode}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info Message and Submit Button - Sticky Bottom */}
          <div className="mt-6 border-t border-gray-200 pt-6 space-y-4">
            {selectedCount > 0 && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-800">
                  {selectedCount} case(s) selected for unassignment
                </span>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={submitting || selectedCount === 0}
              className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {submitting ? 'Processing...' : 'Unassign Selected Users Cases'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrmUnassignCases;

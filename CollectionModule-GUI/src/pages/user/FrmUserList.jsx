import { Card } from '../../components/ui'
import { Users } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Select, Textarea, Button } from '../../components/ui'
import { DataTable } from '../../components/tables/DataTable'
import { useNavigate } from 'react-router-dom'
// export default function FrmUserList() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 py-6">
//         <div className="mb-6">
//           <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
//         </div>

//         <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
//           <Users size={48} className="mx-auto text-gray-400 mb-4" />
//           <h2 className="text-2xl font-semibold text-gray-900 mb-2">Coming Soon</h2>
//           <p className="text-gray-600">User management page template. Implement with DataTable component.</p>
//         </div>
//       </div>
//     </div>
//   )
// }

const columns = [
  {
    key: "agentid",
    label: "Agent ID"
  },
  {
    key: "agentname",
    label: "Agent Name"
  },
  {
    key: "mobileno",
    label: "Mobile Number"
  },
  {
    key: "email",
    label: "Email"
  },
  {
    key: "role",
    label: "Role"
  }
];

const data = [
  { agentid: "E100011", agentname: "Hinduja Admin", mobileno: "9845120145", email: "admin@upass.com", role: "FOS"}
]

const FrmUserList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    userLevel: "",
    zoneRegionBranch: ""
  });

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">User Creation</h1>
        </div> */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="flex flex-col md:flex-row justify-start gap-5 mb-7">
            <button
              type='button'
              className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onClick={() => {
                navigate("/User/FrmUserCreation")
              }} 
            >
              New Mobile User
            </button>
            <button
              type="button"
              className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onClick={() => {
                navigate("/User/FrmUserCreationWeb")
              }} 
            >
              New Web User
            </button>
          </div>
          <hr className='my-7 h-[10px]' />
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  User Level<span className="text-danger-600">*</span>
                </label>
                <select
                  {...register('userLevel')}
                  defaultValue=""
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="">-- Select Option --</option>
                  <option value="Zone">Zone</option>
                  <option value="Region">Region</option>
                  <option value="Branch">Branch</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Zone/Region/Branch<span className="text-danger-600">*</span>
                </label>
                <select
                  {...register('zoneRegionBranch')}
                  defaultValue=""
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="">-- Select Option --</option>
                </select>
              </div>
            </div>
            <div className="mt-7">
              <DataTable 
                columns={columns}
                data={data}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FrmUserList;

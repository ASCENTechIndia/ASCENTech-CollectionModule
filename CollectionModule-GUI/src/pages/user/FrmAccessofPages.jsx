import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Select, Textarea, Button } from '../../components/ui';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle } from 'lucide-react';

function FrmAccessofPages() {
  return (
    <div>FrmAccessofPages</div>
  )
}

export default FrmAccessofPages;
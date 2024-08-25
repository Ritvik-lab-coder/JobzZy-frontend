import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import BASE_URL from '@/utils/baseurl'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CreateCompany = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState("");
    const registerNewCompany = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/company/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            if (response.data.success) {
                dispatch(setSingleCompany(response.data.company));
                toast.success(response.data.message);
                navigate(`/admin/company/${response.data.company._id}`);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='px-2'>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to name your company ? You can change this later</p>
                </div>
                <Label>Company Name</Label>
                <Input type='text' className='my-2' placeholder='Microsoft, Google, etc' value={companyName} onChange={event => setCompanyName(event.target.value)} />
                <div className='flex items-center gap-2 my-10'>
                    <Button onClick={() => navigate('/admin/companies')} variant='outline'>Cancel</Button>
                    <Button className='bg-[#f5f127] hover:bg-[#f9f769] text-black' onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateCompany

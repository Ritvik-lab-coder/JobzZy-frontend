import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import JobsTable from './JobsTable'
import { setSearchJobByText } from '@/redux/jobSlice.js'

const AdminJobs = () => {
    const navigate = useNavigate();
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input]);
    return (
        <div className='px-2'>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input className='w-fit' placeholder='Filter by name' onChange={event => setInput(event.target.value)} />
                    <Button onClick={() => navigate('/admin/jobs/create')} className='bg-[#f5f127] hover:bg-[#f9f769] text-black'>New Jobs</Button>
                </div>
                <JobsTable />
            </div>
        </div>
    )
}

export default AdminJobs

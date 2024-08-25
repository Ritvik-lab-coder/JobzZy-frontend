import React from 'react'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/job-description/${job?._id}`)} className='p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 pt-2'>
                <Badge className={'text-[#3820ee] font-bold bg-gray-200'}>{job?.position} Openings</Badge>
                <Badge className={'text-[#ed431d] font-bold bg-gray-200'}>{job?.jobType}</Badge>
                <Badge className={'text-[#1fe61c] font-bold bg-gray-200'}>{job?.salary} LPA</Badge>
            </div>
        </div>
    )
}

export default JobCard

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { setSingleJob } from '@/redux/jobSlice.js';
import BASE_URL from '@/utils/baseurl.js';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const JobDescription = () => {
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const { singleJob } = useSelector(store => store.jobs);
    const { user } = useSelector(store => store.auth);
    const isAppliedBefore = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isAppliedBefore);
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/job/get/${jobId}`, {
                    withCredentials: true
                });
                if (response.data.success) {
                    dispatch(setSingleJob(response.data.job));
                    setIsApplied(response.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchJob();
    }, [jobId, dispatch, user?._id]);
    const applyJob = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/application/apply/${jobId}`, {
                withCredentials: true
            });
            if (response.data.success) {
                setIsApplied(true);
                const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updateSingleJob));
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex justify-between'>
                <div>
                    <h1 className='font-bold text-xl '>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 pt-2'>
                        <Badge className={'text-[#3820ee] font-bold bg-gray-200'}>{singleJob?.position} Openings</Badge>
                        <Badge className={'text-[#ed431d] font-bold bg-gray-200'}>{singleJob?.jobType}</Badge>
                        <Badge className={'text-[#1fe61c] font-bold bg-gray-200'}>{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button onClick={isApplied ? null : applyJob} disabled={isApplied} className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#f5f127] hover:bg-[#f9f769] text-black'}`}>{isApplied ? "Already Applied" : "Apply Now"}</Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>{singleJob?.description}</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} Years</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
                <h1 className='font-bold my-1'>Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted On: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription

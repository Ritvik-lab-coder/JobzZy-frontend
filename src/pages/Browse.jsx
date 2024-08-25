import Job from '@/components/shared/Job'
import Navbar from '@/components/shared/Navbar'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { setSearchQuery } from '@/redux/jobSlice.js'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.jobs);
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(setSearchQuery(""));
        }
    }, []);
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl px-2 my-10'>Search Results ({allJobs?.length})</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-4'>
                    {
                        allJobs.length <= 0 ? <span>No Jobs Found</span> : allJobs?.map((job, index) => (
                            <Job key={index} job={job} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse

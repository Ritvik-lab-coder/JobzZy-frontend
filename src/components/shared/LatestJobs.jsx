import React from 'react'
import JobCard from './JobCard'
import { useSelector } from 'react-redux'

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.jobs);
    return (
        <div className='max-w-7xl mx-auto my-20 flex items-center justify-center flex-col'>
            <h1 className='text-4xl font-bold text-center'><span className='text-[#f5f127]'>Latest & Top</span> Job Openings <br /> specifically curated for you</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
                {
                    allJobs.length <= 0 ? <span>No Jobs Available</span> : allJobs.slice(0, 6).map((job, index) => <JobCard job={job} key={index} />)
                }
            </div>
        </div>
    )
}

export default LatestJobs

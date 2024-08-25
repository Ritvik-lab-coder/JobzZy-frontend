import Filters from '@/components/shared/Filters'
import Job from '@/components/shared/Job'
import Navbar from '@/components/shared/Navbar'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const Jobs = () => {
    const { allJobs, searchQuery } = useSelector(store => store.jobs);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    useEffect(() => {
        if (searchQuery) {
            const filteredJobs = allJobs.filter(job => {
                return job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.description.toLowerCase().includes(searchQuery.toLowerCase()) || job.location.toLowerCase().includes(searchQuery.toLowerCase());
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchQuery]);
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex flex-col md:flex-row gap-5'>
                    <div className='w-20%'>
                        <Filters />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>No Jobs Found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job, index) => (
                                            <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }}>
                                                <Job key={index} job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs

import React from 'react'
import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Link } from 'react-router-dom'

const Job = ({ job }) => {
    const daysAgo = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgo(job?.createdAt) === 0 ? "Today" : `${daysAgo(job?.createdAt)} Days Ago`}</p>
                <Button variant='outline' className='rounded-full' size='icon'><Bookmark /></Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button>
                    <Avatar>
                        <AvatarImage src={`${job?.company?.logo}`} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-600'>India</p>
                </div>
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
            <div className='flex items-center gap-4 mt-4'>
                <Link to={`/job-description/${job?._id}`}><Button variant='outline'>Details</Button></Link>
                <Button className='bg-[#f5f127] hover:bg-[#f9f769] text-black'>Save For Later</Button>
            </div>
        </div>
    )
}

export default Job

import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice.js'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = () => {
        dispatch(setSearchQuery(query));
        navigate('/browse');
    }
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[##f83002] text-[#f83002] font-medium'>No. 1 Job Searching and Internship Website</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#f5f127]'>Dream Job</span></h1>
                <p>Get the best job recommendations by telling us your career needs</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 rounded-full items-center gap-4 mx-auto'>
                    <Input type="text" placeholder='Find the job that suits you' className='outline-none border-none w-full py-2' onChange={event => setQuery(event.target.value)} />
                    <Button onClick={searchJobHandler} className='rounded-r-full bg-[#f5f127]'><Search className='h-5 w-5' /></Button>
                </div>
            </div>

        </div>
    )
}

export default Hero

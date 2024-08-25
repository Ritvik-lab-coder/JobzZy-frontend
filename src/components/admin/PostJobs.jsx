import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import BASE_URL from '@/utils/baseurl.js'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const companyArray = []

const PostJobs = () => {
    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: 0,
        location: '',
        jobType: '',
        experience: 0,
        position: 0,
        companyId: ''
    });
    const { companies } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const changeEventHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    }
    const handleSelectChangeHandler = (value) => {
        const selectedCompany = companies.find(company => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    }
    const navigate = useNavigate();
    const submitHandler = async (event) => {
        try {
            setLoading(true);
            event.preventDefault();
            const response = await axios.post(`${BASE_URL}/job/post`, input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/admin/jobs')
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={submitHandler} className='px-4 border-gray-200 shadow-lg rounded-md'>
                    <h1 className='font-bold text-xl text-center my-5'>Post a New Job</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input type='text' name='title' className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' value={input.title} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input type='text' name='description' className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' value={input.description} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input type='text' name='requirements' className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' value={input.requirements} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input type='number' name='salary' className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' value={input.salary} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input type='text' name='location' className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' value={input.location} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input type='text' name='jobType' className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' value={input.jobType} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Experience</Label>
                            <Input type='number' name='experience' className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' value={input.experience} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Positions</Label>
                            <Input type='number' name='position' className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' value={input.position} onChange={changeEventHandler} />
                        </div>
                        {
                            companies.length >= 0 && (
                                <Select onValueChange={handleSelectChangeHandler}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map((company, index) => (
                                                    <SelectItem value={company.name.toLowerCase()} key={index}>{company.name}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div>
                    {
                        loading ? <Button className='w-full my-4 bg-[#f5f127] hover:bg-[#f9f769] text-black' ><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait</Button> : <Button type='submit' className='w-full my-4 bg-[#f5f127] hover:bg-[#f9f769] text-black'>Post Job</Button>
                    }
                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>Please register a company to post a job*</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJobs

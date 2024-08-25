import React, { useState, useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import BASE_URL from '@/utils/baseurl.js'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice.js'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: '',
        file: ''
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, user } = useSelector(store => store.auth);
    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            dispatch(setLoading(true));
            const formData = new FormData();
            formData.append('fullname', input.name);
            formData.append('email', input.email);
            formData.append('password', input.password);
            formData.append('phone', input.phone);
            formData.append('role', input.role);
            if (input.file) formData.append('file', input.file);
            const response = await axios.post(`${BASE_URL}/user/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(() => {
        if (user) navigate('/');
    }, []);
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form className='w-1/2 border border-gray-200 rounded-md p-4 my-10' onSubmit={submitHandler}>
                    <h1 className='font-bold text-xl mb-5 text-center'>Sign Up</h1>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input type='text' placeholder='Full Name' value={input.name} onChange={event => setInput({ ...input, name: event.target.value })} />
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input type='email' placeholder='Email ID' value={input.email} onChange={event => setInput({ ...input, email: event.target.value })} />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input type='password' placeholder='Password' value={input.password} onChange={event => setInput({ ...input, password: event.target.value })} />
                    </div>
                    <div className='my-2'>
                        <Label>Phone</Label>
                        <Input type='text' placeholder='Phone No.' value={input.phone} onChange={event => setInput({ ...input, phone: event.target.value })} />
                    </div>
                    <div className='flex flex-col md:flex-row items-center justify-between'>
                        <RadioGroup className='flex flex-col sm:flex-row items-center gap-4 my-5'>
                            <div className="flex items-center space-x-2">
                                <Input type='radio' name='role' value='employee' className='cursor-pointer' onChange={event => setInput({ ...input, role: event.target.value })} />
                                <Label htmlFor="r1">Employee</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type='radio' name='role' value='recruiter' className='cursor-pointer' onChange={event => setInput({ ...input, role: event.target.value })} />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input accept='image/*' type='file' className='cursor-pointer' onChange={event => setInput({ ...input, file: event.target.files[0] })} />
                        </div>
                    </div>
                    {
                        loading ? <Button className='w-full my-4 bg-[#f5f127] hover:bg-[#f9f769] text-black' ><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait</Button> : <Button type='submit' className='w-full my-4 bg-[#f5f127] hover:bg-[#f9f769] text-black'>Sign Up</Button>
                    }
                    <span className='text-sm'>Already have an account ? <Link to={'/login'} className='text-blue-600'>Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup

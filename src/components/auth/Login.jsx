import React, { useEffect, useState } from 'react'
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
import { setLoading, setUser } from '@/redux/authSlice.js'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
        role: ''
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            dispatch(setLoading(true));
            const response = await axios.post(`${BASE_URL}/user/login`, input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            if (response.data.success) {
                toast.success(response.data.message);
                dispatch(setUser(response.data.user));
                navigate('/');
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
                    <h1 className='font-bold text-xl mb-5 text-center'>Login</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input type='email' placeholder='Email ID' value={input.email} onChange={event => setInput({ ...input, email: event.target.value })} />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input type='password' placeholder='Password' value={input.password} onChange={event => setInput({ ...input, password: event.target.value })} />
                    </div>
                    <div className='flex items-center justify-between'>
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
                    </div>
                    {
                        loading ? <Button className='w-full my-4 bg-[#f5f127] hover:bg-[#f9f769] text-black' ><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait</Button> : <Button type='submit' className='w-full my-4 bg-[#f5f127] hover:bg-[#f9f769] text-black'>Login</Button>
                    }
                    <span className='text-sm'>Don't have an account ? <Link to={'/signup'} className='text-blue-600'>Sign Up</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login


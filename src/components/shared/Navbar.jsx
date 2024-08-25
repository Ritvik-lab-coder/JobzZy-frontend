import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import BASE_URL from '@/utils/baseurl.js'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice.js'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logOutHandler = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/logout`, {
                withCredentials: true
            });
            if (response.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.success);
        }
    }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#f83002]'>zZy</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to={'/admin/companies'}>Companies</Link></li>
                                    <li><Link to={'/admin/jobs'}>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to={'/'}>Home</Link></li>
                                    <li><Link to={'/jobs'}>Jobs</Link></li>
                                    <li><Link to={'/browse'}>Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to={'/login'}><Button variant='outline'>Login</Button></Link>
                                <Link to={'/signup'}><Button className='bg-[#f5f127] hover:bg-[#f9f769] text-black'>Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user?.profile?.profilePhoto === "" ? "https://github.com/shadcn.png" : `${user?.profile?.profilePhoto}`} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-80'>
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src={user?.profile?.profilePhoto === "" ? "https://github.com/shadcn.png" : `${user?.profile?.profilePhoto}`} />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.name}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-start'>
                                        {
                                            user && user.role === 'recruiter' ? (
                                                <></>
                                            ) : (
                                                <div className='flex gap-4 my-2 items-center justify-center'>
                                                    <User2 />
                                                    <Link to={'/profile'}><Button variant='link'>View Profile</Button></Link>
                                                </div>
                                            )
                                        }
                                        <div className='flex gap-4 my-2 items-center justify-center'>
                                            <LogOut />
                                            <Button onClick={logOutHandler} variant='link'>Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar

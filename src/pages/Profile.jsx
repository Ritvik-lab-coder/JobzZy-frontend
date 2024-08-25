import AppliedJobs from '@/components/shared/AppliedJobs'
import Navbar from '@/components/shared/Navbar'
import UpdateProfile from '@/components/shared/UpdateProfile'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { Contact, Mail, Pen } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    useGetAppliedJobs();
    useEffect(() => {
        if (!user) navigate('/');
    }, []);
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className='h-24 w-24'>
                            <AvatarImage src={user?.profile?.profilePhoto === "" ? "https://github.com/shadcn.png" : `${user?.profile?.profilePhoto}`} alt="@shadcn" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.name}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className='text-right' variant='outline'><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>+91-{user?.phone}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills?.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>N.A.</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className='text-md font-bold'>Resume</Label>
                    {
                        user?.profile?.resumeOriginalName ? <a className='text-blue-500 w-full hover:underline cursor-pointer' target='_blank' href={`${user?.profile?.resume}`}>{user?.profile?.resumeOriginalName}</a> : <span>N.A.</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5 px-2'>Applied Jobs</h1>
                <AppliedJobs />
            </div>
            <UpdateProfile open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile

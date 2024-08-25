import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import BASE_URL from '@/utils/baseurl.js'
import { setUser } from '@/redux/authSlice.js'
import { toast } from 'sonner'

const UpdateProfile = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const [input, setInput] = useState({
        fullname: user?.name,
        email: user?.email,
        phone: user?.phone,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
        file: user?.profile?.resume
    });
    const dispatch = useDispatch();
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('fullname', input.fullname);
            formData.append('email', input.email);
            formData.append('phone', input.phone);
            formData.append('bio', input.bio);
            formData.append('skills', input.skills);
            if (input.file) formData.append('file', input.file);
            const response = await axios.post(`${BASE_URL}/user/profile-update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });
            if (response.data.success) {
                dispatch(setUser(response.data.user));
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setOpen(false);
            setLoading(false);
        }
    }
    return (
        <div>
            <Dialog open={open}>
                <DialogContent className='sm:max-w-[425px]' onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='name' className='text-right'>Full Name</Label>
                                <Input type='text' id='name' name='name' className='col-span-3' value={input.fullname} onChange={event => setInput({ ...input, fullname: event.target.value })} />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='email' className='text-right'>Email</Label>
                                <Input type='email' id='email' name='email' className='col-span-3' value={input.email} onChange={event => setInput({ ...input, email: event.target.value })} />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='phone' className='text-right'>Phone No.</Label>
                                <Input type='text' id='phone' name='phone' className='col-span-3' value={input.phone} onChange={event => setInput({ ...input, phone: event.target.value })} />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='bio' className='text-right'>Bio</Label>
                                <Input type='text' id='bio' name='bio' className='col-span-3' value={input.bio} onChange={event => setInput({ ...input, bio: event.target.value })} />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='skills' className='text-right'>Skills</Label>
                                <Input type='text' id='skills' name='skills' className='col-span-3' value={input.skills} onChange={event => setInput({ ...input, skills: event.target.value })} />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='resume' className='text-right'>Resume</Label>
                                <Input type='file' accept='application/pdf' id='resume' name='resume' className='col-span-3' onChange={event => setInput({ ...input, file: event.target.files[0] })} />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className='bg-[#f5f127] hover:bg-[#f9f769] text-black'><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait</Button> : <Button type='submit' className='w-full my-4 bg-[#f5f127] hover:bg-[#f9f769] text-black'>Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog >
        </div >
    )
}

export default UpdateProfile

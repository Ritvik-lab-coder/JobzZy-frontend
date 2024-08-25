import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import BASE_URL from '@/utils/baseurl'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const { singleCompany } = useSelector(store => store.company);
    const [input, setInput] = useState({
        name: singleCompany.name || '',
        description: singleCompany.description || '',
        website: singleCompany.website || '',
        location: singleCompany.location || '',
        file: null
    });
    const [loading, setLoading] = useState(false);
    const changeEventHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    }
    const changeFileHandler = (event) => {
        setInput({ ...input, file: event.target.files[0] });
    }
    const navigate = useNavigate();
    const onSubmitHandler = async (event) => {
        try {
            setLoading(true);
            event.preventDefault();
            const formData = new FormData();
            formData.append('name', input.name);
            formData.append('description', input.description);
            formData.append('website', input.website);
            formData.append('location', input.location);
            if (input.file) formData.append('file', input.file);
            const response = await axios.put(`${BASE_URL}/company/company-update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/admin/companies');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    }, [singleCompany]);
    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form className='px-4'>
                    <div className='flex items-center gap-5 p-8'>
                        <Button onClick={() => navigate('/admin/companies')} variant='outline' className='flex items-center gap-2 text-gray-500 font-semibold'>
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input type='text' name='name' value={input.name} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input type='text' name='description' value={input.description} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input type='text' name='website' value={input.website} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input type='text' name='location' value={input.location} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input type='file' accept='image/*' onChange={changeFileHandler} />
                        </div>
                    </div>
                    {
                        loading ? <Button className='w-full my-4 bg-[#f5f127] hover:bg-[#f9f769] text-black' ><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait</Button> : <Button type='submit' className='w-full my-4 bg-[#f5f127] hover:bg-[#f9f769] text-black' onClick={onSubmitHandler}>Update</Button>
                    }
                </form>
            </div>
        </div>
    )
}

export default CompanySetup

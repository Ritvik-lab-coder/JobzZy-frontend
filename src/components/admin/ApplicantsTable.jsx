import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import BASE_URL from '@/utils/baseurl.js'
import { toast } from 'sonner'


const ApplicantsTable = () => {
    const status = ["Accept", "Reject"];
    const { applicants } = useSelector(store => store.application);
    const statusHandler = async (id, status) => {
        try {
            const response = await axios.put(`${BASE_URL}/application/status/${id}/update`, {
                status: status === "Accept" ? "accepted" : "rejected"
            }, { withCredentials: true });
            if (response.data.success) {
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='px-2'>
            <Table>
                <TableCaption>
                    A list of all the applied job seekers
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.map((application, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{application?.applicant?.fullname}</TableCell>
                                    <TableCell>{application?.applicant?.email}</TableCell>
                                    <TableCell>+91-{application?.applicant?.phone}</TableCell>
                                    <TableCell>
                                        {
                                            application?.applicant?.profile?.resume ? <a className='text-blue-600 cursor-pointer' href={`${application?.applicant?.profile?.resume}`} target='_blank'>{application?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                                        }
                                    </TableCell>
                                    <TableCell>{application?.applicant?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell className='text-right'>
                                        <Popover>
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className='w-32'>
                                                {
                                                    status.map((stat, index) => {
                                                        return (
                                                            <div onClick={() => statusHandler(application._id, stat)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                                <span>{stat}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable

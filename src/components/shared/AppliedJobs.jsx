import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobs = () => {
    const { appliedJobs } = useSelector(store => store.jobs);
    return (
        <div>
            <Table>
                <TableCaption>Your Applied Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className='text-right'>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        appliedJobs.length <= 0 ? <span>You haven't applied to any jobs yet</span> : appliedJobs?.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                                <TableCell>{item?.job?.title}</TableCell>
                                <TableCell>{item?.job?.company?.name}</TableCell>
                                <TableCell className='text-right'><Badge className={`${item?.status === "rejected" ? "bg-red-600" : item?.status === "accepted" ? "bg-green-500" : "bg-gray-400"}`}>{item?.status === "rejected" ? "REJECTED" : item?.status === "accepted" ? "ACCEPTED" : "PENDING"}</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobs

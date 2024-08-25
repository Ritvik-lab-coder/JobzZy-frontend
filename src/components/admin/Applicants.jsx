import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import BASE_URL from '@/utils/baseurl.js';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setApplicants } from '@/redux/applicationSlice.js';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);
    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/application/get-applications/${params.id}`, {
                    withCredentials: true
                });
                if (response.data.success) {
                    dispatch(setApplicants(response.data.applicants));
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchApplicants();
    }, []);
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto px-2'>
                <h1 className='font-bold text-xl my-5'>Applicants ({applicants?.length})</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants

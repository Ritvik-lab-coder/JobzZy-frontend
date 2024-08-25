import { setAllAdminJobs } from '@/redux/jobSlice.js';
import BASE_URL from '@/utils/baseurl.js';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/job/get-recruiter-jobs`, {
                    withCredentials: true
                });
                if (response.data.success) {
                    dispatch(setAllAdminJobs(response.data.recruiterJobs));
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchAllAdminJobs();
    }, []);
}

export default useGetAllAdminJobs

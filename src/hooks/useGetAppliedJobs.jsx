import { setAppliedJobs } from '@/redux/jobSlice.js';
import BASE_URL from '@/utils/baseurl.js';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/application/get`, { withCredentials: true });
                if (response.data.success) {
                    dispatch(setAppliedJobs(response.data.applications));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    }, []);
}

export default useGetAppliedJobs

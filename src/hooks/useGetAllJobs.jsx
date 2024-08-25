import { setAllJobs } from '@/redux/jobSlice.js';
import BASE_URL from '@/utils/baseurl.js';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchQuery } = useSelector(store => store.jobs);
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/job/get?keyword=${searchQuery}`, {
                    withCredentials: true
                });
                if (response.data.success) {
                    dispatch(setAllJobs(response.data.jobs));
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchJobs();
    }, []);
}

export default useGetAllJobs

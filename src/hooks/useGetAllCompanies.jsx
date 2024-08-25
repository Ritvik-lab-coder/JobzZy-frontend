import { setCompanies } from '@/redux/companySlice.js';
import BASE_URL from '@/utils/baseurl.js';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/company/get`, {
                    withCredentials: true
                });
                if (response.data.success) {
                    dispatch(setCompanies(response.data.companies));
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchCompanies();
    }, []);
}

export default useGetAllCompanies
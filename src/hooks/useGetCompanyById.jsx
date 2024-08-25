import { setSingleCompany } from '@/redux/companySlice.js';
import BASE_URL from '@/utils/baseurl.js';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/company/get/${companyId}`, {
                    withCredentials: true
                });
                if (response.data.success) {
                    dispatch(setSingleCompany(response.data.company));
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchSingleCompany();
    }, [companyId, dispatch]);
}

export default useGetCompanyById
import CarouselCat from '@/components/shared/Carousel'
import Footer from '@/components/shared/Footer'
import Hero from '@/components/shared/Hero'
import LatestJobs from '@/components/shared/LatestJobs'
import Navbar from '@/components/shared/Navbar'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    useGetAllJobs();
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (user?.role === 'recruiter') {
            navigate('/admin/companies');
        }
    }, [])
    return (
        <div>
            <Navbar />
            <Hero />
            <CarouselCat />
            <LatestJobs />
            <Footer />
        </div>
    )
}

export default Home

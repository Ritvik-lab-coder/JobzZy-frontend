import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice.js'
import { useNavigate } from 'react-router-dom'

const CarouselCat = () => {
    const category = [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "DevOps Engineer",
        "Data Scientist",
        "Graphic Designer",
        "System Designer"
    ]
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchQuery(query));
        navigate('/browse');
    }
    return (
        <div>
            <Carousel className='w-[40%] max-w-3xl mx-auto my-20'>
                <CarouselContent>
                    {
                        category.map((item, index) => (
                            <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3'>
                                <Button onClick={() => searchJobHandler(item)} className='rounded-full bg-[#f1d049]' variant='outline'>{item}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className='bg-[#72f607]' />
                <CarouselNext className='bg-[#72f607]' />
            </Carousel>
        </div>
    )
}

export default CarouselCat

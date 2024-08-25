import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice.js'

const Filters = () => {
    const filterData = [
        {
            filterType: "Location",
            array: ["Delhi", "Mumbai", "Bangalore", "Pune"]
        },
        {
            filterType: "Industry",
            array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"]
        },
        {
            filterType: "Salary",
            array: ["0-3LPA", "3-8LPA", "8-20LPA"]
        },
    ]
    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch();
    const handleChange = (value) => {
        setSelectedValue(value);
    }
    useEffect(() => {
        dispatch(setSearchQuery(selectedValue));
    }, [selectedValue]);
    return (
        <div className='px-4'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={handleChange}>
                {
                    filterData.map((filter, index) => (
                        <div className='font-bold text-lg' key={index}>
                            <h2 className='mb-2'>{filter.filterType}</h2>
                            {
                                <div className='flex flex-wrap gap-4 md:flex-col'>
                                    {
                                        filter.array.map((item, idx) => {
                                            const itemId = `id${index}-${idx}`
                                            return (
                                                <div className='flex items-center space-x-2' key={index}>
                                                    <RadioGroupItem value={item} id={itemId} />
                                                    <Label>{item}</Label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default Filters

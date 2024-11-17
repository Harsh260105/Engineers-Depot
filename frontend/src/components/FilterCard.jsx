import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery, setSalaryFilter } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Ahmedabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: [
            "FullStack Developer",
            "Frontend Developer",
            "Backend Developer",
            "Software Engineer",
            "Data Scientist",
            "DevOps Engineer",
            "Cloud Solutions Architect",
            "iOS Developer",
            "Android Developer"
        ]
    },
    {
        filterType: "Salary",
        array: ["1lakh to 5lakh", "5lakh to 10lakh", "10lakh to 20lakh", "20lakh to 50lakh", "50lakh to 1crore", "1crore+"]
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [salaryRange, setSalaryRange] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
        dispatch(setSearchedQuery(value));
    };

    const salaryChangeHandler = (value) => {
        setSalaryRange(value);
        dispatch(setSalaryFilter(value));
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    useEffect(() => {
        dispatch(setSalaryFilter(salaryRange));
    }, [salaryRange]);

    // Function to clear filters
    const clearFilters = () => {
        setSelectedValue('');
        setSalaryRange('');
        dispatch(setSearchedQuery(''));
        dispatch(setSalaryFilter(''));
    };

    return (
        <div className="w-full bg-white p-3 rounded-md">
            <h1 className="font-bold text-lg">Filter Jobs</h1>
            <hr className="mt-3" />
            {filterData.map((data, index) => (
                <div key={index}>
                    <h1 className="font-bold text-lg my-2.5">{data.filterType}</h1>
                    <RadioGroup
                        value={data.filterType === "Salary" ? salaryRange : selectedValue}
                        onValueChange={
                            data.filterType === "Salary" ? salaryChangeHandler : changeHandler
                        }
                    >
                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;
                            return (
                                <div className="flex items-center space-x-2 my-0.5" key={itemId}>
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId}>{item}</Label>
                                </div>
                            );
                        })}
                    </RadioGroup>
                </div>
            ))}

            {/* Clear Filters Button */}
            <div className="mt-5">
                <button
                    className="bg-red-500 text-white px-5 py-2 rounded-xl"
                    onClick={clearFilters}
                >
                    Clear Filters
                </button>
            </div>
        </div>
    );
};

export default FilterCard;

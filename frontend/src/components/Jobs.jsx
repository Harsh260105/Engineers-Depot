import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery, salaryFilter } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        
        let filteredJobs = allJobs;

        // Filter by search query
        if (searchedQuery) {
            filteredJobs = filteredJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase()) 
            });
        }

        // Filter by salary range
        if (salaryFilter) {
            const salaryRange = parseSalaryRange(salaryFilter);
            filteredJobs = filteredJobs.filter((job) => {
                return job.salary >= salaryRange.min && job.salary <= salaryRange.max;
            });
        }

        setFilterJobs(filteredJobs);
    }, [allJobs, searchedQuery, salaryFilter]);

    // Helper function to parse salary range
    const parseSalaryRange = (range) => {
        const ranges = {
            "1lakh to 5lakh": { min: 1, max: 5 },
            "5lakh to 10lakh": { min: 5, max: 10 },
            "10lakh to 20lakh": { min: 10, max: 20 },
            "20lakh to 50lakh": { min: 20, max: 50 },
            "50lakh to 1crore": { min: 50, max: 100 },
            "1crore+": { min: 100, max: Infinity }
        };
        return ranges[range] || { min: 0, max: Infinity };
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {filterJobs.length <= 0 ? (
                        <span>Job not found</span>
                    ) : (
                        <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                            <div className='grid grid-cols-3 gap-4'>
                                {filterJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        key={job?._id}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;

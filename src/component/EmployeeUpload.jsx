import { DevTool } from '@hookform/devtools';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { employeeContext } from '../App';

function EmployeeUpload() {


    const { employees, setEmployees } = useContext(employeeContext);

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm();


    const handleCustomSubmit = (data) => {
        reset();
        //get a maximum id from employees
        const currentEmployeeId = employees.length > 0 ? employees[employees.length - 1]?.id + 1 : 1;
        const newEmployee = {
            id: currentEmployeeId,
            name: data.name
        }

        setEmployees([...employees, newEmployee]);
    }

    return (
        <div>
            <h1 className='text-2xl font-bold'>Employee Upload</h1>
            <form className='mt-6' onSubmit={handleSubmit(handleCustomSubmit)}>

                <div className='flex flex-col gap-2D'>
                    <label htmlFor="name">Name</label>
                    <input type="text" className='border-2 border-gray-600 rounded-md p-2' placeholder='Enter Employee Name' {...register("name", { required: { value: true, message: "Name is required" } })} />
                    <p className='text-red-500'>{errors.name?.message}</p>
                </div>

                <button type='submit' className='bg-black text-white p-2 rounded-md mt-8'>Submit</button>

            </form>
            <DevTool control={control} />
        </div>
    )
}

export default EmployeeUpload
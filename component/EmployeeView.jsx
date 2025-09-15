import React, { useContext } from 'react'
import { employeeContext } from '../App';

function EmployeeView() {

    const { employees, setEmployees } = useContext(employeeContext);

    const deleteEmployee = (id) => {
        const filteredEmployees = employees.filter((employee) => employee.id !== id);
        setEmployees(filteredEmployees);
    }

    return (
        <div>
            <table className='w-full'>
                <tr>
                    <th className='px-4 py-2 bg-black text-white rounded-tl-lg rounded-bl-lg'>Id</th>
                    <th className='px-4 py-2 bg-black text-white'>Name</th>
                    <th className='px-4 py-2 bg-black text-white rounded-tr-lg rounded-br-lg'>Delete</th>
                </tr>
                {
                    employees.map((employee) => (
                        <tr key={employee.id}>
                            <td className='px-4 py-2 bg-slate-100 text-center'>{employee.id}</td>
                            <td className='px-4 py-2 bg-slate-100 text-center'>{employee.name}</td>
                            <td className='px-4 py-2 bg-slate-100 text-center'>
                                <button onClick={() => deleteEmployee(employee.id)} className='bg-red-500 text-white px-3 py-1.5 rounded-md'>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export default EmployeeView
import React from 'react'
import {Link} from 'react-router-dom'



export default function HomePage() {
  return (
    <div className='w-full flex-1 flex items-center justify-center'>
       
        <div className="flex flex-wrap w-3/4 lg:w-3/5 border border-black p-2 lg:p-4 rounded-md bg-white">
            <h3 className='w-full text-center font-mono lg:text-4xl'>Make Payment Across The Globe</h3>
            <div className="flex my-5 justify-around w-full lg:w-3/5 mx-auto">
                <Link className='btn btn-outline   ' to="/login">Login</Link>
                <Link className='btn btn-outline  ' to="/register">Register</Link>
            </div>
        </div>

    </div>
  )
}

import { Outlet } from '@remix-run/react'
import Navbar from '~/components/navbar'


export default function AdminDashboard() {
  return (
    <div className="h-svh sm:h-screen flex flex-col items-center justify-center">
      <Navbar admin />

      <div className='max-h-[65svh] sm:max-h-[40rem] w-[90%] sm:w-[80%]'>
        <div className='pb-32'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

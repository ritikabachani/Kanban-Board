import { NavLink, Outlet } from "react-router-dom"

function Employee() {

  return (
    <div>
      {/* Tab */}
      <div id="tabContainer" className="w-full p-1 flex items-center gap-2">
        <NavLink to="/" className="inline-flex justify-center items-center px-4 py-2 rounded-lg bg-slate-100 hover:bg-black hover:text-white hover:cursor-pointer">Upload</NavLink>
        <NavLink to="/view" className="inline-flex justify-center items-center px-4 py-2 rounded-lg bg-slate-100 hover:bg-black hover:text-white hover:cursor-pointer">View</NavLink>
      </div>
      {/* Tab */}
      {/* ViewPort */}
      <div className="p-4">
        <Outlet />
      </div>
      {/* ViewPort */}
    </div>
  )
}

export default Employee
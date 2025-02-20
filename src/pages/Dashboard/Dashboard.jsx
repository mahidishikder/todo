import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTachometerAlt, FaTasks, FaList, FaSpinner, FaCheckCircle, FaSignOutAlt } from "react-icons/fa";
import Navbar from "../../components/Navber";

function Dashboard() {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="lg:fixed lg:left-0 lg:top-0 lg:w-72 lg:h-screen bg-[#2C3E50] text-white shadow-lg flex flex-col lg:overflow-y-auto lg:pr-2 w-full"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mt-2">
          <motion.img
            src="https://img.icons8.com/?size=64&id=119705&format=png"
            alt="Logo"
            className="w-9"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
          <h2 className="text-xl font-bold">Noyatask</h2>
        </div>
        <div className="divider divider-info my-8">Menu</div>

        {/* Scrollable Menu */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 pr-2">
          <ul className="space-y-2">
            <DashboardLink to="/" icon={<FaTachometerAlt />} label="Dashboard" />
            <DashboardLink to="/task" icon={<FaTasks />} label="Task" />
            <DashboardLink to="/todo" icon={<FaList />} label="To-Do" />
            <DashboardLink to="/inprogress" icon={<FaSpinner />} label="In Progress" />
            <DashboardLink to="/completed" icon={<FaCheckCircle />} label="Completed" />
            <DashboardLink to="/logout" icon={<FaSignOutAlt />} label="Logout" />
          </ul>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="lg:ml-72 w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white"
        >
          <Navbar />
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}

function DashboardLink({ to, icon, label }) {
  return (
    <li>
      <NavLink
        to={to}
        end={to === "/dashboard"} // Only match exactly for /dashboard
        className={({ isActive }) =>
          `flex items-center gap-3 px-6 py-3 hover:rounded-r-full w-full transition-all text my-2 font-medium 
          ${isActive ? "bg-[#FF7F00] rounded-r-full text-white shadow-lg" : "hover:bg-[#FF7F00] hover:text-gray-300"}`
        }
      >
        {icon} <span>{label}</span>
      </NavLink>
    </li>
  );
}

export default Dashboard;

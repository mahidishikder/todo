import { Link } from "react-router-dom";
import { FiGrid, FiClipboard, FiClock, FiCheckCircle } from "react-icons/fi"; // Importing icons

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6 fixed">
      <h2 className="text-2xl font-bold mb-6 text-center">Task Manager</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700">
            <FiGrid className="text-lg" /> <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/tasks" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700">
            <FiClipboard className="text-lg" /> <span>Tasks</span>
          </Link>
        </li>
        <li>
          <Link to="/in-progress" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700">
            <FiClock className="text-lg" /> <span>To Do</span>
          </Link>
        </li>
        <li>
          <Link to="/in-progress" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700">
            <FiClock className="text-lg" /> <span>In Progress</span>
          </Link>
        </li>
        <li>
          <Link to="/completed" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700">
            <FiCheckCircle className="text-lg" /> <span>Completed</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

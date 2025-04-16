import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaUserGraduate } from "react-icons/fa";

const menuItems = [
  { icon: FaHome, text: "Dashboard", path: "/" },
  { icon: FaUserGraduate, text: "Attendance", path: "/classes" },
];

const Sidebar = () => {
  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 bg-indigo-900 text-white h-screen sticky top-0"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold">AttendEase</h2>
        <p className="text-indigo-300 text-sm">Teacher Portal</p>
      </div>

      <nav className="mt-6">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center py-3 px-6 transition-colors ${
                    isActive
                      ? "bg-indigo-800/50 border-r-4 border-white"
                      : "hover:bg-indigo-800/30"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <motion.div
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      className="mr-3"
                    >
                      <item.icon />
                    </motion.div>
                    <span>{item.text}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="bg-indigo-800/50 rounded-lg p-4">
          <p className="text-sm">Need help?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 text-xs bg-white text-indigo-900 px-3 py-1 rounded-full font-medium"
          >
            Contact Support
          </motion.button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;

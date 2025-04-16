import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { format } from "date-fns";

const Header = () => {
  const today = format(new Date(), "EEEE, MMMM do, yyyy");

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          Teacher Dashboard
        </h1>
        <p className="text-sm text-gray-500">{today}</p>
      </div>

      <div className="flex items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center cursor-pointer"
        >
          <FaUserCircle className="text-gray-600 text-2xl mr-2" />
          <span className="font-medium">Ms. Johnson</span>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;

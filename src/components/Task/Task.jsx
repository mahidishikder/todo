import { IoCreateOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { useContext, useState } from "react";
import useTask from "../../hooks/useTask";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";

// Reusable Task Card Component
const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div
      key={task._id}
      className="bg-white dark:bg-gray-600 p-6 rounded-lg shadow-lg my-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl border-l-4 border-[#FF8918] dark:border-[#FF8918]"
    >
      <div className="flex justify-between items-start">
        <h4 className="font-semibold text-xl text-gray-800 dark:text-white mb-2">
          {task.taskName}
        </h4>
        <button
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
          aria-label="More options"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
        {task.taskDescription}
      </p>
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
          {task.category}
        </span>
        <div className="mt-4 text-sm text-gray-500">
                <p>Date: {new Date(task.createdAt).toLocaleDateString()}</p>
                <p>Time: {new Date(task.createdAt).toLocaleTimeString()}</p>
              </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => onEdit(task)}
          className="text-sm text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-sm text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

function Task() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [category, setCategory] = useState("To-Do");
  const [tasks, refetch] = useTask();
  const [editingTask, setEditingTask] = useState(null);
  const { user } = useContext(AuthContext);
  const email = user && user.email;

  // Filter tasks by the logged-in user's email
  const filteredTasks = tasks.filter((task) => task.email === email);

  const handleEdit = (task) => {
    setTaskName(task.taskName);
    setTaskDescription(task.taskDescription);
    setCategory(task.category);
    setEditingTask(task); // Store the task being edited
    toggleModal(); // Open the modal
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!taskName || taskName.length > 50) {
      alert("Task Name is required and should not exceed 50 characters.");
      return;
    }

    // Create new task object
    const taskData = {
      taskName,
      taskDescription,
      category,
      createdAt: new Date().toLocaleString(),
      email,
    };

    try {
      if (editingTask) {
        // Update task logic
        const response = await fetch(`http://localhost:5000/tasks/${editingTask._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        });

        if (response.ok) {
          await refetch();
          resetForm();
          toggleModal();
        } else {
          alert("Failed to update task, please try again.");
        }
      } else {
        // Create task logic
        const response = await fetch("http://localhost:5000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        });

        if (response.ok) {
          await refetch();
          resetForm();
          toggleModal();
        } else {
          alert("Failed to create task, please try again.");
        }
      }
    } catch (error) {
      console.error("Error while submitting task:", error);
      alert("An error occurred, please try again.");
    }
  };

  const resetForm = () => {
    setTaskName("");
    setTaskDescription("");
    setCategory("To-Do");
    setEditingTask(null);
  };

  // Handle task deletion
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          await refetch(); // Refetch tasks after successful deletion
          Swal.fire("Deleted!", "Your task has been deleted.", "success");
        } else {
          Swal.fire("Failed!", "Failed to delete the task, please try again.", "error");
        }
      }
    } catch (error) {
      console.error("Error while deleting task:", error);
      Swal.fire("Error!", "An error occurred, please try again.", "error");
    }
  };

  // Open modal with a specific category
  const openModalWithCategory = (category) => {
    setCategory(category);
    toggleModal();
  };

  // Filter tasks by category and email
  const getTasksByCategory = (category) => {
    return filteredTasks.filter((task) => task.category === category);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 dark:text-white shadow-md w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold">Tasks</h2>
        <button
          className="bg-[#FF7F00] flex gap-2 justify-center items-center text-white px-5 py-2.5 rounded-lg hover:bg-[#ffbb00] transition shadow-md"
          onClick={toggleModal}
        >
          <IoCreateOutline className="text-white text-lg" />
          Create Task
        </button>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {["To-Do", "In Progress", "Completed"].map((cat) => (
          <div key={cat}>
            {/* Category Header */}
            <div className="p-5 bg-gray-100 dark:bg-gray-700 dark:text-white border-l-4 border-[#FF7F00] rounded-lg shadow-md flex justify-between items-center w-full">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-[#FF7F00] text-white rounded-full text-sm font-bold">
                  {cat[0]}
                </span>
                <h3 className="text-lg font-semibold text-[#FF7F00]">{cat}</h3>
              </div>
              <FaPlus
                onClick={() => openModalWithCategory(cat)}
                className="text-gray-500 dark:text-gray-300 cursor-pointer hover:text-[#FF7F00] transition transform hover:scale-110"
              />
            </div>

            {/* Task Cards */}
            {getTasksByCategory(cat).map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Modal for Task Creation/Edit */}
      <dialog id="createTaskModal" className={`modal ${isModalOpen ? "modal-open" : ""}`}>
        <div className="modal-box bg-white dark:bg-gray-800 dark:text-white">
          <h2 className="text-2xl font-semibold mb-4">
            {editingTask ? "Edit Task" : "Create New Task"}
          </h2>

          {/* Modal Content */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="taskName"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                Task Name
              </label>
              <input
                type="text"
                id="taskName"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7F00] dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Enter task name"
                maxLength={50}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="taskDescription"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                Task Description
              </label>
              <textarea
                id="taskDescription"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7F00] dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Enter task description"
                rows="4"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7F00] dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              >
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={toggleModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#FF7F00] text-white px-4 py-2 rounded-md hover:bg-[#FF8918]"
              >
                {editingTask ? "Update Task" : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Task;
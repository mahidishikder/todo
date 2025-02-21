
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useTask from "../../hooks/useTask";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify"; // Import toast for notifications

function Compleate() {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const [tasks, refetch] = useTask();
  const [selectedTask, setSelectedTask] = useState(null);

  // ✅ Function to delete a task
  const handleDelete = async (_id) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Task deleted successfully!");
        refetch(); // Refresh the task list after deletion
      } else {
        toast.error("Failed to delete task!");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Something went wrong!");
    }
  };

  // ✅ Function to open modal and set current time
  const openUpdateModal = (task) => {
    setSelectedTask(task);
    document.getElementById("updateModal").showModal(); // Open modal
  };

  // ✅ Function to handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    const updatedTask = {
      taskName: e.target.taskName.value,
      taskDescription: e.target.taskDescription.value,
      category: e.target.category.value,
      createdAt: new Date().toISOString(), // Only update the updated time
    };

    try {
      const response = await fetch(`http://localhost:5000/tasks/${selectedTask._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        toast.success("Task updated successfully!");
        refetch(); // Refresh the task list after update
        document.getElementById("updateModal").close(); // Close modal
      } else {
        toast.error("Failed to update task!");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Todo</h1>

      {/* Task Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks
          ?.filter((task) => task.category === "Completed" && task.email === email)
          .map((task) => (
            <div
              key={task._id}
              className="p-6 bg-gray-300 shadow-xl rounded-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-[#FF7F00]">
                {task.taskName}
              </h3>
              <p className="text-gray-600 mt-2">{task.taskDescription}</p>
              <div className="mt-4 text-sm text-gray-500">
                <p>Date: {new Date(task.createdAt).toLocaleDateString()}</p>
                <p>Time: {new Date(task.createdAt).toLocaleTimeString()}</p>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => openUpdateModal(task)}
                  className="p-2 bg-[#FF7F00] text-white rounded-md w-full flex justify-center items-center gap-2"
                >
                  <FaEdit /> Update
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="p-2 bg-red-400 text-white rounded-md w-full flex justify-center items-center gap-2"
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* ✅ DaisyUI Modal for updating task */}
      <dialog id="updateModal" className="modal">
        <div className="modal-box">
          <h2 className="text-xl font-bold mb-4">Update Task</h2>
          {selectedTask && (
            <form onSubmit={handleUpdate} className="space-y-4">
              {/* Task Name */}
              <input
                type="text"
                name="taskName"
                defaultValue={selectedTask.taskName}
                className="input input-bordered w-full"
                required
              />

              {/* Task Description */}
              <textarea
                name="taskDescription"
                defaultValue={selectedTask.taskDescription}
                className="textarea textarea-bordered w-full"
                required
              ></textarea>

              {/* Category Dropdown */}
              <select
                name="category"
                defaultValue={selectedTask.category}
                className="select select-bordered w-full"
                required
              >
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-error"
                  onClick={() => document.getElementById("updateModal").close()} // Close modal
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Update
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
}

export default Compleate;

'use client'

interface Task {
    id: string
    title: string
    description: string | null
    completed: boolean
    createdAt: string
}

interface TaskListProps {
    tasks: Task[]
    onTaskUpdated: () => void
}

export default function TaskList({tasks, onTaskUpdated}: TaskListProps) {
    const toggleComplete = async (taskId: string, completed: boolean) => {
        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify({completed: !completed})
            })

            if (response.ok) {
                onTaskUpdated()
            } else {
                alert('Failed to update tasks')
            }
        } catch(error){
            alert(`Failed to update task ${error}`)
        }
    }

    const deleteTask = async(taskId: string) => {
        try{
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE'
            })

            if(response.ok){
                onTaskUpdated()
            } else {
            alert('Failed to delete task')
            }
        } catch(error){
            alert(`Failed to delete task ${error}`)
        }
    }

    if (tasks.length === 0){
        return (
            <div className="bg-white rounded-lg shadow p-8 text-center">
                <h2 className="text-gray-900 font-semibold text-xl mb-4">No Tasks yet</h2>
                <p className="text-gray-600"> Create your first task above to get started</p>
            </div>
        )
    }

    return (
      <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {task.title}
              </h3>
              {task.description && (
                <p className="text-gray-600 mb-3">
                  {task.description}
                </p>
              )}
              <p className="text-sm text-gray-400">
                Created {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>
            
            <div className="ml-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                task.completed 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {task.completed ? 'Completed' : 'Pending'}
              </span>

              <button
              onClick={() => toggleComplete(task.id, task.completed)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${task.completed ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>

            </div>
          </div>
        </div>
      ))}
    </div>
    )
}
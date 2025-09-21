'use client'
import { useState, useEffect } from "react"
import TaskForm from "@/components/TaskForm"
import TaskList from "@/components/TaskList"
interface Task {
  id: string
  title: string
  description: string | null
  completed: boolean
  createdAt: string
  updatedAt: string
}

export default function HomePage(){
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks')
      if (response.ok) {
        const taskData = await response.json()
        setTasks(taskData)
      }
    } catch(error) {
      console.error('Failed to fetch tasks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const remainingTasks = totalTasks - completedTasks

  if (isLoading) {
    return (
       <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <p className="text-xl text-gray-600">Loading your tasks...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-8" >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Task Manger
          </h1>
          <p className="text-gray-600">
            Stay Organized and get things done
          </p>
        </header>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Total Tasks
          </h3>
          <p className="text-3xl font-bold text-blue-600">{totalTasks}</p>
        </div>
         <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Completed
        </h3>
        <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Remaining
        </h3>
        <p className="text-3xl font-bold text-orange-600">{remainingTasks}</p>
      </div>
    </div>

    <div className="bg-white rounded-lg shadow p-8 text-center">
      <h2 className="text-gray-900 text-xl font-semibold mb-4">
        Your tasks will appear here
      </h2>
      <p className="text-gray-600">
        add in next step
      </p>
    </div>

    <TaskForm onTaskCreated={fetchTasks} />

    <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />

  </div>
)
}
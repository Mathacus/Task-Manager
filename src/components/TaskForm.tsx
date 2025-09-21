'use client'

import { useState } from "react"

interface TaskFormProps {
    onTaskCreated: () => void
}

export default function TaskForm({onTaskCreated}: TaskFormProps){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if(!title.trim()) return

        setIsSubmitting(true)

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ title, description })
            })

            if (response.ok) {
                setTitle('')
                setDescription('')
                onTaskCreated()
            } else {
                const error = await response.json()
                alert(`Error: ${error.error}`)
            }
        } catch(error) {
            alert('Failed to create task')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Add new task
            </h2>
            
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                </label>
                <input 
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    required
                    className="border-gray-300 w-full px-3 py-2 border rounded-md focus:outline-none text-gray-900"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                </label>
                <textarea 
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Additional details (optional)"
                    className="text-gray-900 border border-gray-300 w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting || !title.trim()}
                className="bg-blue-600 w-full text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none foucs:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Adding...': 'Add Task'}
            </button>
        </form>
    )
}
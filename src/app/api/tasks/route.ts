import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try{
        const tasks = await prisma.task.findMany({
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json(tasks)

    }catch(error){
        console.error('Error fetching tasks: ', error)

        return NextResponse.json(
            {error: 'Failed to fetch tasks'},
            {status: 500}
        )
        
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { title, description } = body

        if(!title || title.trim() ===''){
            return NextResponse.json(
                {error: 'Title is required'},
                {status: 400}
            )
        }

        const task = await prisma.task.create({
            data: {
                title: title.trim(),
                description: description?.trim() || null
            }
        })

        return NextResponse.json(task, { status: 201 })

    } catch(error) {
        console.error('Error creating task: ', error)
        return NextResponse.json(
            {error:'Failed to create task'},
            {status: 500}
        )
    }
}
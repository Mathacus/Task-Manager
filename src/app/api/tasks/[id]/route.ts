import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    request: Request,
    { params } : { params: {id: string}}
) {
    try{
        const { id } = params
        const body = await request.json()
        const { completed } = body

        const task = await prisma.task.update({
            where: { id },
            data: { completed }
        })

        return NextResponse.json(task)
        
    } catch (error) {
        console.error('Error updating task: ', error)
        return NextResponse.json(
            {error: 'Failed to update task'},
            {status: 500}
        )
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: {id: 'string'} }
){
    try {
        const { id } = params
        
        await prisma.task.delete({
            where: { id }
        })

        return NextResponse.json({ message: 'Task deleted successfully'})

    } catch (error) {
        console.error('Error deleted task: ', error)
        return NextResponse.json(
            {error: 'Failed to deleted task'},
            {status: 500}
        )
    }
}
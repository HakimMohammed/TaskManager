interface Task {
    id : string,
    userId: string,
    title: string,
    description: string,
    status: string,
    dueDate: Date,
    priority: number,
    createdAt: Date,
    updatedAt: Date,
}

export default Task;
function ListTodoComponent() {

    const today = new Date();
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay())

    const todoList = [
        {id: 1, description: "Morning affirmations reading.", done: false, targetDate: targetDate},
        {id: 2, description: "Get to morning gym session", done: false, targetDate: targetDate},
        {id: 3, description: "Get to work, complete daily stand-ups, and work on the next feature.", done: false, targetDate: targetDate},
        {id: 4, description: "Finish at work, head to grocery store.", done: false, targetDate: targetDate},
        {id: 5, description: "Prepare and cook dinner.", done: false, targetDate: targetDate}
    ]

    return (
        <div className="container">
            <h1>Your agenda for the day!</h1>
            <div>
                Your List of To-Do items :

                <table className="table">
                    <thead>
                    <tr>
                        <td>Id</td>
                        <td>Description</td>
                        <td>Completed?</td>
                        <td>Target Date</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        todoList.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toDateString()}</td>
                                </tr>
                            )
                        )
                    }
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default ListTodoComponent
import { useContext } from "react";
import { employeeContext, taskContext, kanbanBoardColumnContext } from "../App";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Draggable } from "react-beautiful-dnd";

function Card({ index, task }) {
    const { id, title, description, assignee } = task;
    const { employees } = useContext(employeeContext);
    const { tasks, setTasks } = useContext(taskContext);
    const { kanbanBoardColumns, setKanbanBoardColumns } = useContext(kanbanBoardColumnContext);
    const assigneeData = employees.find((emp) => emp.id == assignee);
    const assigneeName = assigneeData?.name || 'Unassigned';

    const getNameInitials = (name) => {
        if (!name) return "";
        return name
            .split(' ')
            .map(el => el.charAt(0))
            .join('')
            .toUpperCase();
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        // Remove task from tasks
        setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
        // Remove task from kanbanBoardColumns
        setKanbanBoardColumns(prevColumns =>
            prevColumns.map(column => ({
                ...column,
                tasks: column.tasks.filter(taskId => taskId !== id)
            }))
        );
    };



    return (
        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
            {
                (provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="w-full"
                    >
                        <div className={`w-full bg-white rounded-lg p-2 flex flex-col gap-2 justify-between shadow-sm hover:shadow-md transition-shadow ${snapshot.isDragging ? 'border-2 border-blue-500 rounded-lg' : ''}`}>
                            <div>
                                <h3 className="text-sm font-semibold">{title}</h3>
                                <p className="text-xs text-gray-600 mt-1">{description}</p>
                            </div>

                            <div className="w-full flex justify-between items-center mt-2">
                                <div className="flex items-center gap-2">
                                    <div className="bg-green-100 rounded-full h-6 w-6 flex justify-center items-center text-xs font-semibold text-green-900">
                                        {getNameInitials(assigneeName)}
                                    </div>
                                    <div className="text-sm">
                                        {assigneeName.charAt(0).toUpperCase() + assigneeName.slice(1)}
                                    </div>
                                </div>

                                <button
                                    className="bg-black rounded-lg p-1 hover:bg-red-500 transition-colors"
                                    onClick={handleDelete}
                                >
                                    <XMarkIcon className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </Draggable>
    );
}

export default Card;
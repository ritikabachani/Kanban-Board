import { XMarkIcon } from "@heroicons/react/24/solid";
import Card from "./Card";
import { useContext } from "react";
import { taskContext } from "../App";
import { Droppable } from "react-beautiful-dnd";

function Column({ column, tasks }) {
    const { title, id } = column;

    return (
        <div className="h-full w-[224px] bg-slate-100 rounded-lg flex flex-col">
            <div className="p-1 px-3 flex justify-between items-center bg-slate-200 rounded-t-lg">
                <h2 className="text-md font-semibold">{title}</h2>
                <span className="bg-black text-white px-1 py-0.5 text-xs font-bold rounded-md">
                    {column.tasks.length}
                </span>
            </div>

            <Droppable droppableId={id.toString()}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}    
                        ref={provided.innerRef}
                        className={`flex-1 flex flex-col gap-4 p-2 overflow-y-auto min-h-[100px] ${snapshot.isDraggingOver ? 'border-2 border-blue-500 border-dashed' : ''
                            }`}
                    >
                        {column.tasks.map((taskId, index) => {
                            const currentTask = tasks.find(task => task.id === taskId);
                            if (!currentTask) return null;

                            return (
                                <Card
                                    key={taskId}
                                    index={index}
                                    task={currentTask}
                                />
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

export default Column;
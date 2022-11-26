import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCompletedTodo, selectUncompletedTodo } from "../../features/todos/selectors";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeStatus } from "../../features/todos/todoSlice";
import { fetchTodoUpdate } from "../../features/todos/todoSlice";

import { Board, boards } from "./boards";
import { TaskCard } from "./TaskCard";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";

import "./todoItem.scss";

export function TodoItem() {
  const appDispatch = useAppDispatch();

  const completedTodo = useSelector(selectCompletedTodo);
  const uncompletedTodo = useSelector(selectUncompletedTodo);

  useEffect(() => {
    boards[0].tasks = uncompletedTodo;
    boards[1].tasks = completedTodo;
  }, []);

  const [data, setData] = useState<Board[]>(boards);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const destinationColIndex = data.findIndex((e) => e.id === destination.droppableId);

      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = sourceTask;
      data[destinationColIndex].tasks = destinationTask;

      appDispatch(changeStatus(removed.id));
      appDispatch(fetchTodoUpdate(removed.id));

      setData(data);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="columnsWrap">
        {data.map((column) => (
          <StrictModeDroppable key={column.id} droppableId={column.id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                className="section"
                ref={provided.innerRef}>
                <div className="columnTitle">{column.title}</div>
                <div className="column">
                  {column.tasks.map((task, index) => (
                    <Draggable
                      key={task.id.toString()}
                      draggableId={task.id.toString()}
                      index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? "0.8" : "1",
                            marginBottom: "10px",
                          }}>
                          <TaskCard><p>{task.title}</p></TaskCard>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </StrictModeDroppable>
        ))}
      </div>
    </DragDropContext>
  );
};


// export function TodoItem({ id, title, completed }: TodoItemProps) {
//   const dispatch = useAppDispatch();

//   return (
//     <li>
//       <input
//         type="checkbox"
//         checked={completed}
//         onChange={() => dispatch(toggleStatus(id))}
//       />
//       <span>{title}</span>
//     </li>
//   )
// }

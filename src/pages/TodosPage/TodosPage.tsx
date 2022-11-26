import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Spinner } from '../../components/Skeleton/Skeleton';
import { TodoItem } from '../../components/TodoBoard/TodoItem';
import { fetchTodos } from '../../features/todos/todoSlice';

export default function TodosPage() {
  const { loading, error } = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {loading ? <Spinner /> : <TodoItem />}
      </div>
      {error && <p>An error occured: {error}</p>}
    </>
  )
}

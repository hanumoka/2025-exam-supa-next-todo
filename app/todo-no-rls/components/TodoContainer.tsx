"use client";

import useTodosController from "@/app/hooks/useTodosController";
import TodoList from "@/components/ui/TodoList";
import React from "react";

const TodoContainer = () => {
  const {
    loading,
    todos,
    onCreateEmptyTodos,
    onDeleteTodos,
    onSearchTodos,
    onUpdateTodos,
  } = useTodosController();
  return (
    <div>
      <TodoList
        sharedUserFullName="test user"
        ownerUserId="123123"
        loading={loading}
        todoListData={todos}
        isReadOnly={false}
        onUpdate={onUpdateTodos}
        onCreate={onCreateEmptyTodos}
        onDelete={onDeleteTodos}
        onSearch={onSearchTodos}
      />
    </div>
  );
};

export default TodoContainer;

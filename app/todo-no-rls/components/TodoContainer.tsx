"use client";

import useTodosController from "@/app/hooks/useTodosController";
import TodoList from "@/components/ui/TodoList";
import React from "react";

const TodoContainer = () => {
  const { loading, todos } = useTodosController();
  return (
    <div>
      <TodoList
        sharedUserFullName="test user"
        ownerUserId="123123"
        loading={loading}
        todoListData={todos}
      />
    </div>
  );
};

export default TodoContainer;

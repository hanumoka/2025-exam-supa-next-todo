"use client";

import useTodosController from "@/app/hooks/useTodosController";
import TodoList from "@/components/ui/TodoList";
import React, { useEffect } from "react";

const TodoContainer = () => {
  const { loading, todos } = useTodosController();
  return (
    <div>
      <TodoList sharedUserFullName="test user" ownerUserId="123123" />
    </div>
  );
};

export default TodoContainer;

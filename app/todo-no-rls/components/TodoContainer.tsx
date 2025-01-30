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
        isReadOnly={false}
        onUpdate={(id, content) => {
          console.log(">> onUpdate id: {}, content: {}", id, content);
        }}
        onCreate={() => {
          console.log(">> onCreate ...");
        }}
        onDelete={(id) => {
          console.log(">> onDelete id: {}", id);
        }}
        onSearch={(terms) => {
          console.log(">> onSearch terms: {}", terms);
        }}
      />
    </div>
  );
};

export default TodoContainer;

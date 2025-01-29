"use client";

import useTodosController from "@/app/hooks/useTodosController";
import React, { useEffect } from "react";

const TodoContainer = () => {
  const { loading, todos } = useTodosController();

  console.log(">>> loading", loading);
  console.log(">>> todos", todos);

  return <div>TodoContainer</div>;
};

export default TodoContainer;

import React from "react";

const TodoListItem = ({ todo }) => {
  return <li>{todo?.content}</li>;
};

export default TodoListItem;

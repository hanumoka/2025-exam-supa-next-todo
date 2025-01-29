import { sleep } from "@/lib/utils";
import React from "react";
import TodoContainer from "./components/TodoContainer";

const Page = async () => {
  return (
    <div>
      Page
      <TodoContainer />
    </div>
  );
};

export default Page;

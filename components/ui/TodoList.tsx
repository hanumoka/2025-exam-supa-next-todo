"use client";
import React, { useState } from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { useCopyToClipboard } from "usehooks-ts";
import { IoSearchOutline } from "react-icons/io5";
import TodoListItem from "./TodoListItem";
import { TodoDto } from "@/app/todo-no-rls/hook/useTodosController";

interface TodoListProps {
  sharedUserFullName?: string;
  ownerUserId?: string;
  loading?: boolean;
  todoListData?: TodoDto[];
  isReadOnly?: boolean;
  onCreate?: () => void;
  onUpdate?: (id: number, content: string) => void;
  onDelete?: (id: number) => void;
  onSearch?: (terms: string) => void;
}

const TodoList = ({
  sharedUserFullName = "",
  ownerUserId = "",
  loading = false,
  todoListData = [],
  isReadOnly = false,
  onCreate = () => {},
  onUpdate = (id, updatedContent) => {},
  onDelete = (id) => {},
  onSearch = (terms) => {},
}: TodoListProps) => {
  const [userSearchInput, setUserSearchInput] = useState("");
  const [copiedText, copy] = useCopyToClipboard();

  const handleCopy = () => {
    const shareLink = `${"todoList공유할 링크"}/share/${ownerUserId}`;
    copy(shareLink)
      .then(() => {
        console.log("Copied!< " + shareLink);
      })
      .catch((error) => {
        console.log("Copy failed!", error);
      });
  };

  const handleSearch = () => {
    onSearch(userSearchInput);
    setUserSearchInput("");
  };

  return (
    <section className=" min-h-[70vh] bg-[#69CFCF]">
      <div className=" w-full max-w-[800px] p-[20px] mx-auto">
        <article className=" flex flex-row justify-between items-center">
          <div className=" font-bold text-[32px]">
            {sharedUserFullName && <div>{sharedUserFullName}</div>}
            Things to do:
          </div>
          {ownerUserId && (
            <div
              onClick={() => handleCopy()}
              className=" font-bold text-[20px] flex flex-row items-center cursor-pointer"
            >
              Share
              <IoShareSocialOutline />
            </div>
          )}
        </article>
        {!isReadOnly && (
          <article className=" flex flex-col sm:flex-row gap-4 mt-8">
            <div className=" flex flex-1 h-[60px]">
              <input
                value={userSearchInput}
                onChange={(e) => setUserSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                type="text"
                className="p-4 
                  flex-1 
                bg-[#F7CB66]
                  border border-black rounded-l-2xl font-bold"
              />
              <div
                onClick={handleSearch}
                className="w-[60px] flex justify-center items-center
             bg-black rounded-r-2xl cursor-pointer"
              >
                <IoSearchOutline size={40} color="#fff" />
              </div>
            </div>
            <div
              onClick={onCreate}
              className="h-[60px] 
                        w-[200px] 
                        flex 
                        justify-center 
                        items-center 
                        bg-[#7EBB95]
                        border border-black rounded-2xl
                        font-bold cursor-pointer text-[20px]
                        "
            >
              New Task
            </div>
          </article>
        )}
        <div className=" h-[2px] my-10 bg-black"></div>
        {todoListData?.length >= 1 ? (
          <ul className="flex flex-col gap-6">
            {(todoListData ?? []).map((todo) => {
              return (
                <TodoListItem
                  key={todo?.id}
                  todo={todo}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                ></TodoListItem>
              );
            })}
          </ul>
        ) : (
          <div>{loading ? "Loading..." : "Empty!"}</div>
        )}
      </div>
    </section>
  );
};

export default TodoList;

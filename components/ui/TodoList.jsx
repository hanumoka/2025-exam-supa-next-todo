import React from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { useCopyToClipboard } from "usehooks-ts";

const TodoList = ({ sharedUserFullName = "", ownerUserId = "" }) => {
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
      </div>
    </section>
  );
};

export default TodoList;

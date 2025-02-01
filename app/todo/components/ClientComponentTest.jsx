"use client";
import { pingAction } from "@/actions/ping/ping.action";
import React from "react";

const ClientComponentTest = () => {
  const handleClick = async () => {
    // 서버액션을 클라이언트 컴포넌트에서 호추랗면 해당 코드는 클라이언트 에서 동작한다.
    // 하지만 동작이 재밌는데, 컴파일 타임에 next.js 가 뭔짓을 해서 클라이언트 컴포넌트에서 호출하는 ServerAction을 RestApi 만들어 버린다.
    // 아래 버튼을 클릭하게되면 RestApi 가 호출되고 서버에서 해당 액션을 실행하게 된다.
    const result = await pingAction(); // Restapi로 서버 액션을 호출
    console.log(result); // 브라우저 콘솔에 출력
  };

  return (
    <div>
      ClientComponentTest
      <br />
      <button onClick={handleClick}>Test Server Action</button>
    </div>
  );
};

export default ClientComponentTest;

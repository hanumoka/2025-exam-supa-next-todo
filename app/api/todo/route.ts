import { getTodoAction } from "@/actions/todo/todo.action";
import { createServerSideClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export const GET = async () => {
  // const supabase = await createServerSideClient();

  // const result = await supabase
  //   .from("todos_no_rls")
  //   .select("*")
  //   .is("deleted_at", null)
  //   .order("id", { ascending: false });

  // console.log("todo GET API income, {}", result);

  const result = await getTodoAction();

  return NextResponse.json({ ...result });
};

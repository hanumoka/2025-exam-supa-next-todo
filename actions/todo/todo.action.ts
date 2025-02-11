"use server";

import { createServerSideClient } from "@/lib/supabase";

// todolist 가져오기
export const getTodos = async () => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from("todos_with_rls")
    .select("*")
    .is("deleted_at", null)
    .order("id", { ascending: false });

  return result.data;
};

// todolist 가져오기 + by id
export const getTodosById = async (id: number) => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from("todos_with_rls")
    .select("*")
    .is("deleted_at", null)
    .eq("id", id);

  return result.data;
};

// todoList 가져오기 + search
export const getTodosBySearch = async (terms: string) => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from("todos_with_rls")
    .select("*")
    .is("deleted_at", null)
    .ilike("content", `%${terms}%`)
    .order("id", { ascending: false })
    .limit(500);

  return result.data;
};

// todoList 생성하기
export const createTodos = async (content: string) => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from("todos_with_rls")
    .insert({ content })
    .select();

  console.log("result", result);

  return result.data;
};

// todoList 수정하기
export const updateTodos = async (id: number, content: string) => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from("todos_with_rls")
    .update({ content, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select();

  console.log("result", result);

  return result.data;
};

// todoList 삭제하기 soft delete
export const deleteTodosSoft = async (id: number) => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from("todos_with_rls")
    .update({
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select();

  return result.data;
};

// export const getTodoAction = async () => {
//   console.log("pingAction income");
//   const supabase = await createServerSideClient();

//   const result = await supabase
//     .from("todos_with_rls")
//     .select("*")
//     .is("deleted_at", null)
//     .order("id", { ascending: false });

//   console.log("getTodoAction GET API income, {}", result);

//   return result.data;
// };

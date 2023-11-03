import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task, TasksResponse } from "../../features/types";

const baseApiUrl = "http://localhost:8080/";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseApiUrl }),
  tagTypes: ["Task"],
  endpoints: (build) => ({
    getTasks: build.query<TasksResponse, void>({
      query: () => "tasks",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Task", id } as const)),
              { type: "Task", id: "LIST" },
            ]
          : [{ type: "Task", id: "LIST" }],
    }),

    addTask: build.mutation<Task, Partial<Task>>({
      query(body) {
        return {
          url: `tasks`,
          method: "POST",
          body,
        };
      },
      onQueryStarted: (body, { dispatch, queryFulfilled }) => {
        const updateTaskData = (draft: TasksResponse) => {
          draft.unshift({
            id: Math.floor(Math.random() * 1000),
            text: body.text!,
            completed: false,
            createdDate: Date.now(),
          });
        };

        const patchResult = dispatch(
          tasksApi.util.updateQueryData("getTasks", undefined, updateTaskData)
        );

        queryFulfilled.catch(() => patchResult.undo);
      },
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),

    updateTaskStatus: build.mutation<Task, Partial<Task>>({
      query({ id, completed }) {
        const url = `tasks/${id}/${completed ? "complete" : "incomplete"}`;
        return {
          url,
          method: "POST",
        };
      },
      // trying async/await
      async onQueryStarted(
        { id: taskId, completed },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          tasksApi.util.updateQueryData(
            "getTasks",
            undefined,
            (draft: TasksResponse) => {
              const task: Task | undefined = draft.find(
                (task: Task) => task.id === taskId
              );
              if (task !== undefined) {
                task.completed = !!completed;

                if (completed) {
                  task.completedDate = Date.now();
                } else {
                  task.completedDate = undefined;
                }
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    updateTask: build.mutation<Task, Partial<Task>>({
      query({ id, text }) {
        return {
          url: `tasks/${id}`,
          method: "POST",
          body: { text },
        };
      },
      onQueryStarted({ id, text }, { dispatch }) {
        const updateTaskData = (draft: TasksResponse) => {
          const task = draft.find((task) => task.id === id);
          if (task) {
            task.text = text || task.text;
          }
        };

        dispatch(
          tasksApi.util.updateQueryData("getTasks", undefined, updateTaskData)
        );
      },
      invalidatesTags: (_res, _err, { id }) => [{ type: "Task", id }],
    }),

    deleteTask: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `tasks/${id}`,
          method: "DELETE",
        };
      },
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        const updateTaskData = (draft: TasksResponse) => {
          const index = draft.findIndex((task) => task.id === id);
          if (index !== -1) {
            draft.splice(index, 1);
          }
        };

        const patchResult = dispatch(
          tasksApi.util.updateQueryData("getTasks", undefined, updateTaskData)
        );

        queryFulfilled.catch(() => patchResult.undo);
      },
      invalidatesTags: (_res, _err, id) => [{ type: "Task", id }],
    }),
  }),
});

export const {
  endpoints,
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
} = tasksApi;

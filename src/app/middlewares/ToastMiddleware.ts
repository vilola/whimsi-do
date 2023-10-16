import { createStandaloneToast } from "@chakra-ui/react";
import {
  type MiddlewareAPI,
  type Middleware,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

import { endpoints } from "../services/tasksApi";

const { toast } = createStandaloneToast();

type ToastProps = {
  type: "success" | "error" | "info" | "warning";
  id?: string;
  title: string;
  description?: string;
};
const showToast = ({ type, id, title, description }: ToastProps) => {
  toast({
    title: title,
    description: description ? description : undefined,
    id: id,
    status: type,
    duration: 1500,
    isClosable: true,
    position: "bottom-right",
  });
};

const ToastMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      console.warn("We got a rejected action!");
      showToast({
        title: "Async error!",
        description: action.error.data.message,
        type: "error",
      });
    }

    // GET TASKS

    if (endpoints.getTasks.matchPending(action)) {
      console.log("Fetching tasks...");
      showToast({
        title: `Fetching tasks...`,
        type: "info",
      });
    }

    if (endpoints.getTasks.matchFulfilled(action)) {
      console.log("Tasks fetched successfully!");
      showToast({
        title: `Tasks fetched successfully!`,
        type: "success",
      });
    }

    // ADD TASK

    if (endpoints.addTask.matchPending(action)) {
      console.log("Todo added optimistically. Waiting for server reponse.");
      // showToast({
      //   title: `Todo added optimistically. Waiting for server reponse.`,
      //   type: "info",
      // });
    }

    if (endpoints.addTask.matchFulfilled(action)) {
      console.log("Todo added successfully!");
      showToast({
        title: `Todo added successfully!`,
        type: "success",
      });
    }

    // DELETE TASK

    if (endpoints.deleteTask.matchPending(action)) {
      console.log("Todo deleted optimistically. Waiting for server reponse.");
      // showToast({
      //   title: `Todo deleted optimistically. Waiting for server reponse.`,
      //   type: "info",
      // });
    }

    if (endpoints.deleteTask.matchFulfilled(action)) {
      console.log("Todo deleted successfully!");
      showToast({
        title: `Todo deleted successfully!`,
        type: "success",
      });
    }

    // UPDATE TASK

    if (endpoints.updateTask.matchPending(action)) {
      console.log("Todo updated optimistically. Waiting for server reponse.");
      // showToast({
      //   title: `Todo updated optimistically. Waiting for server reponse.`,
      //   type: "info",
      // });
    }

    if (endpoints.updateTask.matchFulfilled(action)) {
      console.log("Todo updated successfully!");
      showToast({
        title: `Todo updated successfully!`,
        type: "success",
      });
    }

    // UPDATE TASK STATUS

    if (endpoints.updateTaskStatus.matchPending(action)) {
      console.log(
        "Todo status updated optimistically. Waiting for server reponse."
      );
      // showToast({
      //   title: `Todo status updated optimistically. Waiting for server reponse.`,
      //   type: "info",
      // });
    }

    if (endpoints.updateTaskStatus.matchFulfilled(action)) {
      console.log("Todo status updated successfully!");
      showToast({
        title: `Todo status updated successfully!`,
        type: "success",
      });
    }

    return next(action);
  };

export default ToastMiddleware;

import { CheckIcon, SmallCloseIcon, DeleteIcon } from "@chakra-ui/icons";
import { Stack, Button } from "@chakra-ui/react";
import {
  useDeleteTaskMutation,
  useUpdateTaskStatusMutation,
} from "../../../app/services/tasksApi";
import { TasksResponse } from "../../types";

type StackButtonsActionsProps = {
  tasks?: TasksResponse;
  completeTasks?: TasksResponse;
  uncompleteTasks?: TasksResponse;
};

export const StackButtonsActions = ({
  tasks,
  completeTasks,
  uncompleteTasks,
}: StackButtonsActionsProps) => {
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const handleBulkDelete = (tasks?: TasksResponse) => {
    if (!tasks) return;
    tasks.forEach((task) => deleteTask(task.id));
  };

  const handleStatusChangeAll = (status: boolean, tasks?: TasksResponse) => {
    if (!tasks) return;
    tasks.forEach((task) => updateTaskStatus({ ...task, completed: status }));
  };
  return (
    <Stack spacing={2} direction="row" wrap="wrap" align="center" mb={4}>
      {completeTasks && completeTasks.length > 0 && (
        <Button
          leftIcon={<CheckIcon />}
          colorScheme="blue"
          size="sm"
          onClick={() => handleStatusChangeAll(true, completeTasks)}
        >
          Complete all
        </Button>
      )}
      {uncompleteTasks && uncompleteTasks.length > 0 && (
        <Button
          leftIcon={<SmallCloseIcon />}
          size="sm"
          onClick={() => handleStatusChangeAll(false, uncompleteTasks)}
        >
          Uncomplete all
        </Button>
      )}
      {tasks && tasks.length > 0 && (
        <Button
          leftIcon={<DeleteIcon />}
          colorScheme="red"
          size="sm"
          onClick={() => handleBulkDelete(tasks)}
        >
          Delete all
        </Button>
      )}
    </Stack>
  );
};

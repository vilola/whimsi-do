import { Flex, List, Spinner } from "@chakra-ui/react";

import { useGetTasksQuery } from "../../../app/services/tasksApi";
import { TasksResponse } from "../../types";

import { TaskItem } from "./Item";

type Props = {
  tasks?: TasksResponse;
};
export const TasksList = ({ tasks }: Props) => {
  const { isLoading } = useGetTasksQuery();

  if (isLoading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size="md" />
      </Flex>
    );
  }

  if (!tasks || tasks.length === 0) {
    return <div>No tasks here ...</div>;
  }

  return (
    <List variant="custom" spacing={3}>
      {tasks.map((task) => (
        <TaskItem key={task.id} {...task} />
      ))}
    </List>
  );
};

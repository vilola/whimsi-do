import { Flex, List, Spinner } from "@chakra-ui/react";
import { useGetTasksQuery } from "../../../app/services/tasksApi";
import { TaskItem } from "./Item";
import { TasksResponse } from "../../types";

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
      {tasks.map((task, index) => (
        <TaskItem key={index} {...task} />
      ))}
    </List>
  );
};

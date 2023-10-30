import { useMemo } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useGetTasksQuery } from "../../app/services/tasksApi";
import {
  Container,
  Box,
  Divider,
  Flex,
  Heading,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import { TasksList } from "./components/List";
import { TaskForm } from "./components/Form";
import { StackButtonsActions } from "./components/StackButtonsActions";
import { Task } from "../types";



export const Tasks = () => {
  const selectCompletedTodos = useMemo(() => {
    return createSelector(
      (inputData: Array<Task>) => inputData,
      (data: Array<Task>) => data?.filter((task: Task) => task.completed) ?? []
    );
  }, []);

  const selectInCompletedTodos = useMemo(() => {
    return createSelector(
      (inputData: Array<Task>) => inputData,
      (data: Array<Task>) => data?.filter((task: Task) => !task.completed) ?? []
    );
  }, []);

  const {
    data: allTasks, allCompletedTasks, allIncompletedTasks,
  } = useGetTasksQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      allCompletedTasks: selectCompletedTodos(result.data ?? []),
      allIncompletedTasks: selectInCompletedTodos(result.data ?? []),
    }),
  });

  return (
    <Box>
      <Flex bg="#011627" p={4} color="white">
        <Box>
          <Heading size="xl">Manage Tasks</Heading>
        </Box>
        <Spacer />
        <Box>
          <Stat>
            <StatLabel>Completed Tasks</StatLabel>
            <StatNumber>{allCompletedTasks?.length}</StatNumber>
          </Stat>
        </Box>
      </Flex>
      <Divider />
      <Container flex={1} maxW="container.lg">
        <Flex py={5}>
          <Box flex={10}>
            <TaskForm.Form id="addTask" />
          </Box>
          <Spacer />
          <Box>
            <TaskForm.SubmitBtn id="addTask" />
          </Box>
        </Flex>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>All tasks</Tab>
            <Tab>Completed tasks</Tab>
            <Tab>Uncompleted tasks</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <StackButtonsActions
                tasks={allTasks}
                completeTasks={allIncompletedTasks}
                uncompleteTasks={allCompletedTasks} />
              <TasksList tasks={allTasks} />
            </TabPanel>
            <TabPanel>
              <StackButtonsActions
                tasks={allCompletedTasks}
                uncompleteTasks={allCompletedTasks} />
              <TasksList tasks={allCompletedTasks} />
            </TabPanel>
            <TabPanel>
              <StackButtonsActions
                tasks={allIncompletedTasks}
                completeTasks={allIncompletedTasks} />
              <TasksList tasks={allIncompletedTasks} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};

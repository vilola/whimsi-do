import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  ListItem,
  Box,
  Checkbox,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import {
  useDeleteTaskMutation,
  useUpdateTaskStatusMutation,
} from "../../../app/services/tasksApi";
import { TaskForm } from "./Form";
import { Task } from "../../types";

export const TaskItem = (task: Task) => {
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  // MODAL
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ListItem
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box flex={1}>
          <Checkbox
            onChange={(e) =>
              updateTaskStatus({ ...task, completed: e.target.checked })
            }
            isChecked={task.completed}
          >
            {task.text}
          </Checkbox>
          <Text color="gray.400" fontSize="sm">
            {task.completedDate ? (
              <>
                Proudly completed on:{" "}
                {new Date(task.completedDate).toLocaleDateString()}
              </>
            ) : (
              <>
                Overlooked since:{" "}
                {new Date(task.createdDate).toLocaleDateString()}
              </>
            )}
          </Text>
        </Box>
        <IconButton
          marginRight={2}
          colorScheme="green"
          aria-label="Edit task"
          title="Edit task"
          icon={<EditIcon />}
          onClick={onOpen}
        />
        <IconButton
          colorScheme="red"
          aria-label="Delete task"
          title="Delete task"
          icon={<DeleteIcon />}
          onClick={() => deleteTask(task.id)}
        />
      </ListItem>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Task Text</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TaskForm.Form
              type="edit"
              task={task}
              id={`editTask-${task.id}`}
              resetForm={!isOpen}
              afterSubmit={onClose}
            />
          </ModalBody>
          <ModalFooter>
            <TaskForm.SubmitBtn type="edit" id={`editTask-${task.id}`} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

import { FormControl, Input, FormErrorMessage, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import {
  useAddTaskMutation,
  useUpdateTaskMutation,
} from "../../../app/services/tasksApi";
import { useEffect, useMemo } from "react";
import { Task } from "../../types";

type Props = {
  id: string;
  afterSubmit?: () => void;
  resetForm?: boolean;
} & (EditTaskProps | AddTaskProps);

type AddTaskProps = {
  type?: "add";
  task?: undefined;
};

type EditTaskProps = {
  type: "edit";
  task: Task;
};

type SubmitBtnProps = Pick<Props, "id" | "type">;

const Form = ({ ...props }: Props) => {
  const { id, afterSubmit, resetForm, type } = props;

  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const formDefaultValues = useMemo(() => {
    return { text: type === "edit" ? props.task.text : "" };
  }, [type, props.task]);

  const {
    handleSubmit,
    register,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<Task>({ defaultValues: formDefaultValues });

  const onSubmit = handleSubmit((data) => {
    if (type === "edit") {
      return updateTask({ ...props.task, ...data }).then(() => {
        afterSubmit && afterSubmit();
      });
    } else {
      return addTask(data).then(() => {
        reset(formDefaultValues);
        afterSubmit && afterSubmit();
      });
    }
  });

  useEffect(() => {
    if (resetForm) reset(formDefaultValues);
  }, [resetForm, formDefaultValues, reset]);

  return (
    <form onSubmit={onSubmit} id={id}>
      <FormControl isInvalid={Boolean(errors.text)}>
        <Input
          id="text"
          placeholder="Enter task text"
          {...register("text", {
            onBlur: () => type !== "edit" && clearErrors("text"),
            required: "What's your task?",
            minLength: {
              value: 3,
              message: "Good tasks are at least 3 characters long.",
            },
          })}
        />
        <FormErrorMessage>
          {errors.text && errors.text.message}
        </FormErrorMessage>
      </FormControl>
    </form>
  );
};

const SubmitBtn = ({ id, type }: SubmitBtnProps) => {
  return (
    <Button type="submit" form={id} colorScheme="purple">
      {type === "edit" ? "Edit Task" : "Add Task"}
    </Button>
  );
};

export const TaskForm = {
  SubmitBtn: SubmitBtn,
  Form: Form,
};

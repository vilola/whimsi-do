export type Task = {
  id: number;
  text: string;
  completed: boolean;
  createdDate: number;
  completedDate?: number;
};

export type TasksResponse = Task[];

import Task from "./Task";

export default interface Response {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: Task[];
}

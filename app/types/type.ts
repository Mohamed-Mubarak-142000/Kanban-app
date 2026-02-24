export interface Task {
  id: number;
  title: string;
  description: string;
  column: ColumnType;
}

export type ColumnType = "BackLog" | "InProgress" | "Review" | "Done";
export interface Column {
  id: ColumnType;
  title: string;
  color: string;
}

export const columns: Column[] = [
  { id: "BackLog", title: "Backlog", color: "#FF5733" },
  { id: "InProgress", title: "In Progress", color: "#33C1FF" },
  { id: "Review", title: "Review", color: "#FF33A8" },
  { id: "Done", title: "Done", color: "#33FF57" },
];

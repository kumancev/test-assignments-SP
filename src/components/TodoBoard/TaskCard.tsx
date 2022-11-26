import React from "react";

type TaskCardProps = {
  children: React.ReactNode;
};

export function TaskCard({ children }: TaskCardProps) {
  return <div>{children}</div>;
};

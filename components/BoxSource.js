import React, { useContext } from "react";
import { Box, Grid, Stack, Text } from "@chakra-ui/core";

import TaskCard from "../components/TaskCard";
import BoxTarget from "../components/BoxTarget";

import { ItemTypes } from "../utils/items";
import { useDrop } from "react-dnd";

import { CardContext } from "../pages/tasks";

export default function BoxSource({ taskList, setTaskList }) {
  const { markAsWIP } = useContext(CardContext);
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => markAsWIP(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Box ref={drop} bg={isOver ? "red.500" : "red.200"}  p={3} boxShadow="md" height="auto">
      <Stack spacing={3}>
        <Text fontSize="2xl" textAlign="center">
          WIP Tasks
        </Text>
        {taskList
          .filter((task, i) => task.status === "wip")
          .map((task, idx) => (
            <TaskCard
              key={idx}
              keyz={idx}
              _id={task._id}
              category={task.category}
              title={task.title}
              details={task.details}
              taskList={taskList}
              setTaskList={setTaskList}
            />
          ))}
      </Stack>
    </Box>
  );
}

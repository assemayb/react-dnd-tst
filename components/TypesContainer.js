import React, { useEffect } from "react";
import { Box, Grid, Stack, Text } from "@chakra-ui/core";
import { useState, createContext, useContext } from "react";
import { useDrag, useDrop } from "react-dnd";

import { ItemTypes } from "../utils/items";
import { CardContext } from "../pages/tasks";

import TaskCard from "./TaskCard";
import BoxTarget from "./BoxTarget";
import BoxSource from "./BoxSource";

export default function TypesContainer({ taskList, setTaskList }) {
  const [order, setOrder] = useState("normal");
  const [{ isDragging, offset, canDrag }, dragRef] = useDrag({
    item: {
      type: ItemTypes.Container,
      id: "1",
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      offset: monitor.getInitialClientOffset(),
    }),
  });
  useEffect(() => {
    if (isDragging) {
      order === "normal" ? setOrder("not") : setOrder("normal");
    }
  }, [isDragging]);

  return (
    <>
      {order === "normal" ? (
        <>
          <div ref={dragRef}>
            <BoxSource taskList={taskList} setTaskList={setTaskList} />
          </div>
          <Box bg="blue.200" p={5} boxShadow="md">
            <Stack>
              <Text fontSize="2xl" textAlign="center">
                Done Tasks
              </Text>
              <BoxTarget>
                {taskList
                  .filter((task, i) => task.status === "done")
                  .map((task, i) => (
                    <TaskCard
                      key={task._id.toString()}
                      keyz={i}
                      _id={task._id}
                      category={task.category}
                      title={task.title}
                      details={task.details}
                    />
                  ))}
              </BoxTarget>
            </Stack>
          </Box>
        </>
      ) : (
        <>
          <Box bg="blue.200" p={5} boxShadow="md">
            <Stack>
              <Text fontSize="2xl" textAlign="center">
                Done Tasks
              </Text>
              <BoxTarget>
                {taskList
                  .filter((task, i) => task.status === "done")
                  .map((task, i) => (
                    <TaskCard
                      key={task._id.toString()}
                      keyz={i}
                      _id={task._id}
                      category={task.category}
                      title={task.title}
                      details={task.details}
                    />
                  ))}
              </BoxTarget>
            </Stack>
          </Box>
          <div ref={dragRef}>
            <BoxSource taskList={taskList} setTaskList={setTaskList} />
          </div>
        </>
      )}
    </>
  );
}

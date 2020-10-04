import { Box, Grid, Stack, Text } from "@chakra-ui/core";
import { useState, createContext, useContext } from "react";
import { useDrop, useDrag } from "react-dnd";
import { ItemTypes } from "../utils/items";
import { theList } from "../utils/data";

import TypesContainer from "../components/TypesContainer";
export const CardContext = createContext();

const Tasks = () => {
  const [isDark, setIsDark] = useState(false);

  const [taskList, setTaskList] = useState(theList);
  const markAsDone = (_id) => {
    const task = taskList.filter((task, i) => task._id === _id);
    task[0].status = "done";
    setTaskList(taskList.filter((task) => task._id !== _id).concat(task[0]));
  };

  const markAsWIP = (_id) => {
    const task = taskList.filter((task, i) => task._id === _id);
    task[0].status = "wip";
    setTaskList(taskList.filter((task) => task._id !== _id).concat(task[0]));
  };

  return (
    <CardContext.Provider value={{ markAsDone, markAsWIP, setIsDark }}>
      <Grid
        gap={3}
        templateColumns="1fr 1fr"
        bg={!isDark ? "green.400" : "red.600"}
        w="100vw"
        h="93vh"
        p={10}
      >
        <TypesContainer taskList={taskList} setTaskList={setTaskList} />
      </Grid>
    </CardContext.Provider>
  );
};

export default Tasks;

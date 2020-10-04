import { Box, Badge, Text, Flex } from "@chakra-ui/core";
import { ItemTypes } from "../utils/items";
import { useDrag } from "react-dnd";
import { useState } from "react";

const TaskCard = (props) => {
  const index = props.keyz;

  const [{ offset, item, itemType, isDragging }, dragRef] = useDrag({
    item: {
      type: ItemTypes.CARD,
      id: props._id,
    },

    begin: () => {
      console.log("beginnig to move");
    },

    end: (item, monitor) => {
      console.log(monitor.getDropResult());
      console.log(monitor.getTargetIds())
    },

    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      offset: monitor.getClientOffset(),
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
    }),
  });

  return (
    <Box
      ref={dragRef}
      my="4"
      p={3}
      bg="gray.500"
      opacity={isDragging ? "0.2" : "1"}
      cursor="pointer"
      boxShadow={isDragging ? "lg" : "sm"}
      w="100%"
      color="white"
    >
      <Flex justify="space-between" my="2">
        <Text fontSize="lg" fontWeight="semibold">
          {props.title}
        </Text>
        <Badge
          variantColor={props.category === "Chores" ? "green" : "red"}
          h="100%"
        >
          {props.category}
        </Badge>
      </Flex>
      <Text textAlign="center" fontSize="md">
        {props.details}
      </Text>
    </Box>
  );
};

export default TaskCard;

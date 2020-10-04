import { Box } from "@chakra-ui/core";
import { useDrop, useDrag } from "react-dnd";
import { ItemTypes } from "../utils/items";
import { useContext } from "react";
import { CardContext } from "../pages/tasks";

const BoxTarget = (props) => {
  const { markAsDone } = useContext(CardContext);

  // using the box as a drop target for the cards
  const [{ isOver, dropRes, didDrop }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      markAsDone(item.id)
      return {data: "okay cool"}
    },
    collect: (monitor) => ({
      dropRes: monitor.getDropResult(),
      didDrop: monitor.didDrop(),
    }),
  });

  return (
    <div>
      <Box
        ref={drop}
        m={2}
        p={3}
        boxShadow="sm"
        bg={isOver ? "green.00" : "green.200"}
        minH="200px"
        textAlign="center"
        w="100%"
        color="white"
      >
        {props.children}
      </Box>
    </div>
  );
};

export default BoxTarget;

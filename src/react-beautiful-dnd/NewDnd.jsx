import React from 'react'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const data = [
    {
        id: 'item-1',
        content: 'Item-1'
    },
    {
        id: 'item-2',
        content: 'Item-2'
    },
    {
        id: 'item-3',
        content: 'Item-3'
    },
    {
        id: 'item-4',
        content: 'Item-4'
    },
    {
        id: 'item-5',
        content: 'Item-5'
    },
    {
        id: 'item-6',
        content: 'Item-6'
    }
]
const reorder = (list, startIndex, endIndex) =>{
    const result = Array.from(list)
}
const NewDnd = () => {
    const onDragEndFun = (result)=>{
        if (!result.destination) {
            return;
        } else {
            
        }
    }
  return (
    <>
        <DragDropContext onDragEnd={onDragEndFun}>

        </DragDropContext>
    </>
  )
}

export default NewDnd

import React from "react";


/**
 * Displays a queue item within a queue.
 * @param  {object} props - Properties taken from parent App.
 *                          key       - unique, unaccessible number allowing React to distinguish between elements
 *                          id        - accessible index of element
 *                          qId       - current index of queue item within queue to be displayed
 *                          length    - total length of queue
 *                          qItemText - Text for current queue element
 *                          onNext    - Calls parent function to handle accessing next queue item
 *                          onDelete  - Calls parent function to handle deleting a finished queue
 * 
 * @returns {object} - HTML div for a queue item.
 * 
 */
function QueueDisplay(props){

  
  /**
   * Call handleNext in parent component with queue index.
   */
  function handleNext(){
    props.onNext(props.id);
  }


  /**
   * Call deleteQueue in parent component with queue index upon completion.
   */
  function handleDelete(){
    props.onDelete(props.id);
  }

  return (
    <div className="q-item">
      <p>{props.qItemText}</p>
      {(props.qId >= props.length - 1) ? <button onClick={handleDelete}><strong>Done</strong></button> : <button onClick={handleNext}><strong>Next</strong></button>}
    </div>
  );
}


export default QueueDisplay;

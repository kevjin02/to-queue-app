import React, { useState } from "react";


/**
 * Displays window to create a new queue.
 * @param  {object} props - Properties taken from parent App.
 *                          onAdd  - Passed function from parent App to be called with created queue
 *                          toggle - passed function from parent App to hide Create window
 * 
 * @returns {object} - HTML div that creates a new queue.
 * 
 */
function Create(props) {
    const [qItems, editQItems] = useState([""]);


    /**
     * Hides Create window.
     */
    function handleClick(){
        props.toggle();
    }


    /**
     * Updates state to contain a new editable item.
     */
    function handleAdd(){
        editQItems(prevQItems => {
            return [...prevQItems, ""];
          });
    }


    /**
     * Allows for a queue item to be moved upwards.
     * @param  {object} event - Object containing information about selected element.
     */
    function handleUp(event){
        console.log(typeof event);
        const key = parseInt(event.target.id);
        if(!(key === 0)){
            const tempTarget = qItems.slice();
            var temp = tempTarget[key];
            tempTarget[key] = tempTarget[key-1];
            tempTarget[key-1] = temp;
            editQItems(tempTarget);
        }
        
    }


    /**
     * Allows for a queue item to be moved downwards.
     * @param  {object} event - Object containing information about selected element.
     */
    function handleDown(event){
        const key = parseInt(event.target.id);
        const tempTarget = qItems.slice();
        if(!(key === (tempTarget.length-1))){
            
            var temp = tempTarget[key];
            tempTarget[key] = tempTarget[key+1];
            tempTarget[key+1] = temp;
            editQItems(tempTarget);
        }
    }


    /**
     * Updates queue to contain edited queue items.
     * @param  {object} event - Object containing information about selected element.
     */
    function handleChange(event) {
        const tempTarget = qItems.slice();
        tempTarget[event.target.id] = event.target.value;
        editQItems(tempTarget);
      }


    /**
     * Allows for a queue item to be moved upwards.
     * @param  {object} event - Object containing information about selected element.
     */
    function handleDelete(event){
        const key = parseInt(event.target.id);
        const tempTarget = qItems.slice();
        tempTarget.splice(key, 1);
        editQItems(tempTarget);
    }


    /**
     * adds newly created queue and hides create window.
     */
    function handleSave(){
          props.onAdd(qItems);
          props.toggle();        
    }


    return (
        <div className="modal">
            <div className="modal_content">
                {qItems.map((qItem, index) => {
                    return (
                        <div className="create-item" key={index}>
                            <div className="up">
                                {(!(index === 0 || qItems.length === 1)) ? <button className="btn" id={index} onClick={handleUp}><i className="fas fa-caret-up"></i></button> : null}
                            </div>
                            <div className="down">
                                {(!((index === (qItems.length-1)) || qItems.length === 1)) ? <button className="btn" id={index} onClick={handleDown}><i className="fas fa-caret-down"></i></button> : null}
                            </div>
                            <form className="create-q-item">
                                <input
                                id={index}
                                name="title"
                                onChange={handleChange}
                                value={qItem}
                                placeholder="Write something to queue..."
                                rows="1"
                                maxLength="40"
                                autoComplete="off"
                                />
                            </form>
                            <div className="delete">
                                {!(index === 0) ? <button className="btn" id={index} onClick={handleDelete}><i className="fas fa-trash"></i></button> : null}
                            </div>
                            
                        </div>
                    );
                })}
                <div>
                    <button className="add" onClick={handleAdd}><strong>+ Add item</strong></button>
                </div>
                <div className="save-actions">
                <div className="save-button-group">
                    <button className="save" onClick={handleSave}>Save</button>
                    <button className="close" onClick={handleClick}>Cancel</button>

                </div>
                </div>
                
                
            </div>
        </div>
    );
}


export default Create;

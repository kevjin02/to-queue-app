import React, {Component} from "react";
import Header from "./Header";
import Footer from "./Footer";
import QueueDisplay from "./QueueDisplay";
import Create from "./Create";
import axios from "axios";


/**
 * Parent component for all functions in toQueue.
 */
class App extends Component {
  /**
   * Constructor for react component that sets state.
   * @param {object} props - Props from a parent element (none)
   */
  constructor(props) {
    super(props);
    this.state = {
      queues: [],           //All queues
      openCreate: false     //Toggle Create
    };
  }


  /**
   * Perform GET request on saved queues after component has been mounted
   * and update state.
   * 
   */
  componentDidMount() {
    axios
      .get('/api/queues')
      .then(res => {
        
        this.setState({
          queues: res.data
        })
      })
      .catch(err =>{
        console.log('Error showing queues.');
      })
  };


  /**
   * Perform POST request to add new queue and update state.
   * @param  {string[]} newQueue - Queue to be added.
   */

  addQueue = (newQueue) => {
        axios
                .post('/api/queues/', {qIndex: 0, arrQueue: newQueue})
                .then(
                  res => {
                  this.setState(prevState => ({
                    queues: [...prevState.queues, res.data.content],
                    openCreate: prevState.openCreate
                  }));
                }
                )
                .catch(err => {
                  console.log("Error in saving queue.", err);
                });
      }
    

  /**
   * Perform DELETE request to delete a queue.
   * @param  {Number} index - Index of queue to be deleted.
   */
  deleteQueue = (index) => {
      axios
          .delete('/api/queues/'+ this.state.queues[index]._id)
          .then(res => {
            let updatedQueue = this.state.queues.filter((queueItem, i) => {
              return i !== index;
            })
              this.setState(prevState => ({
                queues: updatedQueue,
                openCreate: prevState.openCreate
              }));
            
          })
          .catch(err => {
            console.log("Error in deleting queue.");
          });
  }
    

    /**
   * Perform PUT request to update position on queue.
   * @param  {Number} index - Index of queue with position to increment.
   */
  handleNext = (index) => {
  
      axios
          .put('/api/queues/'+ this.state.queues[index]._id, {...this.state.queues[index], qIndex: 1+this.state.queues[index].qIndex})
          .then(res => {
            const updatedQueues = [...this.state.queues];
            
            updatedQueues[index] = {...this.state.queues[index], qIndex: 1+this.state.queues[index].qIndex};
              this.setState(prevState => ({
                queues: updatedQueues,
                openCreate: prevState.openCreate
              }));
            
          })
          .catch(err => {
            console.log("Error in updating next queue.");
          });
  }
    

  /**
   * Update state to present Create component.
   */
  handleToggle = () => {
    this.setState(prevState => ({
      queues: prevState.queues,
      openCreate: !prevState.openCreate
    }));
  }


  /**
   * Render App component and display current state.
   * 
   * @returns {object} - HTML div containing current state and calls to child components.
   */
  render() {
    
    return (
        <div id="page-container">
          <Header />
          <div id="content-wrap">
          
            <button className="create-button" onClick={this.handleToggle}>Create Queue + </button>
              {this.state.queues.map((queueItem, index) => {
                return (
                  <QueueDisplay
                    key={index}
                    id={index}
                    qId={queueItem.qIndex}
                    length={queueItem.arrQueue.length}
                    qItemText={queueItem.arrQueue[queueItem.qIndex]}
                    onNext={this.handleNext}
                    onDelete={this.deleteQueue}
                  />
                );
              })}
            
            {this.state.openCreate ? <Create onAdd={this.addQueue} toggle={this.handleToggle} /> : null}
          </div>
            
            
          <Footer />
        </div>
        );
  }
}

export default App;

//Start of modularizing jobs with redux, while listening for state changes 

class Jobs extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        jobs: [],
      };
  
      store.subscribe(() => {
        // When state will be updated(in our case, when jobs will be fetched), 
        // we will update local component state and force component to rerender 
        // with new data.
  
        this.setState({
          jobs: store.getState().jobs;
        });
      });
    }
  
    render() {
      return (
        <div>
          {this.state.jobs.map((item) => <p> {item.title} </p> )}
        </div>
      );
    }
  };
  
  render(<Jobs />, document.getElementById('app'));
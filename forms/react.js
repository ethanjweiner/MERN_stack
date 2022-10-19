const mountNode = document.querySelector('#root');
const root = ReactDOM.createRoot(mountNode);

class TeamFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coach: '',
      team: '',
      description: '',
    };
  }

  updateState = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <form>
        <input
          type="text"
          value={this.state.coach}
          name="coach"
          onChange={this.updateState}
        ></input>
        <select value={this.state.team} onChange={this.updateState} name="team">
          <option>Lakers</option>
          <option>Celtics</option>
          <option>Heat</option>
        </select>
        <textarea
          value={this.state.description}
          onChange={this.updateState}
          name="description"
        ></textarea>
      </form>
    );
  }
}

root.render(<TeamFormComponent />);

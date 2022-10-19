const mountNode = document.querySelector('#root');
const root = ReactDOM.createRoot(mountNode);

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit',
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temperature: '', scale: 'c' };
  }

  handleTempChange = (temperature, scale) => {
    this.setState({
      temperature,
      scale,
    });
  };

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius =
      scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit =
      scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={(temperature) =>
            this.handleTempChange(temperature, 'c')
          }
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={(temperature) =>
            this.handleTempChange(temperature, 'f')
          }
        />
        <BoilingVerdict celsius={celsius} />
      </div>
    );
  }
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = (e) => {
    this.props.onTemperatureChange(e.target.value);
  };

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;

    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

// Helpers
function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);

  if (Number.isNaN(input)) {
    return '';
  }

  const output = convert(temperature);

  // Round to 3 decimal places
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

root.render(<Calculator />);

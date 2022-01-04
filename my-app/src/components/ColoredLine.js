const ColoredLine = ({ color }) => (
  <hr
    style={{
      color,
      backgroundColor: color,
      height: 5,
      margin: 20
    }}
  />
);

export default ColoredLine
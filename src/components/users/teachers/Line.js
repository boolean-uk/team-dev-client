export default function Line(props) {
  const { index, value, handleLineChange, removeFormLine } = props;

  return (
    <div className="field input-field">
      <input
        type="text"
        placeholder="Log info here"
        className="log-line"
        value={value}
        onChange={(e) => handleLineChange(index, e)}
      />
      <button onClick={() => removeFormLine(index)}>X</button>
    </div>
  );
}

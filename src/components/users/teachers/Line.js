export default function Line(props) {
  const { index, value, handleLineChange, removeFormLine } = props;

  return (
    <div className="form-line">
      <input
        type="text"
        placeholder="Log info here"
        value={value}
        onChange={(e) => handleLineChange(index, e)}
      />
      <button onClick={() => removeFormLine(index)}>X</button>
    </div>
  );
}

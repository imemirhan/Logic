import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./store/slices/counterSlice"; // Import actions

function App() {
  const count = useSelector((state) => state.counter.value); // Get Redux state
  const dispatch = useDispatch(); // Get function to dispatch actions

  return (
    <div>
      <h1>Redux Counter</h1>
      <p>Count is {count}</p>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
    </div>
  );
}

export default App;

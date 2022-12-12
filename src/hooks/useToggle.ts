import { useCallback, useState } from 'react';

// Parameter is the boolean, with default "false" value
export const useToggle = (initialState = false): [boolean, any] => {
  // Initialize the state
  const [state, setState] = useState<boolean>(initialState);
  // Define and memorize toggler function in case we pass down the components,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback((): void => setState((x) => !x), []);
  return [state, toggle];
};

// const [isTextChanged, setIsTextChanged] = useToggle();
// <button onClick={setIsTextChanged}>{isTextChanged ? 'Toggled' : 'Click to Toggle'}</button>

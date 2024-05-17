import { useSelector, useDispatch } from 'react-redux';
import stackSlice from '../../redux/stacks/stackSlice.js';
import React, { useEffect } from 'react';
import { setStacksList, selectAllStacks  } from '../../redux/stacks/stackSlice.js';

function AdminStacks() {
  const dispatch = useDispatch();
  const { stacksList, loading, error } = useSelector(selectAllStacks);
  
  const stacksData = async () => {
    try {
      const response = await fetch('/api/stacks/get');
      const data = await response.json();

      if (data.status == 'success') {
        dispatch(signOutFailure(data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    stacksData();
  }, []);

  return (
    <div>
      <h1>AdminStacks</h1>
      <button onClick={() => dispatch(stackSlice.actions.addStackStart())}>
        add stack
      </button>
      {/* <ul>
        {stacksList.map((stack) => (
          <li key={stack.id}>{stack.name}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default AdminStacks;

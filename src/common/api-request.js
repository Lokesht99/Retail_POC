import { useCallback, useEffect, useReducer, useRef } from "react";

export const Actions = {
  loading: "loading",
  success: "success",
  failure: "failure",
  initial: "initial",
};

const initialState = {
  payload: null,
  status: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case Actions.loading:
      return { status: Actions.loading };
    case Actions.success:
      return { status: Actions.success, payload: action.payload };
    case Actions.failure:
      return { status: Actions.failure, error: action.error };
    default:
      return { ...initialState };
  }
};

export function useAPIRequest(invoker = async (params) => {}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const request = useCallback(
    (params) => {
      if (mountedRef.current) {
        console.log("Dispatching loading state"); // Add this line
        dispatch({ type: Actions.loading });
      }
      invoker(params)
        .then((payload) => {
          
          if (mountedRef.current) {
            console.log("Dispatching success state with payload:", payload); // Add this line
            dispatch({ type: Actions.success, payload: payload });
          }
        })
        .catch((error) => {
          console.error("Request failed with error:", error); // Add this line
          if (mountedRef.current) {
            dispatch({ type: Actions.failure, error: error });
          }
        });
    },
    [invoker]
  );

  const reset = () => {
    dispatch({ type: Actions.initial });
  };

  return [state, request, reset];
}


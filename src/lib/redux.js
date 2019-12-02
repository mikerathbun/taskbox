// A simple redux store/actions/reducer implementation.
// A true app would be more complex and seperated into different files.

import { createStore } from "redux";

// The actions are the "name" of the chages that can happen to the store
export const actions = {
    ARCHIVE_TASK: 'ARCHIVE_TASK',
    PIN_TASK: 'PIN_TASK',
};

export const archiveTask = id => ({ type: actions.ARCHIVE_TASK, id });
export const pinTask = id => ({ type: actions.PIN_TASK, id });

// All our reducers simply change the state of a single task.
function taskStateReducer(taskState) {
    return (state, action) => {
        return {
            ...state,
            tasks: state.tasks.map(task =>
                task.id === action.id ? { ...task, state: taskState } : task
            ),
        };
    };
}

// The reducer describes how the contents of the store change for each action
export const reducer = (state, action) => {
    switch (action.type) {
        case actions.ARCHIVE_TASK:
            return taskStateReducer('TASK_ARCHIVED')(state, action);
        case actions.PIN_TASK:
            return taskStateReducer('TASK_PINNED')(state, action);
        default:
            return state;
    }
};

// The initial state of our store when the app loads.
// Usually you would fetch this from a server.
// This is from about half way down https://www.learnstorybook.com/intro-to-storybook/react/en/data/
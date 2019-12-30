import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';

import { PureInboxScreen } from './InboxScreen';
import { defaultTasksData } from './TaskList.stories';

export default {
    component: PureInboxScreen,
    title: 'InboxScreen',
    decorators: [story => <Provider store={store}>{story()}</Provider>],
};


// https://www.learnstorybook.com/intro-to-storybook/react/en/screen/
// Supplying context with decorators
// A super-simple mock of a redux store
const store = {
    getState: () => {
        return {
            tasks: defaultTasksData,
        };
    },
    subscribe: () => 0,
    dispatch: action('dispatch'),
};

export const Default = () => <PureInboxScreen />;

export const Error = () => <PureInboxScreen error="Something" />;


storiesOf('InboxScreen', module)
    .addDecorator(story => <Provider store={store}>{story()}</Provider>)
    .add('default', () => <PureInboxScreen />)
    .add('error', () => <PureInboxScreen error="Something" />);
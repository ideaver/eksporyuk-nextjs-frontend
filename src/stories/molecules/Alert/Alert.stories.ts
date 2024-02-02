import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Molecules/Alert',
    component: Alert,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
  
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Primary: Story = {
    args: {
        alertColor: 'primary',
        title: 'This is an alert',
        label: 'The alert component can be used to highlight certain parts of your page for higher content visibility',
    },
};

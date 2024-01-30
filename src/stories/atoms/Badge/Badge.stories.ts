import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './Badge';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Atoms/Badge',
    component: Badge,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
  
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Primary: Story = {
    args: {
        badgeColor: 'primary',
        label: 'Badge',
    },
};
export const Secondary: Story = {
    args: {
        badgeColor: 'secondary',
        label: 'Badge',
    },
};
export const Success: Story = {
    args: {
        badgeColor: 'success',
        label: 'Badge',
    },
};
export const Info: Story = {
    args: {
        badgeColor: 'info',
        label: 'Badge',
    },
};
export const Warning: Story = {
    args: {
        badgeColor: 'warning',
        label: 'Badge',
    },
};
export const Danger: Story = {
    args: {
        badgeColor: 'danger',
        label: 'Badge',
    },
};
export const Dark: Story = {
    args: {
        badgeColor: 'dark',
        label: 'Badge',
    },
};
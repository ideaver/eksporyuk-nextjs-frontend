import type { Meta, StoryObj } from '@storybook/react';

import { IndicatorBadge } from './IndicatorBadge';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Atoms/Indicator Badge',
    component: IndicatorBadge,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
  
} satisfies Meta<typeof IndicatorBadge>;

export default meta;
type Story = StoryObj<typeof meta>;


export const SuccessLight: Story = {
    args: {
        badgeColor: 'success',
        label: '0.0',
    },
};

export const DangerLight: Story = {
    args: {
        badgeColor: 'danger',
        label: '0.0',
        indicator: 'down',
        
    },
};
export const SuccessNormal: Story = {
    args: {
        badgeColor: 'success',
        label: '0.0',
        lightBadge: false,
    },
};

export const DangerNormal: Story = {
    args: {
        badgeColor: 'danger',
        label: '0.0',
        indicator: 'down',
        lightBadge: false,
    },
};
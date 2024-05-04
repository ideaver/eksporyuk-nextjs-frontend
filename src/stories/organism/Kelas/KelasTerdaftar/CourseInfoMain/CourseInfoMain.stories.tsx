import type { Meta, StoryObj } from "@storybook/react";
import { PaymentConfirmation, PaymentMethod } from "@/types/general/payment-method";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { CourseInfoMain } from "./CourseInfoMain";

const meta = {
    title: "Organism/CourseInfoMain",
    component: CourseInfoMain,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof CourseInfoMain>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
    render: (args) => <CourseInfoMain {...args} />,
    args: {
        title: "Kelas Bimbingan EksporYuk",
        image: "/media/books/img-72.jpg",
        icon: "/media/avatars/300-5.jpg",
        categories: "Mentor EksporYuk",
        textButton: "Bagikan Kelas",
        subTitle: "Course Info",
        aboutCourse: "About Course",
        subAboutCourse: "To be successful in life you need not only the skills required but also the right mindset. With how fast industries evolve, being able to think clearly and creatively is very crucial. However, taking a step back in a hectic environment might be difficult but don’t worry, because this course will teach how you can do just that.",
        description: "Description",
        subDescription: (
            <p>
                This course will provide you with a few “tools”, i.e. certain techniques you can use to enhance your natural creativity and decision-making skills. These techniques can apply to communication, creative thinking, or productivity. They are further divided into two categories: techniques that apply to you and techniques that are more suited to a group.
                <br />
                After you have a grasp of these tools and techniques you can choose when to use what and learn to prioritize certain things over others. This will not only boost your productivity but also up your time management game. Not to mention, learning these concepts will also help you reach a healthier mental state.
            </p>
        ),
        listCourse: "At the end of the course you should be able to:",
        subListCourse: [
            {
                listCourse: "Use mind-maps for ideas"
            },
            {
                listCourse: "Apply alphabet brainstorming"
            },
            {
                listCourse: "Communicate with confidence"
            },
            {
                listCourse: "Convey your ideas precisely"
            },
            {
                listCourse: "Improve time management skills"
            },
            {
                listCourse: "Balance multiole tasks"
            },
        ],
        subTitle2: "What Will You Learn?",
        listSubTitle2: [
            {
                listLearn: "Creative thinking techniques"
            },
            {
                listLearn: "How to work efficiently as a group"
            },
            {
                listLearn: "Tools that can make your life easier"
            },
            {
                listLearn: "Ways to communicate clearly"
            },
            {
                listLearn: "Prioritize tasks to manage time"
            },
        ],
        widthImage: 300,
        heightImage: 500

    },
};

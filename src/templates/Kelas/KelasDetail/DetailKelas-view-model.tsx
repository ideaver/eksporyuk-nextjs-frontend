import { MenuComponent } from "@/_metronic/assets/ts/components";
import { ColorList } from "@/types/general/utilities";
import { useEffect, useState } from "react";

export type CardInfo = {
  title?: string;
  icon: string;
  image: string;
  widthImage: number;
  heightImage: number;
  categories: string;
  textButton?: string;
  subTitle?: string;
  aboutCourse?: string | JSX.Element
  subAboutCourse?: string;
  description?: string;
  subDescription?: string | JSX.Element
  listCourse?: string;
  subListCourse?: ListCourse[];
  subTitle2?: string;
  listSubTitle2?: ListLearn[];
}

type ListCourse = {
  listCourse?: string
}

type ListLearn = {
  listLearn?: string
}

export interface HeadProps {
  dataCardInfo: CardInfo;
}

export const dataCardInfo: CardInfo[] = [
  {
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
    heightImage: 350

  }
];

type ProgressProps = {
  className: string
  chartColor: string
  strokeColor: string
  chartHeight: string
  title?: string;
  presentase?: number;
  totalPresentase?: number;
  colorPrecentage?: string;
  colorSubtle?: string;
  backgroundColor?: string;
  datas: Row[]
  table: Table[]
}

type Row = {
  color?: string;
  backgroundColor?: string;
  icon: string
  description?: string
  subDescription?: string
}

type Table = {
  iconTable: string
  label?: string
  description?: string
}

export interface SideProps {
  progressData: ProgressProps;
}

export const progressData: ProgressProps[] = [
  {
    className: "w-100",
    chartColor: "success",
    strokeColor: "primary",
    chartHeight: '150px',
    presentase: 80,
    totalPresentase: 100,
    colorPrecentage: "info",
    colorSubtle: "light-info",
    backgroundColor: "success",
    datas: [
      {
        icon: "abstract-26",
        description: "All",
        subDescription: "Levels",
        color: "primary",
        backgroundColor: "gray-100"
      },
      {
        icon: "abstract-26",
        description: "1291",
        subDescription: "Enrolled",
        color: "primary",
        backgroundColor: "gray-100"
      },
      {
        icon: "time",
        description: "7j 56m",
        subDescription: "Durasi",
        color: "primary",
        backgroundColor: "gray-100"
      },
      {
        icon: "star",
        description: "4.3",
        subDescription: "Reviews",
        color: "primary",
        backgroundColor: "gray-100"
      },
    ],
    table: [
      {
        iconTable: "calendar",
        label: "Enrolled On",
        description: "10 Mei 2024",
      },
      {
        iconTable: "calendar",
        label: "Last Updated",
        description: "13 Maret 2024",
      },
    ]
  },
];

type TableInstructor = {
  iconTable: string;
  nameInstructor: string;
}

type InstructorProps = {
  title?: string;
  className?: string;
  data: TableInstructor[];
};

export interface SideInstructorProps {
  instructorData: InstructorProps;
}

export const instructorData: InstructorProps = {
  className: "w-100",
  title: `Instructor`,
  data: [
    {
      iconTable: "/media/avatars/300-5.jpg",
      nameInstructor: 'Grace Green',
    },
    {
      iconTable: "/media/avatars/300-5.jpg",
      nameInstructor: 'Grace Green',
    },
  ],
}

type CourseDetailProps = {
  classname?: string;
  title?: string;
  categories?: string;
  subCategories?: string;
  materialIncludes?: string;
  subMaterialIncludes: SubMaterial[];
  requirements?: string;
  subRequirements?: string;
  audience?: string;
  subAudience: SubAudience[];
}

type SubMaterial = {
  listMaterial?: string
}

type SubAudience = {
  listAudience?: string
}

export interface SideCourseDetailProps {
  courseDetailData: CourseDetailProps;
}

export const courseDetailData: CourseDetailProps = {
  title: "Course Detail",
  categories: "Categories",
  subCategories: "Kelas EksporYuk",
  materialIncludes: "Material Includes",
  subMaterialIncludes: [
    {
      listMaterial: "Flexible deadlines",
    },
    {
      listMaterial: "Hours of on-demand video",
    },
    {
      listMaterial: "25+ downloadable reading material",
    },
    {
      listMaterial: "Certificate of completion",
    },
  ],
  requirements: "Requirements",
  subRequirements: "No prior knowledge is required on the topics discussed",
  audience: "Audience",
  subAudience: [
    {
      listAudience: "Anyone hoping for self-improvement",
    },
    {
      listAudience: "Anyone looking to find ways to balance life",
    },
  ]

}

const useKelasDetailViewModel = () => {
  const [exportModalState, setExportModalState] = useState<any>({
    startDate: new Date(),
    endDate: new Date(),
  });
  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  const [selectedFollupValue, setSelecteFollupValue] = useState("");

  const handleFollupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelecteFollupValue(event.target.value);
  };


  const breadcrumbs = [
    {
      title: "Kelas",
      path: "/kelas/kelas/kelas-detail",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "",
      path: "",
      isSeparator: true,
      isActive: false,
    },
  ];

  return { breadcrumbs, exportModalState, setExportModalState, selectedFollupValue, handleFollupChange };
};

export default useKelasDetailViewModel;

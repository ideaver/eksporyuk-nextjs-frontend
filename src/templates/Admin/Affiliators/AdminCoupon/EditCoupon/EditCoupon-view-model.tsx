import {
  CouponFindOneQuery,
  DiscountTypeEnum,
  usePlatformCouponUpdateOneMutation,
  useCourseFindManyQuery,
  QueryMode,
} from "@/app/service/graphql/gen/graphql";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useAdminCouponViewModel from "../AdminCoupon-view-model";
import { OptionsOrGroups, GroupBase } from "react-select";

type CourseOptionType = {
  value: number;
  label: string;
};

export const breadcrumbs = [
  {
    title: "Manajeman Kupon",
    path: "/admin/affiliate/admin-coupon",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
  {
    title: "Semua Coupon",
    path: "/admin/affiliate/admin-coupon",
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

export interface IEditCoupon {
  id: string | string[] | undefined;
  data: CouponFindOneQuery;
}

export const useMentorsDropdown = () => {
  const getMentors = useCourseFindManyQuery({
    variables: {
      take: 10,
    },
  });

  async function loadOptions(
    search: string,
    prevOptions: OptionsOrGroups<CourseOptionType, GroupBase<CourseOptionType>>
  ) {
    const result =
      getMentors.data?.courseFindMany?.map((course) => ({
        value: course.id,
        label: course.title,
      })) ?? [];

    const newOptions = result.filter(
      (option) =>
        !prevOptions.some(
          (prevOption) => (prevOption as CourseOptionType).value === option.value
        )
    );

    await getMentors.refetch({
      skip: prevOptions.length,
      where: {
        title: {
          contains: search,
          mode: QueryMode.Insensitive,
          },
        },
      },
    );

    return {
      options: newOptions,
      hasMore: true,
    };
  }

  return { loadOptions };
};

export const AddMentorHandler = ({ courses, setCourses }: any) => {
  const [selectedMentor, setSelectedMentor] = useState<any>(courses);

  const addMentor = (mentor: any) => {
    const updatedMentors = selectedMentor
      ? [...selectedMentor, mentor]
      : [mentor];

    setSelectedMentor(updatedMentors);
    setCourses(updatedMentors);
  };

  const removeMentor = (index: number) => {
    const updatedMentors = selectedMentor?.filter(
      (_: any, mentorIndex: any) => mentorIndex !== index
    );

    setSelectedMentor(updatedMentors);
  };

  useEffect(() => {
    setSelectedMentor(selectedMentor);
  }, [selectedMentor]);

  return {
    selectedMentor,
    setSelectedMentor,
    addMentor,
    removeMentor,
  };
};

export const AddNotAllowedCourses = ({ notAllowedCourses, setNotAllowedCourses }: any) => {
  const [selectedCourse, setSelectedCourses] = useState<any>(notAllowedCourses);

  const addCourse = (mentor: any) => {
    const updatedMentors = selectedCourse
      ? [...selectedCourse, mentor]
      : [mentor];

    setSelectedCourses(updatedMentors);
    setNotAllowedCourses(updatedMentors);
  };

  const removeCourse = (index: number) => {
    const updatedMentors = selectedCourse?.filter(
      (_: any, mentorIndex: any) => mentorIndex !== index
    );

    setSelectedCourses(updatedMentors);
  };

  useEffect(() => {
    setSelectedCourses(selectedCourse);
  }, [selectedCourse]);

  return {
    selectedCourse,
    setSelectedCourses,
    addCourse,
    removeCourse,
  };
};

const useEditCouponViewModel = ({ id, data }: IEditCoupon) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(data.couponFindOne?.platformCoupon?.code);
  const [status, setStatus] = useState(
    data.couponFindOne?.isActive ? "true" : "false"
  );
  const [discountType, setDiscountType] = useState(data.couponFindOne?.type);
  const [discount, setDiscount] = useState(data.couponFindOne?.value);
  const [addDate, setAddDate] = useState(
    data.couponFindOne?.endDate ? true : false
  );
  const [date, setDate] = useState(new Date(data.couponFindOne?.endDate));
  console.log(date);

  const [connectCourse, setConnectCourse] = useState<number | undefined | null>(data.couponFindOne?.courseCoupon?.course?.id);
  const [maxClaim, setMaxClaim] = useState<number | undefined | null>(data.couponFindOne?.maxClaimPerUser);
  
  const transformedCourses = data.couponFindOne?.avaibilities?.onlyAvailableToCourse?.map((item: any) => ({
    value: item.id,
    label: item.title,
  }));

  const transformedNotAllowedCourses = data.couponFindOne?.avaibilities?.notAvailableToCourse?.map((item: any) => ({
    value: item.id,
    label: item.title,
  }));

  const [courses, setCourses] = useState<any>(transformedCourses);
  const [notAllowedCourses, setNotAllowedCourses] = useState<any>(transformedNotAllowedCourses);

  // Kupon hanya bisa digunakan di kelas
  const selectedCourses = courses?.map((item: any) => ({
    id: item.value
  }));

  // Kupon tidak bisa digunakan di kelas
  const notAllowedCourse = notAllowedCourses?.map((item: any) => ({
    id: item.value
  }));

  // Kupon hanya bisa digunakan di kelas
  const { selectedMentor, setSelectedMentor, addMentor, removeMentor } =
    AddMentorHandler({ courses, setCourses });

  // Kupon tidak bisa digunakan di kelas
  const { selectedCourse, setSelectedCourses, addCourse, removeCourse } =
    AddNotAllowedCourses({ notAllowedCourses, setNotAllowedCourses });

  const [couponUpdateOne] = usePlatformCouponUpdateOneMutation();
  const { couponFindMany } = useAdminCouponViewModel();

  const handleCouponUpdateOne = async () => {
    setLoading(true);
    try {
      await couponUpdateOne({
        variables: {
          where: {
            id: parseInt(id as string),
          },
          data: {
            code: {
              set: code,
            },
            coupon: {
              update: {
                data: {
                  endDate: {
                    set: addDate ? date : null,
                  },
                  type: {
                    set: discountType,
                  },
                  value: {
                    set: Number(discount),
                  },
                  isActive: {
                    set: status === "true" ? true : false,
                  },
                  maxClaimPerUser: {
                    set: Number(maxClaim),
                  },
                  // courseCoupon: {
                  //   update: {
                  //     data: {
                  //       course: {
                  //         connect: {
                  //           id: Number(connectCourse),
                  //         }
                  //       }
                  //     }
                  //   }
                  // }
                  avaibilities: {
                    update: {
                      data: {
                        onlyAvailableToCourse: {
                          connect: selectedCourses
                        },
                        notAvailableToCourse: {
                          connect: notAllowedCourse
                        }
                      }
                    }
                  }
                },
              },
            },
          },
        },
      });
      await couponFindMany.refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      await router.push("/admin/affiliate/admin-coupon");
      router.reload();
    }
  };

  return {
    loading,
    handleCouponUpdateOne,
    code,
    setCode,
    status,
    setStatus,
    discount,
    discountType,
    setDiscount,
    setDiscountType,
    addDate,
    setAddDate,
    date,
    setDate,
    maxClaim,
    setMaxClaim,
    connectCourse,
    setConnectCourse,
    selectedMentor, setSelectedMentor, addMentor, removeMentor,
    selectedCourse, setSelectedCourses, addCourse, removeCourse,
    courses,
  };
};

export default useEditCouponViewModel;

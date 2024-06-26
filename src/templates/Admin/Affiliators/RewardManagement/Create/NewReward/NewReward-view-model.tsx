import { useState, useRef, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { UnknownAction } from "@reduxjs/toolkit";
import { useSession } from "next-auth/react";
import { OptionsOrGroups, GroupBase } from "react-select";

import { useRewardsCatalogCreateOneMutation, useCourseFindManyQuery } from "@/app/service/graphql/gen/graphql";
import { RewardsTypeEnum } from "@/app/service/graphql/gen/graphql";
import { QueryMode } from "@/app/service/graphql/gen/graphql";

import { RootState } from "@/app/store/store";
import {
  changeAkhirMasaBerlaku,
  changeDeskripsiReward,
  changeFotoProduk,
  changeHargaPoint,
  changeNamaReward,
  changeStatus,
  changeConnectCourse,
  changeCash,
} from "@/features/reducers/affiliators/rewardReducer";

export type CourseOptionType = {
  value: number;
  label: string;
};

export const breadcrumbs = [
  {
    title: "Reward Affiliasi",
    path: "/admin/affiliate/reward",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Tambah Reward",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];

const useField = <T extends string | boolean | number>(
  selector: (state: RootState) => T,
  action: (value: T) => UnknownAction
) => {
  const dispatch = useDispatch();
  const initialValue = useSelector(selector);
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue: T;
    if (typeof initialValue === "boolean") {
      newValue = event.target.checked as T;
    } else if (typeof initialValue === "number") {
      newValue = Number(event.target.value) as T;
    } else {
      newValue = event.target.value as T;
    }
    setValue(newValue);
    dispatch(action(newValue));
  };

  return [value, handleChange] as const;
};

// export const useCoursesDropdown = () => {
//   const getCourses = useCourseFindManyQuery({
//     variables: {
//       take: 10
//     }
//   });

//   async function loadOptions(
//     search: string,
//     prevOptions: OptionsOrGroups<CourseOptionType, GroupBase<CourseOptionType>>
//   ) {
//     const result =
//       getCourses.data?.courseFindMany?.map((course) => ({
//         value: course.id,
//         label: course.title,
//       })) ?? [];

//     const newOptions = result.filter(
//       (option) =>
//         !prevOptions.some(
//           (prevOption) => (prevOption as CourseOptionType).value === option.value
//         )
//     );

//     await getCourses.refetch({
//       skip: prevOptions.length,
//       where: {
//         title: {
//           equals: search,
//           mode: QueryMode.Insensitive
//         }
//       },
//     });

//     return {
//       options: newOptions,
//       hasMore: true,
//     };
//   }

//   return { loadOptions };
// }

// export const AddCourseHandler = () => {
//   const dispatch = useDispatch();
//   const currentCourseSelector = useSelector(
//     (state: RootState) => state.reward.connectCourse
//   );
//   const [selectedCourse, setSelectedCourse] = useState<
//   CourseOptionType[] | undefined
//   >(currentCourseSelector);

//   const addCourse = (course: CourseOptionType) => {
//     const updatedCourses = selectedCourse
//       ? [...selectedCourse, course]
//       : [course];

//       setSelectedCourse(updatedCourses);

//     dispatch(changeConnectCourse(updatedCourses));
//   };

//   const removeCourse = (index: number) => {
//     const updatedCourse = selectedCourse?.filter(
//       (_, courseIndex) => courseIndex !== index
//     );

//     dispatch(changeConnectCourse(updatedCourse));
//   };

//   useEffect(() => {
//     setSelectedCourse(currentCourseSelector);
//   }, [currentCourseSelector]);

//   return {
//     selectedCourse,
//     setSelectedCourse,
//     currentCourseSelector,
//     addCourse,
//     removeCourse,
//   };
// };

/**
 * custom hook for courses dropdown
 * @returns loadOptions
 */
export const useCoursesDropdown = () => {
  const { data, refetch } = useCourseFindManyQuery({
    variables: {
      take: 10,
    },
  });

  async function loadOptions(
    search: string,
    prevOptions: OptionsOrGroups<CourseOptionType, GroupBase<CourseOptionType>>
  ) {
    const result =
      data?.courseFindMany?.map((course) => ({
        value: course.id,
        label: course.title,
      })) ?? [];

    const newOptions = result.filter(
      (option) =>
        !prevOptions.some(
          (prevOption) =>
            (prevOption as CourseOptionType).value === option.value
        )
    );

    const response = await refetch({
      skip: prevOptions.length,
      where: {
        title: {
          contains: search,
          mode: QueryMode.Insensitive,
        },
      },
    });

    const fetchedOptions =
      response.data?.courseFindMany?.map((course) => ({
        value: course.id,
        label: course.title,
      })) ?? [];

    return {
      options: [...prevOptions, ...fetchedOptions],
      hasMore: fetchedOptions.length > 0,
    };
  }

  return { loadOptions };
};

/**
 * custom hook for courses handler
 * @returns selectedCourse, setSelectedCourse, currentCourseSelector, addCourse, removeCourse
 */
export const AddCourseHandler = () => {
  const dispatch = useDispatch();
  const currentCourseSelector = useSelector(
    (state: RootState) => state.reward.connectCourse
  );
  const [selectedCourse, setSelectedCourse] = useState<CourseOptionType | undefined>(
    currentCourseSelector?.[0]
  );

  const addCourse = (course: CourseOptionType) => {
    setSelectedCourse(course);
    dispatch(changeConnectCourse([course]));
  };

  const removeCourse = () => {
    setSelectedCourse(undefined);
    dispatch(changeConnectCourse([]));
  };

  useEffect(() => {
    setSelectedCourse(currentCourseSelector?.[0]);
  }, [currentCourseSelector]);

  return {
    selectedCourse,
    setSelectedCourse,
    addCourse,
    removeCourse,
  };
};

const useNewRewardViewModel = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const { selectedCourse } = AddCourseHandler();

  const currentId = session?.user.id;

  // Local states
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [rewardName, setRewardName] = useState("");
  const [rewardDesc, setRewardDesc] = useState("");
  const [pointsRequired, setPointsRequired] = useState(0);
  const [endSales, setEndSales] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [rewardType, setRewardType] = useState<any>("");

  // Redux states
  const status = useSelector((state: RootState) => state.reward.status);

  const [namaReward, setNamaReward] = useField(
    (state: RootState) => state.reward.namaReward,
    (value) => changeNamaReward(value),
  );

  const [fotoProduk, setFotoProduk] = useField(
    (state: RootState) => state.reward.fotoProduk,
    (value) => changeFotoProduk(value),
  );

  const [deskripsiReward, setDeskripsiReward] = useField(
    (state: RootState) => state.reward.deskripsiReward,
    (value) => changeDeskripsiReward(value),
  );

  const [hargaPoint, setHargaPoint] = useField(
    (state: RootState) => state.reward.hargaPoint,
    (value) => changeHargaPoint(value),
  );

  const [akhirMasaBerlaku, setAkhirMasaBerlaku] = useField(
    (state: RootState) => state.reward.akhirMasaBerlaku,
    (value) => changeAkhirMasaBerlaku(value),
  );

  const [cash, setCash] = useField(
    (state: RootState) => state.reward.cash,
    (value) => changeHargaPoint(value),
  );

  const handleStatusChange = (status: string) => {
    dispatch(changeStatus(status));
  };

  const handleChangeHargaPoint = (price: string) => {
    dispatch(changeHargaPoint(price));
  };

  const handleChangeCash = (price: string) => {
    dispatch(changeCash(price));
  };

  // Modify soon
  const firstSelectedCourse = selectedCourse?.value;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(changeFotoProduk(reader.result as string));
    };
    reader.readAsDataURL(file);
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [rewardsCatalogCreateMutation] = useRewardsCatalogCreateOneMutation();

  const handleRewardsCatalogCreateOneMutation = async ({
    deskripsiReward,
    hargaPoint,
    cash,
    firstSelectedCourse,
    rewardType
  }: any) => {
    const data = await rewardsCatalogCreateMutation({
      variables: {
        data: {
          title: rewardType === "CASH" ? cash : null,
          rewardsType: rewardType,
          pointsRequired: Number(hargaPoint),
          endSales: date,
          description: deskripsiReward,
          createdBy: {
            connect: {
              id: currentId
            }
          },
          course: {
            connect: {
              id: rewardType === "COURSE" ? firstSelectedCourse : null,
            }
          }
        },
      },
    });

    return data;
  };

  const resetForm = () => {
    dispatch(changeNamaReward(""));
    dispatch(changeDeskripsiReward(""));
    dispatch(changeHargaPoint(""));
    dispatch(changeAkhirMasaBerlaku(""));
    dispatch(changeStatus("published"));
    dispatch(changeFotoProduk(""));
    dispatch(changeConnectCourse([]));
    dispatch(changeCash(""));
  }

  const onSubmit = async () => {
    // Check if any required field is empty
    if (!deskripsiReward || !hargaPoint || !date) {
      setErrorMessage("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const data = await handleRewardsCatalogCreateOneMutation({
        deskripsiReward,
        hargaPoint,
        cash,
        firstSelectedCourse,
        rewardType,
      });
      const result = data.data;
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      resetForm();
      await router.push("/admin/affiliate/reward");
      router.reload();
    }
  };

  return {
    previewImages,
    setPreviewImages,
    rewardName,
    setRewardName,
    rewardDesc,
    setRewardDesc,
    pointsRequired,
    setPointsRequired,
    endSales,
    setEndSales,
    handleFileChange,
    handleFileClick,
    fileInputRef,
    onSubmit,
    errorMessage,
    namaReward,
    setNamaReward,
    fotoProduk,
    deskripsiReward,
    setDeskripsiReward,
    hargaPoint,
    setHargaPoint,
    akhirMasaBerlaku,
    setAkhirMasaBerlaku,
    handleStatusChange,
    status,
    handleChangeHargaPoint,
    loading,
    router,
    date,
    setDate,
    endDate,
    setEndDate,
    rewardType,
    setRewardType,
    handleChangeCash,
    cash,
  };
};

export default useNewRewardViewModel;

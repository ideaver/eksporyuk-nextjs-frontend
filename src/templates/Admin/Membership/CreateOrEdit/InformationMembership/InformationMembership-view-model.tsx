import {
  QueryMode,
  useCourseFindManyQuery,
  useMembershipCategoryCreateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { RootState } from "@/app/store/store";
import {
  changeAffiliateCommission,
  changeAffiliateFirstCommission,
  changeBenefits,
  changeCourses,
  changeDescription,
  changeDuration,
  changeName,
  changePrice,
} from "@/features/reducers/membership/membershipReducer";
import { CourseOptionType } from "@/templates/Admin/Affiliators/RewardManagement/Create/NewReward/NewReward-view-model";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GroupBase, OptionsOrGroups } from "react-select";
import * as Yup from "yup";

export const breadcrumbs = [
  {
    title: "Manajemen Membership",
    path: "/admin/product-management/subscriber",
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

export const useMembershipForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);

  const membershipState = useSelector((state: RootState) => state.memebrship);
  const dispatch = useDispatch();
  const idCourses = membershipState.courses.map((e) => ({ id: e.value }));

  const [membershipCeateOne] = useMembershipCategoryCreateOneMutation();

  const resetMembershipState = () => {
    dispatch(changeName(""));
    dispatch(changeDescription(""));
    dispatch(changePrice("0"));
    dispatch(changeBenefits(""));
    dispatch(changeDuration(0));
    dispatch(changeCourses([]));
    dispatch(changeAffiliateCommission(100));
    dispatch(changeAffiliateFirstCommission(100));
  };

  const membershipSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Minimal 3 simbol")
      .max(50, "Maksimal 50 simbol")
      .required("Nama diperlukan"),
    description: Yup.string()
      .min(10, "Minimal 10 simbol")
      .required("Deskripsi diperlukan"),
    price: Yup.number().min(2, "Minimal 2 simbol").required("Harga diperlukan"),
    benefits: Yup.string()
      .min(5, "Minimal 5 simbol")
      .required("Benefit diperlukan"),
    duration: Yup.number().required("Content diperlukan"),
  });

  const membershipForm = useFormik({
    initialValues: {
      name: membershipState.name,
      description: membershipState.description,
      price: membershipState.price,
      benefits: membershipState.benefits,
      duration: membershipState.duration,
    },
    validationSchema: membershipSchema,
    onSubmit: async () => {
      setIsloading(true);
      try {
        await membershipCeateOne({
          variables: {
            data: {
              createdBy: {
                connect: {
                  id: session?.user.id,
                },
              },
              name: membershipState.name,
              description: membershipState.description,
              benefits: membershipState.benefits,
              price: parseFloat(membershipState.price),
              affiliateCommission: parseFloat(
                membershipState.affiliateCommision.toString()
              ),
              affiliateFirstCommission: parseFloat(
                membershipState.affiliateFirstCommision.toString()
              ),
              durationDay: membershipState.duration,
              benefitCourses: {
                connect: idCourses,
              },
            },
          },
        });
        resetMembershipState();
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
        await router.push("/admin/product-management/subscriber");
        router.reload();
      }
    },
  });

  return {
    formik: membershipForm,
    resetMembershipState,
    membershipState,
    isLoading,
    setIsloading,
  };
};

const useInformationMembershipViewModel = () => {
  const dispatch = useDispatch();
  const coursesState = useSelector(
    (state: RootState) => state.memebrship.courses
  );

  const handleChangeCourses = (course: { value: number; label: string }) => {
    dispatch(changeCourses([...coursesState, course]));
  };
  const handleDeleteCourses = (id: number) => {
    dispatch(changeCourses(coursesState.filter((val) => val.value !== id)));
  };

  const handleChangeAffiliateFirstCommission = (val: number) => {
    dispatch(changeAffiliateFirstCommission(val));
  };
  const handleChangeAffiliateCommission = (val: number) => {
    dispatch(changeAffiliateCommission(val));
  };

  return {
    handleDeleteCourses,
    handleChangeCourses,
    handleChangeAffiliateCommission,
    handleChangeAffiliateFirstCommission,
  };
};

export default useInformationMembershipViewModel;

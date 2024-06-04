import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  changeBenefits,
  changeDescription,
  changeDuration,
  changeMembershipType,
  changeName,
  changePrice,
} from "@/features/reducers/membership/membershipReducer";
import {
  MembershipTypeEnum,
  useMembershipCategoryCreateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { useSession } from "next-auth/react";

export const breadcrumbs = [
  {
    title: "Manajemen Membership",
    path: "/admin/membership",
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

export const useMembershipForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);

  const membershipState = useSelector((state: RootState) => state.memebrship);
  const dispatch = useDispatch();

  const [membershipCeateOne] = useMembershipCategoryCreateOneMutation();

  const resetMembershipState = () => {
    dispatch(changeName(""));
    dispatch(changeDescription(""));
    dispatch(changePrice("0"));
    dispatch(changeBenefits(""));
    dispatch(changeDuration(0));
    dispatch(changeMembershipType(MembershipTypeEnum.ThreeMonth));
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
              name: membershipState.name,
              description: membershipState.description,
              benefits: membershipState.benefits,
              price: parseFloat(membershipState.price),
              membershipType: membershipState.membershipType,
              durationDay: membershipState.duration,
              createdBy: {
                connect: {
                  id: session?.user.id,
                },
              },
            },
          },
        });
        resetMembershipState();
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
        await router.push("/admin/membership");
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
  const handleChangeMembershipType = (type: MembershipTypeEnum) => {
    dispatch(changeMembershipType(type));
  };
  return {
    handleChangeMembershipType,
  };
};

export default useInformationMembershipViewModel;

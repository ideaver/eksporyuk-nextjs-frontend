import {
  MembershipCategoryFindOneQuery,
  MembershipTypeEnum,
  useMembershipCategoryUpdateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useSession } from "next-auth/react";

export const breadcrumbs = [
  {
    title: "Manajemen Membership",
    path: "/admin/subscriber",
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
    title: "Semua Membership",
    path: "/admin/subscriber",
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

export interface IEditMembershipProps {
  id: string | string[] | undefined;
  data: MembershipCategoryFindOneQuery;
}

interface EditMembershipForm {
  name: string | undefined;
  description: string | undefined;
  price: number | undefined;
  benefits: string | undefined;
  membershipType: MembershipTypeEnum | undefined;
  duration: number | undefined;
  id: string | string[] | undefined;
  courses: { value: number; label: string }[] | undefined;
}

const useEditMembershipForm = ({
  name,
  description,
  price,
  benefits,
  membershipType,
  duration,
  id,
  courses,
}: EditMembershipForm) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);
  const [membershipUpdateOne] = useMembershipCategoryUpdateOneMutation();

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

  const idCourses = courses?.map((e) => ({
    id: e.value,
  }));
  console.log(idCourses);

  const editMembershipForm = useFormik({
    initialValues: {
      name,
      description,
      price,
      benefits,
      duration,
    },
    validationSchema: membershipSchema,
    onSubmit: async () => {
      setIsloading(true);
      try {
        await membershipUpdateOne({
          variables: {
            where: {
              id: parseInt(id as string),
            },
            data: {
              name: {
                set: name,
              },
              description: {
                set: description,
              },
              price: {
                set: price,
              },
              benefits: {
                set: benefits,
              },
              durationDay: {
                set: duration,
              },
              membershipType: {
                set: membershipType,
              },
              benefitCourses: {
                set: idCourses,
              },
            },
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
        await router.push("/admin/subscriber");
        router.reload();
      }
    },
  });
  return { formik: editMembershipForm, isLoading, setIsloading };
};

const useEditMembershipViewModel = ({ id, data }: IEditMembershipProps) => {
  const [name, setName] = useState(data.membershipCategoryFindOne?.name);
  const [description, setDescription] = useState(
    data.membershipCategoryFindOne?.description
  );
  const [price, setPrice] = useState(data.membershipCategoryFindOne?.price);
  const [benefits, setBenefits] = useState(
    data.membershipCategoryFindOne?.benefits
  );
  const [membershipType, setMembershipType] = useState(
    data.membershipCategoryFindOne?.membershipType
  );
  const [duration, setDuration] = useState(
    data.membershipCategoryFindOne?.durationDay
  );
  const [courses, setCourses] = useState(
    data.membershipCategoryFindOne?.benefitCourses?.map((e) => ({
      value: e.id,
      label: e.title,
    }))
  );

  const handleChangeCourses = (course: { value: number; label: string }) => {
    setCourses((prev: any) => [...prev, course]);
  };

  const handleDeleteCourses = (id: number) => {
    setCourses((prev) => prev?.filter((val) => val.value !== id));
  };

  const { formik, isLoading, setIsloading } = useEditMembershipForm({
    id,
    name,
    description,
    price,
    benefits,
    membershipType,
    duration,
    courses,
  });

  return {
    handleChangeCourses,
    handleDeleteCourses,
    courses,
    benefits,
    formik,
    isLoading,
    setIsloading,
    setName,
    setDescription,
    setPrice,
    setBenefits,
    setMembershipType,
    setDuration,
    membershipType,
    price,
  };
};

export default useEditMembershipViewModel;

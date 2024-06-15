import {
  MembershipBenefitServiceEnum,
  MembershipCategoryFindOneQuery,
  useMembershipCategoryUpdateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
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
  {
    title: "Semua Membership",
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

export interface IEditMembershipProps {
  id: string | string[] | undefined;
  data: MembershipCategoryFindOneQuery;
}

interface EditMembershipForm {
  name: string | undefined;
  description: string | undefined;
  price: number | undefined;
  benefits: string | undefined;
  subscriberListId?: string;
  duration: number | undefined;
  id: string | string[] | undefined;
  courses: { value: number; label: string }[] | undefined;
  affiliateCommission: number | undefined;
  affiliateFirstCommission: number | undefined;
  benefitService: MembershipBenefitServiceEnum[] | undefined | null;
}

const useEditMembershipForm = ({
  name,
  description,
  price,
  benefits,
  duration,
  subscriberListId,
  id,
  courses,
  affiliateCommission,
  affiliateFirstCommission,
  benefitService,
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
    subscriberListId: Yup.string().optional(),
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
      subscriberListId,
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
              subscriberListId: {
                set: subscriberListId,
              },
              benefits: {
                set: benefits,
              },
              durationDay: {
                set: duration,
              },
              benefitCourses: {
                set: idCourses,
              },
              affiliateCommission: {
                set: affiliateCommission,
              },
              affiliateFirstCommission: {
                set: affiliateFirstCommission,
              },
              membershipBenefitServiceEnum: {
                set: benefitService,
              },
            },
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
        await router.push("/admin/product-management/subscriber");
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
  const [duration, setDuration] = useState(
    data.membershipCategoryFindOne?.durationDay
  );
  const [courses, setCourses] = useState(
    data.membershipCategoryFindOne?.benefitCourses?.map((e) => ({
      value: e.id,
      label: e.title,
    }))
  );
  const [affiliateCommission, setAffiliateCommission] = useState(
    data.membershipCategoryFindOne?.affiliateCommission
  );
  const [affiliateFirstCommission, setAffiliateFirstCommission] = useState(
    data.membershipCategoryFindOne?.affiliateFirstCommission
  );
  const [benefitService, setBenefitService] = useState(
    data.membershipCategoryFindOne?.membershipBenefitServiceEnum
  );

  const [subscriberListId, setSubscriberListId] = useState(
    data.membershipCategoryFindOne?.subscriberListId || undefined
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
    duration,
    courses,
    affiliateCommission,
    affiliateFirstCommission,
    subscriberListId,
    benefitService,
  });

  const benefitServiceOptions = Object.keys(MembershipBenefitServiceEnum).map(
    (key) => {
      return {
        value:
          MembershipBenefitServiceEnum[
            key as keyof typeof MembershipBenefitServiceEnum
          ],
        label: key,
      };
    }
  );

  return {
    setBenefitService,
    benefitService,
    benefitServiceOptions,
    affiliateCommission,
    affiliateFirstCommission,
    setAffiliateCommission,
    setAffiliateFirstCommission,
    subscriberListId,
    setSubscriberListId,
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
    setDuration,
    price,
  };
};

export default useEditMembershipViewModel;

import {
  BuyerFindOneQuery,
  InternationalTradeDeliveryTypeEnum,
  QueryMode,
  useBuyerUpdateOneMutation,
  useCountryFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { GroupBase, OptionsOrGroups } from "react-select";
import * as Yup from "yup";

export interface IEditBuyer {
  id: string | string[] | undefined;
  data: BuyerFindOneQuery | undefined;
}

export const breadcrumbs = [
  {
    title: "Manajemen Buyer",
    path: "/admin/buyers",
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
    title: "Semua Buyer",
    path: "/admin/buyers",
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

interface EditFormProps {
  buyerName: string | undefined | null;
  companyName: string | undefined | null;
  address: string | undefined | null;
  email: string | undefined | null;
  phone: string | undefined | null;
  country: any | undefined | null;
  demand: string | undefined | null;
  quantity: number | undefined | null;
  abbreviation: string | undefined | null;
  price: string | undefined | null;
  deliveryType: InternationalTradeDeliveryTypeEnum | undefined | null;
}

const useEditBuyerForm = ({
  buyerName,
  companyName,
  address,
  email,
  phone,
  country,
  demand,
  quantity,
  abbreviation,
  price,
  deliveryType,
}: EditFormProps) => {
  const router = useRouter();

  const buyerSchema = Yup.object().shape({
    buyerName: Yup.string()
      .min(3, "Minimal 3 simbol")
      .max(50, "Maksimal 50 simbol")
      .required("Nama diperlukan"),
    address: Yup.string()
      .min(5, "Minimal 5 simbol")
      .max(300, "Maksimal 300 simbol")
      .required("Alamat diperlukan"),
    companyName: Yup.string()
      .min(3, "Minimal 3 simbol")
      .max(50, "Maksimal 50 simbol")
      .required("Alamat diperlukan"),
    email: Yup.string()
      .email("Format email salah")
      .min(3, "Minimal 3 simbol")
      .max(50, "Maksimal 50 simbol")
      .required("Alamat diperlukan"),
    phone: Yup.string()
      .min(6, "Minimal 6 simbol")
      .max(25, "Maksimal 25 simbol")
      .required("Alamat diperlukan"),
    demand: Yup.string()
      .min(3, "Minimal 3 simbol")
      .max(50, "Maksimal 50 simbol")
      .required("Demand diperlukan"),
    quantity: Yup.string()
      .min(1, "Minimal 1 simbol")
      .max(50, "Maksimal 100 simbol")
      .required("Jumlah demand diperlukan"),
    price: Yup.string()
      .min(3, "Minimal 3 simbol")
      .max(50, "Maksimal 50 simbol")
      .required("price diperlukan"),
  });

  const editBuyerFormik = useFormik({
    initialValues: {
      buyerName,
      address,
      companyName,
      email,
      phone,
      demand,
      quantity,
      price,
    },
    validationSchema: buyerSchema,
    onSubmit: (values) => {
      router.push("/admin/buyers/demand");
    },
  });
  return { formik: editBuyerFormik };
};

type OptionType = {
  value: number;
  label: string;
};

export const useCountryDropdown = () => {
  const getCountries = useCountryFindManyQuery({
    variables: {
      take: 3,
    },
  });

  async function loadOptions(
    search: string,
    prevOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>
  ) {
    const result =
      getCountries.data?.countryFindMany?.map((country) => ({
        value: country.id,
        label: country.name,
      })) ?? [];
    await getCountries.refetch({
      skip: prevOptions.length,
      where: {
        name: {
          contains: search,
          mode: QueryMode.Insensitive,
        },
      },
    });

    return {
      options: result,
      hasMore: true,
    };
  }

  return { loadOptions };
};

const useEditBuyerViewModel = ({ id, data }: IEditBuyer) => {
  const [buyerName, setBuyerName] = useState(data?.buyerFindOne?.buyerName);
  const [companyName, setCompanyName] = useState(
    data?.buyerFindOne?.companyName
  );
  const [address, setAddress] = useState<any>(data?.buyerFindOne?.address);
  const [email, setEmail] = useState(data?.buyerFindOne?.email);
  const [phone, setPhone] = useState(data?.buyerFindOne?.phone);
  const [country, setCountry] = useState({
    value: data?.buyerFindOne?.country?.id,
    label: data?.buyerFindOne?.country?.name,
  });
  const [demand, setDemand] = useState(data?.buyerFindOne?.productName);
  const [quantity, setQuantity] = useState(data?.buyerFindOne?.quantity);
  const [abbreviation, setAbbreviation] = useState(
    data?.buyerFindOne?.abbreviation
  );
  const [price, setPrice] = useState(data?.buyerFindOne?.price);
  const [deliveryType, setDeliveryType] = useState(
    data?.buyerFindOne?.deliveryType
  );

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const [buyerUpdateOne, response] = useBuyerUpdateOneMutation();

  const { formik } = useEditBuyerForm({
    buyerName,
    companyName,
    address: address,
    email,
    phone,
    country,
    demand,
    quantity,
    abbreviation,
    price,
    deliveryType,
  });
  const shippingOption = Object.entries(InternationalTradeDeliveryTypeEnum).map(
    ([value, label]) => ({ value: label, label })
  );

  const handleBuyerUpdateOne = async () => {
    if (formik.isValid.valueOf() == false) return;
    setLoading(true);

    try {
      await buyerUpdateOne({
        variables: {
          where: {
            id: parseInt(id as string),
          },
          data: {
            buyerName: {
              set: buyerName,
            },
            companyName: {
              set: companyName,
            },
            address: {
              set: address,
            },
            email: {
              set: email,
            },
            phone: {
              set: phone,
            },
            country: {
              connect: {
                id: country.value,
              },
            },
            productName: {
              set: demand,
            },
            quantity: {
              set: quantity,
            },
            price: {
              set: price,
            },
            deliveryType: {
              set: deliveryType,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      await router.push("/admin/buyers");
      router.reload();
    }
  };

  return {
    handleBuyerUpdateOne,
    loading,
    setLoading,
    buyerUpdateOne,
    response,
    shippingOption,
    formik,
    buyerName,
    companyName,
    address,
    email,
    phone,
    country,
    demand,
    quantity,
    abbreviation,
    price,
    deliveryType,
    setBuyerName,
    setAddress,
    setCompanyName,
    setEmail,
    setPhone,
    setCountry,
    setDemand,
    setQuantity,
    setAbbreviation,
    setPrice,
    setDeliveryType,
  };
};
export default useEditBuyerViewModel;

import {
  InternationalTradeDeliveryTypeEnum,
  QueryMode,
  useCountryFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import {
  changeAbbreviation,
  changeBuyerName,
  changeCompanyAddress,
  changeCompanyName,
  changeCountry,
  changeDemand,
  changeDemandQuantity,
  changeEmail,
  changePrice,
  changeShippingTerms,
  changeTelephoneNumber,
} from "@/features/reducers/buyers/buyersReducer";
import { useDispatch, useSelector } from "react-redux";
import { GroupBase, OptionsOrGroups } from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RootState } from "@/app/store/store";
import { useRouter } from "next/router";

// validation form
export const useBuyerInformationForm = () => {
  const buyerState = useSelector((state: RootState) => state.buyer);
  const dispatch = useDispatch();
  const router = useRouter();

  const buyerSchema = Yup.object().shape({
    buyerName: Yup.string()
      .min(3, "Minimal 3 simbol")
      .max(50, "Maksimal 50 simbol")
      .required("Nama diperlukan"),
    companyAddress: Yup.string()
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
    telephoneNumber: Yup.string()
      .min(6, "Minimal 6 simbol")
      .max(25, "Maksimal 25 simbol")
      .required("Alamat diperlukan"),
  });

  const buyer = useSelector((state: RootState) => state.buyer);

  const BuyerInformationformik = useFormik({
    initialValues: {
      buyerName: buyerState.buyerName,
      companyAddress: buyerState.companyAddress,
      companyName: buyerState.companyName,
      email: buyerState.email,
      telephoneNumber: buyerState.telephoneNumber,
    },
    validationSchema: buyerSchema,
    onSubmit: (values) => {
      router.push("/admin/buyers/demand");
    },
  });
  return { formik: BuyerInformationformik };
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

const useResetBuyerState = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const resetBuyerState = () => {
    dispatch(changeAbbreviation("Ton"));
    dispatch(changeBuyerName(""));
    dispatch(changeCountry(1));
    dispatch(changeCompanyName(""));
    dispatch(changeCompanyAddress(""));
    dispatch(changeDemand(""));
    dispatch(changeDemandQuantity(""));
    dispatch(changePrice(""));
    dispatch(changeEmail(""));
    dispatch(changeShippingTerms(InternationalTradeDeliveryTypeEnum.Cfr));
    dispatch(changeTelephoneNumber(""));
    router.push("/admin/buyers");
  };
  return { resetBuyerState };
};

const CountryChangeHandler = () => {
  const dispatch = useDispatch();
  const country = useSelector((state: RootState) => state.buyer.country);

  const handleChangeCountry = (value: number) => {
    dispatch(changeCountry(value));
  };
  return {
    country,
    handleChangeCountry,
  };
};

const useBuyerInformationViewModel = () => {
  const countryChangeHandler = CountryChangeHandler();
  const { resetBuyerState } = useResetBuyerState();

  return {
    ...countryChangeHandler,
    resetBuyerState,
  };
};

export default useBuyerInformationViewModel;

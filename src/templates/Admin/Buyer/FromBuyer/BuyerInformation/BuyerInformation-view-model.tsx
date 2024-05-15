import { RootState } from "@/app/store/store";
import {
  QueryMode,
  useCountryFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import {
  changeBuyerName,
  changeCompanyAddress,
  changeCompanyName,
  changeCountry,
  changeEmail,
  changeTelephoneNumber,
} from "@/features/reducers/buyers/buyersReducer";
import { UnknownAction } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GroupBase, OptionsOrGroups } from "react-select";

type OptionType = {
  value: number;
  label: string;
};

export const useCountryDropdown = () => {
  const getMentors = useCountryFindManyQuery({
    variables: {
      take: 3,
    },
  });

  async function loadOptions(
    search: string,
    prevOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>
  ) {
    const result =
      getMentors.data?.countryFindMany?.map((mentor) => ({
        value: mentor.id,
        label: mentor.name,
      })) ?? [];
    await getMentors.refetch({
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

const useField = (
  selector: (state: RootState) => string,
  action: (value: string) => UnknownAction
) => {
  const dispatch = useDispatch();
  const initialValue = useSelector(selector);
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    dispatch(action(event.target.value));
  };

  return [value, handleChange];
};

const useBuyerInformationViewModel = () => {
  const [inputBuyerName, setInputBuyerName] = useField(
    (state: RootState) => state.buyer.buyerName,
    (value) => changeBuyerName(value)
  );
  const [inputCompanyAddress, setInputCompanyAddress] = useField(
    (state: RootState) => state.buyer.companyAddress,
    (value) => changeCompanyAddress(value)
  );
  const [inputCompanyName, setInputCompanyName] = useField(
    (state: RootState) => state.buyer.companyName,
    (value) => changeCompanyName(value)
  );
  const [inputCountry, setInputCountry] = useField(
    (state: RootState) => state.buyer.country,
    (value) => changeCountry(value)
  );
  const [inputEmail, setInputEmail] = useField(
    (state: RootState) => state.buyer.email,
    (value) => changeEmail(value)
  );
  const [inputTelephoneNumber, setInputTelephoneNumber] = useField(
    (state: RootState) => state.buyer.telephoneNumber,
    (value) => changeTelephoneNumber(value)
  );
  return {
    inputCompanyAddress,
    setInputCompanyAddress,
    inputCompanyName,
    setInputCompanyName,
    inputCountry,
    setInputCountry,
    inputEmail,
    setInputEmail,
    inputTelephoneNumber,
    setInputTelephoneNumber,
    inputBuyerName,
    setInputBuyerName,
  };
};

export default useBuyerInformationViewModel;

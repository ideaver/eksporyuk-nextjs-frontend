import {
  QueryMode,
  useCourseFindManyQuery,
  useLeaderboardAffiliatorFindManyQuery,
  useMembershipCategoryFindManyQuery,
  useUserCompetitorsQueryQuery,
} from "@/app/service/graphql/gen/graphql";
import { useEffect, useState } from "react";
import { GroupBase, OptionsOrGroups } from "react-select";

export const breadcrumbs = [
  {
    title: "Leaderboard",
    path: "/admin/affiliate/leaderboard",
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
type CourseOptionType = {
  value: string;
  label: string;
};

export const useCoursesDropdown = () => {
  const { data, refetch } = useCourseFindManyQuery({
    variables: {
      take: null,
    },
  });

  async function loadOptions(
    search: string,
    prevOptions: OptionsOrGroups<CourseOptionType, GroupBase<CourseOptionType>>
  ) {
    const result =
      data?.courseFindMany?.map((course) => ({
        value: course.title,
        label: course.title,
      })) ?? [];

    const response = await refetch({
      skip: prevOptions.length,
      where: {
        title: {
          contains: search,
          mode: QueryMode.Insensitive,
        },
      },
    });

    result.unshift({ value: "", label: "Semua" });

    return {
      options: result,
      hasMore: true,
    };
  }

  return { loadOptions };
};
export const useMembershipOptions = () => {
  const { data, refetch } = useMembershipCategoryFindManyQuery({
    variables: {
      take: null,
    },
  });

  async function loadOptions(
    search: string,
    prevOptions: OptionsOrGroups<CourseOptionType, GroupBase<CourseOptionType>>
  ) {
    const result =
      data?.membershipCategoryFindMany?.map((membership) => ({
        value: membership.name,
        label: membership.name,
      })) ?? [];

    const response = await refetch({
      skip: prevOptions.length,
      where: {
        name: {
          contains: search,
          mode: QueryMode.Insensitive,
        },
      },
    });

    result.unshift({ value: "", label: "Semua" });

    return {
      options: result,
      hasMore: false,
    };
  }

  return { loadOptions };
};

export const useUserCompetitor = () => {
  const addDaysToDate = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const [date, setDate] = useState([
    addDaysToDate(new Date(), -1),
    addDaysToDate(new Date(), 30),
  ]);
  const [coursesName, setCoursesName] = useState<string | undefined>(undefined);

  const { data, refetch, loading } = useLeaderboardAffiliatorFindManyQuery({
    variables: {
      leaderboardAffiliatorArgs: {
        endDate: date[1]?.toISOString(),
        startDate: date[0]?.toISOString(),
        take: 10,
        search: coursesName,
      },
    },
  });

  const onChange = (date: Date[]) => {
    console.log({
      userCompetitorQuery: {
        future: date[1]?.toISOString(),
        past: date[0]?.toISOString(),
        take: 10,
      },
    });
    setDate(date);
    refetch({
      leaderboardAffiliatorArgs: {
        endDate: date[1]?.toISOString(),
        startDate: date[0]?.toISOString(),
        take: 10,
        search: coursesName,
      },
    });
  };
  const handleSearch = (name: string) => {
    setCoursesName(name);
    refetch({
      leaderboardAffiliatorArgs: {
        endDate: date[1]?.toISOString(),
        startDate: date[0]?.toISOString(),
        take: 10,
        search: coursesName,
      },
    });
  };

  return { data, onChange, date, loading, handleSearch };
};
const useMemberViewModel = () => {};

export default useMemberViewModel;

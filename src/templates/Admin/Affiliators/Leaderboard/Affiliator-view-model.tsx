import { useUserCompetitorsQueryQuery } from "@/app/service/graphql/gen/graphql";
import { useState } from "react";

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

export const useUserCompetitor = () => {
  const [date, setDate] = useState([new Date(), new Date()]);
  const { data, refetch, loading } = useUserCompetitorsQueryQuery({
    variables: {
      userCompetitorQuery: {
        future: date[1]?.toISOString(),
        past: date[0]?.toISOString(),
        take: 10,
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
      userCompetitorQuery: {
        future: date[1]?.toISOString(),
        past: date[0]?.toISOString(),
        take: 10,
      },
    });
  };

  return { data, onChange, date, loading };
};
const useMemberViewModel = () => {};

export default useMemberViewModel;

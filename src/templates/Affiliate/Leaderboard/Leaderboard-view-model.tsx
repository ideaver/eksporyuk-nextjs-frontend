import { LeaderboardTableType } from "@/types/tables/leaderboard";
import { useState } from "react";
const rankData: LeaderboardTableType[] = [
  {
    rank: 1,
    name: "Dian Adit Swatiska",
    leads: 41,
    sales: 41,
    commission: "Rp 698.342",
    image: "/media/avatars/300-1.jpg",
  },
  {
    rank: 2,
    name: "Fredrich Richard Oktavian",
    leads: 41,
    sales: 41,
    commission: "Rp 698.342",
    image: "/media/avatars/300-5.jpg",
  },
  {
    rank: 3,
    name: "Ferdy M Yoseph",
    leads: 41,
    sales: 41,
    commission: "Rp 698.342",
    image: "/media/avatars/300-3.jpg",
  },
  {
    rank: 4,
    name: "Nuryakin",
    leads: 41,
    sales: 41,
    commission: "Rp 698.342",
    image: "/media/avatars/300-8.jpg",
  },
];

const useLeaderboardViewModel = () => {
  const [leaderboardDateState, setLeaderboardDateState] = useState<any>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const tableRankData = rankData;
  const rankColors = ['bg-warning', 'bg-info', 'bg-danger'];

  const breadcrumbs = [
    {
      title: "Dashboard",
      path: "/affiliate/dashboard",
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

  return { breadcrumbs, leaderboardDateState, setLeaderboardDateState, tableRankData, rankColors };
};

export default useLeaderboardViewModel;

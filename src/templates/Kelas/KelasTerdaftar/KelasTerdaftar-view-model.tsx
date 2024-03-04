import { MenuComponent } from "@/_metronic/assets/ts/components";
import { ColorList } from "@/types/general/utilities";
import { useEffect, useState } from "react";

export interface CardRow {
    className?: string;
    icon: string
    nameIcon: string
    image: string
    title?: string;
    presentase?: number;
    totalPresentase?: number;
    colorPrecentage?: string;
    colorSubtle?: string;
    backgroundColor?: string;
    width: number;
    path?: string;
}

export interface CardProps {
  data: CardRow[];
}

export const cardData: CardRow[] = [
    {
        image: "/media/books/img-72.jpg",
        icon: "/media/avatars/300-5.jpg",
        title: "Ekspor Yuk Automation (EYA)",
        nameIcon: "Mentor EksporYuk",
        presentase: 100,
        totalPresentase: 100,
        colorPrecentage: "success",
        colorSubtle: "light-success",
        width: 350,
        path: "/",
    },
    {
        image: "/media/books/img-72.jpg",
        icon: "/media/avatars/300-5.jpg",
        title: "Ekspor Yuk Automation (EYA)",
        nameIcon: "Mentor EksporYuk",
        presentase: 100,
        totalPresentase: 100,
        colorPrecentage: "success",
        colorSubtle: "light-success",
        width: 350,
        path: "/",
    },
    {
        image: "/media/books/img-72.jpg",
        icon: "/media/avatars/300-5.jpg",
        title: "Ekspor Yuk Automation (EYA)",
        nameIcon: "Mentor EksporYuk",
        presentase: 100,
        totalPresentase: 100,
        colorPrecentage: "success",
        colorSubtle: "light-success",
        width: 350,
        path: "/",
    },
    {
        image: "/media/books/img-72.jpg",
        icon: "/media/avatars/300-5.jpg",
        title: "Ekspor Yuk Automation (EYA)",
        nameIcon: "Mentor EksporYuk",
        presentase: 70,
        totalPresentase: 100,
        colorPrecentage: "success",
        colorSubtle: "light-success",
        width: 350,
        path: "/",
    },
    {
        image: "/media/books/img-72.jpg",
        icon: "/media/avatars/300-5.jpg",
        title: "Ekspor Yuk Automation (EYA)",
        nameIcon: "Mentor EksporYuk",
        presentase: 70,
        totalPresentase: 100,
        colorPrecentage: "success",
        colorSubtle: "light-success",
        width: 350,
        path: "/",
    },
];

const useKelasTerdaftarViewModel = () => {
  const [exportModalState, setExportModalState] = useState<any>({
    startDate: new Date(),
    endDate: new Date(),
  });
  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  const [selectedFollupValue, setSelecteFollupValue] = useState("");

  const handleFollupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelecteFollupValue(event.target.value);
  };


  const breadcrumbs = [
    {
      title: "Kelas",
      path: "/kelas/kelas/kelas-terdaftar",
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

  return { breadcrumbs, exportModalState, setExportModalState, selectedFollupValue, handleFollupChange};
};

export default useKelasTerdaftarViewModel;

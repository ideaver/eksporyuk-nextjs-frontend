import { useState, useRef } from "react";

export const breadcrumbs = [
  {
    title: "Manajemen Produk",
    path: "/admin/affiliators",
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

const useAddNewCouponViewModel = () => {
  const [preview, setPreview] = useState<any | null>("https://via.placeholder.com/150");
  const fileInputRef = useRef<any>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      // Handle the file upload logic here
      console.log("Selected file:", file);
    }
  };

  return { preview, setPreview, handleImageClick, handleFileChange, fileInputRef };
};

export default useAddNewCouponViewModel;

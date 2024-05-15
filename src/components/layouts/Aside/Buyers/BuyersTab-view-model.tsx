import { useRouter } from "next/router";

export const useNavigation = () => {
  const router = useRouter();

  const handleNext = () =>
    router.pathname === "/admin/buyers/buyer-information" &&
    router.push("/admin/buyers/demand");
  const handlePrevious = () =>
    router.pathname === "/admin/buyers/demand" &&
    router.push("/admin/buyers/buyer-information");

  return { handleNext, handlePrevious };
};

import { useRouter } from "next/router";

export const useNavigation = () => {
  const router = useRouter();

  const pageMap: { [key: string]: string } = {
    "/buyer-information": "/demand",
  };

  const previousPageMap: { [key: string]: string } = Object.entries(
    pageMap
  ).reduce((acc, [key, value]) => ({ ...acc, [value]: key }), {});

  const navigate = (pageMap: { [key: string]: string }) => {
    const pathEnd = router.pathname.split("/").pop();
    const page = pageMap[`/${pathEnd}`];
    if (page) {
      router.push(`/admin/buyers/${page}`);
    }
  };

  const handleNext = () => navigate(pageMap);
  const handlePrevious = () => navigate(previousPageMap);

  return { handleNext, handlePrevious };
};

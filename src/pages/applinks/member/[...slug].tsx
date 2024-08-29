// pages/applinks/member/[...slug].js
import { useRouter } from "next/router";
import { useEffect } from "react";

const MemberLink = () => {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const userAgent = navigator.userAgent || "";
    const isAndroid = /android/i.test(userAgent);
    const isIOS =
      /iPad|iPhone|iPod/.test(userAgent) && !/windows phone/i.test(userAgent);

    const slugPath = Array.isArray(slug) ? slug.join("/") : slug || "";
    const appScheme = `yourapp://applinks/member/${slugPath}`;
    const playStoreUrl =
      "https://play.google.com/store/apps/details?id=com.eksporyuk.mobile_member";
    const appStoreUrl = "https://apps.apple.com/us/app/yourapp/id123456789";

    if (isAndroid || isIOS) {
      window.location.href = appScheme;
      setTimeout(() => {
        if (isAndroid) {
          window.location.href = playStoreUrl;
        } else if (isIOS) {
          window.location.href = appStoreUrl;
        }
      }, 2000);
    } else {
      router.push("/auth");
    }
  }, [router, slug]);

  return <div>Redirecting...</div>;
};

export default MemberLink;

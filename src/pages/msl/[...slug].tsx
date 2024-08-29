// pages/applinks/member/[...slug].tsx
import { useReferralLinkFindManyQuery } from "@/app/service/graphql/gen/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";

const MemberLink = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data, loading, error } = useReferralLinkFindManyQuery({
    variables: {
      where: {
        shortenLink: {
          contains: typeof window !== "undefined" ? window.location.href : "",
        },
      },
    },
  });

  useEffect(() => {
    if (loading) return;

    const userAgent = navigator.userAgent || "";
    const isAndroid = /android/i.test(userAgent);
    const isIOS =
      /iPad|iPhone|iPod/.test(userAgent) && !/windows phone/i.test(userAgent);

    const slugPath = Array.isArray(slug) ? slug.join("/") : slug || "";
    const appScheme = `yourapp://applinks/member/${slugPath}`;
    const playStoreUrl =
      "https://play.google.com/store/apps/details?id=com.eksporyuk.mobile_member";
    const appStoreUrl = "https://apps.apple.com/us/app/yourapp/id123456789";

    if (data && !error) {
      window.location.href =
        data?.referralLinkFindMany?.[0].link ?? window.location.href;
    } else if (isAndroid || isIOS) {
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
  }, [router, slug, data, error, loading]);

  return <div>Redirecting...</div>;
};

export default MemberLink;

/* eslint-disable jsx-a11y/anchor-is-valid */
import { StudentFindOneQuery } from "@/app/service/graphql/gen/graphql";
import Link from "next/link";

const SocialPage = ({
  data,
}: {
  data: StudentFindOneQuery["studentFindOne"];
}) => {
  const social = data?.user.socialMedia;
  return (
    <>
      <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
        <div className="card-header cursor-pointer  justify-content-between">
          <div className="card-title m-0 d-flex">
            <h3 className="fw-bolder m-0">Social Profile</h3>
          </div>
          {/* <button className="btn btn-sm btn-primary align-self-center">
            Edit Social Profile
          </button> */}
        </div>

        <div className="card-body p-9">
          <div className="row gy-5">
            {social?.facebookUrl && (
              <div className="col-lg-6 col">
                <SocialMediaCard
                  url={social?.facebookUrl}
                  img="/media/svg/social-logos/facebook.svg"
                  title="Facebook"
                />
              </div>
            )}
            {social?.githubUrl && (
              <div className="col-lg-6 col">
                <SocialMediaCard
                  url={social?.githubUrl}
                  img="/media/svg/social-logos/github.svg"
                  title="GitHub"
                />
              </div>
            )}

            {social?.instagramUrl && (
              <div className="col-lg-6 col">
                <SocialMediaCard
                  url={social?.instagramUrl}
                  img="/media/svg/social-logos/instagram.svg"
                  title="Instagram"
                />
              </div>
            )}
            {social?.linkedinUrl && (
              <div className="col-lg-6 col">
                <SocialMediaCard
                  url={social?.linkedinUrl}
                  img="/media/svg/social-logos/linkedin.svg"
                  title="LinkedIn"
                />
              </div>
            )}
            {social?.tiktokUrl && (
              <div className="col-lg-6 col">
                <SocialMediaCard
                  url={social?.tiktokUrl}
                  img="/media/svg/social-logos/tiktok.svg"
                  title="TikTok"
                />
              </div>
            )}
            {social?.twitterUrl && (
              <div className="col-lg-6 col">
                <SocialMediaCard
                  url={social?.twitterUrl}
                  img="/media/svg/social-logos/twitter.svg"
                  title="Twitter"
                />
              </div>
            )}
            {social?.websiteUrl && (
              <div className="col-lg-6 col">
                <SocialMediaCard
                  url={social?.websiteUrl}
                  img="/media/svg/social-logos/google.svg"
                  title="Website"
                />
              </div>
            )}

            {social?.youtubeUrl && (
              <div className="col-lg-6 col">
                <SocialMediaCard
                  url={social?.youtubeUrl}
                  img="/media/svg/social-logos/youtube.svg"
                  title="YouTube"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const SocialMediaCard = ({
  img,
  title,
  subtitle,
  url,
}: {
  img: string;
  title: string;
  subtitle?: string;
  url: string;
}) => {
  return (
    <div className="card border border-dashed border-1">
      <div className="card-body d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <img src={img} alt="" width={35} />
          <div className="ms-10">
            <h5 className="mb-0">{title}</h5>
            <p className="text-muted fw-bold mb-0 mt-0">{subtitle}</p>
          </div>
        </div>
        <Link href={url} className="btn btn-secondary align-self-center">
          Buka
        </Link>
      </div>
    </div>
  );
};

export default SocialPage;

/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import React from "react";

const SocialPage: React.FC = () => {
  return (
    <>
      <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
        <div className="card-header cursor-pointer  justify-content-between">
          <div className="card-title m-0 d-flex">
            <h3 className="fw-bolder m-0">Social Profile</h3>
          </div>
          <button className="btn btn-sm btn-primary align-self-center">
            Edit Social Profile
          </button>
        </div>

        <div className="card-body p-9">
          <div className="row gy-5">
            <div className="col-lg-6 col">
            <SocialMediaCard  url={"/"} img="/media/svg/social-logos/facebook.svg" title="Facebook" subtitle="fajar.setiawan"/>
            </div>
            <div className="col-lg-6 col">
            <SocialMediaCard  url={"/"} img="/media/svg/social-logos/twitter.svg" title="Facebook" subtitle="fajar.setiawan"/>
            </div>
            <div className="col-lg-6 col">
            <SocialMediaCard  url={"/"} img="/media/svg/social-logos/linkedin.svg" title="Facebook" subtitle="fajar.setiawan"/>
            </div>
            <div className="col-lg-6 col">
            <SocialMediaCard  url={"/"} img="/media/svg/social-logos/instagram.svg" title="Facebook" subtitle="fajar.setiawan"/>
            </div>
            <div className="col-lg-6 col">
            <SocialMediaCard  url={"/"} img="/media/svg/social-logos/youtube.svg" title="Facebook" subtitle="fajar.setiawan"/>
            </div>
            <div className="col-lg-6 col">
            <SocialMediaCard  url={"/"} img="/media/svg/social-logos/github.svg" title="Facebook" subtitle="fajar.setiawan"/>
            </div>
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
  url
}: {
  img: string;
  title: string;
  subtitle: string;
  url: string;
}) => {
  return (
    <div className="card border border-dashed border-1">
      <div className="card-body d-flex justify-content-between">
        <div className="d-flex">
          <img src={img} alt="" />
          <div className="ms-10">
            <h5 className="mb-0">{title}</h5>
            <p className="text-muted fw-bold mb-0">{subtitle}</p>
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

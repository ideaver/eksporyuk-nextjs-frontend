/* eslint-disable jsx-a11y/anchor-is-valid */

const Step3 = () => {
  return (
    <>
      <div data-kt-stepper-element="content">
        <div className="w-100 text-center">
          {/* begin::Heading */}
          <h1 className="fw-bold text-dark mb-3">Submit!</h1>
          {/* end::Heading */}

          {/* begin::Description */}
          <div className="text-muted fw-semibold fs-3">
            Simpan data Quiz dengan klik tombol Submit
          </div>
          {/* end::Description */}

          {/* begin::Illustration */}
          <div className="text-center px-4 py-15">
            <img
              src={"/media/illustrations/sketchy-1/4.png"}
              alt=""
              className="mw-100 mh-300px"
            />
          </div>
          {/* end::Illustration */}
        </div>
      </div>
    </>
  );
};

export { Step3 };

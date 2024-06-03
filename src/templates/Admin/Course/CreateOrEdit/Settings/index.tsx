import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { CourseLevelEnum } from "@/app/service/graphql/gen/graphql";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import CurrencyInput from "react-currency-input-field";
import useSettingsViewModel from "./Settings-view-model";

const CourseSettings = ({}) => {
  const {
    price,
    discountPrice,
    handleChangePrice,
    handleChangeDiscountPrice,
    courseLevel,
    handleChangeCourseLevel,
  } = useSettingsViewModel();
  return (
    <>
      <KTCard className="">
        <KTCardBody>
          <h3 className="mb-5">Pengaturan Harga</h3>
          <div className="row">
            <div className="col-lg">
              <h5 className="">Harga Normal</h5>
              <div className="input-group">
                <span className="input-group-text" id="price-field">
                  Rp
                </span>
                <CurrencyInput
                  className="form-control"
                  id="price-field"
                  name="price"
                  placeholder="Masukan Harga (Rp)"
                  intlConfig={{ locale: "id-ID" }}
                  defaultValue={0}
                  value={price}
                  decimalsLimit={2}
                  onValueChange={(value, name, values) =>
                    handleChangePrice(value ?? "")
                  }
                />
              </div>
            </div>
            <div className="col-lg mt-5 mt-lg-0">
              <h5 className="">Harga Diskon</h5>
              <div className="input-group">
                <span className="input-group-text" id="discount-price-field">
                  Rp
                </span>
                <CurrencyInput
                  className="form-control"
                  id="discount-price-field"
                  name="discount-price"
                  placeholder="Masukkan Harga Diskon (Rp)"
                  intlConfig={{ locale: "id-ID" }}
                  defaultValue={0}
                  value={discountPrice}
                  decimalsLimit={2}
                  onValueChange={(value, name, values) =>
                    handleChangeDiscountPrice(value ?? "")
                  }
                />
              </div>
            </div>
          </div>
        </KTCardBody>
      </KTCard>

      <KTCard className="mt-5">
        <KTCardBody>
          <h3 className="mb-5">Pengaturan Kelas</h3>
          <h5 className="">Tingkat Kesulitan</h5>
          <Dropdown
            value={courseLevel}
            options={[
              { value: CourseLevelEnum.Beginner, label: "Mudah" },
              { value: CourseLevelEnum.Intermediate, label: "Sedang" },
              { value: CourseLevelEnum.Advanced, label: "Sulit" },
            ]}
            onValueChange={(value) =>
              handleChangeCourseLevel(value as CourseLevelEnum)
            }
          ></Dropdown>
        </KTCardBody>
      </KTCard>
    </>
  );
};

export default CourseSettings;

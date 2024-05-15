import { PageTitle } from "@/_metronic/layout/core";
import { breadcrumbs } from "./Article-view-model";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";
import { useDummyData } from "./Article-view-model";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Badge } from "@/stories/atoms/Badge/Badge";
import Link from "next/link";

const ArticlePage = () => {
  const {
    articles,
    isCheckedAll,
    handleCheckedAllChange,
    handleCheckedItemChange,
  } = useDummyData();

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Semua Artikel</PageTitle>;
      <KTCard>
        <KTCardBody>
          <Head />
          <KTTable
            utilityGY={5}
            utilityGX={8}
            responsive="table-responsive my-10"
            className="fs-6"
          >
            <KTTableHead
              textColor="muted"
              fontWeight="bold"
              className="text-uppercase align-middle"
            >
              <th className="min-w-200px">
                {/* <CheckBoxInput
                  checked={isCheckedAll}
                  name="check-all"
                  value="all"
                  onChange={handleCheckedAllChange}
                > */}
                <p className="mb-0">JUDUL</p>
                {/* </CheckBoxInput> */}
              </th>
              <th className="text-end min-w-200px">PENULIS</th>
              <th className="text-end min-w-250px">TANGGAL</th>
              <th className="text-end min-w-250px">KATEGORI</th>
              <th className="text-end min-w-200px">STATUS</th>
              <th className="text-end min-w-125px">ACTION</th>
            </KTTableHead>
            <tbody className="align-middle">
              {articles.map((article) => {
                return (
                  <tr key={article.id} className="">
                    <td className="">
                      {/* <CheckBoxInput
                        className="ps-0"
                        checked={article.checked}
                        name="check-all"
                        value="all"
                        defaultChildren={false}
                        onChange={() => {
                          handleCheckedItemChange(article.id);
                        }}
                      > */}
                      <p className="fw-bold text-black mb-0 min-w-400px align-middle">
                        {article.title}
                      </p>
                      {/* </CheckBoxInput> */}
                    </td>

                    <td className="min-w-250px text-end fw-bold text-muted">
                      <img
                        className="symbol-label bg-gray-600 rounded-circle mx-3"
                        src={article.writer.image}
                        width={40}
                        height={40}
                        alt="flag"
                      />
                      <span className="text-muted fw-bold">
                        {article.writer.name}
                      </span>
                    </td>
                    <td className="min-w-200px text-end fw-bold text-muted">
                      {article.date}
                    </td>
                    <td className="min-w-200px text-end fw-bold text-muted">
                      {article.category.map((value: string) => {
                        return (
                          <Badge
                            key={value}
                            label={value}
                            badgeColor="dark"
                            classNames="mx-1"
                          />
                        );
                      })}
                    </td>
                    <td className="min-w-200px text-end fw-bold text-muted">
                      {article.status ? (
                        <Badge label="Published" badgeColor="success" />
                      ) : (
                        <Badge label="Private" badgeColor="danger" />
                      )}
                    </td>

                    <td className="text-end ">
                      <Dropdown
                        styleType="solid"
                        options={[
                          { label: "Edit", value: "active" },
                          { label: "Hapus", value: "inactive" },
                        ]}
                        onValueChange={() => {}}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </KTTable>
        </KTCardBody>
      </KTCard>
    </>
  );
};

const Head = ({}: {}) => {
  return (
    <div className="row justify-content-between gy-5">
      <div className="col-lg-auto">
        <TextField
          styleType="solid"
          preffixIcon="magnifier"
          placeholder="Search"
          props={
            {
              // onChange: (e: any) => onSearch(e.target.value),
            }
          }
        ></TextField>
      </div>
      <div className="row col-lg-auto gy-3">
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Semua Kategori", value: "all" },
              { label: "Aktif", value: "active" },
              { label: "Tidak Aktif", value: "inactive" },
            ]}
            onValueChange={() => {}}
          />
        </div>
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Semua Status", value: "all" },
              { label: "Aktif", value: "active" },
              { label: "Tidak Aktif", value: "inactive" },
            ]}
            onValueChange={() => {}}
          />
        </div>
        <div className="col-lg-auto">
          <Buttons>
            <Link href={"/admin/articles/information"} className="text-white">
              Add New Article
            </Link>
          </Buttons>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;

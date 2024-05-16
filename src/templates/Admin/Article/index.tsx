import { PageTitle } from "@/_metronic/layout/core";
import useArticleViewModel, { breadcrumbs } from "./Article-view-model";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Badge } from "@/stories/atoms/Badge/Badge";
import Link from "next/link";
import { QueryResult } from "@apollo/client";
import {
  ArticleFindManyQuery,
  ArticleTypeEnum,
} from "@/app/service/graphql/gen/graphql";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { Pagination } from "@/stories/organism/Paginations/Pagination";

const ArticlePage = () => {
  const {
    articleFindMany,
    articleFindTake,
    setArticleFindTake,
    articleFindSkip,
    setArticleFindSkip,
    articleFindSearch,
    setArticleFindSearch,
    articleLength,
    currentPage,
    setCurrentPage,
    handlePageChange,
    calculateTotalPage,
    setArticleFindStatus,
    typeOption,
    setArticleFindCategory,
  } = useArticleViewModel();

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Semua Artikel</PageTitle>

      <KTCard>
        <KTCardBody>
          <Head
            onSearch={(val) => {
              setArticleFindSearch(val);
            }}
            setStatus={(val) => {
              setArticleFindStatus(val);
            }}
            option={typeOption}
            setCategory={(val) => {
              setArticleFindCategory(val as ArticleTypeEnum);
            }}
          />
          {articleFindMany.error ? (
            <div className="d-flex justify-content-center align-items-center h-500px flex-column">
              <h3 className="text-center">{articleFindMany.error.message}</h3>
            </div>
          ) : articleFindMany.loading ? (
            <div className="d-flex justify-content-center align-items-center h-500px">
              <h3 className="text-center">Loading....</h3>
            </div>
          ) : (
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
                  <p className="mb-0">JUDUL</p>
                </th>
                <th className="text-end min-w-200px">PENULIS</th>
                <th className="text-end min-w-250px">TANGGAL</th>
                <th className="text-end min-w-200px">KATEGORI</th>
                <th className="text-end min-w-150px">STATUS</th>
                <th className="text-end min-w-125px">ACTION</th>
              </KTTableHead>
              <tbody className="align-middle">
                {articleFindMany?.data?.articleFindMany?.map((article) => {
                  return (
                    <tr key={article.id} className="">
                      <td className="">
                        <p className="fw-bold text-black mb-0 min-w-300px align-middle">
                          {article.title}
                        </p>
                      </td>

                      <td className="min-w-250px text-end fw-bold text-muted">
                        <img
                          className="symbol-label bg-gray-600 rounded-circle mx-3"
                          src={
                            article.createdByAdmin.user.avatarImageId ??
                            "/media/avatars/300-2.jpg"
                          }
                          width={40}
                          height={40}
                          alt="flag"
                        />
                        <span className="text-muted fw-bold">
                          {article.createdByAdmin.user.name}
                        </span>
                      </td>
                      <td className="min-w-200px text-end fw-bold text-muted">
                        <div className="d-flex flex-column">
                          <span>{formatDate(article.updatedAt)}</span>
                          <span>
                            {article.updatedAt
                              .toString()
                              .split("T")[1]
                              .split(".")[0] + " UTC"}
                          </span>
                        </div>
                      </td>
                      <td className="min-w-175px text-end fw-bold text-muted">
                        <Badge
                          key={article.id + article.type}
                          label={article.type}
                          badgeColor="dark"
                          classNames="mx-1"
                        />
                      </td>
                      <td className="min-w-100px text-end fw-bold text-muted">
                        {article.isActive ? (
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
          )}
          <Footer
            pageLength={calculateTotalPage()}
            currentPage={currentPage}
            setCurrentPage={(val) => handlePageChange(val)}
            setArticleFindSkip={(val) => {}}
            setArticleFindTake={(val) => {
              setArticleFindTake(val);
            }}
          />
        </KTCardBody>
      </KTCard>
    </>
  );
};

interface TypeOption {
  value: string;
  label: string;
}

const Head = ({
  onSearch,
  setStatus,
  option,
  setCategory,
}: {
  onSearch: (val: string) => void;
  setStatus: (val: string) => void;
  option: TypeOption[];
  setCategory: (val: ArticleTypeEnum) => void;
}) => {
  return (
    <div className="row justify-content-between gy-5">
      <div className="col-lg-auto">
        <TextField
          styleType="solid"
          preffixIcon="magnifier"
          placeholder="Search"
          props={{
            onChange: (e: any) => onSearch(e.target.value),
          }}
        ></TextField>
      </div>
      <div className="row col-lg-auto gy-3">
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[{ label: "Semua Kategori", value: "all" }, ...option]}
            onValueChange={(e) => {
              setCategory(e as ArticleTypeEnum);
            }}
          />
        </div>
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Semua Status", value: "all" },
              { label: "Published", value: "true" },
              { label: "Private", value: "false" },
            ]}
            onValueChange={(e) => {
              setStatus(e as string);
            }}
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

const Footer = ({
  currentPage,
  setCurrentPage,
  setArticleFindTake,
  setArticleFindSkip,
  pageLength,
}: {
  setArticleFindTake: (val: number) => void;
  setArticleFindSkip: (val: number) => void;
  currentPage: number;
  setCurrentPage: (val: number) => void;
  pageLength: number;
}) => {
  return (
    <div className="row d-flex justify-content-between">
      <div className="col-auto">
        <Dropdown
          styleType="solid"
          options={[
            { label: "10", value: 10 },
            { label: "20", value: 20 },
            { label: "30", value: 30 },
          ]}
          onValueChange={(val) => setArticleFindTake(val as number)}
        />
      </div>
      <div className="col-auto">
        <Pagination
          total={pageLength}
          current={currentPage}
          maxLength={5}
          onPageChange={(val) => setCurrentPage(val)}
        ></Pagination>
      </div>
    </div>
  );
};

export default ArticlePage;

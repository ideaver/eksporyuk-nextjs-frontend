import { PageTitle } from "@/_metronic/layout/core";
import useArticleViewModel, {
  breadcrumbs,
  useCategoriesDropdown,
} from "./Article-view-model";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Badge } from "@/stories/atoms/Badge/Badge";
import Link from "next/link";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import { AsyncPaginate } from "react-select-async-paginate";
import { SortOrder } from "@/app/service/graphql/gen/graphql";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";
import { valueFromAST } from "graphql";

const ArticlePage = () => {
  const {
    articleFindMany,
    setArticleFindTake,
    setArticleFindSearch,
    articleLength,
    currentPage,
    handlePageChange,
    calculateTotalPage,
    setArticleFindStatus,
    setArticleFindCategory,
    setArticleOrderBy,
    articleDeleteOne,
    formatWIB,
    setIsCustomTake,
    isCustomTake,
    articleFindTake,
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
            setCategory={(val) => {
              setArticleFindCategory(val?.value);
            }}
            setOrder={(val) => {
              setArticleOrderBy(val);
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
                        <Link
                          href={`/admin/articles/detail/${article.id}`}
                          className="fw-bold mb-0 text-dark text-hover-primary text-truncate"
                          style={{
                            maxWidth: "90px",
                            display: "inline-block",
                          }}
                        >
                          {article.title}
                        </Link>
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
                          <span>{formatWIB(article.updatedAt)}</span>
                        </div>
                      </td>
                      <td className="min-w-175px text-end fw-bold text-muted">
                        {article.category?.map((val) => (
                          <Badge
                            key={val.id}
                            label={val.name}
                            badgeColor="dark"
                            classNames="mx-1"
                          />
                        ))}
                      </td>
                      <td className="min-w-100px text-end fw-bold text-muted">
                        {article.isActive ? (
                          <Badge label="Published" badgeColor="success" />
                        ) : (
                          <Badge label="Private" badgeColor="danger" />
                        )}
                      </td>

                      <td className="text-end ">
                        <div className="dropdown  ps-15 pe-0">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Actions
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <Link
                                href={`/admin/articles/edit/${article.id}`}
                                className="dropdown-item"
                              >
                                Edit
                              </Link>
                            </li>
                            <li></li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={async () => {
                                  try {
                                    await articleDeleteOne({
                                      variables: {
                                        where: {
                                          id: article.id,
                                        },
                                      },
                                    });
                                    await articleFindMany.refetch();
                                    await articleLength.refetch();
                                  } catch (error) {
                                    console.log(error);
                                  } finally {
                                    await articleFindMany.refetch();
                                    await articleLength.refetch();
                                  }
                                }}
                              >
                                Hapus
                              </button>
                            </li>
                          </ul>
                        </div>
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
            articleFindTake={articleFindTake}
            setIsCustomTake={setIsCustomTake}
            isCustomTake={isCustomTake}
          />
        </KTCardBody>
      </KTCard>
    </>
  );
};

const Head = ({
  onSearch,
  setStatus,
  setCategory,
  setOrder,
}: {
  onSearch: (val: string) => void;
  setStatus: (val: string) => void;
  setCategory: (val: any) => void;
  setOrder: (val: any) => void;
}) => {
  const { loadOptions } = useCategoriesDropdown();
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
          <AsyncPaginate
            className="min-w-200px"
            loadOptions={loadOptions}
            onChange={(id) =>
              setCategory(id ? id : { value: 0, lebal: "semua negara" })
            }
          ></AsyncPaginate>
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
          <Dropdown
            styleType="solid"
            options={[
              { label: "Terbaru", value: SortOrder.Desc },
              { label: "Terlama", value: SortOrder.Asc },
            ]}
            onValueChange={(e) => {
              setOrder(e);
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
  articleFindTake,
  pageLength,
  isCustomTake,
  setIsCustomTake,
}: {
  setArticleFindTake: (val: number) => void;
  setArticleFindSkip: (val: number) => void;
  articleFindTake: number;
  currentPage: number;
  setCurrentPage: (val: number) => void;
  pageLength: number;
  isCustomTake: boolean;
  setIsCustomTake: Dispatch<SetStateAction<boolean>>;
}) => {
  const CheckBoxInput = dynamic(
    () =>
      import("@/stories/molecules/Forms/Advance/CheckBox/CheckBox").then(
        (module) => module.CheckBoxInput
      ),
    {
      ssr: false,
    }
  );
  return (
    <div className="row justify-content-between gy-5 py-5 px-10">
      <div className="row col-lg-auto gy-3 align-middle">
        <div className="row col-lg-auto align-middle">
          {isCustomTake ? (
            <TextField
              type="number"
              styleType="solid"
              placeholder="Jumlah"
              props={{
                value: articleFindTake,
                onChange: (e: any) =>
                  setArticleFindTake(parseInt(e.target.value.toString())),
              }}
            ></TextField>
          ) : (
            <Dropdown
              styleType="solid"
              options={[
                { label: "10", value: 10 },
                { label: "50", value: 50 },
              ]}
              onValueChange={(e) => setArticleFindTake(parseInt(e as string))}
            />
          )}
        </div>
        <div className="col-lg-auto">
          <CheckBoxInput
            className="active fs-5"
            name="follup"
            value={"true"}
            checked={isCustomTake}
            onChange={(e) => {
              setIsCustomTake((prev: boolean) => !prev);
            }}
          >
            {`Custom`}
          </CheckBoxInput>
        </div>
      </div>

      <div className="row col-lg-auto gy-3">
        <div className="col-auto">
          <Pagination
            total={pageLength}
            current={currentPage}
            maxLength={5}
            onPageChange={(val) => setCurrentPage(val)}
          ></Pagination>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;

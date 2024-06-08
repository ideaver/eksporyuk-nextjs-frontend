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
import {
  AnnouncementFindManyQuery,
  AnnouncementTypeEnum,
  ArticleFindLengthQuery,
  ArticleFindManyQuery,
  MaterialPromotionPlatformFindManyQuery,
  MaterialPromotionPlatformTypeEnum,
  SortOrder,
} from "@/app/service/graphql/gen/graphql";
import dynamic from "next/dynamic";
import { QueryResult } from "@apollo/client";
import { Dispatch, SetStateAction } from "react";

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
    articleFindTake,
    selectTable,
    selectedTable,
    announcementFindMany,
    announcementDeleteOne,
    announcementFindType,
    setAnnouncementFindType,
    materialPromotionFindMany,
    materialPromotionDeleteOne,
    materialPromotionFindType,
    setMaterialPromotionFindType,
    currentPageMaterialPromotion,
    setCurrentPageMaterialPromotion,
    handlePageChangeMaterialPromotion,
    calculateTotalPageMaterialPromotion,
    materialPromotionLength,
    currentPageAnnouncement,
    setCurrentPageAnnouncement,
    handlePageChangeAnnouncement,
    calculateTotalPageAnnouncement,
    announcementLength,
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
            selectTable={(val) => {
              selectTable(val);
            }}
            selectedTable={selectedTable}
            announcementFindType={announcementFindType}
            setAnnouncementFindType={setAnnouncementFindType}
            materialPromotionFindType={materialPromotionFindType}
            setMaterialPromotionType={setMaterialPromotionFindType}
          />
          {selectedTable === "article" ? (
            <ArticleTable
              articleFindMany={articleFindMany}
              formatWIB={formatWIB}
              articleDeleteOne={articleDeleteOne}
              articleLength={articleLength}
            />
          ) : selectedTable === "announcement" ? (
            <AnnouncementTable
              announcementFindMany={announcementFindMany}
              formatWIB={formatWIB}
              announcementDeleteOne={announcementDeleteOne}
            />
          ) : (
            <MaterialPromotionTable
              materialPromotionFindMany={materialPromotionFindMany}
              materialPromotionDeleteOne={materialPromotionDeleteOne}
              formatWIB={formatWIB}
            />
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
            selectedTable={selectedTable}
          />
        </KTCardBody>
      </KTCard>
    </>
  );
};

const ArticleTable = ({
  articleFindMany,
  formatWIB,
  articleDeleteOne,
  articleLength,
}: {
  articleFindMany: QueryResult<ArticleFindManyQuery>;
  formatWIB: (createdAt: string) => string;
  articleDeleteOne: any;
  articleLength: QueryResult<ArticleFindLengthQuery>;
}) => {
  return (
    <>
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
                        maxWidth: "200px",
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
                        "/media/avatars/blank.png"
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
                    <div className="dropdown ps-15 pe-0">
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
    </>
  );
};

const AnnouncementTable = ({
  announcementFindMany,
  formatWIB,
  announcementDeleteOne,
}: {
  announcementFindMany: QueryResult<AnnouncementFindManyQuery>;
  formatWIB: (createdAt: string) => string;
  announcementDeleteOne: any;
}) => {
  return (
    <>
      {announcementFindMany.error ? (
        <div className="d-flex justify-content-center align-items-center h-500px flex-column">
          <h3 className="text-center">{announcementFindMany.error.message}</h3>
        </div>
      ) : announcementFindMany.loading ? (
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
            {/* <th className="text-end min-w-150px">STATUS</th> */}
            <th className="text-end min-w-125px">ACTION</th>
          </KTTableHead>
          <tbody className="align-middle">
            {announcementFindMany?.data?.announcementFindMany?.map(
              (announcement) => {
                return (
                  <tr key={announcement.id} className="">
                    <td className="">
                      <Link
                        // href={`/admin/articles/detail/${article.id}`}
                        href={`/admin/articles/announcement/detail/${announcement.id}`}
                        className="fw-bold mb-0 text-dark text-hover-primary text-truncate"
                        style={{
                          maxWidth: "200px",
                          display: "inline-block",
                        }}
                      >
                        {announcement.title}
                      </Link>
                    </td>

                    <td className="min-w-250px text-end fw-bold text-muted">
                      <img
                        className="symbol-label bg-gray-600 rounded-circle mx-3"
                        src={
                          announcement.createdByAdmin?.user.avatarImageId ??
                          "/media/avatars/blank.png"
                        }
                        width={40}
                        height={40}
                        alt="flag"
                      />
                      <span className="text-muted fw-bold">
                        {announcement.createdByAdmin?.user.name}
                      </span>
                    </td>
                    <td className="min-w-200px text-end fw-bold text-muted">
                      <div className="d-flex flex-column">
                        <span>{formatDate(announcement.createdAt)}</span>
                        <span>{formatWIB(announcement.createdAt)}</span>
                      </div>
                    </td>
                    <td className="min-w-175px text-end fw-bold text-muted">
                      {/* {announcement.category?.map((val) => (
                        <Badge
                          key={val.id}
                          label={val.name}
                          badgeColor="dark"
                          classNames="mx-1"
                        />
                      ))} */}
                      {announcement.type}
                    </td>
                    {/* <td className="min-w-100px text-end fw-bold text-muted">
                      {announcement.isActive ? (
                        <Badge label="Published" badgeColor="success" />
                      ) : (
                        <Badge label="Private" badgeColor="danger" />
                      )}
                    </td> */}

                    <td className="text-end ">
                      <div className="dropdown ps-15 pe-0">
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
                              href={`/admin/articles/announcement/edit/${announcement.id}`}
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
                                  await announcementDeleteOne({
                                    variables: {
                                      where: {
                                        id: announcement.id,
                                      },
                                    },
                                  });
                                  await announcementFindMany.refetch();
                                } catch (error) {
                                  console.log(error);
                                } finally {
                                  await announcementFindMany.refetch();
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
              }
            )}
          </tbody>
        </KTTable>
      )}
    </>
  );
};
const MaterialPromotionTable = ({
  materialPromotionFindMany,
  formatWIB,
  materialPromotionDeleteOne,
}: {
  materialPromotionFindMany: QueryResult<MaterialPromotionPlatformFindManyQuery>;
  formatWIB: (createdAt: string) => string;
  materialPromotionDeleteOne: any;
}) => {
  return (
    <>
      {materialPromotionFindMany.error ? (
        <div className="d-flex justify-content-center align-items-center h-500px flex-column">
          <h3 className="text-center">
            {materialPromotionFindMany.error.message}
          </h3>
        </div>
      ) : materialPromotionFindMany.loading ? (
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
            <th className="text-end min-w-200px">TIPE</th>
            {/* <th className="text-end min-w-150px">STATUS</th> */}
            <th className="text-end min-w-125px">ACTION</th>
          </KTTableHead>
          <tbody className="align-middle">
            {materialPromotionFindMany?.data?.materialPromotionPlatformFindMany?.map(
              (materialPromotion) => {
                return (
                  <tr key={materialPromotion.id} className="">
                    <td className="">
                      <Link
                        // href={`/admin/articles/detail/${article.id}`}
                        href={`/admin/articles/material-promotion/detail/${materialPromotion.id}`}
                        className="fw-bold mb-0 text-dark text-hover-primary text-truncate"
                        style={{
                          maxWidth: "200px",
                          display: "inline-block",
                        }}
                      >
                        {materialPromotion.title}
                      </Link>
                    </td>

                    <td className="min-w-250px text-end fw-bold text-muted">
                      <img
                        className="symbol-label bg-gray-600 rounded-circle mx-3"
                        src={
                          materialPromotion.createdByAdmin?.user
                            .avatarImageId ?? "/media/avatars/blank.png"
                        }
                        width={40}
                        height={40}
                        alt="flag"
                      />
                      <span className="text-muted fw-bold">
                        {materialPromotion.createdByAdmin?.user.name}
                      </span>
                    </td>
                    <td className="min-w-200px text-end fw-bold text-muted">
                      <div className="d-flex flex-column">
                        <span>{formatDate(materialPromotion.createdAt)}</span>
                        <span>{formatWIB(materialPromotion.createdAt)}</span>
                      </div>
                    </td>
                    <td className="min-w-175px text-end fw-bold text-muted">
                      {/* {materialPromotion.category?.map((val) => (
                        <Badge
                          key={val.id}
                          label={val.name}
                          badgeColor="dark"
                          classNames="mx-1"
                        />
                      ))} */}
                      {materialPromotion.type}
                    </td>
                    {/* <td className="min-w-100px text-end fw-bold text-muted">
                      {materialPromotion.isActive ? (
                        <Badge label="Published" badgeColor="success" />
                      ) : (
                        <Badge label="Private" badgeColor="danger" />
                      )}
                    </td> */}

                    <td className="text-end ">
                      <div className="dropdown ps-15 pe-0">
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
                              href={`/admin/articles/material-promotion/edit/${materialPromotion.id}`}
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
                                  await materialPromotionDeleteOne({
                                    variables: {
                                      where: {
                                        id: materialPromotion.id,
                                      },
                                    },
                                  });
                                  await materialPromotionFindMany.refetch();
                                } catch (error) {
                                  console.log(error);
                                } finally {
                                  await materialPromotionFindMany.refetch();
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
              }
            )}
          </tbody>
        </KTTable>
      )}
    </>
  );
};

const Head = ({
  onSearch,
  setStatus,
  setCategory,
  setOrder,
  selectTable,
  selectedTable,
  setAnnouncementFindType,
  materialPromotionFindType,
  setMaterialPromotionType,
}: {
  onSearch: (val: string) => void;
  setStatus: (val: string) => void;
  setCategory: (val: any) => void;
  setOrder: (val: any) => void;
  selectTable: (val: any) => void;
  selectedTable: string;
  announcementFindType: AnnouncementTypeEnum | "all";
  setAnnouncementFindType: Dispatch<
    SetStateAction<AnnouncementTypeEnum | "all">
  >;
  materialPromotionFindType: MaterialPromotionPlatformTypeEnum | "all";
  setMaterialPromotionType: Dispatch<
    SetStateAction<MaterialPromotionPlatformTypeEnum | "all">
  >;
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
        {selectedTable === "article" ? (
          <>
            {" "}
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
          </>
        ) : selectedTable === "announcement" ? (
          <div className="col-lg-auto">
            <Dropdown
              styleType="solid"
              options={[
                { label: "Semua Status", value: "all" },
                { label: "Affiliate", value: AnnouncementTypeEnum.Affiliate },
                { label: "Course", value: AnnouncementTypeEnum.Affiliate },
                { label: "System", value: AnnouncementTypeEnum.System },
                { label: "Other", value: AnnouncementTypeEnum.Other },
              ]}
              onValueChange={(e) => {
                setAnnouncementFindType(e as AnnouncementTypeEnum | "all");
              }}
            />
          </div>
        ) : (
          <div className="col-lg-auto">
            <Dropdown
              styleType="solid"
              value={materialPromotionFindType}
              options={[
                { label: "Semua Tipe", value: "all" },
                {
                  label: "Banner",
                  value: MaterialPromotionPlatformTypeEnum.Banner,
                },
                {
                  label: "Material",
                  value: MaterialPromotionPlatformTypeEnum.Material,
                },
              ]}
              onValueChange={(e) => {
                setMaterialPromotionType(
                  e as MaterialPromotionPlatformTypeEnum | "all"
                );
              }}
            />
          </div>
        )}

        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            value={selectedTable}
            options={[
              { label: "Article", value: "article" },
              { label: "Announcement", value: "announcement" },
              { label: "Material Promotion", value: "materialPromotion" },
            ]}
            onValueChange={(e) => {
              selectTable(e);
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
  selectedTable,
}: {
  setArticleFindTake: (val: number) => void;
  setArticleFindSkip: (val: number) => void;
  articleFindTake: number;
  currentPage: number;
  setCurrentPage: (val: number) => void;
  pageLength: number;
  selectedTable: string;
}) => {
  const {
    currentPageMaterialPromotion,
    setCurrentPageMaterialPromotion,
    handlePageChangeMaterialPromotion,
    calculateTotalPageMaterialPromotion,
    materialPromotionLength,
    currentPageAnnouncement,
    setCurrentPageAnnouncement,
    handlePageChangeAnnouncement,
    calculateTotalPageAnnouncement,
    announcementLength,
  } = useArticleViewModel();
  // console.log(announcementLength.data?.announcementFindMany?.length);
  return (
    <div className="row justify-content-between gy-5">
      <div className="row col-lg-auto gy-3 align-middle">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle p-3"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {articleFindTake}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setArticleFindTake(10);
                }}
              >
                10
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setArticleFindTake(50);
                }}
              >
                50
              </button>
            </li>
            <li>
              {/* <button className="dropdown-item">Hapus</button> */}
              <input
                type="number"
                value={articleFindTake}
                className="form-control py-2"
                placeholder="Nilai Custom"
                min={0}
                onChange={(e) => {
                  setArticleFindTake(parseInt(e.target.value));
                }}
              />
            </li>
          </ul>
        </div>
      </div>

      <div className="row col-lg-auto gy-3">
        <div className="col-auto">
          <Pagination
            total={
              selectedTable === "article"
                ? pageLength
                : selectedTable === "announcement"
                ? calculateTotalPageAnnouncement()
                : calculateTotalPageMaterialPromotion()
            }
            current={currentPage}
            maxLength={5}
            onPageChange={(val) => {
              handlePageChangeAnnouncement(val);
              handlePageChangeMaterialPromotion(val);
              setCurrentPage(val);
            }}
          ></Pagination>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;

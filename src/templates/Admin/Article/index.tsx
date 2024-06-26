import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { PageTitle } from "@/_metronic/layout/core";
import {
  AnnouncementFindManyQuery,
  AnnouncementTypeEnum,
  ArticleFindLengthQuery,
  ArticleFindManyQuery,
  MaterialPromotionPlatformFindManyQuery,
  MaterialPromotionPlatformTypeEnum,
  NewsFindManyQuery,
  NewsTypeEnum,
  SortOrder,
} from "@/app/service/graphql/gen/graphql";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import { QueryResult } from "@apollo/client";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import useArticleViewModel, {
  breadcrumbs,
  useCategoriesDropdown,
} from "./Article-view-model";

const ArticlePage = () => {
  const {
    articleFindMany,
    setArticleFindTake,
    setArticleFindSearch,
    setArticleFindSkip,
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
    newsFindMany,
    newsDeleteOne,
    calculateTotalPageNews,
    setNewsFindType,
    newsFindType,
  } = useArticleViewModel();
  // console.log("Article", calculateTotalPage());
  // console.log("announcement", calculateTotalPageAnnouncement());
  // console.log("Material", calculateTotalPageMaterialPromotion());
  // console.log("news", calculateTotalPageNews());
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
              setArticleFindCategory(parseInt(val));
            }}
            setOrder={(val) => {
              setArticleOrderBy(val);
            }}
            selectTable={(val) => {
              selectTable(val);
            }}
            handlePageChange={handlePageChange}
            setArticleFindSkip={setArticleFindSkip}
            selectedTable={selectedTable}
            announcementFindType={announcementFindType}
            setAnnouncementFindType={setAnnouncementFindType}
            materialPromotionFindType={materialPromotionFindType}
            setMaterialPromotionType={setMaterialPromotionFindType}
            newsFindType={newsFindType}
            setNewsFindType={setNewsFindType}
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
          ) : selectedTable === "news" ? (
            <NewsTable
              newsDeleteOne={newsDeleteOne}
              newsFindMany={newsFindMany}
              formatWIB={formatWIB}
            />
          ) : (
            <MaterialPromotionTable
              materialPromotionFindMany={materialPromotionFindMany}
              materialPromotionDeleteOne={materialPromotionDeleteOne}
              formatWIB={formatWIB}
            />
          )}

          <Footer
            pageLength={
              selectedTable === "article"
                ? calculateTotalPage()
                : selectedTable === "announcement"
                ? calculateTotalPageAnnouncement()
                : selectedTable === "news"
                ? calculateTotalPageNews()
                : calculateTotalPageMaterialPromotion()
            }
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
            <th className="text-end min-w-200px">TIPE</th>
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
                    {article.articleType}
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

const NewsTable = ({
  newsFindMany,
  formatWIB,
  newsDeleteOne,
}: {
  newsFindMany: QueryResult<NewsFindManyQuery>;
  formatWIB: (createdAt: string) => string;
  newsDeleteOne: any;
}) => {
  return (
    <>
      {newsFindMany.error ? (
        <div className="d-flex justify-content-center align-items-center h-500px flex-column">
          <h3 className="text-center">{newsFindMany.error.message}</h3>
        </div>
      ) : newsFindMany.loading ? (
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
            <th className="text-end min-w-100px">LIKES</th>
            <th className="text-end min-w-100px">COMMENTS</th>
            {/* <th className="text-end min-w-150px">STATUS</th> */}
            <th className="text-end min-w-125px">ACTION</th>
          </KTTableHead>
          <tbody className="align-middle">
            {newsFindMany?.data?.newsFindMany?.map((news) => {
              return (
                <tr key={news.id} className="">
                  <td className="">
                    <Link
                      // href={`/admin/articles/detail/${article.id}`}
                      href={`/admin/articles/news/detail/${news.id}`}
                      className="fw-bold mb-0 text-dark text-hover-primary text-truncate"
                      style={{
                        maxWidth: "200px",
                        display: "inline-block",
                      }}
                    >
                      {news.title}
                    </Link>
                  </td>

                  <td className="min-w-250px text-end fw-bold text-muted">
                    <img
                      className="symbol-label bg-gray-600 rounded-circle mx-3"
                      src={
                        news.createdByAdmin?.user.avatarImageId ??
                        "/media/avatars/blank.png"
                      }
                      width={40}
                      height={40}
                      alt="flag"
                    />
                    <span className="text-muted fw-bold">
                      {news.createdByAdmin?.user.name}
                    </span>
                  </td>
                  <td className="min-w-200px text-end fw-bold text-muted">
                    <div className="d-flex flex-column">
                      <span>{formatDate(news.createdAt)}</span>
                      <span>{formatWIB(news.createdAt)}</span>
                    </div>
                  </td>
                  <td className="min-w-175px text-end fw-bold text-muted">
                    {/* {news.category?.map((val) => (
                        <Badge
                          key={val.id}
                          label={val.name}
                          badgeColor="dark"
                          classNames="mx-1"
                        />
                      ))} */}
                    {news.type}
                  </td>
                  <td className="min-w-100px text-end fw-bold text-muted">
                    {news._count.userLikes}
                  </td>
                  <td className="min-w-100px text-end fw-bold text-muted">
                    {news._count.comments}
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
                            href={`/admin/articles/news/edit/${news.id}`}
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
                                await newsDeleteOne({
                                  variables: {
                                    where: {
                                      id: news.id,
                                    },
                                  },
                                });
                                await newsFindMany.refetch();
                              } catch (error) {
                                console.log(error);
                              } finally {
                                await newsFindMany.refetch();
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
  setArticleFindSkip,
  handlePageChange,
  newsFindType,
  setNewsFindType,
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
  setArticleFindSkip: Dispatch<SetStateAction<number>>;
  handlePageChange: (page: number) => void;
  setNewsFindType: Dispatch<SetStateAction<NewsTypeEnum | "all">>;
  newsFindType: NewsTypeEnum | "all";
}) => {
  const { loadOptions, categoryArticleDropdownOption } =
    useCategoriesDropdown();
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
              {/* <AsyncPaginate
                className="min-w-200px"
                loadOptions={loadOptions}
                onChange={(id) =>
                  setCategory(id ? id : { value: 0, lebal: "semua negara" })
                }
              ></AsyncPaginate> */}
              <Dropdown
                styleType="solid"
                options={categoryArticleDropdownOption || []}
                onValueChange={(e) => {
                  setCategory(e);
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
        ) : selectedTable === "news" ? (
          <div className="col-lg-auto">
            <Dropdown
              styleType="solid"
              value={newsFindType}
              options={[
                { label: "Semua Tipe", value: "all" },
                {
                  label: "Headline",
                  value: NewsTypeEnum.Headline,
                },
                {
                  label: "Opinion",
                  value: NewsTypeEnum.Opinion,
                },
                {
                  label: "Feature",
                  value: NewsTypeEnum.Feature,
                },
              ]}
              onValueChange={(e) => {
                setNewsFindType(e as NewsTypeEnum | "all");
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
              { label: "Article (Affiliator)", value: "article" },
              { label: "Article (Student)", value: "news" },
              { label: "Announcement", value: "announcement" },
              { label: "Material Promotion", value: "materialPromotion" },
            ]}
            onValueChange={(e) => {
              selectTable(e);
              setArticleFindSkip(0);
              handlePageChange(1);
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
              Add New Article & Pengumuman
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
    handlePageChangeMaterialPromotion,
    calculateTotalPageMaterialPromotion,
    handlePageChangeAnnouncement,
    calculateTotalPageAnnouncement,
    handlePageChangeNews,
    calculateTotalPageNews,
  } = useArticleViewModel();

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
            total={pageLength}
            // selectedTable === "article"
            //   ? pageLength
            //   : selectedTable === "announcement"
            //   ? calculateTotalPageAnnouncement()
            //   : selectedTable === "news"
            //   ? calculateTotalPageNews()
            //   : calculateTotalPageMaterialPromotion()
            current={currentPage}
            maxLength={5}
            onPageChange={(val) => {
              handlePageChangeAnnouncement(val);
              handlePageChangeMaterialPromotion(val);
              handlePageChangeNews(val);
              setCurrentPage(val);
            }}
          ></Pagination>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;

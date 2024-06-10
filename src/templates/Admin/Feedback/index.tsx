import { PageTitle } from "@/_metronic/layout/core";
import useFeedbackViewModel, {
  TFilter,
  breadcrumbs,
} from "./Feedback-view-model";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import Link from "next/link";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import { QueryResult } from "@apollo/client";
import {
  FeedbackCategoryTypeEnum,
  FeedbackFindManyQuery,
  SortOrder,
} from "@/app/service/graphql/gen/graphql";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { useDispatch, useSelector } from "react-redux";
import { changeFeedbackCategoryType } from "@/features/reducers/feedback/feedbackReducer";
import { RootState } from "@/app/store/store";
import { useEffect } from "react";
import { formatCategoryType } from "@/app/service/utils/categoryTypeEnumFormatter";

const Feedback = () => {
  const {
    currentPage,
    setCurrentPage,
    setFeedbackFindSearch,
    handlePageChange,
    calculateTotalPage,
    feedbackFindMany,
    setFeedbackSkip,
    setFeedbackTake,
    setFilter,
    filter,
    categoryAll,
    categoryCourse,
    categoryOrder,
    categoryOther,
    categoryPayment,
    categorySuggestion,
    orderBy,
    setOrderBy,
    feedbackTake,
  } = useFeedbackViewModel();
  console.log(calculateTotalPage());
  const data: FeedbackFindManyQuery | undefined = feedbackFindMany?.data;
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Feedback & Reports</PageTitle>
      <div className="row gx-8">
        <Aside
          categoryAll={categoryAll}
          categoryCourse={categoryCourse}
          categoryOrder={categoryOrder}
          categoryOther={categoryOther}
          categoryPayment={categoryPayment}
          categorySuggestion={categorySuggestion}
        />
        <div className="col-lg-8">
          <KTCard>
            <KTCardBody className="d-flex flex-column p-0">
              <Head
                setFindSearch={(value: string) => {
                  setFeedbackFindSearch(value);
                }}
                setFilter={(value) => {
                  setFilter(value as TFilter);
                }}
                filter={filter}
                orderBy={orderBy}
                setOrderBy={(e) => {
                  setOrderBy(e);
                }}
              />
              <Body
                data={data}
                formatter={formatCategoryType}
                feedbackFindMany={feedbackFindMany}
              />
              <Footer
                pageLength={calculateTotalPage()}
                currentPage={currentPage}
                setFeedbackFindSkip={(val) => {
                  setFeedbackSkip(val);
                }}
                setFeedbackFindTake={(val) => {
                  setFeedbackTake(val);
                }}
                setCurrentPage={(val) => {
                  handlePageChange(val);
                }}
                feedbackTake={feedbackTake}
              />
            </KTCardBody>
          </KTCard>
        </div>
      </div>
    </>
  );
};

const Aside = ({
  categoryAll,
  categoryCourse,
  categoryOrder,
  categoryPayment,
  categorySuggestion,
  categoryOther,
}: {
  categoryAll: number | undefined;
  categoryCourse: number | undefined;
  categoryOrder: number | undefined;
  categoryPayment: number | undefined;
  categorySuggestion: number | undefined;
  categoryOther: number | undefined;
}) => {
  const dispatch = useDispatch();
  const feedbackCategoryState = useSelector(
    (state: RootState) => state.feedback.feedbackCategoryType
  );
  return (
    <div className="col-lg-4">
      <KTCard>
        <KTCardBody className="d-flex flex-column p-2 justify-content-center">
          <button
            className={`btn gap-3 text-hover-dark fw-bold fs-5 ${
              feedbackCategoryState == "ALL" ? "text-primary" : null
            }`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onClick={() => {
              dispatch(changeFeedbackCategoryType("ALL"));
            }}
          >
            <div className="d-flex gap-2">
              <KTIcon iconName="burger-menu-2" className="align-middle fs-1" />
              <span className="d-flex ">Semua Report</span>
            </div>

            <Badge
              label={(categoryAll?.toString() as string) ?? 0}
              size="large"
              badgeColor="dark"
            />
          </button>
          <button
            className={`btn gap-3 text-hover-primary fw-bold fs-5 ${
              feedbackCategoryState ==
              FeedbackCategoryTypeEnum.UnableToPlaceOrder
                ? "text-primary"
                : null
            }`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onClick={() => {
              dispatch(
                changeFeedbackCategoryType(
                  FeedbackCategoryTypeEnum.UnableToPlaceOrder
                )
              );
            }}
          >
            <div className="d-flex gap-2">
              <KTIcon iconName="basket" className="align-middle fs-1" />
              <span className="d-flex justify-content-center align-content-center">
                Tidak Bisa Order
              </span>
            </div>

            <Badge
              label={(categoryOrder?.toString() as string) ?? 0}
              size="large"
            />
          </button>
          <button
            className={`btn gap-3 text-hover-info fw-bold fs-5 ${
              feedbackCategoryState ==
              FeedbackCategoryTypeEnum.CourseRelatedIssues
                ? "text-info"
                : null
            }`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onClick={() => {
              dispatch(
                changeFeedbackCategoryType(
                  FeedbackCategoryTypeEnum.CourseRelatedIssues
                )
              );
            }}
          >
            <div className="d-flex gap-2">
              <KTIcon iconName="book" className="align-middle fs-1" />
              <span className="d-flex justify-content-start align-content-">
                Masalah Course
              </span>
            </div>

            <Badge
              label={(categoryCourse?.toString() as string) ?? 0}
              size="large"
              badgeColor="info"
            />
          </button>
          <button
            className={`btn gap-3 text-hover-success fw-bold fs-5 ${
              feedbackCategoryState ==
              FeedbackCategoryTypeEnum.PaymentRelatedIssues
                ? "text-success"
                : null
            }`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onClick={() => {
              dispatch(
                changeFeedbackCategoryType(
                  FeedbackCategoryTypeEnum.PaymentRelatedIssues
                )
              );
            }}
          >
            <div className="d-flex gap-2">
              <KTIcon iconName="dollar" className="align-middle fs-1" />
              <span className="d-flex justify-content-start align-content-">
                Masalah Pembayaran
              </span>
            </div>

            <Badge
              label={(categoryPayment?.toString() as string) ?? 0}
              size="large"
              badgeColor="success"
            />
          </button>
          <button
            className={`btn gap-3 text-hover-warning fw-bold fs-5 ${
              feedbackCategoryState == FeedbackCategoryTypeEnum.OtherProblems
                ? "text-warning"
                : null
            }`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onClick={() => {
              dispatch(
                changeFeedbackCategoryType(
                  FeedbackCategoryTypeEnum.OtherProblems
                )
              );
            }}
          >
            <div className="d-flex gap-2">
              <KTIcon iconName="burger-menu-5" className="align-middle fs-1" />
              <span className="d-flex justify-content-center align-content-center">
                Permasalahan Lain
              </span>
            </div>

            <Badge
              label={(categoryOther?.toString() as string) ?? 0}
              size="large"
              badgeColor="warning"
            />
          </button>
          <button
            className={`btn gap-3 text-hover-danger fw-bold fs-5 ${
              feedbackCategoryState == FeedbackCategoryTypeEnum.Suggestions
                ? "text-danger"
                : null
            }`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onClick={() => {
              dispatch(
                changeFeedbackCategoryType(FeedbackCategoryTypeEnum.Suggestions)
              );
            }}
          >
            <div className="d-flex gap-2">
              <KTIcon iconName="lovely" className="align-middle fs-1" />
              <span className="d-flex justify-content-start align-content-">
                Saran
              </span>
            </div>

            <Badge
              label={(categorySuggestion?.toString() as string) ?? 0}
              size="large"
              badgeColor="danger"
            />
          </button>
        </KTCardBody>
      </KTCard>
    </div>
  );
};

const Head = ({
  setFindSearch,
  setFilter,
  filter,
  orderBy,
  setOrderBy,
}: {
  setFindSearch: (val: string) => void;
  setFilter: (val: string) => void;
  filter: string | undefined;
  orderBy: SortOrder;
  setOrderBy: (e: SortOrder) => void;
}) => {
  return (
    <>
      <div className="row justify-content-between gy-5 p-10 border-bottom ">
        <div className="col-lg-auto">
          <div className="dropdown open">
            <button
              className="btn btn-secondary p-2 d-flex justify-content-center align-content-center "
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <KTIcon
                iconName="filter"
                className={`fs-1 p-0 ${
                  filter !== "ALL" ? "text-warning" : null
                }`}
              />
            </button>
            <ul className="dropdown-menu">
              <li className="dropdown-item">
                <button
                  className="btn p-2 py-1"
                  onClick={() => {
                    setFilter("ALL");
                  }}
                >
                  ALL
                </button>
              </li>
              <li className="dropdown-item">
                <button
                  className="btn p-2 py-1"
                  onClick={() => {
                    setFilter("UNREADED");
                  }}
                >
                  Unreaded
                </button>
              </li>
              <li className="dropdown-item">
                <button
                  className="btn p-2 py-1"
                  onClick={() => {
                    setFilter("READED");
                  }}
                >
                  Readed
                </button>
              </li>
              <li className="dropdown-item">
                <button
                  className="btn p-2 py-1"
                  onClick={() => {
                    setFilter("UNSOLVED");
                  }}
                >
                  Unsolved
                </button>
              </li>
              <li className="dropdown-item">
                <button
                  className="btn p-2 py-1"
                  onClick={() => {
                    setFilter("SOLVED");
                  }}
                >
                  Solved
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="row col-lg-auto gy-3">
          <div className="col-lg-auto">
            {/* <Dropdown
              styleType="solid"
              options={[{ label: "Semua Kategori", value: "all" }, ...option]}
              onValueChange={(e) => {
                setCategory(e as string);
              }}
            /> */}
          </div>
          <div className="col-lg-auto">
            <Dropdown
              styleType="solid"
              options={[
                { label: "Terbaru", value: SortOrder.Desc },
                { label: "Terlama", value: SortOrder.Asc },
              ]}
              onValueChange={(e) => {
                setOrderBy(e as SortOrder);
              }}
            />
          </div>
          <div className="col-lg-auto">
            {/* <Buttons>
            <Link href={"/admin/articles/information"} className="text-white">
              Add New Article
            </Link>
          </Buttons> */}
            <TextField
              styleType="solid"
              preffixIcon="magnifier"
              placeholder="Search"
              props={{
                onChange: (e: any) => setFindSearch(e.target.value),
              }}
            ></TextField>
          </div>
        </div>
      </div>
    </>
  );
};

const Footer = ({
  currentPage,
  setCurrentPage,
  setFeedbackFindTake,
  setFeedbackFindSkip,
  pageLength,
  feedbackTake,
}: {
  setFeedbackFindTake: (val: number) => void;
  setFeedbackFindSkip: (val: number) => void;
  currentPage: number;
  setCurrentPage: (val: number) => void;
  pageLength: number;
  feedbackTake: number;
}) => {
  return (
    <div className="row d-flex justify-content-between p-10">
      <div className="col-auto">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle p-3"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {feedbackTake}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setFeedbackFindTake(10);
                }}
              >
                10
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setFeedbackFindTake(50);
                }}
              >
                50
              </button>
            </li>
            <li>
              {/* <button className="dropdown-item">Hapus</button> */}
              <input
                type="number"
                value={feedbackTake}
                className="form-control py-2"
                placeholder="Nilai Custom"
                min={0}
                onChange={(e) => {
                  setFeedbackFindTake(parseInt(e.target.value));
                }}
              />
            </li>
          </ul>
        </div>
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

const Body = ({
  data,
  formatter,
  feedbackFindMany,
}: {
  data: FeedbackFindManyQuery | undefined;
  formatter: (e: string | undefined) => string | undefined;
  feedbackFindMany: QueryResult<FeedbackFindManyQuery>;
}) => {
  return (
    <>
      {feedbackFindMany.error ? (
        <div className="d-flex justify-content-center align-items-center h-500px flex-column">
          <h3 className="text-center">{feedbackFindMany.error.message}</h3>
        </div>
      ) : feedbackFindMany.loading ? (
        <div className="d-flex justify-content-center align-items-center h-500px">
          <h3 className="text-center">Loading....</h3>
        </div>
      ) : (
        <KTCard className="h-100 ">
          <KTCardBody className="p-0">
            <div className="table-responsive">
              <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                <tbody>
                  {data?.feedbackFindMany?.map((row, index) => (
                    <tr key={index}>
                      <td className="fw-bold p-5">
                        <div className="d-flex align-items-center gap-6">
                          <KTIcon
                            iconName="check-circle"
                            className={`fs-1 ${
                              row.isCleared ? "text-success" : null
                            }`}
                          />
                          <div className="symbol symbol-50px me-2">
                            <span className="symbol-label bg-gray-600 ">
                              <img
                                src={
                                  row.user.avatarImageId ??
                                  "/media/avatars/blank.png"
                                }
                                width={50}
                                height={50}
                                alt=""
                                className="rounded"
                              />
                            </span>
                          </div>
                          <div className="d-flex flex-column">
                            <span className="text-dark text-hover-primary cursor-pointer fs-6 fw-bold">
                              {row?.user?.name}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="fw-bold ">
                        <Link
                          href={`/admin/feedback/detail/${row.id}`}
                          className=""
                        >
                          <div
                            className={`d-flex flex-column justify-items-center justify-content-center align-start-center text-hover-primary ${
                              row.isRead ? "text-dark" : "text-primary"
                            } `}
                          >
                            <h5>{formatter(row.feedbackCategory)}</h5>
                            <p
                              className="h-40px mw-450px"
                              style={{
                                WebkitLineClamp: 3,
                                display: "-webkit-flex",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {row.content}
                            </p>
                          </div>
                        </Link>
                      </td>
                      <td className="text-end pe-5 fs-5">
                        {formatDate(row.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </KTCardBody>
        </KTCard>
      )}
    </>
  );
};

export default Feedback;

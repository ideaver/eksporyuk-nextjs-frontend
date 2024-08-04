import { PageTitle } from "@/_metronic/layout/core";
import useDocumentViewModel, { breadcrumbs } from "./Document-view-model";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import Link from "next/link";
import {
  EksporDocumentFindManyQuery,
  LocalCommodityFindManyQuery,
  SopFileFindManyQuery,
  SortOrder,
} from "@/app/service/graphql/gen/graphql";
import { Dispatch, DispatchWithoutAction, SetStateAction } from "react";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { QueryResult } from "@apollo/client";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { Pagination } from "@/stories/organism/Paginations/Pagination";

const Document = () => {
  const {
    currentPageEkspor,
    setCurrentPageEkspor,
    handlePageChangeEkspor,
    calculateTotalPageEkspor,
    currentPageSop,
    setCurrentPageSop,
    handlePageChangeSop,
    calculateTotalPageSop,
    sopFileFindMany,
    documentFindSkip,
    documentFindTake,
    orderBy,
    documentFindSearch,
    setDocumentFindSkip,
    setDocumentFindTake,
    setOrderBy,
    setDocumentFindSearch,
    selectTable,
    setSelectTable,
    eksporFindMany,
    eksporDeleteOne,
    sopDeleteOne,
    calculateTotalPageCommodity,
    commodityFindMany,
    currentPageCommodity,
    handlePageChangeCommodity,
    setCurrentPageCommodity,
    commodityDeleteOne,
  } = useDocumentViewModel();
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Semua Dokumen</PageTitle>

      <KTCard>
        <KTCardBody>
          <Head
            selectTable={selectTable}
            setDocumentFindSkip={setDocumentFindSkip}
            setDocumentFindSearch={setDocumentFindSearch}
            documentFindSearch={documentFindSearch}
            setSelectTable={setSelectTable}
            setOrder={setOrderBy}
            handlePageChange={(page) => {
              handlePageChangeEkspor(page);
              handlePageChangeSop(page);
              handlePageChangeCommodity(page);
            }}
          />
          {selectTable === "sop" ? (
            <SopTable
              sopDeleteOne={sopDeleteOne}
              sopFileFindMany={sopFileFindMany}
            />
          ) : selectTable === "ekspor" ? (
            <EksporTable
              eksporDeleteOne={eksporDeleteOne}
              eksporFindMany={eksporFindMany}
            />
          ) : (
            <CommodtyTable
              commodityFindMany={commodityFindMany}
              commodityDeleteOne={commodityDeleteOne}
            />
          )}
          <Footer
            pageLength={
              selectTable === "sop"
                ? calculateTotalPageSop()
                : calculateTotalPageEkspor()
            }
            currentPage={currentPageSop}
            setCurrentPage={(val) => {
              handlePageChangeEkspor(val);
              handlePageChangeSop(val);
            }}
            setArticleFindSkip={(val) => {}}
            setArticleFindTake={(val) => {
              setDocumentFindTake(val);
            }}
            articleFindTake={documentFindTake}
            selectedTable={selectTable}
          />
        </KTCardBody>
      </KTCard>
    </>
  );
};

const SopTable = ({
  sopFileFindMany,
  sopDeleteOne,
}: //   sopLength,
{
  sopFileFindMany: QueryResult<SopFileFindManyQuery>;
  //   sopLength: number;
  sopDeleteOne: any;
}) => {
  return (
    <>
      {sopFileFindMany.error ? (
        <div className="d-flex justify-content-center align-items-center h-500px flex-column">
          <h3 className="text-center">{sopFileFindMany.error.message}</h3>
        </div>
      ) : sopFileFindMany.loading ? (
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
            <th className="min-w-200px">JUDUL</th>

            <th className="min-w-200px">
              <p className="mb-0">content</p>
            </th>
            <th className="text-end min-w-200px">PENULIS</th>
            <th className="text-end min-w-250px">TANGGAL</th>
            <th className="text-end min-w-150px">FILE</th>
            <th className="text-end min-w-125px">ACTION</th>
          </KTTableHead>
          <tbody className="align-middle">
            {sopFileFindMany?.data?.sopFileFindMany?.map((document) => {
              return (
                <tr key={document.id} className="">
                  <td className="text-muted">{document.title ?? "-"}</td>
                  <td className="">
                    <p
                      //   href={`/admin/documents/detail/${document.id}`}
                      className="fw-bold mb-0 text-muted text-hover-primary text-truncate"
                      style={{
                        maxWidth: "200px",
                        display: "inline-block",
                        maxHeight: "40px",
                      }}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: document.content as string,
                        }}
                      />
                    </p>
                  </td>

                  <td className="min-w-250px text-end fw-bold text-muted">
                    <img
                      className="symbol-label bg-gray-600 rounded-circle mx-3"
                      src={
                        document.createdBy.user.avatarImageId ??
                        "/media/avatars/blank.png"
                      }
                      width={40}
                      height={40}
                      alt="flag"
                    />
                    <span className="text-muted fw-bold">
                      {document.createdBy.user.name}
                    </span>
                  </td>
                  <td className="min-w-200px text-end fw-bold text-muted">
                    <div className="d-flex flex-column">
                      <span>{formatDate(document.updatedAt)}</span>
                    </div>
                  </td>
                  <td className="min-w-100px text-end fw-bold text-muted">
                    <Link
                      href={`${document.fileId}`}
                      className="fw-bold mb-0 text-muted text-hover-primary text-truncate"
                      style={{
                        maxWidth: "200px",
                        display: "inline-block",
                      }}
                    >
                      {document.fileId}
                    </Link>
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
                        {/* <li>
                          <Link
                            href={`/admin/documents/edit/${document.id}`}
                            className="dropdown-item"
                          >
                            Edit
                          </Link>
                        </li> */}
                        <li></li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={async () => {
                              try {
                                await sopDeleteOne({
                                  variables: {
                                    where: {
                                      id: document.id,
                                    },
                                  },
                                });
                                await sopFileFindMany.refetch();
                              } catch (error) {
                                console.log(error);
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
const EksporTable = ({
  eksporFindMany,
  eksporDeleteOne,
}: //   sopLength,
{
  eksporFindMany: QueryResult<EksporDocumentFindManyQuery>;
  //   sopLength: number;
  eksporDeleteOne: any;
}) => {
  return (
    <>
      {eksporFindMany.error ? (
        <div className="d-flex justify-content-center align-items-center h-500px flex-column">
          <h3 className="text-center">{eksporFindMany.error.message}</h3>
        </div>
      ) : eksporFindMany.loading ? (
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
              <p className="mb-0">content</p>
            </th>
            <th className="text-end min-w-200px">TITLE</th>
            <th className="text-end min-w-250px">TANGGAL</th>
            <th className="text-end min-w-150px">FILE</th>
            <th className="text-end min-w-125px">ACTION</th>
          </KTTableHead>
          <tbody className="align-middle">
            {eksporFindMany?.data?.eksporDocumentFindMany?.map((document) => {
              return (
                <tr key={document.id} className="">
                  <td className="">
                    <p
                      //   href={`/admin/documents/detail/${document.id}`}
                      className="fw-bold mb-0 text-muted text-hover-primary text-truncate"
                      style={{
                        maxWidth: "200px",
                        display: "inline-block",
                        maxHeight: "40px",
                      }}
                    >
                      {document.title}
                    </p>
                  </td>

                  <td className="min-w-250px text-end fw-bold text-muted">
                    <img
                      className="symbol-label bg-gray-600 rounded-circle mx-3"
                      src={
                        document.createdBy.user.avatarImageId ??
                        "/media/avatars/blank.png"
                      }
                      width={40}
                      height={40}
                      alt="flag"
                    />
                    <span className="text-muted fw-bold">
                      {document.createdBy.user.name}
                    </span>
                  </td>
                  <td className="min-w-200px text-end fw-bold text-muted">
                    <div className="d-flex flex-column">
                      <span>{formatDate(document.updatedAt)}</span>
                    </div>
                  </td>
                  <td className="min-w-100px text-end fw-bold text-muted">
                    <Link
                      href={`${document.fileId}`}
                      className="fw-bold mb-0 text-muted text-hover-primary text-truncate"
                      style={{
                        maxWidth: "200px",
                        display: "inline-block",
                      }}
                    >
                      {document.fileId}
                    </Link>
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
                        {/* <li>
                          <Link
                            href={`/admin/documents/edit/${document.id}`}
                            className="dropdown-item"
                          >
                            Edit
                          </Link>
                        </li> */}
                        <li></li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={async () => {
                              try {
                                await eksporDeleteOne({
                                  variables: {
                                    where: {
                                      id: document.id,
                                    },
                                  },
                                });
                                await eksporFindMany.refetch();
                                //   await articleLength.refetch();
                              } catch (error) {
                                console.log(error);
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

const CommodtyTable = ({
  commodityFindMany,
  commodityDeleteOne,
}: {
  commodityFindMany: QueryResult<LocalCommodityFindManyQuery>;
  commodityDeleteOne: any;
}) => {
  return (
    <>
      {commodityFindMany.error ? (
        <div className="d-flex justify-content-center align-items-center h-500px flex-column">
          <h3 className="text-center">{commodityFindMany.error.message}</h3>
        </div>
      ) : commodityFindMany.loading ? (
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
            <th className=" min-w-200px">TITLE</th>
            <th className="text-end min-w-200px">Informasi</th>
            <th className="text-end min-w-200px">Instruksi</th>
            <th className="text-end min-w-250px">TANGGAL</th>
            <th className="text-end min-w-150px">FILE</th>
            <th className="text-end min-w-125px">ACTION</th>
          </KTTableHead>
          <tbody className="align-middle fw-bold">
            {commodityFindMany.data?.localCommodityFindMany?.map((document) => {
              return (
                <tr key={document.id}>
                  <td className="min-w-200px">{document.name}</td>
                  <td className="text-end text-muted min-w-200px">
                    <p className="text-truncate" style={{ maxWidth: "200px" }}>
                      {document.description}
                    </p>
                  </td>
                  <td className="text-end text-muted min-w-200px">
                    <p className="text-truncate" style={{ maxWidth: "200px" }}>
                      {document.instructionsForUse}
                    </p>
                  </td>
                  <td className="text-end text-muted min-w-200px">
                    {formatDate(document.createdAt)}
                  </td>
                  <td className="min-w-100px text-end fw-bold text-muted">
                    <Link
                      href={`${document.fileUrl}`}
                      target="_blank"
                      className="fw-bold mb-0 text-muted text-hover-primary text-truncate"
                      style={{
                        maxWidth: "200px",
                        display: "inline-block",
                      }}
                    >
                      {document.fileUrl}
                    </Link>
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
                        {/* <li>
                          <Link
                            href={`/admin/documents/edit/${document.id}`}
                            className="dropdown-item"
                          >
                            Edit
                          </Link>
                        </li> */}
                        <li></li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={async () => {
                              try {
                                await commodityDeleteOne({
                                  variables: {
                                    where: {
                                      id: document.id,
                                    },
                                  },
                                });
                                await commodityFindMany.refetch();
                                //   await articleLength.refetch();
                              } catch (error) {
                                console.log(error);
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
  selectTable,
  setDocumentFindSkip,
  handlePageChange,
  setSelectTable,
  setOrder,
  documentFindSearch,
  setDocumentFindSearch,
}: {
  selectTable: string;
  setDocumentFindSkip: Dispatch<SetStateAction<number>>;
  handlePageChange: (val: number) => void;
  setSelectTable: Dispatch<SetStateAction<string>>;
  setOrder: Dispatch<SetStateAction<SortOrder>>;
  documentFindSearch: string;
  setDocumentFindSearch: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="row justify-content-between gy-5">
      <div className="col-lg-auto">
        <TextField
          styleType="solid"
          preffixIcon="magnifier"
          placeholder="Search"
          props={{
            value: documentFindSearch,
            onChange: (e: any) => {
              setDocumentFindSearch(e.target.value);
            },
          }}
        ></TextField>
      </div>
      <div className="row col-lg-auto gy-3">
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            value={selectTable}
            options={[
              { label: "SOP", value: "sop" },
              { label: "Ekspor Dokumen", value: "ekspor" },
              { label: "Komoditas", value: "komoditas" },
            ]}
            onValueChange={(e) => {
              setSelectTable(e as string);
              setDocumentFindSkip(0);
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
              setOrder(e as SortOrder);
            }}
          />
        </div>

        <div className="col-lg-auto">
          <Buttons>
            <Link href={"/admin/document/create"} className="text-white">
              Tambah Dokumen Baru
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
}: // handlePageChangeEkspor,
// handlePageChangeSop,
{
  setArticleFindTake: (val: number) => void;
  setArticleFindSkip: (val: number) => void;
  articleFindTake: number;
  currentPage: number;
  setCurrentPage: (val: number) => void;
  pageLength: number;
  selectedTable: string;
  // handlePageChangeSop: (val: number) => void;
  // handlePageChangeEkspor: (val: number) => void;
}) => {
  // const {
  //   handlePageChangeMaterialPromotion,
  //   calculateTotalPageMaterialPromotion,
  //   handlePageChangeAnnouncement,
  //   calculateTotalPageAnnouncement,
  //   handlePageChangeNews,
  //   calculateTotalPageNews,
  // } = useArticleViewModel();

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
              // handlePageChangeEkspor(val);
              // handlePageChangeSop(val);
              setCurrentPage(val);
            }}
          ></Pagination>
        </div>
      </div>
    </div>
  );
};

export default Document;

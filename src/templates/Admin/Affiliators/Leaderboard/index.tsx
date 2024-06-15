import currencyFormatter from "@/_metronic/helpers/Formatter";
import { PageTitle } from "@/_metronic/layout/core";
import { Card } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import {
  breadcrumbs,
  useCoursesDropdown,
  useUserCompetitor,
} from "./Affiliator-view-model";
import { AsyncPaginate } from "react-select-async-paginate";

const LeaderboardPage = ({}) => {
  const { date, onChange, data, loading, handleSearch } = useUserCompetitor();
  const { loadOptions } = useCoursesDropdown();
  const colors = ["warning", "primary", "success", "secondary"];

  let count = 0;

  return (
    <>
      <div></div>
      <h3>Pilih Rentang Waktu</h3>
      <Flatpickr
        value={date}
        onChange={onChange}
        options={{
          mode: "range",
          dateFormat: "d M Y",
        }}
        className="form-control mb-5"
        placeholder="Pilih Rentang Waktu"
      />
      <h3>Pilih Berdasarkan Kelas</h3>
      <AsyncPaginate
        className="mb-5"
        loadOptions={loadOptions}
        onChange={(value: any) => {
          handleSearch(value?.value);
        }}
      ></AsyncPaginate>
      {loading && (
        <Card className="mx-1 mb-2 position-relative text-center">
          <Card.Body>
            <Card.Title>Loading...</Card.Title>
          </Card.Body>
        </Card>
      )}
      {(!data || !data.leaderboardAffiliatorQuery) && !loading ? (
        <Card className="mx-1 mb-2 position-relative text-center">
          <Card.Body>
            <Card.Title>Error: Data not available</Card.Title>
          </Card.Body>
        </Card>
      ) : (
        <div className="d-flex flex-column align-items-center">
          <PageTitle breadcrumbs={breadcrumbs}>Semua Leaderboard</PageTitle>
          {Array.from({ length: 4 }, (_, rowIndex) => {
            return (
              <div
                className={`d-flex flex-wrap justify-content-center my-2`}
                key={rowIndex}
              >
                {Array.from({ length: rowIndex + 1 }, (_, cardIndex) => {
                  const leaderIndex = count++;
                  let length = data?.leaderboardAffiliatorQuery?.length ?? 0;
                  if (leaderIndex >= length) {
                    return null;
                  }
                  return (
                    <Card
                      className="mx-1 mb-2 position-relative text-center"
                      style={{ width: "18rem", maxWidth: "100%" }}
                      key={leaderIndex}
                    >
                      <Card.Img
                        className="mt-5"
                        variant="top"
                        src={
                          data?.leaderboardAffiliatorQuery?.[leaderIndex]
                            ?.affiliator?.avatarImageId ??
                          "/media/avatars/blank.png"
                        }
                        style={{
                          borderRadius: "50%",
                          width: "50%",
                          height: "auto",
                          margin: "auto",
                        }}
                      />{" "}
                      <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
                        <h1
                          className={`badge badge-circle bg-${
                            leaderIndex < 3 ? colors[leaderIndex] : colors[3]
                          }`}
                        >
                          {leaderIndex + 1}
                        </h1>
                      </Card.ImgOverlay>
                      <Card.Body>
                        <Card.Title>
                          {data?.leaderboardAffiliatorQuery?.[leaderIndex]
                            ?.affiliator?.name ?? ""}
                        </Card.Title>
                        <Card.Text>
                          Jumlah Komisi:{" "}
                          {currencyFormatter(
                            parseInt(
                              data?.leaderboardAffiliatorQuery?.[
                                leaderIndex
                              ]?.commission?.toFixed(0) ?? "0"
                            )
                          )}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default LeaderboardPage;

import { PageTitle } from "@/_metronic/layout/core";
import { Card } from "react-bootstrap";
import { breadcrumbs } from "./Affiliator-view-model";

const LeaderboardPage = ({}) => {
  const leaders = Array.from({ length: 10 }, (_, i) => `Leader ${i + 1}`); // Replace this with your actual data

  let row = 0;
  let count = 0;

  return (
    <div className="d-flex flex-column align-items-center">
      <PageTitle breadcrumbs={breadcrumbs}>Semua Leaderboard</PageTitle>
      {Array.from({ length: 4 }, (_, rowIndex) => {
        row++;
        return (
          <div
            className={`d-flex flex-wrap justify-content-center my-2`}
            key={rowIndex}
          >
            {Array.from({ length: row }, (_, cardIndex) => {
              const leaderIndex = count + cardIndex;
              return (
                <Card
                  className="mx-1 mb-2"
                  style={{ width: "18rem", maxWidth: "100%" }}
                  key={leaderIndex}
                >
                  <Card.Body>
                    <Card.Title>{leaders[leaderIndex]}</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default LeaderboardPage;

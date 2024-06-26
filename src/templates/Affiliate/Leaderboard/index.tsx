import { PageTitle } from "@/_metronic/layout/core";
import useLeaderboardViewModel from "./Leaderboard-view-model";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import Flatpickr from "react-flatpickr";
import Image from "next/image";
import { LeaderboardTableType } from "@/types/tables/leaderboard";
import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { KTTableBody } from "@/_metronic/helpers/components/KTTableBody";



const Leaderboard = ({ }) => {
  const {
    breadcrumbs,
    leaderboardDateState,
    setLeaderboardDateState,
    tableRankData,
    rankColors,
  } = useLeaderboardViewModel();

  const GET_LEADERBOARD = gql`
query {
  affiliatorFindMany {
    user {
      avatarImageId
      name
      leaderboard {
        commission
        userId
        score
        totalQuantity
      }
    }
  }
}
`;

  const { loading, error, data } = useQuery(GET_LEADERBOARD);

  // console.log(data?.affiliatorFindMany[0].user.leaderboard);
  console.log(`query leaderboard`, data, error, loading);


  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Leaderboard</PageTitle>
      <KTCard>
        <KTCardBody>
          <Head
            date={leaderboardDateState}
            onChange={([startDate, endDate]) => {
              setLeaderboardDateState([startDate, endDate]);
            }}
          />
          {/* <LeaderboardTable
            tableRankData={tableRankData}
            rankColors={rankColors}
          /> */}
          <LeaderboardTableQuery
            rankColors={rankColors}
          />
        </KTCardBody>
      </KTCard>
    </>
  );
};

export default Leaderboard;

const Head = ({
  date,
  onChange,
}: {
  date: Date;
  onChange: (value: any) => void;
}) => {
  return (
    <>
      <div className="row flex-end">
        <div className="col-auto">
          <Flatpickr
            value={date}
            onChange={onChange}
            options={{
              mode: "range",
              dateFormat: "d m Y",
            }}
            className="form-control form-control-solid"
            placeholder="Pilih Rentang Waktu"
          />
        </div>
        <div className="col-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Semua Produk", value: "all" },
              { label: "Aktif", value: "active" },
              { label: "Tidak Aktif", value: "inactive" },
            ]}
            onValueChange={() => { }}
          />
        </div>
      </div>
    </>
  );
};

// const LeaderboardTable = ({
//   tableRankData,
//   rankColors,
// }: {
//   tableRankData: LeaderboardTableType[];
//   rankColors: string[];
// }) => {
//   return (
//     <div className="mt-10">
//       <div className="table-responsive">
//         <table className="table gy-5">
//           <thead>
//             <tr className="text-uppercase fw-bold text-muted">
//               <th className="min-w-100px">Peringkat</th>
//               <th className="min-w-250px">Nama Affiliasi</th>
//               <th className="text-end min-w-100px">Lead</th>
//               <th className="text-end min-w-100px">Sales</th>
//               <th className="text-end min-w-100px">Total Komisi</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tableRankData.map((data, index) => (
//               <tr key={index}>
//                 <td>
//                   <div className="symbol symbol-50px symbol-circle ">
//                     <div
//                       className={`symbol-label fs-2 fw-bold text-white ${rankColors[data.rank - 1] || "text-dark"
//                         }`}
//                     >
//                       {data.rank}
//                     </div>
//                   </div>
//                 </td>
//                 <td className="fw-bold text-end d-flex align-items-center ">
//                   <Image
//                     className="symbol symbol-50px symbol-circle me-5"
//                     src={data.image}
//                     width={50}
//                     height={50}
//                     alt={"A"}
//                   ></Image>
//                   {data.name}
//                 </td>
//                 <td className="fw-bold text-muted text-end">{data.leads}</td>
//                 <td className="fw-bold text-muted text-end">{data.sales}</td>
//                 <td className="fw-bold text-muted text-end">
//                   {data.commission}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

const LeaderboardTableQuery = ({
  rankColors,
}: {
  rankColors: string[];
}) => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardTableType[]>([]);

  const GET_LEADERBOARD = gql`
    query {
      affiliatorFindMany {
        user {
          avatarImageId
          name
          leaderboard {
            commission
            score
            totalQuantity
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_LEADERBOARD);

  useEffect(() => {
    if (data && data.affiliatorFindMany) {
      const usersData = data.affiliatorFindMany.map((affiliator: any) => ({
        rank: affiliator.user.leaderboard.rank,
        name: affiliator.user.name,
        leads: affiliator.user.leaderboard.score,
        sales: affiliator.user.leaderboard.totalQuantity,
        commission: affiliator.user.leaderboard.commission,
        image: affiliator.user.avatarImageId,
      }));
      setLeaderboardData(usersData);
    }
  }, [data]);

  console.log(`query leaderboard`, data, error, loading);

  return (
    <div className="mt-10">
      <div className="table-responsive">
        {/* <table className="table gy-5"> */}
        <KTTable utilityGY={5}>
          <KTTableHead className="text-uppercase fw-bold text-muted">
          {/* <thead> */}
            {/* <tr className="text-uppercase fw-bold text-muted"> */}
              <th className="min-w-100px">Peringkat</th>
              <th className="min-w-250px">Nama Affiliasi</th>
              <th className="text-end min-w-100px">Lead</th>
              <th className="text-end min-w-100px">Sales</th>
              <th className="text-end min-w-100px">Total Komisi</th>
            {/* </tr> */}
          {/* </thead> */}
          </KTTableHead>
          {/* <tbody> */}
            {leaderboardData.map((user, index) => (
              <KTTableBody key={index}>
              {/* <tr key={index}> */}
                <td>
                  <div className="symbol symbol-50px symbol-circle ">
                    <div
                      className={`symbol-label fs-2 fw-bold text-white ${rankColors[index] || 'text-dark'
                        }`}
                    >
                      {index + 1}
                    </div>
                  </div>
                </td>
                <td className="fw-bold text-end d-flex align-items-center ">
                  <img
                    className="symbol symbol-50px symbol-circle me-5"
                    src={user.image}
                    width={50}
                    height={50}
                    alt={user.name}
                  ></img>
                  {user.name}
                </td>
                <td className="fw-bold text-muted text-end">{user.leads}</td>
                <td className="fw-bold text-muted text-end">{user.sales}</td>
                <td className="fw-bold text-muted text-end">{user.commission}</td>
              {/* </tr> */}
              </KTTableBody>
            ))}
          {/* </tbody> */}
          </KTTable>
        {/* </table> */}
      </div>
    </div>

  );
};

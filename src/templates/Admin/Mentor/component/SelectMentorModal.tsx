import { KTIcon } from "@/_metronic/helpers";
import {
  QueryMode,
  useMentorCreateOneMutation,
  UserFindManyQuery,
  useUserFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { ApolloError } from "@apollo/client";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import SweetAlert2 from "react-sweetalert2";

interface SelectMentorModalProps {
  show: boolean;

  onClose: () => void;
  onSumbit: (id: string | null) => void;
  mentorRefetch: any;
}
const SelectMentorModal = ({
  show,
  onClose,
  onSumbit,
  mentorRefetch,
}: SelectMentorModalProps) => {
  const take = 10;
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState<string>("");
  const [userData, setUserData] = useState<
    UserFindManyQuery | undefined | null
  >();
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data, loading, error, fetchMore, refetch } = useUserFindManyQuery({
    variables: {
      take: take,
      skip: skip,
      where: {
        AND: [
          {
            mentor: {
              isNot: {
                id: {
                  contains: "",
                },
              },
            },
          },
          {
            OR: [
              {
                name: {
                  contains: search,
                  mode: QueryMode.Insensitive,
                },
              },
              {
                id: {
                  contains: search,
                  mode: QueryMode.Insensitive,
                },
              },
            ],
          },
        ],
      },
    },
  });
  const handleLoadMore = () => {
    setSkip((prevSkip) => prevSkip + take);
    fetchMore({});
  };
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop <= clientHeight + 1;
    if (bottom) {
      handleLoadMore();
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    refetch({
      skip: 0,
      where: {
        AND: [
          {
            mentor: {
              isNot: {
                id: {
                  contains: "",
                },
              },
            },
          },
          {
            OR: [
              {
                name: {
                  contains: e.target.value,
                  mode: QueryMode.Insensitive,
                },
              },
              {
                id: {
                  contains: e.target.value,
                  mode: QueryMode.Insensitive,
                },
              },
            ],
          },
        ],
      },
    });
  };
  useEffect(() => {
    setSkip(0);
  }, [search]);
  useEffect(() => {
    if (search != "" && data?.userFindMany?.length != 0) {
      setUserData(data);
    } else {
      if (data) {
        setUserData((prevData) => {
          if (!prevData) {
            return data;
          } else {
            const newData = Array.isArray(data?.userFindMany)
              ? data.userFindMany.filter(
                  (d) =>
                    Array.isArray(prevData.userFindMany) &&
                    !prevData.userFindMany.some((pd) => pd.id === d.id)
                )
              : [];
            return {
              ...data,
              userFindMany: Array.isArray(prevData.userFindMany)
                ? [...prevData.userFindMany, ...newData]
                : [...newData],
            };
          }
        });
      }
    }
  }, [data, search]);

  const [mentorCreateOne] = useMentorCreateOneMutation();
  const [swalProps, setSwalProps] = useState({});

  const handleSubmit = async (id: string | null) => {
    setIsLoading(true);
    try {
      const res = await mentorCreateOne({
        variables: {
          data: {
            user: {
              connect: {
                id: id,
              },
            },
          },
        },
      });
      setIsLoading(false);
      console.log(res.data?.mentorCreateOne);
      if (res.data?.mentorCreateOne) {
        console.log("JIR CALLED NIH");
        setSwalProps({
          show: true,
          title: "Berhasil",
          text: "Mentor berhasil ditambahkan",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      await mentorRefetch();
    } catch (error) {
      setIsLoading(false);

      console.log(error);
      setSwalProps({
        show: true,
        title: "Terjadi kesalahan saat menambahkan mentor",
        text: (error as ApolloError).message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    const refetchData = await refetch();
    setUserData(refetchData.data);
    setSelectedMentor(null);
  };

  return (
    <Modal
      show={show}
      size="lg"
      centered={true}
      tabIndex={-1}
      aria-hidden="true"
      dialogClassName={`modal-dialog modal-dialog-centered ${
        isLoading ? "overlay overlay-block rounded" : ""
      }`}
      scrollable={true}
    >
      <div className="modal-header">
        <h2>Tambahkan Mentor</h2>
        {/* begin::Close */}
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={onClose}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
        {/* end::Close */}
      </div>
      <div className="modal-body" onScroll={handleScroll}>
        <TextField
          styleType="solid"
          preffixIcon="magnifier"
          placeholder="Cari Nama User/ID User"
          props={{
            onChange: (e: any) => handleSearch(e),
          }}
        />
        <div className="pt-10 pe-10 pb-10">
          {error && <p className="text-center">Data tidak ditemukan</p>}
          {loading && <p className="text-center">Loading...</p>}
          {userData?.userFindMany?.map((user, index) => {
            return (
              <div className="d-flex align-items-center" key={index}>
                <div className="me-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="mentorSelect"
                    id={user.id}
                    value={user.id}
                    onChange={(e) => setSelectedMentor(user.id)}
                  />
                </div>
                <label
                  className="symbol symbol-50px me-5 py-5"
                  htmlFor={user.id}
                >
                  <span className="symbol-label bg-gray-600">
                    <img
                      className="symbol-label bg-gray-600"
                      src={user.avatarImageId ?? "/media/avatars/300-2.jpg"}
                      width="50"
                      height="50"
                      alt=""
                    />
                  </span>
                </label>
                <label className="d-flex flex-column" htmlFor={user.id}>
                  <p className="text-dark text-hover-primary cursor-pointer fs-6 fw-bold mb-0">
                    {user.name}{" "}
                    <span className="fw-normal text-muted">#{user.id}</span>
                  </p>
                  <span className="fw-bold text-muted">{user.email}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>

      <div className="modal-footer mx-auto">
        <button
          type="button"
          className="btn btn-light btn-active-light-primary"
          onClick={onClose}
        >
          Batal
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleSubmit(selectedMentor)}
        >
          Selanjutnya
        </button>
      </div>
      <SweetAlert2
        {...swalProps}
        didOpen={() => {
          // run when swal is opened...
        }}
        didClose={async () => {
          console.log("closed");
          setSwalProps({});
        }}
      />
      {isLoading && (
        <div className="overlay-layer rounded bg-dark bg-opacity-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SelectMentorModal;

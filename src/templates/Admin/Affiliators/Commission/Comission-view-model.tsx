/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";

import {
  useInvoiceFindManyQuery,
  QueryMode,
  SortOrder,
  useTransactionFindManyQuery,
  usePendingCommissionFindManyQuery,
  useAffiliatorFindManyQuery,
  useCourseFindManyQuery,
  useMembershipCategoryFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import { GroupBase, OptionsOrGroups } from "react-select";

export const formatToIDR = (amount: string) => {
  return parseInt(amount).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
};

export const breadcrumbs = [
  {
    title: "Manajemen Komisi",
    path: "/admin/affiliate/commission",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Semua Komisi",
    path: "#",
    isSeparator: true,
    isActive: true,
  },
];

const test = {};

// Pagination
const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [findSkip, setFindSkip] = useState(0);
  const [findTake, setFindTake] = useState(10);
  const invoiceLength = useInvoiceFindManyQuery();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFindSkip((page - 1) * findTake);
  };

  const calculateTotalPage = () => {
    return Math.ceil(
      (invoiceLength.data?.invoiceFindMany?.length ?? 0) / findTake
    );
  };
  return {
    currentPage,
    setCurrentPage,
    findSkip,
    setFindSkip,
    findTake,
    setFindTake,
    handlePageChange,
    calculateTotalPage,
    invoiceLength,
  };
};

const usePendingComissionPagination = () => {
  const [currentPendingCommPage, setCurrentPendingCommPage] = useState(1);
  const [findPendingCommSkip, setFindPendingCommSkip] = useState(0);
  const [findPendingCommTake, setFindPendingCommTake] = useState(10);
  const pendingCommissionLength = usePendingCommissionFindManyQuery({
    variables: {
      pendingCommissionArgs: {},
    },
  });

  const handlePendingCommPageChange = (page: number) => {
    setCurrentPendingCommPage(page);
    setFindPendingCommSkip((page - 1) * findPendingCommTake);
  };

  const calculateTotalPendingCommPage = () => {
    return Math.ceil(
      (pendingCommissionLength.data?.pendingCommissionFindMany?.length ?? 0) /
        findPendingCommTake
    );
  };
  return {
    currentPendingCommPage,
    setCurrentPendingCommPage,
    findPendingCommSkip,
    setFindPendingCommSkip,
    findPendingCommTake,
    setFindPendingCommTake,
    handlePendingCommPageChange,
    calculateTotalPendingCommPage,
    pendingCommissionLength,
  };
};

type OptionType = {
  value: number;
  label: string;
};

export const useFilterDropdown = () => {
  const getAffiliators = useAffiliatorFindManyQuery();
  const getCourses = useCourseFindManyQuery();
  const getMemberships = useMembershipCategoryFindManyQuery();

  async function loadOptions(search: any, prevOptions: any) {
    const resultAffiliators =
      getAffiliators.data?.affiliatorFindMany?.map((affiliator) => ({
        value: affiliator.user.name,
        label: affiliator.user.name,
      })) ?? [];
    resultAffiliators.unshift({ value: "", label: "Semua Affiliator" });
    await getAffiliators.refetch({
      skip: prevOptions.length,
      where: {
        user: {
          is: {
            name: {
              contains: search,
              mode: QueryMode.Insensitive,
            },
          },
        },
      },
    });

    const resultCourses =
      getCourses.data?.courseFindMany?.map((course) => ({
        value: course.title,
        label: course.title,
      })) ?? [];
    resultCourses.unshift({ value: "", label: "Semua Kelas" });
    await getCourses.refetch({
      skip: prevOptions.length,
      where: {
        title: {
          contains: search,
          mode: QueryMode.Insensitive,
        },
      },
    });

    const resultMemberships =
      getMemberships.data?.membershipCategoryFindMany?.map((membership) => ({
        value: membership.name,
        label: membership.name,
      })) ?? [];
    resultMemberships.unshift({ value: "", label: "Semua Membership" });
    await getMemberships.refetch({
      skip: prevOptions.length,
      where: {
        name: {
          contains: search,
          mode: QueryMode.Insensitive,
        },
      },
    });

    return {
      options: [...resultAffiliators, ...resultCourses, ...resultMemberships],
      // options: resultAffiliators,
      hasMore: false,
    };
  }
  return { loadOptions };
};

// DONT DELETE
// export const useCoursesDropdown = () => {
//   const getCourses = useCourseFindManyQuery();

//   async function loadOptions(search: any, prevOptions: any) {
//     const resultCourses =
//       getCourses.data?.courseFindMany?.map((course) => ({
//         value: course.id,
//         label: course.title,
//       })) ?? [];
//     resultCourses.unshift({ value: 0, label: "Semua Kelas" });
//     await getCourses.refetch({
//       skip: prevOptions.length,
//       where: {
//         title: {
//           contains: search,
//           mode: QueryMode.Insensitive,
//         },
//       },
//     });

//     return {
//       options: resultCourses,
//       hasMore: false,
//     };
//   }
//   return { loadOptions };
// };

// export const useMembershipsDropdown = () => {
//   const getMemberships = useMembershipCategoryFindManyQuery();

//   async function loadOptions(search: any, prevOptions: any) {
//     const resultMemberships =
//       getMemberships.data?.membershipCategoryFindMany?.map((membership) => ({
//         value: membership.id,
//         label: membership.name,
//       })) ?? [];
//     resultMemberships.unshift({ value: 0, label: "Semua Membership" });
//     await getMemberships.refetch({
//       skip: prevOptions.length,
//       where: {
//         name: {
//           contains: search,
//           mode: QueryMode.Insensitive,
//         },
//       },
//     });

//     return {
//       options: resultMemberships,
//       hasMore: false,
//     };
//   }
//   return { loadOptions };
// };

const useComissionViewModel = () => {
  const [takePage, setTakePage] = useState<any>(10);
  const [skipPage, setSkipPage] = useState<any>(0);
  const [orderBy, setOrderBy] = useState<SortOrder>(SortOrder.Desc);
  const [status, setStatus] = useState<any>(null);
  const [isCustomTake, setIsCustomTake] = useState(false);
  const [searchCommission, setSearchComission] = useState(null);
  const [selectedTable, setSelectedTable] = useState("commission");
  const [searchPendingCommission, setSearchPendingComission] = useState("");
  const [searchFilter, setSearchFilter] = useState(null);

  const {
    currentPage,
    setCurrentPage,
    findSkip,
    setFindSkip,
    findTake,
    setFindTake,
    handlePageChange,
    calculateTotalPage,
    invoiceLength,
  } = usePagination();
  const {
    currentPendingCommPage,
    findPendingCommSkip,
    findPendingCommTake,
    setFindPendingCommTake,
    handlePendingCommPageChange,
    calculateTotalPendingCommPage,
  } = usePendingComissionPagination();

  // Querying data
  const invoiceFindMany = useInvoiceFindManyQuery({
    variables: {
      take: parseInt(findTake.toString()),
      skip: findSkip,
      orderBy: {
        updatedAt: orderBy,
      },
      where: {
        OR: [
          // Search by course
          {
            order: {
              is: {
                enrollment: {
                  every: {
                    course: {
                      is: {
                        title: {
                          contains: searchCommission,
                          mode: QueryMode.Insensitive,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          // Search by buyer name
          {
            order: {
              is: {
                enrollment: {
                  every: {
                    course: {
                      is: {
                        enrollments: {
                          every: {
                            student: {
                              is: {
                                user: {
                                  is: {
                                    name: {
                                      contains: searchCommission,
                                      mode: QueryMode.Insensitive,
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          // Search by affiliator name
          {
            order: {
              is: {
                enrollment: {
                  every: {
                    course: {
                      is: {
                        enrollments: {
                          every: {
                            student: {
                              is: {
                                user: {
                                  is: {
                                    affiliator: {
                                      is: {
                                        user: {
                                          is: {
                                            name: {
                                              contains: searchCommission,
                                              mode: QueryMode.Insensitive,
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        ],
        status: {
          equals: status == "all" ? null : status,
        },
      },
    },
  });

  console.log(searchCommission);

  const transactionFindMany = useTransactionFindManyQuery({
    variables: {
      take: parseInt(findTake.toString()),
      skip: findSkip,
      orderBy: {
        updatedAt: orderBy,
      },
      where: {
        // Search by filter dropdown
        OR: [
          // Buyer name
          {
            payment: {
              is: {
                invoice: {
                  is: {
                    paymentForGateway: {
                      is: {
                        sender_name: {
                          contains: searchFilter,
                          mode: QueryMode.Insensitive,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          // Order name
          {
            payment: {
              is: {
                invoice: {
                  is: {
                    paymentForGateway: {
                      is: {
                        bill_title: {
                          contains: searchFilter,
                          mode: QueryMode.Insensitive,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          // Affiliator name
          {
            payment: {
              is: {
                invoice: {
                  is: {
                    order: {
                      is: {
                        createdByUser: {
                          is: {
                            affiliator: {
                              is: {
                                user: {
                                  is: {
                                    name: {
                                      contains: searchFilter,
                                      mode: QueryMode.Insensitive,
                                    }
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        ],
        // Search by searching input
        payment: {
          is: {
            invoice: {
              is: {
                OR: [
                  // Nama affiliator
                  {
                    order: {
                      is: {
                        createdByUser: {
                          is: {
                            affiliator: {
                              is: {
                                user: {
                                  is: {
                                    name: {
                                      contains: searchCommission,
                                      mode: QueryMode.Insensitive,
                                    }
                                  },
                                },
                              },
                            },
                          },
                        },
                      }
                    }
                  },
                  // Nama pembeli
                  {
                    paymentForGateway: {
                      is: {
                        sender_name: {
                          contains: searchCommission,
                          mode: QueryMode.Insensitive,
                        },
                      },
                    },
                  },
                  // Nama order
                  {
                    paymentForGateway: {
                      is: {
                        bill_title: {
                          contains: searchCommission,
                          mode: QueryMode.Insensitive,
                        },
                      },
                    },
                  }
                ],
              },
            },
          },
        },
      },
    },
  });

  const pendingComissionFindMany = usePendingCommissionFindManyQuery({
    variables: { pendingCommissionArgs: {
      take: parseInt(findPendingCommTake.toString()),
      skip: findPendingCommSkip,
      where: {
        createdByUser: {
          is: {
            name: {
              contains: searchPendingCommission,
              mode: QueryMode.Insensitive,
            }
          }
        }
      }
    } },
  });

  return {
    isCustomTake,
    setIsCustomTake,
    orderBy,
    setOrderBy,
    takePage,
    setTakePage,
    skipPage,
    setSkipPage,
    status,
    setStatus,
    calculateTotalPage,
    setSearchComission,
    invoiceFindMany,
    currentPage,
    handlePageChange,
    setFindTake,
    findTake,
    transactionFindMany,
    pendingComissionFindMany,
    selectedTable,
    setSelectedTable,
    setSearchPendingComission,
    currentPendingCommPage,
    findPendingCommSkip,
    findPendingCommTake,
    setFindPendingCommTake,
    handlePendingCommPageChange,
    calculateTotalPendingCommPage,
    setSearchFilter,
  };
};

export default useComissionViewModel;

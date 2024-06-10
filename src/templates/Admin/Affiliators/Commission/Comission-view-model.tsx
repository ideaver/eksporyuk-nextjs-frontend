/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";

import {
  useInvoiceFindManyQuery,
  QueryMode,
  SortOrder,
  useTransactionFindManyQuery,
  usePendingCommissionFindManyQuery
} from "@/app/service/graphql/gen/graphql";

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
      pendingCommissionArgs: {}
    }
  });

  const handlePendingCommPageChange = (page: number) => {
    setCurrentPendingCommPage(page);
    setFindPendingCommSkip((page - 1) * findPendingCommTake);
  };

  const calculateTotalPendingCommPage = () => {
    return Math.ceil(
      (pendingCommissionLength.data?.pendingCommissionFindMany?.length ?? 0) / findPendingCommTake
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


const useComissionViewModel = () => {
  const [takePage, setTakePage] = useState<any>(10);
  const [skipPage, setSkipPage] = useState<any>(0);
  const [orderBy, setOrderBy] = useState<SortOrder>(SortOrder.Desc);
  const [status, setStatus] = useState<any>(null);
  const [isCustomTake, setIsCustomTake] = useState(false);
  const [searchCommission, setSearchComission] = useState("");
  const [selectedTable, setSelectedTable] = useState("commission");
  const [searchPendingCommission, setSearchPendingComission] = useState("");

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
                        }
                      }
                    }
                  }
                }
              }
            }
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
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
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
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        ],
        status: {
          equals: status == "all" ? null : status,
        },
      },
    },
  });

  const transactionFindMany = useTransactionFindManyQuery({
    variables: {
      take: parseInt(findTake.toString()),
      skip: findSkip,
      orderBy: {
        updatedAt: orderBy,
      },
      where: {
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
                          contains: searchCommission,
                          mode: QueryMode.Insensitive,
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          {
            payment: {
              is: {
                invoice: {
                  is: {
                    paymentForGateway: {
                      is: {
                        bill_title: {
                          contains: searchCommission,
                          mode: QueryMode.Insensitive,
                        }
                      }
                    }
                  }
                }
              }
            }
          },
        ]
      }
    }
  });

  const pendingComissionFindMany = usePendingCommissionFindManyQuery({
    variables: {pendingCommissionArgs: {}}
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
  };
};

export default useComissionViewModel;

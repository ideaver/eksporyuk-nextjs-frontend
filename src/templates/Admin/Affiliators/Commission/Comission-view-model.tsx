/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";

import {
  useInvoiceFindManyQuery,
  QueryMode,
  SortOrder,
  useTransactionFindManyQuery,
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

const useComissionViewModel = () => {
  const [takePage, setTakePage] = useState<any>(10);
  const [skipPage, setSkipPage] = useState<any>(0);
  const [orderBy, setOrderBy] = useState<SortOrder>(SortOrder.Desc);
  const [status, setStatus] = useState<any>(null);
  const [isCustomTake, setIsCustomTake] = useState(false);
  const [searchCommission, setSearchComission] = useState("");

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
    }
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
  };
};

export default useComissionViewModel;

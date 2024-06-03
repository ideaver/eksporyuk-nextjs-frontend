import {
  OrderFindManyQuery,
  OrderStatusEnum,
  QueryMode,
  SortOrder,
  useOrderFindLengthQuery,
  useOrderFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import { QueryResult } from "@apollo/client";
import { useEffect, useState } from "react";

export const breadcrumbs = [
  {
    title: "Manajemen Order",
    path: "/admin/orders",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];

// Pagination related functions
const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [orderFindSkip, setorderFindSkip] = useState(0);
  const [orderFindTake, setOrderFindTake] = useState(10);
  const ordersLemngth = useOrderFindLengthQuery();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setorderFindSkip((page - 1) * orderFindTake);
  };

  const calculateTotalPage = () => {
    return Math.ceil(
      (ordersLemngth.data?.orderFindMany?.length ?? 0) / orderFindTake
    );
  };
  return {
    currentPage,
    setCurrentPage,
    orderFindSkip,
    setorderFindSkip,
    orderFindTake,
    setOrderFindTake,
    handlePageChange,
    calculateTotalPage,
    ordersLemngth,
  };
};

// Checkbox related functions
const useCheckbox = (orderFindMany: QueryResult<OrderFindManyQuery>) => {
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState(
    (orderFindMany.data?.orderFindMany ?? []).map((item) => ({
      id: item.id,
      value: false,
    }))
  );

  useEffect(() => {
    setCheckedItems(
      (orderFindMany.data?.orderFindMany ?? []).map((item) => ({
        id: item.id,
        value: false,
      }))
    );
  }, [orderFindMany.data?.orderFindMany]);

  const handleSingleCheck = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index].value = !newCheckedItems[index].value;
    setCheckedItems(newCheckedItems);
    setSelectAll(newCheckedItems.every((item) => item.value));
  };

  const handleSelectAllCheck = () => {
    setSelectAll(!selectAll);
    setCheckedItems(
      Array.isArray(orderFindMany.data?.orderFindMany)
        ? orderFindMany.data?.orderFindMany?.map((item) => ({
            id: item.id,
            value: !selectAll,
          }))
        : []
    );
  };

  return {
    selectAll,
    checkedItems,
    handleSingleCheck,
    handleSelectAllCheck,
  };
};

const useAdminOrderViewModel = () => {
  // Query and Modal
  const {
    currentPage,
    setCurrentPage,
    orderFindSkip,
    setorderFindSkip,
    orderFindTake,
    setOrderFindTake,
    handlePageChange,
    calculateTotalPage,
    ordersLemngth,
  } = usePagination();
  const [orderFindSearch, setOrderFindSearch] = useState<string | number>("");
  const [statusFilter, setStatusFilter] = useState<OrderStatusEnum | undefined>(
    undefined
  );
  const [orderTypeFilter, setOrderTypeFilter] = useState<string>("all");
  const [orderBy, setOrderBy] = useState<SortOrder>(SortOrder.Desc);

  const orderFindMany = useOrderFindManyQuery({
    variables: {
      take: parseInt(orderFindTake.toString()),
      skip: orderFindSkip,
      orderBy: [
        {
          createdAt: orderBy,
        },
      ],
      where: {
        AND: [
          {
            OR: [
              {
                cart: {
                  is: {
                    cartItems: {
                      some: {
                        OR: [
                          {
                            bundle: {
                              is: {
                                name: {
                                  contains: orderFindSearch.toString(),
                                  mode: QueryMode.Insensitive,
                                },
                              },
                            },
                          },
                          {
                            course: {
                              is: {
                                title: {
                                  contains: orderFindSearch.toString(),
                                  mode: QueryMode.Insensitive,
                                },
                              },
                            },
                          },
                          {
                            membership: {
                              is: {
                                name: {
                                  contains: orderFindSearch.toString(),
                                  mode: QueryMode.Insensitive,
                                },
                              },
                            },
                          },
                          {
                            product: {
                              is: {
                                name: {
                                  contains: orderFindSearch.toString(),
                                  mode: QueryMode.Insensitive,
                                },
                              },
                            },
                          },
                          {
                            productService: {
                              is: {
                                name: {
                                  contains: orderFindSearch.toString(),
                                  mode: QueryMode.Insensitive,
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                },
              },
              {
                invoices: {
                  some: {
                    id: {
                      equals: isNaN(parseInt(orderFindSearch.toString()))
                        ? 0
                        : parseInt(orderFindSearch.toString()),
                    },
                  },
                },
              },
              {
                id: {
                  equals: isNaN(parseInt(orderFindSearch.toString()))
                    ? 0
                    : parseInt(orderFindSearch.toString()),
                },
              },
              {
                createdByUser: {
                  is: {
                    name: {
                      contains: orderFindSearch.toString(),
                      mode: QueryMode.Insensitive,
                    },
                  },
                },
              },
            ],
          },
          statusFilter != null
            ? {
                statuses: {
                  some: {
                    status: {
                      equals: statusFilter,
                    },
                  },
                },
              }
            : {
                statuses: {
                  some: {
                    status: {
                      in: [
                        OrderStatusEnum.Cancelled,
                        OrderStatusEnum.Pending,
                        OrderStatusEnum.Processing,
                        OrderStatusEnum.Returned,
                        OrderStatusEnum.Delivered,
                        OrderStatusEnum.Done,
                        OrderStatusEnum.Shipped,
                      ],
                    },
                  },
                },
              },
        ],
      },
    },
  });

  console.log(orderFindMany.data?.orderFindMany);

  const { selectAll, checkedItems, handleSingleCheck, handleSelectAllCheck } =
    useCheckbox(orderFindMany);

  const [exportModalState, setExportModalState] = useState<any>({
    startDate: new Date(),
    endDate: new Date(),
  });

  return {
    orderBy,
    setOrderBy,
    orderFindMany,
    orderFindTake,
    setOrderFindTake,
    orderFindSkip,
    setorderFindSkip,
    orderFindSearch,
    setOrderFindSearch,
    ordersLemngth,
    currentPage,
    setCurrentPage,
    handlePageChange,
    handleSingleCheck,
    handleSelectAllCheck,
    selectAll,
    checkedItems,
    calculateTotalPage,
    exportModalState,
    setExportModalState,
    setStatusFilter,
  };
};
export default useAdminOrderViewModel;

import {
  CartItemTypeEnum,
  OrderFindManyQuery,
  OrderStatusEnum,
  QueryMode,
  SortOrder,
  useExportOrderMutation,
  useFollowUpDeleteOneMutation,
  useFollowUpFindManyQuery,
  useOrderFindLengthQuery,
  useOrderFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { RootState } from "@/app/store/store";
import {
  changeContent,
  changeFollowUpCoupon,
  changeFollowUpDate,
  changeFollowUpEmail,
  changeFollowUpName,
  changeFollowUpPhone,
  changeFollowUpTamplate,
  changeId,
  changeName,
  changeSelectedFollwUpValue,
} from "@/features/reducers/followup/followupReducer";
import { QueryResult } from "@apollo/client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  const dispatch = useDispatch();
  const followUpState = useSelector((state: RootState) => state.followUp);

  const [orderFindSearch, setOrderFindSearch] = useState<string | number>("");
  const [statusFilter, setStatusFilter] = useState<OrderStatusEnum | undefined>(
    undefined
  );
  const [orderTypeFilter, setOrderTypeFilter] = useState<string>("all");
  const [orderBy, setOrderBy] = useState<SortOrder>(SortOrder.Desc);
  const [categoryOrderType, setCategoryOrderType] = useState<
    CartItemTypeEnum | "all"
  >("all");
  const [isLoading, setIsloading] = useState(false);

  const orderTypeOptions = [
    { value: "all", label: "Semua Category" },
    { value: CartItemTypeEnum.Membership, label: "Membership" },
    { value: CartItemTypeEnum.Bundle, label: "Bundle" },
    { value: CartItemTypeEnum.Course, label: "Course" },
    { value: CartItemTypeEnum.Product, label: "Product" },
    { value: CartItemTypeEnum.Service, label: "Service" },
  ];

  const orderVariables =  {
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
            // {
            //   invoices: {
            //     some: {
            //       id: {
            //         equals: isNaN(parseInt(orderFindSearch.toString()))
            //           ? 0
            //           : parseInt(orderFindSearch.toString()),
            //       },
            //     },
            //   },
            // },
            {
              invoices: {
                some: {
                  uniqueCode: {
                    contains: orderFindSearch.toString(),
                    mode: QueryMode.Insensitive,
                  },
                },
              },
            },
            // {
            //   id: {
            //     equals: isNaN(parseInt(orderFindSearch.toString()))
            //       ? 0
            //       : parseInt(orderFindSearch.toString()),
            //   },
            // },
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
  }
  const orderFindMany = useOrderFindManyQuery({
    variables: orderVariables,
  });
  const [exportOrder] = useExportOrderMutation();

  const followUpFindMany = useFollowUpFindManyQuery();

  const handleFollupChange = (
    event: React.ChangeEvent<HTMLInputElement> | any
  ) => {
    dispatch(changeSelectedFollwUpValue(event.target.value));

    const filterContent = followUpFindMany.data?.followUpFindMany?.filter(
      (e) => e.name == event.target.value
    )[0];
    dispatch(changeFollowUpTamplate(filterContent?.content));
  };

  const [followUpDeleteOne] = useFollowUpDeleteOneMutation();
  const handleSendFollowUp = () => {
    const contentReplaced = followUpState.followUpTamplate
      ?.replace(/\[\[nama\]\]/g, `${followUpState.name}`)
      .replace(/\[\[tanggal-pembelian\]\]/g, formatDate(followUpState.date))
      .replace(/\[\[email\]\]/g, `${followUpState.email}`)
      .replace(/\[\[nomor-telepon\]\]/g, `${followUpState.phone}`)
      .replace(/\[\[kupon\]\]/g, `${followUpState.coupon}`);
    const encodedMessage = encodeURIComponent(`${contentReplaced}`);

    return `https://web.whatsapp.com/send?phone=${followUpState.phone}&text=${encodedMessage}`;
  };
  const handleChangeFollowUpState = (data: {
    name: string;
    date: string;
    email: string;
    phone: string;
    coupon: string;
  }) => {
    dispatch(changeFollowUpName(data.name));
    dispatch(changeFollowUpEmail(data.email));
    dispatch(changeFollowUpDate(data.date));
    dispatch(changeFollowUpCoupon(data.coupon));
    dispatch(changeFollowUpPhone(data.phone));
  };

  const handleDeleteFollowUp = async (name: string) => {
    const editFolup = followUpFindMany.data?.followUpFindMany?.filter(
      (e) => e.name === name
    )[0];

    try {
      await followUpDeleteOne({
        variables: {
          where: {
            id: editFolup?.id,
          },
        },
      });
      await followUpFindMany.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditState = (name: any) => {
    const editFolup = followUpFindMany.data?.followUpFindMany?.filter(
      (e) => e.name === name
    )[0];
    console.log(editFolup);
    dispatch(changeName(`${editFolup?.name}`));
    dispatch(changeContent(`${editFolup?.content}`));
    dispatch(changeId(editFolup?.id as number));
  };

  const { selectAll, checkedItems, handleSingleCheck, handleSelectAllCheck } =
    useCheckbox(orderFindMany);

  const [exportModalState, setExportModalState] = useState<any>([
    new Date(),
    new Date(),
  ]);

  return {
    handleChangeFollowUpState,
    handleDeleteFollowUp,
    handleEditState,
    handleFollupChange,
    handleSendFollowUp,
    followUpFindMany,
    isLoading,
    setIsloading,
    exportOrder,
    categoryOrderType,
    setCategoryOrderType,
    orderTypeOptions,
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
    orderVariables
  };
};
export default useAdminOrderViewModel;

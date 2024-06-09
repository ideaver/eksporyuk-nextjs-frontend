// for example catagroy: OTHERS_PROBLEM to Others Problem
export const formatCategoryType = (str: string | undefined) => {
  const temp = str?.split("_").map((e) => e.toLowerCase());
  const result = temp
    ?.map((e) => e[0].toUpperCase() + e.slice(1, e.length))
    .join(" ");
  return result;
};

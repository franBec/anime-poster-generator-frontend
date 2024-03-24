import ReactPaginate from "react-paginate";
import {
  GetAnimeSearchApiArg,
  PaginationPlus,
} from "../../../../generated/rtk-query/jikanApi";
import { useRouter } from "next/navigation";
import { AlertDestructive } from "../layout/alertDestructive";

const PaginationAnimeSearch = ({
  paginationPlus,
  getAnimeSearchApiArg,
}: {
  paginationPlus: PaginationPlus;
  getAnimeSearchApiArg: GetAnimeSearchApiArg;
}) => {
  const router = useRouter();

  const itemsLength = paginationPlus.pagination?.items?.total;
  const itemsPerPage = paginationPlus.pagination?.items?.per_page;

  if (!itemsLength || !itemsPerPage) {
    return <AlertDestructive alertDescription="No pagination available" />;
  }

  const handlePageClick = (event: { selected: number }) => {
    getAnimeSearchApiArg.page = event.selected + 1;

    const queryParams: string[] = [];
    for (const [key, value] of Object.entries(getAnimeSearchApiArg)) {
      if (value !== undefined) {
        queryParams.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        );
      }
    }

    const queryString = queryParams.join("&");
    router.push(queryString ? `/search?${queryString}` : "/search");
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next >"
      onPageChange={handlePageClick}
      pageCount={Math.ceil(itemsLength / itemsPerPage)}
      previousLabel="< Previous"
      containerClassName="mx-auto flex w-full justify-center flex-row items-center gap-1"
      previousClassName="flex items-center justify-center px-3 h-8 leading-tight rounded hover:bg-primary hover:text-secondary dark:hover:bg-primary dark:hover:text-white pl-2.5"
      nextClassName="flex items-center justify-center px-3 h-8 leading-tight rounded hover:bg-primary hover:text-secondary dark:hover:bg-primary dark:hover:text-white pr-2.5"
      breakClassName="flex h-9 w-9 items-center justify-center"
      pageClassName="flex items-center justify-center px-3 h-8 leading-tight rounded hover:bg-primary hover:text-secondary dark:hover:bg-primary dark:hover:text-white"
      activeClassName="flex items-center justify-center px-3 h-8 leading-tight border rounded hover:bg-primary hover:text-secondary dark:hover:bg-primary dark:hover:text-white"
    />
  );
};

export default PaginationAnimeSearch;

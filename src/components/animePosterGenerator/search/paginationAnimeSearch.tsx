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

  const pageCount = Math.ceil(itemsLength / itemsPerPage);

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
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
    />
  );
};

export default PaginationAnimeSearch;

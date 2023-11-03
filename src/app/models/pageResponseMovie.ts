import { Movie } from "./movie";

export class PageResponseMovie {
    content: Array<Movie>;
    empty: boolean;
    first: boolean;
    last: number;
    number: number;
    numberOfElements: number;
    pageable: any;
    sort: {empty: true, sorted: false, unsorted: true};
    totalElements: number;
    totalPages: number;
}
class PaginationView {
    static MAX_PAGE_SIZE = 20;
    static MIN_PAGE_SIZE = 1;
    static MIN_PAGE_NUMBER = 0;

    constructor({ pageNumber, pageSize, totalCount }) {
        this.pageNumber = parseInt(pageNumber);
        this.pageSize = parseInt(pageSize);
        this.totalCount = totalCount ? parseInt(totalCount) : undefined;
        this.#verify();
    }

    #verify() {
        if (this.pageSize > PaginationView.MAX_PAGE_SIZE)
            this.pageSize = PaginationView.MAX_PAGE_SIZE;
        if (this.pageSize < PaginationView.MIN_PAGE_SIZE)
            this.pageSize = PaginationView.MIN_PAGE_SIZE;
        if (this.pageNumber < PaginationView.MIN_PAGE_NUMBER)
            this.pageNumber = PaginationView.MIN_PAGE_NUMBER;
    }
}

module.exports = { PaginationView };

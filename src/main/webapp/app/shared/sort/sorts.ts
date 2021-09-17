export default function buildPaginationQueryOpts(paginationQuery) {
  const params = new URLSearchParams();
  if (paginationQuery) {
    if (paginationQuery.sort) {
      for (const idx of Object.keys(paginationQuery.sort)) {
        params.append('sort', paginationQuery.sort[idx]);
      }
    }
    if (paginationQuery.page) {
      params.append('page', paginationQuery.page);
    }
    if (paginationQuery.size) {
      params.append('size', paginationQuery.size);
    }
  }
  return params.toString();
}

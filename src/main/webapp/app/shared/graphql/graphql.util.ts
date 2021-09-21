export function toHttpResponse(response) {
  const { __typename, ...data } = response.data.result;
  return { data };
}

export function toPagedHttpResponse(response) {
  const headers = { 'x-total-count': String(response.data.result.totalCount) };
  return {
    data: response.data.result.edges.map(edge => edge.node),
    headers,
  };
}

export function buildPaginationOptions(req) {
  return {
    ...req,
    sort: req?.sort && req.sort.join(','),
  };
}

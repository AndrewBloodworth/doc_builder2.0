export default function paginateResponse<T>(
  items: T[],
  offset: number,
  limit: number
) {
  const start = offset * limit;
  const end = start + limit;

  return {
    rows: items.slice(start, end),
    pageCount: Math.ceil(items.length / limit) || 1,
  };
}

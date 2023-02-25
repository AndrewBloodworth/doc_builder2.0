import db from "../../db";
import { WhereData, WhereObj, WhereType } from "../../types";

const Op = db.Op;
const dateStr = (date: string): string => date.split("T")[0];
const datePlus = (days: number, date: string): string => {
  const d = new Date(dateStr(date));
  d.setDate(d.getDate() + days);
  return dateStr(d.toISOString());
};

export default (data: WhereData, types: WhereType[]) => {
  const whereObj: WhereObj = {};
  for (const type of types) {
    switch (type) {
      case WhereType.REGEXP_SEARCH: {
        if (!!data.term) {
          whereObj.where = {
            ...whereObj.where,
            name: {
              [Op.regexp]: `(?i)${data.term}`,
            },
          };
        }
        break;
      }
      case WhereType.CREATED_DATE_RANGE: {
        if (!!data.dateRange) {
          const [start, end] = data.dateRange;

          if (!!start) {
            whereObj.where = {
              ...whereObj.where,
              createdAt: {
                [Op.and]: [
                  { [Op.gte]: dateStr(start) },
                  { [Op.lt]: datePlus(1, !!end ? end : start) },
                ],
              },
            };
          }
        }
        break;
      }
    }
  }
  return whereObj;
};

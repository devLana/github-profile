import type { ObjectType } from "../dataTypes";

const objectIsEmpty = (obj: ObjectType) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export default objectIsEmpty;

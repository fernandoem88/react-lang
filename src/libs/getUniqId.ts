import { v4 as uuidv4 } from 'uuid';

export function getUniqId(key = 'id') {

  return key + uuidv4();
}

import { TableType, TableUser } from './monitor.types';

const secondarySort = (type: TableType, a: TableUser, b: TableUser, reverse?: boolean) => {
  const r = reverse ? -1 : 1;

  switch (type) {
    case TableType.ACM:
      return a.penalty - b.penalty * r;

    case TableType.LightACM:
      return a.totalTries - b.totalTries * r;

    case TableType.IOI:
    default:
      const lastResultA = a.results[a.results.length - 1];
      const lastResultB = b.results[b.results.length - 1];
      if (!lastResultB) return 1 * r;
      if (!lastResultA) return -1 * r;
      return lastResultA.time - lastResultB.time * r;
  }
}

export const totalScoreCompare = (type: TableType, reverse?: boolean) => (a: TableUser, b: TableUser) => {
  const r = reverse ? -1 : 1;
  const primary = b.totalScore - a.totalScore;
  if (primary) return primary * r;

  return secondarySort(type, a, b, reverse);
}

export const nameCompare = (reverse?: boolean) => (a: TableUser, b: TableUser) => {
  const r = reverse ? -1 : 1;
  try {
    return a.lastname.localeCompare(b.lastname, 'ru') * r;
  }
  catch(e) {
    if (b.lastname.toLowerCase() > a.lastname.toLowerCase()) {
      return -1 * r;
    }
    if (b.lastname.toLowerCase() < a.lastname.toLowerCase()) {
      return r;
    }

    return 0;
  }
}

export const problemCompare = (problemId: number, reverse?: boolean) => (a: TableUser, b: TableUser) => {
  const r = reverse ? -1 : 1;

  const resA = a.results[problemId];
  const resB = b.results[problemId];
  if (!resA && !resB) return 0;
  if (!resA) return r;
  if (!resB) return -1 * r;

  const scoreA = Number(resA.mark) || 0;
  const scoreB = Number(resB.mark) || 0;
  const primary = scoreB - scoreA;

  if (primary) return primary * r;

  return (resB.time - resA.time) * r;
}

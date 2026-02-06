const K_FACTOR = 32;

export interface EloResult {
  newRatingP1: number;
  newRatingP2: number;
  changeP1: number;
  changeP2: number;
}

function expectedScore(ratingA: number, ratingB: number): number {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
}

export function calculateElo(
  ratingP1: number,
  ratingP2: number,
  scoreP1: number,
  scoreP2: number
): EloResult {
  let actualP1: number;
  if (scoreP1 > scoreP2) actualP1 = 1;
  else if (scoreP1 < scoreP2) actualP1 = 0;
  else actualP1 = 0.5;

  const expectedP1 = expectedScore(ratingP1, ratingP2);
  const changeP1 = Math.round(K_FACTOR * (actualP1 - expectedP1));
  const changeP2 = -changeP1;

  return {
    newRatingP1: Math.max(100, ratingP1 + changeP1),
    newRatingP2: Math.max(100, ratingP2 + changeP2),
    changeP1,
    changeP2,
  };
}

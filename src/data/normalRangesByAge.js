export const normalRangesByAge = (ageYears, ageMonths) => {
  const isNeonate = ageYears === 0 && ageMonths < 1;
  const isChild = ageYears < 16;

  return {
    "SVRI": isNeonate ? [1500, 3500] : isChild ? [1000, 2000] : [800, 1600],
    "FTC": [330, 440],
    "SMII": [1.2, 2.0],
    "VPK": [1.0, 1.3]
  };
};

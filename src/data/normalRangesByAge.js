// normalRangesByAge.js
export const normalRangesByAge = (ageYears, ageMonths) => {
  const isNeonate = ageYears === 0 && ageMonths < 1;
  const isChild = ageYears < 16;

  return {
    "Cardiac Output (CO)": isNeonate ? [0.5, 1.0] : isChild ? [3.5, 6.0] : [4.0, 8.0],
    "Cardiac Index (CI)": isNeonate ? [3.0, 5.0] : isChild ? [2.8, 4.2] : [2.5, 4.0],
    "Stroke Volume (SV)": isNeonate ? [1, 40] : isChild ? [40, 80] : [60, 100],
    "SVR": isNeonate ? [1500, 3500] : isChild ? [1000, 2000] : [800, 1600],
    "Minute Distance (MD)": isNeonate ? [16, 28] : [14, 22],
    "FTC": [330, 440],
    "SMII": [1.2, 2.0],
    "VPK": [1.0, 1.3]
  };
};

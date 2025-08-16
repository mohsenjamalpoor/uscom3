import {
  FaTint,
  FaSyringe,

  FaBolt,

  FaProcedures,
  FaVial,

  FaFlask,
} from "react-icons/fa";
import useHemodynamic from "../hooks/useHemodynamic";

export default function TreatmentGuide({ parameters, patient, darkMode }) {
  const {  parameters: hemodynamicParams } = useHemodynamic(parameters);

  // Destructure all parameters with default values
  const {
    md = null,
    svri = null,
    ci = null,
    smii = null,
    ftc = null,
    spO2 = null,
    hr = null,
    map = null,
    do2 = null,
    vpk = null
  } = hemodynamicParams || {};

  // Helper function to check if a value is a valid number
  const isValidNumber = (value) => {
    return value !== null && value !== undefined && typeof value === "number";
  };

 

  // بررسی معتبر بودن وزن بیمار
  const isValidWeight = () => {
    const weight = parseFloat(patient.weight);
    return !isNaN(weight) && weight > 0;
  };

  const calculateDose = (doseRange) => {
    if (!isValidWeight()) return null;

    const cleanRange = doseRange.replace(/[^\d\-\.]/g, "");
    const [minStr, maxStr] = cleanRange.split("-");
    const min = parseFloat(minStr);
    const max = parseFloat(maxStr);

    const patientWeight = parseFloat(patient.weight);
    const minDose = min * patientWeight;
    const maxDose = max * patientWeight;

    const formatValue = (val) => {
      if (val === 0) return "";
      if (val < 1) return val.toFixed(1);
      return parseFloat(val.toFixed(1));
    };

    return {
      min: formatValue(minDose),
      max: formatValue(maxDose),
    };
  };

  const getDoseText = (dose, unit) => {
    if (!dose) return "وزن بیمار را وارد کنید";
    return `${dose.min} - ${dose.max} ${unit}`;
  };

  // Function to determine if recommendation should be shown
  const shouldShowRecommendation = (requiredParams) => {
    return requiredParams.every((param) => isValidNumber(param));
  };

  const recommendations = {
    fluids: {
      icon: <FaTint className="text-blue-500" />,
      title: "مایع درمانی",
      getRecommendation: () => {
        if (
          
          shouldShowRecommendation([ftc]) &&
          ftc < 330
        ) {
          const dose = calculateDose("10-20 ml/kg");
          return {
            text: "نیاز فوری به مایع درمانی",
            dose: getDoseText(dose, "ml نرمال سالین"),
            rationale: `FTC پایین (${ftc} ms) و وضعیت `,
            priority: 1,
          };
        }
        if (
         
          shouldShowRecommendation([svri]) &&
          svri < 800
        ) {
          return {
            text: "مایع درمانی محافظه‌کارانه",
            dose: "حفظ تعادل مایع",
            rationale: `SVR پایین (${svri}) و وضعیت `,
            priority: 2,
          };
        }
        return {
          text: "وضعیت مایع کافی",
          dose: "مایع نگهدارنده",
          rationale: "پارامترها در محدوده نرمال",
          priority: 3,
        };
      },
    },
        furosemide: {
      icon: <FaVial className="text-orange-500" />,
      title: "فوروزماید",
      getRecommendation: () => {
        if (
          
          shouldShowRecommendation([ftc]) &&
          ftc > 440
        ) {
          const dose = calculateDose("0.5-1 mg/kg");
          return {
            text: "تجویز فوروزماید",
            dose: getDoseText(dose, "mg"),
            rationale: `FTC بالا (${ftc} ms) نشان‌دهنده حجم بیش از حد`,
            priority: 1,
          };
        }
      
        return {
          text: "نیاز فعلی ندارد",
          dose: "عدم تجویز",
          rationale: "تعادل حجمی مناسب",
          priority: 2,
        };
      },
    },

    noradrenaline: {
      icon: <FaSyringe className="text-red-500" />,
      title: "نوراپی‌نفرین",
      getRecommendation: () => {
        if (
         
          shouldShowRecommendation([svri]) &&
          svri < 800 
          
        ) {
          const dose = calculateDose("0.05-0.3 mcg/kg/min");
          return {
            text: "شروع نوراپی‌نفرین فوری",
            dose: getDoseText(dose, "mcg/min"),
            rationale: `SVR پایین (${svri}) `,
            priority: 1,
          };
        }
        if (
          
          shouldShowRecommendation([smii, svri]) &&
         1 < smii < 1.5 &&
          svri < 800
        ) {
          const dose = calculateDose("0.02-0.1 mcg/kg/min");
          return {
            text: "نوراپی‌نفرین ممکن است نیاز باشد",
            dose: getDoseText(dose, "mcg/min"),
            rationale: `SVR بالا (${svri}) و SMII مناسب (${smii})`,
            priority: 2,
          };
        }
        return {
          text: "نیاز فعلی ندارد",
          dose: "عدم تجویز",
          rationale: "عدم نشانه‌های واضح برای وازوپرسور",
          priority: 3,
        };
      },
    },

      vasopressin: {
      icon: <FaProcedures className="text-indigo-500" />,
      title: "وازوپرسین",
      getRecommendation: () => {
        if (
          
          shouldShowRecommendation([svri]) &&
          svri < 700 
         
        ) {
          return {
            text: " در صورتی که بیمار نور اپی نفرین با دوز کامل میگیرد وازوپرسین اضافه شود",
            dose: "0.01-0.04 units/min",
            rationale: `SVR بسیار پایین (${svri}) و MAP پایین (${map})`,
            priority: 1,
          };
        }
     
        return {
          text: "نیاز فعلی ندارد",
          dose: "عدم تجویز",
          rationale: "مقاومت عروقی کافی",
          priority: 2,
        };
      },
    },

  

    adrenaline: {
      icon: <FaBolt className="text-yellow-500" />,
      title: "اپی‌نفرین",
      getRecommendation: () => {
        if (
          
          shouldShowRecommendation([vpk, smii]) &&
          vpk < 1 &&
          smii < 1.0
        ) {
          const dose = calculateDose("0.01-0.1 mcg/kg/min");
          return {
            text: "شروع اپی‌نفرین فوری",
            dose: getDoseText(dose, "mcg/min"),
            rationale: `CI بسیار پایین (${vpk}) و SMII پایین (${smii})`,
            priority: 1,
          };
        }
       
        return {
          text: "نیاز فعلی ندارد",
          dose: "عدم تجویز",
          rationale: "عدم نشانه‌های واضح برای اپی‌نفرین",
          priority: 2,
        };
      },
    },

    milrinone: {
      icon: <FaFlask className="text-green-500" />,
      title: "میلرینون",
      getRecommendation: () => {
        if (
        
          shouldShowRecommendation([smii, svri]) &&
          smii < 1.2 &&
          svri > 1800
        ) {
          const dose = calculateDose("0.25-0.75 mcg/kg/min");
          return {
            text: " شروع میلرینون در صورتی که حداقل فشار خون برای سن وجود داشته باشد",
            dose: getDoseText(dose, "mcg/min"),
            rationale: `SMII پایین (${smii}) با SVRI بسیار بالا (${svri})`,
            priority: 1,
          };
        }
        if (shouldShowRecommendation([vpk, smii]) && vpk < 1 && smii < 1.4) {
          const dose = calculateDose("0.1-0.5 mcg/kg/min");
          return {
            text: "میلرینون ممکن است مفید باشد",
            dose: getDoseText(dose, "mcg/min"),
            rationale: `CI پایین (${vpk}) و SMII پایین (${smii})`,
            priority: 2,
          };
        }
        return {
          text: "نیاز فعلی ندارد",
          dose: "عدم تجویز",
          rationale: "عملکرد قلبی کافی",
          priority: 3,
        };
      },
    },

  
    


  };






  

  // مرتب‌سازی توصیه‌ها بر اساس اولویت
  const sortedRecommendations = Object.entries(recommendations)
    .map(([key, value]) => ({
      key,
      ...value,
      recommendation: value.getRecommendation(),
    }))
    .sort((a, b) => a.recommendation.priority - b.recommendation.priority);

  return (
    <div
      className={`rounded-lg shadow-md overflow-hidden ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className={`p-4 ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
        <h2 className="text-xl font-bold flex items-center">
          <FaSyringe className="mr-2" />
          راهنمای درمانی بر اساس USCOM
        </h2>
      </div>

      <div className="p-4 space-y-6">
        {sortedRecommendations.map(({ key, icon, title, recommendation }) => (
          <div
            key={key}
            className={`border-b pb-4 last:border-b-0 last:pb-0 ${
              recommendation.priority === 1
                ? "border-l-4 border-red-500 pl-3"
                : recommendation.priority === 2
                ? "border-l-4 border-yellow-500 pl-3"
                : ""
            }`}
          >
            <div className="flex items-center mb-3">
              {icon}
              <h3 className="text-lg text-blue-500 font-semibold ml-2">
                {title}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">توصیه</p>
                <p
                  className={`font-medium ${
                    recommendation.priority === 1
                      ? "text-red-500"
                      : recommendation.priority === 2
                      ? "text-yellow-500"
                      : ""
                  }`}
                >
                  {recommendation.text}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">دوز پیشنهادی</p>
                <p className="font-medium">{recommendation.dose}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">دلیل</p>
                <p className="text-sm">{recommendation.rationale}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

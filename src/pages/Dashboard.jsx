import { useState, useEffect } from "react";

import ParameterCard from "../components/ParameterCard";


import {normalRangesByAge} from "../data/normalRangesByAge.js"

import { initialParameters } from "../data/parameters";
import { FaNotesMedical } from "react-icons/fa";

export default function Dashboard({ darkMode }) {
  const [parameters, setParameters] = useState(
    initialParameters.map((p) => ({ ...p, isCritical: false }))
  );

  const [patient, setPatient] = useState({
    ageYears: "",
    ageMonths: "",
    weight: "",
    diagnosis: ""
  });

  // بررسی مقدار جدید و تعیین isCritical
 const handleParameterChange = (id, newValue) => {
  setParameters((prev) =>
    prev.map((p) => {
      if (p.id !== id) return p;

      const value = newValue === "" ? "" : parseFloat(newValue);
      const ranges = normalRangesByAge(patient.ageYears || 0, patient.ageMonths || 0);
      const normalRange = ranges[p.title] || [null, null];

      let isCritical = false;
      if (value !== "" && !isNaN(value) && normalRange[0] !== null) {
        isCritical = value < normalRange[0] || value > normalRange[1];
      }

      return { ...p, value, normalRange: normalRange.join("-"), isCritical };
    })
  );
};

useEffect(() => {
  const ranges = normalRangesByAge(patient.ageYears || 0, patient.ageMonths || 0);
  setParameters((prev) =>
    prev.map((p) => {
      const normalRange = ranges[p.title] || [null, null];
      let isCritical = false;
      if (p.value !== "" && !isNaN(p.value) && normalRange[0] !== null) {
        isCritical = p.value < normalRange[0] || p.value > normalRange[1];
      }
      return { ...p, normalRange: normalRange.join("-"), isCritical };
    })
  );
}, [patient.ageYears, patient.ageMonths]);

  const handlePatientWeightChange = (value) => {
    if (value === "" || (/^\d+\.?\d*$/.test(value) && Number(value) >= 0)) {
      setPatient((prev) => ({ ...prev, weight: value }));
    }
  };

  const handleAgeYearsChange = (value) => {
    if (value === "" || (Number(value) >= 0 && Number(value) <= 120)) {
      setPatient((prev) => ({ ...prev, ageYears: value }));
    }
  };

  const handleAgeMonthsChange = (value) => {
    if (value === "" || (Number(value) >= 0 && Number(value) <= 11)) {
      setPatient((prev) => ({ ...prev, ageMonths: value }));
    }
  };

  const formatAge = (years, months) => {
    const y = parseInt(years);
    const m = parseInt(months);
    if (isNaN(y) && isNaN(m)) return "";
    if (isNaN(y)) return `${m} ماه`;
    if (isNaN(m) || m === 0) return `${y} سال`;
    return `${y} سال و ${m} ماه`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ستون سمت چپ */}
        <div className="lg:col-span-1 space-y-6">
          <div
            className={`p-4 rounded-lg shadow ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <h2 className="text-xl font-bold mb-4">اطلاعات بیمار</h2>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">سن:</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  min="0"
                  max="120"
                  value={patient.ageYears}
                  onChange={(e) => handleAgeYearsChange(e.target.value)}
                  placeholder="سال"
                  className="p-2 rounded border border-gray-300 dark:border-gray-600 text-black flex-1"
                />
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={patient.ageMonths}
                  onChange={(e) => handleAgeMonthsChange(e.target.value)}
                  placeholder="ماه"
                  className="p-2 rounded border border-gray-300 dark:border-gray-600 text-black flex-1"
                />
              </div>
              {(patient.ageYears !== "" || patient.ageMonths !== "") && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {formatAge(patient.ageYears, patient.ageMonths)}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-semibold">وزن (کیلوگرم):</label>
              <input
                type="number"
                min="0"
                value={patient.weight}
                onChange={(e) => handlePatientWeightChange(e.target.value)}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 text-black"
                placeholder="وزن را وارد کنید..."
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 flex items-center">
              <FaNotesMedical className="mr-1" />
              تشخیص اولیه
            </label>
            <select
              name="diagnosis"
              value={patient.diagnosis}
              onChange={handleChange}
              className={`w-full p-2 rounded border ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-300"
              }`}
            >
              <option value=""> انتخاب کنید-</option>
              <optgroup label="شوک‌ها">
                <option value="شوک سپتیک">شوک سپتیک</option>
                <option value="شوک کاردیوژنیک">شوک کاردیوژنیک</option>
                <option value="شوک هیپوولمیک">شوک هیپوولمیک</option>
                <option value="شوک آنافیلاکتیک">شوک آنافیلاکتیک</option>
               
              </optgroup>
              
              <optgroup label="دیگر شرایط">
                <option value="دیس ریتمی قلبی">دیس ریتمی قلبی</option>
                <option value="کاردیومیوپاتی">میوکاردیت</option>
                <option value="هایپوکسی بافتی">هایپوکسی بافتی</option>
                <option value="اسیدوز متابولیک">اسیدوز متابولیک</option>
                <option value="اسیدوز متابولیک">کاهش پرفیوژن کلیه </option>

                <option value="دیگر">سایر موارد</option>
              </optgroup>
            </select>
          </div>

         
        </div>

        {/* ستون وسط */}
        <div className="lg:col-span-1 space-y-6">
          <div
            className={`p-4 rounded-lg shadow ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-xl font-bold mb-4">پارامترهای همودینامیک</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {parameters.map((param) => (
                <ParameterCard
                  key={param.id}
                  parameter={param}
                  onValueChange={handleParameterChange}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ستون راست */}
        
      </div>
    </div>
  );
}
import { useMemo } from 'react';

export default function useHemodynamic(parameters, patientAge) {
  return useMemo(() => {
    const getParam = (name) => {
      const param = parameters.find(p => p.title.includes(name));
      // اگر مقدار خالی بود، null برگردان
      return param && param.value !== "" ? parseFloat(param.value) : null;
    };
    
    // پارامترهای اصلی
    const svri = getParam('SVRI');
    const smii = getParam('SMII');
    const ftc = getParam('FTC');
    const vpk = getParam("VPK")
   
  
    
    // بررسی آیا تمام پارامترهای ضروری وارد شده‌اند
    const essentialParams = [svri, smii, ftc, vpk];
    const allEssentialEntered = essentialParams.every(val => val !== null);
    
    // اگر پارامترهای ضروری وارد نشده‌اند، وضعیت معلق برگردان
    if (!allEssentialEntered) {
      return {
        status: { type: 'Pending', text: 'منتظر ورود داده‌ها' },
        issues: [],
        parameters: {  svri,  smii, ftc, vpk },
        normalRanges: {}
      };
    }
    
    // تعیین محدوده نرمال بر اساس سن
    const isNeonate = patientAge?.ageYears === 0 && patientAge?.ageMonths < 1;
    const isChild = patientAge?.ageYears < 16;
    
    // مقادیر نرمالیزه شده بر اساس سن
 
    const normalSvriRange = isNeonate ? [1500, 3500] : isChild ? [1000, 2000] : [800, 1600];
    
    // وضعیت همودینامیک
    
    
    // تشخیص مشکلات
    const issues = [];
   
    
    return {
    
      issues,
      parameters: { 
        
        svri, 
       vpk,
        smii, 
        ftc, 
      
      },
      normalRanges: {
       
        svri: normalSvriRange,
        smii: [1.2, 2.0],
        ftc: [330, 440],
       
      }
    };
  }, [parameters, patientAge]);
}
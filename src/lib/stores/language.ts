import { writable } from 'svelte/store';

export type Language = 'ar' | 'en';

export const language = writable<Language>('ar');

export const translations = {
  ar: {
    // Header
    home: 'الرئيسية',
    riskCalculator: 'حاسبة المخاطر',
    about: 'حول المشروع',
    results: 'النتائج',
    contact: 'اتصل بنا',

    // Hero Section
    heroTitle: 'الكشف المبكر عن أمراض القلب',
    heroSubtitle: 'نظام ذكي يعتمد على خوارزميات تعلم الآلة للتنبؤ بمخاطر الإصابة بأمراض القلب',
    startAssessment: 'ابدأ التقييم الآن',
    learnMore: 'اعرف المزيد',

    // University Info
    university: 'الجامعة الافتراضية السورية',
    ministry: 'وزارة التعليم العالي - الجمهورية العربية السورية',
    researchTitle: 'تطوير خوارزميات التنقيب عن البيانات في تحسين عملية تشخيص أمراض القلب',
    student: 'الطالب: حازم خضر الحاج احميد',
    supervisors: 'المشرفون: د.م. جورج أنور كراز و د. ماجدة البكور',

    // Risk Calculator
    calculatorTitle: 'حاسبة مخاطر أمراض القلب',
    calculatorSubtitle: 'أدخل البيانات الطبية للحصول على تقييم دقيق لمخاطر الإصابة',

    // Form Labels
    age: 'العمر',
    sex: 'الجنس',
    male: 'ذكر',
    female: 'أنثى',
    cp: 'نوع ألم الصدر',
    cpType0: 'غير معروف',
    cpType1: 'ذبحة صدرية نموذجية',
    cpType2: 'ذبحة صدرية غير نموذجية',
    cpType3: 'ألم غير ذبحي',
    cpType4: 'بدون أعراض',
    trestbps: 'ضغط الدم أثناء الراحة (mmHg)',
    chol: 'الكوليسترول في الدم (mg/dl)',
    fbs: 'سكر الدم أثناء الصيام > 120 mg/dl',
    yes: 'نعم',
    no: 'لا',
    restecg: 'نتائج تخطيط القلب أثناء الراحة',
    restecgType0: 'طبيعي',
    restecgType1: 'شذوذ ST-T',
    restecgType2: 'تضخم البطين الأيسر',
    thalach: 'أقصى معدل ضربات القلب',
    exang: 'ذبحة صدرية ناتجة عن التمارين',
    oldpeak: 'انخفاض ST بسبب التمارين',
    slope: 'ميل قطعة ST',
    slopeType0: 'صاعد',
    slopeType1: 'مستوي',
    slopeType2: 'هابط',
    ca: 'عدد الأوعية الرئيسية (0-3)',
    thal: 'اختبار الثاليوم',
    thalType0: 'غير معروف',
    thalType1: 'طبيعي',
    thalType2: 'عيب ثابت',
    thalType3: 'عيب قابل للإصلاح',

    // Buttons
    calculate: 'احسب المخاطر',
    reset: 'إعادة تعيين',
    calculating: 'جاري الحساب...',

    // Results
    riskLevel: 'مستوى المخاطر',
    lowRisk: 'منخفض',
    moderateRisk: 'متوسط',
    highRisk: 'مرتفع',
    prediction: 'التنبؤ',
    hasDisease: 'احتمالية الإصابة بمرض القلب',
    noDisease: 'احتمالية الإصابة بمرض القلب',
    confidence: 'نسبة الثقة',

    // Models
    modelsTitle: 'مقارنة النماذج',
    knnModel: 'نموذج KNN',
    naiveBayesModel: 'نموذج Naive Bayes',
    decisionTreeModel: 'نموذج Decision Tree',
    accuracy: 'الدقة',
    precision: 'الدقة (Precision)',
    recall: 'الاستدعاء (Recall)',
    f1Score: 'F1-Score',

    // Research Info
    researchMethodology: 'منهجية البحث',
    dataCollection: 'جمع البيانات',
    dataCollectionDesc: 'تم استخدام بيانات UCI لأمراض القلب التي تحتوي على 303 سجلات و14 متغيراً سريرياً',
    preprocessing: 'معالجة البيانات',
    preprocessingDesc: 'تطبيق StandardScaler وتقسيم البيانات إلى 80% تدريب و20% اختبار',
    modelTraining: 'تدريب النماذج',
    modelTrainingDesc: 'تدريب ثلاثة نماذج: KNN، Naive Bayes، Decision Tree',
    evaluation: 'التقييم',
    evaluationDesc: 'استخدام مقاييس Accuracy، Precision، Recall، F1-score',

    // Footer
    rightsReserved: 'جميع الحقوق محفوظة',
    contactInfo: 'معلومات الاتصال',

    // Field Info/Tooltips
    ageInfo: 'العمر هو أحد العوامل المهمة في تقييم خطر الإصابة بأمراض القلب. المدى الطبيعي: 20-100 سنة. يزداد خطر الإصابة بأمراض القلب مع التقدم في العمر.',
    sexInfo: 'الجنس يلعب دوراً في خطر الإصابة بأمراض القلب. الذكور عادة أكثر عرضة للإصابة بأمراض القلب في سن مبكرة مقارنة بالإناث.',
    cpInfo: 'نوع ألم الصدر يساعد في تحديد نوع المشكلة القلبية:\n\n• الذبحة الصدرية النموذجية: ألم ضاغط في الصدر يحدث أثناء المجهود\n• الذبحة الصدرية غير النموذجية: ألم ليس له جميع خصائص الذبحة النموذجية\n• ألم غير ذبحي: ألم لا يرتبط بالقلب\n• بدون أعراض: عدم وجود أعراض',
    trestbpsInfo: 'ضغط الدم أثناء الراحة (mmHg):\n\n• الطبيعي: 90-120 mmHg\n• مرتفع قليلاً: 120-139 mmHg\n• ارتفاع ضغط الدم: 140+ mmHg\n\nارتفاع ضغط الدم يزيد من خطر الإصابة بأمراض القلب.',
    cholInfo: 'الكوليسترول في الدم (mg/dl):\n\n• المستوى المرغوب: أقل من 200 mg/dl\n• الحد الأعلى الطبيعي: 200-239 mg/dl\n• مرتفع: 240+ mg/dl\n\nارتفاع الكوليسترول يزيد من خطر تصلب الشرايين وأمراض القلب.',
    fbsInfo: 'سكر الدم أثناء الصيام (mg/dl):\n\n• الطبيعي: أقل من 100 mg/dl\n• ما قبل السكري: 100-125 mg/dl\n• السكري: 126+ mg/dl\n\nهذا الاختبار يحدد ما إذا كان مستوى السكر أعلى من 120 mg/dl، مما قد يشير إلى مرض السكري.',
    restecgInfo: 'تخطيط القلب الكهربائي أثناء الراحة (ECG):\n\n• طبيعي: لا توجد تغيرات\n• شذوذ ST-T: تغيرات في موجة ST أو T قد تشير إلى مشاكل في القلب\n• تضخم البطين الأيسر: زيادة سماكة جدار البطين الأيسر',
    thalachInfo: 'معدل ضربات القلب الأقصى:\n\n• معدل القلب الأقصى المتوقع = 220 - العمر\n• المدى الطبيعي أثناء الاختبار: 60-220 نبضة/دقيقة\n\nيتم قياسه خلال اختبار الجهد لتقييم استجابة القلب.',
    exangInfo: 'الذبحة الصدرية الناتجة عن التمارين:\n\n• نعم: حدوث ألم في الصدر أثناء ممارسة التمارين\n• لا: عدم حدوث ألم\n\nحدوث الذبحة أثناء التمارين قد يشير إلى نقص تروية القلب.',
    oldpeakInfo: 'انخفاض ST بسبب التمارين مقارنة بالراحة:\n\n• الطبيعي: 0-1\n• غير طبيعي: > 2\n\nيقاس بالملي فولت ويشير إلى درجة نقص تروية عضلة القلب.',
    slopeInfo: 'ميل قطعة ST في ذروة التمرين:\n\n• صاعد: إشارة إيجابية عادة\n• مستوي: قد يشير إلى مشكلة\n• هابط: إشارة تحذيرية قوية\n\nيساعد في تقييم شدة مرض الشريان التاجي.',
    caInfo: 'عدد الأوعية الدموية الرئيسية (0-3):\n\nيتم تحديده باستخدام التصوير التألقي. كلما زاد العدد، زاد انسداد الشرايين وارتفع خطر الإصابة بأمراض القلب.\n\n• 0: لا يوجد انسداد\n• 1-3: عدد الأوعية المسدودة',
    thalInfo: 'اختبار الثاليوم (Thalassemia):\n\n• طبيعي: تدفق دم طبيعي\n• عيب ثابت: عدم وصول الدم لمنطقة معينة (نسيج ميت)\n• عيب قابل للإصلاح: انخفاض التدفق أثناء الجهد لكن يتحسن مع الراحة\n\nيقيم تدفق الدم إلى عضلة القلب.',
  },
  en: {
    // Header
    home: 'Home',
    riskCalculator: 'Risk Calculator',
    about: 'About',
    results: 'Results',
    contact: 'Contact',

    // Hero Section
    heroTitle: 'Early Detection of Heart Disease',
    heroSubtitle: 'AI-powered system using machine learning algorithms to predict heart disease risk',
    startAssessment: 'Start Assessment',
    learnMore: 'Learn More',

    // University Info
    university: 'Syrian Virtual University',
    ministry: 'Ministry of Higher Education - Syrian Arab Republic',
    researchTitle: 'Develop Data Mining Algorithms to Improve the Diagnosis of Heart Disease',
    student: 'Student: Hazem Khader Al-Haj Ahmid',
    supervisors: 'Supervisors: Dr. George Anwar Karraz & Dr. Majeda Al-Bakour',

    // Risk Calculator
    calculatorTitle: 'Heart Disease Risk Calculator',
    calculatorSubtitle: 'Enter medical data to get an accurate risk assessment',

    // Form Labels
    age: 'Age',
    sex: 'Sex',
    male: 'Male',
    female: 'Female',
    cp: 'Chest Pain Type',
    cpType0: 'Unknown',
    cpType1: 'Typical Angina',
    cpType2: 'Atypical Angina',
    cpType3: 'Non-anginal Pain',
    cpType4: 'Asymptomatic',
    trestbps: 'Resting Blood Pressure (mmHg)',
    chol: 'Serum Cholesterol (mg/dl)',
    fbs: 'Fasting Blood Sugar > 120 mg/dl',
    yes: 'Yes',
    no: 'No',
    restecg: 'Resting ECG Results',
    restecgType0: 'Normal',
    restecgType1: 'ST-T Abnormality',
    restecgType2: 'Left Ventricular Hypertrophy',
    thalach: 'Maximum Heart Rate',
    exang: 'Exercise Induced Angina',
    oldpeak: 'ST Depression by Exercise',
    slope: 'Slope of Peak Exercise ST',
    slopeType0: 'Upsloping',
    slopeType1: 'Flat',
    slopeType2: 'Downsloping',
    ca: 'Number of Major Vessels (0-3)',
    thal: 'Thalassemia Test',
    thalType0: 'Unknown',
    thalType1: 'Normal',
    thalType2: 'Fixed Defect',
    thalType3: 'Reversible Defect',

    // Buttons
    calculate: 'Calculate Risk',
    reset: 'Reset',
    calculating: 'Calculating...',

    // Results
    riskLevel: 'Risk Level',
    lowRisk: 'Low',
    moderateRisk: 'Moderate',
    highRisk: 'High',
    prediction: 'Prediction',
    hasDisease: 'Heart Disease Likely',
    noDisease: 'Heart Disease Likely',
    confidence: 'Confidence',

    // Models
    modelsTitle: 'Models Comparison',
    knnModel: 'KNN Model',
    naiveBayesModel: 'Naive Bayes Model',
    decisionTreeModel: 'Decision Tree Model',
    accuracy: 'Accuracy',
    precision: 'Precision',
    recall: 'Recall',
    f1Score: 'F1-Score',

    // Research Info
    researchMethodology: 'Research Methodology',
    dataCollection: 'Data Collection',
    dataCollectionDesc: 'Used UCI Heart Disease dataset with 303 records and 14 clinical variables',
    preprocessing: 'Data Preprocessing',
    preprocessingDesc: 'Applied StandardScaler and split data into 80% training and 20% testing',
    modelTraining: 'Model Training',
    modelTrainingDesc: 'Trained three models: KNN, Naive Bayes, Decision Tree',
    evaluation: 'Evaluation',
    evaluationDesc: 'Used Accuracy, Precision, Recall, F1-score metrics',

    // Footer
    rightsReserved: 'All Rights Reserved',
    contactInfo: 'Contact Information',

    // Field Info/Tooltips
    ageInfo: 'Age is one of the key factors in assessing heart disease risk. Normal range: 20-100 years. The risk of heart disease increases with age.',
    sexInfo: 'Sex plays a role in heart disease risk. Males are generally more susceptible to heart disease at an earlier age compared to females.',
    cpInfo: 'Chest pain type helps identify the type of cardiac problem:\n\n• Typical Angina: Pressing chest pain occurring during exertion\n• Atypical Angina: Pain that doesn\'t have all typical angina characteristics\n• Non-anginal Pain: Pain not related to the heart\n• Asymptomatic: No symptoms',
    trestbpsInfo: 'Resting Blood Pressure (mmHg):\n\n• Normal: 90-120 mmHg\n• Elevated: 120-139 mmHg\n• High Blood Pressure: 140+ mmHg\n\nHigh blood pressure increases the risk of heart disease.',
    cholInfo: 'Serum Cholesterol (mg/dl):\n\n• Desirable: Less than 200 mg/dl\n• Borderline High: 200-239 mg/dl\n• High: 240+ mg/dl\n\nHigh cholesterol increases the risk of atherosclerosis and heart disease.',
    fbsInfo: 'Fasting Blood Sugar (mg/dl):\n\n• Normal: Less than 100 mg/dl\n• Prediabetes: 100-125 mg/dl\n• Diabetes: 126+ mg/dl\n\nThis test determines if blood sugar is above 120 mg/dl, which may indicate diabetes.',
    restecgInfo: 'Resting Electrocardiogram (ECG):\n\n• Normal: No changes\n• ST-T Abnormality: Changes in ST or T wave that may indicate heart problems\n• Left Ventricular Hypertrophy: Thickening of the left ventricle wall',
    thalachInfo: 'Maximum Heart Rate Achieved:\n\n• Expected Max Heart Rate = 220 - Age\n• Normal range during test: 60-220 beats/min\n\nMeasured during stress test to assess heart response.',
    exangInfo: 'Exercise Induced Angina:\n\n• Yes: Chest pain occurring during exercise\n• No: No pain\n\nAngina during exercise may indicate cardiac ischemia.',
    oldpeakInfo: 'ST Depression induced by exercise relative to rest:\n\n• Normal: 0-1\n• Abnormal: > 2\n\nMeasured in millivolts, indicates degree of cardiac muscle ischemia.',
    slopeInfo: 'Slope of peak exercise ST segment:\n\n• Upsloping: Usually positive sign\n• Flat: May indicate problem\n• Downsloping: Strong warning sign\n\nHelps assess severity of coronary artery disease.',
    caInfo: 'Number of Major Vessels (0-3):\n\nDetermined using fluoroscopy. Higher numbers indicate more arterial blockage and increased heart disease risk.\n\n• 0: No blockage\n• 1-3: Number of blocked vessels',
    thalInfo: 'Thalassemia Test:\n\n• Normal: Normal blood flow\n• Fixed Defect: No blood reaching certain area (dead tissue)\n• Reversible Defect: Reduced flow during stress but improves with rest\n\nAssesses blood flow to heart muscle.',
  }
};

export function t(key: string, lang: Language = 'ar'): string {
  return translations[lang][key as keyof typeof translations['ar']] || key;
}

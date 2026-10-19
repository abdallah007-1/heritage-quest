/*
  HERITAGE QUEST — frontend-only prototype.
  No backend, real authentication, medical triage or payment processing is implemented.
  Demo account details and access preferences are held in sessionStorage only.
  Trip selections and completed-demo flags use localStorage. Do not enter real sensitive data.
*/
(function () {
  'use strict';
  const DATA = window.HQ_DATA;
  const RATE = DATA.meta.currencyRate || 53.54;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  let lang = sessionStorage.getItem('hq-language') || 'en';
  let authMode = 'create';
  let map = null;
  let activeBaseLayer = null;
  let mapLayers = null;
  let siteMarkers = [];
  let providerMarkers = [];
  let quizIndex = 0;
  let quizScore = 0;
  let quizLocked = false;
  let currentQuizQuestions = [];
  let activeInfoAction = 'school';

  const STRINGS = {
    en: {
      priceConfirm: 'Confirm price', accessDocumentedBadge: 'Access info documented', accessPartialBadge: 'Partial access info', accessNeedsBadge: 'Check before visit', adultTicket: 'Reference adult ticket', viewDetails: 'Details', addToJourney: 'Add to journey', removeFromJourney: 'Remove', watchTour: 'Watch tour', approxPin: 'Approximate pin', accessFeatureConfirmed: 'Confirmed in official source', accessFeatureListed: 'Listed — reconfirm', accessFeatureCaution: 'Visitor caution', accessFeatureUnknown: 'Unknown / not confirmed', officialSpecialty: 'Specialty listed by provider', careStatusGeneral: 'Provisional — verify', officialSite: 'Official website ↗', officialTickets: 'Official tickets ↗', accessibilityDetails: 'Accessibility details', practicalInformation: 'Practical information', ticketReference: 'Reference ticket price', studentReference: 'Reference student price', fxNote: 'Indicative conversion at', priceSourceNote: 'EGP listing is the reference; verify before purchase.', eligibilityNote: 'Price and exemption rules may depend on nationality, age and documents.', nearbyCareTitle: 'Nearby medical directory entries', noNearbyCare: 'No matching directory entries in this seed dataset.', sourceAndLinks: 'Sources and links', infoMissingPrice: 'Price requires confirmation', journeyTitle: 'My demo journey', journeyEmpty: 'No places added yet. Select a destination card to build a journey.', journeyPlaces: 'selected places', journeyTicketTotal: 'Site-ticket subtotal', openCheckout: 'Preview checkout', clearJourney: 'Clear journey', tripAdded: 'Place added to your demo journey.', tripRemoved: 'Place removed from your journey.', profileSaved: 'Demo access profile saved for this browser session.', profileSignIn: 'Demo sign-in simulated. No secure account or backend exists.', profileRequired: 'Enter a demo name, email and demo password to continue.', quizCorrect: 'Correct answer! +100 points.', quizIncorrect: 'Not quite. Review the explanation, then continue.', quizComplete: 'Quest complete', quizResultCopy: 'You scored {score} out of 500 points. Thanks for exploring responsibly.', badgeEarned: 'Mindful Guardian badge earned', replayQuest: 'Play again', finishQuest: 'Finish', bookingDemoComplete: 'Demo booking summary created: {id}. No real booking or payment was made.', noTripSelected: 'No places selected yet. Add a destination or review the demo itinerary.', demoRequestTitle: 'Heritage Quest Education Pack', demoRequestBody: 'A proposed school product: destination-specific challenges, student participation, digital badges and accessibility-information links. This is not a live quote or booking.', demoRequestCopied: 'The demo request text is ready. Send it manually after agreeing a team email.', requestText: 'Hello, I would like to request a demonstration of the Heritage Quest Education Pack. Please share pilot scope, accessibility data methodology, pricing, and implementation requirements.', healthFilterApplied: 'Applied your profile category to the directory filter.', accessNotVerified: 'Disability access not verified', close: 'Close', directions: 'Directions ↗', mapError: 'The map could not load. Check your internet connection or use external map links.', nextQuestion: 'Next question →', officialSource: 'Source / provider website ↗', providersDisclaimer: 'This preliminary directory does not confirm suitability for an individual condition.', provisionalProvider: 'Provisional listing — verify before relying on it', straightLine: 'straight line', viewSiteDetails: 'View site details', noProfile: 'No profile saved yet. You can create a demo profile.', profileActive: 'Active profile', exactSpecialtyWarning: 'Confirm the exact department before going; service availability may differ by branch.', youtubeSearchLabel: 'Open YouTube tour results ↗', journeyTotalNote: 'Excludes transport, guides and additional tickets not listed.', healthNone: '— No selection —', healthGeneral: 'General health / multiple conditions', healthMobility: 'Mobility / physical disability support', healthVision: 'Blindness / low vision support', healthHearing: 'Deafness / hearing support', healthNeurodiversity: 'Neurodiversity / cognitive-friendly support', healthAutoimmune: 'Autoimmune / immune-system conditions', healthBlood: 'Blood disorders / hematology', healthTransplant: 'Transplant follow-up / specialist care', healthDigestive: 'Digestive / gastrointestinal conditions', healthMental: 'Mental health / low-stimulation visit planning', healthRare: 'Rare / complex conditions', healthDiabetes: 'Diabetes / endocrine care', healthHeart: 'Cardiac / cardiovascular care', healthRespiratory: 'Respiratory / asthma / COPD care', healthKidney: 'Kidney / renal care', healthBreastCancer: 'Breast-cancer specialist service', healthPediatricOncology: 'Pediatric oncology', healthOtherCancer: 'Other cancer-related service', healthNeurology: 'Epilepsy / neurological care', healthAllergy: 'Severe allergy / immunology', healthRehab: 'Rehabilitation / physiotherapy', healthOther: 'Other / prefer not to say', careStatusGeneral: 'Provisional listing — verify', accessMatchNote: 'Compare published facilities to your needs; this is not a personalized access assessment.', ticketUnavailable: 'Check the official source for current price', mapLayerUnavailable: 'Imagery resolution and date can vary by area.', photoFallback: 'Site image is currently unavailable', noProviderMatches: 'No matching directory entries. Select all entries to reset.', copiedFallback: 'Copy the text below manually:'
    },
    ar: {
      brandTag: 'استكشاف متاح للجميع', navExplore: 'استكشف', navMap: 'الخريطة التفاعلية', navCare: 'الرعاية القريبة', navQuest: 'التحديات', navSchools: 'للمدارس', myAccess: 'ملف الإتاحة',
      skip: 'تجاوز إلى المحتوى', heroEyebrow: 'طريقة أكثر وعيًا لاستكشاف التراث', heroTitle: 'التاريخ يستحق أن يكون<br><em>متاحًا للجميع.</em>', heroCopy: 'خطط لزيارة تراثية تراعي احتياجاتك، واكتشف القصص وراء كل مكان، وحوّل الاستكشاف إلى تجربة تفاعلية أكثر شمولًا.', exploreDestinations: 'استكشف الأماكن <span aria-hidden="true">↗</span>', tryQuest: 'جرّب تحديًا في دقيقتين <span aria-hidden="true">▷</span>', heroStat1: '٦ أماكن مميزة', heroStat1Sub: 'نموذج القاهرة والجيزة', heroStat2: 'تخطيط يراعي الإتاحة', heroStat2Sub: 'معلومات مع توضيح حالة التحقق', heroStat3: 'تعلّم أثناء الاستكشاف', heroStat3Sub: 'تحديات تفاعلية قصيرة', scrollExplore: 'مرر لاكتشاف المزيد',
      introEyebrow: 'منصة واحدة واحتياجان', introTitle: 'خطط بثقة.<br><em>واستكشف بفضول.</em>', introCopy: 'يجمع Heritage Quest بين معلومات الإتاحة العملية والتحديات التعليمية القصيرة. ويساعد الزوار على اتخاذ قرارات أفضل، مع جعل اكتشاف الثقافة تجربة نشطة للعائلات والطلاب والمسافرين.', prototypeNote: 'نموذج أولي • القاهرة والجيزة • عربي / إنجليزي', value1Title: 'اعرف قبل الزيارة', value1Copy: 'راجع المرافق المتاحة والعوائق المعروفة ومراجع الأسعار ومصادر المواعيد قبل اختيار المكان.', discoverPlaces: 'اكتشف الأماكن <span>↗</span>', value2Title: 'اجعل الاكتشاف تفاعليًا', value2Copy: 'أجب عن أسئلة قصيرة، واكتشف السياق التاريخي، واجمع شارات رقمية بالوتيرة التي تناسبك.', startQuest: 'ابدأ تحديًا <span>↗</span>', value3Title: 'احتفظ بجهات الاتصال المهمة', value3Copy: 'اطّلع على إدخالات دليل مقدمي الخدمات الطبية القريبين وروابط الاتصال، مع توضيح ما تم التحقق منه وما لم يتم.', viewCare: 'عرض دليل الرعاية <span>↗</span>',
      destinationsEyebrow: 'مجموعة النموذج الأولي', destinationsTitle: 'اختر فصلَك <em>التالي.</em>', destinationsLead: 'ابدأ بستة أماكن في القاهرة والجيزة. يحتوي كل ملف على روابط للمعلومات الرسمية مع تمييز ما يحتاج إلى تأكيد.', featuredSites: 'أماكن مميزة', searchPlaceholder: 'ابحث باسم المكان أو المدينة أو العصر…', filterCityLabel: 'المدينة', allCities: 'كل المناطق', allAccess: 'كل حالات الإتاحة', accessDocumented: 'معلومات إتاحة منشورة', needsCheck: 'يحتاج إلى تأكيد', filterAccessLabel: 'حالة الإتاحة', resetFilters: 'إعادة ضبط', noSites: 'لم يتم العثور على أماكن', noSitesCopy: 'جرّب كلمة أخرى أو أزل عوامل التصفية.', destinationDisclaimer: 'أسعار التذاكر مرجعية وليست عروضًا مباشرة. يجب تأكيد مرافق الإتاحة مع كل جهة قبل السفر.', accessDocumentedBadge: 'معلومات منشورة', accessPartialBadge: 'معلومات جزئية', accessNeedsBadge: 'تحقق قبل الزيارة', adultTicket: 'تذكرة بالغ مرجعية', priceConfirm: 'تحقق من السعر', viewDetails: 'التفاصيل', addToJourney: 'أضف إلى رحلتي', removeFromJourney: 'إزالة', watchTour: 'شاهد الجولة',
      mapEyebrow: 'خطط مع معرفة الموقع', mapTitle: 'خريطة ترى <em>الزيارة كاملة.</em>', mapLead: 'بدّل بين صور الأقمار الصناعية وخريطة الشوارع، ثم اختر موقعًا تراثيًا أو علامة لمقدم خدمة طبية للاطلاع على التفاصيل.', heritageSitesLegend: 'أماكن تراثية', medicalDirectoryLegend: 'دليل طبي', mapLive: 'خريطة تفاعلية', mapRegion: 'القاهرة والجيزة، مصر', satellite: 'قمر صناعي', streets: 'خريطة شوارع', mapLoadingText: 'جارٍ تحميل الخريطة… يلزم اتصال بالإنترنت', mapApproxNote: 'المواقع علامات تقريبية للنموذج. استخدم روابط الجهات الرسمية لتأكيد المداخل.', reportMap: 'أبلغ عن مشكلة بالخريطة ↗', mapHint1Title: 'اختر علامة', mapHint1: 'افتح بطاقة المكان للاطلاع على الاتجاهات وملاحظات الإتاحة والمصادر.', mapHint2Title: 'قارن الرعاية القريبة', mapHint2: 'المسافات المعروضة تقديرات خط مستقيم وليست أوقات قيادة.', mapHint3Title: 'خطط بمسؤولية', mapHint3: 'اتصل بمقدمي الخدمة للتأكد من التخصصات والمواعيد وتجهيزات الإتاحة.', mapError: 'تعذر تحميل الخريطة. تحقق من اتصال الإنترنت أو استخدم روابط الخرائط الخارجية.',
      accessEyebrow: 'زيارتك وفق احتياجاتك', accessTitle: 'خطة تراعي <em>احتياجاتك.</em>', accessLead: 'أنشئ ملف إتاحة تجريبيًا لإبراز المعلومات التي تهمك. لا تحتاج إلى ذكر تشخيص طبي لاستخدام عوامل تصفية الإتاحة.', accessBullet1: 'تفضيلات الحركة والحواس والتواصل', accessBullet2: 'فئات دليل الخدمات الطبية وبيانات الاتصال ذات الصلة', accessBullet3: 'توضيح شفاف للمعلومات المؤكدة وغير المؤكدة', buildAccess: 'إنشاء ملف الإتاحة <span>↗</span>', privacyMini: 'نموذج أولي فقط: تظل اختيارات الملف في جلسة المتصفح؛ لا تدخل بيانات صحية حساسة حقيقية.', sampleProfile: 'مثال لملف إتاحة', profilePreviewTitle: 'ساعدني في التخطيط لزيارة مريحة', mobilitySupport: 'كرسي متحرك / حركة محدودة', restBreaks: 'فترات راحة متكررة', nearbyCare: 'جهات طبية قريبة', placesToExplore: 'أماكن للاستكشاف', directoryEntries: 'إدخالات دليل الرعاية', bilingual: 'ثنائي اللغة', previewDisclaimer: 'مثال تجريبي — ليس تقييمًا طبيًا أو تقييم إتاحة شخصيًا.',
      careEyebrow: 'دعم عملي مع توضيح الحالة', careTitle: 'اعرف بمن <em>تتواصل.</em>', careLead: 'تصفح إدخالات دليل مبدئية قرب الأماكن المختارة. هذه ليست خدمة فرز طبي، ووجود مقدم في الدليل لا يعني أنه مناسب لكل إعاقة أو مرض مزمن.', egyptEmergency: 'إسعاف مصر', officialSource: 'المصدر الرسمي ↗', nearSite: 'بالقرب من المكان', careType: 'فئة الرعاية', allCareTypes: 'كل إدخالات الدليل', generalHospital: 'مستشفى عام', oncology: 'الأورام', pediatricOncology: 'أورام الأطفال', careDistanceNote: 'المسافات تقديرات خط مستقيم.', medicalDisclaimerTitle: 'تحقق قبل الاعتماد على الدليل', medicalDisclaimer: 'يجب تأكيد نطاق خدمات مقدم الرعاية وأرقامه والقسم الدقيق والمواعيد وإمكانية الوصول وتوفر خدمات الأمراض المزمنة مباشرة. في حالات الطوارئ اتصل بخدمات الطوارئ المحلية. الموقع لا يشخّص ولا يوصي بعلاج ولا يحل محل المشورة الطبية المتخصصة.', callProvider: 'اتصال', directions: 'الاتجاهات ↗', providerWebsite: 'الموقع الرسمي ↗', provisionalProvider: 'إدراج مبدئي — تحقق', officialSpecialty: 'تخصص معلن رسميًا', approximateDistance: 'تقريبًا', accessNotVerified: 'إتاحة ذوي الإعاقة غير مؤكدة', straightLine: 'خط مستقيم',
      questEyebrow: 'تعلّم بالتجربة', questTitle: 'في كل زيارة<br><em>قصة خفية.</em>', questLead: 'جرّب تحديًا تعليميًا قصيرًا، وتعلّم كيف تحمي التراث، واجمع شارة رقمية. التجربة مصممة للعائلات والزوار المستقلين والمجموعات المدرسية.', questQuestions: 'أسئلة سريعة', questMinutes: 'دقائق للعب', questBadge: 'شارة رقمية', startQuestNow: 'ابدأ تحدي الحارس <span>↗</span>', questSeal: 'حارس<br>قيد التدريب', curiosityPoints: 'نقاط الفضول', knowledgeBadge: 'تم فتح المعرفة', sampleBadge: 'شارة تجريبية', questArtCaption: 'تجربة قصيرة وشاملة — لا تتطلب تتبع الموقع',
      schoolsEyebrow: 'للمدارس والجهات الثقافية', schoolsTitle: 'حوّل الرحلة المدرسية إلى <em>مغامرة.</em>', schoolsLead: 'العرض التجاري المستقبلي: تحديات تعليمية خاصة بالوجهة ومشاركة المجموعات ونهج أكثر وعيًا بالإتاحة. لا يتصل هذا النموذج بلوحة معلم أو نظام حجز حقيقي بعد.', schoolFeature1: 'اختبار جاهز', schoolFeature2: 'إنجازات رقمية', schoolFeature3: 'روابط معلومات الإتاحة', previewSchoolPack: 'استعرض باقة المدارس <span>↗</span>',
      pricingEyebrow: 'نموذج تجريبي بسيط', pricingTitle: 'استكشف مجانًا. <em>وخطط بوضوح.</em>', pricingLead: 'تُعرض تذاكر الجهات الرسمية بشكل منفصل عن خدمة Heritage Quest المقترحة. الأسعار أدناه أفكار للنموذج وليست عروضًا مباشرة.', visitorPlan: 'للزائر', freePlan: 'استكشف', freeForever: 'نموذج مجاني', freePlanCopy: 'تصفح الأماكن المميزة وملاحظات الإتاحة وروابط الدليل الطبي وجرّب التحدي.', featureBilingual: 'ملفات أماكن بلغتين', featureMap: 'خريطة فضائية وشوارع', featureQuest: 'تحدٍ تعليمي تفاعلي', featureCare: 'تقديرات دليل الرعاية القريبة', startExploring: 'ابدأ الاستكشاف', educationPack: 'باقة تعليمية', concept: 'تصور', schoolPlan: 'للمدارس', quoteBased: 'اطلب عرض سعر', pilotOffer: 'عرض تجريبي — غير متاح للحجز', schoolPlanCopy: 'خدمة مدفوعة مقترحة للمجموعات المدرسية ومنظمي الرحلات التعليمية، وتحتاج إلى اختبار سوقي.', featureQuests: 'تصميم تحديات حسب الوجهة', featureGroup: 'تجربة مشاركة جماعية', featureBadges: 'شارات وشهادات رقمية', featureVenue: 'خيارات محتوى للجهة', requestDemo: 'اطلب عرضًا تجريبيًا', demoCheckoutTitle: 'الدفع وإتمام الحجز تجريبيان فقط', demoCheckoutCopy: 'يُحاكي النموذج ملخص حجز، لكنه لا يسحب أموالًا ولا يحجز تذاكر ولا يخزن بيانات دفع ولا يصدر حجزًا طبيًا أو للنقل.', previewCheckout: 'معاينة الدفع التجريبي <span>↗</span>',
      sourcesEyebrow: 'الثقة جزء من المنتج', sourcesTitle: 'كل معلومة مفيدة<br>تحتاج إلى <em>مصدر.</em>', sourcesLead: 'تعتمد طبقة البحث على صفحات المتاحف والجهات الحكومية الرسمية قدر الإمكان. تظل بعض الأسعار والمواقع الطبية ونقاط الخرائط مبدئية؛ ويعرض النموذج عدم اليقين بدلًا من إخفائه.', lastReviewed: 'تاريخ مراجعة مجموعة البيانات: ١٩ أكتوبر ٢٠٢٦', imageCreditsTitle: 'اعتمادات الصور', imageCreditsCopy: 'ترتبط صور الأماكن بصفحاتها على ويكيميديا كومنز. افتح صفحة كل صورة لمراجعة الترخيص ومتطلبات النسب قبل أي استخدام تجاري.', footerTagline: 'استكشف بطريقتك. عش كل قصة.', backTop: 'إلى الأعلى ↑', footerDemo: 'نموذج فقط · لا يوجد خادم خلفي · لا دفع أو توصيات طبية حقيقية',
      profileModalEyebrow: 'تفضيلات الزيارة الشخصية', profileModalTitle: 'أنشئ ملف الإتاحة', profileModalLead: 'اختر احتياجات الدعم العملية. لا يلزم تشخيص طبي، ولا يستطيع هذا النموذج تقديم مشورة طبية أو ضمان إتاحة موقع.', demoAccount: 'حساب تجريبي', noRealLogin: 'لا يوجد تسجيل دخول حقيقي', createProfileTab: 'إنشاء ملف', signInTab: 'تسجيل الدخول', displayName: 'اسم العرض', emailLabel: 'البريد الإلكتروني (تجريبي)', demoPasswordLabel: 'كلمة مرور تجريبية — لا تُحفظ', accessNeedsHeading: 'تفضيلات الإتاحة والراحة', chooseAny: 'اختر ما ينطبق', needWheelchair: 'كرسي متحرك / مسارات دون درجات', needLimitedWalking: 'مشي محدود / فترات راحة', needVision: 'كفيف / ضعف بصر', needHearing: 'أصم / ضعف سمع', needSensory: 'معلومات مناسبة للحواس أو الإدراك', needStroller: 'إمكانية استخدام عربة أطفال', needRestrooms: 'معلومات دورات المياه المهيأة', needCommunication: 'تواصل / دعم لغة الإشارة', optionalHealthHeading: 'فئة خدمة صحية اختيارية', noDiagnosisRequired: 'لا يلزم تشخيص', healthCategory: 'اختر فئة إذا أردت تصفية دليل مقدمي الرعاية', otherNeedsLabel: 'احتياجات عملية أخرى (اختياري، تجنب التفاصيل الطبية الشخصية)', healthListNote: 'هذه فئات عامة مختارة وليست قائمة شاملة بكل الإعاقات أو الاضطرابات أو الأمراض. يمكنك اختيار أخرى أو عدم تحديد أي فئة.', privacyTitle: 'إشعار الخصوصية للنموذج', privacyBody: 'لا يحتوي هذا النموذج على خادم آمن. استخدم بيانات تجريبية خيالية فقط. تبقى تفضيلات الإتاحة واسم العرض والبريد التجريبي في جلسة المتصفح الحالية فقط. لا تدخل تشخيصات حقيقية أو سجلات طبية أو جهات اتصال للطوارئ أو كلمات مرور تستخدمها في مواقع أخرى أو بيانات بطاقات دفع.', cancel: 'إلغاء', saveDemoProfile: 'حفظ الملف التجريبي <span>↗</span>',
      virtualTour: 'جولة افتراضية', videoCopyrightNote: 'يبقى الفيديو مستضافًا لدى منشئه الأصلي على يوتيوب. راجع شروط منشئ الفيديو والتسميات التوضيحية عند توفرها.', guardianChallenge: 'تحدي الحارس', questModalTitle: 'المستكشف الواعي', questModalLead: 'خمسة أسئلة قصيرة. تعلّم أثناء اللعب.', nextQuestion: 'السؤال التالي →', demoPayment: 'تدفق دفع تجريبي', chooseDemoPayment: 'اختر طريقة دفع تجريبية', demoCard: 'الدفع بالبطاقة', demoCardCopy: 'محاكاة فقط — لا تدخل بيانات بطاقة حقيقية', demoWallet: 'محفظة رقمية', demoWalletCopy: 'لن يتم الاتصال بأي محفظة فعلية', demoAtVenue: 'الدفع في الموقع (تجريبي)', demoAtVenueCopy: 'لن يتم إنشاء حجز فعلي', checkoutTitle: 'راجع رحلتك', checkoutLead: 'هذا تدفق دفع محاكى للنموذج. لن يتم سحب أي مبلغ ولن يتم حجز تذاكر.', noRealPayment: 'لا توجد معالجة دفع فعلية', noRealPaymentCopy: 'لا نطلب أو نخزن رقم بطاقة أو رمز CVV أو بيانات مصرفية.', goBack: 'عودة', confirmDemo: 'تأكيد الحجز التجريبي <span>✓</span>', prototypeFeature: 'ميزة تجريبية', close: 'إغلاق', copyDemoRequest: 'نسخ طلب تجريبي',
      accessFeatureConfirmed: 'مذكور بمصدر رسمي', accessFeatureListed: 'مذكور — يحتاج إلى تأكيد', accessFeatureCaution: 'تنبيه للزائر', accessFeatureUnknown: 'غير مؤكد', officialSite: 'الموقع الرسمي ↗', officialTickets: 'التذاكر الرسمية ↗', accessibilityDetails: 'معلومات الإتاحة', accessStatusHeading: 'حالة الإتاحة', practicalInformation: 'معلومات عملية', ticketReference: 'سعر التذكرة المرجعي', studentReference: 'سعر الطالب المرجعي', fxNote: 'تحويل إرشادي باستخدام', priceSourceNote: 'السعر المنشور بالجنيه هو المرجع؛ تحقق قبل الدفع.', eligibilityNote: 'قد تختلف الأسعار وشروط الإعفاء حسب الجنسية والعمر والمستندات.', nearbyCareTitle: 'جهات طبية قريبة في الدليل', noNearbyCare: 'لا توجد إدخالات مناسبة في مجموعة البيانات الأولية.', sourceAndLinks: 'المصادر والروابط', approxPin: 'إحداثية تقريبية', viewOnMap: 'عرض على الخريطة', viewSiteDetails: 'عرض التفاصيل', tripAdded: 'أُضيف المكان إلى رحلتك التجريبية.', tripRemoved: 'تمت إزالة المكان من الرحلة.', journeyTitle: 'رحلتي التجريبية', journeyEmpty: 'لم تضف أماكن بعد. اختر مكانًا من البطاقات لبناء رحلتك.', journeyPlaces: 'أماكن مختارة', journeyTicketTotal: 'مجموع تذاكر الأماكن', openCheckout: 'معاينة الحجز والدفع', clearJourney: 'مسح الرحلة', infoMissingPrice: 'السعر يحتاج إلى تأكيد', profileSaved: 'تم حفظ ملف الإتاحة في جلسة هذا المتصفح.', profileSignIn: 'تم تسجيل الدخول التجريبي. لا يوجد حساب آمن أو خادم خلفي.', profileRequired: 'أدخل اسمًا تجريبيًا وبريدًا وكلمة مرور تجريبية للمتابعة.', noProfile: 'لم يتم حفظ ملف بعد. يمكنك إنشاء ملف تجريبي.', profileActive: 'ملف نشط', quizCorrect: 'إجابة صحيحة! +100 نقطة.', quizIncorrect: 'ليست الإجابة الصحيحة. راجع التفسير ثم تابع.', quizComplete: 'اكتمل التحدي', quizResultCopy: 'أحرزت {score} من أصل ٥٠٠ نقطة. شكرًا لاستكشافك بمسؤولية.', badgeEarned: 'شارة الحارس الواعي', replayQuest: 'أعد اللعب', finishQuest: 'إنهاء', bookingDemoComplete: 'تم إنشاء ملخص حجز تجريبي فقط: {id}. لا يوجد حجز حقيقي أو دفع.', noTripSelected: 'لم تختر أماكن بعد. أضف وجهة أولًا أو تابع لمعاينة نموذج الرحلة.', demoRequestTitle: 'باقة Heritage Quest التعليمية', demoRequestBody: 'نموذج أولي لخدمة تعليمية للمدارس: تحديات مرتبطة بالوجهة، مشاركة طلابية، شارات رقمية وروابط معلومات الإتاحة. هذا ليس عرض سعر أو حجزًا حقيقيًا.', demoRequestCopied: 'تم تجهيز نص الطلب. يمكنك نسخه وإرساله يدويًا بعد الاتفاق على بريد الفريق.', requestText: 'Hello, I would like to request a demonstration of the Heritage Quest Education Pack. Please share pilot scope, accessibility data methodology, pricing, and implementation requirements.', healthFilterApplied: 'تم تطبيق فئة الرعاية من ملفك على الدليل.', copiedFallback: 'انسخ النص التالي يدويًا:', providersDisclaimer: 'الدليل الأولي محدود ولا يثبت ملاءمة مقدم طبي لحالتك الفردية.', noProviderMatches: 'لا توجد نتائج مطابقة لهذا المرشح. أعد اختيار كل الإدخالات.', exactSpecialtyWarning: 'تأكد من القسم المحدد قبل الذهاب؛ قد لا تكون الخدمة متاحة في هذا الفرع.', youtubeSearchLabel: 'فتح نتائج بحث جولات يوتيوب ↗', journeyTotalNote: 'لا تشمل هذه الحسبة النقل أو الإرشاد أو تذاكر إضافية غير مدرجة.',
      healthNone: '— دون اختيار —', healthGeneral: 'رعاية عامة / حالات متعددة', healthMobility: 'دعم صعوبات الحركة / الإعاقة الحركية', healthVision: 'دعم المكفوفين / ضعف البصر', healthHearing: 'دعم الصم / ضعف السمع', healthNeurodiversity: 'دعم مناسب للاختلافات العصبية والإدراكية', healthAutoimmune: 'أمراض المناعة الذاتية / الجهاز المناعي', healthBlood: 'أمراض الدم / أمراض الدم السريرية', healthTransplant: 'متابعة زراعة الأعضاء / رعاية تخصصية', healthDigestive: 'أمراض الجهاز الهضمي', healthMental: 'الصحة النفسية / تخطيط زيارات منخفضة التحفيز', healthRare: 'أمراض نادرة / حالات معقدة', healthDiabetes: 'السكري / الغدد الصماء', healthHeart: 'القلب والأوعية الدموية', healthRespiratory: 'الجهاز التنفسي / الربو / الانسداد الرئوي', healthKidney: 'الكلى', healthBreastCancer: 'خدمات متخصصة لسرطان الثدي', healthPediatricOncology: 'أورام الأطفال', healthOtherCancer: 'خدمات أخرى مرتبطة بالسرطان', healthNeurology: 'الصرع / الأعصاب', healthAllergy: 'الحساسية الشديدة / المناعة', healthRehab: 'التأهيل / العلاج الطبيعي', healthOther: 'أخرى / أفضل عدم الإفصاح', careStatusGeneral: 'إدراج مبدئي — تحقق من الخدمة', accessMatchNote: 'قارن التسهيلات المنشورة باحتياجاتك؛ لا يمثل هذا تقييمًا شخصيًا للإتاحة.', ticketUnavailable: 'راجع المصدر الرسمي للسعر الحالي', mapLayerUnavailable: 'قد تختلف دقة الصور وتاريخها حسب المنطقة.', photoFallback: 'صورة المكان غير متاحة حاليًا', noCards: 'لا توجد أماكن مطابقة', demoPasswordPlaceholder: 'أي كلمة مرور تجريبية',
    }
  };

  function t(key) {
    if (STRINGS[lang] && STRINGS[lang][key]) return STRINGS[lang][key];
    const element = $(`[data-i18n="${key}"]`);
    return element ? element.dataset.originalHtml || element.innerHTML : key;
  }
  function captureDefaults() {
    $$('[data-i18n]').forEach(el => { if (!el.dataset.originalHtml) el.dataset.originalHtml = el.innerHTML; });
    $$('[data-i18n-placeholder]').forEach(el => { if (!el.dataset.originalPlaceholder) el.dataset.originalPlaceholder = el.getAttribute('placeholder') || ''; });
  }
  function applyTranslations() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    $$('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      el.innerHTML = (lang === 'ar' && STRINGS.ar[key]) ? STRINGS.ar[key] : (el.dataset.originalHtml || el.innerHTML);
    });
    $$('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      el.placeholder = (lang === 'ar' && STRINGS.ar[key]) ? STRINGS.ar[key] : (el.dataset.originalPlaceholder || '');
    });
    $('#languageToggle').textContent = lang === 'en' ? 'العربية' : 'English';
    renderSiteCards();
    renderCareSiteOptions();
    renderProviders();
    renderSources();
    renderCredits();
    updateJourneyBar();
    if (map) renderMapMarkers();
    updateProfileButton();
  }
  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }
  function tx(obj) { return obj && typeof obj === 'object' ? (obj[lang] ?? obj.en ?? '') : (obj ?? ''); }
  function moneyEGP(value) { return value == null ? (lang === 'ar' ? 'تأكيد السعر' : 'Confirm price') : `EGP ${Number(value).toLocaleString('en-US')}`; }
  function moneyUSD(value) { return value == null ? '—' : `≈ $${(Number(value) / RATE).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}`; }
  function sitePrice(site) { return site.priceEgp == null ? tx({en:'Price requires confirmation',ar:'السعر يحتاج إلى تأكيد'}) : `${moneyEGP(site.priceEgp)} · ${moneyUSD(site.priceEgp)}`; }
  function getJourney() { try { return JSON.parse(localStorage.getItem('hq-journey') || '[]').filter(id => DATA.sites.some(s => s.id === id)); } catch (_) { return []; } }
  function setJourney(ids) { localStorage.setItem('hq-journey', JSON.stringify([...new Set(ids)])); updateJourneyBar(); renderSiteCards(); }
  function distanceKm(aLat, aLng, bLat, bLng) {
    const r = 6371, rad = Math.PI / 180;
    const dLat = (bLat - aLat) * rad, dLng = (bLng - aLng) * rad;
    const h = Math.sin(dLat/2)**2 + Math.cos(aLat*rad) * Math.cos(bLat*rad) * Math.sin(dLng/2)**2;
    return 2 * r * Math.asin(Math.sqrt(h));
  }
  function currentProfile() { try { return JSON.parse(sessionStorage.getItem('hq-demo-profile') || 'null'); } catch (_) { return null; } }
  function updateProfileButton() {
    const profile = currentProfile();
    const btn = $('#profileOpen');
    if (!btn) return;
    const label = btn.querySelector('[data-i18n="myAccess"]');
    if (profile && profile.name && label) label.textContent = `${profile.name} · ${lang === 'ar' ? 'ملفي' : 'My profile'}`;
  }
  function showToast(message, isError = false) {
    const region = $('#toastRegion');
    const toast = document.createElement('div');
    toast.className = `toast${isError ? ' error' : ''}`;
    toast.textContent = message;
    region.appendChild(toast);
    window.setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(8px)'; }, 3500);
    window.setTimeout(() => toast.remove(), 3900);
  }
  function openModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.hidden = false;
    document.body.classList.add('modal-open');
    const focusTarget = el.querySelector('button:not([disabled]),input,select,textarea,a[href]');
    if (focusTarget) window.setTimeout(() => focusTarget.focus(), 50);
  }
  function closeModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.hidden = true;
    if (id === 'videoModal') $('#videoWrapper').innerHTML = '';
    if (!$$('.modal-backdrop').some(m => !m.hidden)) document.body.classList.remove('modal-open');
  }
  function accessBadge(site) {
    if (site.accessStatus === 'documented') return `<span class="access-badge">● ${escapeHTML(t('accessDocumentedBadge'))}</span>`;
    if (site.accessStatus === 'documented-partial') return `<span class="access-badge partial">◉ ${escapeHTML(t('accessPartialBadge'))}</span>`;
    return `<span class="access-badge caution">! ${escapeHTML(t('accessNeedsBadge'))}</span>`;
  }
  function renderSiteCards() {
    const query = ($('#siteSearch')?.value || '').trim().toLowerCase();
    const city = $('#cityFilter')?.value || 'all';
    const access = $('#accessFilter')?.value || 'all';
    const journey = getJourney();
    const list = DATA.sites.filter(site => {
      const text = [tx(site.name), tx(site.city), tx(site.type), tx(site.era), tx(site.summary)].join(' ').toLowerCase();
      if (query && !text.includes(query)) return false;
      if (city !== 'all' && site.city.en.toLowerCase().includes(city.toLowerCase()) === false) return false;
      if (access === 'documented' && !['documented','documented-partial'].includes(site.accessStatus)) return false;
      if (access === 'needs-check' && site.accessStatus !== 'needs-check') return false;
      return true;
    });
    $('#siteCount').textContent = String(list.length).padStart(2, '0');
    $('#siteGrid').innerHTML = list.map(site => {
      const title = escapeHTML(tx(site.name));
      const cityLabel = escapeHTML(tx(site.city));
      const summary = escapeHTML(tx(site.summary));
      const priceLine = site.priceEgp == null ? `<strong>${escapeHTML(t('priceConfirm'))}</strong><em>${escapeHTML(tx(site.priceStatus))}</em>` : `<strong>${moneyEGP(site.priceEgp)}</strong><em>${moneyUSD(site.priceEgp)}</em>`;
      const addText = journey.includes(site.id) ? t('removeFromJourney') : t('addToJourney');
      return `<article class="site-card" data-site-card="${site.id}">
        <div class="site-image-wrap"><img loading="lazy" src="${site.photo}" alt="${title}" onerror="this.style.display='none';this.parentElement.classList.add('image-failed')"><span class="site-chip">${escapeHTML(tx(site.type))} · ${escapeHTML(tx(site.era))}</span><div class="site-card-title-overlay"><span>${cityLabel}</span><h3>${title}</h3></div></div>
        <div class="site-card-body"><div class="site-card-meta">${accessBadge(site)}<span>${site.priceEgp == null ? 'EGP / USD' : `${moneyUSD(site.priceEgp)}`}</span></div><p>${summary}</p>
          <div class="site-price-row"><div><small>${escapeHTML(t('adultTicket'))}</small>${priceLine}</div><button class="button button-light button-small" data-action="details" data-site-id="${site.id}" aria-label="${escapeHTML(t('viewDetails'))}: ${title}">↗</button></div>
          <div class="site-card-actions"><button class="button button-primary" data-action="details" data-site-id="${site.id}">${escapeHTML(t('viewDetails'))}</button><button class="button button-outline" data-action="journey" data-site-id="${site.id}">${escapeHTML(addText)}</button><button class="button button-outline" data-action="video" data-site-id="${site.id}">▷ ${escapeHTML(t('watchTour'))}</button></div></div>
      </article>`;
    }).join('');
    $('#siteEmpty').hidden = list.length > 0;
    addImageFallbackStyle();
  }
  function addImageFallbackStyle() {
    if ($('#dynamicImageFallback')) return;
    const style = document.createElement('style'); style.id = 'dynamicImageFallback';
    style.textContent = `.site-image-wrap.image-failed::before{content:'HERITAGE QUEST';position:absolute;inset:0;display:grid;place-items:center;color:#f1dfaf;font-weight:800;letter-spacing:.2em;background:radial-gradient(circle at 50% 40%,#42666a,#12262d);font-size:12px;}.site-image-wrap.image-failed img{display:none}`;
    document.head.appendChild(style);
  }
  function providersNearSite(site, limit = 3) {
    return DATA.providers.map(p => ({...p, distance: distanceKm(site.lat,site.lng,p.lat,p.lng)})).sort((a,b)=>a.distance-b.distance).slice(0,limit);
  }
  function renderSiteDetails(siteId) {
    const site = DATA.sites.find(s => s.id === siteId); if (!site) return;
    const nearby = providersNearSite(site, 3);
    const accessHtml = site.accessibility.map(item => {
      let statusText = item.status === 'confirmed' ? t('accessFeatureConfirmed') : item.status === 'caution' ? t('accessFeatureCaution') : item.status === 'unknown' ? t('accessFeatureUnknown') : t('accessFeatureListed');
      return `<li><span><b>${escapeHTML(tx(item))}</b><br><small>${escapeHTML(statusText)}</small></span></li>`;
    }).join('');
    const priceDetail = site.priceEgp == null ? `<p><b>${escapeHTML(t('infoMissingPrice'))}</b></p>` : `<p><b>${moneyEGP(site.priceEgp)}</b> · <b>${moneyUSD(site.priceEgp)}</b></p><p>${escapeHTML(tx(site.priceStatus))}</p>${site.studentPriceEgp != null ? `<p>${escapeHTML(t('studentReference'))}: <b>${moneyEGP(site.studentPriceEgp)}</b> · ${moneyUSD(site.studentPriceEgp)}</p>` : ''}<p>${escapeHTML(t('fxNote'))} ${RATE.toFixed(2)} EGP/USD (${DATA.meta.currencyRateDate}).</p>`;
    const nearbyHtml = nearby.map(p => `<div class="detail-provider-mini"><b>${escapeHTML(tx(p.name))}</b><span>${p.distance.toFixed(1)} km · ${escapeHTML(tx(p.type))}</span><span>${escapeHTML(tx(p.specialties))}</span><span>${p.status === 'official-specialty' ? escapeHTML(t('officialSpecialty')) : escapeHTML(t('careStatusGeneral'))}</span></div>`).join('');
    const videoButton = site.videoId ? `<button class="button button-light" data-action="video" data-site-id="${site.id}">▷ ${escapeHTML(t('watchTour'))}</button>` : `<a class="button button-light" href="${site.videoSearch}" target="_blank" rel="noopener">▷ ${escapeHTML(t('youtubeSearchLabel'))}</a>`;
    $('#siteModalContent').innerHTML = `
      <div class="site-detail-hero"><img src="${site.photo}" alt="${escapeHTML(tx(site.name))}" onerror="this.style.display='none'"><div class="site-detail-hero-copy"><small>${escapeHTML(tx(site.city))} · ${escapeHTML(tx(site.type))}</small><h2 id="siteModalTitle">${escapeHTML(tx(site.name))}</h2><span>${escapeHTML(tx(site.era))}</span></div></div>
      <div class="site-detail-columns"><div>
        <div class="detail-block"><h3>${escapeHTML(t('practicalInformation'))}</h3><p>${escapeHTML(tx(site.summary))}</p><p style="margin-top:9px"><b>${escapeHTML(tx(site.address))}</b></p><p style="margin-top:8px">${escapeHTML(tx(site.hours))}</p><p style="margin-top:8px;color:#8b651f">${escapeHTML(t('approxPin'))}: ${site.lat.toFixed(4)}, ${site.lng.toFixed(4)}. ${escapeHTML(site.coordinateStatus)}</p></div>
        <div class="detail-block"><h3>${escapeHTML(t('accessibilityDetails'))}</h3><ul class="detail-list">${accessHtml}</ul><p style="margin-top:12px">${escapeHTML(tx(site.disabilityPriceNote))}</p></div>
        <div class="detail-block"><h3>${escapeHTML(t('ticketReference'))}</h3>${priceDetail}<p>${escapeHTML(t('eligibilityNote'))}</p></div>
      </div><div>
        <div class="detail-block"><h3>${escapeHTML(t('nearbyCareTitle'))}</h3><div class="detail-provider-list">${nearbyHtml}</div><p style="margin-top:10px">${escapeHTML(t('providersDisclaimer'))}</p><p style="margin-top:8px">${escapeHTML(t('journeyTotalNote'))}</p></div>
        <div class="detail-block"><h3>${escapeHTML(t('sourceAndLinks'))}</h3><div class="detail-links"><a href="${site.officialUrl}" target="_blank" rel="noopener">${escapeHTML(t('officialSite'))}</a><a href="${site.ticketUrl}" target="_blank" rel="noopener">${escapeHTML(t('officialTickets'))}</a><a href="${site.accessibilityUrl}" target="_blank" rel="noopener">${escapeHTML(t('accessibilityDetails'))} ↗</a><a href="https://www.google.com/maps/dir/?api=1&destination=${site.lat},${site.lng}" target="_blank" rel="noopener">${escapeHTML(t('directions'))}</a>${videoButton}</div></div>
      </div></div>
      <div class="modal-actions"><button class="button button-light" data-close="siteModal">${escapeHTML(t('close'))}</button><button class="button button-primary" data-action="journey" data-site-id="${site.id}">${escapeHTML(getJourney().includes(site.id) ? t('removeFromJourney') : t('addToJourney'))}</button></div>`;
    openModal('siteModal');
  }
  function showVideo(siteId) {
    const site = DATA.sites.find(s => s.id === siteId); if (!site) return;
    $('#videoModalTitle').textContent = `${tx(site.name)} — ${tx(site.videoTitle)}`;
    if (site.videoId) {
      const id = encodeURIComponent(site.videoId);
      $('#videoWrapper').innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0" title="${escapeHTML(tx(site.videoTitle))}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    } else {
      $('#videoWrapper').innerHTML = `<div class="video-search-fallback"><span>▷</span><h3>${escapeHTML(tx(site.name))}</h3><p>${escapeHTML(tx(site.videoTitle))}</p><a class="button button-gold" href="${site.videoSearch}" target="_blank" rel="noopener">${escapeHTML(t('youtubeSearchLabel'))}</a></div>`;
    }
    openModal('videoModal');
  }

  function ensureJourneyBar() {
    if ($('#journeyBar')) return;
    const bar = document.createElement('div'); bar.id = 'journeyBar'; bar.className = 'journey-bar container';
    $('#siteGrid').insertAdjacentElement('afterend', bar);
  }
  function updateJourneyBar() {
    ensureJourneyBar();
    const bar = $('#journeyBar');
    const ids = getJourney();
    if (!ids.length) {
      bar.classList.remove('journey-bar-open');
      bar.innerHTML = `<div class="journey-bar-icon">⌖</div><div class="journey-bar-copy"><strong>${escapeHTML(t('journeyTitle'))}</strong><small>${escapeHTML(t('journeyEmpty'))}</small></div><button class="button button-outline button-small" id="journeyOpenCheckout">${escapeHTML(t('openCheckout'))} ↗</button>`;
    } else {
      const selected = ids.map(id => DATA.sites.find(s => s.id === id)).filter(Boolean);
      const total = selected.reduce((sum,s)=>sum+(s.priceEgp || 0),0);
      bar.classList.add('journey-bar-open');
      bar.innerHTML = `<div class="journey-bar-icon">⌖</div><div class="journey-bar-copy"><strong>${escapeHTML(t('journeyTitle'))} <span class="journey-count">${ids.length} ${escapeHTML(t('journeyPlaces'))}</span></strong><small>${selected.map(s=>escapeHTML(tx(s.name))).join(' · ')}</small><div class="journey-total">${escapeHTML(t('journeyTicketTotal'))}: <b>${moneyEGP(total)}</b> <span>(${moneyUSD(total)})</span></div></div><button class="button button-primary button-small" id="journeyOpenCheckout">${escapeHTML(t('openCheckout'))} ↗</button><button class="journey-clear" id="journeyClear" title="${escapeHTML(t('clearJourney'))}" aria-label="${escapeHTML(t('clearJourney'))}">×</button>`;
    }
    $('#journeyOpenCheckout')?.addEventListener('click', () => openCheckout());
    $('#journeyClear')?.addEventListener('click', () => { setJourney([]); showToast(t('tripRemoved')); });
  }

  function renderCareSiteOptions() {
    const select = $('#careSiteSelect'); if (!select) return;
    const previous = select.value || DATA.sites[0].id;
    select.innerHTML = DATA.sites.map(site => `<option value="${site.id}">${escapeHTML(tx(site.name))}</option>`).join('');
    select.value = DATA.sites.some(s=>s.id===previous) ? previous : DATA.sites[0].id;
  }
  function providerStatus(provider) {
    if (provider.status === 'official-specialty') return `<span class="provider-status official">${escapeHTML(t('officialSpecialty'))}</span>`;
    return `<span class="provider-status">${escapeHTML(t('provisionalProvider'))}</span>`;
  }
  function providerMatchesFilter(provider, filter) {
    if (filter === 'all') return true;
    if (filter === 'general') return provider.careTags.includes('general') || provider.careTags.includes('hospital');
    if (filter === 'oncology') return provider.careTags.includes('oncology') || provider.careTags.includes('cancer-breast') || provider.careTags.includes('pediatric-oncology');
    if (filter === 'pediatric-oncology') return provider.careTags.includes('pediatric-oncology');
    return true;
  }
  function renderProviders() {
    const siteId = $('#careSiteSelect')?.value || DATA.sites[0].id;
    const site = DATA.sites.find(s=>s.id===siteId) || DATA.sites[0];
    const filter = $('#careTypeFilter')?.value || 'all';
    const list = DATA.providers.map(p=>({...p,distance:distanceKm(site.lat,site.lng,p.lat,p.lng)})).filter(p=>providerMatchesFilter(p,filter)).sort((a,b)=>a.distance-b.distance);
    $('#providerGrid').innerHTML = list.map(p => {
      const phone = p.phoneInternational || p.phone;
      const phoneNums = phone.replace(/[^+\d]/g,'');
      const statusCopy = p.status === 'official-specialty' ? t('exactSpecialtyWarning') : t('accessNotVerified');
      const statusTranslation = p.status === 'official-specialty' ? t('officialSpecialty') : t('careStatusGeneral');
      return `<article class="provider-card"><div class="provider-icon">✚</div><div class="provider-main"><div class="provider-head"><div><h3>${escapeHTML(tx(p.name))}</h3><div class="provider-subtitle">${escapeHTML(tx(p.type))}</div></div>${providerStatus(p)}</div><div class="provider-address"><span>⌖</span><span>${escapeHTML(tx(p.address))}</span></div><p class="provider-specialty">${escapeHTML(tx(p.specialties))}</p><p class="provider-caveat">${escapeHTML(tx(p.accessibility))} ${escapeHTML(statusCopy)}</p><div class="provider-contact-row"><a href="tel:${phoneNums}">☎ ${escapeHTML(p.phone)}</a><a href="${p.mapUrl}" target="_blank" rel="noopener">${escapeHTML(t('directions'))}</a><a href="${p.source}" target="_blank" rel="noopener">${escapeHTML(t('officialSource'))}</a><span class="provider-distance">${p.distance.toFixed(1)} km ${escapeHTML(t('straightLine'))}</span></div></div></article>`;
    }).join('');
    if (!list.length) $('#providerGrid').innerHTML = `<div class="empty-state"><h3>${escapeHTML(t('noProviderMatches'))}</h3></div>`;
  }

  function renderSources() {
    $('#sourceList').innerHTML = DATA.sources.slice(0,8).map(source=>`<a class="source-link-card" href="${source.url}" target="_blank" rel="noopener"><span class="source-link-icon">↗</span><span>${escapeHTML(tx(source.title))}</span></a>`).join('');
  }
  function renderCredits() {
    $('#imageCredits').innerHTML = DATA.imageCredits.map(c=>`<a href="${c.url}" target="_blank" rel="noopener" title="${escapeHTML(c.author)}">${escapeHTML(c.title)} ↗</a>`).join('');
  }

  function setupMap() {
    const mapEl = $('#map');
    if (!window.L) {
      $('#mapLoading').innerHTML = `<p>${escapeHTML(t('mapError'))}</p>`;
      return;
    }
    map = L.map(mapEl, { zoomControl: true, scrollWheelZoom: false, preferCanvas: true }).setView([30.023,31.19], 11);
    const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19, attribution: 'Tiles &copy; Esri — Sources: Esri, Maxar, Earthstar Geographics, GIS User Community'
    });
    const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    });
    activeBaseLayer = satellite; satellite.addTo(map);
    mapLayers = { satellite, streets };
    mapLayers.satellite.on('load',()=>{ $('#mapLoading').hidden = true; });
    mapLayers.streets.on('load',()=>{ $('#mapLoading').hidden = true; });
    window.setTimeout(()=>{ $('#mapLoading').hidden = true; }, 6500);
    mapLayers.satellite.on('tileerror',()=>{ $('#mapLoading').hidden = true; });
    mapLayers.streets.on('tileerror',()=>{ $('#mapLoading').hidden = true; });
    mapLayers.satellite.addTo(map);
    mapLayers.satellite.bringToBack();
    mapLayers.markers = L.layerGroup().addTo(map);
    renderMapMarkers();
    $('#satelliteButton').addEventListener('click',()=>switchMapLayer('satellite'));
    $('#streetButton').addEventListener('click',()=>switchMapLayer('streets'));
    setTimeout(()=>map.invalidateSize(),250);
  }
  function switchMapLayer(type) {
    if (!map || !mapLayers) return;
    if (activeBaseLayer) map.removeLayer(activeBaseLayer);
    activeBaseLayer = mapLayers[type]; activeBaseLayer.addTo(map); activeBaseLayer.bringToBack();
    $('#satelliteButton').classList.toggle('active',type==='satellite');
    $('#streetButton').classList.toggle('active',type==='streets');
  }
  function sitePopup(site) {
    return `<div style="min-width:185px"><b>${escapeHTML(tx(site.name))}</b><p style="margin:6px 0 9px;font-size:11px;color:#c7d5d1">${escapeHTML(tx(site.city))} · ${escapeHTML(tx(site.type))}</p><a href="#destinations" data-action="details" data-site-id="${site.id}">${escapeHTML(t('viewSiteDetails'))} ↗</a><p style="margin:7px 0 0;font-size:9px;color:#dab974">${escapeHTML(t('approxPin'))}</p></div>`;
  }
  function providerPopup(p) {
    return `<div style="min-width:190px"><b>${escapeHTML(tx(p.name))}</b><p style="margin:6px 0;font-size:11px;color:#c7d5d1">${escapeHTML(tx(p.type))}</p><p style="margin:6px 0;font-size:10px">${escapeHTML(p.phone)}</p><a href="${p.mapUrl}" target="_blank" rel="noopener">${escapeHTML(t('directions'))}</a><p style="margin:6px 0 0;font-size:9px;color:#dab974">${escapeHTML(t('accessNotVerified'))}</p></div>`;
  }
  function makeMarkerIcon(care = false) {
    return L.divIcon({ className: '', html: `<div class="custom-map-marker ${care?'care':''}"><span>${care?'✚':'✦'}</span></div>`, iconSize:[22,22], iconAnchor:[10,20], popupAnchor:[0,-19] });
  }
  function renderMapMarkers() {
    if (!mapLayers?.markers || !window.L) return;
    mapLayers.markers.clearLayers(); siteMarkers=[]; providerMarkers=[];
    DATA.sites.forEach(site=>{
      const m=L.marker([site.lat,site.lng],{icon:makeMarkerIcon(false),title:tx(site.name),alt:tx(site.name)}).bindPopup(sitePopup(site),{maxWidth:260});
      m.addTo(mapLayers.markers); siteMarkers.push({id:site.id,marker:m});
    });
    DATA.providers.forEach(p=>{
      const m=L.marker([p.lat,p.lng],{icon:makeMarkerIcon(true),title:tx(p.name),alt:tx(p.name)}).bindPopup(providerPopup(p),{maxWidth:270});
      m.addTo(mapLayers.markers); providerMarkers.push({id:p.id,marker:m});
    });
  }
  function focusSiteOnMap(siteId) {
    const site = DATA.sites.find(s=>s.id===siteId); if (!map || !site) return;
    document.querySelector('#map-section').scrollIntoView({behavior:'smooth',block:'start'});
    map.flyTo([site.lat,site.lng],15,{duration:1.1});
    const marker = siteMarkers.find(m=>m.id===siteId); if(marker) setTimeout(()=>marker.marker.openPopup(),1000);
  }

  function openProfile() {
    const p = currentProfile();
    $('#profileName').value = p?.name || '';
    $('#profileEmail').value = p?.email || '';
    $('#profilePassword').value = '';
    $('#healthCategory').value = p?.healthCategory || '';
    $('#otherNeeds').value = p?.otherNeeds || '';
    $$('[name="accessNeed"]');
    const vals = new Set(p?.needs || []);
    $$('#accessNeedsChoices input').forEach(input => input.checked = vals.has(input.value));
    setAuthMode(p ? 'signin' : 'create');
    openModal('profileModal');
  }
  function setAuthMode(mode) {
    authMode = mode;
    $$('[data-auth-mode]').forEach(btn => btn.classList.toggle('active',btn.dataset.authMode===mode));
    $('#displayNameField').hidden = mode === 'signin';
    $('#profileName').required = mode === 'create';
    $('#profileEmail').required = true;
    $('#profilePassword').required = true;
  }
  function saveProfile(event) {
    event.preventDefault();
    const email = $('#profileEmail').value.trim();
    const password = $('#profilePassword').value;
    const name = $('#profileName').value.trim() || email.split('@')[0] || (lang==='ar'?'زائر':'Guest');
    if (!email || !password || (authMode==='create' && !$('#profileName').value.trim())) { showToast(t('profileRequired'),true); return; }
    const needs = $$('#accessNeedsChoices input:checked').map(input=>input.value);
    const profile = { name, email, needs, healthCategory: $('#healthCategory').value, otherNeeds: $('#otherNeeds').value.trim(), mode: authMode, savedAt: new Date().toISOString() };
    sessionStorage.setItem('hq-demo-profile',JSON.stringify(profile));
    $('#profilePassword').value = '';
    updateProfileButton(); closeModal('profileModal'); renderSiteCards();
    showToast(authMode==='signin' ? t('profileSignIn') : t('profileSaved'));
    if (profile.healthCategory) {
      const mapping = {'cancer-breast':'oncology','pediatric-oncology':'pediatric-oncology','cancer-other':'oncology'};
      // Non-specialist categories show general directory leads only, not confirmed specialty matches.
      $('#careTypeFilter').value = mapping[profile.healthCategory] || 'general';
      $('#care-section').scrollIntoView({behavior:'smooth',block:'start'});
      renderProviders();
    }
  }

  function launchQuest() {
    quizIndex=0; quizScore=0; quizLocked=false; window.hqQuizDone=false; currentQuizQuestions=DATA.quiz.slice();
    renderQuizQuestion(); openModal('questModal');
  }
  function renderQuizQuestion() {
    const total=currentQuizQuestions.length;
    $('#quizStepText').textContent=lang==='ar'?`السؤال ${quizIndex+1} من ${total}`:`QUESTION ${quizIndex+1} OF ${total}`;
    $('#quizScoreText').textContent=`${quizScore} XP`;
    $('#quizProgressFill').style.width=`${(quizIndex/total)*100}%`;
    $('#quizFeedback').hidden=true; $('#quizFeedback').classList.remove('bad'); $('#quizNext').disabled=true; $('#quizNext').textContent=quizIndex===total-1?t('finishQuest'):t('nextQuestion');
    const question=currentQuizQuestions[quizIndex];
    $('#quizContent').innerHTML=`<h3 class="quiz-question">${escapeHTML(tx(question.q))}</h3><div class="quiz-choices">${question.choices.map((choice,i)=>`<button type="button" class="quiz-answer" data-quiz-answer="${i}"><span>${String.fromCharCode(65+i)}</span>${escapeHTML(tx(choice))}</button>`).join('')}</div>`;
  }
  function selectQuizAnswer(button) {
    if(quizLocked) return; quizLocked=true;
    const selected=Number(button.dataset.quizAnswer), question=currentQuizQuestions[quizIndex], correct=selected===question.answer;
    if(correct) quizScore+=100;
    $$('.quiz-answer').forEach((b,i)=>{b.disabled=true;if(i===question.answer)b.classList.add('correct');if(i===selected&&!correct)b.classList.add('incorrect');});
    $('#quizScoreText').textContent=`${quizScore} XP`;
    const fb=$('#quizFeedback'); fb.hidden=false; fb.classList.toggle('bad',!correct); fb.innerHTML=`<b>${escapeHTML(t(correct?'quizCorrect':'quizIncorrect'))}</b><br>${escapeHTML(tx(question.explain))}`;
    $('#quizNext').disabled=false;
  }
  function nextQuiz() {
    if (window.hqQuizDone) { window.hqQuizDone = false; closeModal('questModal'); showToast(t('quizComplete')); return; }
    if(quizIndex<currentQuizQuestions.length-1){quizIndex++;quizLocked=false;renderQuizQuestion();return;}
    const success=quizScore>=300;
    const badge=success?`<div class="badge-icon">✦</div>`:`<div class="badge-icon">↻</div>`;
    $('#quizStepText').textContent=t('quizComplete').toUpperCase(); $('#quizProgressFill').style.width='100%';
    $('#quizContent').innerHTML=`<div class="quiz-result">${badge}<h3>${escapeHTML(success?t('badgeEarned'):t('quizComplete'))}</h3><p>${escapeHTML(t('quizResultCopy').replace('{score}',String(quizScore)))}</p><p><strong>${quizScore} / 500 XP</strong></p></div>`;
    $('#quizFeedback').hidden=true; $('#quizNext').disabled=false; $('#quizNext').textContent=t('close');
    if(success) localStorage.setItem('hq-guardian-badge','earned');
    window.hqQuizDone = true;
  }
  function openCheckout() {
    const ids=getJourney();
    const selected=ids.map(id=>DATA.sites.find(s=>s.id===id)).filter(Boolean);
    const total=selected.reduce((sum,s)=>sum+(s.priceEgp||0),0);
    const subtotalLabel=selected.length ? selected.map(s=>`<div class="checkout-line"><span>${escapeHTML(tx(s.name))}</span><strong>${s.priceEgp==null?escapeHTML(t('priceConfirm')):moneyEGP(s.priceEgp)+' · '+moneyUSD(s.priceEgp)}</strong></div>`).join('') : `<div class="checkout-line"><span>${escapeHTML(t('journeyTitle'))}</span><strong>${escapeHTML(t('journeyEmpty'))}</strong></div>`;
    $('#checkoutSummary').innerHTML=`${subtotalLabel}<div class="checkout-line"><span>${escapeHTML(t('journeyPlaces'))}</span><strong>${selected.length}</strong></div><div class="checkout-line checkout-total"><span>${escapeHTML(t('journeyTicketTotal'))}</span><strong>${moneyEGP(total)} · ${moneyUSD(total)}</strong></div><div class="checkout-line"><span>${escapeHTML(t('fxNote'))} ${RATE.toFixed(2)} EGP/USD</span><strong>${escapeHTML(t('journeyTotalNote'))}</strong></div>`;
    openModal('checkoutModal');
  }
  function confirmDemoCheckout() {
    const paymentMethod = document.querySelector('input[name="demoPaymentMethod"]:checked')?.value || 'card';
    const ids=getJourney();
    const ref=`HQ-DEMO-${new Date().toISOString().slice(2,10).replace(/-/g,'')}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
    let history=[];try{history=JSON.parse(localStorage.getItem('hq-demo-bookings')||'[]')}catch(_){}
    history.unshift({reference:ref,siteIds:ids,createdAt:new Date().toISOString(),paymentMethod,demo:true});
    localStorage.setItem('hq-demo-bookings',JSON.stringify(history.slice(0,10)));
    closeModal('checkoutModal'); showToast(t('bookingDemoComplete').replace('{id}',ref));
  }
  function openInfoModal(type) {
    activeInfoAction=type;
    const title = type==='school' ? t('demoRequestTitle') : type==='quote' ? (lang==='ar'?'طلب عرض تجريبي':'Request a school demo') : (lang==='ar'?'نموذج طلب تواصل':'Demo contact request');
    $('#infoModalTitle').textContent=title;
    const body = type==='school' ? t('demoRequestBody') : (lang==='ar'?'يمكن لفريقكم استخدام هذا النموذج لطلب عرض توضيحي. لا يوجد إرسال عبر الخادم؛ سيتم تجهيز نص يمكن نسخه يدويًا.':'Use this prototype to prepare a request for a product demonstration. There is no server-side form submission; you can copy the request text manually.');
    $('#infoModalBody').innerHTML=`<p>${escapeHTML(body)}</p><div class="info-modal-highlight">${escapeHTML(lang==='ar'?'ميزة النموذج: رابط المعلومات والمحتوى وخطوات مشاركة الطلاب. لا توجد لوحة مدارس أو تكامل حجز فعلي بعد.':'Prototype scope: sourced information, destination-specific content and a student participation flow. A real school dashboard and booking integration are not connected yet.')}</div>`;
    openModal('infoModal');
  }
  async function copyDemoRequest() {
    const text = lang === 'ar' ? 'مرحبًا، أود طلب عرض توضيحي لباقة Heritage Quest التعليمية. يرجى إرسال نطاق التجربة والأسعار ومتطلبات التنفيذ ومنهجية التحقق من بيانات الإتاحة.' : STRINGS.en.requestText;
    try { await navigator.clipboard.writeText(text); showToast(t('demoRequestCopied')); }
    catch (_) { $('#infoModalBody').insertAdjacentHTML('beforeend',`<textarea style="width:100%;margin-top:12px" rows="4" readonly>${escapeHTML(text)}</textarea><p>${escapeHTML(t('copiedFallback'))}</p>`); }
  }

  function handleActionClick(event) {
    const target=event.target.closest('[data-action]'); if(!target) return;
    const action=target.dataset.action, siteId=target.dataset.siteId;
    if(action==='details') { event.preventDefault(); renderSiteDetails(siteId); }
    if(action==='video') { event.preventDefault(); showVideo(siteId); }
    if(action==='journey') {
      event.preventDefault();
      const ids=getJourney();
      if(ids.includes(siteId)) { setJourney(ids.filter(id=>id!==siteId)); showToast(t('tripRemoved')); }
      else { setJourney([...ids,siteId]); showToast(t('tripAdded')); }
      if(!$('#siteModal').hidden && $('#siteModalContent').innerHTML.includes(siteId)) renderSiteDetails(siteId);
    }
  }
  function bindEvents() {
    $('#languageToggle').addEventListener('click',()=>{lang=lang==='en'?'ar':'en';sessionStorage.setItem('hq-language',lang);applyTranslations();});
    $('#contrastToggle').addEventListener('click',()=>{document.body.classList.toggle('high-contrast');showToast(document.body.classList.contains('high-contrast')?(lang==='ar'?'تم تفعيل التباين العالي':'High-contrast mode enabled'):(lang==='ar'?'تم إيقاف التباين العالي':'High-contrast mode disabled'));});
    $('#mobileMenuToggle').addEventListener('click',()=>{const nav=$('#mobileNav'),open=nav.hidden;nav.hidden=!open;$('#mobileMenuToggle').setAttribute('aria-expanded',String(open));$('#mobileMenuToggle').textContent=open?'×':'☰';});
    $$('#mobileNav a').forEach(a=>a.addEventListener('click',()=>{$('#mobileNav').hidden=true;$('#mobileMenuToggle').setAttribute('aria-expanded','false');$('#mobileMenuToggle').textContent='☰';}));
    $('#profileOpen').addEventListener('click',openProfile); $('#accessBuildButton').addEventListener('click',openProfile);
    $$('[data-close]').forEach(btn=>btn.addEventListener('click',()=>closeModal(btn.dataset.close)));
    $$('.modal-backdrop').forEach(backdrop=>backdrop.addEventListener('click',e=>{if(e.target===backdrop)closeModal(backdrop.id);}));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')$$('.modal-backdrop').filter(m=>!m.hidden).forEach(m=>closeModal(m.id));});
    $('#profileForm').addEventListener('submit',saveProfile);
    $$('[data-auth-mode]').forEach(btn=>btn.addEventListener('click',()=>setAuthMode(btn.dataset.authMode)));
    ['siteSearch','cityFilter','accessFilter'].forEach(id=>$('#'+id).addEventListener(id==='siteSearch'?'input':'change',renderSiteCards));
    $('#resetFilters').addEventListener('click',()=>{$('#siteSearch').value='';$('#cityFilter').value='all';$('#accessFilter').value='all';renderSiteCards();});
    $('#careSiteSelect').addEventListener('change',()=>{renderProviders();if(map){const site=DATA.sites.find(s=>s.id===$('#careSiteSelect').value);if(site)map.flyTo([site.lat,site.lng],13,{duration:.7});}});
    $('#careTypeFilter').addEventListener('change',renderProviders);
    $('#startQuestButton').addEventListener('click',launchQuest); $('#heroQuestButton').addEventListener('click',launchQuest);
    $('#quizNext').addEventListener('click',()=>{ if ($('#quizContent .quiz-result')) { window.hqQuizDone = false; closeModal('questModal'); } else nextQuiz(); });
    $('#quizContent').addEventListener('click',e=>{const b=e.target.closest('[data-quiz-answer]');if(b)selectQuizAnswer(b);});
    $('#checkoutButton').addEventListener('click',openCheckout); $('#confirmDemoPayment').addEventListener('click',confirmDemoCheckout);
    $('#schoolPackButton').addEventListener('click',()=>openInfoModal('school')); $('#quoteButton').addEventListener('click',()=>openInfoModal('quote')); $('#infoModalAction').addEventListener('click',copyDemoRequest);
    $('#freePlanButton').addEventListener('click',()=>document.querySelector('#destinations').scrollIntoView({behavior:'smooth'}));
    document.addEventListener('click',handleActionClick);
    window.addEventListener('resize',()=>{if(map) map.invalidateSize();});
  }

  function init() {
    captureDefaults();
    ensureJourneyBar();
    renderCareSiteOptions();
    bindEvents();
    applyTranslations();
    setupMap();
    updateJourneyBar();
    addImageFallbackStyle();
  }
  document.addEventListener('DOMContentLoaded',init);
})();

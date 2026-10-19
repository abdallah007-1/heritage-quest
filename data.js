/*
  HERITAGE QUEST — prototype data
  Research reviewed: 19 October 2026.
  IMPORTANT: map coordinates are approximate prototype pins; prices and opening hours can change.
  Re-verify source pages directly before any public/commercial launch.
  Photo URLs point to Wikimedia Commons file pages via Special:FilePath. See imageCredits below.
*/
window.HQ_DATA = {
  meta: {
    name: "HERITAGE QUEST",
    currencyRate: 53.54,
    currencyRateDate: "2026-10-19",
    reviewDate: "2026-10-19",
    emergencyNumber: "123",
    emergencySource: "https://eao.gov.eg/"
  },
  sites: [
    {
      id: "SITE-GEM",
      name: { en: "Grand Egyptian Museum", ar: "المتحف المصري الكبير" },
      type: { en: "Museum", ar: "متحف" }, city: { en: "Giza", ar: "الجيزة" },
      era: { en: "Ancient Egypt", ar: "مصر القديمة" },
      lat: 30.0131, lng: 31.1125, coordinateStatus: "Approximate prototype pin — verify official entrance before relying on directions.",
      address: { en: "El Remayah Square, Cairo–Alexandria Desert Road, Giza, Egypt", ar: "ميدان الرماية، طريق القاهرة–الإسكندرية الصحراوي، الجيزة، مصر" },
      summary: {
        en: "A major museum devoted to ancient Egyptian civilization, located near the Giza Pyramids. The museum publishes a dedicated accessibility guide.",
        ar: "متحف رئيسي مخصص للحضارة المصرية القديمة بالقرب من أهرامات الجيزة. ينشر المتحف دليلًا مخصصًا لإتاحة الزيارة."
      },
      hours: { en: "Official site currently lists daily opening; check the live visitor page before travel.", ar: "يعرض الموقع الرسمي مواعيد الزيارة؛ يرجى مراجعة صفحة الزوار قبل السفر." },
      priceEgp: 1590, studentPriceEgp: 800, priceLabel: { en: "Arab / other-nationality adult", ar: "بالغ من العرب / الجنسيات الأخرى" },
      priceStatus: { en: "Official ticket portal listing; exchange conversion is illustrative.", ar: "السعر منشور ببوابة التذاكر الرسمية؛ تحويل الدولار تقريبي." },
      disabilityPriceNote: { en: "The official FAQ lists visitors with disabilities among exempt groups. Confirm documentation and eligibility directly with GEM; do not assume every nationality has identical requirements.", ar: "تذكر الأسئلة الشائعة الرسمية ذوي الإعاقة ضمن الفئات المعفاة. يرجى تأكيد المستندات والأهلية مباشرة مع المتحف؛ لا تفترض تطابق الشروط لكل الجنسيات." },
      accessStatus: "documented",
      accessibility: [
        { en: "Wheelchairs are provided", ar: "توفير كراسٍ متحركة", status: "confirmed" },
        { en: "Ramps, lifts and wide pathways", ar: "منحدرات ومصاعد وممرات واسعة", status: "confirmed" },
        { en: "Accessible restrooms and rest seating", ar: "دورات مياه مهيأة ومقاعد للراحة", status: "confirmed" },
        { en: "Golf carts and tactile/Braille replica", ar: "عربات جولف ونموذج ملموس/برايل", status: "confirmed" }
      ],
      photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Grand%20Egyptian%20Museum%20Facade.jpg?width=1400",
      photoPage: "https://commons.wikimedia.org/wiki/File:Grand_Egyptian_Museum_Facade.jpg",
      videoId: "XMw8oiX4LMY", videoTitle: { en: "Grand Egyptian Museum — 4K walking tour", ar: "جولة داخل المتحف المصري الكبير — 4K" },
      officialUrl: "https://gem.eg/", accessibilityUrl: "https://gem.eg/visit/accessibility/", ticketUrl: "https://tickets.gem.eg/en/AdmissionTkt",
      historyUrl: "https://gem.eg/en/faqs", sourceLabel: "GEM official website and ticket portal"
    },
    {
      id: "SITE-GIZA-PLATEAU",
      name: { en: "Giza Plateau & Pyramids", ar: "هضبة الجيزة والأهرامات" },
      type: { en: "Archaeological site", ar: "موقع أثري" }, city: { en: "Giza", ar: "الجيزة" },
      era: { en: "Old Kingdom", ar: "الدولة القديمة" },
      lat: 29.9792, lng: 31.1342, coordinateStatus: "Approximate plateau pin — exact gates and routes must be checked locally.",
      address: { en: "Giza Plateau, Al Haram, Giza Governorate, Egypt", ar: "هضبة الجيزة، الهرم، محافظة الجيزة، مصر" },
      summary: {
        en: "The pyramid complex includes the pyramids of Khufu, Khafre and Menkaure, related monuments and the Great Sphinx.",
        ar: "يضم مجمع الأهرامات أهرامات خوفو وخفرع ومنقرع ومعالم مرتبطة بها وأبو الهول العظيم."
      },
      hours: { en: "The Ministry listing shows 08:00–16:00; verify season, gate, and ticket cut-off before travel.", ar: "يعرض موقع الوزارة مواعيد ٨:٠٠ صباحًا إلى ٤:٠٠ مساءً؛ تأكد من الموسم والبوابة وآخر موعد للتذاكر." },
      priceEgp: 700, studentPriceEgp: 350, priceLabel: { en: "Foreign visitor — plateau area entry", ar: "زائر أجنبي — دخول منطقة الهضبة" },
      priceStatus: { en: "Official Ministry listing. Area entry excludes separate monument/interior tickets.", ar: "السعر منشور من الوزارة. تذكرة المنطقة لا تشمل تذاكر دخول بعض الأهرامات والمقابر." },
      disabilityPriceNote: { en: "The Ministry page lists free-entry policies for Egyptian visitors with special needs. Confirm current rules and documents; do not generalize this to all international visitors.", ar: "تذكر صفحة الوزارة إعفاءات للمصريين من ذوي الاحتياجات الخاصة. تأكد من القواعد والمستندات الحالية ولا تعممها على جميع الزوار الدوليين." },
      accessStatus: "needs-check",
      accessibility: [
        { en: "Outdoor terrain, sand, slopes and long distances may be challenging", ar: "قد تمثل الرمال والمنحدرات والمسافات الطويلة تحديات", status: "caution" },
        { en: "Step-free route, accessible transport and restroom details need direct confirmation", ar: "يجب التأكد مباشرة من المسارات دون درجات والنقل ودورات المياه المهيأة", status: "unknown" },
        { en: "Contact the site before travel to discuss individual access requirements", ar: "تواصل مع الموقع قبل الزيارة لمناقشة احتياجات الإتاحة الفردية", status: "unknown" }
      ],
      photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Great%20Pyramid%20of%20Giza.jpg?width=1400",
      photoPage: "https://commons.wikimedia.org/wiki/File:Great_Pyramid_of_Giza.jpg",
      videoId: "75eBxuKTcaU", videoTitle: { en: "Giza Pyramids — walking tour in 4K", ar: "جولة مشي في أهرامات الجيزة — 4K" },
      officialUrl: "https://egymonuments.gov.eg/en/archaeological-sites/giza-plateau/", accessibilityUrl: "https://egymonuments.gov.eg/en/archaeological-sites/giza-plateau/", ticketUrl: "https://egymonuments.gov.eg/en/archaeological-sites/giza-plateau/",
      historyUrl: "https://egymonuments.gov.eg/en/archaeological-sites/giza-plateau/", sourceLabel: "Egyptian Ministry of Tourism and Antiquities"
    },
    {
      id: "SITE-EGYPTIAN-MUSEUM",
      name: { en: "The Egyptian Museum (Tahrir)", ar: "المتحف المصري بالتحرير" },
      type: { en: "Museum", ar: "متحف" }, city: { en: "Cairo", ar: "القاهرة" },
      era: { en: "Predynastic to Greco-Roman", ar: "ما قبل الأسرات إلى العصرين اليوناني والروماني" },
      lat: 30.0478, lng: 31.2336, coordinateStatus: "Approximate building pin; verify entrance and road access.",
      address: { en: "Tahrir Square, Downtown Cairo, Egypt", ar: "ميدان التحرير، وسط القاهرة، مصر" },
      summary: {
        en: "Opened in 1902, this historic museum holds collections spanning early Egyptian history through the Greco-Roman period.",
        ar: "افتُتح هذا المتحف التاريخي عام ١٩٠٢ ويضم مجموعات تمتد من بدايات التاريخ المصري حتى العصر اليوناني الروماني."
      },
      hours: { en: "Ministry listing: 09:00–17:00; last ticket listed at 16:00. Verify before visiting.", ar: "يعرض موقع الوزارة مواعيد ٩:٠٠ صباحًا إلى ٥:٠٠ مساءً وآخر تذكرة ٤:٠٠ عصرًا؛ تأكد قبل الزيارة." },
      priceEgp: 550, studentPriceEgp: 275, priceLabel: { en: "Foreigner adult", ar: "بالغ أجنبي" },
      priceStatus: { en: "Official Ministry listing; confirm eligibility for student and exemption categories.", ar: "السعر منشور لدى الوزارة؛ تأكد من شروط فئة الطلاب والإعفاءات." },
      disabilityPriceNote: { en: "The Ministry page lists several visitor facilities and free-entry policies for Egyptian visitors with special needs. Confirm current eligibility and access conditions directly.", ar: "تذكر صفحة الوزارة مرافق متعددة وسياسة إعفاء لبعض الزوار المصريين من ذوي الاحتياجات الخاصة. تحقق من الأهلية وشروط الإتاحة مباشرة." },
      accessStatus: "documented-partial",
      accessibility: [
        { en: "Ministry page lists a ramped entrance and elevator", ar: "تذكر صفحة الوزارة مدخلًا بمنحدر ومصعدًا", status: "listed" },
        { en: "Braille labels, toilet and sign-language service icons are listed", ar: "تظهر رموز لبطاقات برايل ودورات المياه وخدمة لغة الإشارة", status: "listed" },
        { en: "Confirm exact accessible route, restroom details and service availability before visiting", ar: "تأكد من المسار المهيأ وتفاصيل دورات المياه وتوفر الخدمة قبل الزيارة", status: "unknown" }
      ],
      photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Kairo%20%C3%84gyptisches%20Museum%2004.jpg?width=1400",
      photoPage: "https://commons.wikimedia.org/wiki/File:Kairo_%C3%84gyptisches_Museum_04.jpg",
      videoId: "A-EbGwXTMlE", videoTitle: { en: "Egyptian Museum Cairo — full 4K tour", ar: "جولة كاملة في المتحف المصري بالقاهرة — 4K" },
      officialUrl: "https://egymonuments.gov.eg/en/museums/egyptian-museum", accessibilityUrl: "https://egymonuments.gov.eg/en/museums/egyptian-museum", ticketUrl: "https://egymonuments.gov.eg/en/museums/egyptian-museum",
      historyUrl: "https://egymonuments.gov.eg/en/museums/egyptian-museum", sourceLabel: "Egyptian Ministry of Tourism and Antiquities"
    },
    {
      id: "SITE-NMEC",
      name: { en: "National Museum of Egyptian Civilization", ar: "المتحف القومي للحضارة المصرية" },
      type: { en: "Museum", ar: "متحف" }, city: { en: "Fustat, Cairo", ar: "الفسطاط، القاهرة" },
      era: { en: "Egypt through the ages", ar: "الحضارة المصرية عبر العصور" },
      lat: 30.0062, lng: 31.2481, coordinateStatus: "Approximate museum pin; verify entrance, route and current map listing.",
      address: { en: "El-Fustat Road, Ein El-Sira, Cairo, Egypt", ar: "طريق الفسطاط، عين الصيرة، القاهرة، مصر" },
      summary: {
        en: "A museum presenting Egyptian civilization across multiple periods, including the Royal Mummies Hall.",
        ar: "متحف يعرض الحضارة المصرية عبر عصور متعددة، بما في ذلك قاعة المومياوات الملكية."
      },
      hours: { en: "Check the museum and Ministry visitor pages for current hours and special gallery schedules.", ar: "راجع موقع المتحف والوزارة لمعرفة المواعيد الحالية ومواعيد القاعات الخاصة." },
      priceEgp: 550, studentPriceEgp: 300, priceLabel: { en: "Foreign visitor adult (reference listing)", ar: "بالغ أجنبي (سعر مرجعي منشور)" },
      priceStatus: { en: "Reference price from Ministry listing; verify the live ticket portal before publishing or buying.", ar: "سعر مرجعي من صفحة الوزارة؛ تحقق من بوابة التذاكر الحالية قبل النشر أو الشراء." },
      disabilityPriceNote: { en: "Confirm disability-specific ticket exemptions, documentation and assistance directly with NMEC before making a trip.", ar: "تأكد من إعفاءات تذاكر ذوي الإعاقة والمستندات والمساعدة مباشرة من المتحف قبل الزيارة." },
      accessStatus: "documented-partial",
      accessibility: [
        { en: "Published information describes wheelchair support and accessible parking", ar: "تصف المعلومات المنشورة دعم الكراسي المتحركة ومواقف مهيأة", status: "listed" },
        { en: "Elevator access to exhibits and Braille resources are listed", ar: "يُذكر الوصول بالمصعد إلى المعروضات وموارد برايل", status: "listed" },
        { en: "Confirm current availability, route details and any advance-booking needs", ar: "تأكد من توفر الخدمات وتفاصيل المسار وأي حجز مسبق مطلوب", status: "unknown" }
      ],
      photo: "https://commons.wikimedia.org/wiki/Special:FilePath/National%20Museum%20of%20Egyptian%20Civilization%20%28NMEC%29%20in%20Cairo%2C%20Egypt%2007.jpg?width=1400",
      photoPage: "https://commons.wikimedia.org/wiki/File:National_Museum_of_Egyptian_Civilization_(NMEC)_in_Cairo,_Egypt_07.jpg",
      videoId: "Jf-p3Ju4hIw", videoTitle: { en: "NMEC Cairo — museum tour and Royal Mummies Hall", ar: "جولة في متحف الحضارة وقاعة المومياوات الملكية" },
      officialUrl: "https://nmec.gov.eg/", accessibilityUrl: "https://egymonuments.gov.eg/en/museums/national-museum-of-egyptian-civilization-nmec", ticketUrl: "https://egymonuments.gov.eg/en/museums/national-museum-of-egyptian-civilization-nmec",
      historyUrl: "https://egymonuments.gov.eg/en/museums/national-museum-of-egyptian-civilization-nmec", sourceLabel: "NMEC and Egyptian Ministry of Tourism and Antiquities"
    },
    {
      id: "SITE-ISLAMIC-ART",
      name: { en: "Museum of Islamic Art", ar: "متحف الفن الإسلامي" },
      type: { en: "Museum", ar: "متحف" }, city: { en: "Bab Al-Khalq, Cairo", ar: "باب الخلق، القاهرة" },
      era: { en: "Islamic art and material culture", ar: "الفنون والثقافة المادية الإسلامية" },
      lat: 30.0444, lng: 31.2550, coordinateStatus: "Approximate museum pin; confirm exact visitor entrance.",
      address: { en: "Port Said Street, Bab Al-Khalq, Cairo, Egypt", ar: "شارع بورسعيد، باب الخلق، القاهرة، مصر" },
      summary: {
        en: "A collection of Islamic art including manuscripts, ceramics, metalwork, textiles and architectural elements.",
        ar: "مجموعة من الفنون الإسلامية تشمل المخطوطات والخزف والأعمال المعدنية والمنسوجات والعناصر المعمارية."
      },
      hours: { en: "Verify opening hours and ticket cut-off on the live Ministry page.", ar: "تحقق من مواعيد الزيارة وآخر موعد للتذاكر على صفحة الوزارة الحالية." },
      priceEgp: 340, studentPriceEgp: 170, priceLabel: { en: "Foreigner adult", ar: "بالغ أجنبي" },
      priceStatus: { en: "Official Ministry listing; confirm current price and student eligibility.", ar: "السعر منشور لدى الوزارة؛ تأكد من السعر الحالي وشروط الطلاب." },
      disabilityPriceNote: { en: "The Ministry page describes free-entry policies for some Egyptian visitor categories. International eligibility and documentation must be confirmed directly.", ar: "تذكر صفحة الوزارة إعفاءات لبعض فئات الزوار المصريين. يجب تأكيد أهلية الزوار الدوليين ومستنداتهم مباشرة." },
      accessStatus: "documented-partial",
      accessibility: [
        { en: "Accessibility features are listed on the Ministry portal; exact facility detail requires reconfirmation", ar: "تظهر خدمات إتاحة على بوابة الوزارة؛ يلزم إعادة تأكيد تفاصيل المرافق", status: "listed" },
        { en: "Confirm step-free routes, lift access and accessible restroom availability directly", ar: "تأكد مباشرة من المسارات دون درجات والمصاعد ودورات المياه المهيأة", status: "unknown" }
      ],
      photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Museum%20of%20Islamic%20Art%20Cairo%20DSCF7680.jpg?width=1400",
      photoPage: "https://commons.wikimedia.org/wiki/File:Museum_of_Islamic_Art_Cairo_DSCF7680.jpg",
      videoId: null, videoSearch: "https://www.youtube.com/results?search_query=Museum+of+Islamic+Art+Cairo+virtual+tour", videoTitle: { en: "Find a Museum of Islamic Art tour on YouTube", ar: "شاهد جولات متحف الفن الإسلامي على يوتيوب" },
      officialUrl: "https://egymonuments.gov.eg/museums/museum-of-islamic-art", accessibilityUrl: "https://egymonuments.gov.eg/museums/museum-of-islamic-art", ticketUrl: "https://egymonuments.gov.eg/museums/museum-of-islamic-art",
      historyUrl: "https://egymonuments.gov.eg/museums/museum-of-islamic-art", sourceLabel: "Egyptian Ministry of Tourism and Antiquities"
    },
    {
      id: "SITE-COPTIC-MUSEUM",
      name: { en: "The Coptic Museum", ar: "المتحف القبطي" },
      type: { en: "Museum", ar: "متحف" }, city: { en: "Old Cairo", ar: "مصر القديمة" },
      era: { en: "Coptic heritage", ar: "التراث القبطي" },
      lat: 30.0062, lng: 31.2303, coordinateStatus: "Approximate pin in Old Cairo; verify entrance and route.",
      address: { en: "Mar Girgis, Old Cairo, Cairo Governorate, Egypt", ar: "مار جرجس، مصر القديمة، محافظة القاهرة، مصر" },
      summary: {
        en: "A museum of Coptic heritage, including manuscripts, icons, carved wood, textiles and objects from historic churches and monasteries.",
        ar: "متحف للتراث القبطي يشمل مخطوطات وأيقونات وأعمالًا خشبية ومنسوجات وقطعًا من كنائس وأديرة تاريخية."
      },
      hours: { en: "Official Ministry sub-pages show different last-entry times; verify current hours before visiting.", ar: "تعرض صفحات الوزارة مواعيد مختلفة لآخر دخول؛ تحقق من المواعيد الحالية قبل الزيارة." },
      priceEgp: null, studentPriceEgp: null, priceLabel: { en: "Price requires confirmation", ar: "السعر يحتاج إلى تأكيد" },
      priceStatus: { en: "Official Ministry pages currently show conflicting foreigner ticket prices. Contact the museum or confirm at its official ticket page before publication.", ar: "تعرض صفحات رسمية للوزارة أسعارًا مختلفة لتذاكر الأجانب. تواصل مع المتحف أو تحقق من صفحة التذاكر الرسمية قبل النشر." },
      disabilityPriceNote: { en: "The Ministry page lists exemption policies for certain Egyptian groups; confirm eligibility and the current foreign visitor price directly.", ar: "تذكر صفحة الوزارة سياسة إعفاء لبعض الفئات المصرية؛ تأكد من الأهلية والسعر الحالي للزائر الأجنبي مباشرة." },
      accessStatus: "needs-check",
      accessibility: [
        { en: "Some sources list a ramped entrance and elevator; independent/current confirmation is needed", ar: "تذكر بعض المصادر مدخلًا بمنحدر ومصعدًا؛ يلزم تأكيد حديث ومستقل", status: "listed" },
        { en: "Confirm accessible route, restroom facilities and assistance before travel", ar: "تأكد من المسار ودورات المياه والمساعدة قبل الزيارة", status: "unknown" }
      ],
      photo: "https://commons.wikimedia.org/wiki/Special:FilePath/CairoCoptMuseum.jpg?width=1400",
      photoPage: "https://commons.wikimedia.org/wiki/File:CairoCoptMuseum.jpg",
      videoId: null, videoSearch: "https://www.youtube.com/results?search_query=Coptic+Museum+Cairo+tour", videoTitle: { en: "Find a Coptic Museum tour on YouTube", ar: "شاهد جولات المتحف القبطي على يوتيوب" },
      officialUrl: "https://egymonuments.gov.eg/en/museums/the-coptic-museum", accessibilityUrl: "https://egymonuments.gov.eg/en/subportals-group/coptic-museum/coptic-museum-1-visit", ticketUrl: "https://egymonuments.gov.eg/en/museums/the-coptic-museum",
      historyUrl: "https://egymonuments.gov.eg/en/museums/the-coptic-museum", sourceLabel: "Egyptian Ministry of Tourism and Antiquities"
    }
  ],
  providers: [
    {
      id: "MED-BAHEYA-HARAM", name: { en: "Baheya Haram Center", ar: "مركز بهية — فرع الهرم" },
      type: { en: "Specialist breast-cancer hospital / center", ar: "مركز/مستشفى متخصص في علاج سرطان الثدي" },
      lat: 29.9978, lng: 31.1672, coordsStatus: { en: "Approximate pin; use provider map link to confirm exact entrance.", ar: "إحداثية تقريبية؛ استخدم رابط خريطة مقدم الخدمة لتأكيد المدخل." },
      address: { en: "4 Allouba Street, off El Haram Street, next to Dary, Giza, Egypt", ar: "٤ شارع العلاوبة، متفرع من شارع الهرم، بجوار داري، الجيزة، مصر" },
      phone: "16602", phoneInternational: "+20 2 2535 1500", hours: { en: "Official page lists 09:00–21:00; call to confirm appointment hours.", ar: "تعرض الصفحة الرسمية مواعيد ٩ صباحًا إلى ٩ مساءً؛ اتصل لتأكيد مواعيد العيادات." },
      specialties: { en: "Breast-cancer early detection and treatment; oncology-related services listed by the provider. Not a general emergency provider.", ar: "الكشف المبكر عن سرطان الثدي وعلاجه وخدمات مرتبطة بالأورام حسب ما يعلنه مقدم الخدمة. ليس بديلًا عن الطوارئ العامة." },
      careTags: ["cancer-breast", "oncology"], status: "official-specialty", accessibility: { en: "Wheelchair access and disability accommodations not confirmed in the source used for this prototype; call before travel.", ar: "لم يتم تأكيد إتاحة الكراسي المتحركة وتجهيزات الإعاقة في المصدر المستخدم لهذا النموذج؛ اتصل قبل الزيارة." },
      source: "https://baheya.org/en/hospital/2", mapUrl: "https://www.google.com/maps/search/?api=1&query=Baheya+Haram+Center+Giza"
    },
    {
      id: "MED-57357", name: { en: "Children's Cancer Hospital Egypt 57357", ar: "مستشفى سرطان الأطفال مصر ٥٧٣٥٧" },
      type: { en: "Pediatric oncology hospital", ar: "مستشفى أورام أطفال" },
      lat: 30.0063, lng: 31.2370, coordsStatus: { en: "Approximate pin based on published address; confirm location/entrance.", ar: "إحداثية تقريبية من العنوان المنشور؛ تحقق من الموقع والمدخل." },
      address: { en: "1 Seket Al-Emam Street, El-Saida Zenab, Cairo, Egypt", ar: "١ شارع سكة الإمام، السيدة زينب، القاهرة، مصر" },
      phone: "19057", phoneInternational: "+20 2 2535 1500", hours: { en: "Call the hospital directly for admission, appointments and referral requirements.", ar: "اتصل بالمستشفى مباشرة لمعرفة الاستقبال والمواعيد ومتطلبات الإحالة." },
      specialties: { en: "Specialist care for children with cancer. Not an adult oncology service or a general emergency recommendation.", ar: "رعاية متخصصة للأطفال المصابين بالسرطان. ليست خدمة أورام للبالغين ولا توصية عامة للطوارئ." },
      careTags: ["pediatric-oncology", "child-cancer"], status: "official-specialty", accessibility: { en: "Specific visitor accessibility details need confirmation with the hospital.", ar: "يجب تأكيد تفاصيل إتاحة الزوار مباشرة مع المستشفى." },
      source: "https://www.57357.org/en/contact-us", mapUrl: "https://www.google.com/maps/search/?api=1&query=Children%27s+Cancer+Hospital+57357+Cairo"
    },
    {
      id: "MED-GIZA-INTL", name: { en: "Giza International Hospital", ar: "مستشفى الجيزة الدولي" },
      type: { en: "General hospital — directory listing", ar: "مستشفى عام — إدراج في دليل تجاري" },
      lat: 29.9957, lng: 31.1674, coordsStatus: { en: "Approximate, third-party directory pin; verify before use.", ar: "إحداثية تقريبية من دليل طرف ثالث؛ تحقق قبل الاستخدام." },
      address: { en: "334 El Haram Street, beside Banque Misr, El Haram, Giza, Egypt", ar: "٣٣٤ شارع الهرم، بجوار بنك مصر، الهرم، الجيزة، مصر" },
      phone: "+20 2 3781 0017", phoneAlt: "+20 2 3781 0018", hours: { en: "Emergency department status and opening hours were not confirmed from an official source.", ar: "لم يتم تأكيد وضع قسم الطوارئ وساعات العمل من مصدر رسمي." },
      specialties: { en: "General-hospital listing; exact departments, emergency service and disability accommodations must be confirmed by telephone.", ar: "إدراج كمستشفى عام؛ يجب تأكيد الأقسام والطوارئ وتجهيزات الإعاقة هاتفيًا." },
      careTags: ["general", "hospital"], status: "provisional", accessibility: { en: "No disability-specific accommodations verified in the cited source.", ar: "لم تُتحقق تجهيزات مخصصة للإعاقة في المصدر المذكور." },
      source: "https://yellowpages.com.eg/en/profile/giza-international-hospital/93955", mapUrl: "https://www.google.com/maps/search/?api=1&query=Giza+International+Hospital+334+El+Haram"
    },
    {
      id: "MED-KASR-ALAINY", name: { en: "Cairo University Hospitals — Kasr Al Ainy", ar: "مستشفيات جامعة القاهرة — قصر العيني" },
      type: { en: "University hospital network — confirm exact department", ar: "شبكة مستشفيات جامعية — تحقق من القسم المحدد" },
      lat: 30.0296, lng: 31.2315, coordsStatus: { en: "Approximate campus pin; specific clinic/entrance can differ.", ar: "إحداثية تقريبية للمجمع؛ قد يختلف موقع العيادة أو المدخل." },
      address: { en: "Kasr Al Ainy Street, Cairo, Egypt", ar: "شارع قصر العيني، القاهرة، مصر" },
      phone: "+20 2 2364 7545", phoneAlt: "", hours: { en: "Published contact is for university/medicine enquiries, not a verified emergency line. Confirm the relevant unit directly.", ar: "رقم التواصل المنشور للاستفسارات الجامعية/الطبية وليس خط طوارئ مؤكدًا. تحقق مباشرة من القسم المناسب." },
      specialties: { en: "University hospital network with multiple medical and surgical specialties; the exact service and eligibility depend on the unit.", ar: "شبكة مستشفيات جامعية تضم تخصصات طبية وجراحية متعددة؛ تعتمد الخدمة والأهلية على القسم المحدد." },
      careTags: ["general", "tertiary", "multiple-specialties"], status: "provisional", accessibility: { en: "Specific disability access, appointment and department information must be confirmed before travel.", ar: "يجب تأكيد إتاحة ذوي الإعاقة والمواعيد والقسم قبل الزيارة." },
      source: "https://www.cu.edu.eg/", mapUrl: "https://www.google.com/maps/search/?api=1&query=Kasr+Al+Ainy+Hospitals+Cairo"
    }
  ],
  quiz: [
    { q: { en: "Which action best protects a fragile historic object?", ar: "أي تصرف يحمي قطعة أثرية هشة؟" }, choices: [{en:"Touch it gently",ar:"لمسها برفق"},{en:"Follow instructions and avoid touching",ar:"اتباع التعليمات وعدم لمسها"},{en:"Use flash photography",ar:"التصوير بالفلاش"}], answer: 1, explain: { en: "Preservation guidance usually asks visitors not to touch objects and to follow staff instructions.", ar: "تطلب إرشادات الحفاظ عادةً عدم لمس القطع واتباع تعليمات الموظفين." } },
    { q: { en: "Before relying on an accessibility feature, what should you do?", ar: "قبل الاعتماد على خدمة إتاحة، ماذا ينبغي أن تفعل؟" }, choices: [{en:"Assume every site has it",ar:"افتراض وجودها في كل موقع"},{en:"Confirm the exact details with the venue",ar:"تأكيد التفاصيل الدقيقة مع الموقع"},{en:"Rely only on an old photo",ar:"الاعتماد على صورة قديمة فقط"}], answer: 1, explain: { en: "Amenities can change; confirm current availability, route details and any booking requirements.", ar: "قد تتغير الخدمات؛ تحقق من التوفر الحالي وتفاصيل المسار ومتطلبات الحجز." } },
    { q: { en: "What does the Giza Plateau area ticket exclude according to the Ministry listing?", ar: "ما الذي لا تشملُه تذكرة منطقة هضبة الجيزة وفق صفحة الوزارة؟" }, choices: [{en:"Every museum in Cairo",ar:"كل متاحف القاهرة"},{en:"Some pyramid interiors and other separately ticketed monuments",ar:"بعض الأهرامات من الداخل ومعالم تُباع لها تذاكر منفصلة"},{en:"All transport in Egypt",ar:"كل وسائل النقل في مصر"}], answer: 1, explain: { en: "The official listing explicitly says some monument/interior tickets are separate.", ar: "توضح الصفحة الرسمية أن بعض تذاكر المعالم أو الدخول الداخلي منفصلة." } },
    { q: { en: "Which information should a medical directory show?", ar: "ما المعلومات التي يجب أن يعرضها دليل طبي؟" }, choices: [{en:"Unverified claims as facts",ar:"ادعاءات غير مؤكدة كأنها حقائق"},{en:"Source, verification status and a reminder to call",ar:"المصدر وحالة التحقق وتذكير بالاتصال"},{en:"A diagnosis for the visitor",ar:"تشخيصًا لحالة الزائر"}], answer: 1, explain: { en: "Medical provider data should be sourced and checked; this prototype is not a triage or care service.", ar: "يجب توثيق بيانات مقدمي الخدمات والتحقق منها؛ هذا النموذج ليس خدمة فرز طبي أو رعاية." } },
    { q: { en: "What does an indicative USD ticket conversion mean?", ar: "ماذا يعني تحويل سعر التذكرة إلى الدولار بشكل إرشادي؟" }, choices: [{en:"It is a guaranteed USD selling price",ar:"أنه سعر بيع مضمون بالدولار"},{en:"It is an estimate using a stated exchange rate",ar:"تقدير باستخدام سعر صرف معلن"},{en:"It includes guides and transport",ar:"أنه يشمل المرشد والنقل"}], answer: 1, explain: { en: "The venue's listed EGP price remains the reference; conversion may change with exchange rates.", ar: "يبقى السعر المنشور بالجنيه هو المرجع؛ وقد يتغير التحويل مع أسعار الصرف." } }
  ],
  imageCredits: [
    { title: "Grand Egyptian Museum Facade", url: "https://commons.wikimedia.org/wiki/File:Grand_Egyptian_Museum_Facade.jpg", author: "Wikimedia Commons file page; review license before reuse" },
    { title: "Great Pyramid of Giza", url: "https://commons.wikimedia.org/wiki/File:Great_Pyramid_of_Giza.jpg", author: "kallerna — Creative Commons Attribution-ShareAlike 3.0 Unported (check file page)" },
    { title: "Egyptian Museum, Tahrir", url: "https://commons.wikimedia.org/wiki/File:Kairo_%C3%84gyptisches_Museum_04.jpg", author: "Olaf Tausch — see file page for license details" },
    { title: "National Museum of Egyptian Civilization", url: "https://commons.wikimedia.org/wiki/File:National_Museum_of_Egyptian_Civilization_(NMEC)_in_Cairo,_Egypt_07.jpg", author: "Wikimedia Commons file page; review license before reuse" },
    { title: "Museum of Islamic Art Cairo", url: "https://commons.wikimedia.org/wiki/File:Museum_of_Islamic_Art_Cairo_DSCF7680.jpg", author: "R. Prazeres — Creative Commons Attribution-ShareAlike 4.0 (check file page)" },
    { title: "Cairo Coptic Museum", url: "https://commons.wikimedia.org/wiki/File:CairoCoptMuseum.jpg", author: "Roland Unger — Creative Commons Attribution-ShareAlike 3.0 (check file page)" }
  ],
  sources: [
    { title: {en:"Grand Egyptian Museum — Accessibility",ar:"المتحف المصري الكبير — الإتاحة"}, url:"https://gem.eg/visit/accessibility/" },
    { title: {en:"Grand Egyptian Museum — FAQs",ar:"المتحف المصري الكبير — الأسئلة الشائعة"}, url:"https://gem.eg/en/faqs" },
    { title: {en:"Grand Egyptian Museum — Official tickets",ar:"المتحف المصري الكبير — التذاكر الرسمية"}, url:"https://tickets.gem.eg/en/AdmissionTkt" },
    { title: {en:"Giza Plateau — Egyptian Ministry of Tourism and Antiquities",ar:"هضبة الجيزة — وزارة السياحة والآثار"}, url:"https://egymonuments.gov.eg/en/archaeological-sites/giza-plateau/" },
    { title: {en:"The Egyptian Museum — Ministry listing",ar:"المتحف المصري — صفحة الوزارة"}, url:"https://egymonuments.gov.eg/en/museums/egyptian-museum" },
    { title: {en:"NMEC — Ministry listing",ar:"المتحف القومي للحضارة — صفحة الوزارة"}, url:"https://egymonuments.gov.eg/en/museums/national-museum-of-egyptian-civilization-nmec" },
    { title: {en:"Museum of Islamic Art — Ministry listing",ar:"متحف الفن الإسلامي — صفحة الوزارة"}, url:"https://egymonuments.gov.eg/museums/museum-of-islamic-art" },
    { title: {en:"The Coptic Museum — Ministry listing",ar:"المتحف القبطي — صفحة الوزارة"}, url:"https://egymonuments.gov.eg/en/museums/the-coptic-museum" },
    { title: {en:"Baheya Haram Center — official contact and location",ar:"مركز بهية الهرم — التواصل والموقع الرسمي"}, url:"https://baheya.org/en/hospital/2" },
    { title: {en:"Children's Cancer Hospital Egypt 57357 — Contact",ar:"مستشفى سرطان الأطفال ٥٧٣٥٧ — التواصل"}, url:"https://www.57357.org/en/contact-us" },
    { title: {en:"Egyptian Ambulance Organization",ar:"هيئة الإسعاف المصرية"}, url:"https://eao.gov.eg/" },
    { title: {en:"Esri World Imagery attribution guidance",ar:"إرشادات نسب خرائط Esri"}, url:"https://support.esri.com/en-us/knowledge-base/what-is-the-correct-way-to-cite-an-arcgis-online-basema-000012040" },
    { title: {en:"Wikimedia Commons image reuse pages",ar:"صفحات إعادة استخدام الصور في ويكيميديا كومنز"}, url:"https://commons.wikimedia.org/" }
  ]
};

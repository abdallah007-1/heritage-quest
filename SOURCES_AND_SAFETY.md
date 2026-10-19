# Sources, Attribution and Safety Notes

**Dataset review label:** 19 October 2026 (prototype seed data; some facts and live prices require reconfirmation).

This document records the main sources embedded in `data.js`. Links may change; revisit each source before using the data commercially or publishing claims that require current verification.

## Official destination, ticket and accessibility information

- Grand Egyptian Museum — accessibility: https://gem.eg/visit/accessibility/
- Grand Egyptian Museum — FAQs: https://gem.eg/en/faqs
- Grand Egyptian Museum — ticket portal: https://tickets.gem.eg/en/AdmissionTkt
- Giza Plateau — Egyptian Ministry of Tourism and Antiquities: https://egymonuments.gov.eg/en/archaeological-sites/giza-plateau/
- Egyptian Museum (Tahrir) — Egyptian Ministry of Tourism and Antiquities: https://egymonuments.gov.eg/en/museums/egyptian-museum
- National Museum of Egyptian Civilization — Egyptian Ministry of Tourism and Antiquities: https://egymonuments.gov.eg/en/museums/national-museum-of-egyptian-civilization-nmec
- Museum of Islamic Art — Egyptian Ministry of Tourism and Antiquities: https://egymonuments.gov.eg/museums/museum-of-islamic-art
- Coptic Museum — Egyptian Ministry of Tourism and Antiquities: https://egymonuments.gov.eg/en/museums/the-coptic-museum

**Known price issue:** The official Coptic Museum pages have shown inconsistent foreign-visitor prices. The prototype should continue to mark this price as needing confirmation instead of choosing one as certainly current. All other ticket prices can also change and should be checked on official pages or ticket portals shortly before travel.

## Medical-provider and emergency directory sources

- Baheya Haram Center — official location/contact page: https://baheya.org/en/hospital/2
- Baheya — official contacts: https://baheya.org/en/contact-us
- Children's Cancer Hospital Egypt 57357 — contact information: https://www.57357.org/en/contact-us
- Egyptian Ambulance Organization: https://eao.gov.eg/
- Cairo University: https://www.cu.edu.eg/
- Giza International Hospital directory lead (third-party listing; not an official provider page): https://yellowpages.com.eg/en/profile/giza-international-hospital/93955

The directory is deliberately small. Some entries are provisional leads with approximate pins or contact details that must be confirmed. Specialist providers must not be recommended for unrelated conditions; a general hospital listing must not be interpreted as proof that a specific specialty, emergency department, or disability accommodation is available at that time. Call directly to confirm service, exact department, address/entrance, operating hours, eligibility, and accessibility. The platform does not diagnose, triage, or advise on treatment.

## Map attribution and terms

- Esri World Imagery attribution guidance: https://support.esri.com/en-us/knowledge-base/what-is-the-correct-way-to-cite-an-arcgis-online-basema-000012040
- OpenStreetMap tile usage policy: https://operations.osmfoundation.org/policies/tiles/
- OpenStreetMap copyright and attribution: https://www.openstreetmap.org/copyright

The map uses Esri World Imagery for the satellite layer and OpenStreetMap for the street layer, via Leaflet. Imagery coverage, resolution, update dates and service availability can vary. Retain provider attribution, and review the applicable usage terms before public or high-traffic deployment. The site markers are approximate prototype pins, not surveyed entrances or turn-by-turn routes.

## Image credits

Destination image URLs use Wikimedia Commons `Special:FilePath` URLs. The data file also links to each underlying image page so the team can review author, license, attribution and share-alike requirements before using it in a public portfolio or a commercial product:

- Grand Egyptian Museum façade: https://commons.wikimedia.org/wiki/File:Grand_Egyptian_Museum_Facade.jpg
- Great Pyramid of Giza: https://commons.wikimedia.org/wiki/File:Great_Pyramid_of_Giza.jpg
- Egyptian Museum, Tahrir: https://commons.wikimedia.org/wiki/File:Kairo_%C3%84gyptisches_Museum_04.jpg
- National Museum of Egyptian Civilization: https://commons.wikimedia.org/wiki/File:National_Museum_of_Egyptian_Civilization_(NMEC)_in_Cairo,_Egypt_07.jpg
- Museum of Islamic Art Cairo: https://commons.wikimedia.org/wiki/File:Museum_of_Islamic_Art_Cairo_DSCF7680.jpg
- Coptic Museum: https://commons.wikimedia.org/wiki/File:CairoCoptMuseum.jpg

A link to an image page is not itself proof that the image is available under every intended use. Check the individual file's current license, author attribution, and any share-alike conditions before reuse.

## YouTube tour links

The prototype opens selected YouTube tour videos when a specific video ID is configured, and otherwise opens YouTube search results for the relevant museum. Videos remain hosted by their original publishers; the prototype does not claim ownership or institutional endorsement. Video availability, content, accessibility captions and uploader rights may change.

## Privacy and payment safety

- Demo profile and access preferences use browser `sessionStorage`; journey/bookings/demo-badge values use `localStorage`.
- These storage mechanisms are **not secure authentication or a private medical record**. Do not enter real diagnoses, medical records, passwords reused elsewhere, or real payment details.
- The checkout is a visual simulation and stores a fake reference locally. It does not charge a payment method, reserve a ticket, provide a refund, or book medical care.
- The broad health categories are optional filters, not exhaustive and not a substitute for describing practical access needs. No diagnosis is required to use the site.
- Before real deployment, obtain legal/privacy review, move authentication and sensitive data to a secure backend, apply least-privilege access, and use a compliant payment provider without storing raw card details.

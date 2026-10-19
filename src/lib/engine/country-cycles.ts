/**
 * Country application cycles for taught postgraduate (MSc/MA) study abroad.
 *
 * Backward-planning data layer. Given a country code and an intake, an engine can
 * derive a dated milestone plan by subtracting `offsetDays` from the intake start date.
 *
 * HONESTY CONTRACT
 * ----------------
 * Every milestone carries a `confidence` value:
 *   - "verified": a primary/official source states the rule, figure or date quoted.
 *   - "typical":   a widely reported pattern or a per-university convention with no
 *                  single official/central publication.
 *   - "estimate":  we inferred it. No published deadline exists, or the source is
 *                  institution-specific and cannot be generalised.
 *
 * `verified` is deliberately NOT used to mean "this offset number is officially
 * published". Several milestones here state a verified REQUIREMENT whose timing is
 * our planning default; those carry "typical". Conversely, a deadline that a specific
 * official university page publishes for a real intake may be "verified" for that
 * intake even though other schools differ. Always read the `source` before trusting a
 * number, and re-check every figure before showing it to a student.
 *
 * Verified research window: October 2026.
 */

export type Confidence = "verified" | "typical" | "estimate";

export const MILESTONE_PHASES = [
  "Profile & Documents",
  "English Proficiency",
  "Standardised Tests",
  "University Shortlist",
  "Personal Statement",
  "Recommendations",
  "Application Submission",
  "Scholarships & Funding",
  "Offer & Enrolment",
  "Visa & Permits",
  "Housing",
  "Pre-Departure",
] as const;

export type MilestonePhase = (typeof MILESTONE_PHASES)[number];

export type Milestone = {
  id: string;
  phase: MilestonePhase;
  title: string;
  summary: string;
  offsetDays: number;
  hardDeadline: boolean;
  dependsOn: string[];
  tasks: string[];
  source: string;
  confidence: Confidence;
};

export type Intake = {
  id: string;
  label: string;
  startDate: string;
};

export type CountryCycle = {
  code: string;
  name: string;
  admission: "rolling" | "fixed";
  intakes: Intake[];
  milestones: Milestone[];
  notes: string;
};

export const COUNTRY_CYCLES: CountryCycle[] = [
  /* ------------------------------------------------------------------ UNITED STATES */
  {
    code: "US",
    name: "United States",
    admission: "rolling",
    intakes: [
      { id: "us-spring-2027", label: "Spring 2027", startDate: "2027-01-11" },
      { id: "us-fall-2027", label: "Fall 2027", startDate: "2027-08-23" },
      { id: "us-spring-2028", label: "Spring 2028", startDate: "2028-01-17" },
      { id: "us-fall-2028", label: "Fall 2028", startDate: "2028-08-21" },
    ],
    notes:
      "ADMISSION MODEL IS A GENUINE AMBIGUITY. We label the US 'rolling', and that is true of the immigration half of the process (a school can admit you for any future term once it has issued an I-20). But the selective half behaves like a fixed-deadline system: most competitive US computer science master's programmes publish a single Fall deadline in late November or early December and publish nothing thereafter. Stanford EE states its Autumn 2027-28 deadline as 1 December 2026. So for a selective CS programme, treat 'rolling' as an early-December cliff, not an open door. Two consequences: (1) a Spring intake is not universally available for CS master's, and Stanford CS explicitly offers Autumn only, so do not assume a January entry; (2) because MS admission is largely merit- and deadline-driven, a December submission is effectively the whole application. THE BIGGEST BEHAVIOURAL GOTCHA IS THE VISA INTERVIEW QUEUE. The State Department publishes next-available F/M/J interview appointments per post; in the 17 Sep 2026 dataset these ranged from under half a month at some posts to 5.5 months at Beijing and 2.5 months at Mumbai and Guangzhou. We have therefore planned a 75-day visa buffer (about 2.5 months), which is a compromise: generous for most posts, insufficient for Beijing-class backlogs. Check the live Global Visa Wait Times table for YOUR post and re-plan if it exceeds the buffer. Two further honest caveats: (a) Stanford CS states that the department does not offer financial support for MS students and that GRE scores are not required and not considered for MS applicants, so any US 'funding milestone' is school- and programme-specific rather than a national norm; (b) since 15 September 2026 the DHS fixed-period-of-admission rule means an F-1's I-94 now shows a specific admit-until date rather than duration of status, which changes end-of-programme planning but not pre-departure dates.",
    milestones: [
      {
        id: "us-profile-cv",
        phase: "Profile & Documents",
        title: "Build the core academic record",
        summary:
          "Get one clean, reusable master CV plus official transcripts ready. Everything downstream (essays, recommendations, I-20 financial evidence) is assembled from this file.",
        offsetDays: 330,
        hardDeadline: false,
        dependsOn: [],
        tasks: [
          "Write a 1-2 page US-style academic CV (Stanford CS requires a CV uploaded in the online application)",
          "Request official transcripts from every university attended, in sealed envelopes or as secure e-transcripts",
          "Collect degree certificates and, for non-English institutions, certified English translations",
          "Line up a credential evaluation service early if a US school asks for one"
        ],
        source:
          "https://www.cs.stanford.edu/admissions/masters-admissions-frequently-asked-questions",
        confidence: "verified",
      },
      {
        id: "us-shortlist",
        phase: "University Shortlist",
        title: "Shortlist 8-12 US CS/data programmes",
        summary:
          "Build a realistic list and, for every programme, record its exact deadline, GRE policy and whether it funds MS students. This is the single highest-leverage planning step.",
        offsetDays: 300,
        hardDeadline: false,
        dependsOn: ["us-profile-cv"],
        tasks: [
          "Compile a target list of 8-12 SEVP-certified programmes in CS, data science or related fields",
          "For each programme, write down the single application deadline, GRE policy and funding policy",
          "Check tuition and required financial evidence per programme (amounts vary by hundreds of thousands)",
          "Remove any programme whose deadline has already passed for your target term"
        ],
        source:
          "https://www.cs.stanford.edu/admissions/graduate-application-checklists",
        confidence: "typical",
      },
      {
        id: "us-english",
        phase: "English Proficiency",
        title: "Sit TOEFL/IELTS and have official scores delivered",
        summary:
          "Scores must physically arrive at each school before its application deadline, so book the test with a large delivery buffer rather than to the deadline itself.",
        offsetDays: 285,
        hardDeadline: true,
        dependsOn: ["us-profile-cv"],
        tasks: [
          "Book a TOEFL iBT or IELTS Academic sitting at least 6 weeks before your earliest programme deadline",
          "Order official score delivery to every shortlisted school using the correct institution code",
          "If submitting IELTS, use the official electronic results service rather than a self-reported score",
          "Note that TOEFL/IELTS are not required for applicants whose degree was earned where English was the sole medium of instruction"
        ],
        source:
          "https://www.cs.stanford.edu/admissions/graduate-application-checklists",
        confidence: "verified",
      },
      {
        id: "us-gre",
        phase: "Standardised Tests",
        title: "Decide on GRE (required for some programmes, ignored by others)",
        summary:
          "There is no US-wide GRE rule for master's. Stanford CS states GRE scores are not required and not considered for MS applicants; other CS programmes still require them, so decide per programme.",
        offsetDays: 290,
        hardDeadline: false,
        dependsOn: ["us-shortlist"],
        tasks: [
          "Check the GRE requirement for every shortlisted programme individually",
          "If required, register for a General Test sitting at least 8 weeks before your earliest deadline",
          "If your target programmes are GRE-optional, skip it and spend the time on essays instead",
          "Send official scores only to programmes that actually read them"
        ],
        source:
          "https://www.cs.stanford.edu/admissions/masters-admissions-frequently-asked-questions",
        confidence: "verified",
      },
      {
        id: "us-sop",
        phase: "Personal Statement",
        title: "Draft statement of purpose and programme-specific essays",
        summary:
          "US CS master's essays are long, specific and character-limited. Stanford CS caps the statement of purpose at 8,000 characters including spaces, so draft to length and iterate.",
        offsetDays: 285,
        hardDeadline: false,
        dependsOn: ["us-profile-cv", "us-shortlist"],
        tasks: [
          "Draft a 700-1000 word statement of purpose framed around one coherent technical narrative",
          "Write a distinct 'why this programme' essay naming specific courses and faculty for each shortlisted school",
          "Add a short research statement only where the programme asks for one",
          "Get two external readers to critique before you submit anything"
        ],
        source:
          "https://www.cs.stanford.edu/admissions/masters-admissions-frequently-asked-questions",
        confidence: "verified",
      },
      {
        id: "us-recommendations",
        phase: "Recommendations",
        title: "Secure 2-3 academic recommendation letters",
        summary:
          "Recommenders are the slowest-moving dependency in the whole US application. Approach academics while you are still visible to them, and give them a deadline at least 3 weeks before submission.",
        offsetDays: 290,
        hardDeadline: false,
        dependsOn: ["us-profile-cv"],
        tasks: [
          "Identify 3 referees with direct evidence of your research or technical ability",
          "Send each a packet: your CV, the programme list, target deadline and suggested talking points",
          "Use the school's online recommendation system so referees never email you a loose document",
          "Chase politely at the two-week mark; an unreceived recommendation can make an application incomplete"
        ],
        source:
          "https://www.cs.stanford.edu/admissions/graduate-application-checklists",
        confidence: "typical",
      },
      {
        id: "us-documents-upload",
        phase: "Profile & Documents",
        title: "Complete the document upload: transcripts and degree evidence",
        summary:
          "Most US applications fail on completeness rather than merit. Unofficial transcripts are usually uploaded first; official ones are requested only after an offer, so track both.",
        offsetDays: 275,
        hardDeadline: true,
        dependsOn: ["us-sop", "us-recommendations"],
        tasks: [
          "Upload unofficial transcripts for every degree into the online application",
          "Upload English translations for any non-English transcript",
          "Verify your name spelling matches your passport exactly, character for character",
          "Keep physical sealed official transcripts ready for the post-offer stage"
        ],
        source:
          "https://www.cs.stanford.edu/admissions/graduate-application-checklists",
        confidence: "typical",
      },
      {
        id: "us-app-submit",
        phase: "Application Submission",
        title: "Submit university applications before the December cliff",
        summary:
          "Selective US CS programmes close in a narrow window at the start of December. Stanford EE published 1 December 2026 for Autumn 2027-28, and Stanford CS states all deadlines are final with no late applications accepted.",
        offsetDays: 265,
        hardDeadline: true,
        dependsOn: [
          "us-english",
          "us-sop",
          "us-recommendations",
          "us-documents-upload",
          "us-gre",
        ],
        tasks: [
          "Submit each application at least 48 hours before its own published deadline",
          "Pay each application fee online and save the confirmation",
          "Email admissions directly if a letter is overdue and the deadline is close",
          "Do not assume a December deadline school will read a late submission"
        ],
        source: "https://ee.stanford.edu/admissions/ms/faq",
        confidence: "verified",
      },
      {
        id: "us-funding",
        phase: "Scholarships & Funding",
        title: "Pursue funding and assistantships in parallel with applications",
        summary:
          "There is no US national scholarship for master's students, and some departments fund nothing at all. Stanford CS states it does not offer financial support for MS students, so funding here is a per-programme negotiation, not a checklist item.",
        offsetDays: 230,
        hardDeadline: false,
        dependsOn: ["us-app-submit"],
        tasks: [
          "Check each programme's own funding policy before assuming any aid is possible",
          "Track university-specific scholarships, which often have deadlines earlier than the admission deadline",
          "Ask about RA/TA funding only for programmes where MS funding genuinely exists",
          "Budget self-funding as the default case and price it honestly per programme"
        ],
        source:
          "https://www.cs.stanford.edu/admissions/masters-admissions-frequently-asked-questions",
        confidence: "verified",
      },
      {
        id: "us-offer-accept",
        phase: "Offer & Enrolment",
        title: "Accept the offer and pay the enrolment deposit",
        summary:
          "Most US schools require a non-refundable deposit within a stated number of days of your offer, and the deposit is what triggers the I-20 process. Missing it forfeits the place.",
        offsetDays: 150,
        hardDeadline: true,
        dependsOn: ["us-app-submit", "us-funding"],
        tasks: [
          "Compare offers on total cost, not tuition alone (housing and health insurance are large)",
          "Pay the deposit and keep the receipt; it is usually required before financial documents are released",
          "Decline the rest in writing so no further deadline surprises arrive",
          "Note that Stanford CS grants MS deferrals only case by case and forbids co-term deferral"
        ],
        source:
          "https://www.cs.stanford.edu/admissions/masters-admissions-frequently-asked-questions",
        confidence: "typical",
      },
      {
        id: "us-i20",
        phase: "Visa & Permits",
        title: "Receive Form I-20 and pay the I-901 SEVIS fee",
        summary:
          "Your school issues the I-20 after you submit financial evidence, and you must pay the I-901 SEVIS fee at FMJFee.com before you can apply for a visa. No fee, no visa appointment.",
        offsetDays: 120,
        hardDeadline: true,
        dependsOn: ["us-offer-accept"],
        tasks: [
          "Return the school's financial certification form with bank statements and a sponsor affidavit",
          "Print the signed I-20 and verify the program start date, funding and personal details on it",
          "Pay the I-901 SEVIS fee online and print the receipt",
          "Work to a school deadline of roughly 30 days before term for the I-20 to be issued"
        ],
        source:
          "https://studyinthestates.dhs.gov/students/prepare/student-forms",
        confidence: "verified",
      },
      {
        id: "us-ds160",
        phase: "Visa & Permits",
        title: "File DS-160, pay the visa fee and book the interview",
        summary:
          "The DS-160 plus fee plus appointment booking is the step that actually starts the clock. Wait times are published per post for F/M/J and they vary enormously, so book the earliest slot you can and re-check often.",
        offsetDays: 100,
        hardDeadline: true,
        dependsOn: ["us-i20"],
        tasks: [
          "Complete the DS-160 online; every answer must match your passport",
          "Pay the non-refundable MRV visa issuance fee",
          "Book the earliest available F-1 interview slot at your post",
          "Re-check the appointment system regularly, as consulates release new slots often"
        ],
        source:
          "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html",
        confidence: "verified",
      },
      {
        id: "us-visa-interview",
        phase: "Visa & Permits",
        title: "Attend the F-1 visa interview and receive the passport",
        summary:
          "Allow for the interview wait time plus possible administrative processing, which the State Department explicitly excludes from published estimates. Our 75-day buffer covers average posts, not the worst case.",
        offsetDays: 75,
        hardDeadline: true,
        dependsOn: ["us-ds160"],
        tasks: [
          "Bring your passport, I-20, SEVIS receipt, admission letter and financial evidence",
          "Prepare to explain your funding source, your home ties and your exact programme in under two minutes",
          "Expect a possible request for additional documents; administrative processing is not counted in published wait times",
          "Track your passport if the consulate keeps it, and never book non-refundable travel before it returns"
        ],
        source:
          "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/global-visa-wait-times.html",
        confidence: "verified",
      },
      {
        id: "us-housing",
        phase: "Housing",
        title: "Apply for on-campus housing",
        summary:
          "On-campus housing is first-come, first-served at many schools and is not centrally published, so treat this as a planning default. Apply the day your enrolment deposit clears.",
        offsetDays: 90,
        hardDeadline: false,
        dependsOn: ["us-offer-accept"],
        tasks: [
          "Check your specific school's housing portal as soon as the portal opens; many fill in days",
          "Have a housing waiver or off-campus plan ready in case the school is full",
          "Budget separately for off-campus housing, which is common and expensive in US tech hubs",
          "Confirm whether housing and meals are billed per semester or per quarter"
        ],
        source: "https://www.ice.gov/sevis/students",
        confidence: "estimate",
      },
      {
        id: "us-arrival",
        phase: "Pre-Departure",
        title: "Buy tickets and arrive within the 30-day rule",
        summary:
          "SEVP is explicit that an F/M student arrives no more than 30 days before the program start date. Arriving early to settle in is fine; arriving weeks early is not.",
        offsetDays: 14,
        hardDeadline: false,
        dependsOn: ["us-visa-interview", "us-housing"],
        tasks: [
          "Buy flights only once your passport and visa are physically back in your hands",
          "Plan to arrive 7-14 days before the program start date, never more than 30 days",
          "Carry your I-20, visa, admission letter and SEVIS receipt for CBP at the port of entry",
          "Check whether your school requires arrival a specific number of days before orientation"
        ],
        source:
          "https://studyinthestates.dhs.gov/assets/pdf/SEVP_2026_FandMStudentLifeCycle_082026.pdf",
        confidence: "verified",
      },
      {
        id: "us-sevis-orientation",
        phase: "Pre-Departure",
        title: "Complete SEVIS reporting and DSO check-in",
        summary:
          "On arrival you must report to your Designated School Official, check your electronic I-94 admit-until date, and complete SEVIS orientation and training.",
        offsetDays: -7,
        hardDeadline: true,
        dependsOn: ["us-arrival"],
        tasks: [
          "Verify your electronic I-94 and confirm the Admit Until Date is correct",
          "Complete SEVIS orientation and the F-1 reporting training your school assigns",
          "Attend DSO check-in before the add/drop deadline",
          "Note the programme end date on your I-20; since 15 September 2026 F-1 admission has a fixed period rather than duration of status"
        ],
        source:
          "https://studyinthestates.dhs.gov/assets/pdf/SEVP_2026_FandMStudentLifeCycle_082026.pdf",
        confidence: "verified",
      },
    ],
  },

  /* ------------------------------------------------------------------ UNITED KINGDOM */
  {
    code: "GB",
    name: "United Kingdom",
    admission: "fixed",
    intakes: [
      { id: "gb-jan-2027", label: "January 2027", startDate: "2027-01-11" },
      { id: "gb-sep-2027", label: "September 2027", startDate: "2027-09-27" },
      { id: "gb-jan-2028", label: "January 2028", startDate: "2028-01-10" },
      { id: "gb-sep-2028", label: "September 2028", startDate: "2028-09-25" },
    ],
    notes:
      "UK master's admissions are fixed-deadline systems, and the date that matters is not the university deadline but the visa-chemistry deadline behind it. UCL's Computer Science MSc for 2026/27 entry closed to applicants requiring a visa on 27 March 2026 while remaining open to non-visa applicants until 28 August 2026, which is a 5-month gap created purely by visa lead time. Students routinely miss this. THE SINGLE MOST IMPORTANT GOTCHA WE ENCODED IS ATAS, THE ACADEMIC TECHNOLOGY APPROVAL SCHEME. For CS, AI, Information Systems and several engineering CAH codes at postgraduate level, you need an ATAS certificate, and GOV.UK states you must obtain it BEFORE applying for a Student visa. Oxford states plainly that you cannot apply for your visa until ATAS has been granted. Worse, some universities require it even earlier: Bristol requires the certificate before the CAS is issued. Certificates are valid for 6 months, so a certificate issued too early expires before you are allowed to apply. Universities also send ATAS details at very different times, with Sheffield emailing in May or within a week of a late offer. Nationalities including Australia, Canada, Singapore, South Korea, Japan, New Zealand, the USA and EU/EEA/Swiss citizens are exempt. HONEST CAVEATS: (1) UCL's published 2026 dates are a real verified data point but not a UK-wide rule; as of October 2026 UCL's 2027/28 pages still said 'Application deadlines: To be confirmed', which is why our submission offset is marked typical and not verified. (2) The visa decision standard of 3 weeks outside the UK is a service standard, not a guarantee, and it measures from biometrics, not from the day you submit. (3) The £558 fee and the maintenance figures were read directly from GOV.UK in October 2026 and were higher than most third-party guides still publish, so do not trust older figures.",
    milestones: [
      {
        id: "gb-profile-cv",
        phase: "Profile & Documents",
        title: "Assemble CV, transcripts and certified translations",
        summary:
          "UK applications are document-heavy and any non-English document usually needs a certified translation. Build the set once and reuse it across every application.",
        offsetDays: 285,
        hardDeadline: false,
        dependsOn: [],
        tasks: [
          "Write an academic CV focused on modules, grades and projects rather than length",
          "Order official transcripts and degree certificates from each institution",
          "Arrange certified English translations where the issuing language is not English",
          "Have your academic references ready to submit online, because universities expect them with the application"
        ],
        source:
          "https://www.gov.uk/student-visa/documents-youll-need-to-apply",
        confidence: "typical",
      },
      {
        id: "gb-shortlist",
        phase: "University Shortlist",
        title: "Shortlist UK programmes and confirm sponsor licence",
        summary:
          "Your school must hold a Student sponsor licence to issue you a CAS, so checking the licence is a genuine eligibility filter, not a formality.",
        offsetDays: 300,
        hardDeadline: false,
        dependsOn: ["gb-profile-cv"],
        tasks: [
          "Shortlist 6-10 UK programmes in CS, data science or a related taught field",
          "Confirm each institution appears on the GOV.UK register of licensed Student sponsors",
          "For each programme, check its ATAS status and whether ATAS is needed before CAS",
          "Record each programme's own deadline and whether it separates visa and non-visa applicants"
        ],
        source: "https://www.gov.uk/student-visa",
        confidence: "verified",
      },
      {
        id: "gb-english",
        phase: "English Proficiency",
        title: "Meet the English requirement (test score or SELT)",
        summary:
          "You can satisfy this with a qualifying test score or, for visa purposes, a Secure English Language Test. Note that the university requirement and the visa requirement are separate tests of the same thing.",
        offsetDays: 265,
        hardDeadline: true,
        dependsOn: [],
        tasks: [
          "Book IELTS Academic or TOEFL with results in hand at least 6 weeks before your earliest programme deadline",
          "Check whether your programme accepts a SELT score instead of a test score",
          "Note that exemption lists apply to the financial requirement, not the English requirement",
          "Confirm your scores meet the programme's stated band, which is often above the visa minimum"
        ],
        source: "https://www.gov.uk/student-visa/knowledge-of-english",
        confidence: "verified",
      },
      {
        id: "gb-references",
        phase: "Recommendations",
        title: "Obtain academic references",
        summary:
          "Most UK taught master's require at least one and frequently two academic references, and referees submit them through the university's system rather than emailing you a PDF.",
        offsetDays: 270,
        hardDeadline: false,
        dependsOn: ["gb-profile-cv"],
        tasks: [
          "Ask UK-taught supervisors or academics for a reference at least 6 weeks before your deadline",
          "Give referees the programme name, deadline and a reminder of the specific project they supervised",
          "Check whether the system allows referees to upload directly rather than sending via you",
          "Verify how many references each shortlisted programme actually requires before you ask"
        ],
        source:
          "https://www.ucl.ac.uk/study/prospective-students/graduate/how-to-apply",
        confidence: "typical",
      },
      {
        id: "gb-sop",
        phase: "Personal Statement",
        title: "Write the personal statement, tailored per programme",
        summary:
          "UK personal statements are judged on fit with a specific programme, not general passion. Never reuse one document across a shortlist.",
        offsetDays: 240,
        hardDeadline: false,
        dependsOn: ["gb-shortlist", "gb-profile-cv"],
        tasks: [
          "Write a master version of roughly 500 words framed around your academic trajectory",
          "Produce a tailored version per programme naming specific modules or research groups",
          "Check each programme's word limit and whether a separate statement is required for a joint or conversion course",
          "Have the statement read by someone who knows the subject, not only by family"
        ],
        source:
          "https://www.ucl.ac.uk/study/prospective-students/graduate/courses/computer-science-msc",
        confidence: "typical",
      },
      {
        id: "gb-app-submit",
        phase: "Application Submission",
        title: "Submit applications before the visa-side deadline",
        summary:
          "For a September 2027 start you are really working to a March 2027 cut-off. UCL closed its 2026/27 Computer Science MSc to visa applicants on 27 March 2026, five months before term began.",
        offsetDays: 185,
        hardDeadline: true,
        dependsOn: ["gb-english", "gb-sop", "gb-references"],
        tasks: [
          "Submit to visa-dependent programmes first; they close months before non-visa places do",
          "Pay each application fee (UCL charges an application processing fee for several taught master's)",
          "Upload all supporting documents in the same session; incomplete applications are not assessed",
          "Record your submitted reference numbers so you can track them"
        ],
        source:
          "https://www.ucl.ac.uk/prospective-students/graduate/taught-degrees/computer-science-msc-2026",
        confidence: "verified",
      },
      {
        id: "gb-offer-accept",
        phase: "Offer & Enrolment",
        title: "Clear academic conditions, accept the offer, pay the deposit",
        summary:
          "CAS is only issued against an unconditional offer, so any condition outstanding at the time you want your CAS is the thing most likely to delay your visa.",
        offsetDays: 145,
        hardDeadline: true,
        dependsOn: ["gb-app-submit"],
        tasks: [
          "Receive the offer and read the condition list line by line",
          "Submit proof of any outstanding result as soon as it is released, not at the deadline",
          "Pay the university deposit or full tuition as required before requesting the CAS",
          "Tell admissions immediately if an award decision will be late; the visa clock depends on it"
        ],
        source:
          "https://www.bristol.ac.uk/directory/visas/student-visa/cas/",
        confidence: "typical",
      },
      {
        id: "gb-atas",
        phase: "Visa & Permits",
        title: "Get the ATAS certificate (mandatory for CS and data subjects)",
        summary:
          "For computer science, AI and information systems at master's level, ATAS clearance is a hard precondition to the visa, and some universities require it even earlier. Certificates last 6 months, so timing matters in both directions.",
        offsetDays: 120,
        hardDeadline: true,
        dependsOn: ["gb-offer-accept"],
        tasks: [
          "Check whether your programme's CAH code triggers ATAS and whether you are an exempt nationality",
          "Apply as soon as you have your course code, before you request the CAS where required",
          "Expect the review to take longer between April and September than in other months",
          "If your visa application slips past 6 months from issue, request a new certificate before applying"
        ],
        source: "https://www.gov.uk/guidance/academic-technology-approval-scheme",
        confidence: "verified",
      },
      {
        id: "gb-cas",
        phase: "Visa & Permits",
        title: "Receive and verify your CAS",
        summary:
          "The CAS is the electronic document your visa application depends on. It is valid for only 6 months and cannot be reused, and universities usually take several working days to issue it.",
        offsetDays: 95,
        hardDeadline: true,
        dependsOn: ["gb-atas", "gb-offer-accept"],
        tasks: [
          "Request the CAS from your international office only once all conditions are met",
          "Check every CAS detail against your passport and application, especially course title and dates",
          "Note that some universities issue a CAS within 5 to 10 working days of an approved request",
          "Remember the 6-month validity; a stale CAS must be reissued and cannot be reused after a refusal"
        ],
        source:
          "https://www.bristol.ac.uk/directory/visas/student-visa/cas/",
        confidence: "verified",
      },
      {
        id: "gb-money",
        phase: "Visa & Permits",
        title: "Satisfy the financial requirement and the 28-day holding rule",
        summary:
          "You must hold the funds for 28 consecutive days and the closing date of that 28-day period must fall within 31 days of your visa application. GOV.UK rates maintenance at GBP 1,529 per month in London and GBP 1,171 per month outside London, for up to 9 months, on top of one year of tuition.",
        offsetDays: 60,
        hardDeadline: true,
        dependsOn: ["gb-cas"],
        tasks: [
          "Start the 28-day holding period so the closing date lands within 31 days of your intended application date",
          "Cover one year of tuition from the CAS plus the applicable monthly maintenance for up to 9 months",
          "Obtain a sponsor letter if a parent or sponsor funds you, plus their bank statements and proof of relationship",
          "Note that many nationalities listed by GOV.UK are exempt, though you can still be asked for evidence"
        ],
        source: "https://www.gov.uk/student-visa/money",
        confidence: "verified",
      },
      {
        id: "gb-ihs",
        phase: "Visa & Permits",
        title: "Pay the visa fee and the Immigration Health Surcharge",
        summary:
          "The Student visa fee is GBP 558 to apply from outside the UK, plus the Immigration Health Surcharge. The IHS amount is not verified in this file; read it from GOV.UK at the time you pay.",
        offsetDays: 55,
        hardDeadline: true,
        dependsOn: ["gb-money"],
        tasks: [
          "Pay the GBP 558 Student visa application fee online",
          "Pay the Immigration Health Surcharge for the full period of your permission to stay",
          "Save both receipts; you will reference the IHS reference number in the application",
          "Consider paid priority services if your start date is tight and they are offered at your centre"
        ],
        source: "https://www.gov.uk/student-visa",
        confidence: "verified",
      },
      {
        id: "gb-visa-apply",
        phase: "Visa & Permits",
        title: "Submit the Student visa application and attend biometrics",
        summary:
          "You may apply up to 6 months before the course start date on your CAS. Practically the clock starts at biometrics, so book the appointment early in peak season.",
        offsetDays: 48,
        hardDeadline: true,
        dependsOn: ["gb-cas", "gb-money", "gb-ihs"],
        tasks: [
          "Complete the online application and upload every document in one pass",
          "Book and attend a biometric appointment at the visa application centre for your country",
          "Expect to be interviewed as part of the genuine-student assessment, so prepare to study your subject",
          "Book the appointment well in advance; centres are busy between May and September"
        ],
        source:
          "https://students.leeds.ac.uk/visa-information-applying/doc/apply-visa-outside-uk",
        confidence: "verified",
      },
      {
        id: "gb-visa-decision",
        phase: "Visa & Permits",
        title: "Receive the visa decision and eVisa",
        summary:
          "GOV.UK states you will usually get a decision within 3 weeks when applying from outside the UK, and 8 weeks for in-country applications. It is a service standard, not a guarantee.",
        offsetDays: 28,
        hardDeadline: false,
        dependsOn: ["gb-visa-apply"],
        tasks: [
          "Respond to any request for more information the same day; the clock pauses while you do",
          "Receive the decision and access your eVisa through your UKVI account",
          "Do not book non-refundable flights until the visa is granted",
          "If the standard window passes with no decision, escalate rather than assume refusal"
        ],
        source: "https://www.gov.uk/student-visa/money",
        confidence: "verified",
      },
      {
        id: "gb-housing",
        phase: "Housing",
        title: "Apply for university or private housing",
        summary:
          "Housing deadlines are set by each university and are not published centrally, so treat this as a planning default and check your own programme's accommodation page directly.",
        offsetDays: 75,
        hardDeadline: false,
        dependsOn: ["gb-app-submit"],
        tasks: [
          "Register for university accommodation alerts the day your offer arrives",
          "Research private and guarantor-requirement options in parallel",
          "Check whether your university can refer you to approved private providers",
          "Have London versus non-London rent assumptions in your budget before you search"
        ],
        source: "https://www.gov.uk/student-visa",
        confidence: "estimate",
      },
      {
        id: "gb-pre-departure",
        phase: "Pre-Departure",
        title: "Pre-departure admin and arrival booking",
        summary:
          "You must arrive before your course start or latest arrival date or the CAS may be withdrawn, and your university will send arrival, orientation and enrolment instructions separately.",
        offsetDays: 12,
        hardDeadline: false,
        dependsOn: ["gb-visa-decision", "gb-housing"],
        tasks: [
          "Buy travel only after the visa decision and only once housing is confirmed",
          "Arrive before your stated course or latest arrival date",
          "Complete pre-arrival academic and immigration forms from your university",
          "Carry your eVisa reference, CAS details and proof of accommodation on arrival"
        ],
        source:
          "https://students.leeds.ac.uk/visa-information-applying/doc/apply-visa-outside-uk",
        confidence: "typical",
      },
    ],
  },

  /* ------------------------------------------------------------------ CANADA */
  {
    code: "CA",
    name: "Canada",
    admission: "rolling",
    intakes: [
      { id: "ca-winter-2027", label: "Winter 2027", startDate: "2027-01-18" },
      { id: "ca-fall-2027", label: "Fall 2027", startDate: "2027-09-07" },
      { id: "ca-winter-2028", label: "Winter 2028", startDate: "2028-01-17" },
      { id: "ca-fall-2028", label: "Fall 2028", startDate: "2028-09-05" },
    ],
    notes:
      "Canada is labelled rolling because most graduate programmes will keep considering applications while seats remain, but the dates that actually bind you are funding deadlines and departmental targets, not a single national deadline. Toronto's Computer Science department publishes a January 2027 date for September 2027 entry and warns that submitting early matters for scholarship consideration; Toronto Metropolitan University runs a first-consideration date of 22 January 2027 with a preferred international deadline of 1 December 2026 for Engineering, closing 12 March 2027. THE GOTCHA WE ENCODED MOST PROMINENTLY IS THE PAL/TAL FLIP. Canada's provincial attestation letter requirement arrived in 2024, was extended to master's and doctoral students in 2025, and was then REMOVED for master's and doctoral students at PUBLIC designated learning institutions from 1 January 2026. If you are applying to a master's at a public university you are exempt. If you are applying to a private college or a public institution's non-graduate programme you are not. This is the single most common piece of stale advice in circulation. THE SECOND GOTCHA IS THE STUDY PERMIT QUEUE. IRCC's service standard is 60 days, but as of 28 February 2026 eighty percent of new study permits were being finalised within 28 days, with a forward-looking expectation of 30 to 50 days. Country-level queues published in autumn 2026 ranged from roughly 4 weeks for the Philippines to about 9 weeks for Nigeria. That spread is why we plan a 75-day decision buffer. HONEST CAVEAT: IRCC raised proof-of-funds requirements for applications submitted on or after 1 September 2026, and we could NOT load the IRCC proof-of-funds page to confirm the new figure, so that milestone is marked 'typical' and you must read the amount yourself. A third trap worth knowing: University of Toronto's Ontario Graduate Scholarship requires an APPROVED study permit by the scholarship application deadline, so a study permit filed late can cost you funding as well as time.",
    milestones: [
      {
        id: "ca-profile-cv",
        phase: "Profile & Documents",
        title: "Build a North American CV and transcript set",
        summary:
          "Canadian graduate applications expect a short, dense CV plus full academic history including any study gaps, which visa and university reviewers both read.",
        offsetDays: 330,
        hardDeadline: false,
        dependsOn: [],
        tasks: [
          "Write a 2-page academic CV listing courses, grades, research and technical projects",
          "Order official transcripts from every institution attended",
          "Document any study gap longer than two months and be ready to explain it",
          "Arrange certified English translations for non-English transcripts"
        ],
        source: "https://www.torontomu.ca/graduate/future-students/application-dates/",
        confidence: "typical",
      },
      {
        id: "ca-shortlist",
        phase: "University Shortlist",
        title: "Shortlist programmes and identify public vs private DLI status",
        summary:
          "Whether your institution is a public DLI decides if you are exempt from the provincial attestation letter, so establish this before you build your timeline.",
        offsetDays: 300,
        hardDeadline: false,
        dependsOn: ["ca-profile-cv"],
        tasks: [
          "Shortlist 6-10 Canadian graduate programmes in CS, data science or a related field",
          "Confirm each institution is a designated learning institution and whether it is public or private",
          "For each programme, note whether it is course-based or requires a supervisor",
          "Record funding deadlines separately from admission deadlines, because they differ"
        ],
        source:
          "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/graduate-student/how-to-apply.html",
        confidence: "verified",
      },
      {
        id: "ca-english",
        phase: "English Proficiency",
        title: "Take IELTS or TOEFL to the CLB level your programme requires",
        summary:
          "Most Canadian master's programmes set a minimum band, commonly CLB 9 or above, and the visa assesses the same evidence independently. Aim above both floors.",
        offsetDays: 270,
        hardDeadline: true,
        dependsOn: [],
        tasks: [
          "Check the minimum IELTS or TOEFL score published by each shortlisted programme",
          "Book the test with results in hand 6 to 8 weeks before your earliest deadline",
          "Send official scores to the university's stated code as well as to IRCC",
          "Verify the language test validity window at IRCC, which is shorter than most universities'"
        ],
        source:
          "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents.html",
        confidence: "typical",
      },
      {
        id: "ca-supervisor",
        phase: "Personal Statement",
        title: "Secure a prospective supervisor",
        summary:
          "Many Canadian MSc programmes will not admit without supervisor support. Toronto's Computer Science department states that only applicants with support of a potential supervisor will be admitted into the programme.",
        offsetDays: 240,
        hardDeadline: false,
        dependsOn: ["ca-profile-cv", "ca-shortlist"],
        tasks: [
          "Read faculty publications and identify 4 to 6 genuinely aligned supervisors",
          "Email a short, specific note with one concrete overlap, not a generic request",
          "Ask directly whether they are accepting new MSc students for your target term",
          "Track responses; a supervisor who is silent usually means no, so start early"
        ],
        source:
          "https://csb.utoronto.ca/graduate-studies/prospective-students/admissions",
        confidence: "verified",
      },
      {
        id: "ca-sop",
        phase: "Personal Statement",
        title: "Write the statement of academic interest or research statement",
        summary:
          "Canadian graduate applications centre on a research narrative tied to a supervisor or lab, so write it as a research plan rather than a personal statement.",
        offsetDays: 230,
        hardDeadline: false,
        dependsOn: ["ca-shortlist", "ca-supervisor"],
        tasks: [
          "Draft a 3 to 5 page research proposal framing the question you want to work on",
          "Name the supervisor and lab in the opening paragraph",
          "Include prior relevant coursework and any research or engineering work",
          "Cut to each programme's stated word or page limit"
        ],
        source: "https://ims.utoronto.ca/application-deadlines-and-requirements",
        confidence: "typical",
      },
      {
        id: "ca-references",
        phase: "Recommendations",
        title: "Arrange 2-3 reference letters",
        summary:
          "Toronto Metropolitan states applications are only reviewed once all required documents are submitted including letters of recommendation, so a missing letter stops the file dead.",
        offsetDays: 235,
        hardDeadline: false,
        dependsOn: ["ca-profile-cv"],
        tasks: [
          "Request references at least 8 weeks before your deadline",
          "Send referees your CV, the research statement and the exact deadline",
          "Confirm whether the university needs referees to use an online system or post sealed letters",
          "Check in at the three-week mark; an incomplete file is not reviewed"
        ],
        source:
          "https://www.torontomu.ca/graduate/future-students/application-dates/",
        confidence: "verified",
      },
      {
        id: "ca-funding-apps",
        phase: "Scholarships & Funding",
        title: "Apply for graduate funding on the earlier funding calendar",
        summary:
          "Funding deadlines routinely precede admission deadlines. Toronto Metropolitan tells international applicants to submit by 1 December 2026 for preference on graduate financial support, and Toronto explicitly recommends early application for scholarship consideration.",
        offsetDays: 240,
        hardDeadline: true,
        dependsOn: ["ca-profile-cv", "ca-shortlist"],
        tasks: [
          "Build a single calendar of every funding deadline for your shortlisted programmes",
          "Submit funding applications on their own deadlines, not on the admission deadline",
          "Include funding interest in your main application if the university asks for it there",
          "Check whether the award requires you to hold an approved study permit by its deadline"
        ],
        source:
          "https://www.torontomu.ca/graduate/future-students/application-dates/",
        confidence: "verified",
      },
      {
        id: "ca-app-submit",
        phase: "Application Submission",
        title: "Submit SGS applications before departmental targets fill",
        summary:
          "Toronto's Computer Science department opened applications for September 2027 on 12 November 2026 and requires completed applications with all supporting documents by 25 January 2027, while noting applications may close once departmental targets are met.",
        offsetDays: 225,
        hardDeadline: true,
        dependsOn: [
          "ca-english",
          "ca-sop",
          "ca-references",
          "ca-supervisor",
          "ca-funding-apps",
        ],
        tasks: [
          "Submit each programme's application before its stated departmental deadline",
          "Upload every document in the same session; incomplete files are not assessed",
          "Pay the graduate application fee and keep the receipt",
          "Watch for programmes that close their intake early once capacity is reached"
        ],
        source:
          "https://csb.utoronto.ca/graduate-studics/prospective-students/admissions",
        confidence: "verified",
      },
      {
        id: "ca-offer-accept",
        phase: "Offer & Enrolment",
        title: "Accept the offer, pay tuition and obtain the Letter of Acceptance",
        summary:
          "In most cases you must accept your offer and pay tuition, in whole or in part, before the school can issue the letter of acceptance that your study permit application requires.",
        offsetDays: 150,
        hardDeadline: true,
        dependsOn: ["ca-app-submit"],
        tasks: [
          "Compare offers and accept your single choice within the stated window",
          "Pay the tuition deposit or instalment your institution requires",
          "Request the Letter of Acceptance and verify the programme, dates and address match your application",
          "Keep the offer letter; it is evidence for the study permit"
        ],
        source:
          "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents.html",
        confidence: "verified",
      },
      {
        id: "ca-pal-check",
        phase: "Visa & Permits",
        title: "Confirm your PAL/TAL status (masters at a public DLI are exempt)",
        summary:
          "From 1 January 2026, master's and doctoral students enrolling at a PUBLIC designated learning institution no longer need a provincial or territorial attestation letter. Undergraduates, private-college students and non-degree programmes still do.",
        offsetDays: 140,
        hardDeadline: true,
        dependsOn: ["ca-offer-accept"],
        tasks: [
          "Verify from the IRCC page whether your programme and institution make you PAL/TAL exempt",
          "If not exempt, request the attestation letter through your school, since you do not apply to the province directly",
          "Upload the attestation letter in your study permit application if you have one",
          "Include a short written note explaining your exemption if you believe you qualify"
        ],
        source:
          "https://www.canada.ca/en/immigration-refugees-citizenship/news/notices/2026-provincial-territorial-allocations-under-international-student-cap.html",
        confidence: "verified",
      },
      {
        id: "ca-proof-funds",
        phase: "Visa & Permits",
        title: "Assemble proof of financial support",
        summary:
          "You must show funds for tuition plus living costs. IRCC raised these thresholds for applications submitted on or after 1 September 2026 and we could not load the primary page to confirm the new figure, so read the current amount yourself.",
        offsetDays: 120,
        hardDeadline: true,
        dependsOn: ["ca-pal-check"],
        tasks: [
          "Read the current IRCC proof-of-funds amount, including the September 2026 increase",
          "Produce bank statements covering the required period in your name or a sponsor's",
          "Add a letter from your sponsor if a third party is funding you",
          "Confirm the amount covers the first year of your programme, not your whole course"
        ],
        source:
          "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/proof-financial-support.html",
        confidence: "typical",
      },
      {
        id: "ca-study-permit",
        phase: "Visa & Permits",
        title: "Submit the study permit application",
        summary:
          "IRCC's service standard for a study permit is 60 days. File only once the Letter of Acceptance, proof of funds and any attestation letter are all in place, because an incomplete file resets your place in the queue.",
        offsetDays: 110,
        hardDeadline: true,
        dependsOn: ["ca-proof-funds"],
        tasks: [
          "Create an IRCC account and complete the digital application in one sitting",
          "Upload the Letter of Acceptance, proof of funds and PAL/TAL or exemption note",
          "Complete the study plan describing why Canada, why this programme and what you will do after",
          "Book biometrics and pay the biometrics and permit fees before the fee deadline"
        ],
        source:
          "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html",
        confidence: "verified",
      },
      {
        id: "ca-permit-decision",
        phase: "Visa & Permits",
        title: "Receive the study permit",
        summary:
          "As of 28 February 2026, eighty percent of new study permits were being processed in 28 days or less against a 60-day standard, with a forward-looking expectation of 30 to 50 days. Country queues in autumn 2026 ranged from about 4 weeks to about 9 weeks.",
        offsetDays: 75,
        hardDeadline: false,
        dependsOn: ["ca-study-permit"],
        tasks: [
          "Check your own country's current processing estimate in the IRCC processing times tool",
          "Respond to document requests the same day, since the queue does not pause politely",
          "Plan for the tail: some files take far longer than the eighty-percent figure",
          "If your start date is close, ask whether an expedite request is available and justified"
        ],
        source:
          "https://www.canada.ca/content/dam/ircc/documents/pdf/english/corporate/transparency/secu-binder/processing-times-service-delivery.pdf",
        confidence: "verified",
      },
      {
        id: "ca-housing",
        phase: "Housing",
        title: "Secure housing",
        summary:
          "Many Canadian universities guarantee housing for incoming undergraduates but not for graduate students, so apply early and treat the deadline as university-set rather than centrally published.",
        offsetDays: 90,
        hardDeadline: false,
        dependsOn: ["ca-offer-accept"],
        tasks: [
          "Check whether your institution guarantees graduate housing and what the application deadline is",
          "Compare residence cost against shared rental accommodation near campus",
          "Budget for first-term and last-month deposits, which are often due before term starts",
          "Ask about a guaranteed-housing form, which some graduate faculties require for funding purposes"
        ],
        source:
          "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html",
        confidence: "estimate",
      },
      {
        id: "ca-pre-departure",
        phase: "Pre-Departure",
        title: "Pre-departure documents and arrival",
        summary:
          "Carry your study permit, Letter of Acceptance and proof of accommodation. Many Indian, Pakistani and Nigerian applicants are advised to complete their medical examination in advance because of queue length.",
        offsetDays: 12,
        hardDeadline: false,
        dependsOn: ["ca-permit-decision", "ca-housing"],
        tasks: [
          "Verify the permit expiry date and condition count against your programme length",
          "Complete any required medical examination early if your country has a long queue",
          "Arrange first-night accommodation before booking anything non-refundable",
          "Travel with printed copies of your permit, LOA and housing confirmation"
        ],
        source:
          "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html",
        confidence: "typical",
      },
    ],
  },

  /* ------------------------------------------------------------------ AUSTRALIA */
  {
    code: "AU",
    name: "Australia",
    admission: "rolling",
    intakes: [
      { id: "au-sem1-2027", label: "Semester 1 (February) 2027", startDate: "2027-02-01" },
      { id: "au-sem2-2027", label: "Semester 2 (July) 2027", startDate: "2027-07-05" },
      { id: "au-sem1-2028", label: "Semester 1 (February) 2028", startDate: "2028-01-31" },
      { id: "au-sem2-2028", label: "Semester 2 (July) 2028", startDate: "2028-07-03" },
    ],
    notes:
      "A note on terminology, because it causes real confusion: the old Genuine Temporary Entrant requirement was REPLACED by the Genuine Student (GS) requirement for all student visa applications lodged on or after 23 March 2024. GS is not a separate essay you attach; Home Affairs states it prefers answers to a short list of questions in the online application form, capped at 150 words per response, and that it gives more weight to statements supported by documentary evidence. The other acronym students conflate with this is OSHC, Overseas Student Health Cover, which is an entirely separate and hard visa condition. We have encoded both. ADMISSION MODEL CAVEAT: Australian postgraduate applications are semi-rolling and the deadline structure varies enormously. The University of Adelaide-style end-of-August Semester 1 deadline is common, but the ANU publishes 15 December 2026 for Semester 1 2027 and 15 May 2027 for Semester 2 2027, with acceptance deadlines of 15 January and 30 June respectively for applicants overseas. That is roughly four months before an ANU Semester 1 start, which means our single 150-day submission offset is a deliberate compromise set at the EARLY end of the real range. If you are applying to ANU or to any university with a late cycle you have more time than this file assumes; if you are applying somewhere with an August deadline, you have less. THE BIGGEST GOTCHA IS EVIDENCE, NOT PAPERWORK. Home Affairs weighs GS answers against a broader picture of your circumstances, immigration history and expected earnings in your home country, and asks for transcripts, study history including gaps over two months, employment and financial evidence. A well-evidenced answer outperforms a eloquent one. HOUSING NOTE: there is no national housing deadline and the whole Australian timeline has been compressed here to February and July intakes only; many Australian programmes also run a third mid-year intake.",
    milestones: [
      {
        id: "au-profile-cv",
        phase: "Profile & Documents",
        title: "Build an academic record plus a documented study history",
        summary:
          "Unlike most countries, your academic history is evidence for the visa as well as for admission. Home Affairs asks for transcripts, study dates, providers, and reasons for any change of course or gaps over two months.",
        offsetDays: 310,
        hardDeadline: false,
        dependsOn: [],
        tasks: [
          "Write a 2 to 3 page academic CV with a clear technical and project focus",
          "Collect official transcripts and certificates of attainment for every qualification",
          "Write a one-paragraph explanation for every study gap longer than two months",
          "Compile proof of current employment, family ties and economic circumstances for the visa"
        ],
        source:
          "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/genuine-student-requirement",
        confidence: "verified",
      },
      {
        id: "au-english",
        phase: "English Proficiency",
        title: "Meet the English requirement for the visa and the programme",
        summary:
          "Home Affairs accepts a defined set of tests taken at a secure test centre, and tests taken on or after 7 August 2025 are assessed under an updated accepted-test list, so confirm your test is still on it.",
        offsetDays: 270,
        hardDeadline: true,
        dependsOn: [],
        tasks: [
          "Confirm your IELTS, PTE or TOEFL test appears on Home Affairs' current accepted-test list",
          "Book the test with results in hand at least 8 weeks before your university deadline",
          "Check the programme's own English requirement, which is often stricter than the visa minimum",
          "Provide the booking confirmation as well as the results, since Home Affairs asks for both"
        ],
        source:
          "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
        confidence: "typical",
      },
      {
        id: "au-shortlist",
        phase: "University Shortlist",
        title: "Shortlist providers and check CRICOS enrolment and intake dates",
        summary:
          "You must be enrolled in a CRICOS-registered course and hold a Confirmation of Enrolment before a student visa can be granted, so provider and intake selection drives everything downstream.",
        offsetDays: 295,
        hardDeadline: false,
        dependsOn: ["au-profile-cv"],
        tasks: [
          "Shortlist 5 to 8 Australian providers offering your target CS or data programme",
          "Confirm each provider is CRICOS registered and the course appears on the CRICOS register",
          "Note each provider's application deadline and any separate scholarship round deadline",
          "Check the published course duration, because it determines your visa length and cost"
        ],
        source:
          "https://www.studyaustralia.gov.au/en/plan-your-move/plan-your-study",
        confidence: "typical",
      },
      {
        id: "au-sop",
        phase: "Personal Statement",
        title: "Write the course-specific statement of purpose",
        summary:
          "The university personal statement and the visa's GS questions are different documents with different audiences. Write the university one about fit; the GS one about circumstance.",
        offsetDays: 210,
        hardDeadline: false,
        dependsOn: ["au-shortlist", "au-profile-cv"],
        tasks: [
          "Write a university statement explaining why this course and this provider specifically",
          "Tailor it per provider; identical statements are widely noticed and poorly received",
          "Keep the visa GS answers separate so they do not contaminate the university essay",
          "Draft the GS answers now as an evidenced list, even though the form opens later"
        ],
        source:
          "https://www.studyaustralia.gov.au/en/plan-your-move/visa-application-process",
        confidence: "typical",
      },
      {
        id: "au-references",
        phase: "Recommendations",
        title: "Obtain academic references and transcripts for the provider",
        summary:
          "Provider requirements vary from none to two academic referees for coursework master's, so confirm the exact requirement per provider rather than assuming.",
        offsetDays: 225,
        hardDeadline: false,
        dependsOn: ["au-profile-cv"],
        tasks: [
          "Check each provider's published reference requirement for coursework master's",
          "Request references 6 to 8 weeks before your earliest deadline",
          "Supply referees with your CV and the course rationale",
          "Use official transcripts sent directly by the issuing institution where required"
        ],
        source:
          "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
        confidence: "typical",
      },
      {
        id: "au-app-submit",
        phase: "Application Submission",
        title: "Submit the university application",
        summary:
          "Semester deadlines vary enormously between providers. The ANU published 15 December 2026 for Semester 1 2027 and 15 May 2027 for Semester 2 2027, so the real deadline for your school may be much earlier or later than our offset assumes.",
        offsetDays: 150,
        hardDeadline: true,
        dependsOn: ["au-english", "au-sop", "au-references", "au-shortlist"],
        tasks: [
          "Check your specific provider's published deadline for your specific semester",
          "Submit before the earlier of your scholarship deadline or your admission deadline",
          "Pay the application fee, which is non-refundable, and keep the receipt",
          "If your provider requires an English test result attached, upload the result page not just the score"
        ],
        source: "https://study.anu.edu.au/apply/international-applications",
        confidence: "verified",
      },
      {
        id: "au-scholarships",
        phase: "Scholarships & Funding",
        title: "Apply for provider and government scholarships",
        summary:
          "Scholarship rounds frequently close earlier than course application deadlines, and Australian Government awards are separate applications with their own closing dates. Plan a second, earlier calendar.",
        offsetDays: 180,
        hardDeadline: true,
        dependsOn: ["au-shortlist", "au-app-submit"],
        tasks: [
          "List every scholarship round for each shortlisted provider with its own closing date",
          "Check whether scholarship applications require a separate form or a flag on the main application",
          "Track Study Australia and Endeavour-style government award deadlines separately",
          "Prioritise scholarships that are assessed on academic merit rather than need"
        ],
        source: "https://study.anu.edu.au/apply/international-applications",
        confidence: "typical",
      },
      {
        id: "au-offer-accept",
        phase: "Offer & Enrolment",
        title: "Accept the offer, pay fees and obtain the CoE",
        summary:
          "Home Affairs requires a current Confirmation of Enrolment for a student visa, and the CoE is issued by your provider after you accept and pay, not by you.",
        offsetDays: 120,
        hardDeadline: true,
        dependsOn: ["au-app-submit", "au-scholarships"],
        tasks: [
          "Accept the offer within the stated window and pay the required enrolment fees",
          "Wait for the provider to issue the Confirmation of Enrolment with the correct course and dates",
          "Check the CoE start and end dates, because they drive your visa length and your OSHC period",
          "Respond fast to any academic condition outstanding at this point"
        ],
        source:
          "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
        confidence: "verified",
      },
      {
        id: "au-oshc",
        phase: "Visa & Permits",
        title: "Buy Overseas Student Health Cover",
        summary:
          "Home Affairs states you must obtain OSHC for yourself and any dependants from at least one week before your course starts and for the full duration of your stay. It is a refusal risk if you cannot evidence it.",
        offsetDays: 95,
        hardDeadline: true,
        dependsOn: ["au-offer-accept"],
        tasks: [
          "Compare OSHC providers on student visa compliance rather than price alone",
          "Cover from at least one week before the course start date stated on your CoE",
          "Cover the entire duration of your stay including any leave periods",
          "Upload the policy certificate and membership confirmation with your visa application"
        ],
        source:
          "https://immi.homeaffairs.gov.au/visas/web-evidentiary-tool",
        confidence: "verified",
      },
      {
        id: "au-financial-capacity",
        phase: "Visa & Permits",
        title: "Evidence financial capacity",
        summary:
          "Study Australia states international student visa applicants must provide proof of at least AUD 29,710, covering travel, twelve months of living expenses and tuition.",
        offsetDays: 80,
        hardDeadline: true,
        dependsOn: ["au-offer-accept"],
        tasks: [
          "Confirm the current threshold on the Home Affairs site before you assemble evidence, since it is indexed",
          "Show funds for travel, 12 months of living expenses and tuition for you and any dependants",
          "Use bank statements in your name, or a sponsor's income evidence if a parent is funding you",
          "Include evidence for any school-aged dependants' costs if they accompany you"
        ],
        source:
          "https://www.studyaustralia.gov.au/en/plan-your-move/visa-application-process",
        confidence: "verified",
      },
      {
        id: "au-gs-requirement",
        phase: "Visa & Permits",
        title: "Answer the Genuine Student questions and attach evidence",
        summary:
          "GS replaced GTE for applications lodged on or after 23 March 2024. Home Affairs prefers answers to four in-form questions with a 150-word limit each, plus supporting documents uploaded to ImmiAccount.",
        offsetDays: 75,
        hardDeadline: true,
        dependsOn: ["au-offer-accept", "au-financial-capacity"],
        tasks: [
          "Answer each GS question within 150 words, in English, and only in the form",
          "Explain why this course at this provider, including your understanding of the course requirements",
          "Explain how completing the course benefits you, and give your circumstances and study history",
          "Upload evidence: transcripts, study history with gaps, employment, and immigration history"
        ],
        source:
          "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/genuine-student-requirement",
        confidence: "verified",
      },
      {
        id: "au-visa-lodge",
        phase: "Visa & Permits",
        title: "Lodge the subclass 500 application in ImmiAccount",
        summary:
          "Lodge online with the CoE, OSHC, financial capacity and GS answers in place. Home Affairs warns explicitly that a missing or inconsistent document is the main cause of delay and refusal.",
        offsetDays: 65,
        hardDeadline: true,
        dependsOn: ["au-oshc", "au-financial-capacity", "au-gs-requirement"],
        tasks: [
          "Create your ImmiAccount early and confirm the identity details match your passport",
          "Upload the CoE, OSHC certificate and financial capacity evidence",
          "Provide English translations with translator details for all non-English documents",
          "Complete any required health examination through My Health Declaration"
        ],
        source:
          "https://immi.homeaffairs.gov.au/check-twice-submit-once-subsite/Pages/applying-student-visa.aspx",
        confidence: "verified",
      },
      {
        id: "au-visa-decision",
        phase: "Visa & Permits",
        title: "Receive the visa grant and check the conditions",
        summary:
          "Once granted you receive a visa grant notice that records your course, provider and visa expiry. Mismatches between the grant notice and your enrolment are a common cause of later trouble.",
        offsetDays: 30,
        hardDeadline: false,
        dependsOn: ["au-visa-lodge"],
        tasks: [
          "Read the grant notice carefully, checking course, provider and expiry date",
          "Confirm the visa covers your full programme plus any planned leave",
          "Keep the grant notice accessible, since your provider will ask for it at enrolment",
          "Ask your provider what to do if your course details change after you have been granted the visa"
        ],
        source:
          "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
        confidence: "typical",
      },
      {
        id: "au-housing",
        phase: "Housing",
        title: "Apply for housing or private rental",
        summary:
          "Housing deadlines are set by each university and are not published centrally, so treat this as a planning default. On-campus places at popular providers are genuinely scarce.",
        offsetDays: 85,
        hardDeadline: false,
        dependsOn: ["au-offer-accept"],
        tasks: [
          "Register for the provider's housing portal the day your enrolment is confirmed",
          "Check whether a bond, identification or a guarantor is needed to book off-campus",
          "Budget realistic weekly rent near campus rather than a city-wide average",
          "Be alert to the well-documented housing scarcity in Australian cities at the start of semester"
        ],
        source:
          "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
        confidence: "estimate",
      },
      {
        id: "au-pre-departure",
        phase: "Pre-Departure",
        title: "Pre-departure checks and arrival",
        summary:
          "Confirm your OSHC is active for your arrival date, keep your grant notice and CoE with you, and check whether your provider requires an arrival window in writing.",
        offsetDays: 10,
        hardDeadline: false,
        dependsOn: ["au-visa-decision", "au-housing"],
        tasks: [
          "Verify your OSHC policy start date covers your arrival date",
          "Carry your visa grant notice, CoE and enrolment confirmation on arrival",
          "Complete any provider pre-arrival online modules and enrolment steps",
          "Check current entry and public health requirements before departure, as these change"
        ],
        source:
          "https://www.studyaustralia.gov.au/en/plan-your-move/visa-application-process",
        confidence: "typical",
      },
    ],
  },

  /* ------------------------------------------------------------------ GERMANY */
  {
    code: "DE",
    name: "Germany",
    admission: "fixed",
    intakes: [
      { id: "de-ss-2027", label: "Summer Semester 2027", startDate: "2027-04-15" },
      { id: "de-ws-2027", label: "Winter Semester 2027", startDate: "2027-10-01" },
      { id: "de-ss-2028", label: "Summer Semester 2028", startDate: "2028-04-15" },
      { id: "de-ws-2028", label: "Winter Semester 2028", startDate: "2028-10-01" },
    ],
    notes:
      "Germany is mostly fixed-deadline for master's programmes and the dates are genuinely different from the Anglophone pattern: winter semester starts in October and summer in mid-April, not in September and February. The TUM Informatics MSc publishes an application window of 1 February to 31 May for winter and 1 October to 30 November for summer, so our 123-day offset for a 1 October winter start is a genuine verified anchor rather than a guess. Note that some providers, notably uni-assist, batch applications: uni-assist's own published winter window for non-EU applicants is 1 March to 1 June. THE GOTCHA WE ENCODED MOST PROMINENTLY IS PROOF OF FINANCING. A German national D student visa requires a blocked account (Sperrkonto) of at least EUR 11,904 with a maximum monthly disposal amount of EUR 992, per the German Foreign Office checklist. Money is the single most common refusal reason, and a certificate showing a balance below the minimum after transfer fees is rejected on sight. Alternatives exist and are accepted by many missions: a qualifying scholarship at a matching monthly rate, a Verpflichtungserklärung signed by a German resident at their local foreigners' office, or a German bank guarantee. Parental bank statements alone are NOT accepted at most missions however large the balance. Second gotcha, and country-specific in a way that catches Indian, Chinese and Vietnamese applicants specifically: the APS certificate. APS India states it cannot give a fixed processing time and recommends planning 3 to 4 months; APS also notes that from Summer Semester 2027 certain Indian master's applicants in engineering, commerce and management must additionally submit a Digital Master Test (dMAT) certificate with their APS documents, a requirement that did not exist before June 2026. Third, housing: student accommodation in German cities is genuinely scarce and is allocated, so treat it as a live risk rather than a checklist step.",
    milestones: [
      {
        id: "de-anabin",
        phase: "Profile & Documents",
        title: "Check anabin recognition for your degree and university",
        summary:
          "Before anything else, confirm your qualification is recognised in the anabin database. If your institution is not H+ status, a German university may not admit you at all and no amount of good documentation will fix it.",
        offsetDays: 340,
        hardDeadline: false,
        dependsOn: [],
        tasks: [
          "Search anabin for your university and check its H+ or H- status",
          "Confirm your specific degree and the grading scale are listed as comparable",
          "If status is H- only, contact the university's admissions office before applying anywhere",
          "Keep the anabin screenshot; it is useful evidence in a visa interview"
        ],
        source:
          "https://www.make-it-in-germany.com/en/working-in-germany/recognition/foreign-academic-qualifications",
        confidence: "typical",
      },
      {
        id: "de-aps",
        phase: "Profile & Documents",
        title: "Obtain the APS certificate (India, China, Vietnam applicants)",
        summary:
          "APS verification is required for applicants who gained their qualification in India, China or Vietnam. APS India states it cannot provide a fixed processing time and advises planning three to four months, and from Summer Semester 2027 some master's applicants must also pass the dMAT.",
        offsetDays: 300,
        hardDeadline: true,
        dependsOn: ["de-anabin"],
        tasks: [
          "Apply to APS India, APS China or APS Vietnam well before your university deadline",
          "Expect document verification to depend on how quickly your school, board and university respond",
          "If you are an Indian master's applicant in engineering, commerce or management, check whether a dMAT certificate is required for your term",
          "Use the digital APS certificate where offered; it is accepted by missions, uni-assist and universities"
        ],
        source: "https://aps-india.de/faqs/",
        confidence: "verified",
      },
      {
        id: "de-profile-cv",
        phase: "Profile & Documents",
        title: "Prepare Lebenslauf, transcripts and degree certificates",
        summary:
          "German applications expect a structured tabular CV (Lebenslauf), full transcripts with credits, and your degree certificate. Where your qualification is not in an English-speaking country, certified translations matter.",
        offsetDays: 285,
        hardDeadline: false,
        dependsOn: ["de-anabin"],
        tasks: [
          "Build a tabular CV in the German or standard European format",
          "Order transcripts with credit weighting and your degree certificate",
          "Arrange certified translations of non-German documents",
          "Collect evidence of any relevant work experience, which many informatics master's value"
        ],
        source: "https://www.uni-assist.de/en/",
        confidence: "typical",
      },
      {
        id: "de-english",
        phase: "English Proficiency",
        title: "Prove English or German proficiency",
        summary:
          "English-taught informatics master's need TOEFL, IELTS or an equivalent. Be aware TOEFL moved to a 1-6 scale for tests taken from 21 January 2026, so providers publish two different minimums and you must quote the right one for your test date.",
        offsetDays: 265,
        hardDeadline: true,
        dependsOn: [],
        tasks: [
          "Check whether your target programme requires English or German, or accepts either",
          "Book IELTS or TOEFL with results in hand 6 to 8 weeks before your deadline",
          "Quote the correct TOEFL minimum based on your test date, since the scale changed on 21 January 2026",
          "Note that a degree taught in English is not sufficient evidence on its own for most providers"
        ],
        source: "https://www.uni-assist.de/en/",
        confidence: "typical",
      },
      {
        id: "de-shortlist",
        phase: "University Shortlist",
        title: "Shortlist programmes and check admission type and uni-assist",
        summary:
          "German master's split into admission-restricted (-NC) and admission-free programmes, and many non-EU applicants must apply through uni-assist. Which category you are in changes your deadline and your strategy completely.",
        offsetDays: 300,
        hardDeadline: false,
        dependsOn: ["de-anabin"],
        tasks: [
          "Identify whether each programme is admission-restricted or admission-free",
          "Check whether the provider requires application through uni-assist",
          "Check whether you also meet the subject-specific requirements of the German school",
          "Compare tuition status, since some states charge non-EU tuition per semester"
        ],
        source: "https://www.uni-assist.de/en/",
        confidence: "typical",
      },
      {
        id: "de-references",
        phase: "Recommendations",
        title: "Collect academic references",
        summary:
          "Reference requirements are programme-specific in Germany and often lighter than in the UK or US, but competitive informatics master's and any university requiring a gutachter procedure will ask for them.",
        offsetDays: 215,
        hardDeadline: false,
        dependsOn: ["de-profile-cv"],
        tasks: [
          "Check the exact reference requirement on each programme page",
          "Where referees are required, approach academic supervisors who know your technical work",
          "Use the university's own reference form if one is supplied",
          "Allow 4 to 6 weeks for a referee to respond"
        ],
        source: "https://www.uni-assist.de/en/",
        confidence: "typical",
      },
      {
        id: "de-sop",
        phase: "Personal Statement",
        title: "Write the motivation letter (Motivationsschreiben)",
        summary:
          "The German motivation letter is more formal and more specific than a British personal statement. It is expected even where a CV and transcript look strong.",
        offsetDays: 210,
        hardDeadline: false,
        dependsOn: ["de-shortlist", "de-profile-cv"],
        tasks: [
          "Draft a 1 to 2 page motivation letter addressed to the specific programme",
          "Explain why Germany, why this university and why this programme, concretely",
          "Connect your prior degree and any work experience to the programme's content",
          "Produce a tailored version per university you apply to"
        ],
        source: "https://www.uni-assist.de/en/",
        confidence: "typical",
      },
      {
        id: "de-app-submit",
        phase: "Application Submission",
        title: "Submit through uni-assist or the university's portal before the window closes",
        summary:
          "The TUM Informatics MSc window is 1 February to 31 May for the winter semester, which is 123 days before an October start, and uni-assist runs its own batch window of 1 March to 1 June for non-EU winter applicants.",
        offsetDays: 123,
        hardDeadline: true,
        dependsOn: ["de-aps", "de-english", "de-sop", "de-references", "de-profile-cv"],
        tasks: [
          "Submit via uni-assist if the programme requires it, and pay the uni-assist processing fee",
          "Submit before the window closes; German deadlines are firm and rarely flexible",
          "Upload certified translations with every non-German document",
          "Confirm your anabin-relevant qualification details match your uploaded documents exactly"
        ],
        source:
          "https://www.tum.de/en/studies/degree-programs/detail/informatics-master-of-science-msc",
        confidence: "verified",
      },
      {
        id: "de-admission",
        phase: "Offer & Enrolment",
        title: "Receive admission, accept and pay the semester contribution",
        summary:
          "Admission arrives by post or portal within weeks of a complete application. Enrolment requires paying the semester contribution, and in tuition-charging states also the tuition fee for non-EU students.",
        offsetDays: 95,
        hardDeadline: true,
        dependsOn: ["de-app-submit"],
        tasks: [
          "Respond to your admission letter within its stated acceptance window",
          "Pay the semester contribution and any non-EU tuition for your state",
          "Complete enrolment to receive your student status and immatriculation proof",
          "Keep the admission letter; your visa application must be consistent with it"
        ],
        source:
          "https://www.tum.de/en/studies/application/master",
        confidence: "typical",
      },
      {
        id: "de-housing",
        phase: "Housing",
        title: "Apply for a student residence place",
        summary:
          "Student housing in Germany is genuinely scarce and typically allocated, with no national deadline. Apply to your university residence and several city providers in parallel the moment you have your admission.",
        offsetDays: 100,
        hardDeadline: false,
        dependsOn: ["de-admission"],
        tasks: [
          "Apply to your university's student residence service immediately after admission",
          "Register on city and state housing portals, which is usually the faster route to a room",
          "Have proof of admission or a contract-ready status ready to submit",
          "Keep a realistic budget for the interim period in a hotel or hostel if housing is not secured"
        ],
        source: "https://www.make-it-in-germany.com/en/study/study-in-germany",
        confidence: "estimate",
      },
      {
        id: "de-blocked-account",
        phase: "Visa & Permits",
        title: "Open and fund the blocked account (Sperrkonto)",
        summary:
          "The German Foreign Office requires proof of a credit balance in the form of a blocked account of at least EUR 11,904 with a maximum monthly disposal amount of EUR 992. This is the most common single reason German student visas are refused.",
        offsetDays: 75,
        hardDeadline: true,
        dependsOn: ["de-admission"],
        tasks: [
          "Open a Sperrkonto with a provider your German mission accepts, such as Expatrio or Fintiba",
          "Transfer at least EUR 11,904, ideally slightly more so transfer fees do not pull you under",
          "Download the blocking confirmation certificate once the full amount has cleared",
          "If you hold a qualifying scholarship, a Verpflichtungserklärung or a German bank guarantee, check whether your mission accepts it instead"
        ],
        source:
          "https://polen.diplo.de/pl-de/03-service/03-02-visainfo-eng/2581464-2581464",
        confidence: "verified",
      },
      {
        id: "de-visa-appointment",
        phase: "Visa & Permits",
        title: "Attend the national D visa appointment at your German mission",
        summary:
          "You apply for a national long-stay visa covering your home state, not a Schengen visa, and you must attend in person with the full document set including the blocked account confirmation and health insurance proof.",
        offsetDays: 55,
        hardDeadline: true,
        dependsOn: ["de-blocked-account"],
        tasks: [
          "Book the earliest available appointment at the mission responsible for your home state",
          "Arrange travel or statutory health insurance valid in Germany and pay the EUR 75 visa fee",
          "Bring passport, admission letter, blocked account confirmation, APS certificate where required, and transcripts",
          "Expect processing to take several weeks; plan for a 6 to 12 week window before departure"
        ],
        source:
          "https://polen.diplo.de/pl-de/03-service/03-02-visainfo-eng/2581464-2581464",
        confidence: "typical",
      },
      {
        id: "de-visa-decision",
        phase: "Visa & Permits",
        title: "Receive the visa and plan your arrival",
        summary:
          "Once the visa is issued you must arrive within a fixed validity window and then, on arrival, register your address and apply for the residence permit within the first weeks. Do not assume the national visa itself is your residence permit.",
        offsetDays: 25,
        hardDeadline: false,
        dependsOn: ["de-visa-appointment"],
        tasks: [
          "Check the visa's validity window and arrive within it",
          "Carry your admission, blocked account confirmation and proof of housing",
          "Book travel only after the visa is in your hand, not on the appointment date",
          "Budget for the semester contribution and any tuition due before or at enrolment"
        ],
        source:
          "https://www.make-it-in-germany.com/en/working-in-germany/recognition/foreign-academic-qualifications",
        confidence: "estimate",
      },
      {
        id: "de-arrival-registration",
        phase: "Pre-Departure",
        title: "Register your address and apply for the residence permit",
        summary:
          "After arrival you register your address with the local Bürgeramt and then apply for the Aufenthaltstitel student residence permit, which is the document that actually authorises your stay and working hours.",
        offsetDays: -21,
        hardDeadline: true,
        dependsOn: ["de-visa-decision"],
        tasks: [
          "Register your address with the Bürgeramt, usually within 14 days of arriving",
          "Activate your blocked account once you have a German address and a local bank account",
          "Apply for the student residence permit at the local foreigners' office within the required window",
          "Carry your national visa, admission letter and confirmation of registration"
        ],
        source: "https://www.make-it-in-germany.com/en/working-in-germany/recognition/foreign-academic-qualifications",
        confidence: "typical",
      },
    ],
  },

  /* ------------------------------------------------------------------ FRANCE */
  {
    code: "FR",
    name: "France",
    admission: "fixed",
    intakes: [
      { id: "fr-sep-2027", label: "September 2027", startDate: "2027-09-15" },
      { id: "fr-oct-2027", label: "October 2027", startDate: "2027-10-04" },
      { id: "fr-feb-2028", label: "February 2028", startDate: "2028-02-15" },
      { id: "fr-sep-2028", label: "September 2028", startDate: "2028-09-12" },
    ],
    notes:
      "French master's admissions are a hybrid that people routinely describe as either fixed or rolling, and the description is only half right. Application itself runs through national platforms such as Monmaster or a university admissions service for many programmes, so the window is bounded and dead dates do pass. But the visa chain is rigidly sequenced, and it is the sequencing that breaks students. THE GOTCHA WE ENCODED IS THE CAMPUS FRANCE PRE-CONSULAR STEP. Campus France states that all students studying in France for 90 days or more must complete the Études en France pre-consular application before the student visa process, and its published guidance recommends beginning it 10 to 12 weeks before departure, with review taking 3 days to 3 weeks depending on the file. You cannot apply for the visa without it, and the TLS consular appointment can only be booked within 6 months of your programme start. TWO NEW 2026 RULES THAT CHANGED STUDENT BEHAVIOUR. First, proof of sufficient funds for a long-stay student visa rose to a minimum of EUR 877.50 per month for applications submitted from 1 August 2026, published by France-Visas itself. Second, under Décret n° 2026-526 of 22 June 2026, all international student visa applicants must now provide proof of accommodation covering the first three months of their stay, where previously a contact address could suffice. Booking a hostel booking that can be cancelled for a refund is now a genuine task, not an afterthought. One jurisdiction caveat we want to be explicit about: the specific timings we could verify for the Études en France step and the 3 to 4 week consular processing come from Campus France USA, which covers applicants applying from the United States. EEF is mandatory nationwide but review times and the fee vary by country, so treat the timing as typical for other nationalities. Note also that your VLS-TS visa is not the residence permit itself and must be validated online within three months of arrival.",
    milestones: [
      {
        id: "fr-profile-cv",
        phase: "Profile & Documents",
        title: "Assemble CV, diplomas and sworn translations",
        summary:
          "French applications expect your baccalaureate, bachelor's and any master's diplomas with certified translations. Non-French documents almost always need a sworn or certified translator, which takes weeks.",
        offsetDays: 300,
        hardDeadline: false,
        dependsOn: [],
        tasks: [
          "Collect diplomas and transcripts for every qualification, including your secondary school certificate",
          "Arrange certified French translations by an accredited translator",
          "Write a CV in the format your target programme publishes, which often differs from an Anglo-American CV",
          "Request your academic transcripts early, since obtaining sealed copies can itself take weeks"
        ],
        source: "https://www.campusfrance.org/en",
        confidence: "typical",
      },
      {
        id: "fr-shortlist",
        phase: "University Shortlist",
        title: "Shortlist programmes and identify the admission route",
        summary:
          "French master's split into government-funded Master 1 with a national application platform, Monmaster applications for Master 2, and direct application to individual universities. The route determines your deadline.",
        offsetDays: 290,
        hardDeadline: false,
        dependsOn: ["fr-profile-cv"],
        tasks: [
          "Identify whether each programme is Master 1, Master 2 or an international master's",
          "Check whether applications go through Monmaster, a campusonline-type platform, or the university directly",
          "Note each programme's language of instruction and any French-language requirement",
          "Check tuition: French public universities charge different international tuition tiers, so costs vary widely"
        ],
        source: "https://www.campusfrance.org/en",
        confidence: "typical",
      },
      {
        id: "fr-english",
        phase: "English Proficiency",
        title: "Meet the English or French requirement",
        summary:
          "English-taught French master's still usually require proof of English at a stated level, and if any part of your programme is in French you will need French evidence too.",
        offsetDays: 250,
        hardDeadline: true,
        dependsOn: [],
        tasks: [
          "Check whether the programme requires IELTS, TOEFL or a French certificate such as TCF or DALF",
          "Book the test with results in hand 6 to 8 weeks before your deadline",
          "Note that a master's delivered in English in France still usually requires formal English evidence",
          "If your undergraduate degree was not taught in English, expect the test to be mandatory"
        ],
        source: "https://www.campusfrance.org/en",
        confidence: "typical",
      },
      {
        id: "fr-references",
        phase: "Recommendations",
        title: "Obtain recommendation letters",
        summary:
          "French graduate applications commonly ask for one or two recommandations, often from academics rather than employers. They are usually submitted directly by the referee through the platform.",
        offsetDays: 235,
        hardDeadline: false,
        dependsOn: ["fr-profile-cv"],
        tasks: [
          "Check each programme's requirement for letters and their preferred language",
          "Ask referees at least 6 weeks before the platform deadline",
          "Provide referees with the programme name, the platform link and the submission deadline",
          "For French-language programmes, have referees write in French"
        ],
        source: "https://www.campusfrance.org/en",
        confidence: "typical",
      },
      {
        id: "fr-sop",
        phase: "Personal Statement",
        title: "Write the lettre de motivation and any written project",
        summary:
          "A structured motivation letter tied to the programme's syllabus is the centre of a French application. Some computer science and data master's also ask for a short technical or research project statement.",
        offsetDays: 215,
        hardDeadline: false,
        dependsOn: ["fr-shortlist", "fr-profile-cv"],
        tasks: [
          "Write a motivation letter of the length the programme specifies, referencing actual course names",
          "Explain your academic preparation for this specific syllabus rather than your general interests",
          "Add a project statement where the programme asks for one, with a concrete research question",
          "Tailor every version; French reviewers read identical letters as a lack of genuine interest"
        ],
        source: "https://www.campusfrance.org/en",
        confidence: "typical",
      },
      {
        id: "fr-app-submit",
        phase: "Application Submission",
        title: "Submit the candidature on the national or university platform",
        summary:
          "Applications are usually bounded windows with ranking, so a late submission is not merely late, it is not ranked. Motives matter because places are allocated on the strength of the dossier.",
        offsetDays: 175,
        hardDeadline: true,
        dependsOn: ["fr-english", "fr-sop", "fr-references"],
        tasks: [
          "Submit through Monmaster, the university platform or direct application, whichever your programme uses",
          "Upload all documents inside the platform rather than emailing them separately",
          "Track recommendation requests from referees within the platform",
          "Respond to any request for an interview or written test quickly"
        ],
        source: "https://www.campusfrance.org/en",
        confidence: "typical",
      },
      {
        id: "fr-admission",
        phase: "Offer & Enrolment",
        title: "Confirm your place and complete pre-enrolment",
        summary:
          "Offer acceptance in France often involves a deposit plus pre-enrolment steps such as choosing options, before you are formally enrolled. Some programmes require you to apply for a scholarship or exemption before enrolment closes.",
        offsetDays: 130,
        hardDeadline: true,
        dependsOn: ["fr-app-submit"],
        tasks: [
          "Reply to the offer within the stated acceptance window",
          "Pay any deposit or first-instalment tuition",
          "Complete pre-enrolment or admission confirmation steps in the platform",
          "Check whether you need to apply separately for a reduced international tuition rate or scholarship"
        ],
        source: "https://www.campusfrance.org/en",
        confidence: "typical",
      },
      {
        id: "fr-housing",
        phase: "Housing",
        title: "Secure housing and collect the proof you now need",
        summary:
          "Since Décret n° 2026-526 of 22 June 2026, all international student visa applicants must provide proof of accommodation for the first three months of their stay, not merely an address at which they can be contacted.",
        offsetDays: 95,
        hardDeadline: true,
        dependsOn: ["fr-admission"],
        tasks: [
          "Apply for CROUS or university residence allocation as soon as you are admitted",
          "Search for private accommodation and get a written attestation d'hebergement from the landlord",
          "Book a refundable hostel or short-stay option as a fallback so the three-month proof exists",
          "Make sure the address and dates on the proof match your programme start"
        ],
        source:
          "https://www.usa.campusfrance.org/guidance-for-student-visa-applicants",
        confidence: "verified",
      },
      {
        id: "fr-eef",
        phase: "Visa & Permits",
        title: "Complete the Campus France Études en France (EEF) attestation",
        summary:
          "Campus France states the EEF pre-consular application is a mandatory first step for all students studying in France 90 days or more. Its published guidance recommends starting 10 to 12 weeks before departure, and review takes 3 days to 3 weeks depending on the file.",
        offsetDays: 105,
        hardDeadline: true,
        dependsOn: ["fr-admission"],
        tasks: [
          "Create your Études en France account and submit the EEF application",
          "Pay the EEF application fee, which varies by country and by applicant type",
          "Upload your admission documents and academic records in the format requested",
          "Download the EEF-Pastel pre-registration certificate and print the confirmation email when validated"
        ],
        source: "https://www.usa.campusfrance.org/application-overview",
        confidence: "verified",
      },
      {
        id: "fr-visa-appointment",
        phase: "Visa & Permits",
        title: "File on France-Visas and attend the TLS consular appointment",
        summary:
          "You cannot book a TLS appointment more than 6 months before your programme start date, so the visa booking window opens on a fixed schedule rather than whenever you are ready.",
        offsetDays: 85,
        hardDeadline: true,
        dependsOn: ["fr-eef", "fr-housing"],
        tasks: [
          "Create your France-Visas account and complete the long-stay student visa application",
          "Book the TLS appointment, which is only possible within 6 months of your programme start",
          "Upload digital copies of all supporting documents to prepare your in-person appointment",
          "Bring the signed form, France-Visas receipt, passport, EEF certificate, accommodation proof and funds evidence"
        ],
        source:
          "https://www.usa.campusfrance.org/system/files/medias/documents/2026-07/Campus%20France%20USA%20Student%20Visa%20Guide%20%282026-2027%29.pdf",
        confidence: "verified",
      },
      {
        id: "fr-proof-finances",
        phase: "Visa & Permits",
        title: "Prove sufficient funds for the long-stay student visa",
        summary:
          "France-Visas states that because of an increase in the required income threshold for long-stay student visas, applications submitted from 1 August 2026 must show proof of income of at least EUR 877.50 per month.",
        offsetDays: 80,
        hardDeadline: true,
        dependsOn: ["fr-visa-appointment"],
        tasks: [
          "Calculate the required total as EUR 877.50 multiplied by your programme's months",
          "Provide bank statements in your name, or a scholarship letter or attestation de prise en charge from a sponsor",
          "Ensure statements are recent and cover the period your mission expects",
          "Include proof of your tuition and insurance costs where the mission asks for them"
        ],
        source: "https://www.france-visas.gouv.fr/en/",
        confidence: "verified",
      },
      {
        id: "fr-visa-processing",
        phase: "Visa & Permits",
        title: "Consular processing and visa issuance",
        summary:
          "Campus France USA publishes a 3 to 4 week processing time after your in-person submission. That figure is specific to applicants filing in the United States, and other consulates publish different expectations.",
        offsetDays: 45,
        hardDeadline: true,
        dependsOn: ["fr-visa-appointment", "fr-proof-finances"],
        tasks: [
          "Attend your appointment and submit the complete paper file",
          "Respond fast if the visa service requests additional documents, which suspends processing",
          "Track your application and arrange passport return or pickup",
          "Plan travel only after the visa is physically in your hand"
        ],
        source:
          "https://www.usa.campusfrance.org/system/files/medias/documents/2026-07/Campus%20France%20USA%20Student%20Visa%20Guide%20%282026-2027%29.pdf",
        confidence: "typical",
      },
      {
        id: "fr-pre-departure",
        phase: "Pre-Departure",
        title: "Pre-departure checks and arrival",
        summary:
          "Check that your VLS-TS visa, EEF certificate and accommodation proof are consistent, and confirm whether your university runs an orientation week you must attend before teaching starts.",
        offsetDays: 12,
        hardDeadline: false,
        dependsOn: ["fr-visa-processing", "fr-housing"],
        tasks: [
          "Verify the visa validity period covers your whole programme plus your arrival margin",
          "Book travel only once the visa has been issued",
          "Complete any online pre-arrival or orientation registration your university requires",
          "Carry your visa, EEF certificate and accommodation attestation on arrival"
        ],
        source: "https://www.campusfrance.org/en/student-long-stay-visa",
        confidence: "typical",
      },
      {
        id: "fr-vls-validation",
        phase: "Pre-Departure",
        title: "Validate your VLS-TS online within 3 months of arrival",
        summary:
          "Your long-stay visa valid as a residence permit must be validated online at the administration-etrangers-en-france site within three months of arriving, paying the EUR 100 stay tax. Failing to validate restricts your ability to travel out.",
        offsetDays: -60,
        hardDeadline: true,
        dependsOn: ["fr-visa-processing"],
        tasks: [
          "Validate online at administration-etrangers-en-france.interieur.gouv.fr within three months of arrival",
          "Enter your visa number, validity dates and your arrival date exactly as printed on the visa",
          "Pay the EUR 100 stay tax online, or buy an electronic timbre if you have no bank card",
          "Save the confirmation, since you cannot leave France beyond the first three months without it"
        ],
        source:
          "https://www.campusfrance.org/en/how-to-validate-your-long-stay-visa-visa-long-sejour-upon-your-arrival-in-france",
        confidence: "verified",
      },
    ],
  },

  /* ------------------------------------------------------------------ SINGAPORE */
  {
    code: "SG",
    name: "Singapore",
    admission: "fixed",
    intakes: [
      { id: "sg-aug-2027", label: "Semester 1 (August) 2027", startDate: "2027-08-09" },
      { id: "sg-jan-2028", label: "Semester 2 (January) 2028", startDate: "2028-01-17" },
      { id: "sg-aug-2028", label: "Semester 1 (August) 2028", startDate: "2028-08-07" },
      { id: "sg-jan-2029", label: "Semester 2 (January) 2029", startDate: "2029-01-15" },
    ],
    notes:
      "Singapore's admissions are fixed and intake-driven, and the windows are genuinely narrow. NUS Computing publishes application dates of 1 October 2026 to 31 January 2027 for the August 2027 master's intake, and NTU runs separate Semester 1, Semester 2 and Trimester intakes, which means your target intake determines your deadline rather than the other way round. THE GOTCHA WE ENCODED MOST PROMINENTLY IS THE SOLAR AND eForm 16 SEQUENCE FOR THE STUDENT'S PASS. Your university, not you, registers you with ICA through the SOLAR system and emails you a Registration Acknowledgement Letter. You then submit eForm 16 yourself through SOLAR, upload your documents, and pay the S$45 processing fee WITHIN SEVEN DAYS or ICA withdraws the application outright. ICA's published service commitment for a Student's Pass is within 2 weeks for EduTrust institutions and within 1 month for non-EduTrust ones, and NTU's own guide says allow one week without a visa and two weeks with one. NUS states the eForm 16 must be submitted no later than one month before your course commences. A second structural gotcha: you must be physically in Singapore on a valid pass to complete the formalities before your Student's Pass is issued. That is why the offsite enrolment dates cluster immediately around the start of term, at NUS spanning 24 and 27 to 31 July then 4, 21, 24 and 25 August 2026 for Semester 1 AY2026/27. Third, scholarship cut-offs are earlier than main application deadlines: for the August 2027 intake the NUS Business School HCMA programme set a scholarship consideration cut-off of 15 November 2026 against a general deadline of 15 February 2027. AN EXPLICIT LIMITATION: we could NOT verify NARIS, the National Academic Recognition and Accreditation System, from any primary source in this research pass. NARIS appears in student-facing material as a degree-recognition route, but the verifiable requirement we could confirm is credential verification through each university's approved agencies and mandatory online verification exercises. We have therefore encoded that verified requirement instead, and we have not invented a NARIS milestone.",
    milestones: [
      {
        id: "sg-profile-cv",
        phase: "Profile & Documents",
        title: "Prepare CV, transcripts and degree documents",
        summary:
          "NUS Computing requires a CV and a statement of purpose uploaded with the online application, plus certified true copies of degree certificates and official transcripts. Certified true copies, not scans, are the bottleneck.",
        offsetDays: 290,
        hardDeadline: false,
        dependsOn: [],
        tasks: [
          "Write a one to two page academic CV with your technical background and projects",
          "Request official transcripts directly from each issuing university",
          "Prepare certified true copies of degree certificates with official English translations where needed",
          "Keep documents ready for later registration, which requires originals rather than uploads"
        ],
        source:
          "https://www.comp.nus.edu.sg/programmes/pg/phdcs/application",
        confidence: "verified",
      },
      {
        id: "sg-shortlist",
        phase: "University Shortlist",
        title: "Shortlist programmes across NUS, NTU, SMU and SIT",
        summary:
          "Each autonomous university runs its own intake and its own deadline, so target intake selection is the first planning decision. NUS Computing, for example, publishes separate windows for its master's, PhD and continuing-education intakes.",
        offsetDays: 300,
        hardDeadline: false,
        dependsOn: ["sg-profile-cv"],
        tasks: [
          "Shortlist 4 to 8 programmes across the autonomous universities",
          "Record each programme's intake, application window and stated minimum scores",
          "Check the programme's curriculum for the computing or data specialisation you actually want",
          "Note whether the programme is coursework or research, since references are handled differently"
        ],
        source: "https://www.comp.nus.edu.sg/graduate/",
        confidence: "verified",
      },
      {
        id: "sg-english",
        phase: "English Proficiency",
        title: "Submit TOEFL or IELTS scores",
        summary:
          "NUS Computing states international applicants must submit TOEFL or IELTS as evidence of academic language ability, and gives minimums of 90 TOEFL iBT or 6.0 IELTS. Minimums vary by programme, so check each.",
        offsetDays: 245,
        hardDeadline: true,
        dependsOn: [],
        tasks: [
          "Confirm the minimum score required by your specific programme",
          "Book the test with results in hand at least 8 weeks before your target deadline",
          "Send official scores using the university's stated institution code",
          "Note that test score validity periods are shorter than the application cycle, so test late enough to be valid"
        ],
        source:
          "https://www.comp.nus.edu.sg/programmes/pg/phdcs/admissions",
        confidence: "verified",
      },
      {
        id: "sg-references",
        phase: "Recommendations",
        title: "Obtain two referee's reports",
        summary:
          "NUS Computing states that all applications require two recommendation or referee's reports, submitted by the referees through the online admission system rather than emailed as documents.",
        offsetDays: 235,
        hardDeadline: true,
        dependsOn: ["sg-profile-cv"],
        tasks: [
          "Identify two referees who can speak to your academic or technical ability",
          "Provide their email addresses in the application so the system invites them directly",
          "Give referees at least 6 weeks and a stated deadline",
          "Monitor the application's referee status, because an unaccepted invite blocks completion"
        ],
        source:
          "https://www.comp.nus.edu.sg/programmes/pg/phdcs/application",
        confidence: "verified",
      },
      {
        id: "sg-sop",
        phase: "Personal Statement",
        title: "Write the mandatory statement of purpose",
        summary:
          "NUS Computing states the statement of purpose is mandatory, must be uploaded under document upload, and should cover your reasons for applying, your preparation for the field, and your future plans.",
        offsetDays: 230,
        hardDeadline: false,
        dependsOn: ["sg-profile-cv", "sg-shortlist"],
        tasks: [
          "Draft a concise statement covering why you are applying and what prepared you",
          "Connect your background to the specific specialisation you are targeting",
          "State a credible post-graduation plan, which assessors read as a genuine-intention signal",
          "Upload it in the required section of the online application, not as a loose attachment"
        ],
        source:
          "https://www.comp.nus.edu.sg/programmes/pg/phdcs/application",
        confidence: "verified",
      },
      {
        id: "sg-app-submit",
        phase: "Application Submission",
        title: "Submit in the published intake window",
        summary:
          "NUS Computing publishes application dates of 1 October 2026 to 31 January 2027 for the August 2027 master's intake, and a PhD intake closing 15 December 2026. Applications are only reviewed for the immediate upcoming intake.",
        offsetDays: 190,
        hardDeadline: true,
        dependsOn: ["sg-english", "sg-sop", "sg-references"],
        tasks: [
          "Apply within the published window; late applications are not considered",
          "Pay the non-refundable application fee by the closing date",
          "Ensure the form and the fee are both complete, since applications with unpaid fees are not reviewed",
          "Save the submitted reference so you can track the outcome"
        ],
        source: "https://www.comp.nus.edu.sg/graduate/",
        confidence: "verified",
      },
      {
        id: "sg-scholarship",
        phase: "Scholarships & Funding",
        title: "Apply for scholarship rounds before the main deadline",
        summary:
          "Scholarship consideration has its own, earlier cut-off. For the August 2027 intake the NUS Business School HCMA programme set a scholarship consideration cut-off of 15 November 2026, three months before its 15 February 2027 general deadline.",
        offsetDays: 236,
        hardDeadline: true,
        dependsOn: ["sg-app-submit"],
        tasks: [
          "Identify every scholarship round for your shortlisted programmes and their cut-off dates",
          "Submit by the scholarship cut-off, not the general deadline",
          "Check whether scholarship applications require a separate form or test",
          "Note that later rounds may be considered only if funding remains available"
        ],
        source: "https://mschcma.nus.edu.sg/admissions/application-process/",
        confidence: "verified",
      },
      {
        id: "sg-offer-accept",
        phase: "Offer & Enrolment",
        title: "Accept the offer and matriculate online",
        summary:
          "Accepting is not the end of the process. You must then matriculate online within a stated window; for NTU's January 2027 intake that window ran 21 to 28 September 2026. Matriculation generates your university account and your SOLAR details.",
        offsetDays: 120,
        hardDeadline: true,
        dependsOn: ["sg-app-submit", "sg-scholarship"],
        tasks: [
          "Accept the offer formally within the deadline on your admission outcome letter",
          "Complete online matriculation within the published window",
          "Activate your university email account, which arrives shortly after acceptance",
          "Watch for the Confirmation of Acceptance or Registration Acknowledgement email carrying your SOLAR details"
        ],
        source:
          "https://www.ntu.edu.sg/nie/admissions/graduate-education/admission-procedures-for-successful-graduate-applicants/research-programmes-(january-2027-intake)",
        confidence: "verified",
      },
      {
        id: "sg-degree-verification",
        phase: "Profile & Documents",
        title: "Complete degree verification and online verification exercises",
        summary:
          "Verification is mandatory, not optional: NTU requires an official degree verification report from overseas graduates, and NTU requires all matriculated students to participate in an online verification of academic documents exercise.",
        offsetDays: 100,
        hardDeadline: true,
        dependsOn: ["sg-offer-accept"],
        tasks: [
          "Commission a degree verification report through one of the university's approved credential verification agencies",
          "Upload the official degree verification report, which is mandatory for overseas graduates",
          "Complete the online verification of academic documents exercise in the stated window",
          "Understand that withholding information can result in refusal of admission"
        ],
        source:
          "https://www.ntu.edu.sg/admissions/graduate/gfreshmenguide/incoming-graduate-student-guide/verification-for-academic-documents",
        confidence: "verified",
      },
      {
        id: "sg-medical",
        phase: "Visa & Permits",
        title: "Complete the pre-admission medical examination",
        summary:
          "A pre-admission medical examination is required and can be done in your home country before arrival, which is usually much faster than completing it in Singapore.",
        offsetDays: 45,
        hardDeadline: true,
        dependsOn: ["sg-offer-accept"],
        tasks: [
          "Book the pre-admission medical exam with an approved physician, at home if possible",
          "Ensure the exam is completed by the university's stated deadline",
          "Upload the medical examination report in the required format",
          "Obtain an official English translation if the report is not in English"
        ],
        source:
          "https://science.nus.edu.sg/wp-content/uploads/2026/02/AdmissionHandbookAug2026.pdf",
        confidence: "verified",
      },
      {
        id: "sg-ica-stp",
        phase: "Visa & Permits",
        title: "Submit ICA eForm 16 via SOLAR and pay within 7 days",
        summary:
          "Your university registers you with ICA via SOLAR and emails your login details. You then submit eForm 16 yourself, upload your documents, and pay the S$45 processing fee within 7 days or ICA withdraws the application. eForm 16 must be submitted no later than one month before your course starts.",
        offsetDays: 60,
        hardDeadline: true,
        dependsOn: ["sg-offer-accept", "sg-degree-verification"],
        tasks: [
          "Use the SOLAR login details your university emailed after you matriculated",
          "Submit eForm 16 yourself, since amendments are not allowed after submission",
          "Upload your passport biodata page and a compliant passport photo",
          "Pay the S$45 processing fee within 7 days of completing eForm 16 to avoid withdrawal"
        ],
        source: "https://www.nus.edu.sg/registrar/academic-activities/student-pass",
        confidence: "verified",
      },
      {
        id: "sg-ipa-visa",
        phase: "Visa & Permits",
        title: "Receive the In-Principle Approval letter and submit SG Arrival Card",
        summary:
          "ICA issues an In-Principle Approval letter, and the visa to enter Singapore is inside that IPA letter. If your Student Pass application has no visa, ICA's processing is quicker than where one is required.",
        offsetDays: 40,
        hardDeadline: true,
        dependsOn: ["sg-ica-stp"],
        tasks: [
          "Allow roughly one week for ICA processing where no visa is needed and up to two weeks where one is",
          "Download and print the IPA letter, which carries your entry visa",
          "Upload any clarification ICA requests within 14 days of notification",
          "Submit the SG Arrival Card three days before departure"
        ],
        source:
          "https://www.ica.gov.sg/about-us/our-service-commitment",
        confidence: "verified",
      },
      {
        id: "sg-ose",
        phase: "Visa & Permits",
        title: "Complete ICA formalities in Singapore at offsite enrolment",
        summary:
          "You must be in Singapore on a valid pass to complete the formalities before the Student's Pass is issued. NUS ran offsite enrolment for Semester 1 AY2026/27 on 24, 27 to 31 July, then 4, 21, 24 and 25 August 2026, so some sessions fall after teaching has started.",
        offsetDays: 14,
        hardDeadline: true,
        dependsOn: ["sg-ipa-visa", "sg-medical"],
        tasks: [
          "Book your required offsite enrolment session; walk-ins are not accepted",
          "Attend on your scheduled date and time slot to enrol biometrics and complete formalities",
          "Pay the issuance fee and the multiple journey visa fee if applicable",
          "Download the digital Student's Pass via Singpass or FileSG once formalities are complete"
        ],
        source: "https://www.nus.edu.sg/registrar/academic-activities/student-pass",
        confidence: "verified",
      },
      {
        id: "sg-housing",
        phase: "Housing",
        title: "Apply for graduate housing",
        summary:
          "Housing is allocated by each university and deadlines differ. NTU asked incoming January 2027 students to apply for graduate housing in late October or early November 2026, with applications opening roughly two weeks after e-matriculation.",
        offsetDays: 20,
        hardDeadline: false,
        dependsOn: ["sg-offer-accept"],
        tasks: [
          "Watch for the housing application opening after your university account is issued",
          "Submit the graduate housing application promptly, as allocations are competitive",
          "Have your matriculation details ready, since housing portals need your student record",
          "Have a private rental plan ready in case university housing is unavailable"
        ],
        source:
          "https://www.ntu.edu.sg/nie/admissions/graduate-education/admission-procedures-for-successful-graduate-applicants/research-programmes-(january-2027-intake)",
        confidence: "typical",
      },
      {
        id: "sg-pre-departure",
        phase: "Pre-Departure",
        title: "Align travel with the ICA deadline",
        summary:
          "Your Student Pass application must be submitted roughly a month before the course starts, so your travel date is constrained from both sides: not too early to process, not too late to complete formalities.",
        offsetDays: 5,
        hardDeadline: false,
        dependsOn: ["sg-ose", "sg-housing"],
        tasks: [
          "Time arrival so that you are in Singapore before your scheduled offsite enrolment date",
          "Verify the programme name and start date shown in your eForm 16 were correct",
          "Carry your IPA letter, SOLAR acknowledgement and admission letter on arrival",
          "Complete orientation and course registration after arrival"
        ],
        source: "https://www.ica.gov.sg/reside/STP/collect",
        confidence: "verified",
      },
    ],
  },
];

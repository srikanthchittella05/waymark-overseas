import type { GuideContent } from "../types";

const V = "2026-10-20";

/**
 * The shortlist dossier.
 *
 * A shortlist is not a wish list. It is a set of programmes that you have
 * checked against the five things that actually decide an application: whether
 * you meet the academic entry rules, whether the deadline you can meet is the
 * deadline that exists, whether there is a place for you, whether the money
 * works, and whether the paperwork downstream is even possible.
 *
 * The dossier is built around what admissions committees actually weigh, and
 * around the specific ways students lose offers that have nothing to do with
 * their grades:
 *
 *   1. DEADLINE MISMATCH. The date on the programme page is not always the
 *      date that binds you. A separate deadline for applicants who need a
 *      visa, a funding cut-off that falls before the application deadline, an
 *      intake whose window closed before you started looking.
 *   2. CAPACITY. Places are finite, and international applicants often face a
 *      separate cap from domestic ones. A programme that is a fit for you is
 *      not a programme that is available to you.
 *   3. CONDITIONALITY. Most offers are conditional, and the condition is
 *      cleared by a document or a deadline that you do not control.
 *
 * The rule that governs this file: every recommendation is free, official and
 * checkable by the student. There is no paid shortlist service here, and there
 * will not be one, because a shortlist that is for sale is a shortlist with
 * somebody's commission in it.
 */
export const UNIVERSITY_SHORTLIST: Record<string, GuideContent> = {
  "us-shortlist": {
    archetype: "university-shortlist",
    intro:
      "This is the single highest-leverage planning step in a US application, and the reason is that the United States is not one admissions market. Each programme sets its own deadline, its own GRE policy, its own funding policy and its own class size, and some of the best programmes publish a single date and nothing else. Build a list of 8 to 12, and record four facts about each one.",
    sections: {
      method: {
        body:
          "The method is to work from the constraint outwards, not from a wish list inwards. Start with the date that binds you, which for most international applicants is the visa appointment wait time at your nearest US consulate, and work back from there to the application deadline, then to the shortlist. A list built the other way round, from rankings, produces programmes you cannot reach in time.",
        points: [
          "Write down the date that actually binds you. For most applicants outside the US that is the earliest available F-1 interview appointment at your post, which the State Department publishes per post and which varies enormously by country.",
          "Then work backwards: the application deadline has to fall far enough before that appointment that you can get a visa, receive your I-20, and be in the country before the term starts. Most US programmes that are genuinely selective publish a single deadline in late November or early December, and publish nothing after that.",
          "For every programme on the list, record four facts in one row: the exact deadline, the GRE policy, the funding policy for master's students, and whether the school is SEVP-certified to enrol F-1 students.",
          "Aim for 8 to 12 programmes. Fewer than about six is not a list, it is a preference, and it gives you no room when a deadline shifts or a place fills. More than about fifteen will not be researched properly, and a shallow list of fifteen is worth less than a deep list of eight.",
          "Remove anything whose deadline has already passed for your target term, and remove anything that is not SEVP-certified. Both are cheap checks and both are done at the start rather than at the end.",
        ],
      },
      criteria: {
        body:
          "Admissions committees weigh a short list of things, and they weigh them in a fairly consistent order. Academic preparation comes first, because it is the thing they can compare across a large pool. Everything else either confirms the fit or removes you from it.",
        points: [
          "Academic fit and prerequisites. A first-class degree in a relevant subject, with the specific coursework the programme lists as required. Programmes publish required courses, and a missing one is treated as a missing prerequisite rather than a weakness to be argued around.",
          "Grades as a comparison. US committees convert your grade to their own scale or ask for a percentile, and the way they do it varies. Give them the class rank, the percentile or the full transcript, not just a percentage, so they can convert it themselves.",
          "Research, projects and letters. For a professional master's, the projects and the letters carry a lot. Stanford's CS department states that it does not offer financial support for MS students and that GRE scores are not required and not considered for MS applicants, which tells you what a competitive programme is actually reading.",
          "Deadlines, as a hard filter rather than a preference. A late application is not a weaker application, it is a rejected one, at any selective programme with a single published date.",
          "Capacity and international caps. A programme's class size, its admit rate and, where it publishes one, a cap on international applicants are the difference between a programme you could get into and a programme you could not.",
          "Funding, which is a different country every time. A US master's is usually self-funded and the tuition is published per programme and changes. Stanford's stated position that it does not fund MS students is a useful illustration of how much of this varies.",
          "And then the visa, which is where a technically excellent application still fails. The interview wait time at your post is a real constraint on your choice of programme and it is not something any admissions office will warn you about.",
        ],
      },
      traps: {
        body:
          "These are the specific ways students lose offers in the US that have nothing to do with their academic record. Each of them is a check you can do in an afternoon, and each of them is a total loss if you find it too late.",
        points: [
          "Deadline mismatch. A rolling programme is not an open door. For a selective computer science master's, treat an early-December deadline as a cliff rather than a rolling admission, because that is how the programme behaves in practice even when the university calls its admission policy rolling.",
          "Separate deadlines for visa applicants. Some universities close to applicants who need a visa well before the general deadline, and the gap can be months. A programme that is open to you on paper can be closed to you by nationality.",
          "Closed intakes. Not every programme runs every term, and a programme that ran last year may not run next year. A spring intake is not universally available for a computer science master's, and Stanford CS offers autumn only.",
          "Conditional offers. Most US offers are conditional, and the conditions are clearances: official transcripts received by a date, a score sent, a document uploaded. They are deadlines you do not control, and they are stated in the offer letter.",
          "International caps. Where a programme publishes a cap on international applicants, a strong file from outside the cap does not help. Check the programme's own admissions page for any country-specific or applicant-category guidance.",
          "Programme renames. Departments rename and re-badge programmes between cycles, and a course that was called one thing last year can be a different degree this year, with different entry rules. Check the current cycle's page, not last year's.",
          "SEVP certification and school alerts. A programme must be SEVP-certified to enrol F-1 students, and schools can lose their certification or have their certification withdrawn. The government publishes both the certified list and the alerts.",
          "And tuition, which is not a fixed price. It varies by hundreds of thousands of dollars across US master's programmes, and the number that matters is the published one for your programme and your year, not a national estimate.",
        ],
        callout: {
          tone: "watch",
          title: "The visa wait time can decide your shortlist for you",
          body: "The State Department publishes next-available F-1 interview appointments per post, and the spread is enormous: in the September 2026 dataset some posts were under half a month out while others were more than five months. That is not a detail of the visa process, it is a hard constraint on which programmes you can realistically take. Read the table for your post and filter your list against it.",
        },
      },
      tools: {
        body:
          "The useful tools here are official and free: the department's own checklist, the government's certified school list, and the federal course directory. What you will not find on this list is a paid shortlist service, and that is deliberate.",
        points: [
          "Start from a programme's own admissions checklist, because that is where the real requirements are and where the exceptions live.",
          "Use the government school search to confirm certification and to see whether a campus is certified for the visa type you need.",
          "Use the federal course directory to confirm that a programme is a real, on-campus degree at an accredited institution before you spend a month on the application.",
        ],
        resources: [
          {
            title: "Stanford CS: graduate application checklists",
            kind: "official",
            url: "https://www.cs.stanford.edu/admissions/graduate-application-checklists",
            why: "The page behind this checkpoint. A published checklist from a competitive US computer science department, including what is required at application stage and what only becomes required after an offer.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Stanford CS: master's admissions FAQ",
            kind: "official",
            url: "https://www.cs.stanford.edu/admissions/masters-admissions-frequently-asked-questions",
            why: "The same department's published answers on funding and on GRE policy for master's applicants, which is a rare and genuinely useful thing to find published. It is a good model for what a transparent programme page looks like.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study in the States: certified school search",
            kind: "official",
            url: "https://studyinthestates.dhs.gov/school-search",
            why: "The Department of Homeland Security's own list of SEVP-certified schools, with the visa type each is certified to enrol. The fastest way to check that a programme you are considering can actually issue you an I-20.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "College Navigator",
            kind: "tool",
            url: "https://nces.ed.gov/collegenavigator/",
            why: "The US Department of Education's directory of institutions and the degrees they award. Useful for checking the degree itself, its level and the delivery mode, and for spotting a programme that has been renamed or restructured.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official sources, they are free, and they are the pages the decisions are made from. We take no payment for placement, and we do not take payment for anything. If a site offers to build you a shortlist for a fee, or takes a commission from a university, it is not doing the same job and it is not on this page.",
        },
      },
    },
  },

  "gb-shortlist": {
    archetype: "university-shortlist",
    intro:
      "UK master's admissions are fixed-deadline systems, and the date that matters is often not the university deadline but the visa chemistry behind it. The other hard filter is the Student sponsor licence: your school has to hold one to issue you a CAS, so the licence is an eligibility test, not a formality.",
    sections: {
      method: {
        body:
          "Two filters come before preferences. The first is the sponsor licence, because a school without one cannot issue a CAS and therefore cannot sponsor you. The second is the deadline split, because UK universities increasingly publish two deadlines for one programme, one for applicants who need a visa and one for those who do not.",
        points: [
          "Shortlist 6 to 10 programmes in your field. Six is a viable list for a fixed-deadline system if you research each one properly; ten gives you room for one programme closing early or one condition failing.",
          "Confirm each institution appears on the GOV.UK register of licensed student sponsors. The register is updated frequently and it is the definitive list, not the university website's own claim of being able to sponsor students.",
          "Record each programme's own deadline, and whether it separates visa and non-visa applicants. Where it does, record both dates, because the one that binds you is the earlier one.",
          "Check the ATAS position for each programme before you invest in an application. For computer science, AI, information systems and several engineering subject codes at postgraduate level, an Academic Technology Approval Scheme certificate is required, and some universities require it even earlier than the visa does.",
          "Check the language requirement and the fee at the same time you check the deadline, because a programme you cannot meet the cost of is not a shortlist entry.",
        ],
      },
      criteria: {
        body:
          "UK admissions committees weight a short list of things, and they are published in more detail here than in most countries. The subject requirements and the deadline are the two that catch people who assumed their degree carried over.",
        points: [
          "Subject requirements, which are not negotiable in the way a grade is. Many UK computer science and data science master's programmes require specific modules in mathematics, programming or statistics, and list the required degree subject explicitly. This is a filter, not a preference.",
          "A degree class, which the UK treats as a formal category. Some programmes ask for a 2:1 or a 2:2; some ask for a named grade in a named subject. Check both, because the subject grade and the overall class are separate tests.",
          "The deadline, and specifically which deadline. The most striking verified example in our data is UCL's Computer Science MSc for 2026/27 entry, which closed to applicants requiring a visa on 27 March 2026 while staying open to non-visa applicants until 28 August 2026. That is a five-month gap created purely by visa lead time.",
          "Whether the programme is a taught master's, an integrated master's or a research degree, because the references, the interview and the funding work differ completely.",
          "Fees, which for international students are published per programme and change between cycles. A programme's fee also determines the financial evidence you will have to produce for the visa, so it is two decisions at once.",
          "And funding, which in the UK runs on a separate deadline from admission, and which in a lot of cases is a scholarship round that closes months before the application deadline.",
        ],
      },
      traps: {
        body:
          "The UK traps are well documented and they catch the same students every year. The visa deadline split is the big one, and the ATAS sequence is the one that is genuinely expensive to get wrong.",
        points: [
          "The visa and non-visa deadline split. Programs that separate the two will not usually tell you which one you fall under, because it depends on your nationality and where you are applying from. Work it out from the Home Office rules before you read the programme deadline as the only date.",
          "ATAS, and its order. GOV.UK states you must obtain the certificate before applying for a Student visa, Oxford states plainly that you cannot apply for your visa until ATAS has been granted, and some universities require it before the CAS is issued, which moves it even earlier. Certificates are valid for six months, so an early certificate can expire before you are allowed to apply.",
          "Which universities send ATAS details, and when. Some send them with the offer, some weeks later, some in the month before the start date. A programme that expects you to have applied for a visa in three weeks has to tell you that in the offer.",
          "ATAS exemptions. Nationalities including Australia, Canada, Singapore, South Korea, Japan, New Zealand, the United States and EU/EEA and Swiss citizens are exempt. Check before you pay for anything.",
          "Conditional offers with document clearances. Official transcripts, a certificate of prior qualification, sometimes a test result, each with its own deadline inside the offer letter. The UK offer often expires if the conditions are not cleared in time, and the place goes to someone else.",
          "Programme renames and re-badges. Course names in the UK are not stable identifiers, and a programme you have heard about may be called something else now, with different module lists and different entry rules.",
          "Collapsing course lists. Departments merge and withdraw courses between cycles, and a course that appeared in last year's ranking may not be running at all this year.",
        ],
        callout: {
          tone: "watch",
          title: "Five months can disappear into a deadline split",
          body: "UCL's computer science master's closed to visa applicants on 27 March 2026 while staying open to everyone else until 28 August 2026. A student who applied in May would have found the course full for them and open for their friend, and would have had no explanation for it. Find the visa deadline for every programme on your list, and treat it as the real one.",
        },
      },
      tools: {
        body:
          "The official UK directories are better than anything commercial, and they are free. The sponsor register is the one that decides eligibility, and the government course finder tells you which tool to use for which purpose.",
        points: [
          "The register of licensed student sponsors decides which institutions can sponsor you. Check it before anything else.",
          "The government course finder tells you which official course databases exist and which are the right one for a postgraduate search, so you are not relying on a single commercial aggregator.",
          "UCAS is where the guidance on what a UK postgraduate admissions office looks for is published, and its postgraduate courses search covers the courses that recruit through it.",
        ],
        resources: [
          {
            title: "GOV.UK: Student visa",
            kind: "official",
            url: "https://www.gov.uk/student-visa",
            why: "The page behind this checkpoint, and the authority for everything the visa depends on: sponsor licensing, the ATAS sequence, the money, and the timing. It is the document the decisions are made against, and it is written in plain English.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: register of licensed student sponsors",
            kind: "official",
            url: "https://www.gov.uk/government/publications/register-of-licensed-sponsors-students",
            why: "The definitive list of institutions licensed to sponsor migrant students, with the categories they are licensed to sponsor. If your target school is not on it, there is no point applying.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: higher education courses, find and apply",
            kind: "official",
            url: "https://www.gov.uk/higher-education-courses-find-and-apply",
            why: "The government's own signposting page for course databases, including the official comparison site for course data and the UCAS route. It tells you which tool is the official one for which purpose.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "UCAS postgraduate",
            kind: "official",
            url: "https://www.ucas.com/postgraduate",
            why: "The route into the postgraduate course search and UCAS's published guidance on choosing a course and on what UK postgraduate committees look for. Free, and written by the admissions service rather than a marketing site.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official sources, they are free, and they answer the questions that actually decide a UK application. We take no payment for placement, and we do not take payment for anything. We do not list shortlist services, paid or otherwise, because a shortlist that is sold has somebody's commission in it.",
        },
      },
    },
  },

  "ca-shortlist": {
    archetype: "university-shortlist",
    intro:
      "Canada is where a single piece of administrative status changes your whole application: whether your institution is a public designated learning institution. It decides whether you need a provincial attestation letter, it affects your proof of funds, and it changes who the international student cap is measured against. Establish it before you build the timeline, not after.",
    sections: {
      method: {
        body:
          "The method is to build the list around eligibility rather than around preference. For each programme, establish four facts: is the institution a designated learning institution, is it public or private, is the programme course-based or does it need a supervisor, and what is its own deadline separate from the funding deadline.",
        points: [
          "Shortlist 6 to 10 Canadian graduate programmes in your field. For a system where many programmes keep considering applications while places remain, six well-researched options beats a long unresearched list.",
          "Confirm each institution is a designated learning institution, and whether it is public or private. The DLI list is published by IRCC and is the definitive source, and the public or private distinction is not obvious from the university name.",
          "Note for each programme whether it is course-based or requires a supervisor. Many Canadian MSc programmes in research-heavy fields will not admit an applicant without supervisor support, and the University of Toronto's Computer Science department states that only applicants with the support of a potential supervisor will be admitted into the programme.",
          "Record the funding deadline separately from the admission deadline. They are different dates, funding deadlines fall earlier, and some awards require an approved study permit by their own deadline.",
          "Check the international cap for the province and the institution. Canada publishes provincial allocations of the international student cap, and they change, and a province that has used its allocation can close its permit applications to new students.",
        ],
      },
      criteria: {
        body:
          "Canadian admissions committees weigh an academic record and a set of practical constraints, and the practical constraints do more filtering than people expect. For a research-based MSc the supervisor is not a tie-breaker, they are the gate.",
        points: [
          "Academic preparation, read against published entry requirements. Canadian programmes publish a required average and often a required course or a required grade in a specific subject, and a transcript that does not carry those is not comparable.",
          "The supervisor, where the programme requires one. This is the single most consequential criterion in Canadian graduate admissions for research programmes, and it is a relationship you have to build, not a form you file.",
          "Designated learning institution status and the provincial attestation letter. The provincial attestation letter requirement arrived in 2024, was extended to master's and doctoral students in 2025, and was then removed for master's and doctoral students at public designated learning institutions from 1 January 2026. If you are applying to a master's at a public university you are exempt. If you are applying to a private college or to a public institution's non-graduate programme you are not. This is the most common piece of stale advice in circulation.",
          "Funding, which in Canada is a separate application with a separate deadline, and which is where most of the money is. Departmental scholarships, university entrance scholarships, provincial awards and external schemes each have their own forms and their own dates.",
          "The international cap and the provincial allocation, which is a live constraint on places rather than a formal rule.",
          "And the study permit, which is a separate process from admission with its own service standard, and which in several schemes becomes a funding requirement because the award wants an approved permit rather than a filed application.",
        ],
      },
      traps: {
        body:
          "The Canadian traps are mostly about stale information and about dates that are not the date. Both are fixable with an afternoon of reading, if you do it before you commit money and time.",
        points: [
          "Stale provincial attestation advice. Most of what is written about the PAL and TAL requirements predates the 1 January 2026 change, and it will tell you to secure an attestation letter for a master's at a public university where it is not required, or fail to warn you about a private college where it is.",
          "Funding deadlines that precede admission deadlines, and applications for funding that are separate applications. Applying to a programme by its deadline and assuming the scholarship follows is a reliable way to arrive without money.",
          "The study permit as a funding condition. The University of Toronto's Ontario Graduate Scholarship requires an approved study permit by the scholarship application deadline, so a permit filed late can cost you funding as well as time.",
          "The permit queue, which is separate from the application queue. IRCC's service standard is 60 days, and as of February 2026 the 80th percentile was about 28 days, with country-level queues ranging from roughly four weeks to about nine. Treat the standard as a floor, not a plan.",
          "A missing supervisor. In a research MSc, a strong application without supervisor support is an application that cannot proceed, and the supervisor search takes months.",
          "Conditional offers, where the condition is a grade in a final year, a document, or a supervisor's confirmation, and the deadline for clearing it is in the offer letter.",
          "Closed intakes and small cohorts. Many Canadian MSc programmes run one intake a year, and a cohort with a full supervisor list closes to applications long before the published deadline.",
        ],
        callout: {
          tone: "watch",
          title: "The provincial attestation letter rule changed, and most advice has not",
          body: "The requirement was removed for master's and doctoral students at public designated learning institutions from 1 January 2026. It still applies elsewhere. If you are reading a guide that does not mention the date, you are reading pre-2026 advice, and it will send you to buy something you do not need or leave you exposed to something you do.",
        },
      },
      tools: {
        body:
          "Canada's own tools are the ones to use, and they are more decisive than a ranking site would be. The designated learning institution list and the provincial allocation notices settle questions that no advisory page settles properly.",
        points: [
          "The designated learning institution list tells you whether an institution can host you on a study permit, and the graduate apply page sets out the process as IRCC describes it.",
          "The provincial allocation notices tell you when a province has used its cap, which is the thing that closes doors quietly.",
          "The national university directory lets you confirm the institution and find the ones that actually offer what you are looking for.",
        ],
        resources: [
          {
            title: "IRCC: how to apply as a graduate student",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/graduate-student/how-to-apply.html",
            why: "The page behind this checkpoint, and the immigration authority's own description of the graduate application process, including the designated learning institution and attestation letter position. It is the document the permit file is measured against.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "IRCC: designated learning institutions list",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html",
            why: "The authoritative list, and the page that says whether a provincial attestation letter is required for the institution and programme you are looking at. This single check resolves the biggest piece of stale advice in the Canadian application.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Universities Canada",
            kind: "official",
            url: "https://www.canadianuniversities.ca/",
            why: "The national directory of Canadian universities, run by the association the institutions belong to. Useful for confirming a programme belongs to a real, recognised institution and for finding the departments you are targeting.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Toronto Metropolitan University: graduate application dates",
            kind: "official",
            url: "https://www.torontomu.ca/graduate/future-students/application-dates/",
            why: "A worked example of a Canadian department publishing first-consideration dates, preferred international deadlines and funding deadlines separately, which is the structure you want to see in any programme you are shortlisting.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official sources and the ones the decisions are made against, and because they are free. We take no payment for placement, and we do not take payment for anything. We do not list paid shortlist services, because a shortlist that is for sale has somebody's commission in it.",
        },
      },
    },
  },

  "au-shortlist": {
    archetype: "university-shortlist",
    intro:
      "Australia's shortlist is decided by a piece of government data rather than by an admissions page. You must be enrolled in a CRICOS-registered course and hold a Confirmation of Enrolment before a student visa can be granted, so provider and intake selection drives everything downstream, including how long your visa is and what it costs.",
    sections: {
      method: {
        body:
          "The method starts with the register, not with a university website. Find the provider on the official register, confirm the exact course appears there with the right level and duration, and then check the university's own entry requirements. A university you have shortlisted and a course you can actually get a visa for are not the same thing.",
        points: [
          "Shortlist 5 to 8 providers offering your target programme. Five is realistic for a system with a small number of intakes, and eight gives you room for a scholarship round you missed or an intake that has closed.",
          "Confirm each provider is CRICOS registered and that the specific course appears on the register under their code. A university can be registered and the course you are looking at can still be unregistered or under a different name.",
          "Note each provider's application deadline and any separate scholarship round deadline. Australian scholarship rounds close well before the main deadline, and for the August 2027 intake the NUS Business School HCMA programme set a scholarship consideration cut-off of 15 November 2026 against a general deadline of 15 February 2027.",
          "Check the published course duration, because it sets your visa length, your enrolment period and your cost. The register publishes a duration and an estimated total cost, and the tuition you are asked for should be consistent with it.",
          "Check the intake dates. Australian programmes run Semester 1 in February, Semester 2 in July, and many also run a third mid-year intake. An intake that does not line up with your own timeline is a year of waiting.",
        ],
      },
      criteria: {
        body:
          "Australian admissions committees read a short list of things, and the course structure matters more here than elsewhere because the degree itself is regulated. The Australian Qualifications Framework level is not a formality.",
        points: [
          "The AQF level of the course. A master's degree sits at level 9, and the register shows the level of the specific course. What matters for the visa is that the course on the register is the course you are enrolling in, at the level you intend.",
          "Academic preparation against the published entry requirements, which are published and include both an Australian equivalent qualification and a grade requirement. Some programmes set an additional requirement in their own admissions policy, often for professional programmes.",
          "The intake and its deadline, and whether the provider differentiates between domestic and international deadlines. It is common for the international deadline to fall earlier.",
          "The course structure, because the credit and the specialisation determine what you actually study. A course with the same title at two providers can be a different degree in practice.",
          "English requirements, which the provider publishes and which for some programmes sit above the university default.",
          "Cost and duration together, since these two multiply into the financial evidence you will need for the visa and the CoE you will be enrolled on.",
          "And the provider's own conditions, including the academic and financial requirements they set for continuing enrolment. These are checked, and failing them costs you the visa as well as the degree.",
        ],
      },
      traps: {
        body:
          "The Australian traps cluster around the register and around dates. The agents are worth naming too, because a student visa and an education agent are two separate things and only one of them is regulated.",
        points: [
          "Course title mismatch. The title on the provider's marketing site, the title on the CRICOS register and the title on your Confirmation of Enrolment can all differ. It is the register that governs the visa, and a mismatch is a query at best.",
          "Two intakes, two deadlines, two scholarship rounds. A Semester 2 deadline and a Semester 1 deadline are not interchangeable, and a scholarship round attached to one intake does nothing for the other.",
          "Separate scholarship cut-offs. Scholarship consideration cut-offs routinely fall two or three months before the main application deadline, and they are the hardest deadline on the list because nothing is advertised about it.",
          "Provider changes its registration. A provider can have its registration varied, suspended or cancelled, and a student on a visa is affected. The register and the regulator's site are the places to check, not the provider's own marketing.",
          "The agent problem. An education agent can act for you and can be genuinely helpful, but agents are paid by providers, they are regulated under a national code, and a student should understand who is paying them and what they are being paid to do. Use a registered agent if you use one, and check the register yourself regardless.",
          "Course duration and cost assumptions. A shorter course is not automatically cheaper once you account for the living costs of an extra year, and the register's estimated total course cost is the figure to compare across providers.",
          "And the intake that quietly stops running. Some programmes change the number of intakes they offer between cycles, so last year's structure is not this year's.",
        ],
        callout: {
          tone: "watch",
          title: "A course you cannot get a visa for is not a shortlist entry",
          body: "Your visa is built on the Confirmation of Enrolment, the CoE is built on the CRICOS-registered course, and the course is what the university will enrol you in. If the register does not show your course at your provider, everything downstream is built on sand, and the cheapest time to find that out is before you write the essay.",
        },
      },
      tools: {
        body:
          "The Australian tools are official and unusually good, because the government publishes the data that everything else depends on. Use the register for eligibility, the course finder for breadth, and the department's own page for the details.",
        points: [
          "The register is the authority on whether a provider and a course exist for visa purposes. The course finder is the authority on what is available and at what cost.",
          "The Department of Education's international education pages carry the government's own guidance on qualifications, provider obligations and student rights.",
          "Your own provider's admissions page is where the entry requirements live, and the register is where the eligibility lives. You need both.",
        ],
        resources: [
          {
            title: "Study Australia: plan your studies",
            kind: "official",
            url: "https://www.studyaustralia.gov.au/en/plan-your-move/plan-your-study",
            why: "The source recorded for this milestone, and the government's planning guidance for international students. Note that the path on this link has moved, so if it does not resolve, use the Find a course page below and the register.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study Australia: find a course",
            kind: "official",
            url: "https://www.studyaustralia.gov.au/en/plan-your-studies/find-a-course",
            why: "The government's own course search, with the provider's CRICOS code, the course duration, the level of study and the estimated total cost on every result. It is the working replacement for the planning page above.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "CRICOS register",
            kind: "official",
            url: "https://cricos.education.gov.au/",
            why: "The Australian Commonwealth Register of Institutions and Courses for Overseas Students, with a course search and an institution search. This is the register your visa is built on, and the published course details are what must match your Confirmation of Enrolment.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Australian Government Department of Education: international education",
            kind: "official",
            url: "https://www.education.gov.au/international-education",
            why: "The government's guidance for international students on qualifications, providers and their obligations, and the neutral ground to check anything an agent has told you about your rights.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official Australian sources and because they are free. We take no payment for placement, and we do not take payment for anything. We do not list paid shortlist services or education agents, because both take money from the provider rather than from you, and that changes the advice you get.",
        },
      },
    },
  },

  "de-shortlist": {
    archetype: "university-shortlist",
    intro:
      "German master's programmes split into two worlds that behave completely differently, and telling them apart is the whole job. Admission-restricted programmes, marked -NC in the German system, select by grade and are the ones that fill up. Admission-free programmes, marked -F, take anyone who meets the formal requirements, which includes a recognition check. Which category you are in changes your deadline and your strategy entirely.",
    sections: {
      method: {
        body:
          "The method is to classify first and then compare. For every programme, establish four facts: is it admission-restricted or admission-free, does it require an application through uni-assist, what are the subject-specific requirements of the German school, and what is the tuition status for a non-EU applicant.",
        points: [
          "Shortlist 6 to 10 programmes. German applications are fixed-deadline, so a list you have researched properly beats a longer one you have skimmed, and 6 to 10 gives you a realistic spread across restricted and admission-free options.",
          "Identify the admission type for each. The classification is published by the university and is visible in the programme name and on the programme page, and it determines whether you are competing for places or simply qualifying.",
          "Check whether the provider requires an application through uni-assist. Many do for applicants outside the EU, and some allow a direct application as well. The two routes have different deadlines, and the uni-assist one is often the only one that runs in the main window.",
          "Check the subject-specific requirements of the German school separately from the formal entry rule. These are the ECTS totals, the specific module requirements and the subject combination rules, and they are what actually eliminates people from a programme they are otherwise qualified for.",
          "Compare tuition status, since some German states charge non-EU tuition per semester, and the amount and the conditions differ by state and by institution. Check it in the current cycle, because the states have been changing their position on this.",
        ],
      },
      criteria: {
        body:
          "German admissions decisions are made against published rules, which makes the criteria unusually legible. For a restricted programme, the grade and the subject requirements decide almost everything, and for an admission-free programme the recognition check and the formal rules decide everything.",
        points: [
          "Recognition, which sits upstream of everything. If anabin does not classify your qualification so that it opens the programme, no application will help. H+ means direct access; H- means the university assesses your individual qualification.",
          "The grade, for restricted programmes. German selection is a formula, and the published cut-offs are what your grade is compared against. Where a programme also has a subject restriction, the grade alone does not get you in.",
          "The subject requirements, which are specific and non-negotiable: required ECTS totals, named modules, and for some master's a subject combination that has to match. These are checked mechanically, so a programme you are otherwise perfect for can be closed to you by a single missing module.",
          "Language, at the level the programme publishes, and the language of instruction. English-taught programmes take an English certificate; German-taught ones take a German certificate. These are separate requirements and some applicants discover they need both.",
          "APS, where it applies, because it comes before the application rather than with it.",
          "And money, because the blocked account is a hard, quantified condition on the visa and it is a number you have to have rather than a plan you have to have. Check the current required amount and monthly figure on the German Foreign Office's own checklist, because it changes.",
        ],
      },
      traps: {
        body:
          "The German traps are mostly about dates that are set by other institutions and about programme names that look like routes. The uni-assist batching is the single most common cause of a missed German application.",
        points: [
          "uni-assist batching. uni-assist's own published winter application window for applicants outside the EU is 1 March to 1 June, and it batches applications rather than processing them individually. A direct application to the same programme may still have been open after that, and in some cases a direct application is the only one that runs. Check both, and check the dates of each.",
          "The university's own window is different. TUM's Informatics MSc publishes an application window of 1 February to 31 May for winter and 1 October to 30 November for summer, which is not the same as the uni-assist window and not the same for every provider.",
          "Winter and summer are different systems. Winter semester starts in October and summer in mid-April, not September and February, and the whole application calendar moves with them. Checking a deadline against a September start is a reliable way to be a year late.",
          "Programme names that are routes. Master, Master of Science, MSc, and the English-taught equivalents are not always the same thing, and some programmes have a German-taught and an English-taught version with different entry rules under the same name.",
          "The subject restriction, which is the requirement people miss. It is not about your degree being broadly relevant. It is about named modules and ECTS totals, and it is checked without judgement.",
          "APS before application, for applicants from India, China and Vietnam, which cannot be shortened.",
          "And the fact that admission-free does not mean admission is easy. -F means places are not allocated by grade, and it does not mean the recognition check, the subject requirements, the language certificate and the enrolment capacity are optional.",
        ],
        callout: {
          tone: "watch",
          title: "Check the uni-assist date as well as the university date",
          body: "uni-assist's winter window for applicants outside the EU runs 1 March to 1 June, and applications are batched rather than read individually. Plenty of students meet the university's own deadline and miss the one that actually applies to them. If the programme is a uni-assist programme, the uni-assist date is the date.",
        },
      },
      tools: {
        body:
          "Germany's tools are official, free, and unusually good. uni-assist tells you what you are eligible for, anabin tells you whether you are eligible at all, and DAAD tells you what the country expects of you.",
        points: [
          "uni-assist's programme search is where the admission type, the uni-assist requirement and the individual requirements for each programme are published together.",
          "anabin settles the recognition question in minutes, and it is the check to do before anything else.",
          "DAAD carries the country-level information that the individual university pages assume you already know, including the APS process and the recognition rules.",
        ],
        resources: [
          {
            title: "uni-assist",
            kind: "official",
            url: "https://www.uni-assist.de/en/",
            why: "The page behind this checkpoint and the central application portal for most German universities. Its programme search shows admission type, requirements and deadlines in one place, and its own published application window is the date that binds a large share of applicants.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "anabin",
            kind: "tool",
            url: "https://anabin.kmk.org/",
            why: "The recognition database. Check your institution and your degree here before you apply to anything, because an H- classification changes what you can do and costs nothing to find out.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "DAAD",
            kind: "official",
            url: "https://www.daad.de/en/",
            why: "The German Academic Exchange Service, which publishes the country-specific requirements, runs the APS process with the German missions, and explains the funding and study routes in a way universities assume you already know.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Make it in Germany: studying in Germany",
            kind: "official",
            url: "https://www.make-it-in-germany.com/en/study/study-in-germany",
            why: "The German government's own guide to the application routes and the practical steps around them, including the blocked account and the visa, which are the parts that determine whether an admission is usable.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official portals, they are free, and they are the pages the decisions are made from. We take no payment for placement, and we do not take payment for anything. We do not list paid shortlist services, and we would not list a consultancy that takes a commission from a university for the same reason.",
        },
      },
    },
  },

  "fr-shortlist": {
    archetype: "university-shortlist",
    intro:
      "French master's admissions run on three separate routes, and each one has its own platform, its own deadline and its own consequences. Government-funded Master 1 applications go through a national platform. Master 2 goes through Monmaster for most subjects and through the university for others. International master's programmes are applied to directly. Getting the route right comes before getting the ranking right.",
    sections: {
      method: {
        body:
          "The method is to identify the route, the platform and the language for every programme before you compare anything else. A programme that is on Monmaster with a single national deadline behaves nothing like a programme you apply to directly, and treating them the same is how a student misses a round.",
        points: [
          "Shortlist 6 to 10 programmes. French master's admissions are usually one round per intake rather than rolling, so a missed platform deadline usually means a year rather than a fortnight.",
          "Identify whether each programme is a Master 1, a Master 2 or an international master's. The level determines the route, the platform and often the funding model, and the three are not interchangeable.",
          "Check the application platform: Monmaster, a university's own admissions service such as a campusonline-style system, or direct application to the department. Each has its own calendar, and the same university can use different platforms for different programmes.",
          "Note the language of instruction and any French-language requirement, and whether the programme requires a specific level of French. This is a filter, and it excludes more applicants than the grades do.",
          "Check the tuition position for international students, because French public universities charge different international tuition tiers and the tiers differ between programmes and between institutions. The cost range across otherwise comparable programmes is wide.",
        ],
      },
      criteria: {
        body:
          "French admission committees weigh a documented academic trajectory, and the documentation standard is higher than elsewhere because the system is built on equivalency. A transcript that cannot be read against the French cycle is a problem you have to solve before you are read.",
        points: [
          "The academic record, mapped onto the French cycle. The baccalaureate, the bachelor's and any master's are all read, and the equivalence question is asked explicitly.",
          "Language level, published as a specific level rather than a general one. For a French-taught programme, the certificate is part of the entry requirement, and the Campus France attestation is what evidences it.",
          "The programme type, because a government-funded Master 1 and a university-funded Master 2 have different admission routes, different tuition and different funding.",
          "The application platform and its deadline, which for a Monmaster programme is a single national window rather than a rolling one.",
          "Funding, which in France is structured around state grants, and where the scheme you qualify for changes your costs substantially. The eligibility conditions are published and they are specific.",
          "And for professionally accredited programmes, the accreditation. In engineering and some health fields, the degree carries an accreditation that determines whether it is recognised for the profession you are entering, and that is worth more than a ranking difference.",
        ],
      },
      traps: {
        body:
          "The French traps are route confusion and deadline surprise. Both are cheap to avoid with one careful check per programme, and both cost a year when missed.",
        points: [
          "Monmaster is a single national window. For most Master 1 programmes and for a large share of Master 2 programmes, the platform closes once, and the number of places per programme is limited. Applying late does not mean applying to a full programme.",
          "Not every programme is on Monmaster, and assuming that it is means you miss a direct application entirely, or apply to a platform the programme does not use.",
          "Master 1 and Master 2 confusion. A Master 2 is often a continuation of a French Master 1, and the entry route, the funding and the platform all change. International applicants who have not done a French Master 1 usually find that certain Master 2 programmes are closed to them.",
          "The language requirement, which is a gate. A French-taught master's wants a certificate at a stated level, and the level is often higher than a general French certificate. English-taught programmes have their own English requirement, and the two are separate.",
          "The Campus France attestation, which is not the language test. The attestation is what the university and the visa ask for, and it is issued on the basis of a recognised test plus a fee, and it has to exist before the visa appointment can be booked.",
          "Programme renames and restructures, including the move of some programmes between public and private status, which changes the tuition tier and the funding route for the same course.",
          "And the new accommodation rule. Under the 2026 changes, student visa applicants must provide proof of accommodation covering the first three months of their stay, where a contact address used to be enough, and the proof has to be in place when you file.",
        ],
        callout: {
          tone: "watch",
          title: "One platform, one window, limited places",
          body: "A Monmaster programme usually has a single national deadline and a stated number of places. It is not a rolling system where a good application can arrive late and be considered. If Monmaster is your route, the date on the platform is the date, and the week before it is not a place to negotiate.",
        },
      },
      tools: {
        body:
          "France publishes more of its own material than most countries, and the platforms are where the real requirements live. Start with the platform, then with the ministry's list of institutions, and use Campus France for the process around them.",
        points: [
          "Monmaster is where the programme entry tells you the level, the place count, the platform deadlines and the required documents, and where the application itself is made.",
          "The ministry's list of higher education institutions is the authoritative answer to which bodies are recognised, which is worth checking for any programme whose status you are unsure of.",
          "Campus France carries the Études en France procedure and the language and attestation requirements, which sit on top of whatever the university asks for.",
        ],
        resources: [
          {
            title: "Campus France",
            kind: "official",
            url: "https://www.campusfrance.org/en",
            why: "The page behind this checkpoint and the official body for French study, covering the attestation, the accepted language certificates and the process around application and arrival. It is the broadest single source for a French application.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Monmaster",
            kind: "official",
            url: "https://www.monmaster.fr/en/",
            why: "The national application platform. The programme pages carry the level, the number of places, the platform deadlines and the document list, which is where the route and the date both come from.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Campus France: Études en France procedure",
            kind: "official",
            url: "https://www.campusfrance.org/en/application-etudes-en-france-procedure",
            why: "The pre-consular step the visa runs through, in the order it has to happen. It is upstream of the visa and it has its own review time, so it belongs at the start of the plan rather than the end.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Ministère de l'Enseignement supérieur et de la Recherche",
            kind: "official",
            url: "https://www.enseignementsup-recherche.gouv.fr/en",
            why: "The ministry's own site, which lists the recognised higher education institutions and publishes the national policy on admissions and fees. Useful for checking that an institution and a programme are properly constituted.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official French sources, they are free, and they are where the actual requirements and deadlines are published. We take no payment for placement, and we do not take payment for anything. We do not list paid shortlist services, because the platforms and the ministry publish everything you need for free.",
        },
      },
    },
  },

  "sg-shortlist": {
    archetype: "university-shortlist",
    intro:
      "Singapore's admissions are fixed and intake-driven, and each autonomous university runs its own intake and its own window. The first planning decision is not which university, it is which intake. NUS Computing, for example, publishes separate windows for its master's, its PhD and its continuing-education intakes, and choosing the wrong one costs you a term.",
    sections: {
      method: {
        body:
          "The method is to select the intake first, then the programme, then the university. Singapore has few intakes and narrow windows, so the date determines the search. Once the intake is fixed, the shortlist is short and every programme on it can be checked properly.",
        points: [
          "Shortlist 4 to 8 programmes across the autonomous universities. A shorter list than other countries is right here, because the windows are narrow enough that a long list cannot be researched to the same depth.",
          "Record each programme's intake, application window and stated minimum scores. NUS Computing publishes application dates of 1 October 2026 to 31 January 2027 for the August 2027 master's intake, and NTU runs separate Semester 1, Semester 2 and Trimester intakes, so the intake determines the deadline rather than the other way round.",
          "Check the programme's curriculum for the computing or data specialisation you actually want. Two programmes with the same title at two universities can have genuinely different content, and the module list is where you find out.",
          "Note whether the programme is coursework or research, because references, interviews and supervisor requirements are handled completely differently, and a research-degree application has a supervisor to find before it has anything else.",
          "Record the scholarship consideration cut-off separately from the application deadline, and check the fee and the course duration against the published ones while you are on the page.",
        ],
      },
      criteria: {
        body:
          "Singapore's criteria are published in the admissions guides, and they are narrow by international standards. The cohort profile matters as much as the stated minimum, and both are worth reading before you decide where to aim.",
        points: [
          "The published minimum scores, and the fact that these are floors rather than targets. A competitive cohort will be well above the stated minimum for the same programme, which is why applying at exactly the minimum is a decision rather than an accident.",
          "Academic fit, read from the programme's own prerequisites and from the module list. Singapore's programmes are specific about the courses they expect you to have taken, and the expectation is checkable.",
          "The intake and the window, which are the hard constraints, and the fact that international application windows are often earlier than the general ones.",
          "Funding, and the fact that the scholarship cut-off falls before the application deadline. That makes the scholarship deadline the first deadline on the list for anyone who needs money, and it is the one that is easy to miss because nothing else in the process is due yet.",
          "The research or coursework distinction, which changes the shape of the whole application, and for research degrees the supervisor availability, which is a real capacity limit rather than a formality.",
          "And the practicalities: campus, the cost of living in the city rather than the tuition alone, and the intensity of the assessment in a system where the credit hours per course are high.",
        ],
      },
      traps: {
        body:
          "Singapore's traps are all about the calendar and the cap. The system is unusually clean, and that makes the mistakes unusually simple to make.",
        points: [
          "Intake mismatch. NUS Computing publishes separate application windows for its master's, PhD and continuing-education intakes. Applying to the wrong one is a rejected application rather than a delayed one, because the portal will not accept it.",
          "Scholarship cut-offs before application deadlines. The NUS Business School HCMA programme set a scholarship consideration cut-off of 15 November 2026 against a general deadline of 15 February 2027 for the August 2027 intake. Miss the first and the place is still there but the money is not.",
          "A separate international deadline. Where a programme publishes both, the international window is earlier. Check whether the number on the page is the domestic deadline or the international one.",
          "Conditional offers that need clearing after a deadline that has already passed, in some cases because the award is only confirmed at the end of the year and the clearance window is short.",
          "Programme renames between intakes. Singapore's autonomous universities re-badge programmes and adjust titles regularly, and a programme you researched last year may be running under a different name with a different curriculum now.",
          "Cohort capacity. Singapore's programmes are small and the international places are limited. Being a good fit is not the same as being in the group that is admitted, and the second depends on the size of the cohort as much as on you.",
          "And the sequencing that follows admission, which is a trap of a different kind: the Student Pass application must be submitted no later than one month before the course commences, and the formalities are completed in person in Singapore after you arrive. An offer is not the end of the process.",
        ],
        callout: {
          tone: "watch",
          title: "The scholarship date is the first deadline, not the last",
          body: "Scholarship consideration cut-offs in Singapore routinely fall two or three months before the main application deadline, and they are the hardest date to hit because nothing else is due yet and the application deadline is what everyone is watching. Put the scholarship date in your calendar first, then work backwards.",
        },
      },
      tools: {
        body:
          "Each university publishes its own requirements and its own windows, and there is no single national directory for postgraduate courses in Singapore. That is not a gap so much as a fact about the system, and it means the department pages are the primary source.",
        points: [
          "The department page is where the window, the requirements and the curriculum are, and it is the only place they are published consistently.",
          "The university-level admissions pages carry the general requirements that apply across faculties, which is where the differences between programmes come from.",
          "Check each university separately, because the intake structures and the deadlines genuinely differ between them.",
        ],
        resources: [
          {
            title: "NUS Computing: graduate programmes",
            kind: "official",
            url: "https://www.comp.nus.edu.sg/graduate/",
            why: "The page behind this checkpoint, and the clearest published example of the intake structure that makes Singapore planning unusual: separate windows for the master's, the PhD and the continuing-education intakes, each with its own dates.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NUS: applying to graduate studies",
            kind: "official",
            url: "https://nus.edu.sg/grad/admissions/applying",
            why: "The university-level requirements that apply across faculties, including the general English requirement and the document list. It is where you find the rules that are the same everywhere rather than the ones that differ.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NTU: graduate admissions",
            kind: "official",
            url: "https://www.ntu.edu.sg/admissions/graduate",
            why: "NTU's own intake structure, with separate Semester 1, Semester 2 and Trimester intakes and their windows. Worth reading alongside NUS precisely because the two run on different calendars.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Singapore Management University",
            kind: "official",
            url: "https://www.smu.edu.sg/",
            why: "The third autonomous university, and a natural place to check the business and analytics master's programmes against the computing ones. It also shows how differently an autonomous university publishes from a faculty-run department.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the universities' own published requirements, they are free, and they are the pages a shortlist in Singapore is actually built from. We take no payment for placement, and we do not take payment for anything. We do not list paid shortlist services, because the department pages give you everything for nothing.",
        },
      },
    },
  },
};

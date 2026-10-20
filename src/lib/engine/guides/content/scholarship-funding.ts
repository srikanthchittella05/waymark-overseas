import type { GuideContent } from "../types";

const V = "2026-10-20";

/**
 * The funding dossier.
 *
 * Funding is the checkpoint where most plans are quietly wrong. A student
 * reads "scholarship" and assumes a national scheme with a published amount
 * and a single application. In four of the seven countries Waymark covers,
 * nothing like that exists.
 *
 * What is actually true, and what this dossier keeps saying:
 *
 *   1. THERE IS USUALLY NO NATIONAL SCHEME. The United States has none for
 *      master's students. Australia and Canada have a handful, mostly
 *      restricted by citizenship or by level of study. Funding is decided by
 *      the institution, per programme, per year.
 *   2. THE DEADLINE IS EARLIER THAN THE ADMISSION DEADLINE. Almost without
 *      exception, the money has its own calendar and its own cut-off.
 *   3. THE AMOUNT IS NOT PUBLISHED CENTRALLY. Where an authority publishes a
 *      figure we quote it and name the source. Where it does not, we say so
 *      and say where to look, rather than inventing a number that reads as
 *      authoritative and is not.
 *
 * No award is ever promised here, and nothing on these pages is a paid
 * placement. A scholarship agency that asks for a fee to "find you
 * scholarships" is usually selling you a list of scholarships you could have
 * found yourself, and sometimes selling your data to the schools.
 */
export const SCHOLARSHIP_FUNDING: Record<string, GuideContent> = {
  "us-funding": {
    archetype: "scholarship-funding",
    intro:
      "There is no US national scholarship for master's students. Some departments fund nothing at all, and Stanford CS states outright that it does not offer financial support for MS students. US funding is a per-programme negotiation, so treat self-funding as the default case and hunt for aid in parallel.",
    sections: {
      schemes: {
        body:
          "US master's funding comes from four places, and only one of them is a scholarship in the sense most students mean. The first is money the school gives you. The second is money you are paid for working. The third is money from a foreign government, yours or another. The fourth is money from a scheme with a national name, and those are almost all doctoral.",
        points: [
          "University and departmental scholarships. These are awarded by the school, not by a national fund, and each one has its own criteria, its own deadline and its own budget. The budget is the real constraint: a scheme funded until it is exhausted will close, and the closure is usually not announced.",
          "Funded assistantships, called GRA, GTA, RA or TA depending on the department. This is the main route to a funded master's in the US. An assistantship is a job with a stipend, and it very often comes with a tuition waiver or reduction attached. Whether a programme hires master's assistants at all is a departmental decision, not a national one, and it changes from year to year.",
          "The Fulbright Foreign Student Program. A US government scheme run by the Department of State with the Fulbright commission in each participating country. It funds a master's degree at a participating US institution, and the benefits are published. It is not open to applicants from every country, and in most countries there is a home-government selection stage before the US application is even possible.",
          "Named US fellowships. The famous ones, including the National Science Foundation Graduate Research Fellowship Program, the Hertz Foundation Fellowship and Stanford's Knight-Hennessy Scholars Program, fund doctoral study. If you are applying to a master's, this is not where your energy goes.",
          "Your own government. Many countries run schemes for nationals studying abroad, and some of them place you in a specific programme with funding attached. If your country has one, it is usually a better return than applying on the US side, because you are competing in a smaller pool.",
        ],
        callout: {
          tone: "watch",
          title: "Nobody can promise you an award",
          body: "Not us, not the university, not an agency. If a service offers to 'secure' a scholarship for a fee, it is selling you a list you could have built yourself from the sources on the last page. The only honest position is that funding is a per-programme negotiation, which is why the plan is to apply in several places and price the self-funded case as the default.",
        },
      },
      amounts: {
        body:
          "There is no single number to plan against, and we are not going to invent one. What a US scheme is worth depends on the department, and the only honest way to answer this question is per programme rather than per country. The figures below are the ones an authority actually publishes; where none exists, we point you at the page that does.",
        points: [
          "An assistantship is normally a stipend plus a partial or full tuition reduction, and the stipend is set by the department. Some departments publish the rate on their funding page. Most do not. Ask the graduate coordinator, in writing, for the current figure for a master's student in your programme and your department, and get the answer in writing.",
          "A university scholarship is more often a partial tuition award than a full one, and it is frequently awarded automatically on admission with no separate application. The programme's own admissions page will say which of the two it is.",
          "The Fulbright Foreign Student Program publishes its benefits, which include full tuition, a maintenance allowance, health insurance and travel. Read the current benefits list on the programme's own page rather than a summary written by someone else who read it in a different year.",
          "Your aid changes the visa paperwork. A funded offer is reflected in the estimated cost of attendance on your Form I-20, and the consular officer assesses your funds against that figure rather than against the full sticker price. An I-20 issued before the aid decision may therefore show a much larger number than the one you end up with, and it is worth asking whether it can be updated.",
        ],
        callout: {
          tone: "watch",
          title: "Where a number has to come from",
          body: "Every figure in this section has to come from one of three places: the programme's own admissions page, the department's financial support page, or the scheme administrator. We do not publish award amounts for US master's funding because no single authority publishes them, and a confident-looking number that nobody publishes is worse than no number at all.",
        },
      },
      windows: {
        body:
          "US funding runs on two kinds of deadline, and they behave differently. Some schemes have a date on the calendar. The rest have a budget, and their real deadline is the day the money runs out, which is usually not published anywhere. Plan for the first and watch for the second.",
        points: [
          "Scholarship deadlines cluster around the admission deadline but often sit earlier, because the funding committee meets before the admissions committee. A programme with a 1 December deadline may want funding applications by 1 November, and the funding decision may be made without you even being admitted.",
          "Rolling-admission programmes often have a rolling funding budget. Once the annual allocation is committed, the scheme is closed even though the programme is still taking applications. Ask directly, in writing, whether funding is still available in the round you are applying to.",
          "Assistantship decisions are frequently made alongside the offer rather than before it. That means you do not know your funding position at the moment you have to decide whether to accept, which is the argument for asking about the assistantship budget before you commit to anything.",
          "A separate funding application is a separate document, and it will ask for a statement of purpose, a budget or a research proposal you have not written yet. Check the required documents before you apply. A funding application that is missing a document is usually just a lost deadline.",
        ],
        roadmap: [
          {
            label: "While you are choosing programmes",
            title: "Build the funding map",
            goal: "Know, for each shortlisted programme, whether money exists at all, and who decides it.",
            hours: "2-3 hours per programme",
            focus: [
              "For each programme, find the department's funding page and write down one sentence: does this programme fund master's students, and how? If the answer is no, the number on the funding page is your budget.",
              "Look for the word 'guaranteed'. Some departments guarantee funding to admitted master's students, others compete for a fixed pot, and the difference is worth thousands.",
              "Check the assistantship route separately. Which roles exist for master's students, who hires them, and when are the decisions made?",
              "Note the funding deadline next to the admission deadline on the same line, because they are different dates.",
            ],
            checkpoint: "You have a one-line funding answer for every programme on your list, including the ones where the answer is no.",
          },
          {
            label: "The month you apply",
            title: "Make the funding interest visible",
            goal: "Get your application into the funding consideration, not just the admission consideration.",
            hours: "4-6 hours of writing",
            focus: [
              "Answer every funding question in the application, including the ones that look irrelevant. Some programmes screen on the form before they read the essay.",
              "If the application has a separate funding section or a financial need statement, write it properly. It is often read by different people from your admissions essay.",
              "Get any funding-specific documents ready early: a CV variant, a research proposal, a budget, references.",
              "Ask your referee, if you need one for funding, well before the deadline. A referee asked on the funding deadline is a missed funding deadline.",
            ],
            checkpoint: "Every funding question in the application is answered, and the required documents exist as finished drafts.",
          },
          {
            label: "After you submit",
            title: "Pursue the separate schemes",
            goal: "Catch the national and external schemes that run on their own calendar.",
            hours: "3-4 hours",
            focus: [
              "Apply for your own government's scholarship schemes if you are eligible. The competition pool is usually much smaller than the US-side one.",
              "If you are in a country covered by the Fulbright Foreign Student Program, read your country's profile and its opening and closing dates, which DFAT publishes per country and per year.",
              "Track the department's funding page weekly. Schemes that close when the budget runs out do not announce it, so the page going quiet is your signal.",
            ],
            checkpoint: "Every scheme you are eligible for has been applied to, or you have a written reason why not.",
          },
          {
            label: "At the offer",
            title: "Turn the offer into a number",
            goal: "Know exactly what you will pay, and by when, before you accept anything.",
            hours: "2-3 hours, plus a meeting",
            focus: [
              "Get the assistantship offer in writing: the amount, the start date, the teaching or research hours it expects, and the tuition reduction it carries.",
              "Ask what happens to the award if you defer, if you change course, or if the funding is cut. Each has a different answer and each is written down somewhere.",
              "Reconcile the award against the I-20 estimate, and ask the school to issue a corrected I-20 if the numbers have moved.",
              "Price the self-funded case anyway. If the offer falls through, you need the number to be ready the same day.",
            ],
            checkpoint: "You have the final cost of attendance in writing, and the funding terms in writing.",
          },
        ],
      },
      strategy: {
        body:
          "Applying for funding is a numbers game with a terrible information asymmetry: you cannot see the budget, you cannot see the competition, and you find out at the end. The strategy is to widen the net, remove the reasons you would be filtered out before you are read, and never negotiate against a deadline you did not know existed.",
        points: [
          "Apply everywhere you are eligible. The cost of an application is time; the cost of a missed deadline is a year. Assume you will not win the top scheme and plan for the second one.",
          "Do not self-select out on an eligibility line. Plenty of students read a citizenship, age or year-of-study condition and assume they are outside it. Read the scheme's own eligibility text, because the shorthand on a search result is usually wrong.",
          "Separate the merit case from the financial need case. Many US schemes are merit-only and a financial-need narrative in the wrong place actively weakens the application. Find out which kind of scheme it is before you write anything.",
          "Be precise about your status in the form: citizenship, whether you already hold funding, whether you can accept a partial award, and whether you are applying to other schemes. Vagueness here is read as a problem, because it usually is one.",
          "Ask questions that get answers. 'Do you fund master's students, and when is the decision made' is a good question. 'Can I get financial aid' is not, because it can be answered yes without helping you.",
          "Never pay for scholarship search. The information is public and the good schemes are published by the institutions themselves. A paid agent adds a middleman between you and a form that is free to submit.",
        ],
        callout: {
          tone: "good",
          title: "The one that actually moves the needle",
          body: "Ask the programme, in writing, one question early: does this programme fund master's students, and by what mechanism? The answer tells you whether you are budgeting for one, three or five years of self-funding, and no amount of research on the internet can tell you what a department will decide.",
        },
      },
      resources: {
        body:
          "The US material worth reading is published by the school, the programme and the scheme administrators. There is no national scholarship directory for master's students, and there is no honest way to make one.",
        resources: [
          {
            title: "Stanford CS: master's admissions FAQ",
            kind: "official",
            url: "https://www.cs.stanford.edu/admissions/masters-admissions-frequently-asked-questions",
            why: "The official source for this milestone, and the clearest published example of a programme saying outright that it does not fund MS students. It also covers deferrals and deadlines. Read it as a template for the questions to ask your own programme.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ICE SEVP: students",
            kind: "official",
            url: "https://www.ice.gov/sevis/students",
            why: "The immigration authority's own page on the student file, and the place to see how funding and the Form I-20 fit together. Worth reading before you assume a scholarship will change the number on your I-20.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study in the States: students",
            kind: "official",
            url: "https://studyinthestates.dhs.gov/students",
            why: "The Department of Homeland Security's own guide to the student process, and the front door for what comes after admission: the I-20, the SEVIS fee, arrival and check-in.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Fulbright Foreign Student Program: how to apply",
            kind: "official",
            url: "https://www.fulbrightprogram.org/fulbright-foreign-student/apply",
            why: "The official application route for the US government's flagship scholarship for foreign students, with the eligibility, the benefits and the country-by-country deadlines in one place.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Fulbright Program home",
            kind: "official",
            url: "https://www.fulbrightprogram.org/",
            why: "The umbrella site for every US Fulbright programme, and the place to check which scheme matches your country and your level of study before you invest an evening in the wrong application.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official US sources for this checkpoint and the clearest complete set we found, not because anyone paid us. We take no payment for placement, and we do not take payment for anything. If a provider asks you for a code in exchange for a link on this page, that is not us.",
        },
      },
    },
  },

  "ca-funding-apps": {
    archetype: "scholarship-funding",
    intro:
      "Canada runs two calendars and students only watch one. Admission has its own deadline, and funding has an earlier one. Toronto Metropolitan tells international applicants to submit by 1 December 2026 for preference on graduate financial support, which is a month earlier than most people plan for.",
    sections: {
      schemes: {
        body:
          "Canadian graduate funding for international master's students comes from the institution far more often than from the federal government. The schemes below are the real ones, in roughly the order they are likely to matter to you.",
        points: [
          "Guaranteed funding packages. Many Canadian universities offer admitted thesis master's students a package combining tuition and a living stipend for the length of the degree, sometimes as a guarantee and sometimes as a competitive offer. Whether it is a guarantee and what it covers is decided by the department, and it is published on the programme's own funding page.",
          "Admission and entrance scholarships. Awarded on the strength of your application, usually automatically, sometimes through a separate form. These are the most accessible money in the Canadian system for an international student, because they are not restricted by citizenship.",
          "Departmental research and teaching assistantships. A GA or TA position is a job with a stipend, and it is the standard route to funding in a research master's. The work, the hours and the rate are set by the department.",
          "The Canada Graduate Research Scholarship, Master's program (CGRS M), run by the three federal research agencies. It is real, it is national, and it is administered through your university, which means you apply to up to three institutions through a shared portal rather than to the agencies directly. It is a research scholarship, so it is aimed at thesis master's students with a supervisor, not coursework students.",
          "Provincial scholarships. Some provinces run graduate scholarship schemes for students at their own institutions, of which the Ontario Graduate Scholarship is the best known. These are administered by the universities, and international students are eligible for many of them, so it is worth asking the graduate funding office what the province's scheme is for your programme.",
          "External bodies. Agencies such as Mitacs run research fellowships for graduate students in the sciences, and some industries fund graduate positions in their own subject areas. These are narrow, they are competitive, and they often run on their own calendar.",
        ],
        callout: {
          tone: "watch",
          title: "The Vanier scheme is closed",
          body: "The Vanier Canada Graduate Scholarships programme is no longer accepting applications and has been replaced by the harmonised Canada Graduate Research Scholarship programme. If your research points you at a page that still promotes Vanier, you are reading an archive, not a live application route. Check the current tri-agency page before you build a plan around it.",
        },
      },
      amounts: {
        body:
          "Most Canadian funding is not published as a number anywhere central, so the figures you can rely on are the ones on the programme's own page. The national scheme is the exception, and its value is published.",
        points: [
          "The CGRS M is published as a value of $27,000 for 12 months and is not renewable. The programme page also publishes a 1 December application deadline and the rule that you may apply to up to three institutions. Treat the figure as the value for the current competition and check the page before you rely on it, because the programme and its terms are revised between rounds.",
          "A guaranteed funding package is set by the department. It is normally read as a tuition amount plus a monthly living stipend for a set number of terms. Neither number is set nationally, and the package page on your programme's site is the only place to read your own.",
          "GA and TA stipends are set departmentally and often differ between the sciences and the humanities in the same university. The graduate funding office can give you the current rate, and it is worth asking for the rate and the expected hours in the same message.",
          "Entrance scholarships are often partial: a set amount off tuition for the first year, sometimes renewable on grades. They look smaller than an assistantship but they are also much less work to get, and the two stack more often than students assume.",
        ],
        callout: {
          tone: "watch",
          title: "Ask what 'guaranteed' covers",
          body: "A guaranteed package may cover tuition only, or tuition and a stipend, and it may be conditional on a minimum grade or a supervisor remaining in place. Read the small print and ask the funding office directly. A guaranteed number that quietly turns out to be a tuition-only number is a very expensive surprise.",
        },
      },
      windows: {
        body:
          "The single rule to take from this section: the funding deadline is not the admission deadline, and it is usually earlier. Plan backwards from the funding date and let the admission date follow from it.",
        points: [
          "Federal schemes have published annual deadlines. The CGRS M closes on 1 December, and the universities then have their own internal cut-offs that are much earlier, because the institution has to review and rank the applicants it is putting forward. The internal deadline is the one that matters to you.",
          "Institutional funding deadlines sit in the same early window. Toronto Metropolitan's published date of 1 December 2026 for preference on graduate financial support is the pattern: the money is allocated on the early round, and there is much less of it, or none, on the later one.",
          "Entrance scholarships usually have a single cut-off tied to the main application. If a scheme says 'automatically considered', you still need to be in the round, and being late is still being late.",
          "Scholarship rounds can close early when the allocation is used up. A page that stops taking applications is not a sign that you are too late for the programme; it is a sign that the money is gone. Keep looking for the next round or the next university.",
        ],
        roadmap: [
          {
            label: "With your shortlist",
            title: "Map both calendars",
            goal: "Know every funding date for every shortlisted university, in one list.",
            hours: "3-4 hours",
            focus: [
              "For each university, find the funding or scholarship page and write down the deadline in the same table as the admission deadline.",
              "Find the internal cut-off for the CGRS M at each university you are considering, not just the federal date. These differ and the internal one is earlier.",
              "Note which schemes are automatic and which need a form, and which need a separate document set.",
              "Put the earliest date in the whole table in your calendar as a hard reminder.",
            ],
            checkpoint: "One table, every funding date, and the earliest one is in your calendar.",
          },
          {
            label: "Eight to ten weeks out",
            title: "Write for the early round",
            goal: "Have a complete funding application ready before the early deadline, not at it.",
            hours: "6-8 hours of writing",
            focus: [
              "Draft the funding statement, research proposal and CV variant that the scheme asks for. These are not the same documents as your admission essay.",
              "Ask your supervisor, if you have one, to read the proposal. It is the single biggest difference between a competitive and an uncompetitive application, and it is free.",
              "Line up references for the funding route separately from the admission route if the scheme asks for them.",
            ],
            checkpoint: "Every funding document is drafted, and the proposal has been read by someone who knows the field.",
          },
          {
            label: "The early deadline",
            title: "Submit to the early round",
            goal: "Be in the first group considered, which is where most of the money is allocated.",
            hours: "2-3 hours",
            focus: [
              "Submit the funding application, and confirm the receipt. Silent failures happen and they are indistinguishable from a missing file.",
              "If the main application has a funding-interest flag, set it.",
              "Where the scheme asks whether you would accept a partial award, answer honestly and check the impact on your visa evidence before you do.",
            ],
            checkpoint: "Submission confirmed, with a timestamp or a reference number in your inbox.",
          },
          {
            label: "After the early round",
            title: "Keep the second calendar running",
            goal: "Catch the schemes with their own timetable, and have the fallback ready.",
            hours: "3-4 hours per month",
            focus: [
              "Track external and provincial schemes on their own schedules, including the December federal round and any winter competition.",
              "Ask the department when the assistantship allocation for your programme is decided, and what happens to the students who miss the early round.",
              "Keep your self-funded budget live. It is the case you will need if the funding does not land, and having it ready is what lets you decide quickly.",
            ],
            checkpoint: "You have a complete picture of what you have applied for, and a priced fallback.",
          },
        ],
      },
      strategy: {
        body:
          "Canadian funding is won mostly before you are read, and mostly by being early and complete. The substantive part of the strategy is choosing the right supervisors, because in a research master's the funding conversation starts with the person who will supervise you.",
        points: [
          "Approach potential supervisors before you apply, and ask about funding directly. Whether a supervisor has an assistantship to offer, and how many, is something they know and something the admissions page usually does not say. It is the highest-value conversation in the whole application cycle.",
          "Apply to more than one university in the CGRS M portal, because you are allowed to and because a university's internal ranking is not visible to you. The award is not transferable once you hold it, but applications can be multiple.",
          "Check whether an award requires you to hold an approved study permit by a date. Some awards and some universities make the permit a condition of the award, and a permit decision that lands late can cost you money you have already counted on.",
          "Include your funding interest in the main application where the form asks for it. Where a university has a separate funding form, do both, and make sure the two do not contradict each other.",
          "Never pay a scholarship agency. The schemes are published by the funders and administered by the universities. A paid service adds a middleman to a form that is free to submit, and some of them resell your details to the schools you apply to.",
        ],
        callout: {
          tone: "good",
          title: "The question that unlocks the most",
          body: "Email a potential supervisor and ask: does this programme fund master's students, how is the funding decided, and by when. A supervisor who answers that question clearly is telling you what your next two years look like. A supervisor who does not answer is telling you something too.",
        },
      },
      resources: {
        body:
          "Canada's official material is worth more than anything written about it, and the tri-agency pages publish the national scheme's value, deadline and rules directly.",
        resources: [
          {
            title: "Toronto Metropolitan: graduate application dates",
            kind: "official",
            url: "https://www.torontomu.ca/graduate/future-students/application-dates/",
            why: "The official source for this milestone, and a worked example of the pattern the whole dossier is about: a funding date that sits a month ahead of the admission date for international applicants.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Canada Graduate Research Scholarship, Master's program",
            kind: "official",
            url: "https://nserc-crsng.canada.ca/en/funding-opportunity/canada-graduate-research-scholarship-masters-program",
            why: "The federal agencies' own page for the master's research scholarship, with the published value, the 1 December deadline, the rule that you may apply to up to three institutions, and the full instructions for the application portal.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Canada.ca: study in Canada",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html",
            why: "The immigration authority's overview of studying in Canada, including how the study permit, the Letter of Acceptance and your financial evidence fit together. Read it before you commit to a funding plan you cannot document.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Designated learning institution list",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html",
            why: "The official list of schools you can get a study permit for. Check your programme is on it, and use the list to find institutions with the funding you want rather than the other way round.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Canadian universities directory",
            kind: "site",
            url: "https://www.canadianuniversities.ca/",
            why: "A searchable directory of Canadian institutions and their programmes, useful for finding schools with the subject and funding you want rather than working from a list of names you already have.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official Canadian sources for this checkpoint and the clearest complete set we found, not because anyone paid us. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "au-scholarships": {
    archetype: "scholarship-funding",
    intro:
      "Australian funding runs on a second calendar, and the government schemes are the part students miss. The Australia Awards and the Research Training Program are real, well funded and highly competitive, and they close on their own dates, often long before the course application deadline.",
    sections: {
      schemes: {
        body:
          "Australian scholarship money comes from three levels: the Australian Government, the state governments, and the universities. For an international student the government level is usually the biggest prize and the hardest to reach.",
        points: [
          "Australia Awards Scholarships, administered by the Department of Foreign Affairs and Trade. They are for citizens of participating countries, mostly developing and partner countries in the Indo-Pacific, and they fund a full-time undergraduate or postgraduate course at a participating Australian institution. The benefits are published, and the application runs by country with its own opening and closing dates.",
          "The Research Training Program, administered by the Australian Government through the Department of Education and delivered to universities as a block grant. It supports research degrees, including research master's programmes, and a university that holds the grant offers it to students as a fee offset, a stipend, or both. It is for students doing research, not coursework.",
          "International Education Scholarships, the Australian Government's own scheme for international students, which is distributed through universities. Eligibility, fields and closing dates are set nationally and are published by the Department of Education.",
          "University international scholarships. Every large Australian university runs several, and they are the most accessible money in the system because they are not restricted by citizenship. They are usually merit-based, partial, and awarded automatically with the offer unless the university asks for a separate form.",
          "Destination Australia and other government-funded mobility and project schemes, which are aimed at particular countries and fields and open on their own schedule.",
        ],
        callout: {
          tone: "watch",
          title: "Awards are not scholarships, and one scheme has ended",
          body: "The Endeavour Leadership Program, which for years was the best-known Australian Government award for study and research, has ceased and no new rounds are being run. If your research points at it, you are reading a closed scheme. The live equivalents are the Australia Awards, which the Department of Foreign Affairs and Trade runs, and the International Education Scholarships, which the Department of Education runs.",
        },
      },
      amounts: {
        body:
          "Australia publishes more about its government scholarship benefits than most countries, but almost nothing about the amounts attached to university scholarships, which are set institution by institution and change every year. Here is what can be stated, and where each figure comes from.",
        points: [
          "The Australia Awards publish a benefits list rather than a single figure: full tuition fees, a return economy airfare to and from Australia, a once-only establishment allowance towards accommodation, books and study materials, a fortnightly contribution to living expenses, Overseas Student Health Cover for the award holder, and compulsory introductory academic and English programs. The allowance and living contribution rates are set by DFAT and are the figures most worth reading on the current page.",
          "The Research Training Program sets a minimum stipend rate, and the Department of Education publishes the current rates. A university can and does top them up, and often adds a fee offset on top. The Department's financial assistance page is where the published minimum lives.",
          "University scholarships are commonly a partial tuition fee offset for the duration of the degree, sometimes with a small book or travel allowance. They are published on the university's own scholarships page, and the amounts change each year, so a figure you read today may not be the figure you are offered.",
        ],
        callout: {
          tone: "watch",
          title: "Why we do not quote a single dollar figure",
          body: "An Australian scholarship's value depends on the scheme, the awarding body, your field and the year you applied. A single national number would be wrong for almost every reader. Where an authority publishes a figure, we name it and name the page; where it does not, the honest answer is that the university sets it and you will find it on the programme's own page.",
        },
      },
      windows: {
        body:
          "The rule for Australia is the same as everywhere else with a scholarship round, and more so here: the funding calendar is earlier than the course calendar, and the government schemes have their own country-by-country dates on top of that.",
        points: [
          "Australia Awards dates are published per participating country, and they differ. DFAT publishes the opening and closing date for each country profile, and the announcement for a given year typically comes in the first half of the year for study in the following year. If your country is on the participating list, that profile is the only date that matters to you.",
          "The International Education Scholarships run on the Australian academic year and are announced by the Department of Education, with the fields and closing dates published at the same time. Universities then advertise their allocations in their own scholarship rounds, which close earlier than the course deadline.",
          "University international scholarship rounds usually close with or shortly before the course application round, and the ones tied to research degrees often close in the first half of the year. Some universities will not consider a late scholarship application even if your course application is still open.",
          "The RTP is not applied for separately from the university. You apply through the university, the university ranks you against its allocation, and the selection is published when the results come out. That means the useful deadline is the university's internal scholarship deadline, not the national one.",
        ],
        roadmap: [
          {
            label: "Six to nine months out",
            title: "Check what you are eligible for",
            goal: "Know which government schemes your citizenship and field put you in the running for.",
            hours: "3-4 hours",
            focus: [
              "Check your country against DFAT's participating countries list for the Australia Awards, and read your country profile for the dates and the fields it prioritises.",
              "Check the International Education Scholarships page for the fields and the closing date for your year.",
              "Read your target universities' international scholarship pages and note the closing dates next to the course deadlines.",
              "Decide which of these is worth the preparation time, and drop the rest deliberately rather than by drift.",
            ],
            checkpoint: "A short list of schemes you will actually apply for, with the date for each written down.",
          },
          {
            label: "Three months out",
            title: "Write the material the schemes ask for",
            goal: "Have every application document finished before the first deadline lands.",
            hours: "8-10 hours of writing",
            focus: [
              "Government schemes often ask for a personal statement written to a different brief from your course application. Read the scholarship's own criteria, not the course's.",
              "For research degrees, a research proposal is usually required. Get your supervisor to read it before you submit it anywhere.",
              "Have referees ready for the funding route, on a separate timetable from the admission route.",
            ],
            checkpoint: "Drafts finished, referees briefed, dates in the calendar.",
          },
          {
            label: "The first deadline",
            title: "Submit to the earliest round",
            goal: "Be in the first group considered, because the money is allocated early.",
            hours: "2-3 hours",
            focus: [
              "Submit the government scheme application, following your country profile's instructions exactly, including the paper-application route where that is still required.",
              "Submit the university scholarship form in the same window, if the university has a separate one.",
              "Keep the confirmations. A scholarship application that appears to have gone in is worse than one you know is missing.",
            ],
            checkpoint: "Every application confirmed, with dates and receipts in one place.",
          },
          {
            label: "Ongoing",
            title: "Keep the second round open",
            goal: "Catch the later university rounds and the schemes that reopen.",
            hours: "2 hours a month",
            focus: [
              "Some universities run a second round or keep a reserve list for strong applicants who missed the first. Ask the graduate scholarship office.",
              "Track the RTP outcome if you are a research student; it arrives with the admission decision and changes your budget.",
              "Keep the self-funded budget current, because that is the number you will need if nothing lands.",
            ],
            checkpoint: "A live picture of what you hold, what is pending, and what you would have to pay.",
          },
        ],
      },
      strategy: {
        body:
          "Australian scholarship decisions lean on academic merit and on fit with the scheme's priorities, and the priorities are published. Read them properly and you can tell quickly whether you are a plausible candidate, which saves a lot of otherwise wasted effort.",
        points: [
          "Prioritise merit-based schemes if your record is strong. The Australia Awards and the International Education Scholarships are assessed substantially on academic merit and on the relevance of your course to your country's priorities. If your grades are good, a merit scheme is the better bet than a need-based one.",
          "Read the assessment criteria and structure your application around them. Government schemes publish what they reward. Most of them reward a clear rationale for why this course, in this country, for you, and a specific plan for what you will do afterwards.",
          "Check the English requirement separately. Some schemes require a particular test result to be in place at the time of application, which is a separate deadline from everything else and is very easy to miss.",
          "Apply for university scholarships in the same cycle as the course, not afterwards. Most are tied to the admission decision, and a separate later application is often not accepted at all.",
          "Be precise about your status: your citizenship, your current visa, whether you are already funded, and whether you hold other applications. Australia Awards holders sign a contract with the Commonwealth and are subject to a return obligation, so misrepresentation has real consequences.",
        ],
        callout: {
          tone: "good",
          title: "Do the eligibility read before the writing",
          body: "Every Australian government scheme publishes who it is for, which fields it prioritises and what it pays. Two hours reading the criteria and the country profile will tell you whether you are in the running. Ten hours writing an application for a scheme you were never eligible for is the most common waste in this stage.",
        },
      },
      resources: {
        body:
          "The Australian Government publishes its own scheme pages, the schemes themselves publish their benefits, and Study Australia keeps the map of the whole system in one place. Use them in that order.",
        resources: [
          {
            title: "ANU: international applications",
            kind: "official",
            url: "https://study.anu.edu.au/apply/international-applications",
            why: "The official source for this milestone and a good worked example of a university page that separates the scholarship cut-off from the course deadline, which is the distinction the whole dossier is about.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study Australia: scholarships",
            kind: "official",
            url: "https://www.studyaustralia.gov.au/en/plan-your-studies/scholarships",
            why: "The Australian Government's own scholarship guide, covering the government schemes, the university schemes and the difference between them. Start here when you do not yet know which system you are in.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Department of Education: financial assistance for international students",
            kind: "official",
            url: "https://www.education.gov.au/international-education/financial-assistance-international-students",
            why: "The page that links the Australia Awards, the Research Training Program and the International Education Scholarships from one place, and explains what each of them actually is. It also carries the published RTP stipend rates.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "DFAT: Australia Awards Scholarships",
            kind: "official",
            url: "https://www.dfat.gov.au/people-to-people/australia-awards/australia-awards-scholarships",
            why: "The scheme administrator's own page, with the published benefits and the link to the participating-country profiles where the opening and closing dates live. This is the page to read before you assume you are eligible.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "DFAT: Australia Awards, participating countries",
            kind: "official",
            url: "https://www.dfat.gov.au/people-to-people/australia-awards/participating-countries",
            why: "The eligibility test and the date test in one table, country by country. If your country is not on this list, the Australia Awards are not an option and you should not spend time on them.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study Australia: list of Australian universities",
            kind: "official",
            url: "https://www.studyaustralia.gov.au/en/plan-your-studies/list-of-australian-universities",
            why: "The official list of providers, useful for checking which institutions are legitimate before you apply and for finding the research universities that hold the government funding allocations.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official Australian sources for this checkpoint and the clearest complete set we found, not because anyone paid us. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "sg-scholarship": {
    archetype: "scholarship-funding",
    intro:
      "Singapore scholarship consideration has its own cut-off, and it is earlier than the general deadline. For the August 2027 intake, the NUS Business School HCMA programme set a scholarship cut-off of 15 November 2026, three months before its 15 February 2027 general deadline. Missing that date is the most common way a Singapore funding plan fails.",
    sections: {
      schemes: {
        body:
          "Singapore money comes from the universities, from a small number of government and industry schemes, and from programme-level awards. Almost all of it is either restricted to Singapore citizens and permanent residents, or restricted to research degrees, so the honest opening is that the accessible money for an international coursework master's is university and programme level.",
        points: [
          "University graduate scholarships. NUS, NTU, SMU and SIT each run a set, and they differ in name, value and eligibility. Some cover tuition, some are a partial fee offset, and some are stipend-based for research students. The university's own scholarships page is the only accurate source for the current terms.",
          "Programme and faculty scholarships and bursaries. These are smaller, more specific and more numerous than the headline schemes, and they are often tied to a discipline, a faculty or a donor. The NUS Business School HCMA scholarship round is an example of one of these sitting on its own deadline.",
          "Research scholarships. NTU's Research Scholarship and the NUS Research Scholarship fund Master's (Research) and doctoral study. If you are applying to a research degree rather than a coursework degree, these are the schemes to read first, and they are the ones with published stipend rates.",
          "Government and industry-linked schemes. The President's Graduate Scholarship, the APEC Scholarship, the A*Star Graduate Scholarship, the Economic Development Board scheme and the Hermes-Epitek Innovation Scholarship are all real, and all of them come with conditions: most are for doctoral study, several are for Singapore citizens or permanent residents only, and some are for specific nationalities or partners. Read the eligibility table before you spend an evening on an application.",
          "Bond obligations. A number of Singapore Government-linked schemes and, separately, the Tuition Grant for citizens and permanent residents attach a bond. An international student is usually outside both, but if a scheme you are offered does carry a bond, read it before you sign, because it is a legal obligation and not a formality.",
        ],
        callout: {
          tone: "watch",
          title: "The Tuition Grant is not a scholarship",
          body: "The Tuition Grant is a subsidy paid to the university for Singapore citizens and permanent residents, and it is not money you receive and not something an international student can apply for. Students often see it listed in scholarship tables and assume it is available to them. It is not, and the university will explain the difference if you ask.",
        },
      },
      amounts: {
        body:
          "Singapore universities publish what each scheme pays, scheme by scheme, on the scheme's own page, and they publish the rate that applies to international students separately from the rate that applies to citizens. Where the figures are published they are worth reading directly, because the gap between the two rates is often substantial.",
        points: [
          "A published stipend table usually splits by citizenship: a rate for Singapore citizens, a lower rate for permanent residents, and a lower rate again for international students, plus separate book, IT and conference allowances. The rates are revised periodically, and the scheme pages say so, so read the table that applies to the year you would start rather than a figure you saw last year.",
          "A tuition-fee scholarship is usually stated as a partial offset against the published full tuition fee, for the standard duration of the degree. It is not a cheque, and it is not usually transferable to another programme.",
          "The Research Training Programme-style awards, where a university holds government research funding, are the ones where a stipend and a fee offset are combined. What you are offered depends on the department's allocation and on competition within it.",
          "NTU states on its scholarship pages that it reserves the right to vary the amount of an award. That is normal and it is also a reminder: treat every figure on these pages as the current published figure for the current round, not a promise about what you will be offered.",
        ],
        callout: {
          tone: "watch",
          title: "Where the number actually lives",
          body: "The scholarship amount is published on the page for that specific scheme, not on a general scholarships page and not by the government. Read the scheme page, look for the table that separates citizen, permanent resident and international rates, and check the currency of the table against the year you would start.",
        },
      },
      windows: {
        body:
          "Singapore has few intakes, so the windows are narrow and the consequences of missing one are severe. Two deadlines exist for every programme: the scholarship consideration cut-off and the general application deadline, and they are often three months apart.",
        points: [
          "The scholarship cut-off is the one that matters. In the NUS Business School HCMA example, the scholarship consideration date of 15 November 2026 sat three months ahead of the 15 February 2027 general deadline. A scholarship application filed on 20 February is not late for the scholarship; it is not a scholarship application at all.",
          "Some schemes run their own window rather than piggybacking on the course round. NTU's Nanyang President's Graduate Scholarship published an application period of 1 November to 31 December 2026 for the 2027-28 academic year, and a slightly different window for the National Institute of Education, with a separate closing date in December.",
          "Later rounds exist but are conditional. A programme may say it will consider later applications only if funding remains available. That is a real possibility and not a promise, so it is a fallback rather than a plan.",
          "The award often needs a supervisor or a department's nomination. Where that is the case, the internal deadline inside the department comes before the university's, and it is not published on the programme page.",
        ],
        roadmap: [
          {
            label: "Six months before the intake",
            title: "Build the scholarship list",
            goal: "Know every scheme that could apply to you, with its own date.",
            hours: "3-4 hours",
            focus: [
              "Work through the university's graduate scholarships list and the graduate college scholarships list separately, because they are different lists with different eligibility rules.",
              "For each scheme, write down the level of study it funds, the citizenship restriction if any, the closing date, and whether it is by nomination or by application.",
              "Check each shortlisted programme's own page for a scholarship round, because programme-level rounds sit earlier than university-level ones.",
            ],
            checkpoint: "A table of every scheme, with dates and eligibility, and the earliest date in your calendar.",
          },
          {
            label: "Three months before the intake",
            title: "Prepare the documents once",
            goal: "Have one set of documents that can be adapted to each scheme.",
            hours: "6-8 hours",
            focus: [
              "Write a scholarship-specific personal statement. Government and industry schemes often ask for a different thing from a course application, usually a rationale for why this course and this country.",
              "Have your academic transcripts and a detailed CV ready, plus English test results if the scheme asks for them at application stage.",
              "If a scheme requires a research proposal and you are a research student, get your supervisor to read it now, not in the final week.",
            ],
            checkpoint: "A finished document set that can be adapted without starting from scratch.",
          },
          {
            label: "The scholarship cut-off",
            title: "Submit to the scholarship round",
            goal: "Be inside the consideration window, with everything attached.",
            hours: "2-3 hours",
            focus: [
              "Submit the scholarship form, and check whether the scheme wants a separate form, a flag on the main application, or both. It is frequently both.",
              "Check for scheme-specific tests or interviews and book them now if they exist.",
              "Save the confirmation with the date and time, because the boundary is a date and time in the scholarship portal and not a date on a web page.",
            ],
            checkpoint: "Submission confirmed, and a note of what you submitted and when.",
          },
          {
            label: "After the cut-off",
            title: "Run the second calendar",
            goal: "Catch the schemes with their own windows and the departmental nominations.",
            hours: "2 hours a month",
            focus: [
              "Ask your department whether a nomination-based scholarship is possible and when the internal nomination deadline falls.",
              "Check the university scheme page monthly. Some schemes reopen for a second round if funds are left.",
              "Keep the self-funded budget to the day, because that is the plan you will be living on if nothing lands.",
            ],
            checkpoint: "A live picture of what is pending, and a priced fallback.",
          },
        ],
      },
      strategy: {
        body:
          "The Singapore funding decision is made early, by a committee, from a short document set, and it is rarely negotiable afterwards. What you can control is whether you are in the room when it is discussed, and whether what you submitted makes your case obvious rather than arguable.",
        points: [
          "Submit the scholarship application and the course application as one act if you can. Separate deadlines create the failure mode where the course application is in and the scholarship was never applied for.",
          "Write for the criteria the scheme publishes. These committees read many applications and they reward a specific, evidenced case, not a general statement of enthusiasm.",
          "Be concrete about what you will do with the award. For a research scheme, a project with a named supervisor and a realistic plan moves further than a paragraph of intent.",
          "Check the interview and test requirements as soon as you apply. A few Singapore schemes use an interview or an additional test, and a missed booking is a missed scholarship rather than a lost interview.",
          "Never pay a scholarship agency or a consultancy. The universities publish every scheme they run, and the government-linked schemes are published by the government. A paid service is selling you access to a list you can build yourself in an afternoon.",
        ],
        callout: {
          tone: "good",
          title: "Put the scholarship date next to the course date",
          body: "One calendar, two dates, and the scholarship date is the one that governs. If the scholarship consideration closes three months before the course deadline, then three months before the course deadline is when your scholarship work is due, whatever your course application says.",
        },
      },
      resources: {
        body:
          "Singapore's funding information is unusually well published, but it is spread across four places: the programme page, the university scholarships list, the graduate college list, and the registrar's financial aid pages. Check all four.",
        resources: [
          {
            title: "NUS Business School HCMA: application process",
            kind: "official",
            url: "https://mschcma.nus.edu.sg/admissions/application-process/",
            why: "The official source for this milestone, and the worked example of the whole point: a published scholarship consideration cut-off three months ahead of the general application deadline.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NTU: postgraduate scholarships",
            kind: "official",
            url: "https://www.ntu.edu.sg/admissions/graduate/financialmatters/scholarships",
            why: "NTU's own list of the postgraduate scholarships it runs, with the levels of study each one funds. The first place to look if you are an NTU applicant, and the place to find out which schemes are open to international students.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NTU Graduate College: scholarships",
            kind: "official",
            url: "https://www.ntu.edu.sg/graduate-college/admissions/scholarships",
            why: "The research-degree side of NTU's funding, and the version of the list that states the citizenship and programme level for each scheme. Useful even if you are applying to coursework, because it shows which schemes exist.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NUS: graduate scholarships",
            kind: "official",
            url: "https://nus.edu.sg/registrar/academic-information-policies/graduate/scholarships",
            why: "NUS's own scholarship terms for graduate study, including the ones aimed specifically at international students. The registrar's page is the one that carries the current amounts.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NUS: financial aid and scholarships",
            kind: "official",
            url: "https://nus.edu.sg/registrar/financial-aid-scholarships",
            why: "The wider financial aid picture at NUS, including the schemes that are not scholarships but still change what you pay. Read it to know the full set before you commit to one programme.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official Singapore sources for this checkpoint and the clearest complete set we found, not because anyone paid us. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },
};

import type { GuideContent } from "../types";

const V = "2026-10-20";

/**
 * The standardised test dossier.
 *
 * A standardised test milestone in a study-abroad plan is usually a decision
 * rather than an exam date, and the decision is made per programme. The US is
 * the clearest case: there is no national GRE rule for master's programmes at
 * all. Stanford's Computer Science department states that GRE scores are not
 * required and not considered for MS applicants, and other computer science
 * programmes still require them. Both statements are true at the same time.
 *
 * So the shape of this dossier is:
 *
 *   1. CHECK THE REQUIREMENT PER PROGRAMME, not per country, and do it before
 *      you spend anything. A required test you did not sit is a rejected
 *      application. A test you sat that nobody reads is a few hundred dollars
 *      and a month of preparation.
 *   2. UNDERSTAND WHAT THE SCORE REPORT IS, because a score sitting in your
 *      own account is worth nothing to an admissions office. The official
 *      report has to reach them.
 *   3. PLAN FOR THE DELIVERY, not the exam. The exam date is the easy part.
 */
export const STANDARDISED_TEST: Record<string, GuideContent> = {
  "us-gre": {
    archetype: "standardised-test",
    intro:
      "There is no US-wide GRE rule for master's. Stanford's Computer Science department states that GRE scores are not required and not considered for MS applicants, while other computer science programmes still require them and publish a minimum. So the first job here is not booking a test, it is finding out which of your programmes read one, and deciding on that basis.",
    sections: {
      choose: {
        body:
          "The GRE General Test is the only standardised test that matters in the US for a taught master's, and whether you need it is a per-programme question. The second question is which score, and the third is how the score gets to the admissions office. Get those three right and the rest of this section is logistics.",
        points: [
          "Check the requirement on every shortlisted programme individually, and read the exact wording. 'Required', 'optional', 'not considered' and 'not evaluated' are four different things, and the last two are better for you than the first.",
          "If a programme says optional, that is not the same as ignored. Optional means it will be read if you send it, and an optional score that is low can be read as a low score. If your score is not strong, sending nothing is often the better decision, and the programme that says 'not considered' is telling you exactly that.",
          "If the test is required, register for a General Test sitting at least eight weeks before your earliest deadline. The registration window in a busy city closes earlier than the exam date, and the score report has to arrive before the deadline as well as the test being taken before it.",
          "If every programme on your list treats the GRE as optional or ignored, skip it and spend the time and the money on your statements of purpose instead. The comparison is not close. A test fee, several hundred dollars of preparation and a month of your attention are worth a great deal more as a finished draft of your essays.",
          "And check the shape of the requirement as well as its existence. A programme may want the General Test only, or may want a minimum in one section, or may accept a higher score in one section to offset a lower one in another.",
        ],
        exams: [
          {
            name: "GRE General Test",
            accepted: true,
            requiredScore:
              "Programme-specific, and usually published per programme rather than per country. Many competitive US computer science programmes ask for a total in the 150s on the old 130 to 170 scale, some publish a per-section floor, and some publish no number at all and simply state the policy. Read the programme's own admissions page, because a number quoted in a forum is worth nothing.",
            note: "The only test to sit for a US master's in almost every case. It measures verbal reasoning, quantitative reasoning and analytical writing, and ETS allows you to take it at a test centre or at home depending on where you are.",
            validity:
              "5 years. ETS's score reporting options let you send your most recent administration, any specific administration, or all administrations in the last five years.",
            howToBook:
              "Direct with ETS, through your ETS account, at a test centre or at home where that is offered. You can designate up to four graduate institutions to receive your official score report as part of the test fee.",
            leadTime:
              "Scores appear in your ETS account 8 to 10 days after the test date, and the official Institution Score Report goes to the recipients you named on test day. Book at least eight weeks before your earliest deadline, and confirm the delivery route rather than assuming it.",
            cost:
              "US$249 in all areas of the world other than China, where it is US$237.86, on ETS's published fees effective from 1 August 2026. Additional Score Reports are US$40 per recipient.",
            url: "https://www.ets.org/gre.html",
            verifiedOn: V,
          },
          {
            name: "GRE Subject Test",
            accepted: false,
            requiredScore:
              "Not required for computer science or data science master's programmes. It is required by a small number of programmes in other subjects, and those publish their own requirements.",
            note: "It still exists, and it is computer-delivered worldwide from September 2025, but for a CS or data application it is money spent on a score nobody will read. The same is true of the GMAT in a business programme. Check the programme, and skip the test if it is not named.",
            validity: "5 years.",
            howToBook: "Direct with ETS, at the published computer-delivery sittings.",
            leadTime: "Scores appear in your ETS account 8 to 10 days after the test date.",
            cost: "US$199 worldwide on ETS's published fees effective from 1 August 2026.",
            url: "https://www.ets.org/gre/test-takers/general-test/register/fees.html",
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "watch",
          title: "A score you send is a score they read",
          body: "Optional means optional, not ignored. If a programme says the GRE is optional and your score is below its typical admitted range, sending it is a small negative you chose to take. The programmes that say the test is not required or not considered are telling you something useful, and it is worth reading the exact wording before you spend two hundred and fifty dollars.",
        },
      },
      format: {
        body:
          "The GRE General Test is three separate measures, and ETS is explicit that they are scaled independently and should not be compared with each other. That matters when a programme publishes a total, because a total is an addition of two numbers rather than a single holistic judgement.",
        points: [
          "There is no negative marking. Every question is worth attempting, and a wrong answer costs you nothing beyond the time.",
          "Both the Verbal Reasoning and the Quantitative Reasoning sections are section-level adaptive, which means the second section's difficulty changes based on how you did in the first. The first section is 12 questions in 18 minutes for Verbal and 12 in 21 minutes for Quantitative, and the second is 15 questions in 23 and 26 minutes respectively.",
          "Analytical Writing is one task in 30 minutes, and it is scored by an e-rater engine and a human reader together, on a 0 to 6 scale in half-point steps.",
          "The total test runs to roughly two hours with a ten-minute break in the middle, and the on-screen calculator is provided for the Quantitative sections.",
          "The score report contains all three measures, and the total is the sum of the two scored 130 to 170 scales. ETS's own guidance to score users is to treat the three measures as separate and independent, and to read the score in the context of the programme's stated range rather than against a national average.",
        ],
        subsections: [
          {
            title: "Verbal Reasoning",
            what: "Reading comprehension and reasoning about arguments, tested on passages in a range of academic and general-interest subject areas.",
            format: "Two sections, 12 questions in 18 minutes followed by 15 questions in 23 minutes. The second section's difficulty adapts to your performance in the first.",
            score: "130 to 170, in one-point increments. The two section scores are combined into the reported measure.",
            topics: [
              "Reading comprehension and inference, where the answer is in the passage but not in the same words.",
              "Text completion and sentence equivalence, where you have to pick the option that fits the argument rather than the one that sounds fluent.",
              "Rhetorical analysis of an author's position and the function of a particular sentence, which is where a lot of marks are lost.",
            ],
            tip: "The section is short on time per question and long on reading. Practise reading the question before the passage, and practise deciding what a question is asking before you go looking for it. Most of the lost marks are time lost, not comprehension lost.",
          },
          {
            title: "Quantitative Reasoning",
            what: "Mathematical reasoning and data interpretation, with no advanced mathematics required and an on-screen calculator provided.",
            format: "Two sections, 12 questions in 21 minutes followed by 15 questions in 26 minutes, with section-level adaptation.",
            score: "130 to 170, in one-point increments.",
            topics: [
              "Arithmetic and elementary algebra: fractions, percentages, ratios, exponents and roots, and linear and quadratic equations.",
              "Data interpretation from tables, graphs, charts and, on some forms, a data set with more than one entry to reconcile.",
              "Geometry: triangles, circles, coordinate geometry and the relationships between them.",
              "Quantitative comparison, which asks you to compare two quantities rather than compute one, and which is where a large proportion of the marks sit.",
            ],
 tip: "Because the calculator is provided, the exam is not testing whether you can compute. It is testing whether you can set the problem up. If you are doing long arithmetic, you have probably set it up wrong.",
          },
          {
            title: "Analytical Writing",
            what: "One argumentative essay, taken under timed conditions, on a topic you have not seen before.",
            format: "One task, 30 minutes. You get a scratch pad and a pencil, and you write by hand or type, depending on the delivery mode.",
            score: "0 to 6, in half-point increments, scored holistically on the overall quality of the essay, with an e-rater engine and a human reader working together.",
            topics: [
              "One prompt per test, and the prompts come from a wide range of subject areas, so you cannot prepare the topic. You can prepare the reasoning.",
              "The essay is assessed on how well you make and support an argument, and on how clearly you express it, rather than on whether you agree with the position you are given.",
            ],
            tip: "Thirty minutes is short for an essay and the clock is the constraint. Write your thesis sentence first, plan two reasons and an example in four lines, and leave nothing to decide once the timer is running.",
          },
        ],
      },
      roadmap: {
        body:
          "Eight weeks is the minimum runway that works, and it is the runway the milestone itself assumes: a sitting at least eight weeks before your earliest deadline. The plan below assumes you have already decided the test is worth taking. If you have not, stop at week one and make that decision instead.",
        roadmap: [
          {
            label: "Week 1",
            title: "Decide, and write down the target",
            goal: "A written answer to three questions: which programmes require it, what score each wants, and what the earliest deadline is.",
            hours: "3-4 hours",
            focus: [
              "Read the GRE policy on every shortlisted programme's own admissions page and record the exact wording: required, optional, not considered, or not evaluated.",
              "Write down the earliest application deadline across that list. That date, and not the programme you like most, sets the test date.",
              "Decide the target score per programme. If the policies are optional and your practice scores are not competitive, the right answer is not to take the test.",
              "Register for the sitting now if the answer is yes. Sittings in a busy city fill, and the date you want is the one that fills first.",
            ],
            checkpoint: "You have a test date booked, a target score written down per programme, and a list of which institutions need the score sent to them.",
          },
          {
            label: "Weeks 2-3",
            title: "Find the hole",
            goal: "A real baseline per measure, and a clear priority.",
            hours: "6-8 hours a week",
            focus: [
              "Take one full official practice test under timed conditions, with the calculator rules and the break the real test has.",
              "Score all three measures separately, and read the ETS score scale documentation rather than guessing what a number means.",
              "Work out which measure is actually costing you the total. It is almost never the one students practise most.",
              "Note the question types you got wrong, not just the number. A wrong answer is a topic; a wrong number is a symptom.",
            ],
            checkpoint: "You have a scored baseline per measure, and you know which one to work on for the next fortnight.",
          },
          {
            label: "Weeks 4-5",
            title: "Work the weak measure",
            goal: "Move the measure that is holding the total down.",
            hours: "8-10 hours a week",
            focus: [
              "Two full weeks on one measure only. Splitting your hours evenly across all three is how people improve all three equally and get nowhere near a target.",
              "For Quantitative: practise setting up before computing, and get comfortable with quantitative comparison, which is the highest-yield question type and the one most candidates under-attempt.",
              "For Verbal: practise reading the question first, and practise identifying the function of a sentence in an argument rather than its topic.",
              "For Analytical Writing: one timed essay a week, marked by a person, using the published scoring criteria. Self-marking is where the plateau comes from.",
            ],
            checkpoint: "Your weakest measure has moved up on a fresh practice test.",
          },
          {
            label: "Weeks 6-7",
            title: "Test under pressure",
            goal: "A score you can rely on, taken in conditions that match the real thing.",
            hours: "8-10 hours a week",
            focus: [
              "One full practice test a week, timed, with the break, on a computer, using the calculator and scratch pad you will have.",
              "Practise the Analytical Writing essay under a hard 30-minute stop, because a half-finished essay scores as a half-finished essay.",
              "Review every error from the last test in detail. This is the highest-value part of the whole plan and the part almost everyone skips.",
              "Move to the second-weakest measure once the first has improved, keeping a shorter set on the first so it holds.",
            ],
            checkpoint: "Two consecutive full practice tests at or above your written target.",
          },
          {
            label: "Week 8",
            title: "Sit it, and get it delivered",
            goal: "A score in the admissions office's inbox, not just in yours.",
            hours: "3-4 hours",
            focus: [
              "Sit the test at least eight weeks before your earliest deadline, and earlier if you want the option of a second attempt.",
              "Check the score recipients carefully on test day. ETS sends an official Institution Score Report to the four institutions you name as part of the test fee, and an Additional Score Report is US$40 per recipient if you need to add more later.",
              "If you did not name the right institution, or you need a later sitting's score sent, order the Additional Score Report rather than assuming a PDF will do. A programme that asked for the official report will not read an upload.",
              "Record the score release date in your plan and work backwards from there, because the deadline is the date the score has to have arrived, not the date you sat.",
            ],
            checkpoint: "The test is sat, the recipient list is correct, and the score release date falls before your earliest deadline with margin.",
          },
        ],
      },
      resources: {
        body:
          "ETS publishes the score scale, the timing, the fees and the score-reporting rules itself, and it has free practice that matches the real test. A paid book is worth buying only once you know which measure you are failing.",
        resources: [
          {
            title: "Stanford CS: master's admissions FAQ",
            kind: "official",
            url: "https://www.cs.stanford.edu/admissions/masters-admissions-frequently-asked-questions",
            why: "The page behind this milestone, and a specific published statement that GRE scores are not required and not considered for MS applicants. It is worth reading because it shows what a transparent GRE policy looks like, and it is the kind of page you should look for on every programme you apply to.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ETS: the GRE General Test",
            kind: "official",
            url: "https://www.ets.org/gre.html",
            why: "ETS's own front door for the test, with the current structure, the free practice options and the link to every other page you need. If you read one ETS page, read this one first.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ETS: preparing for the GRE",
            kind: "practice",
            url: "https://www.ets.org/gre/test-takers/general-test/prepare.html",
            why: "The free official preparation page, including the free practice test and the mini quiz. The free practice is the only version that matches the real test's difficulty and timing, and it is enough to find your weak measure.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ETS: GRE General Test fees",
            kind: "official",
            url: "https://www.ets.org/gre/test-takers/general-test/register/fees.html",
            why: "The authoritative fee table, effective from 1 August 2026, including the test fee, the rescheduling fee and the cost of an Additional Score Report. Read it before you budget, because the score report fee is the one people forget.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ETS: sending your GRE scores",
            kind: "official",
            url: "https://www.ets.org/gre/test-takers/general-test/scores/send-scores.html",
            why: "The delivery rules: four free score recipients named on test day, the ScoreSelect options, and what an Additional Score Report costs. This is the page that tells you whether the score will actually reach the admissions office.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "The Official Guide to the GRE",
            kind: "book",
            why: "ETS's own book, and the reference for the format, the scoring and the question types. Buy it only if you are taking the test and want one authoritative source instead of a dozen scattered preparation sites.",
            cost: "Around US$45-60 in the current print edition, varies by format.",
            verifiedOn: V,
          },
          {
            title: "Manhattan Prep GRE",
            kind: "book",
            why: "The strongest of the commercial preparation books, and the one whose question types are the most representative of the real test. Worth buying when you need a second source of practice problems rather than more explanation.",
            cost: "Around US$35-45 for the current edition.",
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official sources and the clearest free preparation we found for this checkpoint. We take no payment for placement, and we do not take payment for anything. If a provider asks you for a code in exchange for a link on this page, that is not us.",
        },
      },
    },
  },
};

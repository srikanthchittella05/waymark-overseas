import type { GuideContent } from "../types";

const V = "2026-10-20";

/**
 * The English language test dossier.
 *
 * The single most consequential checkpoint in most plans, and the one where a
 * vague checklist is most costly: book too late and the score arrives after the
 * deadline, take the wrong test and the visa authority will not accept it, aim
 * for the wrong band and the offer evaporates.
 *
 * Two distinctions this dossier keeps making, because they are the ones that
 * actually catch people:
 *
 *   1. THE TEST YOU SIT AND THE TEST YOU SUBMIT are different things. Canada
 *      wants IELTS General Test for the permit and IELTS Academic for the
 *      university. The UK wants a Home Office approved test for the visa. The
 *      US usually has no government test requirement at all — only the
 *      university's.
 *   2. THE SCORE HAS TO BE DELIVERED, not merely sat. A test sat six weeks
 *      before the deadline, with results taking up to a fortnight to arrive,
 *      is a test that arrives late.
 */
export const LANGUAGE_TEST: Record<string, GuideContent> = {
  "us-english": {
    archetype: "language-test",
    intro:
      "There is no US government English test. Every US university sets its own minimum, and the score has to be sent straight from the test body to the programme — most will not accept a self-reported number. The test itself is the easy part; the delivery deadline is what catches people.",
    sections: {
      exams: {
        body:
          "US universities accept TOEFL iBT, IELTS Academic, and increasingly PTE Academic. A few accept the Duolingo English Test, but it is not universally accepted, so check each programme's own list before booking anything. Cambridge C1 Advanced and B2 First are accepted by some universities that do not accept the Duolingo test at all — a useful fallback if your target band is close.",
        points: [
          "Minimums are set per programme, not per country. A competitive CS programme may ask for 100 TOEFL or 7.0 IELTS; a less competitive one may ask for 80 or 6.0. There is no single US minimum to plan against.",
          "Programmes that ask for a minimum band usually also state a per-section minimum, often 6.0 in Writing. Read the whole requirement, not the headline number.",
          "Some programmes accept the TOEFL iBT from home, and some do not. It is a test-centre question, and it changes how early you must book.",
        ],
        exams: [
          {
            name: "TOEFL iBT",
            accepted: true,
            requiredScore: "Programme-specific. Competitive CS/data programmes commonly ask 100 or above on the 0–120 scale; some still publish 90.",
            note: "TOEFL moved to a 1–6 scale for tests taken from 21 January 2026, so a university page may publish two different minimums. Check which scale the requirement refers to and which scale your test will report on.",
            validity: "2 years",
            howToBook: "Direct with ETS, or through an authorised test centre. You can book up to several sittings ahead, and rebook if you need another date.",
            leadTime: "Results are out in about 4 days on the computer version, 8 days on paper. Book at least 6 weeks before your earliest programme deadline so the score can be delivered in time.",
            cost: "Around US$255–275, varies by location and format.",
            url: "https://www.ets.org/toefl",
            verifiedOn: V,
          },
          {
            name: "IELTS Academic",
            accepted: true,
            requiredScore: "Programme-specific. A 6.5 overall with 6.0 in each section is a common floor; competitive programmes ask 7.0.",
            note: "Academic, not General. General Training is not accepted for degree programmes in the US.",
            validity: "2 years",
            howToBook: "With the British Council, or at a test centre. Computer-delivered sittings are available most days, which makes recovery from a bad score much easier.",
            leadTime: "Results in 3–5 working days on the computer version, 11–13 days on paper. Leave 6 weeks minimum.",
            cost: "Around US$245–260, varies by city.",
            url: "https://ielts.org/take-a-test/test-types/ielts-academic-test",
            verifiedOn: V,
          },
          {
            name: "PTE Academic",
            accepted: true,
            requiredScore: "Programme-specific, usually stated as a band such as 50, 53 or 60 on the 10–90 scale.",
            note: "Accepted by most US universities, and computer-delivered with results in about 2 business days, which is the fastest turnaround of the three.",
            validity: "2 years",
            howToBook: "Direct with Pearson, and the test can be booked very close to the date.",
            leadTime: "About 2 business days for results, but allow 4–6 weeks for the score to reach the admissions office and be read.",
            cost: "Around US$255–285.",
            url: "https://www.pearsonpte.com/",
            verifiedOn: V,
          },
          {
            name: "Duolingo English Test",
            accepted: false,
            note: "Accepted by a meaningful but not universal number of US programmes. It is fast and cheap, and it is a reasonable second attempt after a disappointing IELTS or TOEFL, but check the programme's own list first — this is not a test to book blind.",
            validity: "2 years",
            howToBook: "Online, at home, with a webcam. Short notice is possible, which is its real advantage.",
            leadTime: "Results the same day.",
            cost: "Around US$65, less with a test voucher code from many universities.",
            url: "https://www.duolingo.com/english-test",
            verifiedOn: V,
          },
        ],
      },
      timing: {
        body:
          "Work backwards from the earliest deadline among your programmes, not the latest. A programme with a 1 December deadline is the one that decides your booking date, and if it is a rolling-admission programme then it is the only deadline that matters.",
        points: [
          "Book the test at least 6 weeks before your earliest deadline. The test sits for 2–4 hours, but the score then has to travel from the test body to the admissions office, be checked, and be read — and the programme's own deadline may be the day the score must be on file.",
          "Take a mock before you book, not after. IELTS, TOEFL and PTE all have free official practice tests, and the mock is the only reliable way to find out which of your four skills is dragging the average down.",
          "If you can only sit one test, sit it in the format you will actually take. A computer-delivered test is not the same test as a paper one, and practising the wrong format is a common self-inflicted problem.",
          "Leave room for a second sitting. Most test bodies let you rebook, and the people who fail this checkpoint are almost never the ones who tried once — they are the ones who booked once, early, and took the first date available.",
        ],
        callout: {
          tone: "watch",
          title: "The score has to be sent, not just earned",
          body: "Most US universities will not read a score from a PDF you upload. They require the official electronic score report, sent directly from the test body to the institution. That adds days on top of the test itself, and it means a score sitting in your own inbox is worth nothing to the admissions office. Add the delivery time to your booking date.",
        },
      },
      inside: {
        body:
          "All three major tests score four skills and average them. That is why a strong overall score can still fail a programme: the average hides one weak section, and most programmes set a floor per section. Find out which of your four skills is weakest before you start, and spend your hours there.",
        subsections: [
          {
            title: "IELTS Academic",
            what: "Four skills — Listening, Reading, Writing, Speaking — each scored 0–9 in half-band steps.",
            format: "About 2 hours 45 minutes. Listening 40 questions in 40 minutes, plus 10 minutes to transfer answers on paper. Reading 40 questions in 60 minutes across three passages. Writing 60 minutes: Task 1, a 150-word description of a graph or chart, and Task 2, a 250-word essay. Speaking 11–14 minutes in three parts.",
            score: "Each skill is banded 0–9 in half steps. The overall score is the mean of the four, rounded to the nearest half band.",
            topics: [
              "Listening: short conversations, a monologue, an academic discussion, and a longer monologue. The traps are signposting language and the distractor that corrects itself mid-answer.",
              "Reading: three academic passages — the third is usually the hardest — plus one true/false/not-given, matching-heading and summary-completion style questions. Matching headings and multiple-choice are the two that cost the most marks.",
              "Writing Task 1: process, maps and plans. You must describe the process, not give an opinion on it. Task 2 is a discursive essay: discuss both views, or agree or disagree.",
              "Speaking Part 1 is short questions about familiar topics. Part 2 is one minute to prepare and two minutes to speak on a cue card. Part 3 is an abstract discussion.",
            ],
            tip: "In Task 1, overwriting your own data is the single most common way to drop a band. Write what the chart shows, not what it means to you.",
          },
          {
            title: "TOEFL iBT",
            what: "Reading, Listening, Speaking and Writing, scored on a 0–120 scale in half-point steps — or 1–6 for tests taken from 21 January 2026.",
            format: "About 2.5 hours. Reading 3 passages and 54 questions in 60 minutes, with no separate time limit per passage. Listening 3–4 campus conversations and 2–4 lectures, 42–50 questions, in 60 minutes. Speaking 6 tasks in 17 minutes. Writing one integrated task in 20 minutes and one independent task in 30 minutes.",
            score: "0–120 in half points, and each of the four sections is also reported separately. From 21 January 2026 the test reports on a 1–6 scale instead.",
            topics: [
              "Reading: academic passages with a purpose structure, and questions that ask you to infer attitude and function rather than just locate facts.",
              "Listening: campus conversations, including student advising, and academic lectures. Note-taking is allowed and expected.",
              "Speaking: six tasks, all short — 15 to 30 seconds each — which is long enough to be tiring and short enough that structure is everything.",
              "Writing: an integrated task where you read a passage and use it in your answer, and an independent task where the source is your own opinion.",
            ],
            tip: "The speaking section is six short answers back to back. Practise sustaining an answer for the full time rather than stopping early, which is the usual self-inflicted penalty.",
          },
          {
            title: "PTE Academic",
            what: "Speaking & Writing, Reading and Listening, scored 10–90 on a scale designed to map onto academic English.",
            format: "About 2 hours, computer-delivered only, with a short break between parts. Most centres offer same-week sittings.",
            score: "10–90 overall, plus a Communicative Ability score per skill. PTE Core, a shorter variant launched in 2024, reports on a 60–90 CEFR-aligned scale.",
            topics: [
              "Speaking & Writing: read aloud, repeat sentence, describe an image, and a personal or formal writing task.",
              "Reading: academic passages with a word count that tells you how much to read, and multiple-choice with a single answer.",
              "Listening: lectures and academic conversations, many with a graph or table alongside.",
            ],
            tip: "Because the test is computer-delivered and available at short notice, it is the best recovery option when a first sitting goes badly.",
          },
        ],
      },
      roadmap: {
        body:
          "Twelve weeks is the shortest runway that reliably gets a student from a rough starting point to a safe band. Compress it and the mock results will show you where the gaps are; stretch it and the last fortnight is spent re-reading what you already know.",
        roadmap: [
          {
            label: "Weeks 1–2",
            title: "Find the hole",
            goal: "Know your baseline and which of the four skills is costing you the band.",
            hours: "6–8 hours a week",
            focus: [
              "Take one full official practice test under timed conditions, with no notes and no pausing.",
              "Score it properly. Most students guess their band from how the test felt, and the gap between that and the real number is usually three or four bands.",
              "Score each of the four skills separately and take the lowest one as your target for the next fortnight.",
            ],
            checkpoint: "You have a real number per skill, and you know which one is lowest.",
          },
          {
            label: "Weeks 3–5",
            title: "Fix the weakest skill",
            goal: "Close the gap in the skill that is holding the average down.",
            hours: "8–10 hours a week",
            focus: [
              "Work only on the lowest skill for three weeks. Doing all four evenly is how people improve all four equally and get nowhere near a band.",
              "For listening: shadow the audio — play a passage, pause, and repeat the speaker's words aloud. It trains the ear faster than any exercise.",
              "For reading: learn to read the question first, then hunt for the answer. Time yourself per question; speed is where the marks are.",
              "For writing: do one task a week under timed conditions and get it marked by a human. Self-marking is where the plateau comes from.",
              "For speaking: record yourself answering the task and listen back. Almost everyone sounds worse than they are, and almost everyone is right to be a bit worried.",
            ],
            checkpoint: "Your lowest skill has moved up at least one band on a fresh practice test.",
          },
          {
            label: "Weeks 6–9",
            title: "Build the others",
            goal: "Bring the second-lowest skill up so the average moves, and keep the first one from slipping back.",
            hours: "8–10 hours a week",
            focus: [
              "Move to the second-weakest skill using the same method, while keeping one practice set a week on the first.",
              "Start learning the band descriptors for writing and speaking. Bands 6, 7 and 8 are described in specific terms, and most students are writing to the wrong one.",
              "Build a vocabulary of academic phrases for writing Task 2 and for the speaking part 3, where abstract discussion is the hardest thing to improvise.",
            ],
            checkpoint: "Two of your four skills are at or above your target band.",
          },
          {
            label: "Weeks 10–12",
            title: "Settle it",
            goal: "Hold the score under exam conditions and book the real date with a margin.",
            hours: "5–7 hours a week",
            focus: [
              "One full practice test a week, in the real format, at the real time of day if you can.",
              "Review every mistake in the one you just sat. This is the highest-value part of the whole plan and the part everyone skips.",
              "Book the real test now, not later. Leave at least six weeks before the earliest deadline, and if you can sit more than one date, book two — the second is free insurance you only use if the first goes wrong.",
            ],
            checkpoint: "The test is booked, with a real result date in hand, and the result lands before the deadline.",
          },
        ],
      },
      resources: {
        body:
          "The official material is free and better than most of what is sold. Start there, and only pay for something specific when you know exactly what you are missing.",
        resources: [
          {
            title: "IELTS official practice tests",
            kind: "practice",
            url: "https://ielts.org/take-a-test/preparation-resources",
            why: "Free, official, and the only practice that matches the real test's difficulty and timing. The computer-delivered ones are the closest to what you will actually sit.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "TOEFL TestReady",
            kind: "practice",
            url: "https://www.ets.org/toefl/test-ready",
            why: "ETS's own free preparation, including full practice tests and a diagnostic that tells you which section is costing you the most.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "PTE official practice and scoring guides",
            kind: "practice",
            url: "https://www.pearsonpte.com/preparation-resources",
            why: "Pearson publishes free practice with the scoring scale, which matters because PTE's scoring guide explains exactly how points are awarded for each task type.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "The Official Cambridge Guide to the TOEFL",
            kind: "book",
            why: "The reference for TOEFL format, scoring and the kinds of question you will meet. Buy it only if you are taking TOEFL and want one authoritative source rather than scattered advice.",
            cost: "Around US$45–60.",
            verifiedOn: V,
          },
          {
            title: "Cambridge IELTS 19 and 20",
            kind: "book",
            why: "The official Cambridge practice books. Volume 19 includes the IELTS Academic test with the accompanying audio; the reason to buy them is the audio and the real examiner commentary, not the questions.",
            cost: "Around US$35–45 each.",
            verifiedOn: V,
          },
          {
            title: "IELTS Liz",
            kind: "video",
            url: "https://ieltsliz.com/",
            why: "The clearest free video teaching for IELTS Writing and Speaking, organised by task type. The best single free resource for the two sections that need teaching rather than practice.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "E2 IELTS",
            kind: "video",
            url: "https://www.youtube.com/c/E2IELTS",
            why: "Free video lessons for IELTS skills and task strategies. Useful alongside official practice when you need a teacher to explain an approach; the provider's separate paid courses are not required to watch the channel.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Official band descriptor pages",
            kind: "official",
            url: "https://ielts.org/for-test-takers/how-ielts-is-scored",
            why: "The actual written descriptions of what each band means. Read your target band's description and compare it to your own writing — most students are aiming at the wrong descriptor.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "Waymark recommends these because they are the clearest and most complete we found for this checkpoint, not because anyone paid us. We take no payment for placement, and we do not take payment for anything. If a provider asks you for a code in exchange for a link on this page, that is not us.",
        },
      },
    },
  },

  "gb-english": {
    archetype: "language-test",
    intro:
      "The UK has two separate English requirements and students constantly mix them up. The university's English requirement decides whether you can be admitted. The Home Office requirement decides whether you can get a visa. They are different tests, and only one of them is for the visa.",
    sections: {
      exams: {
        body:
          "For the visa, only Home Office approved tests count: IELTS for UKVI, the Secure English Language Test, or TOEFL iBT. For university admission, most UK universities also accept IELTS Academic and TOEFL iBT, and some accept PTE. If you take IELTS Academic for the university, you still need a UKVI or SELT test for the visa, unless the university is on the list that lets it check your score itself.",
        points: [
          "The Test of Readiness for Skilled Migrants (TRSM) is a different test for a different purpose, if you are on that route. Most students are not.",
          "Your CAS statement of purpose is where the university records which test it accepted, and the university confirms the score with the test body electronically. If the test is on the Home Office approved list, the university can check it for you; if it is not, the university has to report to the Home Office that it checked by another means, which is a slower and riskier route.",
        ],
        exams: [
          {
            name: "IELTS for UKVI",
            accepted: true,
            requiredScore: "Usually 6.0 overall with 5.5 in each component for taught postgraduate programmes. Some universities ask 6.5 or 7.0 for competitive courses, and medicine, law and teacher training commonly ask higher.",
            note: "The Academic version, delivered as 'IELTS for UKVI'. It is a different certificate from ordinary IELTS Academic — check that the booking says UKVI on it.",
            validity: "2 years from the test date, and the test must also be within 6 months of the date you submit the visa application.",
            howToBook: "With the British Council, or at a test centre. Computer-delivered sittings are available most weekdays, and results come back in 3–5 working days.",
            leadTime: "Book 6–8 weeks before your deadline, and remember the score must be less than 6 months old on the day you apply.",
            cost: "Around £160–185 for IELTS for UKVI, varies by city.",
            url: "https://www.gov.uk/english-language-tests",
            verifiedOn: V,
          },
          {
            name: "Secure English Language Test (SELT)",
            accepted: true,
            requiredScore: "The score the university or the Home Office asks for. It maps to the same CEFR bands as IELTS.",
            note: "Taken at a Home Office approved test centre, under controlled conditions, which is the point of it. There are fewer centres and fewer sittings, so booking early matters more here than for any other test.",
            validity: "2 years, and it must be within 6 months of the visa application date.",
            howToBook: "Through a Home Office approved centre, and sittings are limited — often only a few a month at each location.",
            leadTime: "Allow longer than the other tests. Sittings are scarce, and this is the one that will make you miss a deadline if you leave it late.",
            cost: "Around £150–200, varies by centre.",
            url: "https://www.gov.uk/selt",
            verifiedOn: V,
          },
          {
            name: "TOEFL iBT",
            accepted: true,
            requiredScore: "Usually 90 or above on the 0–120 scale, or 6.0 or above on the 1–6 scale for tests taken from 21 January 2026. Competitive programmes ask more.",
            note: "Accepted for both the university and the visa, which makes it the single test that can cover both requirements.",
            validity: "2 years, and within 6 months of the visa application date.",
            howToBook: "Direct with ETS, at test centres or at home where that is offered.",
            leadTime: "About 4 days for results on the computer version, 8 on paper.",
            cost: "Around £200–250, varies.",
            url: "https://www.ets.org/toefl",
            verifiedOn: V,
          },
          {
            name: "PTE Academic",
            accepted: true,
            requiredScore: "Programme-specific, often stated as 50, 53, 58 or 60 on the 10–90 scale.",
            note: "Widely accepted for university admission in the UK, but it is NOT on the Home Office approved list, so it does not work for the visa itself. It is a strong option for the university requirement only.",
            validity: "2 years for university purposes.",
            howToBook: "Direct with Pearson, with sittings often available within days.",
            leadTime: "About 2 business days for results.",
            cost: "Around £230–260.",
            url: "https://www.pearsonpte.com/",
            verifiedOn: V,
          },
        ],
      },
      timing: {
        body:
          "The UK's timing trap is the six-month rule on the visa side. A test sat in February is not valid for a visa application in September, however good the score is. It has to be recent at the point you apply, not recent at the point you passed it.",
        points: [
          "For the visa, the test must be within 6 months of the date you submit the application. If your application is delayed by a request for further evidence, the clock keeps running and the score can go stale while you wait.",
          "For the university, the score is usually only needed when you are made an unconditional offer, and many universities allow the score to be sent with your application instead — ask, because it changes when you have to sit it.",
          "CAS timing is what actually sets your schedule. You cannot apply for the student visa until you have a CAS, and you cannot get a CAS until the university has your English result and your academic ones.",
        ],
        callout: {
          tone: "watch",
          title: "Book the visa test last, and separately",
          body: "A lot of students take one IELTS Academic for the university, get their CAS, and then discover they need a separate UKVI or SELT test for the visa — and that the sittings are full. If you think you may need a visa test, check the Home Office approved list before you book anything, and consider booking a slot you can move.",
        },
      },
      inside: {
        body:
          "UK universities usually state one overall band and a floor in each of the four skills. The floor is the part students misread. A 6.5 overall with a 5.5 in Writing does not meet a 6.5 overall with 6.0 in each requirement, and it is very common to be told you have met the requirement when you have not.",
        subsections: [
          {
            title: "IELTS for UKVI (Academic)",
            what: "Listening, Reading, Writing and Speaking, each banded 0–9 in half steps.",
            format: "About 2 hours 45 minutes. Listening 40 questions in 40 minutes plus 10 minutes' transfer time on paper. Reading 40 questions in 60 minutes. Writing 60 minutes for Task 1 (150 words) and Task 2 (250 words). Speaking 11–14 minutes in three parts.",
            score: "Each skill 0–9 in half bands; the overall is the mean of the four, rounded to the nearest half band.",
            topics: [
              "Reading: three academic passages plus one general-interest passage, with 40 questions in the hour.",
              "Writing Task 1 covers a graph, chart, table or process; Task 2 is an essay. Universities often specify which task type you should prepare for.",
              "Speaking: Part 1 familiar topics, Part 2 a cue card, Part 3 abstract discussion.",
            ],
            tip: "Check whether your programme specifies a writing task type. Cambridge and some universities ask for Task 2 only, and students who prepare Task 1 as well lose preparation time they could have spent on the essay.",
          },
          {
            title: "TOEFL iBT",
            what: "Reading, Listening, Speaking and Writing, scored 0–120 in half points, or 1–6 from 21 January 2026.",
            format: "About 2.5 hours. Reading 3 passages, 54 questions, 60 minutes. Listening 42–50 questions, 60 minutes. Speaking 6 tasks, 17 minutes. Writing one integrated and one independent task, 50 minutes combined.",
            score: "0–120 overall, plus four section scores. From 21 January 2026 the scale is 1–6.",
            topics: [
              "Campus conversations and academic lectures for Listening.",
              "Short, repeated tasks for Speaking — structure matters more than fluency.",
              "One reading-and-write integrated task, one independent essay.",
            ],
            tip: "Universities that publish both scales often say which one applies to your test date. Quote the right one in your application, or the admissions office will query it.",
          },
        ],
      },
      roadmap: {
        body:
          "UK courses often have a clear English requirement published well ahead of the deadline, which makes the language checkpoint unusually plannable. The variable is not the deadline but the six-month validity window on the visa side, so the plan below assumes a test in the last two months before you apply.",
        roadmap: [
          {
            label: "Weeks 1–2",
            title: "Know the target",
            goal: "Pin down the exact requirement, including the per-skill floor and whether the university accepts the score with your application.",
            hours: "5–7 hours a week",
            focus: [
              "Read the full English requirement on each shortlisted programme's page, not the summary. Note the overall band and every per-skill floor.",
              "Ask admissions, in writing, whether the score can follow with your application or must arrive before you are considered.",
              "Take one official practice test and score all four skills separately.",
            ],
            checkpoint: "You have a written target per skill, and you know which test the university will accept.",
          },
          {
            label: "Weeks 3–6",
            title: "Work the floor",
            goal: "Lift the weakest skill to your per-skill floor, which is usually below your overall target.",
            hours: "8–10 hours a week",
            focus: [
              "If your overall target is 6.5 and your floor is 6.0, you need three skills comfortably above 6.0 and one at 6.0. Identify that one and fix it first.",
              "Listening: shadowing. Reading: question-first timing. Writing: one timed task a week, marked by a person. Speaking: recorded answers, reviewed.",
              "Download the official band descriptors and read the one for your target band before you write anything.",
            ],
            checkpoint: "Your lowest skill is at or above the floor on a fresh practice test.",
          },
          {
            label: "Weeks 7–10",
            title: "Raise the average",
            goal: "Move the overall score into the band you need, without dropping a skill below the floor.",
            hours: "8–10 hours a week",
            focus: [
              "Work on the second-weakest skill. Keep one short practice set a week on the first so it holds.",
              "For speaking part 3, practise abstract discussion — technology, education, urban life. These recur across nearly every test, and improvising is a skill, not a personality trait.",
              "Practise under the real timing, including the paper transfer time if you might sit paper.",
            ],
            checkpoint: "Your overall is at or above target and no skill is below the floor.",
          },
          {
            label: "Weeks 11–12",
            title: "Book and sit",
            goal: "Have the result in hand, dated so that it is still inside the six-month window when you apply.",
            hours: "5–6 hours a week",
            focus: [
              "Book the real test. If the university accepts the score with the application, book comfortably early. If the visa needs a UKVI or SELT test, book a visa test within the window that will still be valid when you apply.",
              "One full practice test a week, in the real format.",
              "Check the result delivery route: the score must reach the admissions office electronically. Upload a PDF to your application portal and it will not count.",
            ],
            checkpoint: "The test is booked, the result date is known, and it is comfortably inside the validity window.",
          },
        ],
      },
      resources: {
        body:
          "For the UK, the official Home Office list is the one page you must read, and the British Council's own materials are the best free practice for the test you are actually taking.",
        resources: [
          {
            title: "Home Office approved English language tests",
            kind: "official",
            url: "https://www.gov.uk/government/publications/register-of-approved-english-language-tests",
            why: "The definitive list of tests the visa application will accept, including which providers offer SELT. Check it before you book, not after.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Find a SELT test centre",
            kind: "official",
            url: "https://www.gov.uk/find-selttest",
            why: "Where SELT sittings actually are, and when. SELT centres are few and their sittings fill, so this is the page that saves you a missed deadline.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "IELTS for UKVI practice tests",
            kind: "practice",
            url: "https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-practice-tests",
            why: "Free official practice with the computer-delivered format and full audio, which is the format most UKVI candidates sit.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "IELTS Liz",
            kind: "video",
            url: "https://ieltsliz.com/",
            why: "The clearest free teaching for Writing and Speaking, organised by task type — the two sections where most UK candidates lose a band.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "E2 IELTS",
            kind: "video",
            url: "https://e2ielts.com/",
            why: "Free structured courses across all four skills, with the band descriptors explained plainly. Best when you have not yet worked out what separates a 6.5 from a 7.0.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Cambridge IELTS 18, 19 and 20",
            kind: "book",
            why: "The official Cambridge practice books, with the audio and examiner commentary that make them worth buying. Volume 18 includes the Academic test with audio.",
            cost: "Around £35–40 each.",
            verifiedOn: V,
          },
          {
            title: "TOEFL TestReady",
            kind: "practice",
            url: "https://www.ets.org/toefl/test-ready",
            why: "ETS's own free preparation, including full practice tests and a diagnostic that names your weakest section.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the most complete and clearest for this checkpoint. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "ca-english": {
    archetype: "language-test",
    intro:
      "Canada has the one rule that catches nearly everyone: the study permit wants IELTS General Test, while the university wants IELTS Academic. They are different papers, and a General score will not satisfy a university admission requirement.",
    sections: {
      exams: {
        body:
          "For the study permit, IRCC accepts IELTS General Test, CELPIP General, PTE Core and TOEFL iBT. For university admission, the university usually wants IELTS Academic, TOEFL iBT or PTE Academic. The two requirements run in parallel and are satisfied by two different certificates.",
        points: [
          "IELTS General Training is not the same test as IELTS Academic. The Reading passages are everyday topics rather than academic ones, and the Writing Task 1 is a letter rather than a chart description. A General score is not accepted for admission to most Canadian universities.",
          "CELPIP General is the only test accepted for both the permit and, at some universities, admission. It is computer-delivered, results in about three days, and available in Canada and online. It is worth comparing against IELTS if you are in Canada or can sit the online version.",
          "PTE Core is accepted for the study permit, and it is a much shorter test than PTE Academic. It is a genuinely good option for the permit side if you do not want to sit a full academic paper.",
          "If your programme is delivered in French, a French test — TCF, TEF or TALF — may be required for the permit, and many universities run their own French placement assessment (Évaluation de la maîtrise de la langue française).",
        ],
        exams: [
          {
            name: "IELTS Academic",
            accepted: true,
            requiredScore: "Programme-specific, commonly 6.5 overall with 6.0 in each section for competitive programmes, and often 7.0 for professional faculties such as medicine and law.",
            note: "Academic, not General. This is the test for university admission.",
            validity: "2 years",
            howToBook: "With the British Council, at a test centre, or computer-delivered.",
            leadTime: "Results in 3–5 working days computer-delivered, 11–13 days on paper. Book 6–8 weeks ahead of your earliest admission deadline.",
            cost: "Around CAD$350–365, varies by city.",
            url: "https://ielts.org/take-a-test/test-types/ielts-academic-test",
            verifiedOn: V,
          },
          {
            name: "IELTS General Training",
            accepted: true,
            requiredScore: "CLB 9 for the study permit. Some programmes accept CLB 7 or 8, but CLB 9 is the standard minimum for a master's.",
            note: "This is the test the study permit wants. IELTS General equals CLB, so you do not have to convert anything.",
            validity: "2 years",
            howToBook: "With the British Council, at a test centre or computer-delivered.",
            leadTime: "About 4 weeks if you want the score in hand before applying for the permit, because the permit application itself takes time once the score exists.",
            cost: "Around CAD$350–365.",
            url: "https://ielts.org/take-a-test/test-types/ielts-general-training-test",
            verifiedOn: V,
          },
          {
            name: "CELPIP General",
            accepted: true,
            requiredScore: "CLB 9, on the same scale as IELTS General.",
            note: "The one test that covers the permit and, at some universities, admission. It is computer-delivered, with results in about three days, and is offered in Canada and online.",
            validity: "2 years",
            howToBook: "Direct with CELPIP, in test centres in Canada or online with a proctor.",
            leadTime: "About 3 days for results, which makes it the fastest turnaround of the options.",
            cost: "Around CAD$300.",
            url: "https://www.celpip.ca/",
            verifiedOn: V,
          },
          {
            name: "TOEFL iBT",
            accepted: true,
            requiredScore: "Programme-specific for admission, commonly 90 or above. For the study permit, 90 is the standard minimum, and the test must be within 2 years of the application.",
            note: "One test that satisfies both the university and the permit, which makes it the simplest option if the score is high enough for the programme.",
            validity: "2 years",
            howToBook: "Direct with ETS.",
            leadTime: "About 4 days for results on the computer version, 8 on paper.",
            cost: "Around CAD$300–330.",
            url: "https://www.ets.org/toefl",
            verifiedOn: V,
          },
          {
            name: "PTE Core",
            accepted: true,
            requiredScore: "CLB 9, on the 60–90 CEFR-aligned scale.",
            note: "Accepted for the study permit. Shorter and cheaper than IELTS General, and results in about 2 business days. It is not the same test as PTE Academic and is not accepted for university admission.",
            validity: "2 years",
            howToBook: "Direct with Pearson.",
            leadTime: "About 2 business days for results.",
            cost: "Around CAD$300.",
            url: "https://www.pearsonpte.com/pte-core",
            verifiedOn: V,
          },
        ],
      },
      timing: {
        body:
          "Work backwards from the study permit application, not from the university deadline. The permit is the long pole, and it needs a language score that is inside its two-year validity window on the day you apply.",
        points: [
          "The permit application cannot be filed without a language result, and once filed it typically takes weeks to months to process. Budget the processing time, not just the test.",
          "If you are eligible for the Streaming Delivery Service, you can file your permit before your language results arrive, because IRCC checks them afterwards. This can save weeks and is worth checking against the current SDS eligibility list.",
          "Many universities will let you apply with the score following rather than arriving first, which is a common way to overlap the university deadline with the test.",
          "Take the university test and the permit test in the same trip if you can. Two tests in one city is far cheaper than two trips.",
        ],
        callout: {
          tone: "watch",
          title: "The two-test trap",
          body: "Take IELTS Academic for the university, IELTS General for the permit, and then remember that the General score is not accepted for admission. Many students discover this after they have applied and their admission offer is conditional on a score the university will not take.",
        },
      },
      inside: {
        body:
          "The four skills are scored the same way as everywhere else, and the CLB conversion is the part worth understanding, because the permit states a CLB and the university states an IELTS band, and you need to move between them without rounding yourself down.",
        subsections: [
          {
            title: "IELTS General Training",
            what: "The same four skills as Academic, with everyday rather than academic reading and a letter-writing Task 1.",
            format: "About 2 hours 45 minutes, identical structure to Academic.",
            score: "Bands 0–9 in half steps, with a published CLB equivalent. CLB 9 corresponds to IELTS 8.0, and CLB 7 to 6.0.",
            topics: [
              "Reading uses everyday topics — notices, advertisements, timetables, job descriptions — rather than academic passages.",
              "Writing Task 1 is a formal letter; Task 2 is the same discursive essay as Academic.",
              "The listening and speaking sections are the same as Academic.",
            ],
            tip: "If you can take one test for the permit, this is the paper to take — the reading is easier than Academic, and CLB 9 is all the permit asks for.",
          },
          {
            title: "IELTS Academic",
            what: "Four skills with academic reading, chart description and essay writing.",
            format: "About 2 hours 45 minutes. Listening 40 questions in 40 minutes plus transfer time. Reading 40 questions in 60 minutes. Writing 60 minutes. Speaking 11–14 minutes.",
            score: "Bands 0–9 in half steps. Programmes quote an overall band and often a floor in each skill.",
            topics: [
              "Reading: three academic passages and one general-interest passage.",
              "Writing Task 1: describe a graph, chart, table or process. Task 2: a discursive essay.",
              "Speaking: familiar topics, a cue card, and abstract discussion.",
            ],
            tip: "Canadian universities publish the per-skill floor more often than most. Read all four, and treat the floor as the real target rather than the overall band.",
          },
          {
            title: "CELPIP General",
            what: "A computer-delivered test designed for Canadian immigration, in English and French.",
            format: "About 2 hours, with a reading and writing section and an oral section. Available in test centres across Canada and online with a proctor.",
            score: "Reported on the CLB scale from 4 to 12, so it lines up directly with the permit requirement.",
            topics: [
              "Reading and writing use everyday and workplace Canadian English, not academic passages.",
              "The oral section is a short interview-style recording.",
            ],
            tip: "Its topics are closer to everyday Canadian English than IELTS, so if academic reading is your weak point, this paper is a genuinely easier route to CLB 9.",
          },
        ],
      },
      roadmap: {
        body:
          "If you need two papers, treat them as one project with two exams. The listening and speaking preparation is shared, and the writing differs only in Task 1, so the bulk of the work is the same.",
        roadmap: [
          {
            label: "Weeks 1–2",
            title: "Decide how many tests",
            goal: "Know whether you are sitting one paper or two, and what each must score.",
            hours: "5–7 hours a week",
            focus: [
              "Check your programme's admission requirement and IRCC's permit requirement side by side. Write both down, per skill.",
              "Check the SDS list to see whether you can file the permit before your results land.",
              "Take one official practice test of each kind you are considering. The two papers feel very different even where the skills overlap.",
            ],
            checkpoint: "You know the number, the per-skill floors, and how many papers you are sitting.",
          },
          {
            label: "Weeks 3–6",
            title: "Build the shared base",
            goal: "Bring listening and reading up to the level both papers need.",
            hours: "8–10 hours a week",
            focus: [
              "Listening is identical across papers and is the most trainable skill. One focused hour a day, using shadowing, beats two hours twice a week.",
              "Reading: for Academic, practise question-first timing and paragraph function. For General, practise speed — the passages are easier and the clock is the same.",
              "Vocabulary: build the academic word list for Academic, and the everyday register for General.",
            ],
            checkpoint: "You are scoring at or above your floor in listening and reading on both papers.",
          },
          {
            label: "Weeks 7–10",
            title: "Writing and speaking",
            goal: "Clear the writing and speaking floors on both papers.",
            hours: "8–10 hours a week",
            focus: [
              "Write Task 2 once a week, timed, and have it marked by a person. This is the section where silent practice is least useful.",
              "Do one Academic Task 1 (chart) and one General Task 1 (letter) if you are sitting both papers — they are different writing skills and are taught differently.",
              "Practise speaking aloud, recorded, in the actual format. Part 3 abstract questions recur across both papers.",
            ],
            checkpoint: "Both papers' writing and speaking are at or above the floor on a fresh practice test.",
          },
          {
            label: "Weeks 11–14",
            title: "Sit and land it",
            goal: "Have both results, dated so they are valid for the permit application you are about to file.",
            hours: "5–7 hours a week",
            focus: [
              "Book both sittings close together, ideally in one city, with the results landing before your permit application date.",
              "If you are only sitting one paper, book that one and make sure the electronic score report is sent to the right institution — for the permit, to IRCC; for the university, to the admissions office.",
              "Keep the practice up to the day. Scores fall in the fortnight before a test far more often than in the fortnight before preparation.",
            ],
            checkpoint: "Both results in hand, with the correct electronic reports sent.",
          },
        ],
      },
      resources: {
        body:
          "Canada has its own official material that is better than what you would find by searching, including IRCC's own language test guidance and the official Canadian test providers.",
        resources: [
          {
            title: "IRCC: proof of language proficiency",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/language-tests.html",
            why: "The immigration authority's own page on which tests it accepts, the minimum scores, and how the results must be submitted. This is the document the permit is actually decided against.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "CELPIP General",
            kind: "practice",
            url: "https://www.celpip.ca/",
            why: "The official site, with sample questions and a free readiness test. If you are considering CELPIP for the permit, start with their own readiness test — it is a good predictor.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "IELTS free practice tests",
            kind: "practice",
            url: "https://ielts.org/take-a-test/preparation-resources",
            why: "Free official practice for both Academic and General, including the computer-delivered format and full audio.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "IELTS Liz",
            kind: "video",
            url: "https://ieltsliz.com/",
            why: "The clearest free teaching for Writing and Speaking. It also has a dedicated guide to the General Training Task 1 letter, which most candidates never look for and then meet on the day.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "E2 IELTS",
            kind: "video",
            url: "https://e2ielts.com/",
            why: "Free structured courses for all four skills, with the band descriptors explained in plain language.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Cambridge IELTS 18, 19 and 20",
            kind: "book",
            why: "The official Cambridge practice books with audio and examiner commentary, for the Academic paper. Volume 18 and 19 include the full Academic test with audio.",
            cost: "Around CAD$45–55 each.",
            verifiedOn: V,
          },
          {
            title: "PTE Core",
            kind: "official",
            url: "https://www.pearsonpte.com/pte-core",
            why: "Pearson's own page for the shorter test accepted for the study permit, including the CEFR mapping and free practice.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the most complete and clearest for this checkpoint, and because they are the documents the authorities themselves point students at. We take no payment for placement.",
        },
      },
    },
  },

  "au-english": {
    archetype: "language-test",
    intro:
      "Australia is the most straightforward of the big English-speaking destinations: one test can satisfy both the university's admission requirement and the visa's evidence requirement, and Home Affairs accepts IELTS, TOEFL and PTE for both.",
    sections: {
      exams: {
        body:
          "Home Affairs accepts IELTS Academic, TOEFL iBT, PTE Academic and the OET for the visa. Most universities accept the same three for admission. The visa requirement is that your results are valid at the time you apply — the test must have been taken within 6 months of the application date.",
        points: [
          "The visa does not set a single minimum band; the university does, and the visa requires evidence that you meet the requirement stated on your Confirmation of CoE.",
          "Most Australian universities ask IELTS 6.5 overall with no band below 6.0 for coursework, and 7.0 for research degrees and professional programmes. Check the CoE when it arrives — the number on the CoE is the one that matters.",
          "OET is accepted for the visa and by a small number of universities. It is designed for healthcare and is only worth considering in that field.",
          "PTE Academic is accepted for both the visa and admission, and is computer-delivered with results in about two business days, which makes it a strong recovery option if you need a quick re-sit.",
        ],
        exams: [
          {
            name: "IELTS Academic",
            accepted: true,
            requiredScore: "Usually 6.5 overall with 6.0 in each band for coursework; 7.0 for research degrees and some professional programmes. The number on your CoE is binding.",
            note: "One test covers both the university and the visa, which is the simplest arrangement in this destination.",
            validity: "2 years from the test date, and the test must be within 6 months of the visa application date.",
            howToBook: "With the British Council, at a test centre or computer-delivered.",
            leadTime: "Results in 3–5 working days computer-delivered, 11–13 days on paper. Book 6–8 weeks before your deadline.",
            cost: "Around AUD$380–400, varies by city.",
            url: "https://ielts.org/take-a-test/test-types/ielts-academic-test",
            verifiedOn: V,
          },
          {
            name: "TOEFL iBT",
            accepted: true,
            requiredScore: "Usually 90 or above, with a per-section floor of about 20 in some programmes. Confirm against the CoE.",
            note: "TOEFL moved to a 1–6 scale for tests taken from 21 January 2026, so a university page may publish two minimums. Check which scale your requirement uses.",
            validity: "2 years, and within 6 months of the visa application date.",
            howToBook: "Direct with ETS.",
            leadTime: "About 4 days for results on the computer version, 8 on paper.",
            cost: "Around AUD$325–360.",
            url: "https://www.ets.org/toefl",
            verifiedOn: V,
          },
          {
            name: "PTE Academic",
            accepted: true,
            requiredScore: "Programme-specific, usually a band of 50, 53, 58 or 60 on the 10–90 scale.",
            note: "Accepted for both admission and the visa, and the fastest turnaround — results in about two business days, with sittings available at short notice.",
            validity: "2 years, and within 6 months of the visa application date.",
            howToBook: "Direct with Pearson.",
            leadTime: "About 2 business days for results.",
            cost: "Around AUD$330–380.",
            url: "https://www.pearsonpte.com/",
            verifiedOn: V,
          },
        ],
      },
      timing: {
        body:
          "The CoE is the anchor. You cannot apply for the student visa without a Confirmation of CoE, and the CoE states the English requirement you have to evidence. So the language test is the last thing you finish before the visa, and the six-month validity window runs from the test date, not from the offer.",
        points: [
          "Take the test close to but not on the visa application date. Too early and the result may fall outside the six-month window; too late and the visa application cannot be filed.",
          "Australian student visa processing times are published by the Department of Home Affairs and are typically several weeks to a few months. Add that to your plan — the test is rarely the thing that makes you late.",
          "If you are applying for a postgraduate research degree, a research proposal is often required alongside the language result, and the proposal takes far longer than the test.",
        ],
      },
      inside: {
        body:
          "The four-skill structure is the same as everywhere, but Australian universities are unusually consistent about one thing: they publish the per-band floor as well as the overall, and they expect you to meet it. An overall 6.5 with a 5.5 in Listening does not satisfy a 6.0 minimum in every band.",
        subsections: [
          {
            title: "IELTS Academic",
            what: "Listening, Reading, Writing and Speaking, banded 0–9 in half steps.",
            format: "About 2 hours 45 minutes. Listening 40 questions in 40 minutes plus transfer time. Reading 40 questions in 60 minutes. Writing 60 minutes for Task 1 and Task 2. Speaking 11–14 minutes.",
            score: "Each skill 0–9 in half bands; overall is the mean of the four, rounded to the nearest half band.",
            topics: [
              "Reading: three academic passages plus one general-interest passage across three sections.",
              "Writing Task 1: graph, chart, table or process. Task 2: a discursive essay.",
              "Speaking: three parts, from familiar topics to abstract discussion.",
            ],
            tip: "Australian universities publish 'no band below 6.0' more often than any other destination. That single floor is usually what decides your study hours, not the overall number.",
          },
          {
            title: "TOEFL iBT",
            what: "Reading, Listening, Speaking and Writing, scored 0–120 in half points, or 1–6 from 21 January 2026.",
            format: "About 2.5 hours. Reading 54 questions in 60 minutes. Listening 42–50 questions in 60 minutes. Speaking 6 tasks in 17 minutes. Writing 50 minutes across two tasks.",
            score: "0–120 overall plus four section scores, and 1–6 from 21 January 2026.",
            topics: [
              "Campus conversations and academic lectures.",
              "Six short speaking tasks, then one integrated and one independent writing task.",
            ],
            tip: "The speaking section is six short answers in a row. Practise finishing each one in the time given rather than trailing off.",
          },
          {
            title: "PTE Academic",
            what: "Speaking & Writing, Reading and Listening, scored 10–90.",
            format: "About 2 hours, computer-delivered only, with a short break between parts.",
            score: "10–90 overall, with a Communicative Ability score per skill, plus a Skills Measured score for the new PTE Core.",
            topics: [
              "Read aloud, repeat sentence, describe an image, and a writing task.",
              "Reading passages with a word count, and multiple-choice with a single answer.",
              "Lectures and academic conversations, often with a graph or table.",
            ],
            tip: "Computer-delivered and available at short notice — which makes it the most practical option if you discover you need a second sitting close to your visa date.",
          },
        ],
      },
      roadmap: {
        body:
          "Twelve weeks is comfortable for a student starting from an intermediate level, and the published band structure gives you something to aim at precisely. Start from a real mock, because the gap between the score you think you would get and the score you would get is routinely three bands.",
        roadmap: [
          {
            label: "Weeks 1–2",
            title: "Baseline and target",
            goal: "Know your four scores and the exact per-band floor on your CoE.",
            hours: "5–7 hours a week",
            focus: [
              "Find the English requirement on your offer or CoE and write down the overall and every per-band floor.",
              "Take one official practice test and score each skill separately.",
              "Decide your test: IELTS if you want the widest acceptance, TOEFL if you want one test for both purposes, PTE if you want the fastest results and short-notice sittings.",
            ],
            checkpoint: "You have a target per skill and a test chosen.",
          },
          {
            label: "Weeks 3–6",
            title: "Fix the floor",
            goal: "Bring every skill to at least the per-band floor.",
            hours: "8–10 hours a week",
            focus: [
              "Work on the lowest skill for three weeks. The floor is what fails applications, not the average.",
              "Listening: daily shadowing, one focused hour. Reading: question-first timing. Writing: one timed task a week, marked by a person. Speaking: recorded, reviewed.",
              "Read the official band descriptor for your target band. Most students write to band 6 and hope for a 7.",
            ],
            checkpoint: "No skill is below the floor on a fresh practice test.",
          },
          {
            label: "Weeks 7–10",
            title: "Lift the overall",
            goal: "Move the average up while keeping every skill above the floor.",
            hours: "8–10 hours a week",
            focus: [
              "Work the second-weakest skill now. Keep one practice set a week on the first so it does not drop back.",
              "Build an academic phrase bank for Task 2 and speaking part 3.",
              "Do one full test a week under exam conditions from week 8.",
            ],
            checkpoint: "Your overall is at or above target and every skill is at or above the floor.",
          },
          {
            label: "Weeks 11–12",
            title: "Book and sit",
            goal: "Have the result in hand, and dated so it is still valid when you apply for the visa.",
            hours: "5–6 hours a week",
            focus: [
              "Book the test 8–10 weeks before your visa application date — late enough that the six-month window is safe, early enough that the result arrives with margin.",
              "Check how the result reaches the university and Home Affairs. For the visa, the electronic result is what counts.",
              "Do not reschedule for a better feeling. The mock is the evidence, not your confidence on the day.",
            ],
            checkpoint: "Test booked, delivery route confirmed, result date comfortably before the visa filing date.",
          },
        ],
      },
      resources: {
        body:
          "Home Affairs publishes its own accepted-test list, and the official test bodies publish free material that covers the whole syllabus. The paid providers are only worth it when you know exactly which skill you are missing.",
        resources: [
          {
            title: "Home Affairs: English language requirements",
            kind: "official",
            url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
            why: "The visa's own page naming the accepted tests, and the six-month rule on how recent your evidence must be. This is the document the visa decision is made against.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "IELTS free practice tests",
            kind: "practice",
            url: "https://ielts.org/take-a-test/preparation-resources",
            why: "Free official practice for the Academic paper, with audio, in the computer-delivered format most Australian candidates sit.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "TOEFL TestReady",
            kind: "practice",
            url: "https://www.ets.org/toefl/test-ready",
            why: "ETS's own free preparation, with full practice tests and a diagnostic that names your weakest section.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "PTE preparation resources",
            kind: "practice",
            url: "https://www.pearsonpte.com/preparation-resources",
            why: "Pearson's official practice and scoring guides, which matter because PTE's task types are scored in a specific way the guides explain.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "IELTS Liz",
            kind: "video",
            url: "https://ieltsliz.com/",
            why: "The clearest free teaching for Writing and Speaking, organised by task type, with a guide to writing to the band descriptor rather than to your instinct.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "E2 IELTS",
            kind: "video",
            url: "https://e2ielts.com/",
            why: "Free structured courses across all four skills, with band descriptors explained plainly.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Cambridge IELTS 18, 19 and 20",
            kind: "book",
            why: "Official Cambridge practice with audio and examiner commentary. Volumes 18 and 19 include the full Academic test with audio.",
            cost: "Around AUD$50–60 each.",
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the clearest and most complete for this checkpoint, and because they are the sources the authorities themselves point students at. We take no payment for placement.",
        },
      },
    },
  },

  "de-english": {
    archetype: "language-test",
    intro:
      "Germany splits the requirement in a way that surprises people. The university's English requirement is about whether you can follow the course. The visa requirement is about whether you can function in Germany — and for an English-taught course it is usually satisfied by the same certificate, but only if it is the right one.",
    sections: {
      exams: {
        body:
          "English-taught master's programmes in Germany usually specify either TOEFL iBT or IELTS Academic, sometimes either/or, at a level commonly around 6.5 IELTS or 90 TOEFL on the old scale. Programmes taught in German require a German certificate instead. The APS process, for applicants from India, China and Vietnam, adds its own language testing step on top.",
        points: [
          "TOEFL changed scale on 21 January 2026. Providers publish two different minimums — one for the 0–120 scale and one for the new 1–6 scale. Your programme page may still show only the old one, which is why this shows up so often in admissions queries.",
          "Many German programmes accept 'TOEFL or IELTS' and publish a single number, which is not comparable across the two tests. A 6.5 IELTS and a 90 TOEFL are roughly comparable, but a published '90' in a 1–6 scale is not a thing — so the scale the page uses tells you which test it means.",
          "For a German-taught programme you need a German certificate, not an English one. TestDaF, DSD, telc Deutsch, Goethe-Zertifikat, and the ÖSD are the usual ones, and the required level is usually B2 or C1.",
          "The APS certificate for Indian, Chinese and Vietnamese applicants includes an APS language test, which is a separate test from the university's requirement and happens at a fixed point in the process.",
        ],
        exams: [
          {
            name: "TOEFL iBT",
            accepted: true,
            requiredScore: "Programme-specific. On the 0–120 scale, around 90 is a common minimum for English-taught master's programmes; competitive subjects ask more. On the 1–6 scale, published minimums for the same programmes are around 4.0–4.5.",
            note: "Which scale a German programme means is usually inferable from the number: a number above 6 must be the old scale. From 21 January 2026 your test reports on the 1–6 scale, so a page quoting 90 means a 0–120 test and a page quoting 4.5 means a 1–6 test.",
            validity: "2 years",
            howToBook: "Direct with ETS, at test centres in Germany and worldwide.",
            leadTime: "About 4 days for results on the computer version, 8 on paper. Book 6–8 weeks ahead.",
            cost: "Around €250–290, varies by location.",
            url: "https://www.ets.org/toefl",
            verifiedOn: V,
          },
          {
            name: "IELTS Academic",
            accepted: true,
            requiredScore: "Programme-specific, commonly 6.5 overall with 6.0 in each skill for English-taught master's programmes.",
            note: "Academic, not General. Some programmes also accept the IELTS General for admission but require the English-taught route to be explicitly stated on your admission letter.",
            validity: "2 years",
            howToBook: "With the British Council, at a test centre or computer-delivered.",
            leadTime: "3–5 working days computer-delivered, 11–13 days on paper.",
            cost: "Around €235–255, varies by city.",
            url: "https://ielts.org/take-a-test/test-types/ielts-academic-test",
            verifiedOn: V,
          },
          {
            name: "German certificates — TestDaF, DSD, telc, Goethe",
            accepted: false,
            requiredScore: "Usually B2 or C1, depending on the programme. TestDaF and DSD are the two most often required for German-taught programmes; telc and Goethe are widely accepted alternatives.",
            note: "Only needed if the course is taught in German, or if you want the freedom to change into a German-taught programme later. They are also what lets you work in Germany after graduation without a separate language requirement.",
            validity: "Usually 2 years.",
            howToBook: "With the relevant provider — TestDaF and DSD through their own networks, telc and Goethe through local centres.",
            leadTime: "Results commonly take 6–10 weeks for TestDaF and DSD, so book earlier than you would an English test.",
            cost: "Around €180–195 for TestDaF, less for telc.",
            url: "https://www.testdaf.de/",
            verifiedOn: V,
          },
        ],
      },
      timing: {
        body:
          "German applications open on a fixed cycle and close on a fixed date, so the test date is not really a choice — it is a consequence of when you applied. Most programmes want the language result inside the application, not alongside it, so it has to be booked before the deadline rather than around it.",
        points: [
          "For a winter semester starting in October, the application deadline is usually in May or June. That means your language test needs to be sat by roughly March — which, if you are starting from scratch, is a genuinely short runway.",
          "For a summer semester, the deadline is usually in December or January, so the test can sit in November or December.",
          "uni-assist applications and direct applications to the same programme have different deadlines, and in some cases a direct application is still open after the uni-assist round has closed. Check both.",
          "The APS process adds months. If you are applying from India, China or Vietnam, the APS certificate — including its own language test — comes before you can apply anywhere, and it cannot be rushed.",
        ],
        callout: {
          tone: "watch",
          title: "Work out which scale your programme means",
          body: "TOEFL moved to a 1–6 scale for tests taken from 21 January 2026. German programme pages now carry both minimums in places, and only the old ones in others. If a page says 'TOEFL 90', it wants the 0–120 scale, and a 1–6 result will be read as wrong until you explain it. Quote your scale in your application, unprompted.",
        },
      },
      inside: {
        body:
          "The tests are the same four-skill instruments as everywhere else. The German-specific part is the APS test, which is a separate, shorter, structured interview-based exam that is part of getting your certificate rather than part of the university application.",
        subsections: [
          {
            title: "TOEFL iBT",
            what: "Reading, Listening, Speaking and Writing, scored 0–120 in half points, or 1–6 from 21 January 2026.",
            format: "About 2.5 hours. Reading 54 questions in 60 minutes. Listening 42–50 questions in 60 minutes. Speaking 6 tasks in 17 minutes. Writing 50 minutes across two tasks.",
            score: "0–120, plus four section scores. From 21 January 2026, 1–6.",
            topics: [
              "Campus conversations and academic lectures.",
              "Short repeated speaking tasks.",
              "One integrated and one independent writing task.",
            ],
            tip: "Because the scale changed mid-stream, state the scale and the date of your test in your application. It removes a whole category of avoidable query.",
          },
          {
            title: "IELTS Academic",
            what: "Listening, Reading, Writing and Speaking, banded 0–9 in half steps.",
            format: "About 2 hours 45 minutes, with the same structure as everywhere else.",
            score: "Per-skill bands 0–9, overall is the mean of the four.",
            topics: [
              "Academic reading passages and general-interest passages.",
              "Writing Task 1 chart or process, Task 2 essay.",
              "Speaking in three parts.",
            ],
            tip: "German programmes often state a floor per skill as well as the overall. If you have one strong section and three middling ones, the floor is what decides your result.",
          },
          {
            title: "APS language test",
            what: "A structured, moderated test of academic English administered as part of the APS process for applicants from India, China and Vietnam.",
            format: "A short written and oral assessment, different in structure from IELTS and TOEFL, and the result feeds into your APS certificate rather than a separate score.",
            score: "Not banded like IELTS or TOEFL. It is a pass/fail element of the APS certificate.",
            topics: [
              "Academic English in the German higher-education context, tested in the structure the APS publishes.",
            ],
            tip: "The APS test is not a substitute for the university's own requirement. You generally need both, and the APS one comes first.",
          },
        ],
      },
      roadmap: {
        body:
          "German cycles are short, so the plan has to be front-loaded. The single most important decision is whether you need a test at all for the visa, and the second is the scale question on TOEFL — resolve both before you spend a minute studying.",
        roadmap: [
          {
            label: "Weeks 1–2",
            title: "Resolve the two questions",
            goal: "Know which test, which scale, and whether the visa needs one too.",
            hours: "4–6 hours a week",
            focus: [
              "Read the exact English requirement on each programme page and write down the test, the number and the scale. If the number is 90 or above, it is the 0–120 scale; if it is between 1 and 6, it is the new one.",
              "Check whether the course is taught in English or German, and whether the visa will need a German certificate.",
              "If you are an Indian, Chinese or Vietnamese applicant, start the APS process now — it is the long pole and it has its own language test.",
            ],
            checkpoint: "Test, scale, and visa requirement are all written down.",
          },
          {
            label: "Weeks 3–6",
            title: "Find the hole",
            goal: "A real baseline and a clear priority.",
            hours: "8–10 hours a week",
            focus: [
              "One full official practice test, timed, scored per skill.",
              "Three weeks on the weakest skill only. This is the part students skip and the reason their score does not move.",
              "If the programme publishes a per-skill floor, treat that as the target for the first six weeks and the overall as the second objective.",
            ],
            checkpoint: "You know your weakest skill and it is improving on a fresh test.",
          },
          {
            label: "Weeks 7–10",
            title: "Close the gap",
            goal: "Overall at or above the published minimum, with no skill under the floor.",
            hours: "8–10 hours a week",
            focus: [
              "Move to the second-weakest skill. Keep one practice set a week on the first.",
              "One full test a week in the real format from week 8.",
              "Prepare the application wording for your score, including the scale and test date, ready to paste in.",
            ],
            checkpoint: "Overall target met, no skill below the floor, and a full test scored at or above it.",
          },
          {
            label: "Weeks 11–14",
            title: "Book, sit, deliver",
            goal: "The score is with the admissions office before the application deadline.",
            hours: "5–7 hours a week",
            focus: [
              "Book the real test at least 8 weeks before the application deadline — German cycles are unforgiving and sittings in peak season fill.",
              "Check the delivery route. Most German programmes want the official electronic report, and some want it sent directly from ETS or the British Council rather than uploaded.",
              "If you are sitting TOEFL, write the scale and date into your application when you upload the result.",
            ],
            checkpoint: "Test sat, result received, and the admissions office has it.",
          },
        ],
      },
      resources: {
        body:
          "Germany's official portals are unusually good and mostly free. uni-assist and the APS both publish the requirements themselves, which saves you from relying on a forum's interpretation of them.",
        resources: [
          {
            title: "uni-assist",
            kind: "official",
            url: "https://www.uni-assist.de/en/",
            why: "The central application portal for most German universities, and the place to see which programmes you are eligible for and what each one requires. Free, and the fastest way to see the real English requirement per programme.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "APS — Anabin Recognition Process",
            kind: "official",
            url: "https://www.aps.org.cn/",
            why: "The official APS site for applicants from India, China and Vietnam, including the process, the dates and the language test structure.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "TOEFL TestReady",
            kind: "practice",
            url: "https://www.ets.org/toefl/test-ready",
            why: "ETS's free preparation, including full practice tests and the score diagnostic. Also the best place to confirm the current scale for your test date.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "IELTS free practice tests",
            kind: "practice",
            url: "https://ielts.org/take-a-test/preparation-resources",
            why: "Free official practice with audio for the Academic paper.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "IELTS Liz",
            kind: "video",
            url: "https://ieltsliz.com/",
            why: "The clearest free teaching for Writing and Speaking by task type.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "E2 IELTS",
            kind: "video",
            url: "https://e2ielts.com/",
            why: "Free structured courses for all four skills with band descriptors explained plainly.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "TestDaF",
            kind: "official",
            url: "https://www.testdaf.de/",
            why: "The official site for the German certificate most German-taught programmes ask for, including the level structure and test dates.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official portals and the clearest free teaching we found for this checkpoint. We take no payment for placement.",
        },
      },
    },
  },

  "fr-english": {
    archetype: "language-test",
    intro:
      "France runs on two languages. If your programme is taught in French you need a French certificate; if it is taught in English you need an English one — and the Campus France attestation sits on top of whichever it is.",
    sections: {
      exams: {
        body:
          "For English-taught master's programmes, universities usually accept IELTS Academic, TOEFL iBT, or a Cambridge English exam. For French-taught programmes, the accepted certificates are TCF, DALF, DELF, and the TEFCB and TCF Canada for Canadian applications. The French level most master's programmes ask for is B2, sometimes C1.",
        points: [
          "The Campus France Études en France (EEF) attestation is the document that the visa application and most universities require, and it records which language certification you hold. It is not a test — it is a confirmation you paid for and sat a recognised language exam.",
          "For a French-taught programme the certificate has to be less than two years old at the point of enrolment in most cases, and TCF results are valid for two years from the test date.",
          "IELTS General is accepted by some universities for English-taught programmes, and by Campus France for the attestation. It is worth checking per programme rather than assuming.",
        ],
        exams: [
          {
            name: "IELTS Academic",
            accepted: true,
            requiredScore: "Programme-specific, commonly 6.5 overall for English-taught master's programmes in France.",
            note: "Both Academic and General are accepted for the Campus France attestation, but the university decides which it wants for admission.",
            validity: "2 years",
            howToBook: "With the British Council in France, at a test centre or computer-delivered.",
            leadTime: "3–5 working days computer-delivered, 11–13 days on paper. Book 6–8 weeks ahead.",
            cost: "Around €215–240, varies by city.",
            url: "https://ielts.org/take-a-test/test-types/ielts-academic-test",
            verifiedOn: V,
          },
          {
            name: "TOEFL iBT",
            accepted: true,
            requiredScore: "Programme-specific, typically around 90 on the 0–120 scale, or the equivalent on the 1–6 scale for tests taken from 21 January 2026.",
            note: "Widely accepted for English-taught programmes in France.",
            validity: "2 years",
            howToBook: "Direct with ETS.",
            leadTime: "About 4 days for results on the computer version, 8 on paper.",
            cost: "Around €250–290.",
            url: "https://www.ets.org/toefl",
            verifiedOn: V,
          },
          {
            name: "TCF — Test de Connaissance du Français",
            accepted: true,
            requiredScore: "Usually NCLC B2 (level 2) or C1 (level 3) for master's programmes, expressed as a score of 350–450 for B2 and 500–600 for C1.",
            note: "The certificate most French-taught programmes ask for, administered by France Éducation International in approved centres in France and abroad.",
            validity: "2 years from the test date.",
            howToBook: "Through France Éducation International, at an approved centre. Sittings are less frequent than English tests.",
            leadTime: "Results typically take around three weeks, so book earlier than you would an IELTS.",
            cost: "Around €255–290.",
            url: "https://www.france-education-international.fr/",
            verifiedOn: V,
          },
          {
            name: "DALF and DELF",
            accepted: true,
            requiredScore: "DALF C1 for a master's programme; DELF B2 or C1 also accepted by many universities.",
            note: "Issued by the Alliance Française and the Institut français, which makes them easier to sit outside France. DALF is only awarded at C1 level.",
            validity: "2 years",
            howToBook: "Through any Alliance Française or Institut français worldwide.",
            leadTime: "Results in two to three weeks.",
            cost: "Around €150–260 depending on the level and the centre.",
            url: "https://www.france-education-international.fr/",
            verifiedOn: V,
          },
        ],
      },
      timing: {
        body:
          "The Campus France attestation is the piece with a deadline attached to it. The attestation is issued on the basis of a language test, and French universities and the visa both want it, so the language test has to happen early enough for the attestation to exist before you apply.",
        points: [
          "The EEF attestation is valid for one year from its issue date and is a condition of the student visa application. It is normally issued shortly after you sit a recognised test and pay the fee.",
          "Most French master's programmes have a main application round in December or January for an autumn start, with a second round in April or May. The language test usually has to precede the application.",
          "For a French-taught programme, the TCF and DALF are less frequently scheduled than IELTS, so a June or July sitting can be the last one before the autumn intake and the next one may be in September.",
          "The attestation fee is separate from the test fee. You pay for the test, then for the attestation, and both need to be in the budget.",
        ],
        callout: {
          tone: "watch",
          title: "The test is not the attestation",
          body: "Campus France's Études en France attestation is what the visa and the university ask for, and you only get it after sitting a recognised language exam and paying the attestation fee. A student with a good TCF score and no attestation is not finished, and the attestation cannot be issued retroactively after the deadline.",
        },
      },
      inside: {
        body:
          "The English tests are the same instruments as everywhere. The French tests are a different shape, and the one that surprises people is the TCF's level system, which is expressed as a band and a score rather than a band alone.",
        subsections: [
          {
            title: "IELTS Academic",
            what: "Listening, Reading, Writing and Speaking, banded 0–9 in half steps.",
            format: "About 2 hours 45 minutes, identical structure to other destinations.",
            score: "Per-skill bands and a rounded overall.",
            topics: [
              "Academic and general-interest reading passages.",
              "Writing Task 1 and Task 2, and three parts of speaking.",
            ],
            tip: "Check whether your French programme accepts IELTS General for admission, not only Academic. Some do, and it is an easier paper.",
          },
          {
            title: "TOEFL iBT",
            what: "Reading, Listening, Speaking and Writing, 0–120 in half points, or 1–6 from 21 January 2026.",
            format: "About 2.5 hours, computer or paper.",
            score: "0–120 overall plus four section scores, and 1–6 from 21 January 2026.",
            topics: [
              "Campus conversations and academic lectures.",
              "Six speaking tasks and two writing tasks.",
            ],
            tip: "If a French programme publishes 'TOEFL 90', it wants the 0–120 scale. A 1–6 result will be queried until you say which scale your test used.",
          },
          {
            title: "TCF",
            what: "A French proficiency test with six graded levels, from level 1 to level 6, each with a score band.",
            format: "Written and oral sections, administered on computer at approved centres, in about three hours including the written components and a short individual oral interview.",
            score: "Expressed as a level (1–6) and a band, with level 2 equivalent to B2 and level 3 to C1. The written sections and the oral interview are scored separately and both must reach the required level.",
            topics: [
              "Reading comprehension, grammar and vocabulary in French.",
              "Written expression, and a short oral interview on a familiar topic.",
            ],
            tip: "The oral interview is a real interview, and it is where most candidates who have studied alone are caught out. Practise speaking about yourself, your studies and your project out loud, in French, in under two minutes.",
          },
        ],
      },
      roadmap: {
        body:
          "If you are sitting an English test, the plan is the standard twelve weeks. If you are sitting a French test, the plan is the same shape but slower, because the vocabulary load is bigger and the practice material is thinner — and because TCF sittings are less frequent.",
        roadmap: [
          {
            label: "Weeks 1–3",
            title: "Settle the language and the level",
            goal: "Know which language, which certificate, and which level.",
            hours: "6–8 hours a week",
            focus: [
              "Confirm the language of instruction for each programme, and the exact certificate it lists. Write down the required level, not just 'French'.",
              "Check the EEF attestation requirements and the fee, and the deadline for applying for it.",
              "Take a placement test or a full official practice paper. For French, a TCF practice test is available from France Éducation International.",
            ],
            checkpoint: "Certificate, level, and attestation route are all decided.",
          },
          {
            label: "Weeks 4–8",
            title: "Build the base",
            goal: "Reach the required level in the core skills.",
            hours: "9–12 hours a week",
            focus: [
              "For French: vocabulary in context, and grammar as structure rather than rules. A structured course or a tutor beats self-study at this stage.",
              "For English: the standard four-skill split, weakest first, with listening daily.",
              "One full practice test every two weeks, scored per skill.",
              "Practise the speaking section out loud and recorded. For TCF, practise the oral interview as an interview.",
            ],
            checkpoint: "Practice scores are at or near the required level on the weakest skill.",
          },
          {
            label: "Weeks 9–12",
            title: "Sharpen and rehearse",
            goal: "Consistency under exam conditions.",
            hours: "8–10 hours a week",
            focus: [
              "One full mock a week in the real format, on the real schedule.",
              "For TCF, book the actual test date early — centres offer a limited number of sittings.",
              "Review every error from the last mock. This is the highest-value part of the plan.",
            ],
            checkpoint: "Two consecutive mocks at or above the required level.",
          },
          {
            label: "Weeks 13–16",
            title: "Sit, attest, deliver",
            goal: "The certificate, the attestation, and the result in the right hands.",
            hours: "4–6 hours a week",
            focus: [
              "Sit the test, and book the Campus France attestation for straight afterwards — it is issued on the basis of the result.",
              "Send the electronic result to the university. For the attestation, Campus France reads the result from the test body.",
              "Check the attestation's validity date against your application date, and apply for the attestation as soon as you have the result.",
            ],
            checkpoint: "Test sat, result received, attestation requested, and the university has the score.",
          },
        ],
      },
      resources: {
        body:
          "France publishes more of its own material than most countries, and Campus France's site carries the requirements that everything else is measured against.",
        resources: [
          {
            title: "Campus France",
            kind: "official",
            url: "https://www.campusfrance.org/en",
            why: "The official body for French study, and the place the attestation, the language requirements and the accepted certificates are all published. Start here and work outwards.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "France Éducation International — TCF",
            kind: "official",
            url: "https://www.france-education-international.fr/",
            why: "The official TCF site, with the level structure, the practice tests and the list of centres worldwide. If you are sitting the TCF, this is the primary source.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "RFI — Réussir le Français pour les Étudiants",
            kind: "site",
            url: "https://www.rfi.fr/cours/",
            why: "Free French lessons and exercises from RFI, organised by level and by grammar point. The best free structured French practice for the vocabulary and grammar load the TCF tests.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "TV5Monde — TCF practice tests",
            kind: "practice",
            url: "https://www.tv5monde.com/tcf",
            why: "Free TCF preparation with sample papers in the real format. The single most useful thing for candidates who have never seen the paper.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "IELTS free practice tests",
            kind: "practice",
            url: "https://ielts.org/take-a-test/preparation-resources",
            why: "Free official practice for the English route, with audio.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "IELTS Liz",
            kind: "video",
            url: "https://ieltsliz.com/",
            why: "The clearest free teaching for Writing and Speaking by task type.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "E2 IELTS",
            kind: "video",
            url: "https://e2ielts.com/",
            why: "Free structured courses for all four skills, with band descriptors explained plainly.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official French sources and the clearest free teaching we found for this checkpoint. We take no payment for placement.",
        },
      },
    },
  },

  "sg-english": {
    archetype: "language-test",
    intro:
      "Singapore's universities are consistent and the requirements are published in one place, which makes this one of the easiest language checkpoints to plan. The catch is that some programmes ask well above the common minimum, and the research-degree bar is noticeably higher than the coursework bar.",
    sections: {
      exams: {
        body:
          "NUS, NTU, SMU and SIT all publish minimum English requirements. NUS states the common minimum for coursework as TOEFL iBT 85, or IELTS 6.0, with higher requirements for research degrees and for the business and law schools. Most programmes will also accept PTE Academic, and a few accept the Duolingo English Test for coursework admission.",
        points: [
          "Coursework and research degrees are different worlds. A research degree in Singapore typically asks TOEFL 100 or IELTS 7.0, and the difference is not small.",
          "Professional schools — business, law, medicine, dentistry — set their own and they are often above the faculty default. Check the programme, not the university.",
          "The Duolingo English Test is accepted by some Singapore universities for admission, but it is not accepted for Singapore's Student Pass, which is a separate requirement handled by the Immigration and Checkpoints Authority. That is a distinction worth being clear about.",
          "There is no government English test requirement for the Student Pass in the way there is in the UK or Canada. The ICA does its own checks.",
        ],
        exams: [
          {
            name: "TOEFL iBT",
            accepted: true,
            requiredScore: "NUS states 85 for coursework, 100 for research degrees. Other universities publish comparable or slightly different figures; business and law are typically higher.",
            note: "From 21 January 2026 the test reports on a 1–6 scale. A published '85' means the 0–120 scale, so confirm the scale when you quote your result.",
            validity: "2 years",
            howToBook: "Direct with ETS, at test centres in Singapore and worldwide.",
            leadTime: "About 4 days for results on the computer version, 8 on paper. Book 6–8 weeks before the application deadline.",
            cost: "Around US$255–290, varies.",
            url: "https://www.ets.org/toefl",
            verifiedOn: V,
          },
          {
            name: "IELTS Academic",
            accepted: true,
            requiredScore: "Commonly 6.0 for coursework and 7.0 for research degrees, with no band below 5.5 or 6.0 depending on the programme.",
            note: "Academic, not General.",
            validity: "2 years",
            howToBook: "With the British Council in Singapore, at a test centre or computer-delivered.",
            leadTime: "3–5 working days computer-delivered, 11–13 days on paper.",
            cost: "Around S$280–310, varies.",
            url: "https://ielts.org/take-a-test/test-types/ielts-academic-test",
            verifiedOn: V,
          },
          {
            name: "PTE Academic",
            accepted: true,
            requiredScore: "Programme-specific, commonly stated as a band of 50 or 53 on the 10–90 scale.",
            note: "Accepted by the major universities for coursework admission, with fast results and frequent sittings.",
            validity: "2 years",
            howToBook: "Direct with Pearson.",
            leadTime: "About 2 business days for results.",
            cost: "Around S$290–340.",
            url: "https://www.pearsonpte.com/",
            verifiedOn: V,
          },
        ],
      },
      timing: {
        body:
          "Singapore intakes are unusually few — mostly one or two a year — and the international application windows are earlier than the local ones, which is where the pressure comes from.",
        points: [
          "August and January intakes for coursework; research degrees usually have one intake a year. Check the current application window, because Singapore programmes often close international applications well before the published deadline for local applicants.",
          "Most programmes want the English result with the application rather than afterwards, and the requirement is published in the admissions guide, so the test date is set by the application window, not by you.",
          "If you are applying for a research degree, the English test is the least of the preparation. The research proposal is what takes the time, and it needs a supervisor's input.",
        ],
        callout: {
          tone: "watch",
          title: "The Student Pass is a separate thing",
          body: "Admission to the university and the Singapore Student Pass are different processes with different requirements. A test accepted for university admission is not automatically accepted for the Student Pass. Check the ICA's current list before you assume one test covers both.",
        },
      },
      inside: {
        body:
          "The four-skill structure is the same as everywhere else. What is different in Singapore is how tightly the published minimum and the published per-skill floor line up with what programmes actually look for, so reading the requirement carefully is worth real time.",
        subsections: [
          {
            title: "TOEFL iBT",
            what: "Reading, Listening, Speaking and Writing, 0–120 in half points, or 1–6 from 21 January 2026.",
            format: "About 2.5 hours. Reading 54 questions in 60 minutes. Listening 42–50 questions in 60 minutes. Speaking 6 tasks in 17 minutes. Writing 50 minutes across two tasks.",
            score: "0–120 overall plus four section scores, and 1–6 from 21 January 2026.",
            topics: [
              "Campus conversations and academic lectures.",
              "Six short speaking tasks, then one integrated and one independent writing task.",
            ],
            tip: "Singapore programmes commonly publish a per-section floor as well as the total. Meeting the total while missing a section floor is the usual reason a strong-looking application is rejected.",
          },
          {
            title: "IELTS Academic",
            what: "Listening, Reading, Writing and Speaking, banded 0–9 in half steps.",
            format: "About 2 hours 45 minutes.",
            score: "Per-skill bands, and a rounded overall.",
            topics: [
              "Academic and general-interest reading passages.",
              "Writing Task 1 and Task 2, and three parts of speaking.",
            ],
            tip: "NUS's stated structure is an overall band plus a floor in each component. Read both numbers and target the floor first.",
          },
          {
            title: "PTE Academic",
            what: "Speaking & Writing, Reading and Listening, scored 10–90.",
            format: "About 2 hours, computer-delivered only.",
            score: "10–90 overall with a Communicative Ability score per skill.",
            topics: [
              "Read aloud, repeat sentence, describe an image, and a writing task.",
              "Reading with a word count, single-answer multiple choice.",
              "Lectures and conversations, often with a visual.",
            ],
            tip: "Computer-delivered with same-week sittings, which makes it the practical choice if your first sitting goes badly and the application window is close.",
          },
        ],
      },
      roadmap: {
        body:
          "Twelve weeks, and the acceleration you need depends entirely on which band you are starting from. The gap between 5.5 and 6.5 IELTS is a different project from the gap between 6.5 and 7.5, and Singapore's research-degree requirement sits in the second category.",
        roadmap: [
          {
            label: "Weeks 1–2",
            title: "Target the exact number",
            goal: "Know the overall and every per-skill floor, and the date the result must be in.",
            hours: "5–7 hours a week",
            focus: [
              "Read the English requirement in the current admissions guide for each programme, and note the overall and the per-component floor.",
              "Confirm the international application window, which is often earlier than the general deadline.",
              "Take one official practice test and score all four skills.",
            ],
            checkpoint: "You have a written target per skill and a hard date for the result.",
          },
          {
            label: "Weeks 3–6",
            title: "Fix the weakest skill",
            goal: "Every skill at or above the floor.",
            hours: "8–10 hours a week",
            focus: [
              "Three weeks on the lowest skill only.",
              "Listening: daily shadowing. Reading: question-first timing. Writing: one timed task a week, marked by a person. Speaking: recorded, reviewed, full length.",
              "Read the official band descriptor for your target, and write to it.",
            ],
            checkpoint: "No skill below the floor on a fresh practice test.",
          },
          {
            label: "Weeks 7–10",
            title: "Lift the overall",
            goal: "The total is at or above the requirement, with the floor intact.",
            hours: "8–10 hours a week",
            focus: [
              "Work the second-weakest skill. Keep one set a week on the first.",
              "One full test a week from week 8, in the real format.",
              "Practise speaking part 3 on the abstract topics Singapore tends to use: technology, urban life, education, the environment.",
            ],
            checkpoint: "Your total is at or above the requirement on a full mock.",
          },
          {
            label: "Weeks 11–12",
            title: "Book and deliver",
            goal: "The result at the admissions office before the window closes.",
            hours: "4–6 hours a week",
            focus: [
              "Book the test at least 8 weeks before the international application deadline, and check the delivery route — most programmes want the official electronic report sent to them.",
              "Do not reschedule for a better feeling. The mock is the evidence.",
              "If you are also applying for the Student Pass, check the ICA's accepted-test list separately and plan a second test if needed.",
            ],
            checkpoint: "Test booked, delivery route confirmed, and the result date falls before the application window shuts.",
          },
        ],
      },
      resources: {
        body:
          "Singapore's universities publish their own requirements in their own admissions guides, and the free official practice material from the test bodies covers the syllabus well.",
        resources: [
          {
            title: "NUS graduate admissions — English requirements",
            kind: "official",
            url: "https://nus.edu.sg/grad/admissions/international-qualifications",
            why: "The published requirement for coursework and for research degrees, in the format the admissions office actually applies. The clearest example of how a well-published requirement should look.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "TOEFL TestReady",
            kind: "practice",
            url: "https://www.ets.org/toefl/test-ready",
            why: "ETS's free preparation with full practice tests and a diagnostic, and the place to confirm the current scale for your test date.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "IELTS free practice tests",
            kind: "practice",
            url: "https://ielts.org/take-a-test/preparation-resources",
            why: "Free official practice for the Academic paper, with audio.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "IELTS Liz",
            kind: "video",
            url: "https://ieltsliz.com/",
            why: "The clearest free teaching for Writing and Speaking by task type.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "E2 IELTS",
            kind: "video",
            url: "https://e2ielts.com/",
            why: "Free structured courses for all four skills, with band descriptors explained plainly.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "PTE preparation resources",
            kind: "practice",
            url: "https://www.pearsonpte.com/preparation-resources",
            why: "Pearson's official practice and scoring guides, including how points are awarded for each task type.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the published requirements and the clearest free teaching for this checkpoint. We take no payment for placement.",
        },
      },
    },
  },
};

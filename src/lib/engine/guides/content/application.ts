import type { GuideContent } from "../types";

const V = "2026-10-20";

/*
 * The application submission dossier.
 *
 * This is the checkpoint where everything else becomes irreversible. Before it,
 * an out-of-place test result or a slow referee is an annoyance. After it, they
 * are a rejection with a date on it.
 *
 * Three things are true in every destination, and this dossier keeps saying
 * them in each country's own terms:
 *
 *   1. THERE IS NO NATIONAL FORM. The US runs one portal per programme, the UK
 *      runs a national list for taught master's and separate systems for
 *      research degrees, Canada runs a university portal plus a departmental
 *      layer plus a funding application, Australia runs one system per
 *      provider, Germany runs a central service that only some programmes
 *      use, France runs a national platform that covers only part of the
 *      sector, and Singapore runs one system per university. The authority on
 *      what your application needs is the programme's own admissions page.
 *   2. THE DEADLINE IS NOT THE DATE YOU THINK. It is the earliest date on
 *      which any of your applications closes, and often a visa-side or
 *      funding-side date that sits months before the admission deadline. UCL
 *      closed its 2026/27 Computer Science MSc to visa applicants on 27 March
 *      2026, five months before the term began.
 *   3. INCOMPLETE IS REJECTED, NOT PENDING. Most systems will not read a file
 *      with a document missing from it. The recommendations, the transcripts
 *      and the fee all have to land before the deadline, not near it.
 */
export const APPLICATION: Record<string, GuideContent> = {
  "us-app-submit": {
    archetype: "application",
    intro:
      "There is no US application system. Every programme runs its own portal, sets its own fee and closes on its own date, and the dates cluster in a narrow window at the start of December. Stanford EE published 1 December 2026 for Autumn 2027-28, and Stanford CS states that all deadlines are final and no late applications are accepted. The application is finished when it is submitted, and the last few days are where good applications die.",
    sections: {
      routes: {
        body:
          "US graduate applications come in three shapes, and every programme you are looking at will name one of them on its own admissions page. The direct portal is the most common: the programme runs its own system, you create an account on that domain, and that system is the whole application. The Common App is a shared form that a growing number of graduate schools accept for the standard sections, though the school usually still asks you to upload transcripts, essays and recommendations inside its own system rather than through the shared one. The third is a consortium service, where a group of programmes share a single form and you choose the school inside it. In all three cases the school's own page is the authority, and the reason to check the domain is that two of these look identical until you read who actually receives your fee.",
        points: [
          "A school that accepts the Common App for the form will almost always still have its own requirements: transcripts, a statement of purpose, programme-specific essays, and a recommendation system. Treat the Common App as the beginning of the application, not the end of it.",
          "Programmes that ask for a statement of purpose have their own character or word cap, and they are not the same across schools. Stanford CS caps the statement of purpose at 8,000 characters including spaces, which is roughly 1,300 to 1,500 words. Draft to length, not to a target word count you invented.",
          "Application fees are per school, charged online, and generally not refundable. Some programmes waive them automatically if you have visited, if you are applying for a scholarship, or if you are a first-generation applicant. The waiver rule is on the programme's fee page and it is worth reading before you pay.",
          "Some US CS programmes use one application for several programmes inside a single department, so check whether a single submission covers two of your shortlisted courses. When it does not, you are paying and writing twice.",
          "A separate and much earlier application exists for funding in some departments, and a separate research-degree route with its own requirements and its own panel. Neither is the master's application, and both get missed if you only watch the main deadline.",
        ],
        callout: {
          tone: "watch",
          title: "Decide which portal before you write anything",
          body: "The essay prompts, the character limits and the list of required uploads are set by the portal, and some of them change between portals for the same programme. Write your statement against one school's prompts first, then adapt. If you draft in a word processor with no cap in mind, you will discover the cap in the upload box, which is the worst possible moment to discover it.",
        },
      },
      timeline: {
        body:
          "Work backwards from the earliest deadline among your applications, and treat that as the real deadline for the whole effort. A December 1 deadline for a selective programme means the application is finished in late November, which means the statement of purpose is finished in October, which means the referees were approached in August or September. The plan below is built for that shape, and it compresses or stretches with the dates your own programmes publish.",
        roadmap: [
          {
            label: "August to September",
            title: "Lock the list and open the portals",
            goal: "Know exactly which portal, which deadline and which document list each application has.",
            hours: "6 to 8 hours a week",
            focus: [
              "Write every shortlisted programme's name next to its deadline, its fee, its essay prompts and its required documents, in one table. This table is the plan; everything else is a detail of it.",
              "Open the portal for each one and create the account. Account creation is trivial in the week before a deadline and a queue in the week of it.",
              "Check the fee and the fee waiver on each portal, and decide which applications you are paying for.",
              "Identify the one application whose deadline is earliest and treat it as the anchor for the entire schedule.",
            ],
            checkpoint: "One table, one row per programme, with a hard date in every row and a named portal in every row.",
          },
          {
            label: "September to October",
            title: "Draft against the prompts, not against a memory",
            goal: "A complete, capped, programme-specific draft for the anchor application.",
            hours: "8 to 10 hours a week",
            focus: [
              "Draft the statement of purpose against the exact prompt on the anchor programme's page, and count characters as you go if there is a cap.",
              "Write the programme-specific essay for the anchor programme, naming the courses and the faculty it actually names.",
              "Ask your referees now, with a deadline that is at least three weeks before the earliest submission date. This is the step that cannot be compressed later.",
              "Order official transcripts from every issuing institution now. Delivery takes weeks and it is entirely outside your control.",
            ],
            checkpoint: "A full draft exists for the anchor programme, inside its cap, and every referee has been asked in writing.",
          },
          {
            label: "November",
            title: "Submit the completed ones early",
            goal: "Every application that is genuinely finished is in, and the remaining work is visible.",
            hours: "6 to 8 hours a week",
            focus: [
              "Submit each application that is complete, even if it is not your first choice. Waiting for an ideal date is a strategy that loses files in the last week.",
              "For anything still open, list exactly what is missing. Usually it is one recommendation, one transcript, or a fee.",
              "Chase the missing item directly with the person or the issuing institution, not through a general admissions inbox. A named email to a named office gets an answer; a general one does not.",
              "Keep the confirmation of every submission, every payment and every email to admissions. You will need the reference numbers.",
            ],
            checkpoint: "All complete applications submitted, and every outstanding item on a list with a name attached to it.",
          },
          {
            label: "Final 48 hours",
            title: "Close the last gaps, then stop",
            goal: "Everything in, nothing half-finished, and no panic.",
            hours: "3 to 4 hours a week",
            focus: [
              "Submit each application at least 48 hours before its own published deadline, which is the working rule in this plan. The reason is not superstition: portals slow down, payments fail, and a fee charged at 23:50 on the day is a fee that has not cleared.",
              "Upload everything in one sitting per application. A session you come back to is a session where a document goes missing.",
              "Verify your name spelling against your passport character for character, because that is how an application becomes incomplete at the visa stage months later.",
              "Save the submitted reference for every application. That is the only thing you have when the results email arrives.",
            ],
            checkpoint: "Every application submitted, every receipt saved, and no file left in a half-finished state.",
          },
        ],
        callout: {
          tone: "watch",
          title: "Do not expect a December deadline school to read a late file",
          body: "Stanford CS states that all deadlines are final and that late applications are not accepted. That is not a warning about competitiveness, it is a statement that the file is not read. A strong application submitted after the deadline scores the same as no application: zero.",
        },
      },
      checklist: {
        body:
          "Work in this order, and do not start the essay until the document list is settled, because the document list is what the essay has to answer. The order below follows the way a US file actually gets built: the things you control first, the things other people control second, and the things that arrive by post last.",
        points: [
          "Account and programme selection. The correct portal, the correct degree, the correct intake, and the correct application fee. Choosing the wrong intake is the most common self-inflicted error and it cannot be corrected after submission.",
          "Statement of purpose, written to the programme's own prompt and inside its own cap. One version per programme.",
          "Programme-specific essays. These are the ones that name courses and faculty, and each programme's list is different.",
          "Any short additional information the programme asks for: a research statement, a diversity statement, a work-experience explanation, a publication list. Optional means optional, but a blank field is sometimes read as never having done it.",
          "CV or resume, in the academic CV conventions that programme expects. Publications, coursework, projects and teaching, not a marketing resume.",
          "Unofficial transcripts for every degree, uploaded into the portal as PDFs. The sealed official ones are usually requested only after an offer, but order them now because delivery is slow and outside your control.",
          "Certified English translations of any transcript that is not in English, and of any document the programme asks to see in translation.",
          "Degree evidence: a certificate, a provisional certificate, or a letter from your current institution stating exactly when you will graduate. The programme's rule on graduating-by dates is its own.",
          "English test result, and the delivery route. Most US programmes will not read a score from a PDF you upload. They want the official electronic report sent straight from the test body to the institution, which takes days.",
          "GRE scores, only where the programme actually requires them. There is no US-wide GRE rule for master's. Stanford CS states that GRE scores are not required and not considered for MS applicants, while other CS programmes still require them, so decide per programme and do not send scores to programmes that will not read them.",
          "Two or three recommendations, submitted through the programme's own online recommendation system. Referees should never be emailing you a loose document, and the rule is the same at every school that has one.",
          "Application fee, paid online, with the receipt kept.",
          "Final checks: your name matches your passport exactly, your programme and intake are right, every required box is filled, and you have saved the submission reference.",
        ],
      },
      essays: {
        body:
          "US CS master's applications are essay-heavy, and the essays are not asking the same thing as each other. The statement of purpose asks who you are as a researcher. The programme-specific essay asks why this programme. The additional information box asks whatever the programme wants it to ask. Students who write one good paragraph and paste it into all three lose the two that are actually being marked.",
        subsections: [
          {
            title: "The statement of purpose",
            what: "The long one. Your academic trajectory in narrative form, and the reason the admissions committee should believe you can do this specific programme.",
            format: "Character-capped rather than word-capped at many programmes. Stanford CS caps it at 8,000 characters including spaces, which is roughly 1,300 to 1,500 words. Other programmes publish a word limit instead. Check the programme's own limit and draft to it.",
            score: "Read by a committee. The score comes from evidence and fit, not from enthusiasm, and it is the essay most likely to be read in full if your file is competitive.",
            topics: [
              "The technical through-line: the one problem area your work has circled, and the two or three projects that show it. One narrative beats a catalogue.",
              "Evidence of ability: what you built, what broke, what you measured, what you would do differently. Specifics are what separate a strong statement from a warm one.",
              "Why now, and why this programme: a concrete reason for applying to this school rather than a general claim that you are passionate about the subject.",
              "What you want to do afterwards, in one or two sentences. Enough to show you have a direction, not so much that it reads as a career plan you wrote for the form.",
            ],
            tip: "Write the through-line sentence first and put it at the top of your notes. If you cannot write one sentence that names your actual technical interest, the essay is going to turn into a list, and a list is what most applicants submit.",
          },
          {
            title: "Programme-specific essays",
            what: "The short ones, usually a few hundred words each, and different at every school.",
            format: "Usually a word limit published on the programme's page. Some programmes use multiple prompts in a single form, and some use dropdown questions with a text box.",
            score: "Read faster and more sceptically than the statement of purpose, and often by a different reader. A generic answer here is one of the most visible weaknesses in an otherwise strong file.",
            topics: [
              "Why this programme: name the specific courses, the group, or the faculty member, and say what you would do there that you could not do elsewhere. Naming a course you have not checked the contents of is worse than not naming it.",
              "Research interests, where asked: the questions you want to work on, in enough detail that a researcher recognises a real question.",
              "Work experience and its link to the degree, where asked. Tie the job to the field, not to your character.",
              "Challenges, context, or background, where asked. The prompt usually says what kind of answer it wants.",
            ],
            tip: "Keep a per-programme note of the courses, the faculty and the group names, and write each answer from that note. Copying a generic answer and swapping the school name is visible in about ten seconds.",
          },
          {
            title: "The research statement and the additional information box",
            what: "A short research plan at programmes that ask for one, and a free-text space that catches everything the fixed questions did not.",
            format: "Usually a page or less, sometimes with a stated limit. The free-text box usually has a character cap that is generous but not unlimited.",
            score: "Often read last, when a committee is tired. It is also where a candid and specific note about a career break, a non-traditional background or a research gap gets read properly.",
            topics: [
              "A research statement: the question, why it matters, and the first year of method. Not a literature review.",
              "Context worth explaining: a gap in your transcript, a career change, a health or family circumstance, a non-STEM first degree. State it plainly and move on. Committees read hundreds of these and they are not looking for a reason to reject you for having one.",
              "Anything else the programme asks: a publication list, a code sample, a portfolio, a statement about a specific requirement you have not met.",
            ],
            tip: "Never write anything into a free-text box that you would not put in front of a reader. It is emailed, forwarded and stored, and it is the box that gets quoted back to you if something goes wrong later.",
          },
        ],
      },
      traps: {
        body:
          "US applications are rejected in a small number of predictable ways, and almost none of them are about the quality of the essay. They are about completeness, about the wrong date, and about a document that arrived from a third party after the portal had already closed.",
        points: [
          "A missing recommendation makes the file incomplete, and an incomplete file is not read. This is the most common avoidable rejection, and it is entirely outside your control on the day it happens.",
          "Uploading a PDF of your test score instead of having the official report sent to the institution. The admissions office will not convert a screenshot into a score report. Check the delivery route on the programme's page before you sit the test, not after.",
          "Submitting at 23:50 on the deadline, or after it. A payment that has not cleared on the last day is a payment that has not been made.",
          "A name spelling that does not match your passport character for character. It looks trivial and it becomes a visa problem months later, when the university issues a Form I-20 in the wrong name.",
          "Sending a statement of purpose that is really a CV in prose, or a CV that is really a statement of purpose. The statement of purpose argues; the CV lists. Mixing them makes both useless.",
          "The same statement of purpose for every programme, with only the school name changed. It is the easiest thing in the file to spot, because the only difference between the versions is the name you pasted into the first line.",
          "Uploading a transcript in a language the admissions office does not read, without the certified translation the programme asked for.",
          "Applying to the wrong term. Next intake and the intake you were planning are different, and a December 1 deadline is often for the following autumn rather than the one that looks closest.",
          "Sending GRE scores to programmes that do not read them. It is not a rejection reason, but it is wasted money and, on some programmes, a signal that you did not read the requirements.",
          "Paying a fee for a programme you are not eligible for, because you read the deadline but not the degree requirements.",
        ],
        callout: {
          tone: "watch",
          title: "Incomplete is not pending",
          body: "US admissions offices do not queue a file that is missing a document. They read what is there, and a file with an outstanding recommendation is a file assessed without your strongest evidence. Everything on the checklist has to be in the portal before the deadline, and the people who send you those documents need to know that date, in writing, at least three weeks before it.",
        },
      },
      resources: {
        body:
          "Everything below is the programme's or the test body's own material. There is no template pack that will write a better statement of purpose than three drafts of your own, and no service that can make an incomplete file complete.",
        resources: [
          {
            title: "Stanford EE MS admissions FAQ",
            kind: "official",
            url: "https://ee.stanford.edu/admissions/ms/faq",
            why: "The source this checkpoint is filed under. It is the programme's own account of its application process, including the published deadline this plan is built around, so it is the right first place to check what your own programme does.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Stanford CS master's admissions FAQ",
            kind: "official",
            url: "https://www.cs.stanford.edu/admissions/masters-admissions-frequently-asked-questions",
            why: "A well-published statement of what a US CS master's application actually contains, including the statement of purpose character cap and the position on GRE scores. Useful as a model of the level of detail you should expect to find on a good programme page.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Stanford CS graduate application checklists",
            kind: "official",
            url: "https://www.cs.stanford.edu/admissions/graduate-application-checklists",
            why: "The document-by-document list for a US graduate application, which is the same list every other US programme has in a different order. Reading it before you start tells you what to order and from whom.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "The Common App",
            kind: "official",
            url: "https://www.commonapp.org/",
            why: "The shared application form that a growing number of US graduate schools accept, and the place the actual essay prompts and their character limits are published. If a programme accepts it, this is where you read the prompts before you draft.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Berkeley Graduate Division: how to apply",
            kind: "official",
            url: "https://grad.berkeley.edu/admissions/apply/",
            why: "A second real example of a US graduate application page, from a programme that runs its own portal. Comparing two of them is the fastest way to learn which parts of the process are standard and which are local.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Stanford Graduate Admissions",
            kind: "official",
            url: "https://gradadmissions.stanford.edu/",
            why: "The central admissions office for one of the programmes with the earliest deadlines, and the best example of a published application timeline with real dates rather than a general deadline.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ETS TOEFL",
            kind: "official",
            url: "https://www.ets.org/toefl",
            why: "The official registration and score delivery system. Most US programmes need the electronic report sent to the institution, and this is where you set the recipients, so the score is not sitting in your inbox when the portal wants it.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GRE registration",
            kind: "official",
            url: "https://www.grecentral.org/",
            why: "The official ETS registration system for the GRE, for the programmes that actually require it. Check your programme's own requirement first: there is no US-wide GRE rule for master's, and some CS programmes do not look at the score at all.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the programmes' own pages and the test bodies' own systems, which is where the facts actually live. We take no payment for placement, and we do not take payment for anything. If a service offers to write or submit your application for a fee, that is not a shortcut and it is not us.",
        },
      },
    },
  },

  "gb-app-submit": {
    archetype: "application",
    intro:
      "The UK application looks central and behaves locally. UCAS runs the form and the list, and every university decides its own deadlines, its own reference rules and its own fees, and many close to visa-dependent applicants months before they close to everyone else. UCL closed its 2026/27 Computer Science MSc to visa applicants on 27 March 2026, five months before the term began. For a September 2027 start you are really working to a March 2027 cut-off.",
    sections: {
      routes: {
        body:
          "There are two real routes, and one of them is not available to everyone. UCAS is the national route for taught postgraduate courses, and it is a single application that carries your choices, your references and your transcript to every university on the list in one submission. Direct application is the route for research degrees, for professional courses that run their own admissions process, and for some courses that have chosen not to list on UCAS at all. Universities also set aside places for direct applicants in some cases, which is exactly the kind of detail that has to be read on the course page rather than assumed.",
        points: [
          "UCAS is a list, not a form. You choose the courses, you write one personal statement for the whole list, and each course can ask its own supplementary question in the options section of the form. A separate course-specific personal statement is only required where the course asks for one, and some do.",
          "UCAS caps how many courses an applicant can choose, and the cap for the current cycle is published on UCAS. Check it before you build a shortlist, because a shortlist longer than the cap is a shortlist you cannot submit.",
          "Research degrees and professional courses usually run their own systems with their own forms, their own interview rounds and their own deadlines, which are often much earlier than the taught deadlines. A research application in January is normal in the UK. A taught application in January is not.",
          "The visa-dependent deadline is a separate, earlier date on the same course page. UCL's Computer Science MSc published a visa applicant deadline of 27 March 2026 for a 2026/27 entry, and the course closed to visa applicants on that date while remaining open to others.",
          "Some universities charge an application processing fee for taught master's applications, and the fee is per course rather than per university. UCL charges one for several of its taught master's. Pay it with the application; a fee unpaid at the deadline is an application that was never made.",
        ],
        callout: {
          tone: "watch",
          title: "The visa deadline is a different deadline",
          body: "Universities that are full, or that manage the size of their international cohort, close to visa applicants early. If you are relying on a student visa, the early date is your deadline even though the course page also shows a later general date. Missing it does not put you on a waiting list. It puts you on a list that does not exist.",
        },
      },
      timeline: {
        body:
          "The UK calendar runs backwards from the start date in a way that surprises people used to a single deadline. A September 2027 course has a December to March window, and inside that window there is an earlier visa-dependent date, a later general date, and a separate reference deadline. Every course is different, and the plan below is built around the shape of the cycle rather than around a date.",
        roadmap: [
          {
            label: "8 to 10 months before term",
            title: "Build the course list and read the deadlines",
            goal: "One list of courses, each with its own dates, fee and reference requirement.",
            hours: "5 to 7 hours a week",
            focus: [
              "Write down every course you want, with its visa applicant deadline, its general deadline, its application fee, its reference requirement and its word limits. The visa date and the general date are two separate columns, and the visa one is the one that matters.",
              "Check how many choices the current UCAS cycle allows before you commit to the list.",
              "Check whether each course asks for a personal statement, a course-specific statement, or the standard UCAS statement with supplementary questions. The answer changes how much writing you do.",
              "Check whether your academic history needs anything other than a transcript: an authenticated copy, a translated copy, proof of predicted grades, or a degree certificate that does not exist yet.",
            ],
            checkpoint: "A table with one row per course, and every row carrying a date, a fee and a document list.",
          },
          {
            label: "6 to 8 months before term",
            title: "Ask the referees, and mean it",
            goal: "Referees agreed, briefed, and holding a date comfortably before the deadline.",
            hours: "4 to 6 hours a week",
            focus: [
              "Ask UK-taught supervisors or academics now, and give them a deadline at least six weeks before your earliest application date. A referee asked in month five is a referee who misses the deadline.",
              "Give each referee the course name, the deadline, and a specific reminder of the work you did with them. The reminder is what turns a generic letter into a useful one.",
              "Check whether the university wants the reference on its own form, submitted by the referee directly, or uploaded by you. Institutional forms are more work for the referee and much more likely to be done properly.",
              "Write the personal statement in parallel, but write one version you can adapt, not one version you will send unchanged.",
            ],
            checkpoint: "Every referee has confirmed in writing that they will write, and they know the exact date.",
          },
          {
            label: "3 to 5 months before term",
            title: "Write and adapt the statement",
            goal: "A strong base statement and a course-specific answer for every course on the list.",
            hours: "8 to 10 hours a week",
            focus: [
              "Write the base personal statement. Around 500 words is a reasonable working target for most UK taught master's statements, but the limit is set by the course and it varies, so check the course's own limit and write to that.",
              "Write a distinct supplementary answer for each course, naming the actual modules or the research group. If the course asks for a course-specific statement instead, write that.",
              "Have it read by someone who knows the subject. A family member will tell you it is nice; someone who has marked applications will tell you what they would mark it down for.",
              "Re-check your name, date of birth and qualification details against your passport and your transcript now, not at submission.",
            ],
            checkpoint: "One base statement and one tailored answer per course, all inside their word limits.",
          },
          {
            label: "Final 4 to 6 weeks",
            title: "Submit, and watch the references land",
            goal: "Every application submitted with every document attached, and every reference received.",
            hours: "5 to 7 hours a week",
            focus: [
              "Submit to the visa-dependent courses first, even if they are not your first choice. The early date is the one you can still miss.",
              "Pay the application fee in the same session. UCL charges an application processing fee for several taught master's, and an unpaid fee is an application that was not received.",
              "Upload every supporting document in the same session. Applications with missing documents are not assessed.",
              "Record your submitted reference numbers so you can track them, and check the reference status on each application weekly from the moment you submit.",
              "Contact admissions directly if a reference is overdue and the deadline is close. A named email naming the course and the reference number gets a response.",
            ],
            checkpoint: "All applications submitted with fees paid, all documents attached, and every reference in the system as submitted.",
          },
        ],
        callout: {
          tone: "watch",
          title: "Incomplete applications are not assessed",
          body: "A UK application missing a document is not held and processed later. It is incomplete. Upload the transcript, the reference, the personal statement and the result in the same session you submit, and treat any one of them being missing as the application not existing.",
        },
      },
      checklist: {
        body:
          "The UK file is smaller than the US one, and the order matters because the reference and the transcript are the two items that arrive from other people. Do the parts you control first, then chase the parts you do not.",
        points: [
          "The UCAS account and the choices list. Check the cap on the number of choices for the current cycle before you build the list.",
          "Personal statement, for the whole application. This is the standard UCAS statement unless a course asks for its own.",
          "A course-specific answer in the options section, written separately for every course, naming modules or a research group. Courses publish the exact question in the form.",
          "A course-specific statement, where the course asks for one rather than supplementary questions. Check the course page, because both patterns are in use.",
          "Academic transcripts for every institution that awarded you a degree, uploaded as PDFs. If your institution issues transcripts in a language other than English, a certified English translation is required alongside them.",
          "Degree certificate or a statement from your institution giving your expected award date, if you have not graduated yet. Courses test the award date against their own start date, and the two are often not the same.",
          "English test result, uploaded through UCAS, and the score sent electronically by the test body where the university asks for that. Keep the upload and the electronic report: universities sometimes want one and sometimes the other.",
          "Academic references, with the number required confirmed per course. Some courses want one, some two, and some want a mix of academic and professional referees. Check each course rather than assuming.",
          "The reference itself, on the university's form if it uses one, submitted by the referee through the reference system rather than emailed to you.",
          "Any supporting written material the course asks for, such as a portfolio, a research proposal or a written exercise.",
          "Application fee, paid online with the submission, and the receipt kept.",
          "After submission: the reference number for every application, and the reference status for each one, checked weekly.",
        ],
      },
      essays: {
        body:
          "UK postgraduate applications are not essay-heavy by US standards. There is usually one long piece and one short piece per course, and the short piece is where the tailoring happens. Both are read by people who mark a lot of them, and the shortest distance between a rejected application and an offered one is usually a specific course name in a specific paragraph.",
        subsections: [
          {
            title: "The personal statement",
            what: "One statement for the whole UCAS list, judged on your academic trajectory and your fit with the subject, not on your enthusiasm for it.",
            format: "The limit is set by the course and varies. Around 500 words is a working target for most taught master's statements; check the course's own limit and write to that.",
            score: "Read by admissions tutors and often by the course team. It is a professional read, made quickly, often in batches.",
            topics: [
              "Your academic trajectory: what you studied, and the thread that runs through it. One argument beats a chronology.",
              "Evidence: the project, the dissertation, the course, the placement that proves the claim you are making.",
              "Fit with the discipline: what in your background prepares you for this subject, in the vocabulary of this subject.",
              "Where you want to take it. A direction, not a life plan.",
            ],
            tip: "Write it for the subject, not for the course. One statement serves every course on the list, so it can only argue that you are ready for the discipline. The course-specific part is where you say why this course.",
          },
          {
            title: "The course-specific answer",
            what: "A short answer in the options form, asked separately by every course on your list.",
            format: "Usually a few hundred words, sometimes a short structured response. The prompt is published in the form, and the form tells you whether a word limit exists.",
            score: "Read alongside the personal statement, often by the same person. It is the part that shows you read the course page.",
            topics: [
              "The specific modules you want and why. Naming the module code and one reason is worth more than listing eight module names.",
              "The research group, the lab, or the specialisation, where the course has one.",
              "What you would do with the course, in terms of the work the course is designed to lead to.",
              "A constraint you should raise here, such as a prerequisite you have not taken, so the admissions team sees it from you first.",
            ],
            tip: "A good test: could a marker tell which course this answer was for by reading only the answer? If not, it is a wasted opportunity.",
          },
          {
            title: "Research degrees and written exercises",
            what: "Separate documents for separate routes, and they do not behave like the taught master's statement at all.",
            format: "Research proposals, statements of research interest and written exercises each have their own published expectations, and some are capped hard.",
            score: "Read by academics in the field, and often the first substantive read of your work.",
            topics: [
              "A research proposal or statement of research interest: the question, the gap, the method, the feasibility.",
              "A written exercise or coding task, where the course publishes one. Treat it as an exam with published conditions, because that is what it is.",
              "The application's other free-text fields, which usually want short factual answers rather than prose.",
            ],
            tip: "For research routes, apply early. UK research degrees often recruit on a rolling basis, and a strong proposal sent in October competes against a weaker one sent in January for the same supervisor's time.",
          },
        ],
      },
      traps: {
        body:
          "UK applications fail on a small number of well-known mistakes, and the majority of them are timing or completeness rather than writing. The exceptions are worth learning, because a strong student with a sloppy file is the most common thing that goes wrong.",
        points: [
          "Missing the visa applicant deadline while making the general one. This is the single most common UK application error and it is entirely avoidable: the early date is published on the same page.",
          "One personal statement sent unchanged to every course, with no course-specific answer. On a list of five courses this is read as no interest in five of them.",
          "A supplementary answer that names the course title and the subject and nothing else. The course title is printed on the form the marker is holding.",
          "References that are not submitted. Many UK courses will not consider an application until the reference is in, and the reference deadline is often a short window after the main deadline, published separately.",
          "Uploading documents in a language the university does not read without the certified translation. British universities will not assess a document they cannot read.",
          "A transcript that does not match the qualification you claimed in the form. Universities check the qualification level against the transcript, and a mismatch is treated as a verification problem.",
          "Paying the application fee after the deadline, or paying it in a way that takes days to clear. The fee is part of the application, not an admin task that follows it.",
          "An application that is complete except for one item, which is therefore incomplete. Incomplete files are not assessed, and they are not queued.",
          "Writing a statement of about 800 words for a course that asked for 500, and losing the last paragraph to the limit. Word limits are enforced by the form, and the last paragraph is always the one that goes.",
          "Not saving the reference numbers. When a course queries your application, the reference number is the only thing that makes the conversation quick.",
        ],
        callout: {
          tone: "watch",
          title: "Track the reference separately from the application",
          body: "In the UK the application and the reference are two different objects with two different dates. Submitting on time with an outstanding reference does not put you in a queue. It puts your file in the same category as every other incomplete one, and in a competitive round that is the end of it.",
        },
      },
      resources: {
        body:
          "The UK publishes more of its own guidance than most destinations, and UCAS in particular explains its own form well. Everything below is free and comes from the university, the national service or the government.",
        resources: [
          {
            title: "UCL Computer Science MSc, 2026 entry",
            kind: "official",
            url: "https://www.ucl.ac.uk/prospective-students/graduate/taught-degrees/computer-science-msc-2026",
            why: "The source this checkpoint is filed under, and one of the clearest published examples of a UK course with separate domestic and visa applicant deadlines, a stated application fee and a full document list. Read your own course's page in the same way.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "UCL: how to apply for postgraduate study",
            kind: "official",
            url: "https://www.ucl.ac.uk/study/prospective-students/graduate/how-to-apply",
            why: "A worked example of the UK application process from a university that runs its own reference system, including what a referee is actually asked to do and what the student is responsible for.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "UCAS postgraduate",
            kind: "official",
            url: "https://www.ucas.com/postgraduate",
            why: "The national service for taught postgraduate applications, and the place the current cycle's rules live: how many choices you can make, when the deadlines fall, and how references and results are handled.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "UCAS: how to apply",
            kind: "official",
            url: "https://www.ucas.com/postgraduate/how-to-apply",
            why: "UCAS's own walkthrough of the form, which explains the choices table, the supplementary questions and the reference and result sections better than any summary of them.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Find postgraduate study",
            kind: "official",
            url: "https://find-postgraduate-study.degrees.ac.uk/",
            why: "The government-backed course finder that lists UK postgraduate courses with their entry requirements and application deadlines. Useful for checking a shortlist and for finding courses with a deadline later than you assumed.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Student visa",
            kind: "official",
            url: "https://www.gov.uk/student-visa",
            why: "The Home Office's own page on the student visa, which is the rulebook behind the early visa deadlines universities publish. The visa-side cut-off you saw on the course page is a consequence of this process, not an arbitrary date.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the university's own pages, the national service and the government, which is where the rules and the dates actually are. We take no payment for placement, and we do not take payment for anything. Nobody needs a paid agency to submit a UCAS application for you.",
        },
      },
    },
  },

  "ca-app-submit": {
    archetype: "application",
    intro:
      "A Canadian graduate application is three applications in one: the university's own application, a departmental layer on top of it for some programmes, and a funding application with its own earlier calendar. Toronto's Computer Science department opened applications for September 2027 on 12 November 2026 and required completed applications with all supporting documents by 25 January 2027, while noting that applications may close once departmental targets are met. That last clause is the one to take seriously.",
    sections: {
      routes: {
        body:
          "There is a single route for most applicants, and it runs in three layers. The university layer is the central graduate application portal, where your identity, your transcript, your language result and your references are recorded once. The departmental layer, where a programme runs one, asks the questions only that department can answer, and it is where the research fit is judged. The funding layer is a separate application with a separate deadline, and it is often the one that gets missed, because it closes earlier than the admission deadline and it lives on a different page.",
        points: [
          "The funding application is not a checkbox. Some universities ask for funding interest inside the main application, others run a separate form, and in both cases the deadline is earlier than the admission deadline. Toronto tells international applicants to submit by 1 December 2026 for preference on graduate financial support, which is months before the January admission deadline.",
          "Research master's programmes in Canada usually expect you to have a supervisor before you apply, and some departments will not process an application without one. Contacting the supervisor is part of the application, not a preliminary to it.",
          "Ontario now requires a provincial attestation letter for many study permit applications. That is a later step, not an application step, and the university handles it. Do not let it distort your submission date.",
          "Professional programmes in law, medicine, business and education often run their own admissions processes with their own applications, and they may be earlier than the graduate deadline you are looking at.",
          "Where a university accepts a centralised transcript system, it is often faster than chasing each institution, but the final transcript still has to come directly from the issuer. Check the university's own transcript policy rather than assuming either way.",
        ],
        callout: {
          tone: "watch",
          title: "The departmental layer can close the door",
          body: "Toronto's Computer Science department states that applications may close once departmental targets are met. A programme that closes its intake early does not hold a waiting list for people who applied after the target. The published deadline is a ceiling, not a floor, and the number that matters is the earliest date at which you could have submitted a complete file.",
        },
      },
      timeline: {
        body:
          "The Canadian cycle is early by international standards and it is driven by two things: funding rounds that open first, and a departmental deadline that sits months before term. A September 2027 start at Toronto meant a 12 November 2026 opening, a 25 January 2027 deadline for complete files, and a 1 December 2026 funding date. The plan below is built around that shape.",
        roadmap: [
          {
            label: "6 to 9 months before term",
            title: "Shortlist, contact and check the funding calendar",
            goal: "A list of programmes, a supervisor conversation where one is needed, and every funding deadline in one place.",
            hours: "6 to 8 hours a week",
            focus: [
              "Write each programme's admission deadline, funding deadline and document requirements in one table, with the funding date in its own column. That column is the one that decides your real deadline.",
              "For research programmes, contact the supervisors you want to work with. A supervisor who has agreed to take you removes a whole category of risk from the application.",
              "Check the language requirement for admission and, separately, the requirement for the study permit, because they are different certificates and in the case of IELTS they are different papers.",
              "Request official transcripts from every issuing institution now. Delivery is slow and it is outside your control.",
            ],
            checkpoint: "A table with a funding date and an admission date for every programme, and supervisor conversations started where they are needed.",
          },
          {
            label: "4 to 6 months before term",
            title: "References and the research statement together",
            goal: "Referees committed, and a research statement they can actually read.",
            hours: "8 to 10 hours a week",
            focus: [
              "Ask referees now and give them a deadline at least eight weeks before your admission deadline. Toronto Metropolitan states that applications are only reviewed once all required documents are submitted, including letters of recommendation, so a late letter does not delay your file, it removes it from consideration.",
              "Send referees your CV and your research statement. In a research-centred application, the referee who can read what you are proposing writes a far better letter than one working from memory.",
              "Draft the research statement around a specific question, naming the supervisor and the lab in the opening paragraph.",
              "Submit any funding application whose deadline falls in this window, even before the main application is finished. Funding is assessed on its own timeline.",
            ],
            checkpoint: "Every referee has confirmed in writing, and any funding deadline inside this window has been met.",
          },
          {
            label: "2 to 3 months before term",
            title: "Finish the file and submit it whole",
            goal: "A complete application, submitted with margin before the departmental deadline.",
            hours: "8 to 10 hours a week",
            focus: [
              "Cut the research statement to the programme's stated word or page limit. Every Canadian programme sets its own and the limit is enforced.",
              "Assemble the whole file: statement, CV, transcripts, language result, references, and any departmental form. Upload everything in one session.",
              "Submit each programme's application before its own departmental deadline, and pay the graduate application fee, keeping the receipt.",
              "Save the confirmation number for each submission and check the portal's own status page weekly until the references show as received.",
            ],
            checkpoint: "Every application submitted, paid for and complete, with a saved reference for each.",
          },
          {
            label: "After the deadline",
            title: "Close the loop",
            goal: "No surprises left in the file, and the funding position clear.",
            hours: "3 to 4 hours a week",
            focus: [
              "Check the portal until every reference shows as received. A reference still marked pending on the day the programme finalises its list is a reference that did not arrive in time.",
              "Keep the funding application separate in your records. A funding decision arriving after admission does not retroactively fund you.",
              "Note the date you submitted against each programme, so that when an offer arrives you can tell what was outstanding at the time.",
            ],
            checkpoint: "Every file complete, every funding application decided or pending on its own timeline.",
          },
        ],
      },
      checklist: {
        body:
          "The Canadian file is documentation-heavy and, in a research master's, the research statement is the most important item on it. The order below puts the things that arrive from other people early, because they are the ones that decide whether the file is complete.",
        points: [
          "The central graduate application, completed on the university's own portal: personal details, academic history, and the programme and term you are applying to. Check the term carefully, because a wrong term is a file in the wrong queue.",
          "The departmental application or form, where the programme runs one. It asks the questions the department can only answer, and it is where the research fit is judged.",
          "Statement of academic interest or research statement, written to the programme's own limit, naming the supervisor and the lab in the opening paragraph. Three to five pages is a reasonable working range for many research statements, but the limit is set by the programme and it varies.",
          "A research proposal, where the programme asks for one in addition to the statement. They are different documents with different audiences: the statement argues you are ready, the proposal argues the work is doable.",
          "CV, in the academic format the programme expects: publications, coursework, research, projects, teaching and any relevant industry work.",
          "Official transcripts for every degree, uploaded where required, with certified English translations for anything not in English.",
          "Degree certificate or a letter from your institution confirming your award date, if you have not graduated when you apply.",
          "Language test result for university admission, which is usually IELTS Academic or TOEFL. Remember that the study permit asks for a different test from the same body, usually IELTS General, and that a General score will not satisfy the university's admission requirement.",
          "Two or three letters of recommendation, submitted through the method the university specifies, which may be an online system or sealed letters posted by the institution.",
          "A funding or financial support application, if the university runs one separately, submitted on the funding deadline rather than the admission deadline.",
          "The graduate application fee, paid online, with the receipt.",
          "Final checks: name, date of birth and award date match your passport and your transcript exactly, and the confirmation number for every submission is saved.",
        ],
      },
      essays: {
        body:
          "The Canadian graduate statement is not a personal statement with a different name. It is a research document that happens to include a paragraph about you, and reviewers read it in that frame. A statement that reads like a scholarship application is answering a question the examiner did not ask.",
        subsections: [
          {
            title: "The statement of academic interest",
            what: "The central document. A research narrative that shows you are prepared to do this specific work with this group.",
            format: "Usually a page or two, sometimes three to five, with a stated limit that varies by programme. Cut to the programme's own limit rather than to your own estimate.",
            score: "Read by the admissions committee and often by the potential supervisor, who is looking for a research question they would want you to work on.",
            topics: [
              "The research question, in the opening paragraph, alongside the name of the supervisor or the lab. Concrete and bounded, not a theme.",
              "Why the question matters and where the gap is. This is the paragraph that shows you have read the field, not just the field's titles.",
              "Your approach: the method, the data or system, the feasibility, the first year. A committee reading a plan they believe is impossible is a committee that says no.",
              "Prior preparation: the coursework, the research and the engineering work that makes you the right person to attempt this.",
              "What you will contribute, and what you want to learn. One paragraph, not a manifesto.",
            ],
            tip: "Ask your supervisor, if you have one, whether the question you are proposing is one they would be excited to supervise. A question they find interesting and a question you find interesting are not the same thing, and this is the cheapest fix available.",
          },
          {
            title: "The research proposal",
            what: "A more technical document, asked for by some programmes in addition to the statement.",
            format: "Programme-specific, sometimes with an explicit structure requirement: background, methods, timeline, expected outcomes.",
            score: "Assessed on feasibility and on whether the methods match the question, often by someone who could supervise the work.",
            topics: [
              "Background and related work, kept short enough that the method is not crowded out.",
              "Methods: the system, the dataset, the evaluation, the tools. Specific enough that a reader can tell whether you have done this before.",
              "A timeline with milestones, which tells the reader you have thought about sequencing.",
              "Risks and what you would do about them, which is unusual and reads as senior.",
            ],
            tip: "If you are unsure which document the programme wants, ask admissions in writing. Statement of academic interest and research proposal are used interchangeably by some universities and are genuinely different in others, and a misread here is a whole document wasted.",
          },
          {
            title: "Short-form questions and the departmental form",
            what: "The fixed questions in the portal, and the programme's own form where there is one.",
            format: "Short text boxes, sometimes with a character cap. The departmental form is often where the programme's own questions live.",
            score: "Read quickly, often by the same committee, but a careless answer here colours how the long document is read.",
            topics: [
              "Research interests, in one short paragraph, with a real question in it.",
              "Why this supervisor, this lab, this university. Specific research, not institutional branding.",
              "Career intentions, which Canadian committees genuinely read. Where you will take this and why.",
              "Any research output, publications, or a URL for your code or papers, if you have it.",
            ],
            tip: "Write these after the research statement, not before. They are the short version of an argument you should already have made properly once.",
          },
        ],
      },
      traps: {
        body:
          "Canadian applications are lost in a small number of ways, and the most common is not a weak statement. It is a file that was never complete on the day the programme made its list, and a funding deadline that closed before you were ready.",
        points: [
          "Missing the funding deadline. It is earlier than the admission deadline, it is often on a different page, and missing it usually means no funding consideration at all rather than a later decision.",
          "An incomplete file. Toronto Metropolitan states that applications are only reviewed once all required documents are submitted, including letters of recommendation. A missing letter does not delay the review, it takes the file out of it.",
          "A research statement that never names a question. A narrative without a bounded question is read as enthusiasm, and it is exactly what the committee is trying to avoid.",
          "A supervisor named in the opening paragraph and nothing else known about their work. It reads as decoration.",
          "The wrong language test certificate. IELTS General satisfies the study permit and does not satisfy the university, and the mistake usually surfaces as an unmet condition on the offer rather than at application time.",
          "A transcript or award date that does not match the form. Canadian admissions offices verify, and a mismatch turns into a document request that eats your remaining weeks.",
          "Uploading the wrong file. The most common version is an unofficial transcript where a certified one was required, or a screenshot of a test result where the official report is needed.",
          "Applying to a programme whose intake has already filled, because the published deadline was later than the actual closing. Departments that manage their own intake may close once targets are met.",
          "Missing a language test score because it was still coming, when the programme's list is made before the score arrives. Check the programme's rule on results that are pending.",
          "Paying the application fee after the deadline, or not at all, and assuming the file is in.",
        ],
        callout: {
          tone: "watch",
          title: "Complete means complete on the day",
          body: "Canadian programmes do not review a file that is missing a document and come back to you. They review the files that are complete. If you have a referee who is slow, the deadline for chasing them is three weeks before the programme's date, not the week of it.",
        },
      },
      resources: {
        body:
          "Canadian universities publish their own requirements, and the immigration authority publishes the ones that follow. Both matter, and they are different documents with different audiences.",
        resources: [
          {
            title: "Toronto CSB graduate admissions",
            kind: "official",
            url: "https://csb.utoronto.ca/graduate-studies/prospective-students/admissions",
            why: "The source this checkpoint is filed under, and a clear example of a departmental admissions page that publishes its own opening date, its own document deadline and the warning that applications may close once departmental targets are met.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "U of T Institute of Medical Science: deadlines and requirements",
            kind: "official",
            url: "https://ims.utoronto.ca/application-deadlines-and-requirements",
            why: "A published breakdown of application deadlines against the requirements attached to them, which is the clearest way to see how a complete file is defined at a Canadian graduate school.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Toronto Metropolitan graduate application dates",
            kind: "official",
            url: "https://www.torontomu.ca/graduate/future-students/application-dates/",
            why: "Published admission and funding dates side by side, including the earlier international deadline for preference on financial support. This is the page that shows why the funding calendar is the real calendar.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "University of Toronto",
            kind: "official",
            url: "https://www.utoronto.ca/",
            why: "The university's own front door for graduate study, and the route to the central graduate application portal, the transcript policy and the per-programme requirements pages that the departmental pages link to.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "IRCC: study permit",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html",
            why: "The immigration authority's own page for the permit, including the acceptance letter and proof of funds that a Canadian offer and a Canadian institution between them produce. The letter of acceptance your school issues is what this application is built around.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "IELTS Academic",
            kind: "official",
            url: "https://www.ielts.org/take-a-test/test-types/ielts-academic-test",
            why: "The official page for the paper Canadian universities want for admission, which is the Academic version. The General Training paper is what the study permit asks for, and the two are not interchangeable.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the university's own pages and the immigration authority's own pages, which is where the deadlines and the document lists actually live. We take no payment for placement, and we do not take payment for anything. A Canadian graduate application is something you assemble yourself, and it should stay that way.",
        },
      },
    },
  },

  "au-app-submit": {
    archetype: "application",
    intro:
      "Australian applications are direct. There is no national system and no national deadline, and the spread between providers is enormous: the ANU published 15 December 2026 for Semester 1 2027 and 15 May 2027 for Semester 2 2027, and those two dates are four months apart inside the same university. Your provider's own page is the only authority, and the scholarship calendar is a second, earlier one that most people find out about too late.",
    sections: {
      routes: {
        body:
          "You apply to the university, and the provider is the institution that will issue your Confirmation of CoE. Coursework applications run through the provider's own online system, each one with its own form, its own fee, its own English requirement and its own intake structure. Research degrees run through a parallel route with a supervisor and a research proposal, usually with a different deadline and a different committee. A third path, applying through an education agent, is permitted by most providers and is entirely optional.",
        points: [
          "Applying directly is always available, and it is the route that gives you the earliest information. An agent adds a layer between you and the admissions office, and it is the layer you would otherwise use to ask a question about your own application.",
          "The provider is the institution, not the campus you hope to attend. If your offer comes with a second campus attached, the CoE you are asked to accept names a specific campus, and the visa and the fees follow that name.",
          "Coursework and research are separate applications with separate portals, separate documents and separate deadlines. A research application that reuses coursework documents is rejected for missing documents, not for weak content.",
          "Some providers have partnered with centralised application services for coursework. Where they have, the provider's own page says so, and using the wrong route can cost you a full cycle.",
          "Semester 1 and Semester 2 are real, and they are not equal. Many providers run most of their international course offerings in Semester 1, which means a Semester 2 start is thinner on course choice and thinner on scholarship money.",
        ],
        callout: {
          tone: "watch",
          title: "The provider is what your visa is attached to",
          body: "The CoE names the provider and the campus, and the student visa application is built on that CoE. Changing provider after you have applied means a new CoE and a new visa application, and a new English evidence assessment against a new requirement. Check the provider on your shortlist, not just the course name.",
        },
      },
      timeline: {
        body:
          "There is no shared calendar, so the only workable approach is to build one yourself and work to the earliest date on it. The plan below assumes a mid-December Semester 1 deadline and a scholarship round that closes earlier still. If your provider runs a later deadline, the shape is the same and the dates are yours.",
        roadmap: [
          {
            label: "4 to 6 months before term",
            title: "Build the calendar and check the scholarship rounds",
            goal: "Every date that matters in one place, with the scholarship dates above the admission dates.",
            hours: "5 to 7 hours a week",
            focus: [
              "For each provider, write down the admission deadline, the scholarship deadline and the English requirement, in one table. Scholarship rounds frequently close earlier than the course application, and some are assessed on the same application with a flag rather than a separate form.",
              "Decide whether you are applying for Semester 1 or Semester 2 for each course, because a provider can have different deadlines for each and most of its international offerings in one of them.",
              "Check the English requirement in two places: the provider's published minimum, and the number that will end up on your CoE, which is the one that is binding.",
              "Check whether your provider needs an agent-submitted application for the scholarship, and whether applying direct affects scholarship eligibility at that provider.",
            ],
            checkpoint: "A table with an admission date, a scholarship date and an English requirement for every provider on the list.",
          },
          {
            label: "3 to 4 months before term",
            title: "References, transcripts and the statement",
            goal: "The documents that arrive from other people in hand before the application window shuts.",
            hours: "6 to 8 hours a week",
            focus: [
              "Check each provider's published reference requirement for coursework master's, because it ranges from none to two academic referees, and asking for two where none are needed is a burden you place on people for nothing.",
              "Where references are needed, ask six to eight weeks before the earliest deadline and give each referee your CV and the course rationale.",
              "Order official transcripts from the issuing institution. Some providers require the transcript to be sent directly, and an unofficial copy is not a substitute.",
              "Write the university statement of purpose, tailored per provider, and keep it completely separate from anything you will write for the student visa form.",
            ],
            checkpoint: "References confirmed or formally waived, transcripts ordered, and a distinct statement written for each provider.",
          },
          {
            label: "Final 4 to 6 weeks",
            title: "Submit before the earlier of the two dates",
            goal: "An application in, funded if possible, with the fee paid and the receipt kept.",
            hours: "5 to 7 hours a week",
            focus: [
              "Submit before the earlier of your scholarship deadline or your admission deadline, not the later one. If the scholarship round closes first, the scholarship is gone even if your admission application is on time.",
              "Pay the application fee, which is non-refundable, and keep the receipt.",
              "If your provider requires an English test result attached, upload the result page as well as the score, and check whether they want the official electronic report sent to them instead.",
              "Save the confirmation reference for every application, and check the status page weekly until your file is marked complete.",
            ],
            checkpoint: "Every application submitted and paid for, with the scholarship question answered for each provider.",
          },
        ],
      },
      checklist: {
        body:
          "Australian provider applications are moderate in size, and the two things that catch people are the English evidence and the transcript. Both have delivery mechanics that differ from the rest of the world, and both are checked at the point your file is marked complete.",
        points: [
          "The online application, on the provider's own portal, with the course, the semester and the study level correct. Study level matters, because it determines the visa stream, the fee and the work rights you get afterwards.",
          "Statement of purpose, written for this course at this provider. A generic statement is noticed, and Australian admissions teams compare submissions.",
          "Academic records, uploaded, and official transcripts sent directly by the issuing institution where the provider requires that. Some providers accept a certified digital transcript; others insist on the electronic original.",
          "English test evidence. The provider's own requirement, plus the result delivered in the format they ask for. The result also has to be within six months of your visa application date, which is a separate and later test than the admission one.",
          "Academic references, where the provider asks for them. The number and format vary by provider and by course, and some accept a referee's email rather than a form.",
          "A CV, and any research proposal or additional documents the course asks for, particularly for research degrees where a supervisor agreement comes first.",
          "A copy of your passport or other identity document, if the provider asks for it at application stage.",
          "The application fee, paid online, with the receipt kept. The fee is non-refundable.",
          "For scholarship applications, the separate form, the separate deadline and any supporting document, such as an academic CV, that the scholarship requires and the course application does not.",
          "After submission: the reference number, and the status of your file, checked weekly until it is marked complete.",
        ],
      },
      essays: {
        body:
          "The Australian university statement is a fit document, and it is judged on two things: whether you understand what the course is actually about, and whether you have a plan that makes sense for someone who has just studied this. The student visa form asks a related but different set of questions, and the two documents should never be allowed to mix.",
        subsections: [
          {
            title: "The university statement of purpose",
            what: "Why this course, at this provider, now. Read by the admissions team for that course.",
            format: "The provider's own word or character limit. Some providers ask for a short statement, some for a long one, and a few ask for a different format for postgraduate coursework than for research degrees.",
            score: "Read by academics and admissions staff, often against a published rubric that gives credit for specific course content and a credible plan.",
            topics: [
              "What you want to work on in the field, stated as a problem rather than a subject area. Data science is a subject area. How clinical trial data is collected across sites is a problem.",
              "The preparation that makes you ready for it: the coursework, the project, the work experience, and what you did with each.",
              "This course, at this provider: the specific subjects, the specialisation, the research strengths or the practical component that makes it the right course rather than a similar one elsewhere.",
              "What you will do with it. Australian reviewers read for a plan that is coherent, whether or not it is a specific job.",
            ],
            tip: "Read the course handbook before you write, and use its names. Applied machine learning and machine learning are different subjects at different universities, and the marker knows which one you mean.",
          },
          {
            title: "The statement for a research degree",
            what: "A different document with a different reader: a prospective supervisor and a research committee.",
            format: "Programme-specific, and often structured: the question, the gap, the method, the feasibility, the contribution.",
            score: "Assessed on whether the research is doable and whether the supervisor wants to supervise it. Fit with a group is often the deciding factor.",
            topics: [
              "The research question and why it is open, in the language of the field rather than in general terms.",
              "Your approach, and what makes it feasible given the group's data, systems and lab resources.",
              "What you have already done that is adjacent to it, and what you would need to learn.",
              "Why this group specifically, naming the work and the people.",
            ],
            tip: "Do not apply to a research degree without emailing a prospective supervisor first. In Australia a supervisor's willingness to take you is often a precondition for the application being read, not a parallel activity.",
          },
          {
            title: "The visa form's genuine interest questions",
            what: "A separate set of answers for the Department of Home Affairs, written to a different brief and read by a different kind of assessor.",
            format: "Short-form answers, typically a few hundred characters each, plus some longer responses. The form's character limits are strict and they are enforced.",
            score: "Assessed for genuine intent and for whether the stated plan is coherent with the course. Inconsistent answers are the most common reason for a request for further information.",
            topics: [
              "Why you chose this course, and specifically this provider, in the form's own words.",
              "How this course fits the work or study you want to do afterwards, at a level of detail that is checkable.",
              "What you will do in Australia, and how the course supports it.",
              "Your study history, explained in a way that does not contradict what is on your academic record.",
            ],
            tip: "Draft these as a list of evidenced statements well before the form opens, then compress them to the character limit later. Compressing into a limit is a mechanical job; finding a coherent story under pressure is not.",
          },
        ],
      },
      traps: {
        body:
          "Australian applications fail on a handful of predictable things. Most of them are about the relationship between the university and the visa, which students treat as two separate processes until the first one goes wrong.",
        points: [
          "An English result that is valid for admission but out of date for the visa. The student visa needs evidence that your result is current at the point you apply, which is a later test than the one the university applied.",
          "Missing the scholarship deadline while making the admission deadline. Scholarship rounds close earlier, and some are assessed on the same form with a flag rather than a separate application.",
          "Applying for the wrong semester, and finding that the course you wanted is not offered to international students in the one you applied for.",
          "Uploading a screenshot of your test result when the provider wants the official electronic report, or wants the result page in a specific form. Both are checked when the file is marked complete.",
          "Sending an unofficial transcript where the provider required the official one, sent directly by the issuer. This is a documentation step with a delivery time, and it does not compress.",
          "The same statement of purpose sent to three providers. Australian admissions staff within the same sector see enough of these to recognise a shared draft immediately.",
          "A provider who closes the intake early. Some courses are capped, and a capped course stops taking international applications when the cap is reached, whatever the published deadline says.",
          "Paying the fee after the deadline, or not paying it at all, and assuming the application is in.",
          "Confusing the university with the provider when accepting an offer with a second campus attached. The CoE names one provider and one location, and the visa is built on that.",
        ],
        callout: {
          tone: "watch",
          title: "Two English requirements, two dates",
          body: "Admission needs an English result that meets the provider's published minimum. The visa needs evidence that your result is current when you apply, which is a rule about the date of the test, not the score. Students with a good score from a year ago pass the first test and fail the second. Sit the test with the visa application date in mind, not just the admission deadline.",
        },
      },
      resources: {
        body:
          "The provider's own page is the authority, and the Australian government publishes the visa rules that the provider's deadlines are built around. Both are below.",
        resources: [
          {
            title: "ANU: international applications",
            kind: "official",
            url: "https://study.anu.edu.au/apply/international-applications",
            why: "The source this checkpoint is filed under, and a well-published example of how an Australian provider sets separate deadlines for separate semesters, so the real deadline for your school is the one on its own page rather than a general one.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Department of Home Affairs: Student visa subclass 500",
            kind: "official",
            url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
            why: "The visa's own page, naming the accepted English tests and the rule that your evidence must be current when you apply. It is the document behind every early English deadline a provider publishes, and it is also the page behind the evidence your references and transcripts support.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study Australia",
            kind: "official",
            url: "https://www.studyaustralia.gov.au/",
            why: "The government's own guide to studying in Australia, with a course search and a plain explanation of the visa steps around your offer and CoE. Useful for checking the sequence after you apply, not the application itself.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Department of Education: international education",
            kind: "official",
            url: "https://www.education.gov.au/international-education",
            why: "The Australian Government's own international student information, including the framework the student visa sits inside and what support and protections you have as a student. It is the regulatory backdrop to the provider's promises.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "IELTS Academic",
            kind: "official",
            url: "https://www.ielts.org/take-a-test/test-types/ielts-academic-test",
            why: "The official page for the Academic paper that Australian providers accept for admission, with the free official practice material attached. Book it with the six-month currency window in mind, not just the deadline.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the provider's own pages and the Australian government's own pages, which is where the deadlines and the requirements live. We take no payment for placement, and we do not take payment for anything. Applying direct is free, it is faster, and it is where most of your information comes from.",
        },
      },
    },
  },

  "de-app-submit": {
    archetype: "application",
    intro:
      "German applications run on a window, not a date, and the window is often not the one you applied through. The TUM Informatics MSc window is 1 February to 31 May for the winter semester, which is 123 days before an October start, and uni-assist runs its own batch window of 1 March to 1 June for non-EU winter applicants. Two different systems, two different closing dates, and the one you missed is the one you applied through.",
    sections: {
      routes: {
        body:
          "The first decision is whether your programme is a uni-assist programme or a direct one, and it is made by the programme, not by you. Most informatics and business master's at German universities are uni-assist programmes, where you apply once for the whole university and the university ranks you. Direct application is used by programmes that have opted out, and it is the only route for research degrees, for some medicine and law programmes, and for anything using the national allocation service for capped subjects. Applying to a uni-assist programme directly is usually not possible at all, so the wrong answer here is not a mistake you can recover from.",
        points: [
          "uni-assist charges a processing fee, and the application is only complete once that fee is paid and the documents are uploaded through uni-assist rather than emailed to the university.",
          "uni-assist runs its own batch window for non-EU applicants, and it is not identical to the university's own application window. For the winter semester the uni-assist batch runs 1 March to 1 June while TUM's own window runs 1 February to 31 May. Check the two dates separately, and check which one applies to your nationality and your programme.",
          "Some subjects are capped and allocated nationally through Hochschulstart, formerly the ZVS. If your subject is one of them, the process is different and the timing is not yours to choose.",
          "The APS process is a precondition for applicants from India, China and Vietnam, and it includes its own language test. The APS certificate has to exist before you can apply, which moves your whole schedule back by months.",
          "German applications are assessed on the whole file, and for a master's the letter of motivation and the transcript are read together. A strong transcript with a thin motivation letter is a common way to be rejected by a programme that publishes no minimum grades.",
        ],
        callout: {
          tone: "watch",
          title: "Check which system your programme uses before anything else",
          body: "It determines the deadline, the fee, the form and the documents. A programme on uni-assist usually cannot be applied to directly, and a programme not on uni-assist will simply ignore a uni-assist application. One email to the admissions office settles it, and it is worth more than any amount of guessing.",
        },
      },
      timeline: {
        body:
          "German deadlines are firm, and they are early relative to the start date. A winter semester starting in October has applications closing between February and June, which means the application is being assembled in the previous autumn and winter. The plan below is built around the TUM Informatics MSc and uni-assist windows, and it front-loads the work because there is no slack in the German cycle.",
        roadmap: [
          {
            label: "October to December",
            title: "Decide the route and clear the preconditions",
            goal: "One route per programme, and every precondition that gates it already in progress.",
            hours: "5 to 7 hours a week",
            focus: [
              "For each programme, establish whether it is a uni-assist programme or a direct one, and write the corresponding window and deadline next to it. A programme's own admissions page and the uni-assist site will both tell you, and they will sometimes say different things about the date.",
              "If you are applying from India, China or Vietnam, start the APS process now. It includes a language test and it is the long pole in the whole application.",
              "Confirm your qualification is recognised for the programmes you are targeting, using the official anabin database. Recognition decisions are made by the university, but anabin tells you where to look.",
              "Book the language test for a date that puts the result in hand before the window closes, not after.",
            ],
            checkpoint: "Route and window confirmed for every programme, and the APS process under way if it applies to you.",
          },
          {
            label: "January to February",
            title: "Referees, documents and the letter",
            goal: "Every document that arrives from another institution or another person in hand before the window opens.",
            hours: "8 to 10 hours a week",
            focus: [
              "Check the exact reference requirement on each programme page, because it is programme-specific and often lighter than a UK or US application. Where references are required, approach academic supervisors who know your technical work, and allow four to six weeks for a response.",
              "Order official transcripts and certified translations for every non-German document now. A certified translation is a separate commissioned piece of work and it is the most common thing that arrives late.",
              "Write the motivation letter, one page or two, addressed to that programme specifically.",
              "If your programme uses uni-assist, create the account and check the processing fee before the window opens.",
            ],
            checkpoint: "Transcripts and translations ordered, referees asked where required, and the uni-assist account open with the fee understood.",
          },
          {
            label: "March to May",
            title: "Submit inside the window",
            goal: "Every application submitted, uploaded and confirmed, with time to fix what the portal rejects.",
            hours: "7 to 9 hours a week",
            focus: [
              "Submit through uni-assist if the programme requires it, and pay the uni-assist processing fee. A uni-assist application without the fee paid is not an application.",
              "Upload certified translations with every non-German document, and check that your anabin-relevant qualification details match the uploaded documents exactly. Inconsistencies here cause requests for clarification, and a clarification request near the deadline is a real risk.",
              "Submit before the window closes rather than on its final day. A portal that rejects a file at 23:50 on the last day cannot be fixed in time.",
              "Save the confirmation of every submission and keep a record of the exact date and time you sent it.",
            ],
            checkpoint: "Everything submitted and confirmed, with nothing outstanding on any file.",
          },
          {
            label: "After the window",
            title: "Wait without panicking",
            goal: "Your file is complete and you know what happens next.",
            hours: "2 to 3 hours a week",
            focus: [
              "German admissions decisions often come weeks or months after submission, and silence is normal. The admission letter arrives by post or through the portal.",
              "Keep the acknowledgement of submission. If the university queries your file, that acknowledgement is the first thing they ask for.",
              "Do not submit a second application to the same programme through the other route. It does not improve your chances and it can confuse a file that was already complete.",
            ],
            checkpoint: "A complete file with a saved submission record and nothing outstanding.",
          },
        ],
      },
      checklist: {
        body:
          "A German file is documents, and the documents are formal: certified, translated, dated and consistent with each other. An informal application to a formal process is the most common way to fail here.",
        points: [
          "The application itself, through uni-assist or the university's own portal, with the fee paid. Confirm the route before you upload anything.",
          "Motivation letter, one to two pages, addressed to this programme, explaining why Germany, why this university and why this programme.",
          "Curriculum vitae, in the German academic convention: a structured document with your education in reverse chronological order, rather than a chronological one.",
          "Certified copies of your degree certificate and transcripts, with certified translations for anything not in German. Certified translation is a specific legal status, not a self-translation and not a plain copy.",
          "Language certificate, if the programme requires one, with the result in hand inside the window rather than following the application.",
          "The APS certificate, if you are applying from India, China or Vietnam. It gates the application rather than accompanying it.",
          "References, where the programme asks for them, submitted on the university's own form if it supplies one.",
          "A check of your qualification's status in anabin, done in advance so that the qualification details you enter match the ones the database holds.",
          "The processing fee, paid online, with the receipt kept.",
          "Final checks: your name spelled as it appears in your passport, your qualification title exactly as it appears on the certificate, and every document uploaded and readable.",
        ],
      },
      essays: {
        body:
          "The German Motivationsschreiben is a formal document and it is read as one. It is expected even where the transcript and the CV look strong, and it is not a document you can leave until the night before the window closes. Its job is to make a coherent case for why this person should be admitted to this programme, and to do that with a degree of specificity that most applicants underestimate.",
        subsections: [
          {
            title: "The opening: who you are, in formal terms",
            what: "A formal statement of your name, your degree, your institution and your current position.",
            format: "Two or three sentences, in the register of German academic correspondence. No rhetorical question, no anecdote before the introduction.",
            score: "Read first, often in seconds, and it sets the tone for the rest of the letter. It is also where a non-native reader's English habits show most clearly.",
            topics: [
              "Your name, your degree, the university that awarded it, and what you are doing now.",
              "One sentence on the subject of your degree, framed as preparation for the programme you are applying to.",
            ],
            tip: "Do not open with a line about expressing your interest. It reads as a translated British personal statement, and German reviewers are unusually sensitive to the register of a letter addressed to a programme.",
          },
          {
            title: "Why this subject, concretely",
            what: "The thread through your academic and professional history that makes this programme the natural next step.",
            format: "A paragraph or two, with named modules, named projects and named work.",
            score: "This is where the letter is read for content. A committee looking for a master's student wants to know what you have actually done.",
            topics: [
              "The specific areas of your degree or your work that map onto the programme's content.",
              "One project or piece of work, described with enough detail that it shows what you did rather than what you were in the room for.",
              "Any gap you need to explain: a career change, a gap year, a move between disciplines. German letters are expected to address it, because the letter is where the reader decides whether it is a problem.",
            ],
            tip: "Use the programme's own module names. Machine learning is a field; Machine Learning and Pattern Recognition is a course at that university, and using the exact title tells the reader you have actually looked.",
          },
          {
            title: "Why Germany, and why this university",
            what: "The two questions a German letter is expected to answer and many applicants skip.",
            format: "A short paragraph each, specific rather than general. Institutional branding is not an answer.",
            score: "Read closely. It is the part that distinguishes a letter written for Germany from a letter written anywhere.",
            topics: [
              "Why Germany: the structure of the system, the language of instruction, the specialisation, the specific reason. Not a paragraph about Germany being a strong country for engineering.",
              "Why this university: the institute, the group, the named professor whose work you have read, the specific course or research area.",
              "Why now, and what you will do afterwards. German letters usually expect a plan, and a programme that trains you for a profession expects a profession.",
            ],
            tip: "Name a professor and name their work. One sentence about a specific paper or a specific group's research tells the reader you have read their output, and it does more for you than a paragraph about the university's ranking.",
          },
          {
            title: "The close",
            what: "A formal sign-off that restates your intention without begging.",
            format: "One or two sentences and a signature. In a German letter the close should read like the opening.",
            score: "It is the last thing read and it is what stays in the reader's mind when they compare your file with three others.",
            topics: [
              "A restatement of what you are applying for and why, in one sentence.",
              "An accurate statement of your availability and, if the programme asks for it, your funding situation.",
            ],
            tip: "Do not sign off by asking them to consider your application favourably. It is a request, and German letters do not make it. State the intention and stop.",
          },
        ],
      },
      traps: {
        body:
          "German applications are rejected for procedural reasons more often than for content, and the procedural reasons are mostly about documents that were not what the programme asked for.",
        points: [
          "Applying through the wrong system. A direct application to a uni-assist programme is usually not possible at all, and a uni-assist application to a direct programme is not considered, so in both cases the file is not read.",
          "Missing the batch window because you worked from the university's own date. The uni-assist window and the university window are different and they overlap only partly.",
          "Translations that are not certified. A self-translation, a translation by a friend, or an uncertified translator's output is treated as no translation.",
          "Documents that do not match each other. A degree title in the form that differs from the one on the certificate, or a birth date that differs from your passport, is a request for clarification, and a clarification request near the deadline is a rejection in slow motion.",
          "A qualification that has not been checked against anabin. Recognition is the university's decision, but the anabin check tells you whether it is worth applying at all.",
          "A motivation letter that was clearly written for a different programme, or for a different country. With one letter per university, this is the most common way to see it.",
          "The APS certificate not existing yet, for applicants from India, China and Vietnam. It cannot be expedited, and it gates everything after it.",
          "The fee not paid, which for uni-assist means the application is not in the batch at all.",
          "A language result that arrives after the window closes, when the programme wanted it inside the application.",
          "Applying a second time through the other route out of impatience. It does not create a second file and it can create a genuine inconsistency.",
        ],
        callout: {
          tone: "watch",
          title: "Formal means formal",
          body: "A German file is read as an administrative document with a document attached. Register, completeness and internal consistency are not politeness in this system, they are the first things assessed. A well-written letter in the wrong register is read as not understanding the process.",
        },
      },
      resources: {
        body:
          "Germany's official portals publish more than most countries, and uni-assist in particular explains its own process in full. The DAAD and Make it in Germany cover the parts that sit outside the application, and both are free.",
        resources: [
          {
            title: "TUM Informatics MSc (MSc)",
            kind: "official",
            url: "https://www.tum.de/en/studies/degree-programs/detail/informatics-master-of-science-msc",
            why: "The source this checkpoint is filed under, and a well-published example of a German programme's application window, its required documents and its route. The 1 February to 31 May winter semester window this plan is built around is stated there.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "uni-assist",
            kind: "official",
            url: "https://www.uni-assist.de/en/",
            why: "The central application service for most German master's programmes, and the place the batch windows, the processing fee and the per-programme document requirements are published. If your programme is a uni-assist programme, this is the authority, not the university page.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "APS: Anabin Recognition Process",
            kind: "official",
            url: "https://www.aps.org.cn/",
            why: "The official process for applicants from India, China and Vietnam, including its own language test and its own dates. It gates the German application rather than accompanying it, so it belongs at the start of the plan and not at the end.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "anabin",
            kind: "official",
            url: "https://anabin.kmk.org/",
            why: "The official German database of how foreign qualifications are evaluated, run by the Central Office for Foreign Education. Use it to check whether your qualification is recognised before you spend a window assembling an application.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "DAAD",
            kind: "official",
            url: "https://www.daad.de/",
            why: "The German academic exchange organisation, with a course database and an admission requirements database covering around 140 countries. It is the fastest way to find the programmes and the requirements when you do not yet know where to apply.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Make it in Germany: studying in Germany",
            kind: "official",
            url: "https://www.make-it-in-germany.com/en/study-vocational-training/studies-in-germany",
            why: "The German government's own guide to applying, with the uni-assist route, the semester contribution, the blocked account and the recognition steps explained in one place. It answers the questions that sit around the application rather than inside it.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the German official portals, and because the uni-assist and APS pages in particular state the rules in the form the applications are actually decided against. We take no payment for placement, and we do not take payment for anything. A German application costs what the authorities charge and no more.",
        },
      },
    },
  },

  "fr-app-submit": {
    archetype: "application",
    intro:
      "French postgraduate applications are ranked, not queued. The candidature sits inside a bounded window and the places are allocated on the strength of the dossier, so a late submission is not merely late, it is unranked. Motives matter here in a way they do not anywhere else: the lettre de motivation is the centre of the file, and identical letters are read as an absence of genuine interest.",
    sections: {
      routes: {
        body:
          "The route depends on where the programme sits, and the difference is not cosmetic. Mon Master is the national platform for master's programmes in state institutions, and it runs one campaign across the whole country rather than one deadline per university. Programmes outside that scope, including many private institutions, some grandes ecoles and a number of programmes that sit in their own institutional or inter-university schemes, use a different platform, which has its own dates and its own document list. Research degrees are different again: you apply to a laboratory, you write to a supervisor, and there is no national platform at all. Check the programme's own page, because a candidature submitted to the wrong route is not transferred for you.",
        points: [
          "Mon Master is a national campaign, and the national dates are published each year and are the same for every participating institution. That is the main advantage: you do not have to track a separate deadline for every state university.",
          "The university's own platform is the route for the programmes not in Mon Master, and it works like a smaller version of the same thing: a dossier, a list of documents, a deadline, and a ranking.",
          "A candidature for a research degree or for a professional doctorate goes directly to the laboratory or the doctoral school, and it starts with a supervisor, not a form.",
          "Some programmes in regulated fields, and the first year of some health programmes, run through separate national channels with their own platforms. If your programme is in one of those, the standard Mon Master calendar does not apply to you.",
          "The Campus France attestation, the etudes en France attestation, sits on top of the application rather than inside it. It is issued on the basis of a language test and it is required for the visa, and for most universities.",
        ],
        callout: {
          tone: "watch",
          title: "Late is not ranked",
          body: "A French candidature is a ranked list, not a queue. Places are allocated on the strength of the dossiers, and a dossier that arrives after the window closes is not placed at the bottom of the list. It is not on the list. Treat the closing date as the day the ranking is built, not the day you would like to submit.",
        },
      },
      timeline: {
        body:
          "The French cycle is a window with a ranking inside it, and the ranking is why the whole dossier has to be in place on the day the window shuts. The plan below assumes you are working to the main autumn intake and are building the dossier backwards from the closing date, whatever your programme publishes.",
        roadmap: [
          {
            label: "6 to 8 months before the window",
            title: "Fix the route and the documents",
            goal: "One route per programme, and the complete document list for each.",
            hours: "5 to 7 hours a week",
            focus: [
              "Establish for each programme whether you apply through Mon Master, through the university's own platform, or directly to a laboratory. Write the closing date for that route next to it.",
              "Read the full document list, including the language requirements and whether the Campus France attestation is needed before or alongside the candidature.",
              "Check the reference requirement and, for a professional programme, whether there is a written test or an interview in the process.",
              "Start the language test if you have not. The attestation is issued on the basis of a recognised test result, so the test comes first in the sequence.",
            ],
            checkpoint: "Route, closing date and complete document list written down for every programme.",
          },
          {
            label: "3 to 5 months before the window",
            title: "The motivation letter, and the referees",
            goal: "A finished lettre de motivation and referees who know the deadline.",
            hours: "8 to 10 hours a week",
            focus: [
              "Write the motivation letter to the length the programme specifies, referencing the actual course names and units on that syllabus. A letter that names a programme but no course in it reads as a template.",
              "Ask referees at least six weeks before the platform deadline, and tell them which platform, which programme and which date. French applications usually ask for one or two recommandations, and the referee submits them through the platform.",
              "For a French-language programme, the reference is expected in French. Tell the referee that explicitly rather than assuming they will notice.",
              "Prepare a written project statement for the computer science and data programmes that ask for one, with a concrete research question rather than an interest.",
            ],
            checkpoint: "The letter is drafted, every referee has been asked in writing, and the project statement exists where one is required.",
          },
          {
            label: "Final 3 to 4 weeks before the window",
            title: "Assemble and upload, all in the platform",
            goal: "A complete candidature, uploaded, with every recommendation tracked.",
            hours: "6 to 8 hours a week",
            focus: [
              "Upload every document inside the platform rather than emailing anything separately. Documents emailed to the admissions office are, in practice, documents that are not in your dossier.",
              "Check the reference status in the platform itself. A recommendation that has been requested but not submitted is a missing document, and the platform will show you which ones.",
              "Respond quickly to any request for an interview or a written test. These are the two things in the French process that can move a ranking, and they are almost always short-notice.",
              "Submit well before the closing date. The platform is slow in the last days, and a candidature that fails to upload is a candidature that does not exist.",
            ],
            checkpoint: "The candidature is submitted, every document is in the platform, and every recommendation shows as submitted.",
          },
          {
            label: "After submission",
            title: "Track, and prepare the attestation",
            goal: "Nothing left to do on the application, and the visa-side document moving.",
            hours: "3 to 4 hours a week",
            focus: [
              "Apply for the Campus France attestation as soon as your language result is in hand, and check its validity date against your visa application date.",
              "Keep a copy of everything you uploaded, because a verification request after the ranking is a request you will want to answer the same day.",
              "Watch for an invitation to an interview or an entrance examination, and answer it the day it arrives.",
            ],
            checkpoint: "The application is closed on your side, and the attestation is requested and dated.",
          },
        ],
      },
      checklist: {
        body:
          "The French dossier is a small number of documents, but each one is checked for form as well as content, and the order is: language first, then the platform, then the references inside the platform.",
        points: [
          "Language test result for the programme, and the Campus France etudes en France attestation issued on the basis of it. The attestation is a separate fee from the test and a separate step, and it is what the visa asks for.",
          "The candidature itself, on the platform your programme uses: Mon Master, the university's own platform, or a direct application.",
          "Lettre de motivation, written to the length the programme specifies, and referring to the actual content of the syllabus. This is the document the ranking is built on.",
          "A written project statement, where the programme asks for one. A research question, a method and a first year, not a description of what you find interesting.",
          "CV, in the French academic convention: education, then experience, with the reverse chronological order used and no photo unless the programme asks for one.",
          "Academic transcripts for every degree, with a certified French translation where the programme requires one, or where the original is not in French and the programme says so.",
          "Degree certificate, or a statement from your institution giving your award date, if you have not graduated when you apply.",
          "One or two recommendations, submitted by the referee through the platform rather than emailed to you. Check the required language and whether a structured form is used.",
          "Any additional document the programme lists: a portfolio, a coding sample, an entrance examination result, a French certificate from the university.",
          "Proof of the application fee payment, and the submission confirmation.",
          "After submission: the application reference, and the status of each recommendation, checked until every one shows as received.",
        ],
      },
      essays: {
        body:
          "The lettre de motivation is not a personal statement and it is not a cover letter. It is a structured argument about why your academic preparation matches this syllabus and why you should be admitted to it, and in the French system it is the document the committee reads first and weighs most heavily. The shape of it matters, because a French committee expects to find particular things in particular places.",
        subsections: [
          {
            title: "The presentation: who you are",
            what: "A dense opening paragraph establishing your identity and your academic record.",
            format: "One paragraph, in the register of French academic correspondence. It is not a biography and it is not a hook.",
            score: "Read as a formality, and read carefully for whether you are applying for the right thing. A candidate who has misread the programme is usually eliminated here.",
            topics: [
              "Your name, your current level of study, the institution you are at or came from.",
              "Your degree, its field, and the institution that awarded it.",
              "One line on what you are applying for and one on what you have done that is relevant to it.",
            ],
            tip: "Keep it factual and short. French reviewers read a lot of these, and the opening paragraph is where you demonstrate that you know which programme you are writing to.",
          },
          {
            title: "The academic preparation",
            what: "The argument that your course background and your work make you ready for this syllabus.",
            format: "One to two paragraphs, using the actual names of the courses you took and the units you are applying to.",
            score: "This is the part of the letter that is really read for content, and it is where a generic letter fails. It is the paragraph that says whether you have done the work this programme assumes.",
            topics: [
              "The specific courses, units or modules in your own degree that map onto the programme's content, named one by one.",
              "Any research, project or professional work, described concretely, with what you actually did.",
              "Any preparation in French itself, if the programme is taught in French and you are not a native speaker.",
            ],
            tip: "Use the programme's own unit names. A committee knows what each of their units covers, and naming them precisely is the difference between a letter that shows you have read the syllabus and one that shows you have read the title.",
          },
          {
            title: "Why this formation, and what you want from it",
            what: "The paragraph that turns your preparation into a request, and asks for something specific.",
            format: "One paragraph, concrete rather than enthusiastic. This is the section that is usually missing, and it is the one the committee expects to find.",
            score: "The committee is looking for a reason you chose this formation over another, and for evidence that you know what it will give you that a different one would not.",
            topics: [
              "What in the syllabus you want, and why, in terms of the units rather than the field in general.",
              "Any specialisation, laboratory, elective or teaching arrangement that matters to you.",
              "The professional or research project you want to work on, if the programme is designed around one.",
            ],
            tip: "Ask for something specific. A letter that says you hope to acquire a solid foundation in a demanding field asks for nothing in particular, and it reads as a paragraph that could be pasted into any application.",
          },
          {
            title: "The written project statement",
            what: "A separate document, asked for by the computer science and data master's that want to see how you think.",
            format: "Short, and often a page or two. Check the programme's own specification for length and structure.",
            score: "Assessed on whether the question is real and the approach is plausible, often by academics in the field rather than by the admissions office.",
            topics: [
              "The research question, stated in one sentence a reader in the field would recognise.",
              "Why it is open, and what has been tried.",
              "The method and the data, concretely enough that the approach can be judged.",
              "What you would contribute, and what the group would contribute.",
            ],
            tip: "A bounded question that you could actually start next month beats a grand question every time. Reviewers are looking for tractability, not ambition.",
          },
        ],
      },
      traps: {
        body:
          "French applications fail on a small number of predictable things. Most of them are about the dossier not being whole on the day, and about confusing two different documents that look similar from outside.",
        points: [
          "Submitting after the window closes. A candidature is ranked, and a late one is unranked.",
          "Emailing documents to the admissions office instead of uploading them in the platform. The committee reads the platform, so a document in an inbox is a document that does not exist.",
          "The Campus France attestation missing or out of date. The university and the visa both ask for it, and it is issued on the basis of a language test rather than on your application.",
          "A letter that names the university and the field but not a single unit of the programme. It is the most common way to lose a place in a competitive ranking.",
          "An identical letter sent to several formations. French reviewers read identical letters as a lack of genuine interest, and the phrase in the programme's own guidance is not a warning about plagiarism.",
          "A recommendation in English for a French-language programme, or a recommendation sent to you by email instead of submitted through the platform.",
          "A project statement that is a statement of enthusiasm instead of a research question, on the programmes that ask for one.",
          "Not tracking the recommendation status in the platform, so you find out on the last day that one was never submitted.",
          "Missing an interview or a written test because the invitation sat in your inbox for a week.",
          "Applying to the wrong campaign because your programme does not run in the one you assumed, and the dates are different from the ones you planned around.",
        ],
        callout: {
          tone: "watch",
          title: "The attestation is not the application",
          body: "Campus France's etudes en France attestation is what the university and the visa ask for, and you get it after sitting a recognised language test and paying the attestation fee. A student with a good TCF score and no attestation is not finished, and the attestation cannot be issued retroactively after the deadline.",
        },
      },
      resources: {
        body:
          "France publishes more of its own material than most countries. Campus France carries the requirements that everything else is measured against, and the national platform publishes the campaign dates.",
        resources: [
          {
            title: "Campus France",
            kind: "official",
            url: "https://www.campusfrance.org/en",
            why: "The source this checkpoint is filed under, and the official body for French study. The attestation, the language requirements and the accepted certificates are all published here, so it is where you should start before you work outwards.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Mon Master",
            kind: "official",
            url: "https://www.monmaster.fr/en/",
            why: "The national platform for master's applications in state institutions, and the place the campaign dates and the dossier rules are published. If your programme runs in Mon Master, this is the system you are actually in.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "France Education International",
            kind: "official",
            url: "https://www.france-education-international.fr/en/",
            why: "The official body behind the TCF and the DALF, and the source of the language test results the Campus France attestation is issued from. If you are sitting a French test, this is where the practice papers are.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Ministere de l'Enseignement superieur et de la Recherche",
            kind: "official",
            url: "https://www.enseignementsup-recherche.gouv.fr/en",
            why: "The ministry's own site, which publishes the national policy on master's and doctoral admission and the list of accredited institutions. Useful for confirming which programmes are in the national scheme and which are not.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the French official sources, and because they state the rules in the form the dossiers are actually assessed against. We take no payment for placement, and we do not take payment for anything. A French candidature is written and uploaded by you, and it should be.",
        },
      },
    },
  },

  "sg-app-submit": {
    archetype: "application",
    intro:
      "Singapore applications are direct, published and narrow. NUS Computing publishes application dates of 1 October 2026 to 31 January 2027 for the August 2027 master's intake, and a PhD intake closing 15 December 2026, and applications are only reviewed for the immediate upcoming intake. There is no rolling admission, no second intake most people can reach, and no late consideration.",
    sections: {
      routes: {
        body:
          "Each university runs its own portal, its own form, its own fee and its own requirements, and there is no national system. NUS uses its own online application system for graduate study, NTU uses its own, and SMU and SIT have theirs. The route is therefore simple to state and easy to get wrong in one specific way: the intake. Singapore programmes are tied to named intakes, they review only for the next one, and a strong application to the wrong intake is not held for the following year. Alongside the coursework route there is a separate research-degree route with its own portal, its own earlier deadline and, in the PhD case, a supervisor requirement before you apply.",
        points: [
          "Research degrees in Singapore are not an alternative version of the coursework application. They have their own portal, their own fee, their own documents and their own panel, and they often close months earlier.",
          "Some programmes require you to have contacted and been accepted by a supervisor before the application is complete, particularly for PhD and for research-track master's. NUS Computing's PhD route states the referee and document requirements explicitly for this reason.",
          "Applications are reviewed for the immediate upcoming intake only. If the window for the intake you wanted has closed, the application you prepare for it has no review date attached to it.",
          "Each university publishes its own English requirement, and the professional schools set their own, frequently higher than the university's default for coursework.",
          "Some programmes run a separate scholarship or programme-specific scheme with its own cut-off, which can be months earlier than the general deadline. NUS Business School's HCMA programme set a scholarship consideration cut-off of 15 November 2026 against a general deadline of 15 February 2027.",
        ],
        callout: {
          tone: "watch",
          title: "One intake, one window",
          body: "Singapore is the least forgiving destination for a late application, because there is rarely a later round to aim at. Check the intake you are applying to, the window for that intake, and the date the reviews begin, in that order, before you do any other work on the file.",
        },
      },
      timeline: {
        body:
          "The window is about four months long, and it closes without discussion. The plan below is built around a window that opens in early October and closes at the end of January, with a research-degree deadline well inside it and a scholarship cut-off earlier still.",
        roadmap: [
          {
            label: "6 to 8 months before the window",
            title: "Choose the intake and the programme",
            goal: "The right intake, the right programme, and every deadline for both.",
            hours: "5 to 7 hours a week",
            focus: [
              "Confirm the intake, not just the programme. Write down the application window, the scholarship cut-off and the English requirement for the specific intake you are targeting.",
              "Check whether your programme is coursework or research, and whether the research route needs a supervisor before you apply.",
              "Check the reference requirement. NUS Computing states that all applications require two recommendation or referee's reports, and other programmes differ, so confirm the number per programme.",
              "Book the language test with the window in mind, and check whether the result is allowed to follow the application or must be in it.",
            ],
            checkpoint: "Intake, programme, window, scholarship cut-off and reference count all written down.",
          },
          {
            label: "3 to 5 months before the window",
            title: "The statement, the referees and the transcripts",
            goal: "A written statement that is actually finished, and two referees who know the two deadlines.",
            hours: "7 to 9 hours a week",
            focus: [
              "Write the statement of purpose. NUS Computing states that it is mandatory, that it must be uploaded under document upload, and that it should cover your reasons for applying, your preparation for the field and your future plans.",
              "Give your referees at least six weeks and a stated deadline, and warn them about the two dates: the date to accept the invitation, and the later date to submit the report.",
              "Order transcripts and any degree evidence now, and check whether the university needs certified documents sent directly by the issuer.",
              "For a research degree, start the supervisor conversation now. It is the long pole and it is not in your control.",
            ],
            checkpoint: "The statement is written, both referees are briefed with both dates, and transcripts are ordered.",
          },
          {
            label: "Final 6 to 8 weeks of the window",
            title: "Submit, pay and confirm",
            goal: "A submitted, paid, complete application with a saved reference.",
            hours: "5 to 7 hours a week",
            focus: [
              "Submit inside the published window; late applications are not considered. There is no partial credit for a strong file that arrived after the close.",
              "Pay the non-refundable application fee by the closing date, and make sure the form and the fee are both complete, because applications with unpaid fees are not reviewed.",
              "Upload the statement of purpose in the document upload section, not as a loose attachment, and check the section header before you submit.",
              "Save the submitted reference so you can track the outcome, and check the referee's status in the system until both reports are in.",
            ],
            checkpoint: "The application is submitted, the fee is paid, and the reference number is saved.",
          },
        ],
      },
      checklist: {
        body:
          "The Singapore file is compact, and the two items that decide whether it is complete are the two referee reports and the statement of purpose. Both are listed explicitly by the programmes, which is unusual and worth taking advantage of.",
        points: [
          "The online application on the university's own portal, with the programme, the intake and the application fee selected and paid. An application with an unpaid fee is not reviewed.",
          "Statement of purpose, uploaded in the document upload section. NUS Computing states the statement is mandatory, and its three-part brief is your own outline: reasons for applying, preparation for the field, and future plans.",
          "A research proposal, where the programme asks for one, and for a PhD this is the document the panel reads most closely.",
          "CV, in the format the programme expects, with academic preparation, projects, technical work and any research output.",
          "Academic transcripts for every degree, uploaded, and degree certificates or evidence of expected award if you have not graduated.",
          "English test result, uploaded or attached in the format the programme requires, with the official report sent to the institution where that is the rule.",
          "Two referee's reports, submitted by the referees through the online admission system. NUS Computing is explicit that these are submitted by the referees and not emailed as documents.",
          "Any supervisor agreement, research proposal or additional form, for research degrees.",
          "Identity document details, matching your passport exactly, because the Student Pass application is built on the identity the university records.",
          "After submission: the application reference, the payment receipt, and the referee status, checked until both reports show as received.",
        ],
      },
      essays: {
        body:
          "The Singapore statement of purpose is short, and the three things it has to do are published: say why you are applying, show what prepared you for the field, and state your future plans. Assessors read the third one as a signal of genuine intention, so a vague plan is read as a weak application even when the rest is strong.",
        subsections: [
          {
            title: "Why you are applying",
            what: "The opening, and the shortest section. What you want to do in the field, and why now.",
            format: "Short. The statement is uploaded as a document, and the length each programme expects is published on its page. Check the programme's own limit rather than assuming a page.",
            score: "Read as part of a package rather than on its own, but it is the section that sets the frame for everything after it.",
            topics: [
              "The area of the field you want to work in, stated as a question or a problem rather than a label.",
              "Why now, in one or two sentences, connected to something real in your background.",
              "The specialisation you are targeting at this university, and why this one rather than a general field.",
            ],
            tip: "If your first paragraph could be used for any programme in the country, it is not doing its job. The specialisation is the part that makes it specific.",
          },
          {
            title: "What prepared you for the field",
            what: "The evidence section, and the one that has to be technical.",
            format: "The largest part of a good statement, and the place where vague claims get caught.",
            score: "Read by people who know the field, who will notice a claim they could not have made themselves. Specificity is the entire game here.",
            topics: [
              "The technical preparation: the courses, the projects, the code, the systems, the papers. What you did, with what result.",
              "The reasoning behind your direction, so the reader can see how your background led here rather than listing what you have touched.",
              "Any research or industry work, with the constraint you had to work under and what you built anyway.",
            ],
            tip: "Show one thing you did rather than listing ten you took. A single project described properly, including what failed, is more convincing than a list of courses with no argument attached.",
          },
          {
            title: "Your future plans",
            what: "The closing section, and the one assessors read as a genuine-intention signal.",
            format: "Short and concrete. It should be possible to read it and see a person, a direction and a reason.",
            score: "Assessed for coherence with the course and with your background. A plan with no link to the degree reads as filler; a plan that contradicts your own record reads as worse.",
            topics: [
              "The kind of work you want to do afterwards, and in what setting.",
              "The link between the degree and that work, stated concretely enough to be checkable.",
              "If you are staying in Singapore, the sector and the kind of employer. If you are leaving, what you are taking with you.",
            ],
            tip: "Be honest and be specific. Assessors in Singapore are looking for a credible graduate who will use the degree, and a vague plan reads as an application written without thinking.",
          },
        ],
      },
      traps: {
        body:
          "Singapore applications fail on a small number of things, and the pattern is the same in every programme: an incomplete file at the moment the intake closes.",
        points: [
          "Applying outside the published window, or to the wrong intake. Applications are only reviewed for the immediate upcoming intake, and late applications are not considered.",
          "An unpaid application fee. Applications with unpaid fees are not reviewed, and this is a silent failure, because the form submits and the fee does not.",
          "One referee report instead of two. NUS Computing states that all applications require two, and a file with one is incomplete rather than short.",
          "A referee who never accepted the invitation. The system invites referees directly, and an invitation that sits in a spam folder, or that the referee ignores, blocks completion of the whole application.",
          "A referee who accepted but did not submit the report. These are two different deadlines and students routinely only warn people about the first.",
          "Uploading the statement of purpose as a loose attachment rather than in the document upload section the programme specifies.",
          "A statement of purpose that lists courses and courses of study rather than demonstrating what you have done with them.",
          "A future plan that contradicts your own record, or that is so vague it says nothing.",
          "Choosing the wrong intake on the form, or a course and an intake that are not offered together in that cycle.",
          "Not saving the submitted reference, so the outcome arrives with no way to match it to the application you made.",
        ],
        callout: {
          tone: "watch",
          title: "A referee is two deadlines, not one",
          body: "In an invitation-based referee system the referee has to accept the invitation first and submit the report second, and the second date is the one that counts. If you brief them only on the submission date, some will accept the invitation weeks later and then have no time. Brief them on both dates, and check the status yourself weekly.",
        },
      },
      resources: {
        body:
          "Singapore's universities publish their own requirements in their own admissions guides, and the free official practice material from the test bodies covers the syllabus. All of it is free and none of it needs an agent to interpret.",
        resources: [
          {
            title: "NUS Computing: graduate programmes",
            kind: "official",
            url: "https://www.comp.nus.edu.sg/graduate/",
            why: "The source this checkpoint is filed under, and the page where the application windows for each intake are published, along with the intake structure. If you are applying to NUS Computing, this is where the dates are.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NUS Computing: PhD application requirements",
            kind: "official",
            url: "https://www.comp.nus.edu.sg/programmes/pg/phdcs/application",
            why: "The clearest published statement of the Singapore requirements: a mandatory statement of purpose uploaded under document upload, and two referee reports submitted by the referees through the online admission system rather than emailed. It is the model of how a well-published requirement should look.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NUS Graduate Admissions: how to apply",
            kind: "official",
            url: "https://nus.edu.sg/grad/admissions/applying",
            why: "The central instructions for applying through NUS, covering the application system, the document upload and the payment steps that the programme pages link to.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NTU Graduate Admissions",
            kind: "official",
            url: "https://ntu.edu.sg/admissions/graduate",
            why: "NTU's own admissions site, published on its own deadline structure and intake names. Useful for checking a second Singapore university on the same terms, since the two do not use the same calendar.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ICA: Student's Pass",
            kind: "official",
            url: "https://www.ica.gov.sg/reside/STP",
            why: "The immigration authority's own page for the Student's Pass, which is a separate process from university admission with its own evidence requirements. It is the document that explains why your admission offer and your English result both have to be current when you apply for it.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the universities' own admissions pages and the immigration authority's own page, which is where the requirements and the windows actually live. We take no payment for placement, and we do not take payment for anything. A Singapore application is submitted by you, and it should be.",
        },
      },
    },
  },
};

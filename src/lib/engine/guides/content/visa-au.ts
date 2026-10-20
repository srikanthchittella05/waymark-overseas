import type { GuideContent } from "../types";

const V = "2026-10-20";

/**
 * The Australian student visa dossiers.
 *
 * The subclass 500 application is a four-part gate, and the parts are checked
 * against each other rather than in isolation: a Confirmation of CoE, Overseas
 * Student Health Cover, evidence of financial capacity, and the Genuine Student
 * requirement. Home Affairs says plainly that a missing or inconsistent
 * document is the main cause of delay and refusal, which is why almost every
 * section in this file keeps coming back to the same instruction: make the
 * four parts say the same thing.
 *
 * Two facts do the most damage to students who do not know them:
 *
 *   1. THE FINANCIAL CAPACITY FIGURE IS A FLOOR AND IT IS INDEXED. The number
 *      Study Australia publishes is the minimum that gets an application
 *      processed. It is not what a year in Sydney or Melbourne costs, and it
 *      changes.
 *   2. THE GENUINE STUDENT REQUIREMENT IS NOT A TEST. It is four written
 *      questions, 150 words each, that have to be answered consistently with
 *      every document in the file. There is no pass mark. There is only a
 *      consistent story and a plausible one.
 */
export const VISA_AU: Record<string, GuideContent> = {
  "au-financial-capacity": {
    archetype: "visa",
    intro:
      "Australia will not process a student visa application until you have shown that you have money available to cover your course and your living costs. The requirement is a published minimum that covers travel, twelve months of living expenses and tuition, and it is indexed, so the figure in force when you lodge is the one that counts.",
    sections: {
      route: {
        body:
          "Financial capacity is one of four things that must be in place before the Department of Home Affairs will look at your subclass 500 application, alongside the Confirmation of CoE, Overseas Student Health Cover and the Genuine Student requirement. There is no separate financial capacity application. You assemble the evidence, upload it to ImmiAccount, and Home Affairs assesses it as part of the one application.",
        points: [
          "The published minimum is the sum of three things: travel costs to and from Australia, twelve months of living expenses, and the tuition fees stated on your Confirmation of CoE. Any of the three can be the largest part of the total for your particular case, which is why the same number is right for one student and wildly wrong for another.",
          "There are several ways to satisfy the requirement and they can be combined: money in your own account, a loan, a scholarship, a government-funded stipend, or a mix. The only thing that does not work is an unsupported assertion. Every component needs a document behind it.",
          "The money has to be genuinely available to you. If it is in a parent's or sponsor's account, then you need that sponsor's evidence as well, not a note saying they will support you.",
          "If you are bringing dependants, their costs are added to the calculation, and school-aged dependants bring their own documentation requirements on top.",
          "The threshold is a country-wide figure, but the real cost of living is not. Sydney, Melbourne and Canberra are not the same as regional cities, and the extra you need above the minimum is yours to work out, not Home Affairs'.",
        ],
        callout: {
          tone: "watch",
          title: "The minimum is a processing threshold, not a plan",
          body: "Home Affairs sets the financial capacity figure so that it can assess whether you will not become a charge on the state. It is not derived from what a student actually spends in the city you are going to, and it does not include everything you will spend. If your budget only clears the minimum, you will clear the visa and still be short of money in week one.",
        },
      },
      documents: {
        body:
          "The evidence set changes with your funding route, so the sensible order is to decide how you are funded first and then collect the documents that route requires. The common thread across every route is that the money has to be visible in a document that names you and shows it is available.",
        points: [
          "Bank statements in your own name, covering a period the guidance asks for. Home Affairs looks at how long the money has been available, not just how much of it there is, so a large balance that appeared last week is a problem rather than a solution.",
          "If a sponsor is funding you: their bank statements, their income evidence such as employment or business income, and a document linking the money to you. A sponsor letter on its own is not enough.",
          "If you are using a loan: the loan agreement or a letter from the lender confirming the amount and the terms. The loan has to be a real facility in your name, and a pre-approval letter that is not drawn down may not be accepted as available funds.",
          "If you have a scholarship or stipend: the award letter, and confirmation of the amount and the payment schedule. Some awards are excluded from being counted, so check the scholarship terms rather than assuming.",
          "Tuition fees: take the figure from your Confirmation of CoE rather than from the offer letter, and check that the CoE figure and the amount you declared line up. An inconsistency here is read as a mismatch across the whole file.",
          "Travel costs: your airfare, or a reasonable estimate of it. The authority expects a figure for the cost of getting to Australia and back.",
          "Dependants: birth certificates or marriage certificates for dependants, school enrolment evidence for school-aged children, and their living cost figures. Dependants with their own documents are the most commonly under-prepared part of an Australian file.",
        ],
      },
      appointments: {
        body:
          "There is no appointment attached to proving financial capacity. It is a documentary checkpoint, and the assessment happens when Home Affairs looks at your application. The two appointments that sit close to it in the calendar are the health examination and the overseas biometrics collection, and both of them will ask you to confirm the same personal details that your financial evidence has to match.",
        points: [
          "The health examination is booked separately and is not part of the application fee. Home Affairs sets out who needs one, and for many applicants it is booked through the My Health Declaration system rather than by going to a clinic directly.",
          "Biometrics and identity documents for applicants lodging overseas are usually collected at a service centre as part of the application process. Your ImmiAccount task list is the authoritative statement of what you still owe, because the requirements are assessed per applicant and per country.",
          "Bring the same identification to every appointment that you used in the financial evidence. A sponsor whose name appears in the account is not the person in the appointment room, and officials do check that the two lines up.",
          "If you are opening a bank account to hold the money, expect that appointment to be the longest lead time of the four checkpoints, and start it before you assemble anything else.",
        ],
        callout: {
          tone: "good",
          title: "Do the boring thing first",
          body: "Opening the account and getting a clean set of statements takes longer than students expect, and every other document depends on it. Start there, and let the rest of the evidence build on top of statements that already exist.",
        },
      },
      money: {
        body:
          "Study Australia states that international student visa applicants must provide proof of at least AUD 29,710. That figure covers travel, twelve months of living expenses and tuition, it is adjusted over time, and it is the number to check on the Home Affairs site at the moment you assemble your evidence, because the version you read in a guide may be out of date by the time you lodge.",
        points: [
          "The AUD 29,710 figure is the current published threshold and it covers the three components together, not each of them separately. The tuition portion for your course is the piece that moves most between students.",
          "The threshold is indexed, so it changes. Read the figure on the Home Affairs student visa page or the Study Australia visa application process page on the day you start assembling, and again if your lodgement slips by months.",
          "What the threshold does not cover is the gap between a visa-passing number and a real one. Rent in a major Australian city, the deposit on a rental bond, course materials, flights home in an emergency, and a first term that starts before your first instalment arrives all sit outside it.",
          "If you are self-funding, the arithmetic is simple: your total available funds must clear the threshold, and the amount above the threshold is what you have to live on for a year. Work out that second number before you lodge, not after.",
          "If you are sponsored, the sponsor's money can count, but the same arithmetic applies to them. Being asked to evidence someone else's income takes longer and is more likely to be queried than evidencing your own.",
          "The threshold is a country-wide number. The cost of living it represents is not, and it was not set with Sydney in mind. Live expenses vary by state and by city, and the site you plan to live in is the one that sets your real budget.",
        ],
        callout: {
          tone: "watch",
          title: "Check the figure, do not trust the guide",
          body: "AUD 29,710 is the published threshold at the time of writing. It is indexed and it moves. The Home Affairs student visa page and the Study Australia visa application process page are where the number in force is published, and that is the number your application will be assessed against.",
        },
      },
      rules: {
        body:
          "Home Affairs says explicitly that a missing or inconsistent document is the main cause of delay and refusal, and that warning applies most directly to financial evidence. The rules below are the ones that most often turn a straightforward application into a request for more information.",
        points: [
          "The money must be available to you. A balance that is visible in a statement but not yours, or a letter of intent with no money behind it, will not be counted.",
          "Availability matters as well as amount. Home Affairs reviews how long the funds have been in place, so a sudden large deposit in the month before you lodge invites a question that stops the clock.",
          "Every number in the financial evidence has to agree with the rest of the application. If your CoE shows one tuition fee and your funding evidence was built on a different one, the application is treated as inconsistent, which is a more serious problem than a missing page.",
          "Scholarships and government stipends are not automatically countable. Some are excluded, and some are counted at a reduced value. Read the award terms.",
          "Dependant costs are added, and dependants need their own documents. The requirement for a family is not the student requirement with a multiplier on it.",
          "Money is not the same as status. Clearing the financial capacity requirement does not make you eligible for a student visa. The Genuine Student requirement, the CoE, the OSHC and the health requirement all have to be satisfied as well.",
        ],
      },
      timing: {
        body:
          "Financial capacity evidence has to be complete before you lodge, not after. Home Affairs will not process an application that is missing it, and a request for more information is added directly to the end of the processing time rather than being resolved quickly.",
        points: [
          "Start the bank statement and sponsorship evidence early. It is the checkpoint with the longest lead time that is entirely under your control.",
          "Refresh the evidence close to your lodgement date. Statements and sponsorship letters that are months old are weaker, and a sponsor's income evidence in particular goes stale quickly.",
          "Re-check the published threshold shortly before you lodge, and again if the application slips. The figure is indexed, and the whole assessment is against the figure in force on the day.",
          "Home Affairs publishes visa processing times for the subclass 500, and they are guidance rather than a guarantee. The realistic planning assumption is that the financial evidence is the last thing standing between you and a lodged application, not a parallel task.",
          "If the application is lodged with everything in place, the money checkpoint is effectively closed. If it is lodged without, it becomes the reason the application stops moving.",
        ],
        callout: {
          tone: "good",
          title: "Assemble it once, assemble it properly",
          body: "The evidence does not need to be perfect, it needs to be complete, current and internally consistent. A tidy folder where the CoE figure, the declared funds and the bank statements agree with each other is what gets an application through assessment without a second round of questions.",
        },
      },
      resources: {
        body:
          "The official material for this checkpoint is on two sites, and both are worth reading before you start rather than after you assemble. Study Australia explains the process in plain language, and Home Affairs sets the rules that are actually applied.",
        resources: [
          {
            title: "Study Australia: how to apply for your visa",
            kind: "official",
            url: "https://www.studyaustralia.gov.au/en/plan-your-move/visa-application-process",
            why: "The official step-by-step of the student visa application, and the page that publishes the financial capacity figure of at least AUD 29,710 that applications are assessed against.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Home Affairs: subclass 500 student visa",
            kind: "official",
            url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
            why: "The visa page the application is actually decided against, including the financial capacity requirement and the current figure in force. Check the number here on the day you assemble.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Check twice, submit once",
            kind: "official",
            url: "https://immi.homeaffairs.gov.au/check-twice-submit-once-subsite/Pages/applying-student-visa.aspx",
            why: "Home Affairs' own advice on the most common reasons a student visa application fails, and how to check a file before you lodge it. Read it once before you assemble and once before you press submit.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study Australia: living and education costs",
            kind: "official",
            url: "https://www.studyaustralia.gov.au/en/life-in-australia/living-and-education-costs",
            why: "Cost of living by city, which is what tells you whether clearing the visa threshold actually leaves you enough to live on. The threshold is a national figure; this is where the real number lives.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Overseas Student Health Cover (OSHC)",
            kind: "official",
            url: "https://www.studyaustralia.gov.au/en/plan-your-move/overseas-student-health-cover-oshc",
            why: "The insurance requirement that sits alongside financial capacity and is one of the four things that has to be in the file before the visa can be granted.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the two official sources that the financial capacity rule is published on, and because they are the clearest for this checkpoint. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "au-gs-requirement": {
    archetype: "visa",
    intro:
      "The Genuine Student requirement replaced the Genuine Temporary Entrant test for applications lodged on or after 23 March 2024. It is not a test you sit and pass. It is four written questions, capped at 150 words each, that you have to answer in English, in the form, and in a way that is consistent with every other document in your application.",
    sections: {
      route: {
        body:
          "The Genuine Student requirement applies to student visa applications, and it replaced the older GTE test for anything lodged on or after 23 March 2024. Home Affairs prefers in-form answers over a separate test, because a test measures intent at a moment in time and the in-form answers can be checked against the rest of the file.",
        points: [
          "The requirement is a statement of intent with evidence attached. The questions cover who you are, why you chose this course at this provider, how the course benefits you, and your study and immigration history. Each answer is capped at 150 words.",
          "Home Affairs prefers the four in-form questions with supporting documents uploaded to ImmiAccount. That is the route to use, and it is the route the published guidance is written around.",
          "The answers are read alongside your Confirmation of CoE, your academic history and your financial evidence. The GS requirement is not a separate test of you; it is a check on whether the whole file is coherent.",
          "There is no pass mark and no fee. What is assessed is whether the answers are genuine, specific and supported, which is a much harder standard to hit than it sounds.",
        ],
        callout: {
          tone: "watch",
          title: "Consistency is the whole test",
          body: "The questions are not judged one at a time. They are read next to your transcripts, your CoE and your financial evidence, and a mismatch between what you write and what your documents show is treated as a problem with the application rather than with the writing.",
        },
      },
      documents: {
        body:
          "The supporting evidence is where the Genuine Student requirement lives or dies. Home Affairs asks for your academic history including any gaps, your employment history, and your immigration history, and expects the answers in the form to line up with what those documents show.",
        points: [
          "Transcripts and awards for every previous course you have taken, not only the ones that ended with a degree. An unexplained gap is far more expensive to explain in a 150-word box than it is in a document.",
          "Evidence explaining any gaps in your study history, such as a work reference, a medical certificate, or a family situation. Home Affairs asks for it directly rather than inferring it from the dates.",
          "Employment evidence: employer letters, payslips, or references describing what you did and when. The dates must match the timeline in your answers.",
          "Immigration history: previous visa applications and refusals, current and past visa grants, and any history of visa overstay or cancellation. Full disclosure here is the only safe policy.",
          "The Confirmation of CoE and the course outline or handbook, which is what makes 'this course at this provider' an answer with evidence behind it rather than a preference.",
          "Anything that supports the benefit you claim: a project, a research interest, a career direction, a return plan. A concrete reason is stronger than an abstract one.",
        ],
      },
      appointments: {
        body:
          "The Genuine Student requirement has no appointment attached to it. It is a written answer in a form, reviewed as part of your application. The appointment that sits closest to it in the calendar is the health examination, and the practical connection between the two is that your answers and your documents have to describe the same person.",
        points: [
          "Home Affairs may contact you if something in the file needs clarification, and that contact comes through your ImmiAccount messages. Treat an unanswered request there the same way you would treat a missed appointment.",
          "The health examination is the appointment that goes wrong most often, because it needs to be booked and attended, sometimes after a request for a chest X-ray, and the timing of the result matters for lodgement.",
          "There is no interview in the Australian student visa process as a matter of course. If you have a genuine question, the practical route is your institution's international student adviser, who can tell you what the file is likely to be compared against.",
          "If you are in Australia and your application needs a further document, the fastest way to resolve it is usually to supply it promptly, because the clock on processing is not paused while a request is open.",
        ],
      },
      money: {
        body:
          "There is no separate money question in the Genuine Student requirement, but there is a money link, and it is the one that catches people. Your financial evidence and your GS answers have to tell the same story about where the money comes from and whether you could actually afford the course you are claiming to have chosen for a specific reason.",
        points: [
          "If your financial evidence shows a large balance funded by a loan that starts after your course begins, your GS answer about why this course will benefit you reads very differently. Make the two consistent.",
          "A funded gap year, a sponsor's condition that you study a particular subject, and a scholarship tied to a specific programme all strengthen the GS answer, because they make your course choice look like a plan rather than a preference.",
          "If you are changing fields to get a visa pathway rather than because the subject interests you, the financial evidence and the course choice are the two things that will not hold up. The honest version is to pick the course you would actually study.",
          "Money cannot be used to explain away a gap in your study history. The two questions are separate: the funds prove you can support yourself, the GS answer explains why you are studying.",
        ],
      },
      rules: {
        body:
          "Home Affairs publishes the format of the requirement precisely, and the format is not a suggestion. The rules below are the ones that cause requests for more information, which is the thing that actually costs you time.",
        points: [
          "Answer each question within 150 words, in English, and only in the form. Other formatting, extra documents inside the answer, and answers written in a different language are the kind of thing that triggers a request for a corrected submission.",
          "Answer in your own words about your own circumstances. Copying a template, reusing an answer from another application, or writing something that reads as though it was written for a visa officer are all visible, and they are visible precisely because the officer is reading for genuineness.",
          "Be specific. 'This course will improve my career' is not an answer. Name the modules, the research group, the placement, the language requirement, the accreditation. Specificity is the cheapest way to look genuine.",
          "Include your study gaps in the form, not only in a document. A gap that you explain in an attached PDF but not in the answer reads as an omission.",
          "Do not leave anything out of the immigration history. Previous refusals and overstays are recorded, and a disclosure is very different from a discovery.",
          "The requirement replaced the GTE for applications lodged on or after 23 March 2024. Older guidance online still describes a test, and following it wastes time and can lead you to a form that no longer exists.",
        ],
        callout: {
          tone: "watch",
          title: "Read the form, not a summary of it",
          body: "The 150-word limit, the English-only rule and the instruction to answer only in the form are the specification of the requirement, and the interface enforces them. People who write a careful 400-word answer and paste it into a 150-word box get it truncated or rejected, and the rejection is silent.",
        },
      },
      timing: {
        body:
          "The Genuine Student requirement is not a hard deadline in the way the health examination or the CoE is, but it does gate the lodgement, and the questions are much easier to answer well when you have your documents in front of you than when you are writing them under time pressure at 1am.",
        points: [
          "Draft the four answers once your academic history is settled, and re-read them when your documents are final. A draft written before your transcripts arrive will not match them.",
          "Do not leave the GS section until after you have uploaded everything else, because the answers are easier to write when the rest of the file already exists and you can see the dates.",
          "If Home Affairs asks for clarification, the request suspends the assessment rather than being resolved in parallel. Answer quickly, and answer completely in one go, because a partial answer produces a second request.",
          "Allow the whole file to sit together. The requirement is judged against your CoE, your OSHC and your financial evidence, so the last piece of evidence you upload changes what the first piece means.",
        ],
      },
      resources: {
        body:
          "There is one official page that defines the Genuine Student requirement, and it is worth reading properly rather than skimming, because the form and the published guidance are not identical things and the form is what counts.",
        resources: [
          {
            title: "Home Affairs: Genuine Student requirement",
            kind: "official",
            url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/genuine-student-requirement",
            why: "The published definition of the requirement, the four questions, the word limit and what supporting evidence is expected. This is the document the answers are written against.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Home Affairs: subclass 500 student visa",
            kind: "official",
            url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
            why: "The visa page that sets the Genuine Student requirement in the context of the rest of the application, so you can see how it is assessed against your CoE and financial evidence.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study Australia: how to apply for your visa",
            kind: "official",
            url: "https://www.studyaustralia.gov.au/en/plan-your-move/visa-application-process",
            why: "The plain-language walkthrough of the whole student visa application, including where the Genuine Student answers sit in the order of things. Useful for checking you have not missed a step.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Check twice, submit once",
            kind: "official",
            url: "https://immi.homeaffairs.gov.au/check-twice-submit-once-subsite/Pages/applying-student-visa.aspx",
            why: "Home Affairs' own guidance on the mistakes that cause refusals and delays, which is where most of the Genuine Student problems actually originate.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official pages that define and explain this requirement, and because they are the clearest available. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "au-visa-lodge": {
    archetype: "visa",
    intro:
      "This is the point at which the application becomes real. Everything you assembled, the Confirmation of CoE, the OSHC, the financial evidence and the Genuine Student answers, is uploaded to ImmiAccount and assessed as one file. Home Affairs says the main cause of delay and refusal is a missing or inconsistent document, so this checkpoint is a consistency check as much as an upload.",
    sections: {
      route: {
        body:
          "The subclass 500 is lodged online, through ImmiAccount, and it is a single application covering the whole family where dependants travel with you. There is no paper form and no postal route, and the identity you create in ImmiAccount has to match your passport exactly, because every document you upload is read against it.",
        points: [
          "The lodgement is the point at which your four prepared elements go in together: CoE, OSHC, financial capacity evidence, and the Genuine Student answers with their supporting documents. An application missing one of them is not assessable.",
          "Family members are lodged in the same application, with their own documents, and a family application is assessed as a family. One member's missing document holds up the others.",
          "ImmiAccount is also where you will receive requests, decisions and the visa grant notice, so it is a working channel for the whole life of the application rather than a form you fill in once.",
          "Identity verification happens in ImmiAccount and can take days. A mismatch in the name, date of birth or passport number between the account and the passport is caught here, and it is much easier to fix now than after lodgement.",
        ],
        callout: {
          tone: "watch",
          title: "Check twice, submit once",
          body: "Home Affairs names this as its own advice and it is the single most useful thing you can do. Open every uploaded document as the officer will see it, check that the dates, names and amounts agree with each other, and read the whole form before you press submit. A lodged application is much harder to correct than an unsubmitted one.",
        },
      },
      documents: {
        body:
          "The upload is the document set. Work through it in the order the tasks appear in your ImmiAccount account, because the account generates the task list from your own circumstances and it is more accurate than any generic checklist, including this one.",
        points: [
          "The Confirmation of CoE, the certificate that ties you to a specific course at a specific provider. It is the spine of the application, and every other document is measured against it.",
          "The OSHC policy certificate, showing your coverage and its start and end dates. The dates matter: coverage that starts after your course or ends before it is a refusal risk, and your provider can usually adjust them for a fee.",
          "Your financial capacity evidence, uploaded in the format Home Affairs asks for. Bank statements, sponsorship evidence, loan documents and scholarship award letters, as applicable.",
          "Your Genuine Student answers and the documents supporting them: transcripts, study history and gap explanations, employment evidence, immigration history.",
          "Your passport details page, and your English language evidence, which must be current at the point of application rather than merely held.",
          "English translations of any document not already in English, with the translator's details. Home Affairs asks for the translator's name, address, phone number and qualifications, and a translation without them is not a translation as far as the application is concerned.",
          "The health examination, if you are required to have one, completed through the My Health Declaration system, and uploaded in the form the declaration produces.",
        ],
        callout: {
          tone: "watch",
          title: "Translations carry the translator's details",
          body: "A translated document with no translator details attached is treated as an untranslated document, and it will be queried. The details required are the translator's name, address, telephone number and qualifications, and they need to be on the document or attached to it.",
        },
      },
      appointments: {
        body:
          "Two appointments sit alongside the lodgement, and both are tracked in ImmiAccount as tasks rather than as calendar entries, which is why students miss them. Neither is optional once the account has issued them, and both can stop the application from being assessed.",
        points: [
          "The health examination, booked through My Health Declaration. It has to be attended at an approved clinic, sometimes with a chest X-ray, and the result has to be in your application before the file can be finalised.",
          "Biometrics and identity document collection for applicants lodging outside Australia, taken at a service centre that Home Affairs assigns. The booking instructions arrive in ImmiAccount, not by email, and waiting for an email that is not coming is a common delay.",
          "Book both as soon as the tasks appear. A health examination slot in a large city can be weeks away, and a service centre booking in peak season takes longer still.",
          "Every appointment is an opportunity for an identity mismatch to be discovered. Arrive with the same passport you used in ImmiAccount and in the financial evidence, and check the name on the appointment matches the name on the passport.",
        ],
      },
      money: {
        body:
          "There are two money questions at lodgement and they are easy to confuse. One is the money you must prove you have, which is the financial capacity requirement and is already dealt with. The other is the money you must pay, which is the application charge for the subclass 500, and that is a separate amount entirely.",
        points: [
          "The subclass 500 application charge is published by Home Affairs on the visa page. It is set in Australian dollars and then converted, so the amount you are charged depends on the exchange rate on the day and the country you are applying from. Check the published figure before you pay, not from an old guide or a forum post.",
          "Paying the charge is not the same as the application being complete. A paid application with missing documents is still incomplete, and it is still the application that gets assessed on what is in it.",
          "Some providers also charge a service fee for the OSHC, and the OSHC premium itself is a real cost that is not part of the financial capacity figure. Budget it separately, because it is money that leaves your account before your course starts.",
          "The visa application charge is not refundable if the application is refused. That is one more reason to spend the time checking the file before you submit rather than after.",
        ],
        callout: {
          tone: "good",
          title: "Pay at the end, not the beginning",
          body: "The charge is set by the authority and the amount is published. What you control is whether the file is complete when you pay, because a complete file is assessed and an incomplete one just accumulates the days.",
        },
      },
      rules: {
        body:
          "The rules that matter at lodgement are about consistency and about the format of the upload rather than the content. Home Affairs is explicit that a missing or inconsistent document is the main cause of delay and refusal, and the checks below are the ones that catch people who assembled everything carefully but uploaded it in a hurry.",
        points: [
          "Everything has to agree. Your CoE, your OSHC dates, your financial evidence and your GS answers describe the same student, the same course and the same money. Where they differ, the officer has to stop and ask, and asking costs you weeks.",
          "Every document has to be legible and complete. A cropped scan of a bank statement showing the balance but not the name, or a photo of a page with the edge cut off, is a document that will be queried.",
          "File names matter more than students expect. Home Affairs asks for documents that are clearly identified, and a folder of files called IMG_4021 tells the officer nothing about what they are looking at.",
          "Do not upload a document you would not want read in a room. Personal correspondence about money, health or family circumstances can be included as supporting evidence, but it is read, and it is read by people assessing whether your file is genuine.",
          "Health examinations are evidence, not paperwork. A health examination completed through the right channel is part of the file; a summary you typed yourself is not a substitute and is treated as an attempt to bypass the requirement.",
          "Lodge once, correctly. A second submission with different information to a first submission creates two versions of your story, and the officer reads both.",
        ],
      },
      timing: {
        body:
          "Home Affairs publishes processing times for the subclass 500 and they are expressed as a range, because a complete file and an incomplete file are handled very differently. The realistic planning assumption is that the lodgement date plus the published range plus a margin is your arrival date, and that any request for more information adds to the end of it.",
        points: [
          "Create the ImmiAccount early, well before you intend to lodge. Identity verification can take days, and you cannot upload anything without a verified account.",
          "Book the health examination and the biometrics appointment as soon as the tasks appear, and treat their availability as part of your critical path rather than as something to sort afterwards.",
          "Check the published processing time for the subclass 500 for your country and your stream on the Home Affairs visa page, and build your travel plans around the slow end of it rather than the middle.",
          "Lodge complete. An application lodged with everything in place is measured against the published processing time. An application lodged with a gap is measured against the time it takes to identify the gap, ask about it, and receive your answer.",
          "Watch your ImmiAccount messages daily in the first fortnight after lodgement. A request for additional documents that sits unanswered for a week is a week of processing time you gave away.",
        ],
        callout: {
          tone: "good",
          title: "Lodge complete, then watch it closely",
          body: "After lodgement your job is small and specific: keep the application consistent, answer anything asked within days, and keep the grant notice safe when it arrives. The hard work is done, and the thing that most often goes wrong now is a slow reply to an email in the system.",
        },
      },
      resources: {
        body:
          "The lodgement is where the official guidance stops being general and becomes specific, and both of the pages below are worth reading in full rather than skimmed, because they are the pages Home Affairs is quoting when it says a file was incomplete.",
        resources: [
          {
            title: "Home Affairs: applying for a student visa",
            kind: "official",
            url: "https://immi.homeaffairs.gov.au/check-twice-submit-once-subsite/Pages/applying-student-visa.aspx",
            why: "The authority's own guidance on lodging a student visa application, written to explain the mistakes that cause refusals. This is the page to work through before you press submit.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Home Affairs: subclass 500 student visa",
            kind: "official",
            url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
            why: "The visa page with the current application charge, the processing times and the full list of what has to be in the file. Check the charge here rather than trusting a number you read elsewhere.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study Australia: how to apply for your visa",
            kind: "official",
            url: "https://www.studyaustralia.gov.au/en/plan-your-move/visa-application-process",
            why: "The same application explained in plain language, including the order of the steps and the health requirement, so you can check nothing is missing before you open ImmiAccount.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Home Affairs: arranging your health examination",
            kind: "official",
            url: "https://immi.homeaffairs.gov.au/help-support/meeting-our-requirements/health/arrange-your-health-examinations",
            why: "How the health requirement actually works, who needs it and what the process involves. It is the appointment most likely to delay a file, and it is easier to handle when you know what it involves.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ImmiAccount",
            kind: "app",
            url: "https://online.immi.gov.au/ola/app",
            why: "The portal the whole application lives in, including your task list, your messages and your decision notice. Bookmark it, because every communication about this application arrives here.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official pages Home Affairs itself points students at, and because they are the clearest for this checkpoint. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "au-visa-decision": {
    archetype: "visa",
    intro:
      "The grant notice is the document that turns an application into a visa, and it is also a document that has to be read rather than filed. It records your course, your provider and the date your visa expires, and a mismatch between the grant notice and what you are actually enrolled in is the start of a lot of later trouble.",
    sections: {
      route: {
        body:
          "A successful subclass 500 application produces a visa grant notice in your ImmiAccount, and the same notice serves as the physical evidence of the visa. There is no sticker in a passport for this one, and there is no separate entry visa. The notice is both the visa and the record of what you were granted it for.",
        points: [
          "The grant notice records the course, the provider, the visa conditions and the expiry date. Those four things define what you are allowed to do in Australia and for how long.",
          "It is also the document your provider will ask for. At enrolment, the university checks that you hold a visa for the course you are enrolling in, and a grant notice that names a different course is a problem you solve at the worst possible moment.",
          "The notice is issued digitally through ImmiAccount, and the PDF you download is the version that counts. Save it somewhere that is not only your email, because you will be asked for it repeatedly.",
          "There is no appeal against a refusal in the way there is in some systems, but there is a review process for a decision that appears wrong. That process has strict time limits attached, so a refusal deserves a fast, careful read of the reasons.",
        ],
      },
      documents: {
        body:
          "What arrives is one document. What you do with it is a short list, and the list matters more than the document because the document does not change and the consequences of ignoring it do.",
        points: [
          "The visa grant notice itself, downloaded and stored. Take a printed copy to enrolment and keep a digital copy in more than one place, including offline.",
          "Your Confirmation of CoE, which you should already hold, so you can check the course on the notice against the course on the CoE. They should match exactly, including the campus.",
          "Your enrolment confirmation from the provider, which is the other half of the same check.",
          "Your OSHC policy, with its start and end dates visible, so you can confirm the cover runs for the whole period of your stay.",
          "The arrival plan: accommodation confirmation, flights, and the contacts you will need on day one. The visa is the last piece of the puzzle, not the whole of it.",
        ],
        callout: {
          tone: "watch",
          title: "Read the notice on the day it arrives",
          body: "Check the course name, the provider, the campus if there is more than one, and the expiry date, and compare each one to your CoE and your enrolment. It takes five minutes and it is the moment when a change is still cheap to make.",
        },
      },
      appointments: {
        body:
          "There is no appointment for the decision itself. What follows it is the provider's enrolment process, and enrolment is where the details on the grant notice get tested against the details on your offer.",
        points: [
          "Enrolment appointments or online enrolment steps are set by your provider and they are tight. The university expects you to have your visa before it enrols you, and enrolment is often the first point at which a problem surfaces.",
          "Your provider may ask you to attend an orientation or an information session that includes a visa status check. Bring the grant notice with you.",
          "If the course details on the notice do not match, talk to your provider before you do anything else. Changing your course after the visa is granted is a variation process with its own requirements, and doing it quietly is how students end up with a visa that does not cover what they are studying.",
          "Keep an eye on the expiry date as a date, not a formality. A visa that has lapsed while you are still studying is a serious problem, and the renewal is not automatic.",
        ],
      },
      money: {
        body:
          "The grant does not change your money position, which is the point that catches people who assume the visa sorts everything. The financial capacity evidence was a test of whether you could support yourself. Now you have to actually do it, and the bill starts arriving.",
        points: [
          "Tuition instalments are due to the provider on the schedule set out in your CoE, and those dates are usually earlier than the start of teaching. The first instalment is often the one that lands before the money in the blocked or saved account has been released to you as spendable.",
          "OSHC premiums are payable and the policy has to be kept in force. A lapse in cover is a visa condition breach as well as a cost problem.",
          "Living costs continue to be yours. The financial capacity figure was a floor, and the gap between the floor and your real budget is still there after the visa is granted.",
          "If you have dependants, their costs and their own visa conditions follow the same pattern, and the family's combined financial evidence was assessed on that basis.",
        ],
      },
      rules: {
        body:
          "The grant notice carries conditions, and the conditions are not decoration. Most subclass 500 visas are granted subject to health, character and genuine student requirements, and those are continuing obligations rather than things you satisfied once and filed away.",
        points: [
          "The visa must cover the whole of your course plus any planned leave. If the expiry date does not reach the end of your enrolment, you have a problem to solve with your provider, and the conversation needs to happen early.",
          "Your circumstances can change and you are expected to tell Home Affairs. A change of course, a change of provider, a change in your personal circumstances that affects the character or genuine student assessment, and a change of address all fall into this, and the specifics of what must be notified are on the visa page.",
          "Ask your provider what they need from you if the course changes after the grant, and ask Home Affairs what they need. The two answers are not always the same, and you need both.",
          "Work rights in Australia are attached to the visa and its conditions, and they are set by the current rules rather than by the notice. If work is part of your plan, check the current work conditions rather than assuming them from the date you applied.",
          "The visa does not outlive the enrolment. If you withdraw from the course, the basis for the visa goes with it, and a student who leaves without telling anyone creates a problem that is much worse than the one they were avoiding.",
        ],
        callout: {
          tone: "watch",
          title: "Changes have to be reported",
          body: "Course, provider, address, and anything that changes the answers you gave to the Genuine Student questions. Home Affairs sets out what must be notified and how, on the student visa page, and a change that is not notified is a breach of the visa rather than an administrative detail.",
        },
      },
      timing: {
        body:
          "The grant notice is a date-driven document. The expiry date, your enrolment dates, your tuition payment dates and the lead time for any change you might need all sit on the same timeline, and they are the ones that decide whether your first year in Australia is calm or difficult.",
        points: [
          "Read the expiry date first and put it in your calendar with a reminder set well before it. The date that matters is the end of your authorised stay, and it is not the same as the end of your course if you have leave planned.",
          "Enrolment deadlines at the provider are set by the provider and are usually earlier than the visa expiry, which is correct: the visa is the outer boundary, not the deadline.",
          "If you might need to extend, change course or add leave, find out the lead time from Home Affairs and your provider now, not in month nine. Extension applications take time to prepare and to assess, and you cannot backdate them.",
          "Some visa conditions are linked to a fixed number of years of study, and the remaining entitlement depends on the level of your course and how much you have already completed. Check the conditions on your notice for anything time-limited.",
        ],
        callout: {
          tone: "good",
          title: "Three dates, one calendar",
          body: "The visa expiry, the last day of enrolment and the final tuition instalment date. Put all three in one calendar entry with reminders, and check the visa expiry first. Everything else in your Australian year is easier when those three do not collide.",
        },
      },
      resources: {
        body:
          "Once the visa is granted, the useful official material changes: you need the page that describes your rights and conditions rather than the page that describes how to apply. The grant notice itself is the record of what you were granted, and the visa page is where the conditions are explained.",
        resources: [
          {
            title: "Home Affairs: subclass 500 student visa",
            kind: "official",
            url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
            why: "The visa's own page, which sets out the conditions attached to the grant, what you must notify and how, and the rules on work and stay. This is the page to read on the day the notice arrives.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study Australia: how to apply for your visa",
            kind: "official",
            url: "https://www.studyaustralia.gov.au/en/plan-your-move/visa-application-process",
            why: "The plain-language summary of the same process, useful for checking the grant against what was supposed to happen. It also links to the first-week and preparing-to-travel guidance you will want next.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Overseas Student Health Cover (OSHC)",
            kind: "official",
            url: "https://www.studyaustralia.gov.au/en/plan-your-move/overseas-student-health-cover-oshc",
            why: "The cover that has to stay active for your whole stay, and the page that explains what a policy certificate should show. Check the dates on it against the expiry date on your grant notice.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study Australia: preparing to travel",
            kind: "official",
            url: "https://www.studyaustralia.gov.au/en/plan-your-move/preparing-to-travel",
            why: "The official pre-departure and arrival guidance, including what to carry and what to do in your first week. It is the natural next step once the grant notice is in your hand.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official pages that carry the conditions attached to your visa, and because they are the clearest available. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },
};

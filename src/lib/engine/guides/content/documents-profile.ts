import type { GuideContent } from "../types";

const V = "2026-10-20";

/**
 * The documents and academic record dossier.
 *
 * Almost every later checkpoint in a plan is an assembly job, and the parts
 * come from here: the CV, the transcript set, the certified translations, the
 * degree certificates. The documents themselves are rarely the hard part. The
 * hard part is that they are produced by other institutions, on their timetable,
 * in a format that has to survive a second reading by an admissions office and
 * a third reading by an immigration authority.
 *
 * Four things recur across every country, and they are what this dossier keeps
 * coming back to:
 *
 *   1. LEAD TIME IS THE REAL DEADLINE. A transcript is not a download. It is a
 *      request to a registrar who is not expecting it, and the sealed envelope
 *      arrives when their process says it arrives.
 *   2. OFFICIAL IS A SPECIFIC TERM, and each country defines it differently.
 *      A sealed envelope, a secure e-transcript, a certified true copy, a
 *      sworn translation: these are not interchangeable, and a document that is
 *      official in one sense is worthless in another.
 *   3. TRANSLATION IS NOT CERTIFICATION. A translation without a certification
 *      attached to it is a convenience, and admissions offices treat it as one.
 *   4. THE DOCUMENTS ARE CROSS-CHECKED. Your name, your dates, your
 *      qualifications and your passport have to agree with each other, and a
 *      mismatch here is read as something other than an administrative slip.
 */
export const DOCUMENTS_PROFILE: Record<string, GuideContent> = {
  "us-profile-cv": {
    archetype: "documents-profile",
    intro:
      "The US academic record is the one thing every later checkpoint is built from, and the one thing that cannot be produced quickly. One clean academic CV, official transcripts from every university you have attended, a degree certificate for each qualification, and a certified English translation of anything not in English. Get it in place now and every essay, recommendation and financial evidence form later in the plan is assembled from the same file.",
    sections: {
      inventory: {
        body:
          "Four items, and only one of them is the CV. Stanford's Computer Science department states that a CV must be uploaded in the online application, which is a useful reminder that the CV is a required document in its own right and not a European-style attachment. The other three are produced for you by institutions that have never heard of your application.",
        points: [
          "The CV. One to two pages, academic, and organised around education, coursework, research, projects and technical skills. Not a two-page resume written for an industry role, and not a personal statement.",
          "Official transcripts. Requested from every university you have attended, not only the one that issued your most recent degree. The full academic history is what a US admissions office expects to read.",
          "Degree certificates. Separate from transcripts, and frequently the document that actually proves you completed a qualification rather than attended a course.",
          "Certified English translations. For every transcript and certificate that is not in English. Plan for this now, because it is the item with an external supplier and a queue.",
          "A credential evaluation, only if a programme asks for one. Do not order one speculatively: it costs money, it takes weeks, and it is valid for the assessment you requested rather than for every programme on your list.",
        ],
        resources: [
          {
            title: "Stanford CS: master's admissions FAQ",
            kind: "official",
            url: "https://www.cs.stanford.edu/admissions/masters-admissions-frequently-asked-questions",
            why: "The page behind this milestone's checkpoint. It states the CV requirement in the context of a real US computer science master's application, so you can see what a programme expects rather than guessing.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Educational Credential Evaluators",
            kind: "tool",
            url: "https://www.ece.org/",
            why: "One of the two credential evaluation services that US universities most often name when they want a US-equivalent read on a foreign transcript. The point of looking here first is that you can see what a completed evaluation contains before you pay for one.",
            verifiedOn: V,
          },
          {
            title: "Study in the States: certified school search",
            kind: "official",
            url: "https://studyinthestates.dhs.gov/school-search",
            why: "The US Department of Homeland Security's own list of SEVP-certified schools, with the visa type each is certified to enrol. If a programme is not on this list you cannot get an F-1 for it, and that is worth knowing before you write a single essay.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "College Navigator",
            kind: "tool",
            url: "https://nces.ed.gov/collegenavigator/",
            why: "The US Department of Education's official directory of institutions, including the degrees each one awards and the delivery mode. Useful for checking that a programme is really an on-campus degree and finding out what else the university teaches.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official sources the decisions are actually made against, and because they are free. We take no payment for placement, and we do not take payment for anything. If a provider asks you for a code in exchange for a link on this page, that is not us.",
        },
      },
      formats: {
        body:
          "The US academic CV has its own conventions, and students arriving from a UK or European CV cut it in the wrong places. It is longer than a resume, denser than a personal statement, and it does not carry the personal data a British CV does. Transcripts have two official forms, and they are not interchangeable.",
        points: [
          "One to two pages, no photograph, no date of birth, no marital status, no religion, no national identification number. US universities do not ask for these, and many have policy against receiving them.",
          "Coursework is listed with the grades you received. Where the grading scale is unusual, say so on the page, because a 78% and a 78% mean different things in different systems.",
          "Undergraduate research, teaching assistant work, publications and substantial software projects carry more weight than short-term employment. A CV with one strong project beats a CV with six lines of internships.",
          "Official transcripts travel in one of two ways. Either the registrar mails a sealed envelope with the university stamp and a signature across the seal, so that opening it breaks the evidence, or you request a secure e-transcript issued by that university and verifiable by the receiving admissions office.",
          "A PDF you download from a student portal is not an official transcript. A scan of a sealed envelope is not one either. If a programme asks for official transcripts, it means one of the two routes above.",
        ],
        callout: {
          tone: "watch",
          title: "Two forms of official, and no third",
          body: "US programmes ask for unofficial transcripts with the application and official ones after an offer, and the two are different documents. Unofficial means whatever your own portal will give you. Official means a sealed envelope or a secure e-transcript issued by the university. If you upload a download and call it official, the offer is made conditional on a document you have not actually sent.",
        },
      },
      translation: {
        body:
          "Any document not in English needs a certified translation, and the certification is the part the admissions office is checking. A translation without it is treated as a convenience rather than as evidence, and it is read the same way as no translation at all.",
        points: [
          "A certified translation normally carries a signed statement that it is an accurate translation of the original, the translator's full name, signature, date and contact details, and some evidence of the translator's qualifications. The exact list varies by university, so read the programme's own document requirements rather than a general rule.",
          "Send the original document as well as the translation. Submitting the translation on its own does not work, because nobody can check it against anything.",
          "Self-translation is not accepted, however accurate it is. You cannot certify your own transcript, and a translation you produced will be returned.",
          "Certified and notarised are different things and one does not imply the other. A notarised copy proves a signature or a seal is genuine; a certified translation attests to the accuracy of a translation. Some programmes ask for both, so check which one you actually need.",
        ],
        callout: {
          tone: "watch",
          title: "A translation you paid for is not a certified translation",
          body: "Anyone can translate a transcript. What an admissions office needs is somebody qualified to stand behind the accuracy of that translation, in writing, with their credentials attached. Commissioning a machine translation, or a friend, or a classmate, produces a document that will be sent back to you and cost you a week of the timeline.",
        },
      },
      expiry: {
        body:
          "Transcripts do not expire, but the window in which you can obtain one does. Everything here is about lead time, and about the fact that the university and the immigration authority will read your documents against each other and against your passport.",
        points: [
          "Official transcripts are produced on request, and the request can take weeks. If your application is conditional on official transcripts being received by a date, you needed to ask for them well before that date rather than on it.",
          "Your name must match your passport exactly, character for character, including middle names and the order of names. This is one of the most common reasons a visa interview asks for further evidence, and it is trivial to prevent and expensive to fix.",
          "If your qualification was awarded under a different name, support it with the change of name evidence: a marriage certificate, a deed poll, a gazette notice. An unexplained mismatch reads as an unexplained mismatch.",
          "A credential evaluation is valid for the assessment you asked for, not for every programme and not for every purpose. Check what you commissioned before you attach it to an application.",
          "Keep the physical sealed envelopes. If a programme asks for official transcripts to be mailed after an offer, you will need the real thing, and you cannot re-print a sealed envelope.",
        ],
        callout: {
          tone: "watch",
          title: "Order the oldest transcripts first",
          body: "The universities you attended earliest are the slowest to respond, and some of them have no electronic transcript service at all. A single unresponsive registrar can hold up an application that is otherwise complete and persuasive. Send every request in the same week, oldest first, and ask each one what their turnaround is.",
        },
      },
    },
  },

  "us-documents-upload": {
    archetype: "documents-profile",
    intro:
      "This is the checkpoint where US applications fail on completeness rather than merit. Most programmes let you upload unofficial transcripts with the application and ask for official ones only after an offer, so this is two jobs at once: upload everything in the shape the portal wants, and keep the official version in motion so it can arrive when the condition is cleared.",
    sections: {
      inventory: {
        body:
          "What actually goes in the upload is narrower than what you have. Most US graduate portals want a CV, transcripts for every degree, a statement of purpose, a few letters, and the language test result if the programme wants it at that stage. The documents that are missing from that list are the ones that decide whether the application is complete.",
        points: [
          "Unofficial transcripts for every degree you hold. Upload each one as its own file, from the issuing university, not from a summary you compiled yourself.",
          "The CV, in the format the programme publishes. If the department publishes a template or a page limit, use it.",
          "English translations of any transcript or certificate not in English, uploaded alongside the original language document rather than instead of it.",
          "The statement of purpose and the recommendation letters, if the programme collects them in the same portal. Many CS departments collect letters through a separate service, so check which one is which.",
          "A tracking note. For every document you still do not have, write down who is producing it and when they said they would produce it. This is the part that turns a scramble into a plan.",
        ],
        resources: [
          {
            title: "Stanford CS: graduate application checklists",
            kind: "official",
            url: "https://www.cs.stanford.edu/admissions/graduate-application-checklists",
            why: "The page behind this checkpoint. It sets out the document-by-document checklist for a US graduate application, including which items are unofficial at application stage and which arrive later, which is exactly the distinction this milestone is about.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study in the States: student forms",
            kind: "official",
            url: "https://studyinthestates.dhs.gov/students/prepare/student-forms",
            why: "The DHS page that separates what the university needs for admission from what the immigration process needs from you. Worth reading before you upload, because the two sets overlap only partly.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Educational Credential Evaluators",
            kind: "tool",
            url: "https://www.ece.org/",
            why: "The credential evaluation service many US programmes name. If one of your shortlisted programmes requires an evaluation, this is where you find out what the finished product looks like and how long it takes.",
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "These are the official checklists and directories the decisions are made against, and they cost nothing. We take no payment for placement, and we do not take payment for anything.",
        },
      },
      formats: {
        body:
          "Upload formats are chosen by the portal, not by you, and fighting the portal is a common way to lose a week. What you control is the clarity of the file and the consistency of the identity in it.",
        points: [
          "Follow the portal's own format instructions exactly: file type, file size, whether documents are combined into one PDF or uploaded separately, and whether the filename matters. Some portals specify a naming convention and some reject files that do not follow it.",
          "Scans need to be legible end to end. A transcript that is cut off at the bottom of the page, or a certificate with a signature lost in the compression, is treated as a missing page.",
          "Combine into one PDF only where the portal tells you to. Where it asks for separate uploads, separate uploads are what it is expecting to read.",
          "Name the files the way the portal suggests, and keep the same file on your own machine under the same name. You will be asked for the same document again at enrolment, and a consistent naming scheme saves an hour of guessing.",
        ],
        callout: {
          tone: "watch",
          title: "A complete file is not the same as a complete application",
          body: "The most common reason a US application is rejected for incompleteness is not a missing document. It is a document that arrived but does not say what the programme needs to see: a transcript with no degree awarded on it, a CV with no page two, a letter from a referee who did not know your work. Read each uploaded file once as if you were the admissions officer.",
        },
      },
      translation: {
        body:
          "Translations in the upload are the same translations you should have commissioned at the start of the plan, and the point of mentioning them here is that the upload is where a missing one becomes fatal. A program that is otherwise complete can be closed out for a missing translation, and it is often closed without an explanation.",
        points: [
          "Upload the original language document and the certified translation as two separate files, or as one file in the order the programme specifies. Do not merge them into a single scan if the portal asks for both.",
          "Check that the translation reproduces the layout of the original. A translation that reorders the transcript into a tidy table is no longer a translation of that transcript, and admissions offices can tell.",
          "Make sure the translator's certification statement is on the document and not on a separate cover note, unless the programme says it accepts one.",
          "If your institution issues a bilingual transcript, keep it, but do not assume it replaces a certified translation. Plenty of programmes have been explicit that a bilingual transcript still needs a certified English translation.",
        ],
        callout: {
          tone: "watch",
          title: "The translation is the last thing to arrive and the first to be missed",
          body: "Everything else in this checklist is something you control on the day you upload. A certified translation is something a third party produces for you, on their timetable. If you have not commissioned it, the upload is incomplete and there is no way to fix it in the portal.",
        },
      },
      expiry: {
        body:
          "The dates that matter here are the two-stage ones: the application deadline, and the post-offer deadline for official documents. Students plan for the first and get caught by the second, because the second usually sits much closer to the start date than the first does.",
        points: [
          "The application deadline is the date the portal closes to new submissions. Upload early, because portal traffic concentrates on the last day and a late upload can fail for a technical reason and not a substantive one.",
          "The post-offer deadline for official transcripts is a condition of the offer, and it is usually a few months after enrolment starts rather than before it. Read the offer letter for that date and work backwards.",
          "If the offer is conditional on an English test, a credential evaluation, or a supervisor's sign-off, each of those has its own turnaround, and the offer will not go unconditional until all of them land.",
          "Your name has to match across the CV, the transcripts, the test result, the portal record and your passport. The portal lets you type your name as you like it; the documents will not agree with it if you improvise.",
          "If you are admitted to a start date and then find that a document cannot be produced in time, contact the programme rather than letting the condition lapse. A condition cleared late is nearly always survivable; a condition ignored is not.",
        ],
        callout: {
          tone: "watch",
          title: "The post-offer deadline is the one that catches people",
          body: "Most US master's offers are conditional, and the conditions are clearances rather than decisions: official transcripts received, a score sent, a document uploaded. Each takes days or weeks that you do not control. The universities publish the deadline; almost nobody reads it until the email arrives.",
        },
      },
    },
  },

  "gb-profile-cv": {
    archetype: "documents-profile",
    intro:
      "UK applications are document-heavy, and any document that is not in English usually needs a certified translation on top of the original. The CV is the part people over-invest in and the transcripts are the part that actually delay applications, because a registrar has to be asked and then has to post something.",
    sections: {
      inventory: {
        body:
          "The UK set is: an academic CV, official transcripts and degree certificates from each institution, certified English translations where the issuing language is not English, and your academic references ready to submit online. That last one is not paperwork, it is a deadline, and UK universities usually expect the reference to arrive with the application rather than after it.",
        points: [
          "An academic CV, focused on modules, grades and projects. Two pages is the usual length and many programmes publish a tighter limit.",
          "Official transcripts and the degree certificate for each qualification. Some programmes accept a transcript that lists the degree as 'anticipated' or 'in progress' if you are still finishing; most do not, once you have graduated.",
          "Certified English translations of anything not issued in English, which is the normal case for most of the world.",
          "Your academic references, with the names and email addresses of two or three people who know your academic work, ready to be entered into the application form on the day you submit. You do not send the letters; the referee does, and that takes a week.",
          "Your passport and the name on it, because the university will check the application against it later, and a name you had at university that is not the name on your passport needs evidence.",
        ],
        resources: [
          {
            title: "GOV.UK: documents you need to apply for a Student visa",
            kind: "official",
            url: "https://www.gov.uk/student-visa/documents-youll-need-to-apply",
            why: "The immigration side of the same document set. Read it alongside the university's list, because the two overlap without being identical and the visa list is the one that is published centrally.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "UCAS: entry requirements for UK courses",
            kind: "official",
            url: "https://www.ucas.com/international/international-students/applying-to-university-as-an-international-student/entry-requirements-for-uk-courses",
            why: "The clearest published statement of what a UK postgraduate admissions office is looking for, including how qualifications from other countries are assessed and where translations fit. It is the standard, not one university's version of it.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "UCAS postgraduate",
            kind: "official",
            url: "https://www.ucas.com/postgraduate",
            why: "The route to the course finder and the postgraduate application guidance in one place. Use it to see what a course publishes about its entry requirements before you email the department asking.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the officially published requirements rather than a university's paraphrase of them, and because they are free. We take no payment for placement, and we do not take payment for anything.",
        },
      },
      formats: {
        body:
          "The UK academic CV is closer to the US one than students expect, but the differences that matter are in the grading and the personal data. UK universities read your transcript more carefully than US admissions offices do, because the degree class is a formal category in the UK and not in most other systems.",
        points: [
          "No photograph, no date of birth, no nationality, no marital status. British CVs sometimes carry these, but British academic CVs do not, and sending a photo to a UK admissions office is a mistake that has to be queried.",
          "List each module with its credit weighting and your mark. UK admissions offices often ask for the credit total so they can check the programme's own entry rule, so give it rather than making them add it up.",
          "State the degree class if you have one, and the classification scale your university used. A first from an institution on a different scale is not automatically equivalent to a first elsewhere, and saying so is more useful than leaving them to guess.",
          "Order the CV in reverse chronology, with education first, then research, projects, employment and skills. Keep it to the length the programme publishes rather than the length you think your career deserves.",
          "Transcripts normally come either from the registrar as a PDF with a verification link, or as a sealed physical copy. Ask the university what it accepts before you pay for the wrong one.",
        ],
        callout: {
          tone: "watch",
          title: "Degree class is read, not just noticed",
          body: "A UK programme will check your transcript against its own entry rule, which is often written as a degree class plus a module-level condition. An unweighted average, a percentage, a CGPA and a class are four different things, and the admissions office wants the one that matches its rule. Say which is which on the CV.",
        },
      },
      translation: {
        body:
          "UK universities are specific about what a certified translation has to contain, and the specification is not the one people assume. The most common rejection is a translation that is accurate and properly done but does not carry the elements the university asked for.",
        points: [
          "The usual requirement is a full translation accompanied by a confirmation from the translator or translation company that it is an accurate translation of the original, the date of the translation, the translator's full name and signature, and the translator's contact details.",
          "The translator's qualifications matter too, and many universities specify that the translator must be a professional, a member of a named professional body, or a person with a relevant qualification. Check the programme's wording rather than assuming a sworn translator elsewhere in the world qualifies.",
          "Send the original document together with the translation. A translation on its own has nothing to be checked against.",
          "Some universities will accept a translation you arrange yourself, as long as somebody competent certifies it. Some will not, and will ask for the translation to come from a specific route. This is a question to ask the admissions office in writing before you spend anything.",
          "If your qualification also needs a formal statement of comparability to a UK degree, that is a separate process from translation, and it is a separate cost. Ask the university whether it needs one; many admissions decisions for taught master's do not require it.",
        ],
        callout: {
          tone: "watch",
          title: "Accurate is not the same as acceptable",
          body: "A perfect translation that lacks the translator's signature, date, contact details or confirmation statement is still returned. The certification elements are not decoration, and they are the part students forget when they translate quickly to meet a deadline.",
        },
      },
      expiry: {
        body:
          "UK documents do not have published validity periods, but they do have deadlines, and the ones that bite are the reference deadline and the conditional-offer clearance. These are the dates that actually end applications.",
        points: [
          "A UK offer is usually conditional and states the deadline for clearing each condition. Official transcripts, a certificate of the English test, and sometimes a formal certificate of prior qualification are all cleared by a date, and the date is in the offer letter.",
          "English test results have their own validity, and the Home Office applies a six-month rule to the visa side: the test must be within six months of the date you submit the visa application. That is separate from what the university will accept, which is often a longer window.",
          "The academic reference is the condition most likely to be missed, because you are waiting on someone else. Approach referees early, give them a deadline, and give them a paragraph about you and your project rather than a blank form.",
          "If you are still studying, the transcript you have now is not the one you will be asked for. Ask the admissions office whether it will accept a transcript with your final year marked as in progress, and what it needs at the point the award is confirmed.",
          "Keep every document you have submitted. When the enrolment paperwork and the visa application both arrive in the same month, re-ordering a transcript at short notice is a bigger problem than it should be.",
        ],
        callout: {
          tone: "watch",
          title: "The reference is the condition you do not control",
          body: "You can produce a transcript by asking for it. You cannot produce a letter from a professor who is on a field trip. Approach referees the day you accept the offer, tell them the exact date their letter is needed by, and make it easy for them to write something good about you.",
        },
      },
    },
  },

  "ca-profile-cv": {
    archetype: "documents-profile",
    intro:
      "Canadian graduate applications expect a short, dense CV and a complete academic history, including the parts of it that do not look good. Both the university and the study permit reviewer read the same history, and a gap you have not explained is a gap they will ask about.",
    sections: {
      inventory: {
        body:
          "The Canadian set is: a two-page academic CV, official transcripts from every institution attended, a document for every study gap longer than two months, and certified English translations for anything not in English. The gap documents are the part students forget, and they are the part that turns into an extra request for evidence weeks later.",
        points: [
          "A two-page academic CV listing coursework, grades, research and technical projects, in the North American format rather than the European one.",
          "Official transcripts from every institution, requested directly. Canadian universities want the issuing institution's own document, not a certified copy of a scan.",
          "A written explanation for every gap in study longer than two months, with dates, and with what you were doing. This is asked for at the university and again for the study permit, and the two answers should be the same.",
          "Certified English translations for non-English transcripts, and the original documents with them.",
          "Your current study and residence status if you are already in Canada, because it affects both the deadline you are working to and the permit you will need later.",
        ],
        resources: [
          {
            title: "Toronto Metropolitan University: graduate application dates",
            kind: "official",
            url: "https://www.torontomu.ca/graduate/future-students/application-dates/",
            why: "The page behind this checkpoint, and a good example of a Canadian graduate department publishing its own dates, document expectations and first-consideration cut-offs in one place rather than making you email for them.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "IRCC: documents for a study permit",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents.html",
            why: "The immigration authority's own list of what the study permit needs, including its rules on translations and on how recent documents must be. It is a different list from the university's, and you will be asked against both.",
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
            title: "IRCC: translation of supporting documents",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/operational-bulletins-manuals/standard-requirements/translation.html",
            why: "The immigration authority's own standard, and the strictest version of the rule you will meet: who may translate, what a certified translator is, and the rule that translations cannot be done by the applicant, by family members, or by the applicant's paid representative.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the published requirements the applications and permits are decided against, and because they are free. We take no payment for placement, and we do not take payment for anything.",
        },
      },
      formats: {
        body:
          "North American academic CVs are two pages, carry no personal data and are dense with specifics. Canadian departments read the transcript closely against published entry requirements, so the format of the transcript matters as much as the format of the CV.",
        points: [
          "Two pages. No photograph, no date of birth, no marital status, no nationality, and no statement about why you want to study in Canada unless a programme asks for it.",
          "Undergraduate coursework with grades, then research, then technical projects, then any teaching or work experience. Canadian admissions offices weight undergraduate performance heavily for master's programmes, so it belongs near the top.",
          "Official transcripts arrive from the issuing institution by secure e-transcript or by sealed mail. A student-portal download is usually not accepted as official.",
          "Where your institution uses a different grading scale from the one the programme expects, state the scale and, if you can, the percentile or the equivalent the programme publishes. A high grade that looks low is still a high grade, but only if you explain it.",
          "Publish or keep a working transcript PDF that you can upload at a moment's notice. Every Canadian application portal asks for it, and reordering from a registrar takes longer than the portal's upload window.",
        ],
        callout: {
          tone: "watch",
          title: "Your transcript is read against a published rule",
          body: "Canadian programmes state entry requirements in terms that a transcript can be checked against: a minimum average, a required course, a minimum grade in a specific subject. If your grading scale or your course naming differs, the check fails silently. A short note explaining the scale removes the whole category of problem.",
        },
      },
      translation: {
        body:
          "Certified translations in Canada follow a pattern the immigration authority publishes, and universities generally match it. The key rule is independence: the certificate has to come from somebody who is not you, not a relative and not your paid representative.",
        points: [
          "A certified translation normally includes the translator's statement that it is a complete and accurate translation of the document, the translator's full name, signature and contact details, their certification, and the date. IRCC requires the certification to be confirmable by a seal or stamp showing the translator's membership number with a professional translation association in Canada or abroad.",
          "IRCC's own rule is the strictest one you will meet, and it is worth knowing before you have anything translated: translations must not be done by the applicant, by a member of the applicant's family, or by the applicant's paid representative or consultant. A relative who is a professional translator is still not permitted to translate for you.",
          "The original document goes in with the translation, and if the original is in a language other than English or French, a further translation into one of those may be asked for. Check the programme's own list for whether it accepts French as well as English.",
          "Documents issued in a language with a non-Latin script sometimes need a certified translation of the certification itself, or a copy of the translator's credentials attested by a Canadian authority. Ask before you commission the work, not after.",
        ],
        callout: {
          tone: "watch",
          title: "Do not translate your own documents, and do not let a relative do it",
          body: "This is the most common reason a Canadian application is held up at document check, and it is entirely avoidable. The translator has to be independent of you. A relative's certificate is not a certification, and the file comes back to you with a request you will have to answer in the same week it was supposed to be finished.",
        },
      },
      expiry: {
        body:
          "Canadian applications turn on dates rather than validity periods. The first-consideration date, the final deadline, the funding deadline and the permit decision each have their own, and they are not the same date, which is why the plan keeps them separate.",
        points: [
          "A Canadian department's first-consideration date is a scholarship or priority cut-off, not a deadline. Applying by it is what gets you read first; applying after it is usually still possible, at a different competitive position and often without the funding.",
          "Official transcripts take a week or several. A department that publishes a document deadline means the document has arrived, not that the request was made.",
          "For the study permit, IRCC has raised its financial evidence requirements for applications from 1 September 2026, and the current figure must be read from the authority's own page rather than from a guide. Treat any number you have seen quoted as out of date until you have checked it yourself.",
          "Study permit processing is measured in weeks, not days, and the published service standard is not a guarantee. It is also a separate clock from the university's admission process, and the two run in parallel.",
          "Some Canadian funding schemes require an approved study permit by the funding application deadline rather than by the admission deadline. A permit filed late can therefore cost you money as well as time, which is worth checking when you look at each scholarship's terms.",
        ],
        callout: {
          tone: "watch",
          title: "Check each scholarship's own deadline separately",
          body: "Admission deadlines and funding deadlines are different dates, and funding deadlines are earlier. Some Canadian awards also want a study permit that has already been approved. Build a single table with one row per scheme and its own date, rather than assuming the university's deadline covers everything.",
        },
      },
    },
  },

  "au-profile-cv": {
    archetype: "documents-profile",
    intro:
      "Australia is the one destination where your academic history is evidence for the visa as well as for admission. Home Affairs asks for transcripts, study dates, providers, and reasons for any change of course or any gap over two months, and it gives more weight to statements it can back up with documents than to statements that merely sound convincing.",
    sections: {
      inventory: {
        body:
          "The Australian set is broader than a document list. It is a CV, transcripts and certificates of attainment for every qualification, a written account of your study history including gaps and changes of course, and the employment, family and financial evidence that supports the Genuine Student requirement. The last group is what most students underestimate, and it is the group the visa decision is actually made on.",
        points: [
          "A two to three page academic CV with a clear technical and project focus. Australian admissions committees for coursework master's programmes read it in a few minutes, so the first page has to do the work.",
          "Official transcripts and certificates of attainment for every qualification you hold, issued by the awarding institution rather than by a translation service or an agent.",
          "A one-paragraph explanation for every study gap longer than two months, and for every change of course. This is asked for at the university and again in the visa application, and Home Affairs treats the two as one statement.",
          "Proof of current employment, family ties and economic circumstances in your home country. Home Affairs says it weighs the Genuine Student answers against your circumstances, your immigration history and your expected earnings, and a well-evidenced answer beats an eloquent one.",
          "Your English test result, your passport, and the academic documents for the course you have applied to, held in the same folder and in the same format, ready to upload.",
        ],
        resources: [
          {
            title: "Home Affairs: Genuine Student requirement",
            kind: "official",
            url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/genuine-student-requirement",
            why: "The page behind this checkpoint, and the source of the evidence rules this milestone is built on. It explains what Home Affairs looks at, and it is the document the visa decision is made against, so read it before you write anything.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Australian Government Department of Education: international education",
            kind: "official",
            url: "https://www.education.gov.au/international-education",
            why: "The government's own guidance for international students, including how Australian qualifications are assessed for comparability and what the department does with provider information. Free, and written by the people who set the rules.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NAATI",
            kind: "tool",
            url: "https://www.naati.com.au/",
            why: "The national accreditation body for translators and interpreters in Australia, and the directory to use when you need a certified translation and want someone whose credentials are recognised here.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official sources the decisions are made against, and because they are free. We take no payment for placement, and we do not take payment for anything.",
        },
      },
      formats: {
        body:
          "Australian academic CVs run to two or three pages and are read for technical substance, and the supporting documents have their own local conventions. The certification of documents is stricter than students coming from countries without a certification system expect.",
        points: [
          "Two to three pages, with education, technical skills and projects first. Publications and research experience count for a lot on research-degree applications and are almost irrelevant on coursework ones, so the order changes with the programme.",
          "No photograph, no date of birth, no marital status, no religion, no national identification number.",
          "Transcripts and certificates of attainment are issued by the awarding institution. Where the institution is outside Australia, the document normally needs to be in English or come with a certified English translation, and the certifying body has to be one Australia recognises.",
          "Some Australian institutions and the visa process ask for a certified true copy of a document rather than the original. A certified true copy is a copy certified by an authorised person in the country where the document was issued, and the rules for who may certify differ by country. Ask the institution which it wants.",
          "Certificates of attainment for a qualification in progress are often accepted with a statement of the result to date, but a confirmed award is required at enrolment. Ask what you need now and what you will need later.",
        ],
        callout: {
          tone: "watch",
          title: "Two different certifications, and you may need both",
          body: "A certified English translation says the document says what it says. A certified true copy says the copy is the same as the original document. Australian admissions and visa processes sometimes ask for one, sometimes the other, and sometimes both, and the difference is not visible from the request itself. Ask which one, in writing.",
        },
      },
      translation: {
        body:
          "The translation market in Australia is professionally accredited, and that is useful to you: it means there is a register of people whose certifications are recognised, and using it is simpler than it would be in a country with no national standard.",
        points: [
          "The translator's certification normally includes a statement of accuracy, the translator's name, signature, date and contact details, and their accreditation details. A translation without the accreditation details is a translation, not a certified translation.",
          "Using a translator accredited in Australia is the safest route if the document will be read by a government department, because the accreditation is verifiable here. For university admissions, a competent certified translator is usually acceptable, but check the programme's wording.",
          "The original document is submitted alongside the translation, and where the original is in a script that the certifying officer cannot read, a further certified translation may be requested.",
          "Long documents, such as a full multi-year transcript with a thesis abstract, take longer to translate than short ones. Get an estimate per document rather than a single figure for the whole set, because the length of one file is what determines whether you make the deadline.",
        ],
        callout: {
          tone: "watch",
          title: "Translate the long document first",
          body: "A degree certificate is a single page and takes a day. A three-year transcript with a thesis abstract can take a week, and it is the one that gets submitted first. Order it first, and ask for a per-document quote so you know which one is actually going to hold you up.",
        },
      },
      expiry: {
        body:
          "Australian visa evidence is judged on currency, and the authorities say so directly. Home Affairs wants evidence about your circumstances, which means evidence about now, not a document from two years ago dressed up as current.",
        points: [
          "Financial evidence has to be recent. The current requirements are published by Home Affairs, and the thresholds changed for applications lodged on or after 1 September 2026, so treat any figure you have read elsewhere as out of date and read the current one yourself.",
          "Employment evidence is evidence of a current position, not a historic one. A letter from an employer confirming your role and start date, and recent payslips or bank statements, are what the requirement is asking for.",
          "Academic documents are not time-limited, but a conditional result becomes a different document when the award is confirmed. Keep both and make sure the university is told when the final certificate exists.",
          "A Confirmation of Enrolment is issued once you have enrolled, and it is the document the visa application is built on. Anything you gather for the visa should be gathered with the enrolment in mind, because the CoE is what proves the course exists, is CRICOS-registered and is the right level.",
          "Keep everything in one dated folder. The Genuine Student requirement is answered with documents, and an officer reading a well-organised set asks fewer follow-up questions, which is the whole point.",
        ],
        callout: {
          tone: "watch",
          title: "The visa looks at your circumstances, not only your course",
          body: "Home Affairs weighs your answers against your broader situation, your immigration history and your expected earnings at home. That means the evidence you gather about employment, ties and finances is not paperwork, it is the substance of the argument. A well-evidenced answer outperforms an eloquent one.",
        },
      },
    },
  },

  "de-anabin": {
    archetype: "documents-profile",
    intro:
      "Before you build any German application, check anabin. It is the database the German system uses to decide whether your qualification opens a master's programme at all, and if your university is not classified the way you need, no amount of good documentation is going to fix it.",
    sections: {
      inventory: {
        body:
          "Anabin is a database of foreign higher education qualifications and the German university system, run by the KMK, the conference of the German education ministers. What you are looking for is your university's status, your degree's classification, and the route that degree opens. The search is by country and by institution, and the record for your institution carries a status letter that decides what you can apply for.",
        points: [
          "Your university, and the status letter it carries. H+ means the qualification is directly comparable and opens a master's programme in the subject. H- means the institution is recognised but the qualification is not unconditionally comparable, and admission is subject to additional assessment, usually at the specific institution.",
          "Your specific degree, not just your institution. The record lists the degree, the field of study, the level, and often the grading scale used, and it is the combination of institution, degree and scale that determines the route.",
          "The classification of the qualification: whether it gives direct admission, subject-bound admission, conditional admission, or a route through a Studienkolleg. This is the answer to the question you actually have.",
          "The type of the degree, whether it is a bachelor, a master or an equivalent, because a bachelor's and a master's are recognised differently.",
          "A screenshot or PDF of the record, with the date. It costs nothing, and it is genuinely useful evidence if you later have to explain to a university, a mission or a visa officer how your qualification is treated in Germany.",
        ],
        resources: [
          {
            title: "anabin",
            kind: "tool",
            url: "https://anabin.kmk.org/",
            why: "The database itself, and the only authoritative answer to the recognition question. Start here rather than in a forum, because a forum answer on this topic is usually somebody's guess about their own case.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Make it in Germany: recognition of foreign academic qualifications",
            kind: "official",
            url: "https://www.make-it-in-germany.com/en/working-in-germany/recognition/foreign-academic-qualifications",
            why: "The page behind this milestone, explaining how recognition works in Germany and where anabin fits. It is the shortest honest explanation of the system you will find in English.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "DAAD",
            kind: "official",
            url: "https://www.daad.de/en/",
            why: "The German Academic Exchange Service, which runs the APS process with the German missions and publishes the country-by-country requirements that sit alongside anabin. The two together answer most of the questions students actually arrive with.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the primary German sources, and because they are free. We take no payment for placement, and we do not take payment for anything.",
        },
      },
      formats: {
        body:
          "Anabin's classifications are the formats that determine your route, and the vocabulary is specific. Getting it right here saves you from applying to something you are not eligible for, which is the most expensive kind of mistake in this country.",
        points: [
          "H+ is direct access. H- is conditional: the institution is recognised, but the individual qualification is assessed by the university, which usually means extra documentation and a decision you do not control.",
          "Direct admission to a master's programme is one route. Subject-bound admission, conditional admission, and admission through a Studienkolleg are others, and they are not variations of degree, they are different paths with different years and different costs.",
          "A degree from a non-English-speaking country is normally evaluated on the basis of the document itself: the certificate, the transcript, and a certified translation. The classification does not come from a standard translation, it comes from the record for your specific institution and degree.",
          "The grading scale is part of the record, and where the scale is not one the German system recognises, the university decides how to convert it. If your institution has a local scale, say which one and what it means, and give the percentage as well as the grade.",
          "A subject-bound route is not a worse route. It is a route that names the subject, and if the subject you want is on the list, it is a normal admission route with a different assessment step at the front.",
        ],
        callout: {
          tone: "watch",
          title: "H- is not a rejection",
          body: "An H- classification means the German universities assess the individual qualification themselves. That is a conversation, not a closed door, and the institutions publish what they need. Start it before you apply, because the answer can be months, and because their requirements are the actual requirements.",
        },
      },
      translation: {
        body:
          "Translation does the same work in Germany as everywhere else, with one local wrinkle: the German term is a beglaubigte Uebersetzung, and the certification is attached by a translator with a formal standing, not by a friend or a machine. For many non-EU applicants, the translation is commissioned as part of the APS process rather than separately.",
        points: [
          "A certified translation carries the translator's statement of accuracy, their name, signature, date, contact details and proof of their qualification to translate legal and academic documents. Some institutions specify a sworn translator, which is a formally accredited status in Germany.",
          "The original document is always submitted with the translation, and where the original is not in German, an institution may ask for a translation by a particular type of translator. Read the institution's document list, not a general rule.",
          "If you are applying through uni-assist, its document rules apply on top of the university's, and they include what the translation has to contain. uni-assist publishes these on its own site.",
          "If you are applying from India, China or Vietnam, the APS certificate already contains verified document content, and the universities will often accept the certified translations produced as part of that process rather than asking you to commission new ones. Check before paying for a second set.",
        ],
        callout: {
          tone: "watch",
          title: "Check whether the APS process has already done this",
          body: "For applicants from India, China and Vietnam, the APS verification already examines and certifies your academic records. Universities in that group frequently accept the certified translations from that process. Commissioning a fresh set of translations for every application on your list is a common and entirely avoidable cost.",
        },
      },
      expiry: {
        body:
          "Anabin entries are maintained by the KMK and change. The recognition decision is not a document with an expiry date, but the things that depend on it have their own clocks, and the one that catches people is the sequencing of APS, application and enrolment.",
        points: [
          "Anabin's record for an institution is current rather than permanent, and a university can be reclassified. Keep the date on your saved record, and re-check the classification if you are applying more than a year after you looked.",
          "If you are still studying when you apply, the qualification being assessed is the one you will hold, and the final certificate is what the university verifies at enrolment. Anabin is checked against what you will have, not what you are studying towards.",
          "The APS certificate for applicants from India, China and Vietnam cannot be rushed, and APS India states that it cannot give a fixed processing time and recommends planning three to four months. That is the first deadline in the sequence, and everything else is dated from it.",
          "German application deadlines are fixed. For a winter semester starting in October, the application window is usually in the spring, and the certificate of admission, the visa appointment and the blocked account all follow from it. An anabin check that comes after the application deadline was not a check, it was a coincidence.",
        ],
        callout: {
          tone: "watch",
          title: "Do the recognition check first, not last",
          body: "Recognition is the only step in the German process that can close a door before you spend anything. It takes minutes to look up and weeks to appeal. Every hour you spend on essays before checking anabin is an hour spent on a programme you may not be allowed to enter.",
        },
      },
    },
  },

  "de-aps": {
    archetype: "documents-profile",
    intro:
      "The APS certificate is required for applicants who gained their qualification in India, China or Vietnam. It is a verification of your academic history run by the German missions together with DAAD, it comes before the university application rather than after it, and it is the longest-lead item in the whole German plan.",
    sections: {
      inventory: {
        body:
          "The APS process checks that your school, board and university records are genuine. What you submit depends on your route: school leavers and graduates are handled differently, and each national APS office publishes its own checklist. The milestone's own source is the APS India FAQ, which is the right place to start for the Indian route and the best description of how the process actually behaves.",
        points: [
          "The APS application form for the office that covers you: APS India, APS China, or the APS office at the German Embassy in Hanoi for Vietnam. These are separate processes with separate queues.",
          "Your passport, and the pages the office asks for.",
          "Your school leaving certificate, or the equivalent secondary qualification, with the transcripts for the years leading to it, issued by the school or board that awarded it.",
          "Your university degree certificate and your university transcripts, with the university's own certification. Where you are still studying, the documents the office accepts for an in-progress qualification.",
          "The APS fee, and any fee for the additional steps your route requires, such as the dMAT certificate for some applicants from Summer Semester 2027.",
          "The Student Authorisation Letter, which is a mandatory form for the individual APS procedures and is submitted with the rest of the file, signed.",
          "Your own originals, kept back. APS India asks for copies and says not to send original documents unless they are explicitly requested, so the originals stay with you and you keep the right to produce them later.",
        ],
        resources: [
          {
            title: "APS India: FAQ",
            kind: "official",
            url: "https://aps-india.de/faqs/",
            why: "The page behind this checkpoint, and the single most useful document for Indian applicants: it says what the process involves, why the timing cannot be fixed, and what the office actually needs from you.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "APS China",
            kind: "official",
            url: "https://www.aps.org.cn/",
            why: "The APS office for applicants who gained their qualification in China. Separate process, separate queue, and its own document list, so an Indian applicant's timeline tells you nothing about this one.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "APS India: about us",
            kind: "official",
            url: "https://aps-india.de/about-us/",
            why: "The office's own statement of what it is and which channels count as official. It explicitly warns against third-party information on websites, blogs and forums, which is worth reading before you trust a guide.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "APS India: checklists",
            kind: "official",
            url: "https://aps-india.de/checklists/",
            why: "The downloadable checklist for each procedure: Class XII, a completed bachelor's or master's, and the partnership procedures. The office can only process a file on complete and formally correct documentation, so the right checklist is the document that decides whether your packet is accepted.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official APS offices, and because they are free. We take no payment for placement, and we do not take payment for anything. Agents who offer to process an APS application for you are not the official route.",
        },
      },
      formats: {
        body:
          "APS is stricter about document form than a university application, because its job is verification rather than assessment. The formats it accepts are specific, and an application with the wrong form of document is a document the office cannot act on.",
        points: [
          "APS works from documents issued by the institutions themselves. A consolidated transcript produced by a private service is generally not what it is looking for; it wants the institution's own statement of record, with the institution's certification.",
          "APS India asks for legible A4-sized colour photocopies of the required documents, both sides where they apply, and says not to send original documents unless they are explicitly requested. Your originals stay with you, and you keep the right to produce them later.",
          "Documents already in English, or in a bilingual English and regional-language format, generally do not need to be notarised. Notarisation attaches to the translation when a document was issued only in an Indian regional language. The two are easily confused and the office will send the file back.",
          "The school and board records and the university records are assessed separately, and the office says so plainly: the process depends on how quickly your school, your board and your university respond. Those are three different institutions with three different speeds.",
          "Where the APS process produces a digital certificate, use the digital version. It is accepted by the German missions, by uni-assist and by the universities, and it is faster than a paper document travelling by post.",
          "The dMAT, where it is required, is a separate test with its own registration and its own sittings, administered by g.a.s.t. APS does not conduct it and does not issue the certificate: you register separately and submit the certificate with your APS application documents.",
        ],
        callout: {
          tone: "watch",
          title: "Three institutions, three speeds, one deadline",
          body: "APS India says the verification depends on how quickly your school, your board and your university respond. That means your timeline is set by the slowest of three organisations you do not control, which is exactly why this process cannot be started late and why the three to four month planning figure is the floor rather than the average.",
        },
      },
      translation: {
        body:
          "APS India states its translation rule more plainly than any other office in the system, and it is the one to plan around. If your academic documents were issued only in an Indian regional language, notarised English translations must be submitted. If they are already in English, or already bilingual, no further translation is needed.",
        points: [
          "The rule is about the language the document was issued in, not the language you would prefer. A document issued only in Hindi, Tamil, Telugu or any other regional language needs a notarised English translation attached to the original-language document.",
          "A bilingual document that already carries English alongside the regional language generally does not need an additional translation. This is the single most useful thing to check before you commission anything, because it is a common document and it is often free.",
          "Documents already in English need not be notarised. Notarisation attaches to the translation, not to the original, and getting that the wrong way round is what causes applications to be returned.",
          "The notarisation has to be done in India, by a notary recognised there. A notarisation obtained in another country does not help.",
          "If you studied part of your degree in another country, that country's records are assessed by the APS office for that country, not the one covering your nationality. The rule that matters is where the qualification was issued, not where you are from.",
        ],
        callout: {
          tone: "watch",
          title: "Check whether the document is bilingual before you pay",
          body: "If your transcript or certificate already carries English alongside the regional language, APS India says it generally needs no further translation. That single check can save the cost of translating every document in your packet, and it takes two minutes with the document in front of you.",
        },
      },
      expiry: {
        body:
          "The APS certificate does not have a published expiry date, which is exactly the problem. It is a snapshot of your academic record at a moment in time, and it is the first link in a chain that has a deadline at the end of it.",
        points: [
          "APS India states that it cannot provide a fixed processing time and recommends planning three to four months. Use that as the floor for planning and add your own margin, because the office is waiting on institutions as well as on you.",
          "The APS certificate has to exist before you apply through uni-assist, and uni-assist's own winter application window for applicants outside the EU closes on its published date. The APS date and the uni-assist date are two different deadlines and the first one is upstream of the second.",
          "If you are still studying, the documents you submit now describe a qualification in progress, and the office's assessment is of what you submit. Check the current checklist for what it accepts for candidates who have not yet graduated, and get the process moving on that basis rather than waiting for the final certificate.",
          "From Summer Semester 2027, some Indian master's applicants in engineering, commerce and management must also submit a dMAT certificate with their APS documents. This requirement did not exist before, so advice written before mid-2026 will not mention it.",
          "The certificate is a fact about your past study, and it does not expire. But a change in your academic record after it is issued is not covered by it, and if you enrol in further study you may need to be re-verified for the next application.",
        ],
        callout: {
          tone: "watch",
          title: "Start the APS process now, whatever your deadline looks like",
          body: "This is the one document in the German process that is entirely outside your control and has the longest queue. Every other deadline in the plan is downstream of it. If you are eligible, apply this week, and plan the rest of the German timeline around a certificate that arrives later than you would like.",
        },
      },
    },
  },

  "de-profile-cv": {
    archetype: "documents-profile",
    intro:
      "German applications want a structured tabular CV, a full transcript with credits, your degree certificate, certified translations of anything not in German, and evidence of any work experience. The formatting is more prescriptive than in the UK or the US, which is good news: the admissions office usually tells you exactly what it wants.",
    sections: {
      inventory: {
        body:
          "The German document set is: a tabular Lebenslauf, your transcript with credit weighting, your degree certificate, certified translations of any document not issued in German, and evidence of relevant work experience. The CV format is a convention rather than a preference, and following it exactly is the single cheapest signal you can send.",
        points: [
          "A tabular Lebenslauf in the German or standard European format, with the sections in the conventional order: personal details, education with dates and grades, internships and work experience, skills, and memberships.",
          "Your transcript with credit weighting, not just your grades. German programmes check ECTS totals against their own required credit count, and an unweighted transcript does not answer the question.",
          "Your degree certificate. A provisional certificate is usually accepted at application stage, but the final award certificate is required for enrolment, and you will need to produce it again.",
          "Certified translations of any document not in German. uni-assist and the individual universities both specify what the certification must contain, and the specification is not identical across them.",
          "Evidence of relevant work experience, which many informatics master's programmes genuinely weight. Internship certificates, employment letters and references all count, and a short one is better than none.",
        ],
        resources: [
          {
            title: "uni-assist",
            kind: "official",
            url: "https://www.uni-assist.de/en/",
            why: "The page behind this checkpoint, and the central portal for most German universities. Its published document rules are what you will be held to if you apply through it, and its search tells you which programmes you are eligible for at all.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "anabin",
            kind: "tool",
            url: "https://anabin.kmk.org/",
            why: "The recognition database. Use it to confirm the classification of your degree before you invest in a translation and an application, and to check the grading scale the German system will apply.",
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
          {
            title: "uni-assist: translations",
            kind: "official",
            url: "https://www.uni-assist.de/en/how-to-apply/assemble-your-documents/translations",
            why: "uni-assist's own published translation rule, which is specific: upload your education certificates in their original language with a translation into German or English. It also explains what a certified translation is in the German system, which is not the same thing as a notarised copy.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official portals the applications are actually made through, and because they are free. We take no payment for placement, and we do not take payment for anything.",
        },
      },
      formats: {
        body:
          "The German CV is a table, and that is not a stylistic preference. Admissions offices read hundreds of them, and a table means your dates, your grades and your credits can be checked against a form without being retyped.",
        points: [
          "Use the German or standard European tabular format. The typical table has a left column of labels and a right column of values, with dates on the right, and it fits on one or two pages.",
          "The personal details block is minimal: name, date of place of birth, place of birth, nationality, and contact details. A photograph is a matter of local custom and many German applications do not include one, so follow whatever the university publishes.",
          "The education table gives each degree with start and end dates, the institution, the subject, the degree type and the grade. Where the grade is not one the German system uses, give the raw grade and the scale it came from.",
          "Include ECTS for each degree, and the total. Many programmes publish a required credit count and check it directly.",
          "Some German CV conventions ask for a signature and a date at the end. It looks strange to an applicant from the US or UK, and it is genuinely expected here, so include it if the university asks.",
        ],
        callout: {
          tone: "watch",
          title: "Do not send a two-column Anglo-American CV and call it a Lebenslauf",
          body: "The German format is not a style preference in the same way as a resume. Admissions offices scan the table for dates, grades and ECTS, and a document in a different shape is harder for them to check, which works against you at the point where a borderline case is decided.",
        },
      },
      translation: {
        body:
          "In Germany the certification of a translation is a formal act with a formal name, and the person who does it is meant to be a professional with the standing to be responsible for it. Where you apply through uni-assist, their published requirements are the binding ones.",
        points: [
          "A beglaubigte Uebersetzung, a certified translation, carries the translator's certification: that the translation is complete and accurate, their name, signature, date and contact details, and evidence of their qualification. In Germany that normally means a sworn translator or a translator with an equivalent professional status.",
          "uni-assist publishes what it requires, and it is specific: the translator's details, the certification wording, and the fact that the original document must be submitted alongside. Read the uni-assist rules, because where they and the university differ, uni-assist's rule governs the part it handles.",
          "Where the document is not in German or English, a translation into German is generally expected, and a translation into a third language may not be accepted. Check the language requirement before commissioning, because changing the target language later means paying twice.",
          "The original document is always part of the submission. A certified translation with no original is not a translated document in the eyes of any German admissions office.",
        ],
        callout: {
          tone: "watch",
          title: "Check the target language before you pay",
          body: "Certified translations are commissioned per document and per language, and changing the language after the fact means paying for the work twice. uni-assist and the university will both state which language they accept. It is a one-line email to the admissions office and it saves a real amount of money.",
        },
      },
      expiry: {
        body:
          "German applications are fixed-deadline, so the dates are clear, and the clearance of a conditional offer has its own clock. The specific trap is the difference between what you can apply with and what you have to have in hand to enrol.",
        points: [
          "A provisional certificate, a transcript marked as final results pending, is normally acceptable with the application. The final, sealed documents are required at enrolment, and you should ask when that is, because it may fall after you arrive.",
          "uni-assist batches applications. Its own published winter window for applicants outside the EU is shorter than the individual universities' windows, and applying through uni-assist after its cut-off means waiting for a different round. Check whether the programme you want is a uni-assist programme, and check the uni-assist date, not only the university's.",
          "Conditional offers in Germany are cleared by document and by grade, and the condition deadline is stated in the offer. If your conditional offer depends on a final degree certificate that your university has not yet issued, ask for a written extension of the condition deadline now.",
          "APS comes first. For applicants from India, China and Vietnam, the certificate has to exist before the application is even considered, and it cannot be rushed.",
          "Work experience evidence is dated material. Internship certificates and employment letters carry their own dates, and if you are claiming a period of work you need the letter to match the dates on your CV exactly.",
        ],
        callout: {
          tone: "watch",
          title: "Enrolment wants the final document, and enrolment is after you land",
          body: "The provisional certificate gets you admitted. The final, certified degree certificate and transcript get you enrolled, and in some cases get you a visa appointment or a residence permit. Find out when the university needs the finals, because that is often after the point where you are physically in the country.",
        },
      },
    },
  },

  "fr-profile-cv": {
    archetype: "documents-profile",
    intro:
      "French applications expect your whole academic record, including the secondary school certificate, with certified translations into French. A French CV is also shorter and structured differently from an Anglo-American one, and the programme will often publish the format it wants, so the guesswork is smaller than it is elsewhere.",
    sections: {
      inventory: {
        body:
          "The French set runs further back than most. Alongside your bachelor's and any master's diplomas, French applications commonly ask for your baccalaureate, because the bac is the reference point the system itself uses when it evaluates a foreign qualification against the French cycle.",
        points: [
          "Your diplomas for every qualification, from the baccalaureate upwards. The baccalaureate certificate is part of the set, and students from outside France routinely discover this at the document check.",
          "Your transcripts, ideally as sealed copies from the issuing institutions. Obtaining a sealed copy takes time, which is why it should be requested early rather than at application time.",
          "Certified French translations of every document not already in French, produced by a sworn translator (a traducteur assermente) registered on the list of a French court of appeal.",
          "A CV in the format the programme publishes. French academic CVs are often a single page, and several programmes publish their own template on the application page.",
          "Your passport details and your academic references, because French applications frequently ask for referees by name and email at the point of applying, and some ask you to upload the reference letters themselves.",
        ],
        resources: [
          {
            title: "Campus France",
            kind: "official",
            url: "https://www.campusfrance.org/en",
            why: "The page behind this checkpoint and the official body for French study. It carries the Études en France procedure, the document expectations and the accepted language certifications, all in one place.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Campus France: Études en France procedure",
            kind: "official",
            url: "https://www.campusfrance.org/en/application-etudes-en-france-procedure",
            why: "The pre-consular step that French student visas run through, described in the order it has to happen. Read it early, because it sits upstream of the visa and it has its own review time.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Monmaster",
            kind: "official",
            url: "https://www.monmaster.fr/en/",
            why: "The national application platform for French master's programmes, and where most applications are actually submitted. The programme pages carry the required documents and often the CV format.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official French sources the applications and visas are decided against, and because they are free. We take no payment for placement, and we do not take payment for anything.",
        },
      },
      formats: {
        body:
          "The French academic CV is a single page where the American one is two, it is usually in a plain chronological table, and the signature line is normal rather than strange. Programmes that publish a format will penalise deviations, so read the application page before you format anything.",
        points: [
          "One page is the norm for a taught master's CV in France, occasionally two. Listing your modules individually is less common here than in Germany, because French courses are named rather than module-coded.",
          "Chronological, with education, then internships and professional experience, then languages and technical skills. Many French programmes want a very specific set of headings, and the ones they publish are worth following exactly.",
          "A photograph and the standard French personal details block are more common in French CVs than in US or UK academic CVs, and the program may require them. Follow the programme's own template rather than generalising from what you have seen elsewhere.",
          "French applications commonly ask for the baccalaureate, the baccalaureate result, and the option you took where it is relevant. Assemble that as one small pack, because it is the part of the record people did not expect to need.",
          "Academic references are usually given as name, position and email at application stage, and the referee is then contacted by the university. Have the list ready with accurate emails, not the ones from three years ago.",
        ],
        callout: {
          tone: "watch",
          title: "The baccalaureate is part of the record",
          body: "French universities evaluate a foreign qualification against the French cycle, and the baccalaureate is the anchor of that cycle. Applications that arrive without it are held while the applicant retrieves it, which is a delay of weeks for a document that has been sitting in a drawer for years.",
        },
      },
      translation: {
        body:
          "France has one term that matters, and it is not the one students expect. The translation that carries official value before a French administration is the sworn translation, a traduction assermentee, produced by a translator registered as a judicial expert on the list of a French court of appeal. The phrase 'certified translator' has no legal status in France at all.",
        points: [
          "A sworn translation is produced by a translator registered on the list of a French cour d'appel. It carries the translator's signature, a stamp with a registration number, and a statement that the translation conforms to the original. That conformity statement is what gives it force; the quality of the language is not what gives it force.",
          "The phrase 'traducteur certifie', or certified translator, has no legal definition in France. It is a commercial formulation, and some professionals use it loosely as a synonym for a sworn translation while others use it precisely because they are not sworn. If a French university or administration asks for a 'certified translation', the useful question is whether they require a translator registered on a court of appeal list.",
          "Notarisation is a separate act again, and it certifies signatures and copies rather than the accuracy of a translation. Where a document needs both, they are two pieces of work by two people.",
          "The registration is with a court, not with a place. A translator registered with one court of appeal is registered for French official purposes on that court's list, and the official lists are published by the courts, so you can check a translator's registration before you pay for the work.",
          "The original document is always required alongside. And for documents issued in a language that is neither French nor English, a further translation chain may be needed, which is a conversation to have with the programme before you order anything.",
        ],
        callout: {
          tone: "watch",
          title: "Ask whether they want a sworn translation, in those words",
          body: "In France the two phrases are not interchangeable, and a document translated by someone who is not on a court of appeal list can be refused even when the translation is flawless. Ask the admissions office for the exact term it uses, and ask the translator for their registration details as part of the quote. It is a five-minute email that prevents a rejected file.",
        },
      },
      expiry: {
        body:
          "French applications are bounded by real deadlines and the visa chain is rigidly sequenced, so the dates matter more here than in the UK or the US. The specific trap is the three-month accommodation rule, which is newer than most of the advice in circulation.",
        points: [
          "Monmaster and university-run application platforms have fixed closing dates, and a French master's application is usually one round rather than rolling. Missing it means waiting a year, not a week.",
          "The Campus France Études en France attestation is issued on the basis of a recognised language test and the fee, and it is what the visa and usually the university ask for. It has to exist before the consular appointment can be booked, and Campus France's own guidance is to begin the process ten to twelve weeks before departure.",
          "Under the 2026 rules, student visa applicants must provide proof of accommodation covering the first three months of their stay, where a contact address used to be enough. If you do not yet have accommodation, a cancellable booking is the practical answer, and it needs to be in place when you file.",
          "The attestation's own fee is separate from the language test fee, and the timing of the attestation depends on the test result. Budget for both and sequence them deliberately.",
          "Your pre-consular file and your university application are separate, but they are checked against each other. The dates on your application, your language certificate and your attestation have to be consistent, and inconsistencies generate requests for evidence rather than rejections, which is slower.",
        ],
        callout: {
          tone: "watch",
          title: "The Études en France attestation is not the language test",
          body: "The attestation is what the visa file and the university ask for, and you only get it after sitting a recognised language exam and paying the attestation fee. A student with a good score and no attestation is not finished, and the attestation cannot be issued retroactively once the window has closed.",
        },
      },
    },
  },

  "sg-profile-cv": {
    archetype: "documents-profile",
    intro:
      "Singapore's document requirements are published and specific. NUS Computing asks for a CV and a statement of purpose uploaded with the online application, plus certified true copies of degree certificates and official transcripts. The bottleneck is not the upload. It is the certified true copy.",
    sections: {
      inventory: {
        body:
          "The Singapore set is small and precise: an academic CV, a statement of purpose, certified true copies of your degree certificates, official transcripts, and the originals later, at registration. The distinction between what you upload and what you present in person is the one that catches people.",
        points: [
          "A one to two page academic CV with your technical background and projects, and a statement of purpose, both uploaded with the online application.",
          "Certified true copies of your degree certificates. A certified true copy is a photocopy certified as a true copy by an authorised person, not a scan, and not a copy certified by a translation company.",
          "Official transcripts, requested directly from each issuing university. Not a consolidated transcript from a private service, and not your own copy of a transcript you once downloaded.",
          "Official English translations of documents not issued in English, attached to the document they translate.",
          "The originals, for registration. Singapore registration requires originals to be presented, and the plan should assume you will need them in your hand when you arrive, not a folder of PDFs.",
        ],
        resources: [
          {
            title: "NUS Computing: PhD application requirements",
            kind: "official",
            url: "https://www.comp.nus.edu.sg/programmes/pg/phdcs/application",
            why: "The page behind this checkpoint. It sets out exactly what NUS Computing asks to be uploaded and what has to be certified, which is the clearest published statement of the Singapore requirement we found.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NUS Computing: graduate programmes",
            kind: "official",
            url: "https://www.comp.nus.edu.sg/graduate/",
            why: "The department's own admissions hub, with the document requirements for its taught and research programmes and the intake structure. Useful for checking which of its requirements apply to a coursework master's rather than a PhD.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NUS Registrar",
            kind: "official",
            url: "https://nus.edu.sg/registrar",
            why: "The office that handles enrolment, registration and the certified documentation requirements that come with them. Read it before you commission anything, because it is where the registration-stage rules live.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the departments' own published requirements rather than a summary of them, and because they are free. We take no payment for placement, and we do not take payment for anything.",
        },
      },
      formats: {
        body:
          "Singapore's formats are borrowed from the British system, which means a certified true copy rather than a sealed envelope. That is the single format fact worth understanding, because it determines who you have to visit and how long it takes.",
        points: [
          "A certified true copy is made by a photocopying the original and having an authorised person certify that the copy is a true copy of the original. The authorised person is typically the issuing institution, a notary public, or a solicitor, and which of those the university accepts is worth confirming.",
          "A PDF scan is not a certified true copy. This is the most common reason a Singapore application is held up, because a scan is what everyone has and it is what they upload.",
          "Official transcripts come from the issuing university, and Singapore universities are specific about whether they accept an electronic transcript with a verifiable link or a sealed physical copy.",
          "The CV is short, one to two pages, and it is a technical document. A Singapore academic CV leads with coursework, projects and technical skills, and the admissions committee reads it in a couple of minutes.",
          "Where a document is not in English, the official English translation is attached to the original, and the translation's certification is separate from the true copy of the original. Two certifications for one document is normal here.",
        ],
        callout: {
          tone: "watch",
          title: "A scan is not a certified true copy",
          body: "The distinction is invisible in the file: both look like a PDF of a certificate. A certified true copy carries a certification by an authorised person, which a scan never will. Find out which certifying authority your university accepts, and go to that person rather than to a print shop.",
        },
      },
      translation: {
        body:
          "Translations in Singapore follow the same shape as everywhere, with a local point of order: the translation is attached to the document, and the document itself still needs to be certified as a true copy. Students often arrange one and forget the other.",
        points: [
          "An official English translation carries the translator's certification: a statement of accuracy, the translator's name, signature, date and contact details, and their credentials.",
          "The translation sits alongside the original-language document, and the original-language document still needs to be certified as a true copy where the university requires one. A certified translation of an uncertified photocopy is still an uncertified document.",
          "Where the issuing institution can produce a bilingual document, that is often the cleanest route, and it is worth asking your university before paying for a translation.",
          "Registration may ask for the original documents, and where the original is in a language other than English, a translation is needed at that point too. Ask whether the translation certified for the application stage is acceptable at registration, or whether registration needs a fresh one.",
        ],
        callout: {
          tone: "watch",
          title: "You need the translation and the true copy, not one of them",
          body: "Certifying a translation and certifying a copy are different acts by different people, and Singapore's requirements often need both for the same document. Getting one and assuming the other is covered is how a registration appointment is wasted.",
        },
      },
      expiry: {
        body:
          "Singapore's clock is driven by the intake and by the Student Pass process, and the registration stage is where the timing bites. Singapore has very few intakes, so a missed document date usually means missing a whole year.",
        points: [
          "NUS Computing publishes application dates of 1 October 2026 to 31 January 2027 for its August 2027 master's intake. Intakes are few and the windows are short, so the preparation window has to be planned backwards from the window, not forwards from a start date.",
          "The scholarship cut-off is earlier than the main application deadline. For the August 2027 intake, the NUS Business School HCMA programme set a scholarship consideration cut-off of 15 November 2026 against a general deadline of 15 February 2027. Miss the first and the money is gone even if you get the place.",
          "NUS states the Student Pass application must be submitted no later than one month before the course commences, and the pass is applied for through SOLAR by the student after the university registers them. That sequencing means the documents you gathered at application stage are needed again, on a different timetable.",
          "Registration needs originals presented in person, which means you have to be in Singapore with the physical documents. A certified true copy obtained in your home country is a good thing to have, but the original still has to travel with you.",
          "Documents do not go stale, but the versions do. If the university issues an updated transcript after you have already uploaded one, check whether they want the newer one, because a mismatch between the transcript you uploaded and the one you present at registration is a query you will have to answer in person.",
        ],
        callout: {
          tone: "watch",
          title: "You must be in the country to finish the paperwork",
          body: "Singapore's formalities, including the Student's Pass, are completed after you arrive and are tied to the offsite enrolment dates clustered around the start of term. That is why documents need to be physically in your hand, and it is why the document checklist is not finished when the application is submitted.",
        },
      },
    },
  },
};

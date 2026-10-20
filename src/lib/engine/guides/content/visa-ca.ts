import type { GuideContent } from "../types";

const V = "2026-10-20";

/**
 * The Canadian study permit dossier.
 *
 * Canada runs a capped system, and the cap is the thing that shapes this route.
 * The number of study permits is allocated by province and territory, and
 * within that allocation the school allocates to programmes. That is why the
 * PAL, and then the attestation letter, sits at the very front of the route
 * even for applicants who turn out not to need it.
 *
 * Two distinctions this dossier keeps making:
 *
 *   1. PROVE YOU CAN PAY FOR THE FIRST YEAR, and then explain the rest. The
 *      published living-expense figure excludes tuition and excludes travel,
 *      and an applicant who shows exactly that figure and nothing else has
 *      shown they can survive the year.
 *   2. THE PROCESSING TIME IS NOT A PROMISE. IRCC publishes a standard, and a
 *      tool that estimates the current queue for your country, and the two are
 *      different numbers. The tool is the one that matters.
 */
export const VISA_CA: Record<string, GuideContent> = {
  "ca-pal-check": {
    archetype: "visa",
    intro:
      "Canada's study permit normally needs a provincial or territorial attestation letter, and the letter is allocated rather than applied for. Since 1 January 2026, master's and doctoral students enrolling at a public designated learning institution are exempt, so the first thing to do is find out whether you are.",
    sections: {
      route: {
        body:
          "The PAL, and its territorial equivalent the TAL, is a letter from the province or territory that your school is in, confirming a space for you within that province's allocation of the national study permit cap. It is not applied for by you. You get it through your school.",
        points: [
          "You need a letter of acceptance from a designated learning institution first. IRCC asks the school to confirm the letter is valid, and if the school does not respond, the application is returned.",
          "In most cases you also need a PAL or a TAL, and in most cases you get it through your school, usually after you have accepted the offer and paid your tuition fees in whole or in part.",
          "In Quebec, the equivalent document is the Quebec Acceptance Certificate, issued by the province's immigration ministry, and the federal attestation letter is not used.",
          "From 1 January 2026, master's and doctoral level students enrolling at a public designated learning institution do not need a PAL or TAL. The exemption covers the graduation cohort the cap was designed to attract, and it does not extend to undergraduates, to private colleges, or to programmes that do not award a degree.",
          "Other groups are exempt too, including primary and secondary school students, certain priority groups, and existing permit holders extending at the same designated learning institution at the same level of study.",
        ],
        callout: {
          tone: "watch",
          title: "Public, graduate, degree-granting",
          body: "The exemption has three conditions, and students routinely fail on the second and third. It is for master's and doctoral level study, at a public designated learning institution, in a programme that awards a degree. A graduate diploma or certificate at a public college is still a graduate programme, and it still needs an attestation letter.",
        },
      },
      documents: {
        body:
          "Three documents do the work here: the letter of acceptance, the attestation letter or your exemption from it, and the list that proves your institution and programme are the right kind.",
        points: [
          "Your Letter of Acceptance from the designated learning institution, on official letterhead, showing the tuition fees, the anticipated start and finish dates, and the date by which you need to register.",
          "Your PAL or TAL, if you need one, issued by the province or territory and obtained through your school. If you are exempt, evidence of that exemption instead.",
          "The designated learning institution list, which shows both that your school is certified and whether it is a public or a private institution.",
        ],
        subsections: [
          {
            title: "What the attestation letter contains",
            what: "The document the province issues and the school hands to you.",
            format: "A letter confirming your name, date of birth and current residential address, and that there is a space for you within the province's allocation for a study permit.",
            score: "There is no score. It is a place in a queue, allocated by the province and then by the school.",
            topics: [
              "It is not a visa, not an admission offer, and not a promise of approval. It confirms only that you may apply.",
              "You do not apply to the province yourself. You go through your school, and the school applies for the space and gives you the letter.",
              "For a joint programme involving more than one institution or more than one province, a single attestation letter covers it, issued by the province of the credentialing institution.",
              "A visiting student, including a visiting graduate student, still needs one, because the exchange student exemption does not extend to them.",
            ],
            tip: "Ask your school, in writing, which institution and which province the letter will come from, and who at the school you should chase if it does not arrive.",
          },
          {
            title: "Proving you are exempt",
            what: "What to upload when you do not need an attestation letter.",
            format: "Evidence you upload in the Provincial attestation letter field of the online application.",
            score: "IRCC decides, so make your case rather than assuming it.",
            topics: [
              "State the exemption you are relying on, and say which condition it meets: master's or doctoral level, public designated learning institution, degree-granting programme.",
              "Name the designated learning institution and cite its entry on the published list, which shows whether it is public or private.",
              "If your programme is a graduate certificate or diploma rather than a degree, say so explicitly and accept that you may need the letter.",
              "Some applicants are asked to include a short written explanation in the client information field instead, because the attestation upload field is conditional in the form.",
            ],
            tip: "IRCC's own instruction is that applications submitted without a required PAL or TAL are not accepted and are returned without processing. That makes a short note in the right field much cheaper than a returned file.",
          },
        ],
        callout: {
          tone: "watch",
          title: "Check the published list, not your assumption about your school",
          body: "IRCC publishes the designated learning institution list with a column for graduate degree programmes at public institutions, and it also shows whether each institution is public or private. A school you assumed was public because it is well known may be a private college, and a graduate programme you assumed was exempt may award a certificate rather than a degree. The list settles both.",
        },
      },
      appointments: {
        body:
          "There is no appointment and no form for the attestation itself. The letter is allocated to your school, and the appointment that matters is the one with the school's international office, because they are the only party who can request it.",
        points: [
          "The attestation letter is requested by your school, usually after you have accepted the offer and paid the tuition deposit or first instalment.",
          "Ask your school how long it takes them to obtain the letter once they have asked the province, and how they will send it to you. These are school-level timelines, not published federal ones.",
          "The letter is a condition of your study permit application, so it is on the critical path for every applicant who needs one. It is worth chasing your school on it specifically rather than waiting to be chased.",
          "For students who are exempt, there is no appointment at all, and the check you need is a five-minute read of the published designated learning institution list.",
        ],
        callout: {
          tone: "good",
          title: "Ask your school the question that saves weeks",
          body: "Ask two things in writing: do I need a PAL or a TAL, and how long does it take you to get one for me. The first answer settles your route. The second tells you whether this stage is a week or a month, and it is the difference between a student who can plan and one who is waiting.",
        },
      },
      money: {
        body:
          "The attestation letter is not something you buy, and there is no government fee for it. What it does have is an opportunity cost, because it is allocated and the allocation runs out.",
        points: [
          "There is no fee to pay for a PAL or a TAL. It is allocated from the province's share of the national target, and then from the school's allocation.",
          "The money that matters at this stage is the tuition deposit or first instalment your institution requires, because in most cases you have to have paid it before your school can request the attestation letter.",
          "IRCC publishes the national picture, and it is worth reading once. For 2026 it set a target of 408,000 study permits, of which 49,000 are for master's and doctoral students at public institutions who are exempt, and 180,000 are for applicants who do require an attestation letter. The application spaces for that PAL-requiring group are capped at just over 309,000, and the provinces share them by population.",
          "So the attestation is a bounded thing. That is the argument for asking your school early, and for having a plan for what happens if it does not arrive.",
        ],
        callout: {
          tone: "watch",
          title: "The allocation is finite, and it is finite per province",
          body: "The attestation letter is a share of a national cap that is split by province and then by school. A province with a large share can still run out for a given school, and a school's own allocation can be exhausted before its deadline. This is why schools close intakes early and why an application without the letter is returned rather than held. Get it moving.",
        },
      },
      rules: {
        body:
          "The rules are specific, and two of them are enforced harshly: a missing attestation letter means the file is returned rather than processed, and the exemption has narrow conditions.",
        points: [
          "From 1 January 2026, master's and doctoral students at public designated learning institutions are exempt from the PAL and TAL requirement for study permit applications received in 2026.",
          "Graduate-level programmes at private institutions still require a PAL or a TAL, even when the programme is called a master's.",
          "Graduate programmes that do not award a degree, such as graduate diplomas and certificates, still require one.",
          "Visiting students, including visiting graduate students, require one.",
          "An applicant renewing a valid study permit to change programme does not require one if they remain at the same institution and at the same level of study. IRCC treats master's and doctoral programmes as the same level.",
          "If you are studying in Quebec, the Quebec Acceptance Certificate satisfies the requirement, issued by the province's immigration ministry.",
          "Applications submitted without a required PAL or TAL are returned without processing, with the fees refunded. The file does not sit in a queue waiting for a letter that was never attached.",
          "Applications received before 1 January 2026 are processed under the instructions in force when they were received, so the rules that apply to you are the ones in force on your submission date.",
        ],
        callout: {
          tone: "watch",
          title: "A returned file loses its place",
          body: "A returned application is not a slow application. IRCC will not create a file for an incomplete package, and the weeks you spent waiting are not counted against you when you refile. Everything on this checkpoint is worth doing early for that reason alone.",
        },
      },
      timing: {
        body:
          "This is a checkpoint that can be closed in a day or that can cost you a term, depending on one question you can answer yourself for free.",
        roadmap: [
          {
            label: "Day 1",
            title: "Find out which side of the line you are on",
            goal: "A yes or no on whether you need an attestation letter, and the evidence for it.",
            hours: "1-2 hours",
            focus: [
              "Open the published designated learning institution list and find your school. Check whether it is listed as public or private, and whether your programme appears among the graduate degree programmes at public institutions.",
              "Check your programme awards a degree. A graduate certificate or diploma is not enough.",
              "Check whether you are renewing at the same institution and the same level of study, and whether you are in Quebec.",
              "Write the conclusion down with the evidence you used, because you will need it for the application.",
            ],
            checkpoint: "You know whether you need a PAL or a TAL, and you can show why.",
          },
          {
            label: "Day 2 to day 5",
            title: "Start the school process",
            goal: "The letter requested, with a date you can plan around.",
            hours: "1 hour, plus waiting",
            focus: [
              "If you need one, ask your international office to request it, and ask how long it takes and how it will be delivered.",
              "Make sure the deposit or first instalment has been paid, because in most cases the school cannot request the letter until it has.",
              "If you are exempt, ask your school to confirm in writing that they agree you are exempt. Their agreement is what stops a query later.",
            ],
            checkpoint: "The request is made, or you have written confirmation that you do not need one.",
          },
          {
            label: "While you wait",
            title: "Move the rest of the route",
            goal: "Everything else ready so the file can be filed the day the letter lands.",
            hours: "3-4 hours",
            focus: [
              "Assemble proof of funds for the first year, including the tuition element and the travel element as well as the published living-expense figure.",
              "Get your passport ready and take your two passport photographs, with your name and date of birth written on the back of each.",
              "Draft your study plan, which has to be no more than one page and has to answer three specific questions.",
              "Check whether you need a medical examination or police certificates, and start those now, because they involve appointments you do not control.",
            ],
            checkpoint: "Everything except the attestation letter is assembled.",
          },
          {
            label: "The day the letter lands",
            title: "Check it and file",
            goal: "The letter is correct and the application is complete.",
            hours: "1 hour",
            focus: [
              "Check your name, date of birth and address on the letter against your passport, and tell the school immediately if anything is wrong.",
              "Upload it into the PAL or TAL field of the online application, and upload your exemption evidence there instead if you are exempt.",
              "Submit the whole application in one pass, because a file that is missing the letter is returned rather than processed.",
            ],
            checkpoint: "The application is filed, complete, with the attestation or the exemption evidence attached.",
          },
        ],
      },
      resources: {
        body:
          "IRCC publishes the exemption, the list of designated learning institutions and the allocation figures, and between them they answer every question this checkpoint raises.",
        resources: [
          {
            title: "2026 provincial and territorial allocations under the international student cap",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/news/notices/2026-provincial-territorial-allocations-under-international-student-cap.html",
            why: "The official source for this milestone: it sets out the exemption from 1 January 2026, the other exempt groups, and the 2026 national and provincial targets, including how many applications each province can accept.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Designated learning institutions list",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html",
            why: "The list that settles whether your school is certified, whether it is public or private, and whether it currently offers PAL-exempt graduate degree programmes. This is the page to check first.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study permit: get the right documents",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents.html",
            why: "IRCC's own checklist, which explains what the attestation letter is, that you get it from your school, and what to upload if you are exempt.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study permit: how to apply",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/apply.html",
            why: "The official instructions, including where to upload a PAL or TAL, what to put in the client information field if you are exempt, and how to submit a complete application.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are IRCC's own pages for this checkpoint, and because the exemption rules and the allocation figures are published in one place rather than scattered across announcements. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "ca-proof-funds": {
    archetype: "visa",
    intro:
      "Canada's proof of financial support is three separate costs, not one number, and the published figure is only the middle one. You have to show tuition for the first year, living expenses for the first year, and the cost of travel to and from Canada, and for anything longer than a year you also have to explain how you will pay the rest.",
    sections: {
      route: {
        body:
          "The requirement is a financial capacity test, not a savings test. IRCC wants to know that the money exists, that it is available to you now, and that it is likely to keep being available for the whole of your programme.",
        points: [
          "You must show enough for the first year of your studies: tuition, living expenses and transportation to and from Canada for yourself and any family members coming with you.",
          "For a programme longer than a year, you must also tell IRCC how you plan to pay for the full duration. A scholarship that runs for the whole course, or evidence that your parents are employed, are the kind of answers they are looking for.",
          "The money must be available without working in Canada. A plan that depends on income you will earn after you arrive does not meet the requirement.",
          "The living-expense amounts are published by IRCC for each family size and are updated annually. The amount that applies to you is the one in force on the date you submit.",
          "Quebec is different. Applicants to Quebec follow the amounts set by the province's immigration ministry for the Quebec Acceptance Certificate, not the federal table.",
        ],
        callout: {
          tone: "watch",
          title: "Three costs, not one",
          body: "The published living-expense figure is the second of three requirements, and it excludes both tuition and travel. An applicant who shows exactly that number and nothing else has shown they can pay for living but not that they can pay for the course or get to the country. Add the first-year tuition from your Letter of Acceptance, and add a realistic travel cost for yourself and every family member.",
        },
      },
      documents: {
        body:
          "IRCC publishes the list of acceptable evidence and says explicitly that it is not a complete list, so there is more than one way to prove this. What matters is that your documents agree with each other and that the source of the money is traceable.",
        points: [
          "Proof you paid the first year of your tuition and housing fees, such as a receipt from your designated learning institution. This must be accompanied by other documents covering living expenses and travel.",
          "A student or education loan from a bank, or proof of a scholarship or a place on a Government of Canada funded educational programme.",
          "Your bank statements, for a Canadian or a foreign account, for the past 6 months, including the month you submitted your application or the month before it. These must show where the income came from.",
          "Proof of a Canadian bank account in your name, if you have transferred money to Canada, and a guaranteed investment certificate from a Canadian financial institution.",
          "Recent pay stubs, a pension document, or evidence of income from rental property.",
          "A letter from the person or institution giving you money, stating their employment or occupation, their relationship to you, the number of their dependants, and the amount of their support, with proof of the relationship and a copy of their photo identification or proof of business registration.",
        ],
        callout: {
          tone: "watch",
          title: "Six months of statements, and the source of every deposit",
          body: "IRCC's published guidance asks for statements for the past 6 months, including the month you submit or the month immediately before, and requires documentation showing where the income came from. A statement with one large unexplained deposit near the end is the pattern that draws attention, and it is much harder to explain than a history of regular savings.",
        },
      },
      appointments: {
        body:
          "The money itself needs no appointment, but two documents that support it do, and both involve waiting you do not control. The medical examination and the police certificates are the ones people leave late.",
        points: [
          "You may need an upfront medical examination, depending on where you have lived and how long you are staying. It has to be done by a panel physician IRCC approves, and the appointment takes time to get.",
          "You may need police certificates. IRCC asks that you apply for them as early as possible, and each certificate comes from the authority in the country concerned.",
          "If your country has foreign exchange controls, you have to prove that you are allowed to export the funds for all of your expenses. That is a question for your bank and for your country's rules, and it takes longer than a money transfer.",
          "None of these are in the money section of the plan, but they all have the same shape: a small document that turns into weeks if you start it at the end.",
        ],
        callout: {
          tone: "good",
          title: "Start the slow documents in the same week as the money",
          body: "The medical exam and the police certificates are the two things on this checkpoint that you cannot hurry. Put them in the diary the week you start assembling the money, not the week you are about to file. They are appointments, and appointments fill up.",
        },
      },
      money: {
        body:
          "These are the published amounts, taken from IRCC's own proof of financial support page. The table below is the one that applies to applications submitted on or after 1 September 2026, for all provinces and territories except Quebec.",
        points: [
          "Living expenses for one applicant, studying outside Quebec, for applications submitted on or after 1 September 2026: CAD 23,448 for the year.",
          "By family size, including the applicant: 2 people CAD 29,192, 3 people CAD 35,888, 4 people CAD 43,572, 5 people CAD 49,419, 6 people CAD 55,736, 7 people CAD 62,054, and CAD 6,318 for each additional family member.",
          "These amounts cover living expenses only. Tuition and transportation are separate and are added on top.",
          "Applications submitted between 1 January 2025 and 31 August 2026 were assessed against the previous table, which started at CAD 22,895 for a single applicant outside Quebec.",
          "Quebec applicants follow the amounts set by the province's immigration ministry for the Quebec Acceptance Certificate, not the federal table.",
          "IRCC sets these amounts annually, at a share of Statistics Canada's Low Income Cut-Off for the family size, so the number changes and the version that matters is the one in force when you submit.",
          "The threshold is a floor. IRCC's published table is the minimum it will accept, not an estimate of what a year costs in Toronto or Vancouver.",
        ],
        callout: {
          tone: "watch",
          title: "Read the amount for your application date",
          body: "The version that applies is the one in force on the day you submit, not the day you start your course and not the day you found this page. A figure quoted to you months ago may be the previous table. Read the current amount from IRCC's page, and add the first-year tuition and your travel costs to it yourself.",
        },
      },
      rules: {
        body:
          "The rules are few and they are about the quality of the evidence rather than the size of the money.",
        points: [
          "You must show the funds are available without working in Canada.",
          "The evidence list is not exhaustive. IRCC says other types of documents may be accepted, and it also says other documents may be required depending on your country.",
          "Your bank statements must cover the past 6 months, including the month you submit or the month immediately before, and must show the source of the income.",
          "A sponsor's letter on its own is not enough. It has to be paired with the sponsor's statements, their employment or business records, proof of the relationship, and a copy of their photo identification or proof of business registration.",
          "If your scholarship only covers tuition, you still have to show separate funds for living expenses and travel.",
          "The amount must cover the first year of your programme, not your whole course. For a longer course, you explain the rest rather than evidencing all of it.",
          "If your country has foreign exchange controls, you must prove you will be allowed to export the funds for all of your expenses.",
        ],
        callout: {
          tone: "watch",
          title: "A balance sitting exactly on the threshold is the most conspicuous number you can show",
          body: "IRCC's published figure is the floor it will not go below. An applicant who shows exactly that figure, with nothing over, has also shown that every pound of the plan is spoken for. Build a margin, and be able to account for where it came from.",
        },
      },
      timing: {
        body:
          "There is no waiting period on the money itself, which is unusual. The constraint is the evidence: six months of statements, a sponsor letter that takes time to obtain, and the tuition receipt that depends on your school.",
        roadmap: [
          {
            label: "Week 1",
            title: "Work out the number",
            goal: "One target figure, with the three components separated.",
            hours: "2-3 hours",
            focus: [
              "Read the current amount on IRCC's proof of financial support page, using the table that applies to your application date and your family size.",
              "Add the first year of tuition from your Letter of Acceptance, and a realistic travel cost for yourself and every family member coming with you.",
              "Write the total down. That is the number your evidence has to clear.",
              "For a programme longer than a year, note separately how you will pay the remaining years, because that is an explanation you will have to give.",
            ],
            checkpoint: "You have one target figure with the three components visible inside it.",
          },
          {
            label: "Weeks 2-4",
            title: "Gather the evidence",
            goal: "Documents that agree with each other and with the number.",
            hours: "4-6 hours, spread over the period",
            focus: [
              "Pull six months of bank statements, ending in the month you plan to submit or the month before it.",
              "Ask your sponsor for their letter now. It is the slowest document in the set and it needs their statements, their employment evidence and their identification.",
              "Get your tuition payment receipt from the school, and keep it with the rest.",
              "If you have transferred money to Canada, get the Canadian account statements and the transfer record. A Canadian account in your name is the clearest evidence there is.",
              "Check whether you need a medical examination or police certificates, and book them this week.",
            ],
            checkpoint: "Every component of the number has a document behind it.",
          },
          {
            label: "The week before filing",
            title: "Reconcile",
            goal: "A file that reads as one story, with nothing outstanding.",
            hours: "3-4 hours",
            focus: [
              "Check that the total shown in your statements clearly exceeds the target. Add a margin rather than landing on the number.",
              "Document the source of every significant deposit. Employment income, savings transfers and scholarship payments should each be traceable to something.",
              "Check that your sponsor's letter and your sponsor's statements agree with each other on the amount and the relationship.",
              "Write a short cover note if anything needs explaining: an irregular balance, a recent large transfer, a change of sponsor. It is better in your own words than in a query.",
            ],
            checkpoint: "Your evidence set is complete, consistent, and comfortably above the requirement.",
          },
          {
            label: "Filing day",
            title: "Upload it with the rest",
            goal: "A complete application, filed in one pass.",
            hours: "1 hour",
            focus: [
              "Upload your financial evidence into the online application, in the field the form asks for.",
              "Check that your statement period ends in the right month for your submission date. If you are filing earlier than you planned, you may need a different set of statements.",
              "Submit everything together. IRCC will not process a study permit application until it has a complete package, and a file that is returned resets your place.",
            ],
            checkpoint: "The application is filed, complete, and the money evidence is with it.",
          },
        ],
      },
      resources: {
        body:
          "IRCC publishes the amounts and the list of acceptable evidence on its own pages, which means you do not need an adviser's summary of what the requirement is.",
        resources: [
          {
            title: "Study permit: proof of financial support",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/proof-financial-support.html",
            why: "The official source for this milestone: the three costs you must cover, the list of documents IRCC accepts as proof, and the living-expense amounts by family size with the date each version applies from.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study permit: get the right documents",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents.html",
            why: "IRCC's full checklist, which places proof of funds alongside your letter of acceptance, proof of identity and the attestation letter, and tells you where each one goes.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study permit: how to apply",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/apply.html",
            why: "The filing instructions, including the point that the application will not be finalised until it is complete, and how to get your own document checklist.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Guide 5269: applying for a study permit outside Canada",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/guide-5269-applying-study-permit-outside-canada.html",
            why: "The visa-office instruction guide with the document checklist and the fee table, including the rule that fees are not refunded regardless of the decision.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are IRCC's own pages for this checkpoint, and because the amounts and the acceptable evidence change annually and the authority is the only source worth reading. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "ca-study-permit": {
    archetype: "visa",
    intro:
      "The study permit application is a single online form, one payment, one biometric appointment and a one-page study plan. The service standard is 60 days, and the thing that actually blows that is filing an incomplete file, which does not enter the queue at all.",
    sections: {
      route: {
        body:
          "There is one application and one portal. You apply online, whether you are outside Canada or already in it, and you use the IRCC Portal or the IRCC secure account depending on which one your application was created in.",
        points: [
          "You must apply online. Paper applications are available only if you have a disability that prevents you applying online, or if you hold an identity or travel document for non-national residents, refugees or stateless persons.",
          "You create an account with IRCC to pay fees, submit the application and check its status. There is an IRCC Portal for people who sign in with an email address, and an IRCC secure account with GCKey or a sign-in partner.",
          "The Student Direct Stream, which used to let you file before your language results arrived, ended on 8 November 2024. Everything since then is a regular study permit application.",
          "Applications for doctoral students may qualify for faster processing. IRCC has launched a 2-week processing track for PhD applicants, and it is worth checking whether you qualify before you file.",
          "Your dependants apply separately, with their own applications and their own fees, and they need your application number.",
        ],
        callout: {
          tone: "watch",
          title: "Which account you sign in with matters",
          body: "IRCC's own sign-in page tells applicants to try both accounts if they are not sure which one they used, because the IRCC Portal and the IRCC secure account are not interchangeable. Losing time to a wrong sign-in at the end of the process is entirely avoidable, so check which account your application is in before you file.",
        },
      },
      documents: {
        body:
          "IRCC publishes a document checklist and asks you to submit as many of the required documents as possible at once. The list is short, and each item on it has a place in the form rather than a general upload.",
        points: [
          "Your Letter of Acceptance from the designated learning institution, uploaded in the letter of acceptance field. The school is asked to confirm it is valid, and if it does not respond in time your application is returned and the fee refunded.",
          "Your provincial or territorial attestation letter, uploaded in the PAL or TAL field, or evidence of your exemption if you do not need one.",
          "Proof of financial support, for the first year, covering tuition, living expenses and travel.",
          "Proof of identity: a copy of the information page of your valid passport, and two recent passport photographs with your name and date of birth written on the back of each.",
          "A letter of explanation, which IRCC recommends and which is the right place for anything unusual in your history.",
          "A medical examination, if you need one, which has to be done by an approved panel physician.",
          "Police certificates, if you are asked for them, which have to come from the authority in each country concerned.",
        ],
        subsections: [
          {
            title: "The study plan",
            what: "The one piece of writing in your file, and the one with a hard limit on it.",
            format: "No more than one page, written by you, attached to the application.",
            score: "There is no score. The officer reads it to understand your reason for coming and your intentions afterwards.",
            topics: [
              "Why you want to come to Canada to study, at this school, in this programme.",
              "Your overall educational goal, which is usually the degree you are working towards rather than the certificate you are applying for.",
              "How this Canadian diploma or degree will increase your employment chances.",
              "IRCC also asks for evidence of your current or most recent study, which means a copy of your most recent certificate or diploma and a transcript of your marks.",
            ],
            tip: "One page is one page. Write it, print it, and cut it down until it fits. A study plan that runs to three pages reads as a copy of your motivation letter rather than as an answer to three questions.",
          },
          {
            title: "Where each document goes",
            what: "IRCC's form has specific fields, and putting a document in the wrong one has consequences.",
            format: "Named upload fields in the online application, plus a general client information field.",
            score: "The completeness check is automated against what you declare, and a missing item stops the file being processed.",
            topics: [
              "The Letter of Acceptance has its own field, and IRCC warns that attaching other documents to it gives the school consent to see them. Put everything else in its own field.",
              "The PAL or TAL goes in the provincial attestation letter field. If you meet an exception instead, your evidence goes in the client information field.",
              "You will not be able to finalise the study permit until the application is complete, and waiting to submit documents causes delays.",
              "You can submit missing documents later through your online account or a web form, but IRCC will not process the application until the package is complete.",
            ],
            tip: "Before you submit, walk the form once against the document checklist and confirm every item is in the field it belongs in. It is the closest thing to a pre-flight check.",
          },
        ],
        callout: {
          tone: "watch",
          title: "An incomplete file does not enter the queue",
          body: "IRCC states plainly that it will not finalise a study permit until you have submitted a complete application, and that waiting to submit documents causes delays. There is no partial credit for a well-organised half-file. Gather everything, then submit in one pass.",
        },
      },
      appointments: {
        body:
          "Biometrics is the appointment, and it is the point at which processing actually begins. You will get a biometric instruction letter, and you have 30 days from the date on it to be seen.",
        points: [
          "You must give biometrics in person, at an official biometric collection service point, and you must book an appointment to do it.",
          "The biometric instruction letter tells you whether you need to give biometrics and how to book. You will also get the letter in the message box of your online account if you applied online.",
          "You have 30 days from the date of the letter to attend your appointment. If you cannot make it in time, you use the web form to explain, and you upload evidence of your appointment.",
          "Book as soon as you have the letter. IRCC says so directly, because the appointment is what holds the file up.",
          "Biometrics are valid for 10 years, and IRCC cannot issue a visa or permit for longer than 10 years from the last time you gave them.",
          "Some applicants are exempt: Canadian citizens, permanent residents, children under 14, applicants over 79, and some others.",
        ],
        callout: {
          tone: "good",
          title: "The letter starts a 30-day clock, so book on day one",
          body: "The biometric instruction letter arrives after you have paid, and it gives you 30 days. Do not treat that as comfortable. The appointment itself is free to book, and IRCC says to book as soon as you receive the letter to avoid processing delays.",
        },
      },
      money: {
        body:
          "The government fees are published and there are two of them. The third category is third-party fees, which IRCC says you pay directly to the provider rather than through your account, and which are the ones that vary most.",
        points: [
          "The study permit application processing fee is CAD 150 per person, including extensions, as published in IRCC's visa office guide.",
          "The biometrics fee is CAD 85 for an individual applicant, or a maximum of CAD 170 for a family applying at the same time.",
          "Pay the biometrics fee when you submit your application, not afterwards. IRCC warns that not paying it causes delays.",
          "Third-party fees are paid directly to the provider. They can include a medical examination by a panel physician, police certificates, language testing, and services at a visa application centre if you use one.",
          "IRCC's fees are not refunded regardless of the final decision. If you apply again, you pay the application processing fee again, and the biometric fee again if it applies to you.",
        ],
        callout: {
          tone: "watch",
          title: "The medical exam and the police certificates are extra, and they are not IRCC fees",
          body: "A panel physician sets their own fee, and a police certificate costs whatever the issuing authority charges. These are the largest unpredictable items in the budget for a study permit, and they are the ones most likely to be left until late. Price them before you file, not after.",
        },
      },
      rules: {
        body:
          "The rules here are procedural, and they are enforced strictly enough that following them is most of the work.",
        points: [
          "You must apply online, unless you have a disability that prevents it or hold a non-national, refugee or stateless travel document.",
          "IRCC will not finalise your study permit until the application is complete, and it will not process a package that is missing required documents.",
          "Your Letter of Acceptance must be validated by your school. If the school does not respond by the deadline, IRCC returns the application and refunds the processing fee.",
          "You must give biometrics within 30 days of the date on your biometric instruction letter, and you must use the letter issued for your current application.",
          "Pay the biometrics fee when you submit, or you will experience delays.",
          "Any travel or tuition you commit to before a visa is issued is done at your own risk. IRCC's own visa office instructions put it that way, and it is the reminder to keep before you book anything non-refundable.",
          "Applications are assessed against the rules in force when they are received, so read the current pages rather than a saved copy from last year.",
        ],
        callout: {
          tone: "watch",
          title: "The letter of acceptance has to be validated by your school",
          body: "This is a step most applicants never think about, because it is invisible from their side. IRCC asks the school to confirm the letter, and if the school does not respond in time your application is returned and your fee refunded. Make sure your school's international office knows the letter has been issued and that they are expecting a check.",
        },
      },
      timing: {
        body:
          "The service standard for a study permit is 60 days, and that figure includes the time it takes to give biometrics. It is a standard rather than a guarantee, and the practical levers you have are filing early, filing complete, and answering document requests on the day they arrive.",
        roadmap: [
          {
            label: "As soon as you have the LOA",
            title: "Get the file ready",
            goal: "Everything assembled before you open the form.",
            hours: "4-6 hours",
            focus: [
              "Confirm your Letter of Acceptance shows the exact tuition amount, the anticipated start and finish dates and the registration deadline.",
              "Gather your attestation letter or your exemption evidence, and your proof of funds.",
              "Take your two passport photographs, with your name and date of birth written on the back of each, and scan your passport information page.",
              "Draft the study plan and cut it to one page.",
              "Check whether you need a medical examination or police certificates, and book them now if so.",
            ],
            checkpoint: "Every document is in hand except the ones that need an appointment, and those are booked.",
          },
          {
            label: "Week 1",
            title: "File it",
            goal: "A complete application submitted and paid.",
            hours: "3-4 hours",
            focus: [
              "Complete the form in one sitting. The form generates a personalised document checklist once you have answered the questions, so answer them before you start uploading.",
              "Upload each document into the field the form names, and walk the checklist before you submit.",
              "Pay the application processing fee and the biometrics fee in the same transaction, so nothing is left outstanding.",
              "Save your application number and your account details.",
            ],
            checkpoint: "The application is submitted, both fees are paid, and the application number is recorded.",
          },
          {
            label: "The fortnight after",
            title: "Biometrics",
            goal: "The file in the queue.",
            hours: "3 hours, including waiting and travel",
            focus: [
              "Watch for the biometric instruction letter and book the appointment the same day.",
              "Bring the letter and your valid passport to the appointment.",
              "Check the status of your application in your account afterwards, and confirm the date biometrics were given.",
            ],
            checkpoint: "Biometrics are done and the file has entered processing.",
          },
          {
            label: "The wait",
            title: "Stay reachable",
            goal: "A decision without a delay you caused.",
            hours: "15 minutes a day",
            focus: [
              "Check your account and your messages daily, including any request for more documents.",
              "Respond to a document request on the day you receive it. IRCC's own guidance is that the file is not processed until the package is complete, so every day of silence is a day of delay.",
              "Keep your financial evidence and your study plan accessible, because the most common request is for something you already have.",
              "Do not book non-refundable travel until your application is approved and any travel document you need has been issued. IRCC's own guidance is that costs you take on before a visa is issued are at your own risk.",
            ],
            checkpoint: "A decision has arrived in your account and in your inbox.",
          },
        ],
      },
      resources: {
        body:
          "IRCC publishes the how-to, the document checklist and the visa-office instruction guide, and those three cover everything in this checkpoint.",
        resources: [
          {
            title: "Study permit",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html",
            why: "The official source for this milestone: the landing page for the whole route, with the eligibility rules, the link into the application and the documents that every applicant needs.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study permit: how to apply",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/apply.html",
            why: "The step-by-step for filing, paying and booking biometrics, and the explanation of what happens at each stage of the process.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study permit: get the right documents",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents.html",
            why: "IRCC's own checklist, which explains the letter of acceptance, the attestation letter, proof of identity, proof of funds and the recommended letter of explanation.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Guide 5269: applying for a study permit outside Canada",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/guide-5269-applying-study-permit-outside-canada.html",
            why: "The visa-office guide for your country, with the document checklist, the fee table and the rule that fees are not refunded whatever the decision.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Biometrics: how to give your fingerprints and photo",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/biometrics/how-to-give.html",
            why: "The official instructions for the appointment, what to bring, how long you have to attend and who is exempt. The fastest way to avoid a wasted trip.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study permit account: sign in",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit-account.html",
            why: "The official page for finding the account your application sits in, whether that is the IRCC Portal or the IRCC secure account. Also carries the current note on PAL and TAL exemptions.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are IRCC's own pages for this checkpoint, and because the application rules, the fees and the document list are the things most likely to have changed since you last read them. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "ca-permit-decision": {
    archetype: "visa",
    intro:
      "The decision arrives in your IRCC account. If you applied from outside Canada, approval usually comes as a Letter of Introduction and the study permit itself is issued when you arrive, plus an electronic travel authorisation if you need one. IRCC publishes a 60-day service standard and a separate tool that estimates the current queue for your country, and the second number is the one that matters.",
    sections: {
      route: {
        body:
          "There are three outcomes: you are approved, the file needs something from you, or the application is refused. The first is by far the most common, and it arrives with a set of conditions attached to it that govern what you are allowed to do while you are in Canada.",
        points: [
          "If you applied from outside Canada, approval usually means a Letter of Introduction, and you are issued the study permit at the port of entry when you arrive. Some files are approved with the permit already issued before you travel, and your letter says which.",
          "If your application is refused, you receive a letter that says why. The reason matters, because it determines whether there is a route to challenge it.",
          "You may be asked for more documents, or for an interview, or you may be asked to complete a medical examination. None of these is a refusal, and all of them are deadlines you have to meet.",
          "If you need an electronic travel authorisation or a visitor visa, IRCC issues it at the same time as your study permit. You do not apply separately and you do not pay a second fee.",
        ],
        callout: {
          tone: "watch",
          title: "A refusal letter is not the end of the conversation",
          body: "IRCC refuses thousands of study permit applications every year, and the letter sets out the ground. Grounds differ in whether they can be addressed and re-applied for, and a refusal is not the moment to find out what your options are. Read the ground with the letter in front of you, and get advice if it is one you do not recognise.",
        },
      },
      documents: {
        body:
          "On a grant, the important document is the letter that tells you what you have been approved for and how to receive your permit. On a request, the important document is whatever was asked for.",
        points: [
          "Your Letter of Introduction, if you applied from outside Canada and the permit is issued on arrival. It is the document that tells you what you are approved for and what to present at the border.",
          "Your study permit itself, if it has been issued in advance, and the instructions for how to receive it.",
          "Your electronic travel authorisation or visitor visa, if you need one, issued alongside the permit.",
          "Your Letter of Acceptance and your enrolment documents, which your institution will ask for, and which you need for arrival and registration.",
          "The documents IRCC asks for if your file needs something, which is usually financial evidence, a medical examination result or a police certificate.",
          "Your acknowledgement of receipt letter or email, which confirms IRCC received your application and found it complete. Keep it, because it is the record that your file was accepted.",
        ],
        callout: {
          tone: "good",
          title: "Read the conditions the moment the letter lands",
          body: "Whether the permit is issued on arrival or in advance, the conditions attached to it govern what you are allowed to do and when your status ends. Read them on the day the letter arrives, and put the expiry date in your calendar with a month of warning.",
        },
      },
      appointments: {
        body:
          "There is no appointment in the normal path, but there are two that can appear, and both are easy to plan badly. One is a medical examination or an interview. The other is the visit to the port of entry, or the visa post, that comes with getting your travel document.",
        points: [
          "If IRCC asks for a document, you will usually get a message in your account with a deadline. If it asks for a medical examination, that is an appointment with a panel physician, and it is the one that most often delays a file.",
          "If you are asked to attend an interview, that is a formal appointment and it will be in your message centre.",
          "If you need a visitor visa, IRCC will send you instructions to submit your passport to the visa post so the visa can be issued. That is a separate appointment, and it happens after the decision.",
          "If you arrive with a Letter of Introduction, the port of entry is where the permit is issued, and the officer there can ask questions you have already answered once.",
        ],
        callout: {
          tone: "watch",
          title: "Read what your letter actually asks you to do next",
          body: "The instructions attached to an approval vary. They may tell you to send your passport to a visa post, they may tell you the permit is already issued and will arrive, and they may tell you nothing more than to bring the letter. Each of those is a different task, and guessing between them is how students end up waiting for a document that was never going to be posted.",
        },
      },
      money: {
        body:
          "There is nothing to pay on a grant, and there is a real loss on a refusal. IRCC's published position is blunt: fees are not refunded regardless of the final decision.",
        points: [
          "If your application is approved, there is nothing further to pay to IRCC for the permit itself.",
          "IRCC's visa office guide states that fees are not refunded regardless of the final decision, and that if you apply again you have to pay the application processing fee again and the biometric fee again if it applies to you.",
          "The plan cost of a refusal is therefore the application processing fee, the biometrics fee, the medical examination and the police certificates, plus the months of delay before you can reapply.",
          "Priority or expedited processing, where it is available, is a separate question and is not something IRCC offers on every file.",
          "IRCC's own guidance is that any travel, administration or tuition costs you take on before a visa is issued are at your own risk. That is a statement about the money, and it applies to the whole budget, not just to the fees IRCC holds.",
        ],
        callout: {
          tone: "watch",
          title: "A refusal is a sunk cost, not a pause",
          body: "IRCC is explicit that the fees are not refunded whatever the decision. That changes how you should think about a file with a problem in it. If something is missing, request it and answer quickly. If it is genuinely wrong, withdraw and refile while you still can, because a refusal costs the money and the months.",
        },
      },
      rules: {
        body:
          "The rules that apply while you wait are the ones that decide whether the wait costs you anything extra.",
        points: [
          "Respond to any request for more information as quickly as you can. The queue does not pause politely, and IRCC states that it will not process the application until the package is complete.",
          "Check your own country's current processing estimate in IRCC's processing times tool, rather than relying on the average for all applicants.",
          "Plan for the tail. Some files take far longer than the headline figure, and the average is an average.",
          "If your start date is close, ask whether an expedite request is available to you and whether it is justified. It is a request, not an entitlement.",
          "Your permit conditions, whether they arrive with the approval or when the permit is stamped, govern your work, your study and your travel. Read them and follow them exactly, because the penalties for a breach are severe.",
          "Keep your documents and your IRCC account access for the length of your stay. Extensions, changes of programme and applications for post-graduation work all start from the same account.",
        ],
        callout: {
          tone: "watch",
          title: "The average is not your queue",
          body: "IRCC publishes both a service standard and a per-country estimate, and they are different numbers for different purposes. The per-country estimate in the processing times tool is the one that describes the queue you are actually in. Use it for planning and use the standard only as the outer bound.",
        },
      },
      timing: {
        body:
          "The processing times tool gives an estimate for your own country, and IRCC's own guidance is that processing times vary by country. Plan on the estimate plus a margin, and use the waiting time to finish the enrolment steps that will otherwise collide with your arrival.",
        roadmap: [
          {
            label: "While you wait",
            title: "Watch the right number",
            goal: "A realistic date, and no missed messages.",
            hours: "15 minutes a day",
            focus: [
              "Check your IRCC account daily for messages, including any request for more documents.",
              "Check the processing times tool for your own country once a week, and note the estimate. If it moves up sharply, adjust your travel plans.",
              "Answer any document request the day it arrives. The most common request is for more financial evidence, which you already have.",
            ],
            checkpoint: "You have not missed anything, and your expected date is based on your own country's queue.",
          },
          {
            label: "The day the decision arrives",
            title: "Check the outcome and the conditions",
            goal: "A decision you understand, in full.",
            hours: "1 hour",
            focus: [
              "Read the decision in your account and, if one was sent, the letter. Confirm the start date, expiry date and the conditions attached to your status.",
              "If it is a grant, work out from the letter whether the permit is issued on arrival or in advance, and what you have to do about a travel document.",
              "If you need an eTA or a visitor visa, confirm it has been issued alongside the permit and that you can access it.",
              "If it is a refusal, read the ground, and decide immediately whether there is anything to fix before you reapply.",
            ],
            checkpoint: "You know the outcome, the dates, the conditions and what happens next with the permit itself.",
          },
          {
            label: "After the grant",
            title: "Turn the approval into an enrolment",
            goal: "Your place, your registration and your first week, sorted before you fly.",
            hours: "3-4 hours",
            focus: [
              "Send your approval letter to your institution's international office in whatever form they ask for, and confirm your registration is complete.",
              "Check the arrival requirements for your institution, which are separate from IRCC's, including any pre-arrival forms and the date by which you must arrive.",
              "Make sure you can answer for the conditions on your permit, particularly around work, and put the expiry date in your calendar with a month of warning.",
              "Book your travel only now, and only to dates your permission allows you to be in Canada.",
            ],
            checkpoint: "Registration is done, the arrival rules are known, and your travel dates are inside your permitted dates.",
          },
          {
            label: "Before you travel",
            title: "The last check",
            goal: "Nothing at the border that you did not expect.",
            hours: "30 minutes",
            focus: [
              "Have your Letter of Introduction or your permit with you, your letter of acceptance, and your eTA or visitor visa accessible if you have one.",
              "Check whether your institution requires anything on arrival, such as a document check or a housing registration.",
              "Keep the IRCC account details and your document copies. You will need them again, and sooner than you think.",
            ],
            checkpoint: "You have everything with you, and you know what happens on the day you land.",
          },
        ],
      },
      resources: {
        body:
          "IRCC publishes the processing standards, the per-country estimates and the status tools, and the transparency binder sets out how the figures are calculated.",
        resources: [
          {
            title: "IRCC processing times service delivery (transparency binder)",
            kind: "official",
            url: "https://www.canada.ca/content/dam/ircc/documents/pdf/english/corporate/transparency/secu-binder/processing-times-service-delivery.pdf",
            why: "The official source for this milestone: IRCC's own reporting on how long study permits are taking to process, which is where the service standard and the measured figures are set out.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Check current IRCC processing times",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html",
            why: "The tool that estimates the current queue for your own application type and country of application. This is the number to plan against, rather than the service standard.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Check the status of your application",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-status.html",
            why: "The Client Application Status tool and the instructions for linking your application to an online account, so you can see messages rather than wait for a letter.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study permit: after you apply",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/after-apply-next-steps.html",
            why: "IRCC's description of what happens after submission, including biometrics, processing, requests for documents and how the decision is communicated.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "IRCC's application processing system",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/reports-statistics/statistics-open-data/immigration-stats/application-processing-system.html",
            why: "The live figures on study permits finalised and outstanding, which puts your own application in context and shows how much the autumn intake swells the queue.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are IRCC's own pages and its own published reporting for this checkpoint, and because the processing figures change monthly. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },
};

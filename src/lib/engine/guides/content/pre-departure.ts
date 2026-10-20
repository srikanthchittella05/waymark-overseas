import type { GuideContent } from "../types";

const V = "2026-10-20";

/**
 * The pre-departure dossier.
 *
 * The last checkpoint is the one students treat as admin and then fail. It is
 * where a visa becomes a lawful stay, where a student record becomes a
 * student number, and where a first apartment becomes a bank account.
 *
 * What this dossier is really about is the first week, because that is where
 * the consequences live. Almost everything that goes wrong in the first
 * fortnight is administrative, and almost all of it could have been prevented
 * by a document, an appointment or a phone call booked before departure.
 *
 * Three things it keeps saying, because they are true in every country here:
 *
 *   1. ARRIVE WITH PAPER COPIES OF EVERYTHING, because the one document you
 *      need will be the one you left in a drawer.
 *   2. THE FIRST 72 HOURS ARE A DOCUMENT-AND-APPOINTMENT PHASE. Registration,
 *      the student number, the bank account and the health cover all sit in
 *      that window, and all of them gate the others.
 *   3. CHECK THE ENTRY REQUIREMENTS BEFORE YOU FLY, not after you land.
 *      Vaccination certificates, arrival forms and customs declarations are
 *      checked at the border, and they are not negotiable there.
 */
export const PRE_DEPARTURE: Record<string, GuideContent> = {
  "us-arrival": {
    archetype: "pre-departure",
    intro:
      "SEVP is explicit that an F or M student arrives no more than 30 days before the programme start date. Arriving early to settle in is fine; arriving weeks early is not. Everything in this dossier is built around the two weeks that most students choose to fly into.",
    sections: {
      checklist: {
        body:
          "The documents below are the ones you hold physically and show to a border officer. Carry them in your hand luggage, not in a checked bag, because a checked bag goes to another building and the person who needs the document does not have a key.",
        points: [
          "Your passport with the F-1 visa foil in it, and the passport itself valid for the required period beyond your stay.",
          "Your signed Form I-20. The school holds the original, so this is your copy, and it is the document that proves you are eligible to be in the country and it carries the programme start date you must arrive within 30 days of.",
          "Your I-901 SEVIS payment receipt. ICE publishes the amounts and the confirmation you print from the site is your only accepted proof of payment.",
          "Your admission letter, and the letter confirming your enrolment and your housing, since the officer may ask how you are paying for the year.",
          "Your financial evidence, in case you are asked, and the supporting bank documents. The officer can ask about your funding, and a student who cannot answer coherently is the one who gets a longer interview.",
          "Contact details that work offline: your university address, your DSO's name and email, your housing address, and a phone number you can receive a call on. Screenshots of your email are worth more than a phone that has no signal.",
        ],
        callout: {
          tone: "watch",
          title: "The 30-day rule is measured from the I-20, not from the offer",
          body: "The programme start date printed on your Form I-20 is the date that governs. If your admission letter says something different, the I-20 is what the officer reads. Arrive more than 30 days before that date and you can be refused entry even with a valid visa, so check the date on the I-20 before you book anything.",
        },
      },
      health: {
        body:
          "Health insurance in the United States is usually a condition of enrolment rather than of the visa, and the school usually has a specific plan or a list of approved plans. The amount appears on your I-20 as part of the estimated cost of attendance, so it is already part of the money you are being assessed on.",
        points: [
          "The school normally requires enrolment in its own plan or one of a short list, and the deadline for enrolling is usually within a set number of days of arrival. Check your admission portal, because the deadline is normally shorter than the add/drop deadline.",
          "Cover the period from your arrival, not just the teaching term. A gap between landing and the start of the policy is a gap with no cover, and if something happens in it you pay.",
          "Many US universities require a tuberculosis screening for international students, and some require specific immunisation records. The requirement is set by the university and sometimes by the state, and it is often a form to complete in the first weeks rather than a document to bring from home.",
          "Bring a summary of your medical history, your prescriptions and any allergies, in English, and bring the original packaging of any medication with a doctor's letter. Carrying loose pills with no label is a genuine problem at the border and in the country afterwards.",
          "Know where the student health centre is before you need it, and what it costs. In the US, university health services are often billed through your insurance, and the co-pay and the prescriptions are frequently not covered the way students expect.",
        ],
        callout: {
          tone: "good",
          title: "Get the insurance sorted in the first week, not the first month",
          body: "The enrolment deadline for the health plan is usually earlier than it feels. If you miss it you can be de-registered from classes, and in many schools you cannot be de-registered because you are in the country illegally either. Put the deadline in your calendar before you land.",
        },
      },
      travel: {
        body:
          "Book the flight after the visa is physically in your passport, not before, and plan to land between seven and fourteen days before the programme start date. That window is long enough to sort the administrative mess and short enough that you are not stuck paying for accommodation before anyone expects you.",
        points: [
          "Buy the ticket only once the visa foil is in your hand. A visa approval notice is not a visa, and an airline will refuse you a boarding pass without the right document.",
          "Check your school's required arrival date. Some universities specify a window, some specify a day, and a late arrival can be treated as a failure to enrol.",
          "On arrival you are processed by Customs and Border Protection, admitted on the F-1 visa, and given an electronic I-94 record. Check the I-94 online once you have a connection, because a mistake on that record is much easier to fix in the first week than in the first month.",
          "Keep your travel details with the university. Many schools ask international students to submit their flight number and expected arrival date, and the international office may need to know you have landed.",
          "If you are delayed or miss a connection, call the international student office before you fly on. A student who is stuck in an airport is a student who misses a compulsory orientation session, and orientation is sometimes a condition of your status.",
        ],
        callout: {
          tone: "watch",
          title: "One unaccompanied minor rule and one forward-looking rule",
          body: "The 30-day rule is about not arriving too early. The other one is about what is waiting for you: if your school requires an orientation or a health screening in your first week, arriving on the last possible day before the programme start leaves you no room for a delay.",
        },
      },
      firstweek: {
        body:
          "The first week in the United States has an order to it, and the order is set by what needs what. Here is the sequence that works, with the reasoning, because a student who does it in a different order will get stuck.",
        points: [
          "Day one: report to the DSO. Your Designated School Official is the person who checks you in, records your arrival and tells you what to do next. Do this before anything else, because almost everything else in this list comes out of the check-in, including the I-20 updates and the orientation booking.",
          "Day one or two: check your electronic I-94 and confirm the admit-until date is right. It should match your programme end date, and if it does not, raise it with the DSO straight away rather than hoping it fixes itself.",
          "Day two: enrol in the health insurance your school requires, and complete any tuberculosis screening or immunisation documentation the school has asked for.",
          "Day two or three: open a bank account. You will need a passport, your I-20, your admission letter and your student identification, and the account can then be used for the phone, the rent and the daily spending that comes next.",
          "Day three: get a phone and a transport card. Both are available to new students, both are cheaper with student rates, and both are needed before the week is useful. The transit card is often included in the orientation pack.",
          "By the end of the week: register for classes if you have not already, confirm your programme registration, and get your student identification card, which is the document you will show for anything on campus.",
          "Before the end of the week: check the add/drop deadline and the DSO check-in deadline, and put them in your calendar. Both are short, and both have consequences that are not obvious.",
        ],
        callout: {
          tone: "good",
          title: "One email on day one",
          body: "Find out three things from the international student office on your first day: your DSO's name and email, your I-20 check-in deadline, and the date of the compulsory orientation. Those three answers determine the shape of the rest of the week, and they take one email to get.",
        },
      },
      resources: {
        body:
          "The Department of Homeland Security publishes the student lifecycle guidance, ICE explains the SEVIS record, and Customs and Border Protection explains what happens at the port of entry. The rest is your university.",
        resources: [
          {
            title: "SEVP: F and M student life cycle guide",
            kind: "official",
            url: "https://studyinthestates.dhs.gov/assets/pdf/SEVP_2026_FandMStudentLifeCycle_082026.pdf",
            why: "The official source for this milestone: the government's own guide to what happens to an F or M student from admission to arrival and beyond, including the 30-day arrival rule, the reporting requirement and the orientation and training expectations.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study in the States: students",
            kind: "official",
            url: "https://studyinthestates.dhs.gov/students",
            why: "The Department of Homeland Security's front door for the student process, and the place to check what is required of you at each stage rather than guessing from a friend's experience.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ICE SEVP: students",
            kind: "official",
            url: "https://www.ice.gov/sevis/students",
            why: "The authority that runs the SEVIS record, with the information on the I-20, the SEVIS registration fee and what the record means. The page to read when something about your I-20 does not look right.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "CBP: international visitors",
            kind: "official",
            url: "https://www.cbp.gov/travel/international-visitors",
            why: "Customs and Border Protection's own explanation of what happens when you arrive, what you declare and what you must not bring in. It is the one to read before you pack rather than in the queue.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official US sources for this checkpoint and the clearest complete set we found, not because anyone paid us. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "us-sevis-orientation": {
    archetype: "pre-departure",
    intro:
      "On arrival you must report to your Designated School Official, check your electronic I-94 admit-until date, and complete SEVIS orientation and training. This is the checkpoint that starts the reporting relationship that runs for the whole of your stay, and the deadlines attached to it are short.",
    sections: {
      checklist: {
        body:
          "This is a short list of actions with hard deadlines, and it is the point in the US process where a small missed date has an outsized effect. Work through it in the order given and record each completion, because several of these are tracked in the SEVIS system and the evidence of having done them is what you will be asked for later.",
        points: [
          "Check in with your Designated School Official. The DSO is the school official responsible for you under SEVIS, and the check-in is the point at which they verify you have arrived and record it.",
          "Verify your electronic I-94 and confirm the Admit Until Date. It is checked on arrival and it should match the programme end date on your I-20. If it does not, raise it with the DSO immediately.",
          "Complete the SEVIS orientation and the F-1 training your school assigns. SEVIS publishes the student training, and schools usually deliver it during orientation.",
          "Attend the DSO check-in before the add/drop deadline. Both deadlines are short and both are published, and missing a required session can put your registration at risk.",
          "Note the programme end date on your I-20. Since 15 September 2026 the DHS fixed-period-of-admission rule means an F-1's I-94 shows a specific admit-until date rather than a duration of status, so the end date on the I-20 is a real date to plan around rather than a formula.",
        ],
        callout: {
          tone: "watch",
          title: "Your I-94 is your immigration record now",
          body: "Since the fixed-period-of-admission rule came in on 15 September 2026, your I-94 shows a specific admit-until date. That date is the end of your status, and it is also the basis for anything that needs a date range: a return to your home country, a change of programme, a new I-20, a scholarship that needs a visa history. Check it in the first week and check it again before you travel.",
        },
      },
      health: {
        body:
          "Nothing in the SEVIS reporting itself is a health requirement, but the reporting window is where the university's health requirements land, and in the US they are enforced through enrolment rather than through the immigration system.",
        points: [
          "Enrol in the university health plan within the school's stated window, which is usually within a set number of days of arrival and often shorter than the add/drop period.",
          "Complete any tuberculosis screening the university requires for incoming international students. It is normally a form, a chest X-ray or a skin test, and it is nearly always completed on campus in the first weeks rather than before departure.",
          "Bring your immunisation records with you. The school will ask for them and the records you had translated at home will save you a repeat visit to a doctor.",
          "Keep the policy documents. When you travel outside the US, and when you eventually apply for a US job that needs a visa, the health insurance and the medical records you accumulated as a student are the evidence you will use.",
        ],
        callout: {
          tone: "good",
          title: "The health deadline is a school deadline, and it bites",
          body: "Missing the health insurance enrolment window can stop you being registered for classes, and being unregistered is a different kind of problem from a missed form. It is the cheapest of the deadlines to meet and the most expensive to miss.",
        },
      },
      travel: {
        body:
          "Reporting to your school is also a travel obligation, and it is the part students forget. If you leave the United States, you may have to report it, and your SEVIS record and your re-entry have to line up.",
        points: [
          "If you travel outside the US during your programme, ask your DSO before you book. Some travel needs advance notification, and the requirements depend on the length of the trip and whether you are funded by a particular sponsor.",
          "Re-entry to the US needs a valid visa, and a visa that has expired in your passport is a problem. The visa validity runs from the date it was issued, and it does not extend because you are abroad, so check the expiry date on the foil before you travel to a country that might take longer than you expect.",
          "Carry your I-20, your passport and the visa every time you re-enter, and check the electronic I-94 record again after you land back. The record is regenerated at each entry, and a new admit-until date that is wrong is a problem to raise while you are still in the country.",
          "A brief trip can have consequences for funding. Some assistantships and some scholarships are conditional on being present for teaching, and some are conditional on not being outside the US for a long period. Check the terms of your own award, because they usually say this and students usually do not read it.",
        ],
        callout: {
          tone: "watch",
          title: "Your visa clock does not stop when you leave",
          body: "The visa is valid from the date it was issued, whether you are inside or outside the United States. A long trip home on a visa that expires while you are away is a serious problem, and the cure is to check the expiry date and the required re-entry documents before you book, not at the airport.",
        },
      },
      firstweek: {
        body:
          "The first week is a sequence of registrations, and the sequence is what makes it feel overwhelming. Done in this order, it is a list of appointments rather than a scramble.",
        points: [
          "Day one: the DSO check-in, and then verify the electronic I-94. These two belong together, because the DSO is the person who can correct anything that is wrong.",
          "Day one: the SEVIS orientation and the F-1 training. Take a note of the dates your school requires for other reporting, because you will be asked about them later.",
          "Days one to three: the class registration deadline. Register for your classes before the add/drop deadline, and register for something you can actually attend, because the add/drop period is the only window in which changing is free.",
          "Days two to four: the practical setup, which is the bank account, the phone, the transport card and the student identification card. In that order, because the bank account usually needs the student identification card.",
          "End of week: read your I-20 again and write the programme end date in your own calendar, with a reminder two months before it. With a fixed period of admission, the end date is a real deadline rather than a formula.",
          "End of week: ask your DSO the two questions that will shape the year: what the reporting requirements are for the next twelve months, and what would happen to your status if you failed to report. Most students never ask, and it is the cheapest information available.",
        ],
        callout: {
          tone: "good",
          title: "Write down the dates the school gives you",
          body: "Every date a US international student office gives you in the first week is a deadline: check-in, orientation, insurance, registration, reporting. Put them all in one calendar with reminders, and treat the list as the most important page of your first-week paperwork.",
        },
      },
      resources: {
        body:
          "SEVP publishes the guidance that governs your status, and ICE explains the record itself. Your school's international office is the authority on the local deadlines.",
        resources: [
          {
            title: "SEVP: F and M student life cycle guide",
            kind: "official",
            url: "https://studyinthestates.dhs.gov/assets/pdf/SEVP_2026_FandMStudentLifeCycle_082026.pdf",
            why: "The official source for this milestone, and the document that sets out the reporting requirement, the arrival rule, the training and what a fixed period of admission means for your I-94.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ICE SEVP: students",
            kind: "official",
            url: "https://www.ice.gov/sevis/students",
            why: "The authority that maintains the SEVIS record, and the place to check what your I-20 says and what your status means. The first place to look when a DSO's answer seems incomplete.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study in the States: students",
            kind: "official",
            url: "https://studyinthestates.dhs.gov/students",
            why: "The Department of Homeland Security's own guide to the student process and the front door for the guidance on arrival, reporting and what to do when something goes wrong.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official US sources for this checkpoint and the clearest complete set we found, not because anyone paid us. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "gb-pre-departure": {
    archetype: "pre-departure",
    intro:
      "You must arrive before your course start date or your latest arrival date, or the CAS may be withdrawn, and your university will send arrival, orientation and enrolment instructions separately from the offer. The UK is one of the easier arrivals to prepare for and one of the easiest to fail, because the requirements are quietly numerous.",
    sections: {
      checklist: {
        body:
          "The UK arrival is document-heavy and the documents are mostly ones you already have. Assemble them in one folder, in paper, because a phone full of photographs is not what a border officer or a university administrator wants to look at.",
        points: [
          "Your passport with the visa vignette or sticker in it, and a printed copy of your eVisa confirmation, since the eVisa is what proves the vignette is genuine. The University of Leeds advises students to carry their eVisa details and the CAS details with them for exactly this reason.",
          "Your CAS details: the reference number, the sponsor name and number, the course title and the dates it covers. You will be asked for them and they are not something you can reconstruct from memory.",
          "Your proof of accommodation: the tenancy agreement, the hall allocation, or the booking confirmation, with the address and the dates. A confirmation email on a phone is usually acceptable, but a printed copy is safer.",
          "The university's pre-arrival forms, which are separate from the offer and separate from the CAS, and which usually cover arrival details, the emergency contact, and sometimes a declaration for the police and a medical questionnaire.",
          "Any ATAS certificate your course required, and the tuberculosis test certificate if your nationality and course required one. Both are conditions of the visa and both are things that cannot be produced at the airport.",
          "Proof of the money you declared. Some universities ask for it on arrival, and the Home Office's own rules mean it should still be in the account you declared it in.",
        ],
        callout: {
          tone: "watch",
          title: "The latest arrival date is a hard date",
          body: "Universities publish a latest arrival date as well as a start date, and arriving after it can mean the CAS is withdrawn, which means the visa is invalid, which means you have to leave and reapply. If your flight is at risk of being late, contact the international office before you travel, not after you land.",
        },
      },
      health: {
        body:
          "The UK health system is the National Health Service, and international students are usually covered by it through a surcharge paid with the visa, plus a student health service at the university. There are two things to sort before you fly and one after.",
        points: [
          "The Immigration Health Surcharge is part of the visa application, not a separate purchase, and it is what gives most students access to the NHS. If you paid it, you are covered; check the visa application for the surcharge amount and the reference.",
          "The tuberculosis test certificate. Some students from certain countries are required to have a TB test before the visa, and the certificate is issued by a panel clinic. It cannot be done in the UK after you arrive and it cannot be done at the border.",
          "Vaccinations. The MMR vaccine is routinely checked for people who were born after a certain date and who are entering certain courses, and some courses in health and education ask for a specific list. Ask your programme what it requires and get the evidence before you travel.",
          "Register with a GP in your first week, not your first month. It is free, it is quick, and it is the thing that makes the NHS actually usable when you are ill in a country you do not know.",
          "Travel insurance for the first weeks. NHS cover does not start the moment you land in the sense of private medical care, and some policies exclude pre-existing conditions entirely. A single month of cover that includes pre-existing conditions is worth having.",
        ],
        callout: {
          tone: "good",
          title: "Register with a GP on day one",
          body: "It takes ten minutes, it is free, and it is the difference between a cold you treat yourself and a cold you see a doctor about. The university usually has a list of surgeries that register international students, so ask the international office on arrival.",
        },
      },
      travel: {
        body:
          "Buy the travel only after the visa decision and once the housing is confirmed. In the UK the two are connected in a way students do not expect: the accommodation evidence is part of the visa application, and the arrival date is part of the university enrolment.",
        points: [
          "Book after the visa decision, not after the approval. An approval notice is not a visa, and a ticket bought on an approval is a ticket you may have to change.",
          "Arrive before your stated course or latest arrival date. The university will publish both, and the latest arrival date is the one that is enforced.",
          "Carry the eVisa details offline. A phone with no signal or no data roaming is a phone you cannot show the border officer, and the requirement is to demonstrate your status rather than to argue it.",
          "Know what happens on arrival at the border: a biometric passport takes you through, a non-biometric one goes to a counter, and either way you are asked for your purpose, your address and your sponsor.",
          "Have the onward journey sorted. If you land at a London airport and your course is in another city, the train, the coach or the flight is part of the first day's logistics, and the university often runs a pickup for arriving students on published days.",
        ],
        callout: {
          tone: "watch",
          title: "An unbooked onward journey is a problem at 11pm",
          body: "Most UK airports are not near most UK universities, and the ones that are have a bus or a train that stops running in the evening. Book the onward leg before you fly, and check the last service of the day, because a missed arrival connection is how students end up in a airport hotel on their first night.",
        },
      },
      firstweek: {
        body:
          "The first week in the UK is administrative before it is social, and the administrative items are what you will need to have done before the teaching starts. The order below is the one that works.",
        points: [
          "Day one: report to the international student office or the academic registration desk with your passport, your visa and your CAS details. Registration is usually where you collect your student identification card, and the card is the key to everything else on this list.",
          "Day one: register with a GP. Ask the international office which surgeries will register a student who has just arrived.",
          "Day one or two: open a UK bank account. Most banks will open one for a student with a passport, a student identification card and a letter from the university, and some banks will let you start the application online before you arrive. Several student banks have products for international students with no UK credit history.",
          "Day two: get a phone and a travel card. A UK SIM needs a credit check in some cases, which needs a UK address and sometimes a credit file, and the university shops often have a student deal. The Oyster or the equivalent is set up on the same trip.",
          "Days two to three: complete your academic registration, confirm your course choices and your supervisor, and check the deadline for any outstanding paperwork from your department.",
          "By the end of the week: find out what your university expects of you, in writing. Academic registration, a supervisor meeting, a placement or a course audit, and the attendance and reporting rules. A master's in the UK has a lot of small requirements and they are all in the handbook.",
          "Before the end of the week: save the emergency numbers somewhere you do not have to think. 999 for emergencies, 111 for urgent but non-emergency medical advice, 101 for the police, and the security number of your hall or your university's estates office.",
        ],
        callout: {
          tone: "good",
          title: "Do the bank account in the first three days",
          body: "The UK account is the thing everything else depends on: the rent, the phone, the subscription, the deposit on a room. Start the application before you fly if your bank allows it, because the account-opening criteria vary and you may need a second document you did not bring.",
        },
      },
      resources: {
        body:
          "The Home Office publishes the rules, the university publishes the local instructions, and the NHS is where the health cover is explained. Nothing else about the UK arrival is worth reading.",
        resources: [
          {
            title: "University of Leeds: applying for a student visa outside the UK",
            kind: "official",
            url: "https://students.leeds.ac.uk/visa-information-applying/doc/apply-visa-outside-uk",
            why: "The official source for this milestone and a universities' own account of what to do before you travel and what to carry, including the eVisa, the CAS and the accommodation evidence. Practical rather than theoretical.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: student visa",
            kind: "official",
            url: "https://www.gov.uk/student-visa",
            why: "The Home Office's own page for the route, and the place to check the current conditions before you travel. The document the visa application is decided against.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: documents for the student visa",
            kind: "official",
            url: "https://www.gov.uk/student-visa/documents-youll-need-to-apply",
            why: "The official checklist, which is stricter than most people expect and which tells you exactly what the border and the university are looking at.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: foreign travel advice",
            kind: "official",
            url: "https://www.gov.uk/foreign-travel-advice",
            why: "The government's advice for your nationality, including entry requirements and health rules. The right place to check before you fly rather than at the border.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NHS: services",
            kind: "official",
            url: "https://www.nhs.uk/nhs-services/",
            why: "The health service's own pages, including how to register with a GP and what cover you actually have. Free, and it answers the questions students are too embarrassed to ask.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official UK sources for this checkpoint and the clearest complete set we found, not because anyone paid us. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "ca-pre-departure": {
    archetype: "pre-departure",
    intro:
      "Carry your study permit, your Letter of Acceptance and your proof of accommodation. And if your medical examination has to be done in your home country, do it early: many applicants from India, Pakistan and Nigeria are advised to complete it in advance, because the queues are the difference between a smooth arrival and a missed deadline.",
    sections: {
      checklist: {
        body:
          "The Canadian arrival is built around a small number of documents that all have to agree with each other: the permit, the letter, the money and the address. Where they disagree, the officer has a question and you have a delay.",
        points: [
          "Your passport with the study permit inside it, and a printed copy of the permit approval. The permit is what you show, and the letter from IRCC confirming it is what you fall back on if the original is questioned.",
          "Your Letter of Acceptance. This is the document that shows you have a place at a designated learning institution, and it is one of the documents the permit application was assessed against.",
          "Your proof of accommodation, with the address, the landlord and the dates. It has to be a real address that you can live at, and it has to match what you told IRCC.",
          "First-night accommodation confirmed and paid for. Arriving at 11pm with a permit and no bed is the single most avoidable crisis in the Canadian arrival, and it costs a hotel.",
          "The medical examination confirmation, if one was required, and the medical records you were asked to bring. Panel physicians in Canada are appointed, and the result is uploaded rather than handed over on paper.",
          "Your financial evidence in a form that can be produced, because you may be asked how you are funding the year and a student who has to dig for it looks like a student who has not thought about it.",
        ],
        callout: {
          tone: "watch",
          title: "Check the permit against the programme length",
          body: "Verify the permit expiry date and the number of conditions on it against the length of your programme and any completion margin. A permit that expires before you finish is a renewal, and a renewal is a new application and a new wait. Raise it with your institution's international office while you can still fix it.",
        },
      },
      health: {
        body:
          "Health in Canada is provincial, which means the insurance that covers you depends on where you are studying and, in some provinces, it does not start immediately. The immigration medical is separate from all of it, and it is the one with the queue.",
        points: [
          "The immigration medical examination is done by a panel physician appointed by the immigration authority, and it is usually booked in your home country. The result is submitted electronically by the clinic, and you do not usually carry a paper result with you.",
          "Book it early. Applicants from countries where panel physicians are concentrated, including India, Pakistan and Nigeria, are often queued for weeks, and the medical must be completed and reported before the permit can be issued.",
          "Provincial health insurance usually has to be applied for separately once you are in the province, and some provinces have a waiting period for people arriving from outside the country. If yours does, buy private cover for the gap. This is a real and commonly missed cost.",
          "Prescription medication. Bring the original packaging, a copy of the prescription, and a letter from your doctor in English. Canadian pharmacies may need a transfer form, and controlled substances have their own rules.",
          "Travel and gap insurance for the first weeks, covering pre-existing conditions, until the provincial plan is active. Most university insurance schemes have an enrolment deadline in the first month, and they are cheaper if you enrol on time.",
        ],
        callout: {
          tone: "good",
          title: "Find out the waiting period before you choose the province",
          body: "Some provincial health plans do not cover you for the first period after you arrive, and the length of that gap differs by province. If you are choosing between institutions, the insurance gap is part of the cost of the choice, and it is worth ten minutes of research.",
        },
      },
      travel: {
        body:
          "Book nothing non-refundable until the permit is in your hand, and do not treat a border crossing as the place to find out what your conditions are. The permit has a validity window, and the conditions on it are obligations, not suggestions.",
        points: [
          "Travel only after the permit is issued. The permit is the document that gets you in, and a refusal at the border because the paperwork was not ready is an expensive, avoidable outcome.",
          "Your permit has a validity period and a 'latest date' to enter. Enter after the latest date and the permit is invalid, so check the dates on the approval letter before you book.",
          "Travel with printed copies of the permit, the Letter of Acceptance and the accommodation confirmation. Airlines and border officers ask, and paper is faster than a phone with no roaming.",
          "Do not work. Many study permits carry a condition about not working without a permit, and a student who picks up casual work in the first week before they have read the conditions is creating a problem for themselves.",
          "Expect a question at the border about your funding, your programme and where you will live. Have those three answers short and practised, and have the documents in your hand.",
        ],
        callout: {
          tone: "watch",
          title: "Read the conditions on the permit, not just the dates",
          body: "A study permit normally has a small number of printed conditions, and one of them is usually that you are not permitted to work. Students who never read them find out at the wrong moment. Read them in the airport, on the plane, before you land.",
        },
      },
      firstweek: {
        body:
          "The first thing you need in Canada is a SIN. Almost everything else in your first month, including the bank account, the provincial health card, the phone contract and the tax return, depends on it, and it takes weeks.",
        points: [
          "Day one: apply for the SIN as soon as you are eligible and have your study permit and passport. The Service Canada offices issue it, and there is a student stream of appointments that is faster than the general one. Do not leave this until the end of the month.",
          "Day one or two: register for your provincial health insurance, and buy private cover for any waiting period that applies to you.",
          "Day two: the bank. A newcomer account for international students is available from several Canadian banks, and they will want your study permit, your Letter of Acceptance and your SIN or your application for one. Some will open the account with the application receipt, which is why the SIN comes first.",
          "Day three: the phone. Canadian mobile plans are portable, and a lot of plans need a SIN and a credit check, so the order is SIN, bank, phone. A prepaid plan buys you a week if you have to.",
          "By the end of the week: complete the university's enrolment and orientation, register for your courses, and check the deadline for the university insurance plan. And ask about the tax. New residents in Canada are taxed on their worldwide income from the day they become residents, and international students get specific services for filing a first return.",
          "Before the end of the week: put your Canadian address into every system you can, because a lot of services will not work with a foreign address, and because the address on your permit evidence has to match where you live.",
        ],
        callout: {
          tone: "good",
          title: "The SIN is the whole first week",
          body: "Service number in hand on day one makes the bank, the health card, the phone and the tax return ordinary. Without it, each of them becomes a separate argument with a utility about whether you are a resident. Apply on arrival.",
        },
      },
      resources: {
        body:
          "The immigration authority's pages carry the permit requirements and the arrival rules, and the Canadian universities directory is the fastest way to check the institution and the programme.",
        resources: [
          {
            title: "Canada.ca: study permit",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html",
            why: "The official source for this milestone and the authority's own page for the permit, with the conditions, the validity dates and what happens at the border. The document the whole arrival is assessed against.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Canada.ca: documents for the study permit",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents.html",
            why: "The official checklist for the application, including the medical examination and the financial evidence. Read it again before you travel, because it tells you what you should have with you.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Canada.ca: study in Canada",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html",
            why: "The immigration authority's overview of the whole route, including what to do on arrival. Useful for the parts of the first week that are not about the university.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Designated learning institution list",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html",
            why: "The official list of institutions eligible for a study permit, and a quick way to confirm that the programme on your Letter of Acceptance is the one you applied to.",
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

  "au-pre-departure": {
    archetype: "pre-departure",
    intro:
      "Confirm your Overseas Student Health Cover is active for your arrival date, keep your grant notice and your Confirmation of Enrolment with you, and check your provider's arrival requirements in writing. Australia's biosecurity and customs rules are strict, checked at the airport, and the things people get stopped for are ordinary things.",
    sections: {
      checklist: {
        body:
          "The Australian arrival is the shortest of the six, and the most rule-heavy. The checks that cause problems happen before you board, at the biosecurity and customs inspection, and they are about what is in your bag rather than what is in your folder.",
        points: [
          "Your passport with the visa grant notice, your Confirmation of Enrolment and your enrolment confirmation letter, all together in one folder.",
          "Your OSHC policy certificate and your membership confirmation. Both are needed for the visa, and having them with you in case the border or the university asks.",
          "Your CoE. The dates on it govern your OSHC period, your student visa length and your arrival window, and it is the document that says what course you are actually here to do.",
          "The arrival form. Australia requires an arrival record before you travel, and it is now completed digitally for most travellers, in the days before departure rather than on arrival. Check the Department of Home Affairs and your airline's instructions, because the requirement has changed and the rule depends on your route.",
          "Your academic and enrolment documents, because the university will ask for them at orientation and it is easier to have them than to ask your family to email them.",
          "A medical summary and your prescriptions, with the original packaging and a doctor's letter in English, because a prescription that is not recognised in Australia is a problem to solve before you need it.",
        ],
        callout: {
          tone: "watch",
          title: "Your OSHC has to be active on the day you land",
          body: "The cover has to start at least one week before the course start date on your CoE and run for the whole of your stay. If your policy starts after your arrival date, you are uninsured for the part of your stay before the course begins, which is exactly the part where you are finding a supermarket, a pharmacy and a phone.",
        },
      },
      health: {
        body:
          "Australia's health system is Medicare for most residents, and international students are usually covered by OSHC rather than by Medicare. OSHC is your cover, it is a visa condition, and it has a few features that surprise people.",
        points: [
          "OSHC has to meet the visa conditions, which means cover for the student and any dependants, from at least one week before the course start date on the CoE, for the full duration of your stay, including any period of leave.",
          "Check the waiting period. Some policies apply a waiting period of a number of months for pre-existing conditions, and some exclude them entirely. If you have a condition that needs ongoing treatment, you need to know that before you buy the policy, not after.",
          "Outpatient treatment is normally included, usually with an excess per visit, and hospital treatment is included as an admitted patient. Dental is usually excluded or only partly covered, and mental health cover is often limited. If you wear glasses or need dental work, budget for it separately.",
          "Bring your medical records, your vaccination history and a list of your medications, with the original packaging. Prescriptions from another country are not automatically recognised, and the doctor you see will want the history.",
          "Know how the policy works in practice: the insurer issues a membership card, most general practitioners bill the insurer directly, and you claim the remainder. Get the insurer's claims instructions before you need them, because the process is unfamiliar and the amounts are not small.",
        ],
        callout: {
          tone: "good",
          title: "Read the exclusions, not the price",
          body: "Two policies at the same price can be very different. The exclusions list is what matters: pre-existing conditions, mental health, dental, and the waiting period. Check it against your own medical history, and keep the policy documents somewhere you can find them in the first week.",
        },
      },
      travel: {
        body:
          "The flight itself is the easy part. The Australian arrival checks are about what you are carrying and about the date you land relative to your course.",
        points: [
          "Land inside the window your provider expects. Some universities specify an arrival window in writing, and arriving far outside it can complicate the enrolment and the OSHC period.",
          "Australia has strict biosecurity rules and they are enforced at the airport, not after you get home. Fresh fruit, vegetables, meat, seeds, live plants and many dairy products cannot be brought in, and the fines are serious. Check the current prohibited and restricted list before you pack.",
          "Declare everything on the biosecurity and customs forms, even when you are sure it is allowed. Undeclared food is the most common single reason a student loses a suitcase, and it is much worse than leaving the offending item in the bin at home.",
          "Medication is a special case. Keep it in the original packaging with the label, and carry the prescription and a doctor's letter. Loose tablets with no packaging are hard to explain to a biosecurity officer.",
          "Keep the arrival documents in your hand luggage and your phone charged. The first thing you will be asked for is your CoE, and the first thing you will want is your OSHC certificate, and neither belongs in a checked bag.",
        ],
        callout: {
          tone: "watch",
          title: "Food in the suitcase is the one that gets you stopped",
          body: "Biosecurity inspection is not a formality and it is not a short queue. One box of dried fruit or a bag of nuts can end your arrival at the airport, so leave the food at home and declare what you have honestly.",
        },
      },
      firstweek: {
        body:
          "The Australian first week is short because the academic calendar is short. The administrative work still has to happen, and the order matters because the Tax File Number and the bank account gate the rest.",
        points: [
          "Day one: the provider's international student orientation, if there is one. It is often compulsory and it is where you get the university systems explained. Do not miss it and do not schedule a flight that lands in the middle of it.",
          "Day one: the Tax File Number. The Australian Taxation Office issues one and it is needed for the bank account, for a rental agreement in some cases, for the tax return at the end of the year and for the job you are going to have. It can be applied for online once you have your arrival details.",
          "Day two: the bank account. Several Australian banks offer accounts to international students, and they will want your passport, your student enrolment evidence and your TFN. Apply for the TFN before you go to the bank, because the TFN application is online and the bank appointment is not.",
          "Day two: the phone and the transport card. A prepaid SIM works for the first fortnight and a proper plan with a local number takes a little longer, and the transport card gets you to campus.",
          "By the end of the week: enrol in your courses, confirm your programme registration, and check the date you have to complete the OSHC enrolment or the course selection deadlines. Both are short and both are easy to miss.",
          "Before the end of the week: find the university's health service, the student counselling service and the security office, and put the emergency numbers in your phone. Being able to find them in a crisis is worth more than having them.",
        ],
        callout: {
          tone: "good",
          title: "Do the TFN online, on day one",
          body: "The Tax File Number is the Australian equivalent of the Canadian SIN and the British National Insurance number, and it gates the bank account. Five minutes on the tax office's site, on a laptop, while you wait for something else to happen, removes a whole week of friction.",
        },
      },
      resources: {
        body:
          "Study Australia publishes the government guidance on arriving, and Home Affairs publishes the visa and OSHC rules. Your provider publishes the local orientation details.",
        resources: [
          {
            title: "Study Australia: how to apply for your visa",
            kind: "official",
            url: "https://www.studyaustralia.gov.au/en/plan-your-move/visa-application-process",
            why: "The official source for this milestone and the Australian Government's own walkthrough of the visa and arrival process, with the order of the steps and what to expect after you land.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study Australia: preparing to travel",
            kind: "official",
            url: "https://www.studyaustralia.gov.au/en/plan-your-move/preparing-to-travel",
            why: "The government's own guidance on the last steps before departure, including what to carry and what to check. Short, practical and free.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study Australia: what can I bring to Australia",
            kind: "official",
            url: "https://www.studyaustralia.gov.au/en/plan-your-move/what-can-i-bring-to-australia",
            why: "The biosecurity and customs rules in one place, which is the check that will be applied to your suitcase. Reading it at home is much cheaper than reading it at the airport.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study Australia: your first week in Australia",
            kind: "official",
            url: "https://www.studyaustralia.gov.au/en/plan-your-move/your-first-week-in-australia",
            why: "The government's own first-week checklist, which covers the arrival formalities and the first administrative steps. Useful as a cross-check against your provider's list.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study Australia: Overseas Student Health Cover",
            kind: "official",
            url: "https://www.studyaustralia.gov.au/en/plan-your-move/overseas-student-health-cover-oshc",
            why: "The official explanation of what OSHC must do for the visa, which is the criteria to compare policies against rather than the price.",
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

  "au-oshc": {
    archetype: "pre-departure",
    intro:
      "Home Affairs states you must obtain OSHC for yourself and any dependants from at least one week before your course starts and for the full duration of your stay. Failing to evidence it is a refusal risk, so this checkpoint is a document, not a suggestion: a policy certificate and a membership confirmation, uploaded with the application.",
    sections: {
      checklist: {
        body:
          "Four things have to be true at once, and a policy that fails any one of them is not a policy that satisfies the visa. Check all four before you pay for it, because a policy bought for the wrong period cannot be fixed after the fact.",
        points: [
          "The cover starts at least one week before the course start date stated on your Confirmation of Enrolment, and it runs for the full duration of your stay on that CoE.",
          "It covers you and every dependant travelling with you. Dependants each need their own policy, and a family policy or a single-student policy are not interchangeable.",
          "It comes from an insurer that offers cover meeting the visa conditions, which means the whole of your stay rather than a study period, and the ability to extend it if your course extends.",
          "You have two documents: the policy certificate and the membership confirmation. The visa application needs both, and they are often two separate pieces of paper from the same insurer, so ask for both at the same time.",
        ],
        callout: {
          tone: "watch",
          title: "The start date is the one that gets people",
          body: "Most students buy cover from the start of the course. The condition is at least one week before the course start, and the difference is the week in which you arrive, find a flat, get a phone and possibly need a doctor. Buy from the arrival date, not the teaching date.",
        },
      },
      health: {
        body:
          "OSHC is not just a visa formality. It is the health cover a student actually relies on, and the shape of it is different from what people expect from a national health system.",
        points: [
          "It generally covers outpatient visits through a general practitioner, hospital treatment as an admitted patient, and a limited contribution to pharmaceuticals. The details are in the policy, and they differ between insurers.",
          "The waiting period. Some policies apply a waiting period of a number of months, and some exclude pre-existing conditions entirely. If you have a condition that needs treatment, read the exclusions and the waiting period before you buy, not after.",
          "Dental, optical and psychological services are usually limited or excluded, and mental health cover in particular varies a lot between policies. If you are going to use any of them, work out what the policy pays before you need it.",
          "The excess, or co-payment, is per claim and is set by the policy. It is not unusual for it to be tens of dollars per general practitioner visit, and a student who does not know that will be surprised by the first bill.",
          "Buying a policy is not the same as using it. Know how the claims work: the insurer issues a membership card, you give it to the practitioner, and the insurer settles the bulk of the bill directly. Take the card with you to every appointment.",
        ],
        callout: {
          tone: "good",
          title: "Compare on visa compliance, then on cover, then on price",
          body: "The first filter is whether the policy satisfies the visa conditions at all. Among those, compare the exclusions and the excess. Price last. A cheaper policy that excludes the treatment you need is not cheaper.",
        },
      },
      travel: {
        body:
          "The travel question for OSHC is about dates. The policy period, your arrival date and your course dates have to overlap properly, and the mismatch usually happens in the first week or the last.",
        points: [
          "Buy the policy before you travel, not on arrival. Buying it on landing in Australia is possible with some insurers and impossible with others, and doing it in the airport costs more and starts later.",
          "Make the policy start date your arrival date, not your orientation date and not the course start date. The week before the course begins is exactly the period when you will be setting up and when you will get something wrong.",
          "If you will be in Australia before the course starts, say so when you buy, because the policy needs to cover the whole of your stay and your arrival is what starts it.",
          "If your course extends, or your CoE end date changes, extend the policy. An insurance policy that has lapsed while you are still in the country is a visa problem as well as a health one.",
          "Keep the policy number where you can find it. It is on the certificate, it is on the membership card, and it is what the university and the medical practice will ask for.",
        ],
        callout: {
          tone: "watch",
          title: "The end date is as important as the start",
          body: "Home Affairs requires cover for the full duration of your stay, and a policy that ends with the course while you are still in Australia on a visa extension is a problem at exactly the wrong moment. Check the CoE dates against the policy dates and make them match.",
        },
      },
      firstweek: {
        body:
          "Once you are in the country the OSHC work is short, but it is not nothing, and the things that go wrong are administrative rather than medical.",
        points: [
          "Carry the membership card every time you see a general practitioner, and give them the membership number as well, because some practices need it separately.",
          "Understand the billing before you are ill. Find out whether your general practitioner bills the insurer directly, what the excess is, and what you have to claim back yourself. In some practices you pay the whole fee and claim it later, which is a cash flow problem for a student.",
          "Check the university health service, which is usually free or heavily subsidised for enrolled students and which is the right first stop for most things that are not emergencies.",
          "Know the emergency route. In an emergency, call 000. For a non-emergency but urgent problem, call Healthdirect on 1800 022 222, which operates around the clock, and it is the number to have in your phone before you need it.",
          "Keep the certificate and the confirmation in a folder you can send from, because the university and the immigration authority will both ask, and the policy document is the proof that you did what was required.",
        ],
        callout: {
          tone: "good",
          title: "Save the insurer's claims number separately",
          body: "Put the membership number and the claims phone number in your phone's notes, not only on a card in a drawer. The first time you need to claim, you will not be in a position to hunt for a PDF.",
        },
      },
      resources: {
        body:
          "The immigration authority sets the requirement, and Study Australia explains what the cover has to do. The insurers themselves publish the policy wording, and the policy wording is the document that matters.",
        resources: [
          {
            title: "Home Affairs: web evidentiary tool",
            kind: "official",
            url: "https://immi.homeaffairs.gov.au/visas/web-evidentiary-tool",
            why: "The official source for this milestone and the authority's own tool for the documentary evidence a visa application needs, including the health cover and the membership confirmation. It is where you check what a document has to show before you upload it.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Home Affairs: Student visa subclass 500",
            kind: "official",
            url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
            why: "The visa page itself, with the Overseas Student Health Cover condition stated as the authority states it, and the financial capacity requirement. The document the visa is decided against.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study Australia: Overseas Student Health Cover",
            kind: "official",
            url: "https://www.studyaustralia.gov.au/en/plan-your-move/overseas-student-health-cover-oshc",
            why: "The government's plain-English explanation of what OSHC is for and what the visa expects, including the difference between a student who is covered and a dependant who is not.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study Australia: bringing your family",
            kind: "official",
            url: "https://www.studyaustralia.gov.au/en/plan-your-move/bringing-your-family",
            why: "The official guidance for dependants, which includes the separate cover each family member needs. The page to read if anyone is coming with you, because the OSHC requirement follows the family, not the student.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official Australian sources for this checkpoint and the clearest complete set we found, not because anyone paid us. We take no payment for placement, and we do not take payment for anything. We do not sell insurance and we do not receive a commission on any policy.",
        },
      },
    },
  },

  "de-arrival-registration": {
    archetype: "pre-departure",
    intro:
      "After arrival you register your address with the local Burgeramt and then apply for the student residence permit, which is the document that actually authorises your stay and your working hours. The sequence is tight, it is bureaucratic, and it starts with a housing contract you need before you can do anything else.",
    sections: {
      checklist: {
        body:
          "Four steps in a fixed order, and the first one needs a document you have to get from your landlord before you can even book the appointment. Book the Burgeramt appointment as soon as you have an address, because they are booked weeks ahead in most cities.",
        points: [
          "The address registration, the Anmeldung, at the local Burgeramt. It normally has to be done within a set period of arriving, commonly 14 days, and you will need a written confirmation of occupancy from your landlord, which most landlords will send on request.",
          "The documents for the registration: your passport, your national visa, your admission letter, your enrolment confirmation, the lease or the Wohnungsgeberbestatigung from the landlord, and sometimes a registration form the office gives you when you book.",
          "The bank account. It usually requires the address registration, which is why it comes after, and it is where the blocked account has to be funded. Ask your university which banks they accept, because some will not open an account for a student without an enrolment confirmation.",
          "The blocked account, funded at the monthly rate the Federal Foreign Office publishes for your city, for the length of your course. This is the money you will live on, and it is released to you monthly rather than handed over at once.",
          "The residence permit application at the local foreigners' office, with the admission letter, the enrolment confirmation, the registration confirmation, proof of health insurance and the blocked account confirmation. Apply inside the window the visa and the authority set, because the national visa that let you in is itself time-limited.",
        ],
        callout: {
          tone: "watch",
          title: "Your national visa is not your residence permit",
          body: "A national visa issued for study is generally valid for a limited period from the day you enter, and the residence permit is the document that lets you stay for the whole course and work the hours you are allowed to. The gap between them is a deadline, and the appointment to get the permit is the thing people leave too late.",
        },
      },
      health: {
        body:
          "German health insurance for students is either public or private, and the difference is mostly the cost and the deductible rather than the cover. There is also one vaccination rule that catches people who arrived before it applied to them, and it is worth checking before you fly.",
        points: [
          "You need health insurance covering you in Germany before you can complete your enrolment in many cases, and certainly before the residence permit application. Students are usually eligible for reduced-rate public cover if they are under a certain age, enrolled at an approved institution, and living in Germany, and a private student tariff is the alternative.",
          "Ask your university which insurer they work with. Many universities have a cooperation with a specific provider and a simplified enrolment process at a student rate, and the university will tell you which one at enrolment.",
          "The measles vaccination requirement. Under the German infection protection rules, people who entered Germany after 31 March 2020 generally have to demonstrate measles immunity or vaccination, and there are exemptions for people who were born before 1957 and for some other categories. It applies to students, and it is checked when you register. Check the rule for your own year of birth and your circumstances rather than assuming.",
          "Bring your vaccination records from home, ideally translated, and your previous medical history. Registering a vaccination you already have is much easier than starting the course again.",
          "Prescriptions. Bring the original packaging and the prescription, and ask the pharmacy about a generic. German pharmacies are the most used part of the health system for anyone with a long-term medication, and they will tell you what they can do.",
        ],
        callout: {
          tone: "good",
          title: "Sort the insurance before you land if you can",
          body: "Many German students enrol in their insurance online before arrival or in the first days, using the enrolment confirmation the university sends. Doing it in week one rather than week four means the residence permit application in month two is not waiting on a document.",
        },
      },
      travel: {
        body:
          "Arriving in Germany with a national visa and an address is a two-day job, and the thing that usually goes wrong is arriving without the address paperwork sorted. The travel decision itself is simple: come when the university tells you to come.",
        points: [
          "Arrival is tied to the semester dates and to the university's own welcome week, which is often the week before teaching and sometimes compulsory.",
          "Bring the address paperwork with you if you have it, because the Burgeramt will ask for the landlord's confirmation of occupancy and it is easier to have it in the folder than to ask a landlord in another time zone.",
          "Your national visa is valid from the date you enter, and entering early does not extend it. The clock starts when you land, so if the housing is not ready, arriving late is worse than arriving early, but arriving weeks early is worse still.",
          "On arrival you will be asked about your accommodation and your plans, and the answer should be a specific address and a specific arrangement, not a description of an intention.",
          "If you are carrying medication, keep it in the original packaging with the prescription. A German customs or police officer is entitled to ask, and an unlabelled box of tablets is not an answer.",
        ],
        callout: {
          tone: "watch",
          title: "Arriving without an address is the failure mode",
          body: "A student who lands with a confirmed admission, a national visa and no address cannot register, cannot open a bank account, and therefore cannot fund the blocked account, and therefore cannot apply for the residence permit. Every one of those is gated by the housing. Solve the housing first.",
        },
      },
      firstweek: {
        body:
          "The German first week is the most administrative of the six in this dossier, and it is also the one where doing the steps in order saves the most time. The order below is not a suggestion; each step needs the one before it.",
        points: [
          "Day one: register your address. Book the Burgeramt appointment the day you arrive if you could not before, and go to the earliest slot available. Bring the passport, the lease and the landlord's confirmation.",
          "Day one or two: enrol in health insurance, and keep the confirmation number, because the residence permit application needs it.",
          "Day two or three: open the bank account. Bring your passport, your registration confirmation, your enrolment confirmation and your visa, and ask about the blocked account procedure while you are there, because the bank will have a specific process for it.",
          "Day three: fund the blocked account. The account is opened in your own name and the money is transferred to the blocked account, and the confirmation from the bank is what the foreigners' office wants.",
          "Day three or four: apply for the residence permit at the local foreigners' office. Book the appointment as soon as you have the blocked account confirmation, because the waiting times are long and the document is what authorises your stay.",
          "By the end of the week: register for your courses, get the semester ticket and the student services card, and find out the Mensa opening hours and what they cost, because the student canteen is the cheapest food in Germany and it is also where a lot of the social life is.",
          "Before the end of the week: write down the end date of your national visa and the deadline for the residence permit application, and put both in your calendar. With a national visa this is the most easily missed deadline in the whole German process.",
        ],
        callout: {
          tone: "good",
          title: "Book the two appointments before you fly",
          body: "The Burgeramt and the foreigners' office both work by appointment and both fill up. Book them from abroad if your city allows it, or have the international office book them for you on arrival. The difference between a student who has both appointments and a student who has neither is about three weeks.",
        },
      },
      resources: {
        body:
          "The Federal Foreign Office's own site explains the visa, the permit, the blocked account and the registration, and it is the source for the figures that decide your budget.",
        resources: [
          {
            title: "Make it in Germany: recognition of foreign academic qualifications",
            kind: "official",
            url: "https://www.make-it-in-germany.com/en/working-in-germany/recognition/foreign-academic-qualifications",
            why: "The official source for this milestone and the government's own guide to the recognition and approval steps that sit either side of your German study, including the enrolment and the immigration formalities.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Make it in Germany: register your address",
            kind: "official",
            url: "https://www.make-it-in-germany.com/en/living-in-germany/register-address",
            why: "The official description of the Anmeldung, the documents it needs and the deadline for doing it. The step that the bank account and the residence permit both wait on.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Make it in Germany: student visa and residence permit",
            kind: "official",
            url: "https://www.make-it-in-germany.com/en/visa-residence/types/student",
            why: "The residence permit itself, the requirements, the appointments and what the foreigners' office will ask for. The document that tells you what your arrival has to produce.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Make it in Germany: blocked account",
            kind: "official",
            url: "https://www.make-it-in-germany.com/en/study/finances/blocked-account",
            why: "The published monthly amounts and the rules for opening and funding the account. The largest number in the German plan and the one that is published officially, so start here rather than guessing.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Make it in Germany: study in Germany",
            kind: "official",
            url: "https://www.make-it-in-germany.com/en/study/study-in-germany",
            why: "The government's overall guide to studying in Germany, covering the visa, the money, enrolment and arrival in the order they happen. The best single page to read before you fly.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official German sources for this checkpoint and the clearest complete set we found, not because anyone paid us. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "fr-pre-departure": {
    archetype: "pre-departure",
    intro:
      "Check that your VLS-TS visa, your Etudes en France attestation and your accommodation proof are consistent, and confirm whether your university runs an orientation week you must attend before teaching starts. France is the one country here where a document you have already been given can be invalidated by a document you obtain later.",
    sections: {
      checklist: {
        body:
          "The French arrival file is a set of documents that have to agree with each other: the visa names a programme, the attestation names a language test, and the accommodation proof names an address. If the programme on the attestation and the programme on your admission letter differ, the border will notice.",
        points: [
          "Your passport with the VLS-TS visa, and the visa itself: a long-stay visa issued as a residence permit, which you validate online after you arrive.",
          "Your Etudes en France attestation, where your programme required one. It records the language certification you hold, and it is the document the university and the visa application are checked against.",
          "Your accommodation attestation, the attestation d'hebergement, or your residence allocation, and the document that proves it covers the period you need.",
          "Your admission letter or the university's enrolment confirmation, with the programme name and the start date, exactly as they appear on the visa.",
          "Your health cover, either the attestation d'assurance from an insurer or the attestation from the university health service, depending on what your programme required.",
          "Your university pre-arrival and orientation forms, and the dates of the orientation week, which in France is frequently compulsory and frequently before the teaching starts.",
        ],
        callout: {
          tone: "watch",
          title: "Check the three documents against each other",
          body: "The visa, the attestation and the admission letter each name a programme, sometimes slightly differently. Compare them before you travel. A mismatch is trivial to fix with a letter from the university at home and extremely awkward to fix in Paris.",
        },
      },
      health: {
        body:
          "French student health cover is arranged through the university's health service or a private insurer, and it is also the thing that many French universities ask for before they let you enrol. It works differently from the British and Australian systems, and the difference catches students out.",
        points: [
          "The attestation d'assurance, or the attestation from the university health service, is the proof of cover your university and the prefecture will want. French universities often run their own scheme, and it is normally the cheapest route for a student.",
          "French students are generally covered for a percentage of their healthcare costs, and the university scheme handles the administrative part rather than paying the doctor directly, so you pay and then claim. Understand the process, because it is the opposite of the Australian one and the first claim is confusing.",
          "The university health service, the service universitaire de medecine preventive, is free for enrolled students and does the same things as a general practitioner: vaccinations, screening, prescriptions and referrals. It is also the place to go for the mandatory medical documents some programmes require.",
          "Some programmes in health, sport and food require specific medical screening and vaccination records, and some require a medical certificate for placements. Ask your department for the list before you travel, because some of these require appointments that take weeks.",
          "Prescriptions from another country: bring the packaging, the prescription and a letter from your doctor. French pharmacies will tell you what they can dispense, and for anything unusual they will want to see the clinical history.",
        ],
        callout: {
          tone: "good",
          title: "The university health service is the cheapest and the fastest",
          body: "It is free, it is on campus, it does the screening, the vaccinations and the certificates, and it is the only place that understands what your programme requires. International students underuse it, and then pay a private clinic for something it would have done free.",
        },
      },
      travel: {
        body:
          "Book once the visa is issued, and land with enough margin for the online validation and the orientation week. The visa is valid as a residence permit, and it has to be validated within three months of your arrival, and the paperwork is easier to do from France than from a hotel in another country.",
        points: [
          "Book after the visa is issued. The visa is the document that gets you across the border, and the approval of an application is not a visa.",
          "Check the visa's validity period against your programme length and your arrival margin. A one-year visa for an eighteen-month programme is a problem you need to solve with the consulate before you travel, not after you land.",
          "Keep the accommodation proof with you, because it is one of the documents the visa was granted against and there may be a question about it on arrival.",
          "On arrival you will be fingerprinted and photographed for the residence permit database. It happens at the border, it takes a few minutes, and it is routine.",
          "Have a plan for the first night that matches your accommodation document, because a mismatch between the address on the attestation and the address you actually arrive at is a real and avoidable problem.",
        ],
        callout: {
          tone: "watch",
          title: "Land early enough to do the administrative work",
          body: "A student who arrives the day before the orientation has no time to validate the visa, register with the university, open a bank account and find a phone. The orientation week in France usually comes with a welcome and an integration programme, and turning up to it unprepared is a poor first impression on the people who administer your degree.",
        },
      },
      firstweek: {
        body:
          "The French first week has one dominant task, which is the VLS-TS validation, and one dominant benefit once it is done. Do the validation early and the rest of the week becomes ordinary.",
        points: [
          "Day one: validate the VLS-TS online, at the administration-etrangers-en-france site, using your visa number, your validity dates and your arrival date exactly as printed on the visa. Pay the stay tax online, or buy an electronic timbre if you have no bank card. Save the confirmation.",
          "Day one: the university enrolment. Present your admission letter, your visa, your attestation and your accommodation proof, and collect your student card, which is the document that opens the campus services, the library and the canteen.",
          "Day two: the bank account. A French student account needs proof of address and identity, and some banks will not open one for a student without the attestation d'hebergement or a residence document. Campus France publishes guidance on this, and some campuses have a partner bank on site for the first week.",
          "Day two: the CAF. The student housing allowance is worth applying for as soon as you can, and the application is quick. It is a real amount of money every month and the application takes longer than it should.",
          "Day three: the phone, the transport pass and the address formalities. A French number is needed for the university systems and for the CAF, and the transport pass depends on where you live rather than where you study.",
          "By the end of the week: check what your programme requires specifically, including the attendance, the placement or the internship paperwork, and any language requirement that is assessed in your first year rather than at admission.",
        ],
        callout: {
          tone: "good",
          title: "Validate in the first 72 hours, not the first three months",
          body: "The legal deadline is three months from arrival, and plenty of students treat it as a deadline. Validate in the first three days instead, because the validation confirmation is what the bank, the CAF and the university administrative offices want to see.",
        },
      },
      resources: {
        body:
          "Campus France publishes the arrival guidance and the practical steps, and France-Visas publishes the consular requirements. The university's own international office publishes the orientation details.",
        resources: [
          {
            title: "Campus France: student long-stay visa",
            kind: "official",
            url: "https://www.campusfrance.org/en/student-long-stay-visa",
            why: "The official source for this milestone and the whole long-stay student visa route in one place, including the attestation, the application steps and what happens on arrival.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Campus France: prepare your arrival in France",
            kind: "official",
            url: "https://www.campusfrance.org/en/organise-arrival-France",
            why: "The government's own arrival checklist, covering the documents, the housing, the health cover and the first formalities. The single most useful page to print and work through before you fly.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Campus France: getting a bank account",
            kind: "official",
            url: "https://www.campusfrance.org/en/getting-a-bank-account",
            why: "The official guidance on opening a French account as a foreign student, including what documents the banks ask for and why the attestation d'hebergement matters. It answers the question that blocks half of new arrivals.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Campus France: health and social security",
            kind: "official",
            url: "https://www.campusfrance.org/en/healthcare-student-social-security",
            why: "How student health cover works in France, what the university health service provides, and how the reimbursement works. The clearest explanation of a system that works in a different order from the others.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "France-Visas: student visas",
            kind: "official",
            url: "https://france-visas.gouv.fr/en/etudiant",
            why: "The consular authority's own page, with the document list for the long-stay student visa. Read it against your admission letter before you travel, not after you land.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official French sources for this checkpoint and the clearest complete set we found, not because anyone paid us. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "fr-vls-validation": {
    archetype: "pre-departure",
    intro:
      "Your long-stay visa, valid as a residence permit, must be validated online at the administration-etrangers-en-france site within three months of arriving, paying the 100 euro stay tax. Failing to validate restricts your ability to travel out of France, and it is the single most commonly missed step by international students in France.",
    sections: {
      checklist: {
        body:
          "The validation is one online form and one payment, and it is worth doing in the first week rather than in the third month. The reason to do it early is not the deadline; it is that the confirmation is what the bank, the university and the housing office want to see.",
        points: [
          "Go to administration-etrangers-en-france.interieur.gouv.fr and complete the validation for the VLS-TS.",
          "Enter your visa number, the validity dates and your arrival date exactly as printed on the visa. A typo in the arrival date is the most common reason a validation needs to be redone.",
          "Pay the 100 euro stay tax online, or buy an electronic timbre fiscal if you have no card that works online. Both are published methods and both produce a receipt.",
          "Save the confirmation, and put the visa details in your phone's notes as well, because you will need them again for the residence permit card, the bank and the university.",
          "If you have already been in France once on a student visa, check whether the previous stay was validated. The site knows the history, and an unvalidated earlier stay can complicate the current one.",
        ],
        callout: {
          tone: "watch",
          title: "Three months, and travel stops",
          body: "The deadline is three months from your arrival, and the consequence of missing it is that you cannot leave France and, in practice, that every administrative process you need to complete becomes harder. The date is not a guideline; it is printed on the visa and on the authorisation to travel.",
        },
      },
      health: {
        body:
          "Health is not the subject of the validation, but the documents that support it overlap, and the health cover attestation is one of the pieces a student discovers is required at exactly the moment they are trying to do something else.",
        points: [
          "The attestation d'assurance, or the attestation from the university health service, is the proof of health cover. The prefecture can ask for it during the residence permit process, and a university will often ask for it before it releases your final enrolment documents.",
          "The health cover attestation and the accommodation attestation are the two documents students most often have to produce twice, because they are required by the university, by the bank, and by the prefecture, and because different bodies want slightly different wording.",
          "Get both from the university rather than assembling them yourself. The university health service issues the health attestation in the form the prefecture accepts, and a privately issued one is sometimes refused on a technicality.",
          "If you have a condition that needs ongoing treatment, sort it in the first fortnight. French prescribing works differently, a pharmacy will want the clinical history, and the university health service is the place to start.",
        ],
        callout: {
          tone: "good",
          title: "Ask for both attestations at enrolment",
          body: "One request, one appointment, two documents: the attestation d'hebergement and the attestation d'assurance. It is the most efficient request you can make in your first week, and it removes a recurring problem for the rest of the year.",
        },
      },
      travel: {
        body:
          "The validation is what makes travel possible, and it is the part of the French system that students discover too late. The rule is simple and the consequence is not.",
        points: [
          "Until the VLS-TS is validated, you cannot travel outside France beyond the first three months of your stay. The visa authorises you to travel for those three months and then not at all, because it has not been converted into a validated residence permit.",
          "This means a student who has not validated cannot go home for Christmas, cannot attend a conference abroad, and cannot take a flight that is refundable in the way they planned. It is the reason to validate in week one rather than in month two.",
          "If you leave the country after validating, tell the university and check whether you need to report it and whether your status is affected. A short trip is normally straightforward, but the rules depend on the length of the trip and on your circumstances.",
          "Carry the validation confirmation when you travel, along with your passport, your visa and the residence permit card once you have it. The border in another country asks for evidence of legal status, and the confirmation is the evidence.",
          "Re-entering France after a trip means the border record is updated again. Check the record and make sure your arrival date is right, because the same clock that governs the validation governs your permitted absence.",
        ],
        callout: {
          tone: "watch",
          title: "Unvalidated means trapped, in a polite way",
          body: "Nobody stops you boarding a flight, and then you are in an airport in another country with a visa that no longer covers you. Validate the VLS-TS before you book anything that takes you out of France, and keep the confirmation with you when you do.",
        },
      },
      firstweek: {
        body:
          "If you only do one administrative thing in your first week in France, make it the validation. Everything else in this dossier for France is easier once it is done.",
        points: [
          "Day one: validate the VLS-TS online and pay the stay tax. Have your visa in front of you and copy the number, the validity dates and the arrival date exactly.",
          "Day one: complete the university enrolment and collect the student card, and ask for the attestation d'hebergement and the attestation d'assurance at the same desk, because both come from the same office and both are needed by other people.",
          "Day two: the bank account. Now that you have a validated visa and an address attestation, the bank questions are answerable, and several banks will open an account on the strength of them.",
          "Day two: apply for the CAF, the student housing allowance, and the social security number if you do not already have one. Both are needed for the allowance and both take a fortnight.",
          "By the end of the week: register your address with the university and the local authorities if you have moved, and check the date of the residence permit card appointment, because the card is what you carry as proof of your status.",
          "End of week: set a reminder for the three-month deadline anyway, even though you have already validated. The confirmation should be in your file, and a reminder makes sure you check it rather than assume it.",
        ],
        callout: {
          tone: "good",
          title: "Screenshot everything",
          body: "The validation confirmation, the visa details, the attestations and the university enrolment confirmation, all on your phone as well as in your files. French administrative offices ask for the same documents repeatedly, and having them in one place turns a half-day errand into a five-minute one.",
        },
      },
      resources: {
        body:
          "The official validation portal is where the form and the payment live, and Campus France explains the requirement in plain language. The consular authority covers the visa itself.",
        resources: [
          {
            title: "Campus France: validate your long-stay visa on arrival",
            kind: "official",
            url: "https://www.campusfrance.org/en/how-to-validate-your-long-stay-visa-visa-long-sejour-upon-your-arrival-in-france",
            why: "The official source for this milestone and the step-by-step explanation of the validation, the three-month deadline and the stay tax, written by the body that runs the student programme.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Administration of foreigners in France: the validation portal",
            kind: "official",
            url: "https://administration-etrangers-en-france.interieur.gouv.fr/",
            why: "The site where the validation is actually filed and paid for. This is the only place to do it, and doing it here is what produces the confirmation everyone else will ask you for.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Campus France: student long-stay visa",
            kind: "official",
            url: "https://www.campusfrance.org/en/student-long-stay-visa",
            why: "The whole visa route, including the attestation and the travel rules that the validation unlocks. Useful for understanding what you are validating and what it changes.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Campus France: the different types of visas",
            kind: "official",
            url: "https://www.campusfrance.org/en/the-different-types-of-visas",
            why: "The official explanation of the visa categories, and how the VLS-TS fits among them. It explains what the 'valid as a residence permit' wording on your visa actually means.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "France-Visas: FAQ",
            kind: "official",
            url: "https://france-visas.gouv.fr/en/faq",
            why: "The consular authority's own answers to the recurring questions about student visas, including the ones about arrival and the validation. Official and free.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official French sources for this checkpoint and the clearest complete set we found, not because anyone paid us. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "sg-pre-departure": {
    archetype: "pre-departure",
    intro:
      "Your Student Pass application must be submitted roughly a month before the course starts, so your travel date is constrained from both sides: not too early to process, not too late to complete the formalities. The Singapore Arrival Card and the ICA's own collection process decide what happens in your first week in the country.",
    sections: {
      checklist: {
        body:
          "Singapore is a paperwork country, and the pre-departure file is short but the deadlines are close together. Everything in this list is a document the ICA, the university or the hospital will ask for, and most of it will be asked for twice.",
        points: [
          "Your passport, your In-Principle Approval letter and your SOLAR acknowledgement. The SOLAR number is what the Student Pass application is built on, and the IPA letter is what tells you what you are allowed to do before the pass arrives.",
          "Your Student Pass approval, collected from the ICA, and your university's admission letter and enrolment confirmation. The programme name and start date on the documents must match the eForm 16 that was submitted, and a mismatch is worth checking before you travel.",
          "The Singapore Arrival Card, submitted online through the ICA's own service. It has to be completed within the window before you travel, and it is done online rather than on paper.",
          "Your pre-admission medical examination report, in the format the university required, with an official English translation if it is not in English.",
          "Your degree verification report and the confirmation that you completed the online verification of academic documents exercise, if your university required them.",
          "Your housing details: the address, the lease or the allocation, and the landlord or the agent's contact. It goes on the arrival card, and it has to be the address you are actually going to.",
        ],
        callout: {
          tone: "watch",
          title: "Check the eForm 16 for mistakes while you still can",
          body: "The eForm 16 is the form the Student Pass application is based on, and it is filled in by the university from the details you gave at application stage. If the programme name or the start date on it is wrong, that error is now in your immigration record. Ask the university to check it before you travel, because correcting it afterwards is a much bigger job.",
        },
      },
      health: {
        body:
          "The medical examination in Singapore is unusual in that it is normally done before you arrive, in your own country, by a physician the university has approved. The yellow fever certificate is a separate and separate-country requirement, and it is checked at the border.",
        points: [
          "The pre-admission medical examination is done at home if you can, through one of the approved physicians, and the result is uploaded in the format the university specified. Doing it at home is normally much faster than doing it in Singapore.",
          "The yellow fever vaccination certificate. Singapore requires it from travellers arriving from countries with a risk of yellow fever transmission, and the certificate has to be in the internationally accepted form, issued by an authorised centre. If you have been in such a country, this is checked at the border and it is not negotiable there.",
          "Bring your vaccination records. A copy of your immunisation history, translated, saves a repeat appointment and it is needed for some programmes on arrival anyway.",
          "Prescriptions. Singapore's rules on medication are strict. Bring the original packaging, the prescription and a doctor's letter, and check the controlled substance rules before you travel if anything you take is a controlled drug.",
          "Once you are enrolled, the university health service is where you go, and the university will tell you what to register and what to bring. It is a short list and they will email it to you, so watch for it rather than assuming.",
        ],
        callout: {
          tone: "good",
          title: "Do the medical at home, and check the yellow fever rules by route",
          body: "The pre-admission examination is the one thing in this dossier that is much easier to do before you fly than after you land, and the yellow fever certificate depends on which countries you have been in, so check the requirement against your actual route rather than your nationality.",
        },
      },
      travel: {
        body:
          "Your travel date is set by two deadlines: the Student Pass application window on one side and the offsite enrolment date on the other. Get the second one from the university in writing before you book the flight, because it moves.",
        points: [
          "The Student Pass application has to be submitted roughly a month before the course starts, and the application is made through the ICA's online system. That fixes the earliest sensible arrival date.",
          "Your university will schedule an offsite enrolment, and the course officially starts with it. Aim to be in Singapore before that date, not on it, because it may be a full day and the first day in a new country is a bad day for administration.",
          "Complete the Singapore Arrival Card online within the window before you travel. It is submitted electronically and it is tied to your travel details, so a change of flight means a change to the card.",
          "Carry the ICA documents in your hand luggage: the passport, the IPA letter, the SOLAR acknowledgement, the admission letter, the arrival card confirmation and the medical report. The ICA and the university will both ask.",
          "Singapore has strict rules on what you bring in, and they are enforced on arrival. Check the current prohibitions before you pack, particularly for food, plants, animals and medication.",
        ],
        callout: {
          tone: "watch",
          title: "Arrive before the offsite enrolment, not on it",
          body: "The offsite enrolment is where your student record, your course registration and a lot of your paperwork get started. Arriving the day before it means doing all of that in one day, on no sleep, in a country you have never seen.",
        },
      },
      firstweek: {
        body:
          "The Singapore first week is defined by the ICA appointment, and the things around it are fast: the country is small, the systems are digital, and most of the administrative work can be done in an afternoon once you have the right document.",
        points: [
          "Day one: the ICA appointment. Depending on your status, you may be required to attend in person to complete the formalities or to collect the Student Pass card, and your university's international office will tell you what your appointment is for. Bring the originals, not the printouts.",
          "Day one: the university orientation and course registration. Register for your modules or your research milestones, and check that the registration matches what the Student Pass application says your programme is.",
          "Day two: the bank account. The big local banks will open an account for a student with a passport, the SOLAR or the Student Pass approval, and an address. A local utility bill, a university letter or a National Library membership can be used as proof of address, and the National Library membership is the easiest one to get on your first day.",
          "Day two: the phone. A Singapore SIM needs a passport and a local address, and the telecommunications and immigration lines are both busy, so the phone plan is worth starting early.",
          "Day two or three: the transport card and the money. A Singapore transport card and an EZ-Link or equivalent are needed for the campus, and there are schemes for students that are worth asking the university about.",
          "By the end of the week: check the things the university asks for rather than the things you expect. The course registration confirmation, the medical report acknowledgement, the student handbook items, the academic integrity declaration, and the emergency contact and course registration deadlines.",
        ],
        callout: {
          tone: "good",
          title: "Get the National Library membership on day one",
          body: "It is free, it takes a few minutes, and it gives you a Singapore address and a local document that almost every bank and landlord accepts as proof of address. It solves a problem you would otherwise spend a week on.",
        },
      },
      resources: {
        body:
          "The Immigration and Checkpoints Authority publishes the Student Pass process, the SOLAR service and the arrival card, and the university's admissions handbook carries the intake-specific requirements.",
        resources: [
          {
            title: "ICA: Student Pass collection",
            kind: "official",
            url: "https://www.ica.gov.sg/reside/STP/collect",
            why: "The official source for this milestone and the authority's own page on what happens when you collect your Student Pass, what to bring and what happens if something is not in order. Read it before you go to the appointment.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ICA: Singapore Arrival Card",
            kind: "official",
            url: "https://www.ica.gov.sg/eservicesandforms/sgarrivalcard",
            why: "The official service for the arrival card, which has to be submitted online within the window before you travel. It is free, and there are sites that charge for a copy of it, which is not something you need.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ICA: SOLAR",
            kind: "official",
            url: "https://www.ica.gov.sg/eservicesandforms/solar",
            why: "The official SOLAR service, and the place to check your number and what it is used for. The Student Pass application is built on it, so it is worth understanding before you need it.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ICA: entering Singapore and visa requirements",
            kind: "official",
            url: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements",
            why: "The authority's page on entry requirements, including the health and vaccination conditions that are checked at the border. The right page to read against your route before you fly.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NUS: admission handbook",
            kind: "official",
            url: "https://science.nus.edu.sg/wp-content/uploads/2026/02/AdmissionHandbookAug2026.pdf",
            why: "The university's own handbook for the intake, including the medical examination requirements, the verification exercises and the enrolment steps. The most specific document available on what Singapore actually asks of you.",
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

  "sg-medical": {
    archetype: "pre-departure",
    intro:
      "A pre-admission medical examination is required, and it can be done in your home country before you arrive, which is usually much faster than completing it in Singapore. It is not a formality: the result has to be uploaded in the required format, by the stated deadline, with a translation if it is not in English.",
    sections: {
      checklist: {
        body:
          "Four items and they are all mandatory. The medical is the one checkpoint in the Singapore sequence where the work is done before you travel, which is also why it is the one most easily left too late.",
        points: [
          "Book the examination with an approved physician, in your home country if you can. The university's handbook names the approved physicians and the required form, and a result from a doctor who is not on the list is a result you will have to redo.",
          "Complete the examination before the university's stated deadline, not before your flight. The deadline is set against the intake, and the report then has to be uploaded and sometimes cleared, which takes time.",
          "Upload the report in the required format. Some programmes require a specific form, a specific document title, and a file naming convention, and a report uploaded outside the portal does not count.",
          "Get an official English translation if the report is not in English, and check who is allowed to certify it, because a translation produced by a friend is not an official translation.",
          "Keep the original. You will need it again: for the Student Pass file, for the university's health service on arrival, and for any clinical follow-up.",
        ],
        callout: {
          tone: "watch",
          title: "The deadline is about the upload, not the appointment",
          body: "The examination happening on time is not enough. The result has to be in the portal, in the right format, by the stated date, and it often has to be accepted as well as submitted. Find out whether there is a review step before you book the appointment, because it changes how much margin you need.",
        },
      },
      health: {
        body:
          "The pre-admission medical is a standard health assessment rather than a diagnosis, and its purpose is to identify anything that would affect your ability to do the course. It is also the point at which your immunisation history becomes important.",
        points: [
          "Bring a complete medical history: your past conditions, your surgeries, your current medication, your allergies, and your immunisation records. A thorough history makes the examination faster and the result more useful.",
          "The immunisation history is the part students under-prepare for. NUS and the other universities ask for specific immunisation evidence for some programmes, and the medical examination is the natural moment to establish what you already have and what you need.",
          "If you have a condition that might affect your programme, for example in a course with significant physical or laboratory work, say so at the appointment. The point of the examination is to identify it, and a condition identified early is manageable.",
          "Ask about the yellow fever certificate separately, because it is a border requirement rather than a university one, and it depends on your route. Travellers arriving from a country with a risk of yellow fever transmission need an internationally accepted certificate, and it is checked on arrival rather than afterwards.",
          "The university health service is where you go once you are enrolled, and they will tell you what to register and what to bring. Bring your report with you on the first day, because it is the document that starts the relationship.",
        ],
        callout: {
          tone: "good",
          title: "Collect your immunisation records before you leave home",
          body: "Getting a full vaccination history from your home doctor, translated and stamped, is far easier in your own country than trying to reconstruct it in Singapore. It is the most commonly missing document in the Singapore health file, and it is the easiest to sort while you are at home.",
        },
      },
      travel: {
        body:
          "The travel decision for this checkpoint is simple: do the medical at home, and leave enough time for the result to be uploaded and accepted before you fly. The health requirements themselves are the usual ones for a tropical, well-regulated port with strict border checks.",
        points: [
          "Do the examination at home, and allow weeks rather than days. A result that arrives in Singapore after you do is a result you will have to chase across two countries, and some of them cannot be chased at all.",
          "Check the current border health requirements for your route before you travel, and carry the yellow fever certificate if your route requires one. It is checked at the airport and a gap in a certificate cannot be fixed on arrival.",
          "Carry the medical report, the translation and the original vaccination documents in your hand luggage. They are needed for the Student Pass file, the university health service and the clinics, and they are not replaceable at the destination.",
          "Bring your prescriptions in the original packaging with the prescription and a doctor's letter. Singapore's rules on medication are enforced, and an unlabelled medication is a problem at the border.",
          "If you are travelling through a country with a health requirement of its own, check that country as well. Transit rules are less often thought about and they are the ones that cause a missed connection and a missed examination.",
        ],
        callout: {
          tone: "watch",
          title: "The report has to be in Singapore before the deadline",
          body: "Uploading a PDF from a laptop in another country is fine. Uploading it a week after the deadline is not, whatever the reason. Set the reminder for the upload date, not the examination date, and treat the earlier date as the real one.",
        },
      },
      firstweek: {
        body:
          "The medical checkpoint continues for a week after arrival, because the report has to be lodged with the university health service and because the health service wants to see you. It is a short piece of administration with a long lead time before it.",
        points: [
          "Day one: bring your medical report and the original documents to the university health service, and book the orientation appointment they will offer. The health service is where the file becomes part of your student record.",
          "Day one: complete the university enrolment and the course registration, and check whether the programme has any programme-specific health requirement that the general medical does not cover.",
          "Day two: if the university has prescribed anything, or if you have a condition that needs a local script, do it now, while you still have the energy and the whole medical file in one place. The university clinic and the local GPs can usually work from your overseas records, but they need the documentation you brought.",
          "By the end of the week: check that the uploaded report has been accepted rather than merely submitted, and put the acknowledgement with your other documents. A portal that says 'received' and a portal that says 'verified' are different states, and the second one is what you want.",
          "Before the end of the week: find out how the university handles ongoing care for a student with a pre-existing condition, including whether a letter for the school or for a future employer is available, and what it costs.",
        ],
        callout: {
          tone: "good",
          title: "One folder, one trip",
          body: "Passport, SOLAR, IPA, admission letter, medical report, translation, vaccination records, prescriptions, and the housing document. When every appointment in the first week asks for some of it, a single folder in your bag is the difference between ten minutes and ten trips.",
        },
      },
      resources: {
        body:
        "The university's own handbook carries the medical requirements for the intake, and the immigration authority carries the entry requirements for the border.",
        resources: [
          {
            title: "NUS: admission handbook",
            kind: "official",
            url: "https://science.nus.edu.sg/wp-content/uploads/2026/02/AdmissionHandbookAug2026.pdf",
            why: "The official source for this milestone, and the university's own statement of the medical examination requirements, the approved physicians, the deadline and the format of the upload. The document the requirement is actually written in.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NUS: international qualifications",
            kind: "official",
            url: "https://nus.edu.sg/grad/admissions/international-qualifications",
            why: "NUS's own requirements for qualifications obtained outside Singapore, including the document verification rules that sit alongside the medical. Read them together, because they are part of the same file.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NUS: health services",
            kind: "official",
            url: "https://nus.edu.sg/osa/health-services",
            why: "The university health service's own pages, covering what they do for students, what the charges are and what to bring to the first appointment. It is the destination for the report you uploaded.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ICA: entering Singapore and visa requirements",
            kind: "official",
            url: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements",
            why: "The immigration authority's own entry conditions, including the health and vaccination requirements that are checked when you land. The right page to read against your route before you fly.",
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

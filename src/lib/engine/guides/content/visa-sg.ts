import type { GuideContent } from "../types";

const V = "2026-10-20";

/**
 * The Singapore Student Pass dossiers.
 *
 * The Singapore Student Pass is a three-stage sequence with a hard physical
 * constraint in the middle, and the constraint is the thing that catches people.
 * You cannot complete the formalities from abroad, and you cannot be in
 * Singapore without a valid pass, so the whole process has to be arranged so
 * that you arrive with a short-stay entry permission and leave with the real
 * one.
 *
 * Three things this file keeps returning to:
 *
 *   1. THE UNIVERSITY FILES FIRST, YOU FILE SECOND. Your university registers
 *      you with ICA and emails you the SOLAR login details. Nothing can be
 *      submitted until that email arrives.
 *   2. THE SEVEN-DAY PAYMENT CLOCK IS REAL. ICA withdraws the application if
 *      the S$45 processing fee is not paid within seven days of you completing
 *      eForm 16.
 *   3. THE IPA LETTER IS YOUR VISA, NOT YOUR PASS. It gets you into the
 *      country. The Student's Pass is issued only after you attend the formalities
 *      in person.
 */
export const VISA_SG: Record<string, GuideContent> = {
  "sg-ica-stp": {
    archetype: "visa",
    intro:
      "Nobody applies for a Singapore Student's Pass alone. Your university registers you with the Immigration and Checkpoints Authority through the SOLAR system and emails you your login details, and only then can you submit the eForm 16, upload your documents and pay the processing fee. The seven days you have to pay in are the hardest deadline in the whole sequence.",
    sections: {
      route: {
        body:
          "The Student's Pass application runs through SOLAR, the Student's Pass Online Application and Registration system operated by ICA. Your institution starts it, you finish it. The university's role is to confirm that you are a registered student at an approved institution, which is what makes you eligible to apply at all.",
        points: [
          "Your university registers you with ICA and sends you a Registration Acknowledgement Letter with your SOLAR login details. Until that arrives, the application cannot begin, and no amount of preparation on your side shortens it.",
          "You then submit the eForm 16 yourself through SOLAR, upload the supporting documents, and pay the processing fee. The university does not do this part for you.",
          "ICA publishes the requirement that a new Student's Pass application must be submitted at least one month and not more than two months before the course commences, and NUS states the eForm 16 must be submitted no later than one month before the course starts. Read both, because they describe the same window from two ends.",
          "The eForm 16 is the application. It cannot be amended after submission, which means everything you type into it has to be right the first time, including your course and your travel document details.",
        ],
        callout: {
          tone: "watch",
          title: "One submission, no edits",
          body: "eForm 16 cannot be amended after you submit it. A wrong course name, a misspelled name or a passport number that does not match your travel document is a withdrawal and a fresh start, not a correction.",
        },
      },
      documents: {
        body:
          "The document set for SOLAR is small and specific, and the two items people get wrong are the photograph and the medical report. Both have published standards, and both are checked.",
        points: [
          "Your Registration Acknowledgement Letter from the university, which proves ICA has you registered.",
          "A clear image of the biodata page of your passport, uploaded to SOLAR. A blurred scan causes a delay and ICA may ask for a second copy, and a rejection of the eForm 16 because of a blurry scan costs you a fresh submission.",
          "A recent passport-sized colour photograph, taken within the last three months, against a white background and to ICA's stated dimensions. The rules are published and a printed photo from a different country is often rejected on the background alone.",
          "The ICA medical examination report, on the form ICA prescribes, completed by a registered medical practitioner. This is not something your own doctor can do on their own paperwork, and a report on the wrong form is not accepted.",
          "Your birth certificate, where it applies, and the personal information the form asks for: your address in Singapore if you have one, your email, your Singapore mobile number if you have one, and the details of your education, employment and countries of previous residence.",
          "Your Terms and Conditions of Student's Pass acknowledgement, which is a document you sign and upload rather than a form you fill in.",
        ],
      },
      appointments: {
        body:
          "There is no appointment for the SOLAR application itself, because it is done online. There are two appointments that belong to this sequence and they are booked by different people: the medical examination, which you book with the clinic, and the offsite enrolment session, which your university books for you.",
        points: [
          "The medical examination is the appointment to book first, because the report has to be complete before you upload it, and the result takes time to reach the clinic's system. Book it as soon as you have the SOLAR details.",
          "Only a registered medical practitioner can complete the ICA medical form, and not every clinic will do it. Your university's international office can usually point you at one that does.",
          "The offsite enrolment session is booked by your university, not by you, and walk-ins are not accepted. It is scheduled around the start of term, and some sessions fall after teaching has already begun.",
          "The Singapore mobile number is part of the appointment, not an afterthought. ICA sends a one-time password by SMS during the formalities, so a number you do not have on the day stops you finishing.",
        ],
        callout: {
          tone: "good",
          title: "Get a Singapore number early",
          body: "The offsite enrolment formalities are driven by an SMS one-time password to a Singapore mobile number, and it is written on the first page of your IPA letter. Secure the number before you fly, and write it on the letter when it arrives.",
        },
      },
      money: {
        body:
          "There is a small processing fee with a very short deadline attached to it, and it is the one fee in this sequence that can cost you the whole application if you miss it.",
        points: [
          "The Student's Pass application processing fee is S$45, and it has to be paid within seven days of you completing the eForm 16. If it is not paid in that window, ICA withdraws the application and you start again.",
          "The seven days run from the completion of the form, not from the lodgement of the supporting documents. If you complete the form on a Friday, the clock is already running over the weekend.",
          "Payment is by card or by the payment methods SOLAR accepts, and the payment page is where the seven-day clock is enforced. A failed payment that does not go through is not a payment, and the clock does not stop for it.",
          "The Student's Pass issuance fee is separate, and is payable at the offsite enrolment session. If ICA needs a visa for you, the multiple journey visa fee is also payable at that point. ICA publishes the current amounts and the session is where they are charged.",
          "The medical examination is a private cost, and it is not a small one. Budget it early, because it has to happen before the SOLAR application can be completed.",
        ],
        callout: {
          tone: "watch",
          title: "Seven days, and the clock starts at the form",
          body: "Pay the S$45 within seven days of completing the eForm 16 or ICA withdraws the application. Put a calendar reminder on the day you submit the form, not on the day you remember it.",
        },
      },
      rules: {
        body:
          "The rules below are the ones that turn a straightforward application into a second attempt, and they mostly come down to one thing: the details in the form have to be exactly what is in your passport.",
        points: [
          "Your name, passport number, date of birth, nationality and travel document details in the eForm 16 must match your passport exactly. A mismatch on the passport number is a rejection, and a mismatch on the name order is a rejection too.",
          "The course information you enter must match the course you are actually enrolled in. A wrong course name produces an IPA letter for a course you are not taking, which then has to be resolved with the university.",
          "For applicants with dual citizenship, the passport you enter is the passport you will use to enter Singapore. Entering a different one creates a problem at the border rather than in the form.",
          "The medical report has to be the ICA's form, completed and signed by a registered medical practitioner, and it has to be uploaded rather than photographed in a way that makes the signature unreadable.",
          "The photograph has to be recent, against a white background, and to ICA's specifications. These are published and they are checked mechanically, so a technically decent photo that fails the background rule is still a rejection.",
          "If ICA asks you for more information, respond within the period it gives, which is 14 days from notification, and respond completely. An unanswered request stops the application.",
        ],
      },
      timing: {
        body:
          "The sequence has four clocks running at once: the window in which you may submit, the seven days to pay, the processing time after you pay, and the course start date. Missing the first two is what costs you the place.",
        points: [
          "Work back from the course start. The application must be submitted at least one month and not more than two months before the course commences, so the one-month mark is a hard stop and the two-month mark is where you should aim.",
          "NUS states the eForm 16 must be submitted no later than one month before your course commences. Treat that as the deadline, not the two-month window, and aim to submit closer to the two-month end so that processing time is inside your plan.",
          "Book the medical examination as soon as you have the SOLAR details, and allow for the report to reach you. It is a variable step and it sits directly in the path of your upload.",
          "Pay the S$45 within seven days. This is the one deadline that is measured in days rather than weeks and it is the one that ends applications.",
          "After payment, ICA's published service commitment for a Student's Pass is within 2 weeks for institutions with EduTrust status and within 1 month for the others. Your university's own guide may add its own advice, and NTU's says to allow one week without a visa and two weeks with one.",
        ],
        callout: {
          tone: "good",
          title: "Work back from the start date, not forward from today",
          body: "Pick the course start date, subtract one month, and that is your submission deadline. Then subtract the medical examination, then the payment, then the processing time, and you have a schedule that actually works.",
        },
      },
      resources: {
        body:
          "ICA publishes the rules and the process itself, and your university's registrar page carries the local dates and the local sequence. Both are needed, because the university is the one that starts the application and ICA is the one that decides it.",
        resources: [
          {
            title: "NUS Registrar: Student's Pass",
            kind: "official",
            url: "https://www.nus.edu.sg/registrar/academic-activities/student-pass",
            why: "The university's own guide to the Student's Pass process, including the SOLAR sequence, the one-month submission rule and the offsite enrolment dates for the current intake. It is the local version of the national rules.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ICA: SOLAR",
            kind: "official",
            url: "https://www.ica.gov.sg/eservicesandforms/solar",
            why: "The eService where the eForm 16 is actually submitted, with the list of what ICA needs and the information required for a Student's Pass application. This is where the application is filed.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ICA: becoming a Student's Pass holder",
            kind: "official",
            url: "https://www.ica.gov.sg/reside/STP/apply",
            why: "ICA's explanation of who needs a Student's Pass, how to apply, and the window in which a new application must be submitted. The eligibility and timing rules come from here.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ICA: our service commitment",
            kind: "official",
            url: "https://www.ica.gov.sg/about-us/our-service-commitment",
            why: "ICA's published processing times, including the two weeks for EduTrust institutions and one month for the others. This is the number to plan your arrival around.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official ICA and university pages that the application is actually filed against. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "sg-ipa-visa": {
    archetype: "visa",
    intro:
      "The In-Principle Approval letter is the document that gets you into Singapore, and if your nationality needs a visa to enter, the entry visa is inside it. It is not the same thing as a Student's Pass, and the distinction matters immediately, because the letter does not by itself let you remain in the country.",
    sections: {
      route: {
        body:
          "ICA assesses your Student's Pass application and issues an In-Principle Approval letter. Where a visa to enter Singapore is required, that visa is issued as part of the letter. Where one is not, the letter and the electronic visit pass issued with it are what you travel on, and the letter still has to be validated with ICA before it becomes your Student Pass.",
        points: [
          "The IPA letter is the outcome of the Student's Pass application, not the Student's Pass itself. The pass is issued later, in person, at the offsite enrolment session.",
          "If your nationality requires a visa to enter Singapore, the entry visa is included in the IPA letter and the letter becomes your travel document for the journey. If it does not, you travel on the electronic visit pass and the letter together.",
          "Either way, the letter is the document that proves you have been assessed as a genuine student, and it is what your university, your housing and your airline will ask for.",
          "The letter is issued digitally through SOLAR, and it is printed out and signed in a specific way, with your Singapore mobile number written on the first page. That signature is what ties you to the OTP used at the formalities.",
        ],
        callout: {
          tone: "watch",
          title: "The IPA letter is not a pass",
          body: "The validity of the IPA letter does not by itself constitute a valid pass to remain in Singapore. The electronic visit pass is what keeps you lawful while you are here, and the Student Pass is what replaces it.",
        },
      },
      documents: {
        body:
          "The IPA letter is a single document and it needs to be handled carefully, because the handling of it is part of the next stage. Alongside it there is one online form and one paper form that is easy to forget.",
        points: [
          "The IPA letter itself, downloaded from SOLAR, printed, and signed. Write your Singapore mobile number on the first page, because ICA uses it to send the one-time password during the offsite enrolment formalities.",
          "The SG Arrival Card, submitted online before you travel. It is a separate free form and it is not connected to the Student Pass application.",
          "Your passport, because the letter has to be consistent with the travel document you will use at the border.",
          "Anything ICA asks you to clarify. ICA may contact you with a request for more information, and you have 14 days from the notification to respond.",
          "Your confirmation of the offsite enrolment session, so you know the date and time slot you have to be there for.",
        ],
      },
      appointments: {
        body:
          "There is no appointment between the IPA letter and the formalities. The one appointment ahead of you is the offsite enrolment session, and it is booked by your university rather than by you, which is why it arrives as a date in your university portal rather than as something you arranged.",
        points: [
          "The offsite enrolment session is scheduled around the start of term, and for NUS Semester 1 the published sessions in 2026 ran from late July into late August, so some of them fall after teaching has started. Check the dates your own university publishes for your intake.",
          "You have to attend the session you are booked for. Walk-ins are not accepted, because the formalities need a controlled appointment and a matching one-time password.",
          "Bring a Singapore mobile number that is working on the day, because the one-time password is sent by SMS as part of the process.",
          "The SG Arrival Card is submitted online and needs no appointment, but it has to be done in a three-day window before you travel, so put it in the same plan as the flight booking.",
        ],
      },
      money: {
        body:
          "The processing fee has already been paid by the time the letter arrives, and the remaining charges land at the offsite enrolment session. There is also a question about your money in Singapore that the letter settles, which is whether you are allowed to be in the country on this document at all.",
        points: [
          "The S$45 processing fee was paid as part of the application. Keep the receipt, because it is the proof that the application was complete, and it is what ICA checks if there is a question about a withdrawal.",
          "The Student's Pass issuance fee is payable at the offsite enrolment session, and so is the multiple journey visa fee where a visa was issued. ICA publishes the current amounts and both are charged at the session.",
          "You may be asked to provide a Singapore local mobile number for the formalities, and some institutions require proof that you have one. A prepaid or tourist SIM bought at the airport is the usual route, and it is cheap, but it has to be working with SMS.",
          "The letter does not change your living cost. Housing in Singapore is the largest line and it is set by the university and the private market, not by ICA, and the deposit is usually due before the semester starts.",
        ],
      },
      rules: {
        body:
          "The rules at this stage are about what the letter permits and about the one form students forget.",
        points: [
          "The IPA letter and the electronic visit pass together are what let you enter and remain in Singapore legally between arrival and the formalities. The letter on its own is not a pass, and the distinction is enforced.",
          "The SG Arrival Card must be submitted within three days before departure, it is free, and it is separate from the Student's Pass application. There is no legitimate reason to pay anyone to do it for you.",
          "The details on the letter, including the validity dates, have to match the electronic visit pass issued with it and your travel documents. Check the dates as soon as you download it, because a wrong date is a problem with the airline before it is a problem with you.",
          "You must be in Singapore for the formalities, which means you have to plan the trip around a date rather than the other way round. If the offsite enrolment session is after your teaching starts, you are arriving for the session, not for the first lecture.",
          "If ICA requests clarification, respond within 14 days of the notification. The clock is short relative to everything else in this process.",
          "The IPA letter is evidence of your status, so keep it in a form you can produce on request, digitally and on paper, because your university, your accommodation and possibly a landlord will each ask for it.",
        ],
        callout: {
          tone: "watch",
          title: "Three days, and free",
          body: "The SG Arrival Card is submitted online within three days before you travel, and it costs nothing. Official portals to do this are provided by the government, and anything charging you for the form is not the government.",
        },
      },
      timing: {
        body:
          "Two figures decide this stage, and they are not the same. ICA publishes one processing commitment, and universities publish their own practical advice, and the second is often shorter than the first.",
        points: [
          "ICA's published service commitment for a Student's Pass is within 2 weeks for institutions with EduTrust status and within 1 month for institutions without. EduTrust is a status most of the autonomous universities hold, so check which side of that line your university is on.",
          "NTU's own guide advises allowing one week where no visa is required and two weeks where one is. That is shorter than the ICA commitment and is the more useful number for planning, because it comes from the institution that has to enrol you in time.",
          "The SG Arrival Card goes in three days before departure. It is the tightest window in the sequence and it is the one that is easy to leave late.",
          "The offsite enrolment session is the date everything else is arranged around, and it is often after the start of teaching. Get it confirmed with your university before you book a flight, not after.",
          "Allow a buffer between arrival and the session for the things that cannot be done in advance: a local phone number, a local address if you do not have one yet, and a bank account if your university needs one.",
        ],
        callout: {
          tone: "good",
          title: "Confirm the session date before the flight",
          body: "The offsite enrolment date is the fixed point in this whole sequence. Everything else, including the arrival, the accommodation and the flight, is arranged around it, and it is your university that sets it.",
        },
      },
      resources: {
        body:
          "ICA publishes the service commitment, the SG Arrival Card service and the rules on entering Singapore, and your university's registrar page carries the local dates. All three are needed at this stage.",
        resources: [
          {
            title: "ICA: our service commitment",
            kind: "official",
            url: "https://www.ica.gov.sg/about-us/our-service-commitment",
            why: "ICA's published processing times for a Student's Pass, including the two weeks for EduTrust institutions and one month for the others. This is the number you plan your arrival around.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ICA: SG Arrival Card",
            kind: "official",
            url: "https://www.ica.gov.sg/eservicesandforms/sgarrivalcard",
            why: "The official service for the card you must submit before you travel. It is free, it takes a few minutes, and it is the only legitimate way to do it.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ICA: entering Singapore and visa requirements",
            kind: "official",
            url: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements",
            why: "The entry rules for your nationality, which determines whether your IPA letter carries a visa or whether you travel on the electronic visit pass. This is the page that settles the question before you fly.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NUS Registrar: Student's Pass",
            kind: "official",
            url: "https://www.nus.edu.sg/registrar/academic-activities/student-pass",
            why: "The university's own guide to the process, including what to do with the IPA letter once it arrives and how the offsite enrolment session works.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official ICA and university pages that carry the processing times, the arrival form and the entry rules. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "sg-ose": {
    archetype: "visa",
    intro:
      "This is the part of the Singapore Student Pass that has to happen in person, on the ground, and it is the reason the whole sequence is arranged around a date. You complete the formalities at an offsite enrolment session, and only then is the Student Pass issued, digitally, to your Singpass and FileSG accounts.",
    sections: {
      route: {
        body:
          "The formalities are the biometric enrolment and identity verification that turn your approved application into a physical Student Pass. They happen at an offsite enrolment session run by ICA with the university, and because biometrics are involved, you have to be there in person. There is no remote version of this step.",
        points: [
          "The session covers identity verification, photograph and fingerprint collection, the acknowledgement of the terms and conditions of the Student's Pass, and the payment of the issuance fee.",
          "Your Student Pass is issued digitally, through the Singpass app and FileSG. There is no physical card, and the NUS guidance is explicit that no physical Student's Pass card is issued.",
          "You complete the formalities on an electronic visit pass that is tied to the IPA letter, which is why the letter and the visit pass have to be valid on the day.",
          "The session is run by ICA with the university, so the instructions come from the university even though the formalities are ICA's. If you have a question about the session itself, the university's registrar or international office is the right place to ask.",
        ],
        callout: {
          tone: "watch",
          title: "You cannot do this from abroad",
          body: "The formalities have to be completed in Singapore, in person, and only after you have entered the country. Any plan that puts the session before your arrival is not a plan, and arriving too early is a cost with no benefit.",
        },
      },
      documents: {
        body:
          "You bring very little to the session, because most of the document work was done in SOLAR, but what you bring is what the session runs on.",
        points: [
          "The IPA letter, printed, signed, with your Singapore mobile number written on the first page. That number is where the one-time password goes, and without it you cannot complete the session.",
          "Your passport, for identity verification and for the biometric records.",
          "The ICA medical examination report, if ICA has asked for it at this stage rather than during the SOLAR application.",
          "Your Singapore mobile number, and a working phone to receive the one-time password on. A number that is not in service is a failed session.",
          "The Terms and Conditions of Student's Pass acknowledgement, if it has not already been submitted through SOLAR.",
          "A means of payment for the issuance fee, and for the multiple journey visa fee where a visa was issued.",
        ],
      },
      appointments: {
        body:
          "The session is a booked appointment with a date and a time slot, and it is booked by your university rather than by you. Walk-ins are not accepted, which is unusual and deliberate, because the session is a controlled process with identity checks and a password-based authentication.",
        points: [
          "Your university books the sessions and publishes the dates for your intake. NUS ran offsite enrolment for Semester 1 in 2026 on 24 July, then 27 to 31 July, then 4, 21, 24 and 25 August, so the sessions cluster around the start of term and several of them fall after teaching has begun.",
          "Attend on your scheduled date and time slot. Arriving on the right day but the wrong slot is still a wait, and on the busiest days the queue is long.",
          "If you cannot attend your session, contact the university and ask for another one rather than missing it. There is a limited number of sessions and they are published in advance, so a reschedule is possible if you ask early.",
          "Bring a working Singapore mobile number, because the one-time password arrives by SMS during the session. Check that the SIM is active and that messages are not being filtered before you walk in.",
        ],
      },
      money: {
        body:
          "Two fees are payable at the session, and they are the last of the Student's Pass costs. The S$45 processing fee from the application stage has already been paid, and it is not the same thing as either of these.",
        points: [
          "The Student's Pass issuance fee is payable at the session, and ICA publishes the current amount. It is a separate charge from the S$45 processing fee you paid when you submitted the eForm 16.",
          "The multiple journey visa fee applies only if a visa was issued to you, which depends on your nationality. ICA publishes the amount and it is collected at the same time.",
          "Bring a card as well as cash if the session accepts both, and check what the session accepts before you go. A session where the card terminal is down is a bad way to discover a payment problem.",
          "After this, the Student Pass is valid for the period stated on it, and it is what authorises your stay and your part-time work in Singapore, subject to the conditions attached to the pass.",
        ],
        callout: {
          tone: "good",
          title: "The last payment, and the last fee",
          body: "After the issuance fee, the Student Pass costs are paid. Keep the receipt, because it is the evidence that the pass was issued, and the digital pass is the document you will be asked for from then on.",
        },
      },
      rules: {
        body:
          "The rules at this stage are short, and they are all about presence and identity. None of them is a matter of judgement, and all of them are enforced on the day.",
        points: [
          "You must be physically in Singapore, on a valid pass, to complete the formalities. The IPA letter is a visa and an approval, and the electronic visit pass that goes with it is what makes your presence lawful while you wait for the Student Pass.",
          "The biometric enrolment has to be done by you. A friend cannot attend on your behalf, and the whole point of the session is that the identity records are yours.",
          "The Singapore mobile number written on the first page of the IPA letter is the number the one-time password goes to, and it has to be a number you control in Singapore. A number belonging to someone else fails the check.",
          "The Student Pass is digital, delivered through the Singpass app and FileSG. There is no physical card, and any site offering to mail you one is offering something that does not exist.",
          "Register for a Singpass account as part of the process, because that is where the pass is delivered, and a student who has not registered cannot receive the document that proves their status.",
          "Overstaying is a punishable offence. The validity period of the electronic visit pass is short relative to a full course, and the Student Pass replaces it only once the formalities are complete.",
        ],
        callout: {
          tone: "watch",
          title: "The visit pass is short and the Student Pass is not",
          body: "The electronic visit pass that carries you while you wait for the Student Pass has a limited validity, and the formalities exist to replace it. Do not let the session slip, because the document keeping you legal is the one that expires.",
        },
      },
      timing: {
        body:
          "This checkpoint has one date that matters, and everything else in your Singapore plan is arranged around it. The offsite enrolment session is the fixed point, and it is usually close to the start of term rather than comfortably before it.",
        points: [
          "Confirm your session date with the university as soon as it is published, and treat it as fixed. It is the date you fly around, not the one you fly around.",
          "Arrive in Singapore with enough time before the session to do the things that need doing in the country: a local mobile number, a local address if you do not have one, and a bank account if the university asks for one.",
          "Bring a working phone to the session. The one-time password is part of the process and a session that stops because of a phone is an avoidable loss of a week.",
          "After the session, the digital Student Pass appears in the Singpass app and on FileSG. Check that you can actually log in and see it, rather than assuming it has landed.",
          "If the session falls after your teaching starts, you will be doing a formalities session and a first week at the same time. Plan the first week around the session rather than the other way round.",
        ],
        callout: {
          tone: "good",
          title: "Arrive, settle, enrol",
          body: "Land a day or two before the session, get a local SIM, and make sure you can get to the venue. The session itself takes an hour or so. The week of administration around it takes longer, and it is the one you should plan for.",
        },
      },
      resources: {
        body:
          "ICA publishes the formalities and the issuance process, and your university's registrar page carries the session dates and the local instructions. The university's guide is the one that tells you what to bring.",
        resources: [
          {
            title: "NUS Registrar: Student's Pass",
            kind: "official",
            url: "https://www.nus.edu.sg/registrar/academic-activities/student-pass",
            why: "The university's guide to the offsite enrolment session, including the published dates for the intake, the need to book a slot rather than walk in, and what happens to the digital pass afterwards.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ICA: completion of formalities and issuance of Student's Pass",
            kind: "official",
            url: "https://www.ica.gov.sg/reside/STP/collect",
            why: "ICA's own page for the last stage, including the medical report requirements, the note that the letter does not guarantee entry or stay, and how the pass is issued. This is the authority for the session itself.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ICA: becoming a Student's Pass holder",
            kind: "official",
            url: "https://www.ica.gov.sg/reside/STP/apply",
            why: "The eligibility and the full sequence in one place, so you can check that nothing between the eForm 16 and the formalities has been left out.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ICA: entering Singapore and visa requirements",
            kind: "official",
            url: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements",
            why: "The entry rules and what you need before you travel, including the electronic visit pass that makes your stay lawful between arrival and the Student's Pass being issued.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official ICA and university pages that describe the formalities and the collection of the pass. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },
};

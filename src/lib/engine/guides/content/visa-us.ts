import type { GuideContent } from "../types";

const V = "2026-10-20";

/**
 * The US student visa dossier.
 *
 * The US student visa has three checkpoints and one long queue. What makes it
 * different from the UK and Canada is that nothing in it is set by a single
 * published schedule: the money you must show is set by your school, the
 * appointment you need is set by the post you apply through, and the wait time
 * is published per post and changes monthly.
 *
 * Three distinctions this dossier keeps making, because they are the ones that
 * actually cost people time:
 *
 *   1. THE I-20 IS NOT A VISA. It is a certificate of eligibility issued by
 *      your school. It lets you apply for a visa. It does not let you travel.
 *   2. THE ORDER IS FIXED. I-20, then the SEVIS fee, then the DS-160, then the
 *      interview booking. Each step needs the identifier from the one before.
 *   3. THE WAIT TIME IS PUBLISHED, PER POST, AND IS NOT A PROMISE. The Global
 *      Visa Wait Times table gives you the number for your own city, and it is
 *      the number that should set your schedule.
 */
export const VISA_US: Record<string, GuideContent> = {
  "us-i20": {
    archetype: "visa",
    intro:
      "The Form I-20 is the document that turns an offer into a visa application, and the I-901 SEVIS fee is the toll gate in front of it. Your school's designated school official issues the I-20 only after you have shown them how the year is paid for, and until that fee is paid no US post will let you complete a visa application.",
    sections: {
      route: {
        body:
          "There are three US student visa categories, and the form your school issues tells you which one you are on. An academic programme at a university is F-1 and comes with a Form I-20. A vocational programme is M-1 and also comes with an I-20. An exchange programme is J-1 and comes with a Form DS-2019, which is the single most important thing to check when your admission paperwork arrives.",
        points: [
          "F-1 is for academic or language study at a SEVP-certified school. It is the category almost every master's student is on, and the one the rest of this dossier assumes.",
          "M-1 is for vocational training. The work rules are tighter than F-1, and only SEVP-certified vocational programmes can issue one.",
          "J-1 is for exchange visitors, which includes many funded research students and scholars. It comes with a DS-2019 rather than an I-20, and its rules come from the exchange category rather than from the school.",
          "If your funding comes from a home government, a research council or an international exchange programme, ask which category you are on before you sign anything. Some J-1 categories carry a two-year residency requirement back home at the end of the programme, and F-1 does not.",
        ],
        subsections: [
          {
            title: "F-1: academic study",
            what: "A student visa for academic or language study at a school certified by the Student and Exchange Visitor Program.",
            format: "The I-20 carries your SEVIS ID, the programme start and end dates, the estimated cost of attendance and the source of funding.",
            score: "The I-20 is signed by the designated school official and by you. Both signatures are required before it is a valid certificate of eligibility.",
            topics: [
              "You may work part time on campus, and full time during practical training after one full academic year. Those rights belong to the F-1 category, not to your school.",
              "A new student F or M visa can be issued up to 365 days before the programme start date, but you may not enter more than 30 days before it.",
            ],
            tip: "Check the programme start date on the I-20 before you sign. That date, not the one in your admission letter, governs when you are allowed to land.",
          },
          {
            title: "J-1: exchange visitor",
            what: "For exchange visitors, including many sponsored research students and scholars.",
            format: "The DS-2019 plays the same role as the I-20, carrying the SEVIS ID, the programme dates and the programme number that decides your obligations.",
            score: "Signed by the sponsor and by you, in the same way.",
            topics: [
              "Some J-1 categories carry a two-year home-country residency requirement after the programme ends. The programme number on your DS-2019 tells you which category you are in.",
              "The paperwork order differs from F-1, and some research sponsors ask for the I-901 payment and the DS-2019 before they will release anything else.",
            ],
            tip: "If your funding comes from a home government or a research council, settle the category first. It changes the form, the fee and the rules for the rest of your time in the country.",
          },
          {
            title: "M-1: vocational training",
            what: "For vocational and non-academic training programmes.",
            format: "The same I-20 form, issued with an M-1 designation and a vocational programme description.",
            score: "Signed by the school and by you.",
            topics: [
              "M-1 students generally cannot work off campus, and practical training is more tightly limited than it is for F-1.",
              "Only a SEVP-certified vocational programme can issue an M-1 I-20, so confirm certification before you rely on the offer.",
            ],
            tip: "M-1 is worth checking early because the work rights are narrower. Assuming F-1 rights and discovering otherwise after you arrive is an expensive mistake.",
          },
        ],
        callout: {
          tone: "watch",
          title: "The form decides the visa, not the programme title",
          body: "The I-20 and the DS-2019 look almost identical and both carry a SEVIS ID, so they get confused. But the form you are issued decides which visa category you apply for, and the category decides your work rights and, in some J-1 categories, an obligation to return home for two years. If your paperwork says DS-2019, do not file an I-20 application by habit.",
        },
      },
      documents: {
        body:
          "The I-20 is issued by the school, not by you. What you do is send the school the evidence that the first year is paid for, and then return the signed form. Everything else in this stage exists to make the I-20 appear, and one document exists only to prove you paid a fee.",
        points: [
          "Your school's financial certification form, with your own bank statements attached, and a sponsor affidavit if a parent or sponsor is paying. This is the document that starts the I-20.",
          "The signed I-20, returned to the school. Your school keeps the original. You keep a copy, and the copy is what you carry to the interview.",
          "The I-901 SEVIS payment confirmation, printed from the official site. It is not filed with the school; it is your proof of payment, and you carry it to the interview.",
        ],
        subsections: [
          {
            title: "What the school asks for",
            what: "The evidence the school needs before the designated school official will issue an I-20.",
            format: "Usually a school-specific financial certification or financial affidavit form, plus the supporting bank statements the school asks for.",
            score: "The amount is set by the school, not by the US government. It is normally the first year's tuition and living costs as that school has calculated them.",
            topics: [
              "Bank statements covering the period the school asks for, in your name or in your sponsor's name.",
              "A sponsor affidavit from whoever is funding you, with their own statements and evidence of the relationship.",
              "Evidence of any scholarship or assistantship already awarded, if the school counts it toward the total.",
            ],
            tip: "Send the whole packet in one submission. Schools handle a complete file far better than a partial one, and each round trip is weeks of visa runway you cannot buy back.",
          },
          {
            title: "What the I-20 itself says",
            what: "The Certificate of Eligibility for Nonimmigrant Student Status, issued by the designated school official.",
            format: "A short document with the SEVIS ID at the top and the programme details in the boxes below it.",
            score: "It must be signed by you and by the school before it is valid. Your signature is a legal declaration that the contents are true.",
            topics: [
              "The programme start and end dates, which drive both when you may enter and how long your status lasts.",
              "The estimated cost of attendance: tuition, living costs and mandatory health insurance, less anything the school expects to provide.",
              "The funding source. If it says personal funds and a sponsor is actually paying, that mismatch is worth fixing before the interview rather than explaining at the window.",
            ],
            tip: "Read every field against your admission letter and your own bank statement. A wrong programme date on the I-20 causes more refused visas than a weak interview does.",
          },
          {
            title: "The I-901 SEVIS payment",
            what: "The fee that funds the Student and Exchange Visitor Program, paid separately from and before the visa application.",
            format: "An online payment through the official I-901 site, using the SEVIS ID, surname and date of birth from your I-20.",
            score: "ICE publishes the amounts: US$350 for F or M applicants, US$220 for J applicants. The payment confirmation you print from the site is your receipt.",
            topics: [
              "You cannot pay before your I-20 arrives, because the SEVIS ID you need is printed on it.",
              "Print the confirmation immediately after you pay and keep it with your passport. It is the only accepted proof of payment.",
              "This fee is not the visa application fee. There are at least two separate payments before you can attend an interview, and students routinely conflate them.",
            ],
            tip: "Check the category on your I-20 before you pay, not after. The F, M and J amounts are different and the site is not forgiving about which one you enter.",
          },
        ],
        callout: {
          tone: "watch",
          title: "Keep a copy of the I-20, because the school keeps the original",
          body: "The signed I-20 goes back to the school. Scan every page before you send it, and carry the copy to the interview. If you hand over the original without a copy, you have given away the document you need at the consular window, and getting a replacement costs your school's processing time, which is not something you control.",
        },
      },
      appointments: {
        body:
          "There is no consular appointment at this stage, and that is the point. The appointment you eventually need cannot even be booked until the I-20 exists and the SEVIS fee is paid, because the DS-160 asks for the SEVIS ID. The appointment you have now is with your school's international office, and it is the one worth dialling.",
        points: [
          "Your school sets a deadline for returning financial evidence so the I-20 can be issued before term. Many schools work to roughly 30 days before the programme start. Ask yours for its actual date rather than assuming it.",
          "The SEVIS fee payment is not an appointment, but it is a gate. The Department of State will not issue you a visa without it, and the DS-160 cannot be completed without the SEVIS ID it unlocks.",
          "You have room. A new student F or M visa can be issued up to 365 days before the programme start date on your I-20, which means the binding constraint is the appointment queue at your post, not the law.",
        ],
        callout: {
          tone: "watch",
          title: "The order is not negotiable",
          body: "I-20, then the SEVIS fee, then the DS-160, then the interview booking. Each step needs an identifier produced by the step before it. Students who try to start the DS-160 early, or who pay the SEVIS fee before the I-20 arrives, lose weeks they cannot get back, because the queue at the post does not wait for you to catch up.",
        },
      },
      money: {
        body:
          "Two different kinds of money live at this stage and they behave differently. The tuition and living-cost figure on your I-20 is set by your school, and it is the number the consular officer will eventually measure your balance against. The SEVIS fee is a fixed federal amount published by ICE.",
        points: [
          "The estimated cost of attendance on the I-20 is the school's number. It is normally the published tuition for your programme, plus the school's estimate of living costs and mandatory health insurance, less any financial aid the school expects to provide.",
          "It is the school, not the State Department, that sets the financial bar at this stage and the evidence it wants. Two schools running the same programme can ask for different sums, because their living costs and their aid packages differ.",
          "The SEVIS fee is published and fixed: US$350 for F and M applicants, US$220 for J applicants, as set out on the ICE fee table.",
          "Leave a margin above the number on the I-20. A balance sitting exactly on the estimate reads as no margin at all, and the estimate itself can move before your interview.",
        ],
        callout: {
          tone: "good",
          title: "Check the I-20 figure against your own budget",
          body: "The estimated cost of attendance on the I-20 is both the figure your visa will be judged against and your first-year bill. If those two numbers do not agree, find out which is wrong before you sign. You are signing a declaration that the details are accurate, so an unresolved discrepancy is yours to carry into the interview.",
        },
      },
      rules: {
        body:
          "There are fewer rules at this stage than at the interview, but the ones there are absolute. Most of them concern honesty and timing rather than paperwork.",
        points: [
          "You and the school must both sign the I-20. A form that is unsigned or signed once is not a certificate of eligibility.",
          "The details on the I-20 must be accurate. An incorrect name, date of birth or programme date is treated as a false declaration, not as a typo.",
          "Your passport must be valid for at least six months beyond your period of stay in the United States, unless a country-specific agreement says otherwise.",
          "You may not enter the United States on a student visa more than 30 days before the programme start date on the I-20, however long ago the visa was issued.",
          "The SEVIS fee cannot normally be refunded, but it can be transferred to a different SEVIS record if you change school and the original receipt is less than a year old. Transfers are handled by email and take time, so ask before you pay a second time.",
          "Never book non-refundable travel on the strength of an I-20. An I-20 is a school document, not a visa and not a travel authorisation.",
        ],
        callout: {
          tone: "watch",
          title: "An I-20 is not permission to enter",
          body: "The I-20 proves you are eligible to apply for a student visa. That is all it does. Plenty of students read it as the finish line and start booking flights. The finish line is a visa foil in your passport, and that is a different document, from a different authority, on a different clock.",
        },
      },
      timing: {
        body:
          "This stage is mostly waiting on your school, so the work is in getting the request right the first time and in not sitting on the paperwork. Work backwards from your programme start date, and treat the school's own deadline as the one that governs.",
        roadmap: [
          {
            label: "As soon as you accept",
            title: "Clear the conditions",
            goal: "Give the school everything it needs in one package, so the I-20 comes out the first time.",
            hours: "3-5 hours, one sitting",
            focus: [
              "Accept the offer and pay the deposit. Most schools will not start the financial certification process before the deposit clears.",
              "Read the school's own document list for the financial certification. It is more specific than anything the government publishes, and it is what the school will actually check against.",
              "Get bank statements covering the period the school asks for, in your name or in your sponsor's name with the affidavit attached.",
              "Ask the school, in writing, for its I-20 deadline and for an estimate of how long it issues one after a complete submission.",
            ],
            checkpoint: "You have the school's document list, your statements, and a written I-20 deadline from your school.",
          },
          {
            label: "When the I-20 arrives",
            title: "Pay the SEVIS fee",
            goal: "Have the SEVIS record paid for and the receipt in your hand.",
            hours: "1-2 hours",
            focus: [
              "Pay the I-901 fee through the official site, using the SEVIS ID from your I-20.",
              "Print the payment confirmation and keep it with your passport and your I-20 copy.",
              "Check the visa category on the I-20 first. The F and M amount and the J amount are different.",
            ],
            checkpoint: "The I-901 confirmation is printed and filed with your other documents.",
          },
          {
            label: "The week after the I-20 arrives",
            title: "Check it and sign it",
            goal: "Return a correct, signed I-20 to the school and hold a clean copy of your own.",
            hours: "1 hour",
            focus: [
              "Check the programme name, the start and end dates, the estimated cost of attendance and the funding source against your own paperwork.",
              "Sign it exactly as your passport spells your name, then scan or photograph every page before you send it back.",
              "Keep the copy. This is the document you carry to the interview.",
            ],
            checkpoint: "The school holds the signed I-20 and you hold a legible copy.",
          },
          {
            label: "The rest of the runway",
            title: "Move straight into the DS-160",
            goal: "Lose no weeks between the I-20 and the visa application.",
            hours: "2 hours, plus the application itself",
            focus: [
              "Open the DS-160 and read the sections end to end before you fill anything in. The State Department says it takes about 90 minutes, and you cannot edit the form after you submit it.",
              "Have your passport, your SEVIS ID and the programme and school address to hand.",
              "Book the interview as soon as you can. Wait times are published per post and they vary enormously, so the booking is the thing you should start on today.",
            ],
            checkpoint: "The DS-160 is started and the interview is booked, or on a first-available waitlist.",
          },
        ],
      },
      resources: {
        body:
          "The US government publishes its own forms and fee tables, and they are the only documents that count. Everything else written about student visas is somebody's interpretation of them.",
        resources: [
          {
            title: "Study in the States: student forms",
            kind: "official",
            url: "https://studyinthestates.dhs.gov/students/prepare/student-forms",
            why: "The Department of Homeland Security's own page on the I-20, the I-901 SEVIS form and the other documents in your student file, and the official source for this milestone.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Paying the I-901 SEVIS fee",
            kind: "official",
            url: "https://studyinthestates.dhs.gov/students/prepare/paying-the-i-901-sevis-fee",
            why: "Step by step on paying the fee and printing the receipt, including who has to pay it and who does not. This is the receipt that gets you through the consular door.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ICE: I-901 SEVIS fee amounts",
            kind: "official",
            url: "https://www.ice.gov/sevis/i901",
            why: "The published fee table, so you can check the amount for your visa category before you pay rather than discovering it afterwards.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "FMJFee: I-901 payment and receipt",
            kind: "official",
            url: "https://www.fmjfee.com/i901fee/home.html",
            why: "The only site where the SEVIS fee is paid and the payment confirmation is printed. You can also retrieve a receipt you have already paid using your SEVIS ID, surname and date of birth.",
            free: false,
            cost: "US$350 for F and M applicants, US$220 for J applicants, as published by ICE.",
            verifiedOn: V,
          },
          {
            title: "Department of State: student visa",
            kind: "official",
            url: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html",
            why: "The whole US student visa sequence on one page, from a certified school to the interview window, with the application fee and the 365-day and 30-day rules in the same place.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study in the States: students",
            kind: "official",
            url: "https://studyinthestates.dhs.gov/students",
            why: "The front door of the DHS student programme, and the place to check what comes after this: arrival, the I-94 record, and what happens if you land without a document.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official US government pages for this checkpoint and the clearest complete set we found, not because anyone paid us. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "us-ds160": {
    archetype: "visa",
    intro:
      "The DS-160, the visa application fee and the interview booking are the step that actually starts the clock. Everything before this was preparation for a form you could not yet fill in, because the form needs the SEVIS ID from your I-20.",
    sections: {
      route: {
        body:
          "There is one DS-160 for every nonimmigrant visa, and the visa category you select in it must match the category on your I-20 or DS-2019. Pick the wrong one and the form has to be corrected, which can mean a new interview appointment. Beyond that, the only route question that matters is where you apply.",
        points: [
          "The DS-160 is a single form for all nonimmigrant visa categories, so you must set the category yourself, and it must match the form your school issued.",
          "You should apply at the US embassy or consulate in the country where you live. You may apply at a different post, but the State Department warns it can be harder to demonstrate that you qualify for a visa outside the country where you live.",
          "Interviews are generally required for student visa applicants, with limited exceptions. Some posts can waive the in-person interview for eligible applicants, and the wait times for those appointments are not in the published table.",
          "There is no separate visa application for your dependants. Each family member who needs a visa files their own DS-160 and pays their own fee, and each gets their own I-20 or DS-2019 from the school.",
        ],
        callout: {
          tone: "watch",
          title: "The category on the form must match the category on your I-20",
          body: "Selecting the wrong visa category in the DS-160 is one of the more common reasons applicants are sent back to fix their paperwork, and fixing it can cost you the interview slot you had booked. Check the category on your I-20 before you open the form, and check it again before you sign.",
        },
      },
      documents: {
        body:
          "The DS-160 asks for a lot, and it asks for it in a fixed order. What it needs beyond your personal details is pulled directly from the I-20: the SEVIS ID, the school and programme, and the dates. Have those to hand before you start, because the form times out if you leave it alone.",
        points: [
          "Your passport, which you must have open throughout, because the form asks for the document number, the issue and expiry dates and the issuing country.",
          "Your SEVIS ID and the name and address of your school and programme, both of which are printed on your I-20 or DS-2019.",
          "A digital photo uploaded as part of the form. If the upload fails, the State Department asks you to bring one printed photo in the published photograph format.",
          "Your education and work history. The form asks for your previous studies and employment, and students routinely underestimate how much detail this takes.",
          "Your international travel history for the past five years, and the dates of your last five visits to the United States if you have been before.",
        ],
        subsections: [
          {
            title: "The parts that trip people up",
            what: "The sections of the DS-160 where a small inconsistency causes a reschedule.",
            format: "The form is completed in the Consular Electronic Application Center. The Department of State says it takes about 90 minutes.",
            score: "There is no score. What matters is that every answer is true and consistent with your passport.",
            topics: [
              "The personal information section must match your passport exactly, including the order of names and any middle names. It is the single most common reason for a return.",
              "Your address history. The form asks for where you have lived, and students often abbreviate or skip. Give the full address and the dates.",
              "The work and education history. Every course you have taken, every job you have had, every school, including the ones you did not finish.",
              "Your SEVIS ID and programme details, which come straight off the I-20.",
            ],
            tip: "Answer from the documents, not from memory. The form times out after 20 minutes of inactivity and loses unsaved work, so save often and keep your passport open next to you.",
          },
          {
            title: "Before you submit",
            what: "The final checks that happen once, right at the end.",
            format: "The form ends with a review, a security question, an electronic signature and a barcode confirmation page.",
            score: "You must electronically sign and submit the application yourself. Under US law the applicant signs their own visa application, and somebody else completing it for you does not remove that requirement.",
            topics: [
              "Read every page of the review section, not just the last one. Errors in earlier sections are what get caught later.",
              "Print the barcode page and keep it. You do not need to print the whole application, and the barcode page is what the consular officer asks for.",
              "Check the category once more, and check that your name matches your passport character for character.",
            ],
            tip: "You cannot edit the DS-160 after you submit it. If something is wrong, you fill in a new one, and a new application means a new fee and possibly a new appointment. Ten minutes of checking beats a fortnight of delay.",
          },
        ],
        callout: {
          tone: "watch",
          title: "You sign it yourself, and you cannot change it afterwards",
          body: "Two facts that are easy to miss. First, the DS-160 must be electronically signed and submitted by the applicant, even if somebody helped you fill it in. Second, once submitted it cannot be edited. If you spot a mistake afterwards, the route is a new application, and the fee is not refunded.",
        },
      },
      appointments: {
        body:
          "This is where the schedule is actually set. The State Department publishes a wait time for every post, in a table, updated monthly, and the F, M and J column is the one that applies to you. It is an estimate rather than a promise, and new slots are released regularly, so you should book the earliest you can get and then keep checking.",
        points: [
          "The Global Visa Wait Times table gives you, for your own city, the next available appointment for F, M and J applicants. It is the number your schedule should be built on.",
          "The table is published in half-month and whole-month increments. It counts weekends and holidays, when embassies are closed.",
          "Consulates release additional slots regularly, and applicants who want an earlier date are expected to check back and move their appointment. A booking that looks bad on day one is often not what you end up with.",
          "Some consulates can expedite an interview for an urgent, unforeseen situation such as a medical emergency or a school start date, but you must first submit the DS-160, pay the fee and take the first available appointment. Expediting is a fallback, not a plan.",
          "A school start date is one of the reasons consulates may expedite, but you need documentation of it, and you still need the full file in front of them.",
        ],
        callout: {
          tone: "watch",
          title: "Book the first slot you can get, then keep moving it",
          body: "The wait time table predicts what is available now, not what you will end up waiting. Consular sections release slots constantly, and the instruction on the published page is to check back and move your appointment earlier. The students who get interviewed soonest are not the ones who waited patiently for a good slot; they are the ones who booked early and moved the appointment every week.",
        },
      },
      money: {
        body:
          "The visa application fee is a published federal figure. The issuance fee is not fixed, because it depends on your nationality, and it is paid separately, after approval in some cases. Neither is the same thing as the SEVIS fee you have already paid, and neither is the same thing as what the appointment booking site may charge you.",
        points: [
          "The nonimmigrant visa application fee is US$185, as published on the State Department's student visa page. It is non-refundable.",
          "There may also be a visa issuance fee, and its amount depends on your nationality. The State Department publishes the reciprocity table and the fee list, and your own embassy or consulate website states what applies to you.",
          "The fee is paid through the MRV payment system, using the DS-160 application ID. You will need the receipt if your post requires payment before the interview.",
          "The I-901 SEVIS fee was a separate payment and is already behind you. Two fees, two receipts, two different authorities.",
          "The appointment booking site is operated by a contractor, and any service charge it adds is set by that contractor rather than by the State Department. Check the total before you confirm a slot.",
        ],
        callout: {
          tone: "watch",
          title: "Three separate amounts, and only one of them is fixed",
          body: "The US$185 application fee is published and constant. The issuance fee varies by nationality and is confirmed on the fees and reciprocity pages. Any appointment booking charge is set by the contractor running the scheduling site. Read the total at each step rather than assuming you have paid once, and keep every receipt, because the consular officer may ask for the payment receipt.",
        },
      },
      rules: {
        body:
          "The DS-160 stage has a short rule list, but every item on it has ended somebody's application.",
        points: [
          "Every answer must match your passport. Name, date of birth, nationality and document numbers are compared against it.",
          "You cannot edit a submitted DS-160. A correct answer submitted is the only kind there is.",
          "You must electronically sign and submit the application yourself, even if someone helped you complete it.",
          "Print the DS-160 barcode page. The consular officer asks for it, and the State Department says you do not need the full application printed.",
          "A new student F or M visa can be issued up to 365 days before the programme start date, but you may not enter the United States more than 30 days before it.",
          "Do not book non-refundable flights, accommodation you cannot cancel, or anything else you would have to pay for if the visa is refused.",
          "Watch for post-specific instructions. Each embassy and consulate publishes its own document list, its own payment method and its own appointment rules, and those override the general guidance.",
        ],
        callout: {
          tone: "watch",
          title: "Answers must match the passport, including the order of your names",
          body: "This sounds trivial and it is not. A DS-160 where the surname is transposed, where a middle name is dropped, or where the date of birth format does not match the machine-readable passport is returned, and the fix is a new application, a new fee and often a new appointment. Copy the passport fields across by hand, character for character, and check them twice.",
        },
      },
      timing: {
        body:
          "Work backwards from your programme start date, not from your admission date. The programme date on the I-20 is the one that governs, and the queue at your post is the thing that actually determines whether you arrive on time.",
        roadmap: [
          {
            label: "Days 1-2",
            title: "Complete the DS-160",
            goal: "A submitted, signed DS-160 and a printed barcode page.",
            hours: "3 hours",
            focus: [
              "Work from your passport, your I-20 and your own paperwork. Do not work from memory.",
              "Save often. The form times out after 20 minutes of inactivity and loses unsaved work.",
              "Upload your photo as part of the form, and have a printed spare ready in case the upload fails.",
              "Read the review section properly before you sign. It is the last chance to fix anything.",
            ],
            checkpoint: "The application is submitted, you have the barcode page printed, and you have your application ID.",
          },
          {
            label: "Same week",
            title: "Pay the fee and book the interview",
            goal: "A confirmed appointment, and the receipt to prove you paid.",
            hours: "1-2 hours",
            focus: [
              "Pay the MRV application fee and keep the receipt.",
              "Look up your post in the Global Visa Wait Times table before you book, so you know what you are looking at.",
              "Book the earliest slot your post offers, through the post's own scheduling system rather than a third-party site.",
            ],
            checkpoint: "The fee receipt is saved and an interview date is confirmed.",
          },
          {
            label: "Every week after that",
            title: "Keep hunting for an earlier slot",
            goal: "Move your appointment forward as consulates release new ones.",
            hours: "10 minutes a week",
            focus: [
              "Check the scheduling system each week and move the appointment earlier if a better slot appears.",
              "Re-read your post's own instructions, because the document list and the payment rules are set by the post, not by the central pages.",
              "Assemble your interview folder now, while there is no deadline pressure: passport, I-20, SEVIS receipt, DS-160 barcode page, admission letter, financial evidence.",
            ],
            checkpoint: "Your appointment is as early as it can be, and your interview folder is complete and in one place.",
          },
          {
            label: "The week before the interview",
            title: "Rehearse and confirm",
            goal: "Nothing left to do but turn up.",
            hours: "2 hours",
            focus: [
              "Confirm the appointment date, time and location, and check what the post requires you to bring and how to get through the door.",
              "Prepare a two-minute spoken account of your funding, your programme and your reason for returning home. Most interviews are three questions long.",
              "Check that your passport is still valid for at least six months beyond your period of stay, and that the expiry date on the I-20 and your booking still line up.",
            ],
            checkpoint: "Appointment confirmed, folder packed, and you can answer the three questions in under two minutes.",
          },
        ],
      },
      resources: {
        body:
          "The State Department publishes the form instructions, the fee tables and the wait times, and those are the documents the decision is made against. The booking site is the only place to actually get an appointment.",
        resources: [
          {
            title: "Department of State: student visa",
            kind: "official",
            url: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html",
            why: "The official source for this milestone: the application fee, the documents you must gather, the 365-day and 30-day rules, and the link out to the form and the wait times.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "DS-160: Online Nonimmigrant Visa Application",
            kind: "official",
            url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/forms/ds-160-online-nonimmigrant-visa-application.html",
            why: "The State's own page on the form, including the instruction to print and keep the barcode page and the reminder that the embassy does not schedule your appointment for you.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Consular Electronic Application Center",
            kind: "official",
            url: "https://ceac.state.gov/genniv/",
            why: "Where the DS-160 is actually filled in and submitted. The instructions page here explains the application ID, the 20-minute timeout and the requirement to sign it yourself.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Global Visa Wait Times",
            kind: "official",
            url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/global-visa-wait-times.html",
            why: "The table that should set your schedule, with the next available appointment for F, M and J applicants at every post, updated monthly.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Visa Appointment Wait Times",
            kind: "official",
            url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/wait-times.html",
            why: "The State's guidance on how to read the wait times, what administrative processing means, when you may ask about the status of an application, and when an expedited interview can be requested.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Fees for Visa Services",
            kind: "official",
            url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/fees/fees-visa-services.html",
            why: "The fee list and the reciprocity table, so you can see what the issuance fee is for your nationality before you are told about it after approval.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "US Travel Documents appointment scheduling",
            kind: "official",
            url: "https://www.ustraveldocs.com/",
            why: "The scheduling site used by many US posts to book interview appointments. Use the link from your own embassy or consulate page, because the correct regional site differs by country.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official US government pages for this checkpoint and the clearest complete set we found, not because anyone paid us. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "us-visa-interview": {
    archetype: "visa",
    intro:
      "The interview is short and the decision behind it is not. A consular officer is checking one thing: whether you are a genuine student who intends to return home. The folder you bring, the three answers you give, and the way you explain your funding are the whole of it.",
    sections: {
      route: {
        body:
          "There is no separate route at this point. You are applying for the category on your I-20 or DS-2019, in the country where you live, for the programme already written on that form. What the interview decides is whether you qualify for it.",
        points: [
          "The officer is deciding under US immigration law whether you qualify for the visa you applied for. The interview is the evidence-gathering step, and it is usually brief.",
          "The decision is binary in law. If you have not established that you are eligible, the officer must refuse. There is no partial visa.",
          "Two things can happen instead of an immediate answer: the officer asks for additional documents under what is called a 221(g) request, or the case goes into administrative processing, which is a background check that happens after the interview.",
          "Administrative processing is not a refusal and not an approval. The State Department says the duration varies by the individual circumstances of each case.",
        ],
        callout: {
          tone: "watch",
          title: "Refusal is the default when eligibility is not established",
          body: "The State Department is explicit that there are only two possible outcomes for a visa application: the officer issues the visa, or refuses it. If you have not demonstrated that you qualify, refusal is the required decision. That is why the answers about funding, your programme and your ties to home are the whole interview, and why preparing them is worth a week.",
        },
      },
      documents: {
        body:
          "Bring everything, in one folder, in the order you would explain it. The officer needs the I-20 and your passport above all else, and the rest is there in case they ask.",
        points: [
          "Your passport, valid for at least six months beyond your period of stay in the United States.",
          "Your signed Form I-20 or DS-2019, the copy you kept.",
          "Your I-901 SEVIS payment confirmation, printed.",
          "Your DS-160 confirmation page with the barcode.",
          "Your admission letter and your academic transcripts, if the post asks for them.",
          "Your financial evidence: bank statements and any sponsor letter or affidavit, matching what is written on the I-20.",
          "A passport photograph, if your photo upload failed and the post asked you to bring one.",
        ],
        subsections: [
          {
            title: "Before you walk in",
            what: "The preparation that decides how the interview goes.",
            format: "One folder, one order, and a short spoken explanation ready in advance.",
            score: "There is no score. There is a determination of eligibility, made from what you say and what you show.",
            topics: [
              "Your funding: who pays, from where, and how they can afford it. Say the number and the source without hesitating.",
              "Your programme: what it is, how long it is, and what you will study. Know the name and the level on the I-20.",
              "Your ties to home: your job, your family, your studies that are waiting for you, and your plan after the degree.",
              "Your immediate plans on arrival: orientation, housing, registration, the first week.",
            ],
            tip: "Practise the three answers out loud, in under two minutes each. Officers are not trying to trick you; they are trying to establish a picture, and a rehearsed picture is easier to give than an improvised one.",
          },
          {
            title: "At the window",
            what: "What actually happens once you sit down.",
            format: "Fingerprints are taken at the appointment for most applicants, and the interview itself is typically a short conversation.",
            score: "Two outcomes at the window: the visa is issued, or you are told that more is needed.",
            topics: [
              "The officer confirms identity and the visa category against your passport and your I-20.",
              "They ask about the programme, the funding source, and your plans after the study.",
              "They may ask you to explain something on the I-20 that looks inconsistent, which is usually a date, an amount, or the funding source.",
              "If more is needed, you will be told what and how to provide it. Do not leave without the instruction.",
            ],
            tip: "Answer the question that was asked. Do not volunteer a second, longer story, and do not start explaining something that has not been raised. Short, accurate, complete answers are what these interviews reward.",
          },
          {
            title: "If they ask for more",
            what: "What a 221(g) request means and what you do with it.",
            format: "A written or verbal request for additional documents, after which your case pauses.",
            score: "It is a request for evidence, not a rejection, but it does not guarantee anything on its own.",
            topics: [
              "Respond quickly. The clock on your case does not run while it waits for you.",
              "Provide exactly what was asked, in the format requested, and nothing that could raise a new question.",
              "If your case then goes into administrative processing, that is a separate and longer wait.",
            ],
            tip: "The State Department advises waiting at least 180 days from the date of the interview or of the submission of supplemental documents, whichever is later, before asking about the status of an application in administrative processing. Do not chase it weekly.",
          },
        ],
        callout: {
          tone: "watch",
          title: "Everything must agree with the I-20",
          body: "Your passport, your DS-160, your I-20, your admission letter and your bank statements all describe you. If the funding source on the I-20 does not match the person whose name is on the statements, or the programme dates do not match your admission letter, that is the thing the officer will stop on. Reconcile the paperwork before the interview, not at the window.",
        },
      },
      appointments: {
        body:
          "The appointment itself is the appointment. What follows it is a second wait: the passport usually leaves with the consulate, and there is a separate published processing time for getting it back.",
        points: [
          "Bring your passport to the appointment. It is normally kept by the consulate while the visa is affixed, and returned afterwards by courier or for collection, depending on the post.",
          "The State Department publishes separate wait times for the decision after the interview. They do not include the time taken to return the passport to you.",
          "Tracking is done through the post's own system or a courier tracking number. Keep both.",
          "If the post asks for a follow-up appointment, that is a separate booking and it is not covered by your original wait time.",
        ],
        callout: {
          tone: "watch",
          title: "The interview is not the last wait",
          body: "Plenty of students plan around the interview date and get caught by the wait afterwards. The published processing estimates do not include the time it takes to return your passport, and in administrative processing cases there is no reliable estimate at all. Build a margin on the end of the plan, not just on the front.",
        },
      },
      money: {
        body:
          "There is no money to bring to the interview itself, with two possible exceptions. The point of the financial evidence is not to show money to the officer but to show money in the bank, on the statements, matching the figure on the I-20.",
        points: [
          "You do not pay anything at the interview window. The application fee was already paid, and the issuance fee, if your nationality has one, is paid separately.",
          "If a visa issuance fee applies to your nationality, the post will tell you at the point of approval and give you the method and the deadline. Paying it late can hold your passport.",
          "Your bank statements are the evidence. They should show the balance clearly, in your name or in your sponsor's name, and the source of the money should be explainable.",
        ],
        callout: {
          tone: "good",
          title: "Bring the statement, not just the number",
          body: "The officer is not looking for a balance on a screen, they are looking for a document that shows where the money came from and that it is yours. A statement with a large unexplained deposit days before the interview invites a question you would rather not be asked.",
        },
      },
      rules: {
        body:
          "These are the rules that decide whether the visa is issued, and several of them are the reason people are refused for reasons that feel unfair.",
        points: [
          "Eligibility must be established. If you have not shown that you qualify for the visa, the officer must refuse it. There is no middle outcome.",
          "Your passport must be valid for at least six months beyond your period of stay in the United States, unless a country-specific agreement says otherwise.",
          "You may not enter more than 30 days before the programme start date on the I-20, even though the visa may have been issued up to 365 days earlier.",
          "You must have paid the I-901 SEVIS fee, and you must carry the receipt. No receipt, no visa.",
          "Never book non-refundable travel before your passport is physically back in your hands. A visa that is approved but a flight you cannot change is still a financial loss if the passport is delayed.",
          "Social media is publicly visible and posts about your home country, your government or your university can be read. This is not paranoia; it is a published screening criterion.",
          "If you are refused, there is a 221(g) waiver process for some grounds and an administrative review for some others, both time-limited. Ask at the window for the specific remedy that applies to you.",
        ],
        callout: {
          tone: "watch",
          title: "A visa is not a travel booking",
          body: "The most common financial mistake in this stage is booking flights, hotels or a lease on the strength of an approval that has not been issued yet. Approval and the return of your passport are two different events, and the second one is the one that has a queue in front of it. Wait for the passport.",
        },
      },
      timing: {
        body:
          "Three waits stack up here: the appointment, the adjudication, and the passport return. The first you can influence, the second is published, and the third is not included in the published figure. Plan for the sum.",
        roadmap: [
          {
            label: "The week before",
            title: "Build the folder",
            goal: "One document set, in one order, with nothing missing.",
            hours: "2 hours",
            focus: [
              "Assemble passport, I-20, SEVIS receipt, DS-160 barcode page, admission letter, transcripts if asked, bank statements, sponsor letter, and a spare photo.",
              "Read your post's own instructions one more time. They set the document list and the rules for the day.",
              "Write down your three answers and say them out loud twice, in under two minutes each.",
            ],
            checkpoint: "The folder is complete and the three answers are ready.",
          },
          {
            label: "The day",
            title: "The appointment",
            goal: "A clear answer and a clean file.",
            hours: "3 hours, including waiting",
            focus: [
              "Arrive early enough to clear security and any queue for the document check.",
              "Answer what is asked, in full, and do not volunteer extra.",
              "If you are asked for more documents, get the instruction in writing or note exactly what was asked and by when.",
              "If you are told administrative processing is required, note that you were told, and read the published guidance on when you may ask about status.",
            ],
            checkpoint: "You know what happened: issued, documents requested, or administrative processing.",
          },
          {
            label: "The days after",
            title: "Pay and chase",
            goal: "The passport back in your hands.",
            hours: "30 minutes a week",
            focus: [
              "Pay any issuance fee your nationality requires, by the deadline the post gave you.",
              "Track the passport through the post's system or the courier.",
              "Do not chase an application in administrative processing for at least 180 days from the later of the interview or the submission of supplemental documents.",
            ],
            checkpoint: "The passport is tracked, the fee is paid, and you know the date you can expect it.",
          },
          {
            label: "Once the passport is back",
            title: "Check before you travel",
            goal: "No surprises at the border.",
            hours: "1 hour",
            focus: [
              "Check that the visa foil is in the passport, that the category and the validity dates are right, and that the seal is intact.",
              "Confirm your arrival date is within 30 days of the programme start date on the I-20.",
              "Keep the I-20 copy with you for the whole of your first year. It is the document your school will check when you register.",
            ],
            checkpoint: "The visa is in your hand, the dates are right, and the I-20 copy is in your folder.",
          },
        ],
      },
      resources: {
        body:
          "The State Department publishes the document list, the fee tables and the processing estimates for every post, and they are the documents the decision is made against.",
        resources: [
          {
            title: "Global Visa Wait Times",
            kind: "official",
            url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/global-visa-wait-times.html",
            why: "The official source for this milestone: the next available F, M and J appointment at every post, and the published processing estimates, updated monthly.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Visa Appointment Wait Times",
            kind: "official",
            url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/wait-times.html",
            why: "The State Department's guidance on how to read the wait times, what administrative processing is, the 180-day rule on asking for status, and when an expedited appointment can be requested.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Department of State: student visa",
            kind: "official",
            url: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html",
            why: "The documents you must gather for the interview and the rules that follow it, including the 30-day entry limit and the passport validity requirement.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study in the States: student forms",
            kind: "official",
            url: "https://studyinthestates.dhs.gov/students/prepare/student-forms",
            why: "The DHS page on the I-20, the I-901 receipt and the forms you will be asked for at the border, including what happens if you arrive without them.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Fees for Visa Services",
            kind: "official",
            url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/fees/fees-visa-services.html",
            why: "The fee list and reciprocity table, so you know whether your nationality pays an issuance fee and how much before the officer mentions it.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "DS-160: Frequently Asked Questions",
            kind: "official",
            url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/forms/ds-160-online-nonimmigrant-visa-application/ds-160-faqs.html",
            why: "The State's own answers on correcting a DS-160, scheduling an interview, and the documents to have open while you complete the form. It is where most reschedule questions are answered.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official US government pages for this checkpoint and the clearest complete set we found, not because anyone paid us. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },
};

import type { GuideContent } from "../types";

const V = "2026-10-20";

/**
 * The German student visa dossiers.
 *
 * German student visas are refused for a narrow set of reasons, and one of them
 * dominates: proof of livelihood. The blocked account is the default way to
 * prove it, the number is set centrally and moves, and the amount you must
 * have is checked against a document rather than against a conversation.
 *
 * Three things this file keeps returning to:
 *
 *   1. YOU APPLY AT THE MISSION RESPONSIBLE FOR YOUR HOME STATE, not the one
 *      nearest your university and not the one nearest the embassy. Getting
 *      this wrong means rebooking.
 *   2. THE NATIONAL D VISA IS NOT A SCHENGEN VISA, and it is not your residence
 *      permit. The residence permit is a separate application after arrival.
 *   3. THE BLOCKED ACCOUNT IS ONE OF SEVERAL ROUTES. A scholarship or a
 *      Verpflichtungserklärung can replace it, but a loan is additional to it,
 *      not a substitute for it.
 */
export const VISA_DE: Record<string, GuideContent> = {
  "de-blocked-account": {
    archetype: "visa",
    intro:
      "This is the checkpoint that decides whether a German student visa application succeeds or fails, and it is a financial one. The German Foreign Office requires proof that you can support yourself, and a blocked account is the default instrument: a sum of money you cannot touch, released to you a fixed amount each month, with the certificate from the provider serving as your proof.",
    sections: {
      route: {
        body:
          "There are three ways to prove livelihood for a German student visa, and the blocked account is only the default one. A blocking confirmation is the instrument most applicants use because it is the most widely accepted, but a qualifying scholarship, a Verpflichtungserklärung from a host, or a German bank guarantee can be accepted instead, and each of them has a narrower set of conditions.",
        points: [
          "A blocked account is a German account, or an account with a provider the German missions accept, into which you pay a sum that is then held and released to you monthly. You are not permitted to withdraw it as one lump.",
          "A Verpflichtungserklärung is a formal commitment by a person in Germany to cover your costs. It requires that person to hold a specific income and to have sufficient health insurance, and it is a real legal obligation on them, not a letter of goodwill.",
          "A scholarship or a funded programme can satisfy the requirement directly, and if your funding comes with a stipend it may count toward the amount rather than replacing it. The award letter decides this, and your mission decides in the end.",
          "A German bank guarantee is accepted in place of the account itself, but the bank has to be German and the guarantee has to be issued on the form your mission uses. This is a rarer route and it takes longer to arrange.",
          "The route that does not work is a loan on its own. A student loan is treated as additional support, not as a replacement for the blocked sum, which is why students with a fully funded loan still have to block the money.",
        ],
        callout: {
          tone: "watch",
          title: "A loan is not a substitute",
          body: "The standard German guidance is that a loan is additional to the blocked account rather than an alternative to it. If your funding plan is a loan, you still need the blocked sum, and the loan covers the gap between that sum and your real costs.",
        },
      },
      documents: {
        body:
          "The blocked account is one document in a file, and the document that matters is the blocking confirmation itself. The provider issues it once the money has actually arrived and cleared, and it has to say the right things.",
        points: [
          "The blocking confirmation, issued by the provider, showing the amount held, the monthly release amount and the dates the account is blocked for. This is the document your mission reads.",
          "The confirmation has to cover the full required period and the full amount. A confirmation for less money, or for a shorter period, is read as an absence of proof and causes a request for more documents.",
          "The admission letter from your university, or the letter confirming a place on a foundation or language course, which is what the visa is being sought for. The blocked account is attached to a specific study plan and cannot stand on its own.",
          "Your passport, and any previous residence permits or the record of your previous stays in Germany, which your mission will ask for.",
          "Where the APS process applies to your nationality, the APS certificate, which has to be issued before the visa application can be lodged at all.",
          "Health insurance valid in Germany, which is assessed alongside the money because a blocked account is proof that you can afford it.",
          "Your previous academic and professional qualifications and evidence of your study history, which support the study plan the money is being tied to.",
        ],
      },
      appointments: {
        body:
          "There is no government appointment for opening a blocked account. It is a contract between you and a provider, and the sequence is application, identity verification, transfer, clearance, and then the certificate. The appointment you are actually booking is the visa appointment, and the blocked account has to be finished before it.",
        points: [
          "Opening the account online with a provider usually involves an identity check by video, and a physical appointment only in some cases or some countries. The identity check is the step that goes wrong when a document is expired or the lighting is bad, so prepare the passport and do it in daylight.",
          "The transfer is the part that takes real time, and it takes time in two directions: the money leaving your account in your country, and the money landing and clearing in Germany. Fees, weekends and a possible banking-holiday delay all sit in that window.",
          "The certificate is issued after the funds have cleared, not after the transfer was initiated. Paying and then flying to the visa appointment is the single most common self-inflicted delay in this whole process.",
          "Once you arrive in Germany you cannot simply use the blocked account. It has to be activated, which means registering your address with the Bürgeramt and opening a local German account, and only then does the monthly release start.",
        ],
        callout: {
          tone: "watch",
          title: "Pay, then wait for clearance",
          body: "The provider issues the blocking confirmation when the money has arrived, not when you pressed send on the transfer. Book your visa appointment for a date that leaves several working days of slack after the money is expected to clear, not the other way round.",
        },
      },
      money: {
        body:
          "Make it in Germany publishes that a student must be able to cover their living costs for the duration of the programme, and that this is proved with a blocked account of at least EUR 11,904 in 2026, released at no more than EUR 992 a month. The number is derived from the student maintenance rate and it is adjusted, so check the figure in force on the day you transfer.",
        points: [
          "EUR 11,904 for a twelve-month period, at EUR 992 a month, is the 2026 figure for the student route. It is a national figure, not a per-state or per-city one, so it does not change with where you study.",
          "The figure is adjusted over time. The Foreign Office sets it from the maximum support rate paid to students, and the German missions publish the number they apply. Check the mission page for your country in the week you transfer, because the sum you transfer is the sum they assess.",
          "A different route carries a different number. The job-seeker and Opportunity Card routes publish a higher monthly figure because that allowance is higher, and the make-it-in-germany guidance states EUR 1,091 a month for those. Do not use the student figure for a different visa.",
          "Transfer slightly more than the minimum, because transfer fees, intermediary bank charges and the provider's own setup fee all come out of the amount you send. Send the exact minimum and the shortfall becomes your problem.",
          "The monthly release is a ceiling on what you can draw, not a budget. EUR 992 a month covers subsistence, and it does not cover the deposit on a flat, the semester contribution, a laptop, a flight home in an emergency, or a first term that starts before the first release lands. Plan for that gap in cash.",
          "The account does not pay for your course. Living costs and travel are what it proves. Tuition and the semester contribution are separate, and the semester contribution in particular is set by the state and the university, not by Germany.",
        ],
        callout: {
          tone: "watch",
          title: "Send more than the minimum",
          body: "The provider's setup fee and any intermediary bank charges are paid out of the sum you send, and the mission assesses what arrived. Transfer the published minimum plus a margin, and check the amount in the blocking confirmation against the number your mission expects.",
        },
      },
      rules: {
        body:
          "The rules below are the ones that turn a correctly funded application into a refusal. None of them are exotic, and every one of them is avoidable.",
        points: [
          "Use a provider your mission accepts. The Foreign Office publishes no provider list, and not every provider is accepted everywhere, so check the mission's own list for your country rather than assuming that a provider another applicant used will work for you.",
          "A blocking confirmation for the wrong amount, the wrong period or the wrong holder is treated as no proof. Read the confirmation line by line before you book the appointment, and compare it to the published requirement.",
          "The money must be yours or properly attributed. A transfer from a third party needs the documentation your mission asks for, and unexplained third-party transfers are queried.",
          "Do not open the account in the wrong name, and do not open several. A second account with a different balance muddies the file rather than strengthening it.",
          "The account must still be funded on the day of your appointment. A confirmation for a balance that has since been withdrawn does not count.",
          "A blocked account secures your status in Germany, and it is not a loophole. Withdrawing more than the monthly release, or having the account emptied, ends the arrangement and the visa that depends on it.",
        ],
      },
      timing: {
        body:
          "The blocked account sits on the critical path, and it is the step where a two-week surprise turns into a missed semester start. Work backwards from the date you need to be in Germany, not from the date you expect to finish the paperwork.",
        points: [
          "Open the account and start the transfer as soon as you have your admission letter. It does not need to be your visa appointment date that drives this, only the date you intend to apply.",
          "Allow for the transfer to clear, for the provider to issue the certificate, and for you to read it. Days, not hours, and weekends and banking holidays sit inside that.",
          "Book the visa appointment only once the certificate is in your hands. Missions do sometimes let you book earlier, but an appointment you cannot attend with a complete file is a wasted slot, and slots at the consular services portal are scarce.",
          "After arrival, activation is not automatic. Address registration and a local account are prerequisites, and the first monthly release cannot arrive before both are done, so keep enough of your own money to bridge that gap.",
        ],
        callout: {
          tone: "good",
          title: "Finish the money first",
          body: "The blocked account is the one part of the German student visa that you can complete entirely before you meet an official, in any time zone, without an appointment. Do it first, and the rest of the application becomes a set of documents rather than a race.",
        },
      },
      resources: {
        body:
          "Germany publishes more of its own material on this than most countries do, and the make-it-in-germany guidance carries the figure and the alternatives in the same place. Your mission's page is the one that decides, so it belongs in the list too.",
        resources: [
          {
            title: "German mission: student visa information (Poland)",
            kind: "official",
            url: "https://polen.diplo.de/pl-de/03-service/03-02-visainfo-eng/2581464-2581464",
            why: "The mission's own student visa page, setting out the proof of livelihood it accepts, the amount it applies and the documents it requires. The figure on the mission page is the one your application is assessed against.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Make it in Germany: visa for studying",
            kind: "official",
            url: "https://www.make-it-in-germany.com/en/visa-residence/types/studying",
            why: "The official statement that a blocked account of at least EUR 11,904 in 2026, released at no more than EUR 992 a month, is one way to prove you can cover your living costs, and the higher figure that applies to the job-seeker and Opportunity Card routes.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Make it in Germany: blocked account (Sperrkonto)",
            kind: "official",
            url: "https://www.make-it-in-germany.com/en/study/finances/blocked-account",
            why: "How the account works, what the certificate has to say, and what happens to it after you arrive. Read it before you choose a provider, not after you have paid a setup fee.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Make it in Germany: the visa process for study",
            kind: "official",
            url: "https://www.make-it-in-germany.com/en/study/visa-process",
            why: "The whole sequence for a German study visa in one place, from the point where you decide you need a visa to the point where you are admitted. Useful for seeing what sits between the blocked account and the decision.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Federal Foreign Office: visa information",
            kind: "official",
            url: "https://www.auswaertiges-amt.de/en/visa-service/visabestimmungen-node",
            why: "The Foreign Office's entry point for who needs a German visa and how to apply, and the route to the Visa Navigator and the directory of missions. This is the authority above the individual mission.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "APS: Anabin Recognition Process",
            kind: "official",
            url: "https://www.aps.org.cn/",
            why: "If you are applying from India, China or Vietnam, the APS certificate comes before the visa application and cannot be rushed. This is the official site for the process and its dates.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official German sources that publish the requirement and the figure, and because they are the clearest available. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "de-visa-appointment": {
    archetype: "visa",
    intro:
      "The German student visa is a national long-stay visa, applied for in person at the German mission responsible for your state of residence. It is not a Schengen visa, it is not issued by the university, and it cannot be applied for without the blocked account certificate already in your hand.",
    sections: {
      route: {
        body:
          "You apply for a national D visa for study under Section 16b of the Residence Act. The decision about which mission handles your application is made by where you legally live, not by where your university is and not by which mission is most convenient to reach, and this is the rule that catches people who assume otherwise.",
        points: [
          "You apply at the German mission responsible for your home state, defined by your normal residence. Students whose university is in a different state from their address still apply at the mission for their address.",
          "It is a national visa, so it covers the whole of Germany, not one state. Some federal states have their own additional registration and residence requirements, which you deal with after arrival rather than at the consulate.",
          "You attend in person. The document check, the identity check and the payment all happen at the mission, and the appointment is the only place the file is finally assessed.",
          "The Consular Services Portal is the Foreign Office's own booking system, and the mission you use is confirmed there. Where a mission also runs an appointment system for its own nationals, the portal is still the place to check what is required and when.",
        ],
        callout: {
          tone: "watch",
          title: "State of residence, not state of study",
          body: "The mission responsible for your home state decides your application. If you live in one country and study in another, or if your home state is not the state your university is in, the mission for your address is the one that handles it. Check this before you book anything.",
        },
      },
      documents: {
        body:
          "The document set is long and unforgiving, and the sequence at the counter is roughly the order below. Bring originals, because a mission that needs to see a document will usually want to see the original rather than a scan.",
        points: [
          "Your passport, and the visa application form completed and signed, with photographs as the mission requires.",
          "The admission letter from your university, and for a preparatory or language course, the confirmation of your place on it. This is what the visa is being issued for.",
          "The blocking confirmation for the blocked account, showing the full amount and the correct period, and any scholarship or Verpflichtungserklärung if you are using an alternative route instead.",
          "Health insurance valid in Germany, covering the full period of your stay. Statutory or travel insurance are both acceptable if they meet the mission's requirements, and your provider needs to know this is a student visa.",
          "The APS certificate, if the APS process applies to you, which is the case for applicants from India, China and Vietnam.",
          "Your previous academic qualifications and transcripts, and evidence of your academic and professional history, which support the study plan.",
          "If you have lived in Germany before, or hold a previous German residence permit, the documentation of those stays.",
          "Proof of the visa fee payment, which the mission tells you how to make.",
        ],
        callout: {
          tone: "watch",
          title: "Originals, and a folder that is in order",
          body: "Scans on a phone do not work at the counter. Arrange the folder in the order you were given on the mission's checklist, and put a tabbed divider between sections. It is unglamorous and it saves a second trip.",
        },
      },
      appointments: {
        body:
          "The appointment is booked through the Foreign Office's Consular Services Portal, or through the mission's own booking system where it runs one. Slots at the consular services portal for national visa applications are genuinely scarce, and the waiting time is measured in weeks rather than days.",
        points: [
          "Book the earliest slot you can get, then work back from it to find the date your blocked account has to be funded by. People who book first and fund afterwards are the ones who miss the appointment.",
          "Arrive early. Missions publish their own rules about arrival time, and the queue at a national visa counter in a peak month is long enough that a late arrival is a missed appointment.",
          "At the appointment you will be asked for your documents, your biometric data, and payment. The officer may also ask you questions about your study plan, which is why the admission letter and your blocked account need to be internally consistent.",
          "If your application is not complete, you will usually be told what is missing rather than simply refused, and the clock on the processing time restarts. Treat the first appointment as a real assessment rather than a formality.",
        ],
      },
      money: {
        body:
          "The money at this checkpoint is small and specific, and it is separate from the blocked account. The blocked account proves you can support yourself. The visa fee pays for the decision. Students conflate them and then arrive at the counter unable to pay.",
        points: [
          "The national visa fee is published by the mission, and the German mission listed in this plan states a fee of EUR 75 for a national long-stay visa. Check the fee list on your own mission's page before you go, because the fee is set by the mission and can change.",
          "How you pay matters. Missions typically require payment by card or by a specific method, and cash at the counter is not accepted everywhere. The mission's page states the accepted methods, and it is worth reading that section rather than assuming.",
          "Budget the cost of getting to the appointment. Some missions require you to travel to the city of the mission rather than to a local outreach office, and a long journey on a morning when you also have to pay is a poor way to lose a slot.",
          "The blocked account itself is still the financial requirement, and it still has to be funded and valid on the day. A paid fee does not substitute for it.",
        ],
      },
      rules: {
        body:
          "The rules below are the ones that decide the outcome, and most of them are about the visa itself rather than about the paperwork. Germany does not run the UK or Australian model where refusal and a fresh application are the normal outcomes, so precision matters more than speed.",
        points: [
          "You must not travel to Germany on anything other than the national visa. A Schengen visa or a short-stay C visa does not authorise a study stay, and a student who tries it is refused entry and loses the application.",
          "You must be in Germany during your studies. The visa is tied to the course and the provider, and it is not a general permission to live in Germany.",
          "Work is limited by the conditions attached to the visa, and the conditions are set by the current rules rather than by your application. If work is part of your plan, check the current rules rather than assuming a standard number.",
          "The visa is issued with a validity window, and you have to enter within it. A visa that expires before you travel has to be reissued, and reissuing costs you the slot you fought for.",
          "Your course has to fit the plan in your file. A first year of a German course with an entrance exam, or a Studienkolleg followed by a degree, is a different plan from a straight master's, and the file has to describe the one you are actually doing.",
          "Lodging the application means you are telling the mission that your circumstances are as described. A change between applying and travelling, such as a different course or a different address, needs to be checked against what you notified.",
        ],
        callout: {
          tone: "watch",
          title: "Do not travel on a Schengen visa",
          body: "A German study visa is a national long-stay visa. A Schengen visa is for visits, not for a course of study, and presenting one at the border as your basis for entry ends the application as well as the trip.",
        },
      },
      timing: {
        body:
          "German visa processing takes weeks, and the plan for a German study visa assumes a window of several weeks between the appointment and the decision. Missions publish their own expectations and their own page is the one to read, because the figure varies by mission, by country and by the completeness of the file.",
        points: [
          "Book the appointment at the earliest slot available, and treat the published processing time after it as fixed. Everything else in your plan is downstream of this date.",
          "Budget at least six weeks between the appointment and your intended travel, and more if you are travelling to a mission that is a long journey away. The mission page for Poland used in this plan points to a six to twelve week window before departure, and other missions publish their own.",
          "If your course start date is fixed, work out the latest date you can be in Germany by, and count back from it. A visa that arrives after the semester has started is a visa that arrives too late.",
          "Book travel only after the visa is in your hand. The flight you book is the least recoverable cost in the whole process, and the arrival date is not yours to choose.",
          "Keep a buffer of a fortnight in front of the course start. German enrolment, address registration and the residence permit are all still ahead of you when the visa arrives, and they take days, not minutes.",
        ],
      },
      resources: {
        body:
          "Two things decide this checkpoint: which mission handles your file, and what that mission publishes. The directory of missions and the Foreign Office's own visa pages tell you both, and the make-it-in-germany guidance sets out the process around them.",
        resources: [
          {
            title: "German mission: student visa information (Poland)",
            kind: "official",
            url: "https://polen.diplo.de/pl-de/03-service/03-02-visainfo-eng/2581464-2581464",
            why: "The mission's published requirements for the student visa, the documents it asks for, the fee and its own processing expectations. Every mission publishes its own page, and yours is the one that decides.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Federal Foreign Office: find a German mission abroad",
            kind: "official",
            url: "https://www.auswaertiges-amt.de/en/about-us/auslandsvertretungen/deutsche-auslandsvertretungen",
            why: "The directory of German missions, so you can find the one responsible for your home state rather than guessing from a list of embassies you have heard of.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Federal Foreign Office: applying for a visa, general information",
            kind: "official",
            url: "https://www.auswaertiges-amt.de/en/visa-service/215870-215870",
            why: "Who needs a German visa, how the national visa differs from a Schengen visa, and the general rules that apply before you reach the mission's own page.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Federal Foreign Office: Consular Services Portal",
            kind: "official",
            url: "https://www.auswaertiges-amt.de/en/visa-service/consular-services-portal",
            why: "The Foreign Office's own online application and appointment system, which is where national visa applications and appointments are handled. Check the portal for the mission handling your address.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Make it in Germany: the visa process for study",
            kind: "official",
            url: "https://www.make-it-in-germany.com/en/study/visa-process",
            why: "The whole German study visa sequence, from the point you need a visa through to admission in Germany. It shows what comes after the appointment, which is the part people forget to plan for.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official pages of the authority that decides your application, and because they are the clearest available. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "de-visa-decision": {
    archetype: "visa",
    intro:
      "The visa is issued as a sticker in your passport, and it is not the last document you need. A German national visa authorises you to enter and to apply for a residence permit. It does not permit you to stay. The residence permit is a separate application, made after you arrive, and it is the document that actually authorises your stay and your working hours.",
    sections: {
      route: {
        body:
          "The sequence after the visa is issued is fixed and short: enter Germany within the visa's validity window, register your address, apply for the student residence permit at the local foreigners' office, and activate your blocked account. Missing any of those steps puts the status of your stay in question, and all of them are things you do on the ground rather than from abroad.",
        points: [
          "The national visa lets you enter and lets you apply. The Aufenthaltstitel, the residence permit, is the document that authorises the stay itself, and it is applied for locally.",
          "Address registration comes first, because the foreigners' office needs a registered address to process anything, and because the local bank account you need to activate your blocked account is opened in your registered name.",
          "Your university is also part of this. Enrolment is what turns the study plan in your visa file into an actual course, and the university checks your visa as part of enrolling you.",
          "The blocked account is the third thread. Until it is activated, the monthly money that the visa was predicated on is not flowing, which is why you need your own funds to bridge the first weeks.",
        ],
        callout: {
          tone: "watch",
          title: "The visa is not the residence permit",
          body: "A national D visa authorises entry and an application. It does not authorise the stay on its own. Assume you need the residence permit, plan for the weeks it takes, and do not treat the visa in your passport as the end of the process.",
        },
      },
      documents: {
        body:
          "The documents you need after arrival are the ones you already have, plus the ones you get by registering. It is worth putting them in one physical folder before you fly, because you will need the originals, not the uploads.",
        points: [
          "Your passport with the visa, the admission letter, and the blocking confirmation, carried with you and not packed in checked baggage.",
          "The address registration confirmation, which the Bürgeramt gives you, and which the foreigners' office will ask for.",
          "Your enrolment confirmation from the university, and the proof of the semester contribution and any tuition you have paid.",
          "Your health insurance policy, which the local registration and the permit application both need, and which may need to be adjusted to cover your German address.",
          "Proof of your previous residence permits and the record of your previous stays, if you have any, for the local authority's records.",
          "Enough cash for the first weeks, because the monthly release from your blocked account cannot start until the address is registered and the local account is open.",
        ],
      },
      appointments: {
        body:
          "There are two appointments waiting for you on the other side of the flight, and both of them are booked in Germany, in German, by German institutions. The first is address registration with the Bürgeramt, and the second is the residence permit application with the foreigners' office.",
        points: [
          "Address registration is usually within a short window of arrival, commonly 14 days, and the rule is set locally. Some Bürgerämter require an appointment and are booked weeks ahead, and some offer a limited number of daily slots for people who have just arrived.",
          "The residence permit application at the foreigners' office (Ausländerbehörde) is a separate appointment, and you may be able to file some of it online. Ask your university, because the international office usually knows the local practice and often helps you make the appointment.",
          "Your university's international office is the single most useful contact in Germany for all of this, and most of them hold scheduled walk-in hours for exactly these questions. Use them before you try to interpret a German municipal website.",
          "There is also the question of whether your institution requires you to enrol in person and by when. Some universities set their own enrolment deadline that is earlier than the semester start.",
        ],
      },
      money: {
        body:
          "The money question after the visa is about the first weeks and the things the blocked account does not cover. The account is your subsistence. It is not your set-up budget, and the gap is real.",
        points: [
          "The semester contribution is set by the state and by the university, not by the federal government, and it differs between states and between institutions. Ask your university for the exact figure rather than budgeting a national average.",
          "Tuition for international students is not a federal matter either. Most public universities charge no tuition, but some federal states charge international tuition fees, and the amount and the exemptions are set at state level. Check what your state and your university do.",
          "The blocked account releases a monthly amount, and the first release cannot arrive until you have registered your address and opened a local account. Carry enough of your own money to cover that gap plus a deposit on a flat.",
          "Health insurance, the semester contribution, the rent deposit and the first month's rent all land in the first fortnight. A student who has budgeted only the monthly release discovers all of them at once.",
        ],
      },
      rules: {
        body:
          "The rules that matter now are about the limits of the visa you hold, and about doing the local steps inside their deadlines. They are not the sort of rule that gets you refused at a counter; they are the sort that gets awkward quietly.",
        points: [
          "Enter within the validity window printed on the visa. A visa that expires while you are still trying to travel has to be reissued, and the time it takes is unpredictable.",
          "Register your address and apply for the residence permit inside the local deadlines. Doing the visa but not the permit is a common and entirely fixable mistake that becomes a serious one if left.",
          "The blocked account is a condition, not a suggestion. Keep it funded, keep the confirmation current, and do not treat the monthly release as your total budget.",
          "Your working hours are set by the conditions on the residence permit, and they are set by the current rules. If work is part of your plan, check the rules that apply now rather than the ones you read before you applied.",
          "If you change course or provider, tell your university and the foreigners' office, and check whether a new visa or a notification is needed. Changing the plan without telling anyone is the version of this that causes real trouble.",
          "Enrolment is not administrative. A student who does not enrol by the deadline can lose their place, and a lost place invalidates the study plan the visa rests on.",
        ],
        callout: {
          tone: "good",
          title: "The first three weeks decide how the year goes",
          body: "Address, bank, insurance, permit, enrolment, and the first monthly release. Almost all the stress of a first term in Germany comes from doing these in the wrong order. Do them in that order, and ask the international office before you guess.",
        },
      },
      timing: {
        body:
          "The visa's validity window sets the start of your clock, and everything after that is a series of local deadlines with different bodies and different rules. Write them down as dates the week you land, because none of them is intuitive and one of them is very short.",
        points: [
          "Check the validity window on the visa the moment you receive it, and work out the last date you can travel. If it is tight, that is a conversation with the mission, not with the university.",
          "Aim to arrive with enough time to register, enrol and open a bank account before teaching starts. Weeks, not days. The first week of term in Germany is not the time to be queuing at a Bürgeramt.",
          "Address registration is usually due within 14 days of arriving, and the local rule is the one that applies. The residence permit application window is separate and is set by the foreigners' office.",
          "The blocked account is activated after registration and a local account, so the first monthly release lands in your account some weeks after you land. Factor that into what you bring.",
          "Enrolment deadlines are set by your university and are earlier than the semester starts. A late enrolment can cost you the place you were granted a visa for.",
        ],
      },
      resources: {
        body:
          "After the visa is issued the official material shifts from the consulate to the things you will deal with in Germany: the residence permit, the address registration and what your state requires. The pages below cover those, plus the Federal Foreign Office's guidance on recognising academic qualifications, which is what the visa file was built on.",
        resources: [
          {
            title: "Make it in Germany: recognition of foreign academic qualifications",
            kind: "official",
            url: "https://www.make-it-in-germany.com/en/working-in-germany/recognition/foreign-academic-qualifications",
            why: "The official guide to what happens with your academic qualifications in Germany, including the anabin database for comparing them and the routes that exist. It is the reference behind the study plan in your visa file.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Make it in Germany: visa for studying",
            kind: "official",
            url: "https://www.make-it-in-germany.com/en/visa-residence/types/studying",
            why: "What the study visa requires and what it permits, including the conditions on work and on the length of stay. Useful for checking your assumptions against the published rules.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Make it in Germany: studying in Germany",
            kind: "official",
            url: "https://www.make-it-in-germany.com/en/study/study-in-germany",
            why: "The arrival side of the process: what enrolment involves, what the semester contribution and tuition situation is in each state, and where the housing and registration steps fit.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Make it in Germany: blocked account (Sperrkonto)",
            kind: "official",
            url: "https://www.make-it-in-germany.com/en/study/finances/blocked-account",
            why: "What happens to the account after you arrive, including the activation step and the monthly release. Read it before you land, because activation is not automatic.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "DAAD: studying in Germany",
            kind: "official",
            url: "https://www.daad.de/en/",
            why: "The German Academic Exchange Service, with the practical information on student life, the costs of living and what to do in the first weeks, including where the state-specific tuition rules are set out.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official German sources that explain what your visa carries and what you have to do on arrival. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },
};

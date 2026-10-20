import type { GuideContent } from "../types";

const V = "2026-10-20";

/**
 * The offer and enrolment dossier.
 *
 * This is the checkpoint where a good application becomes an expensive
 * commitment, and where the differences between the five systems are largest.
 * A US offer asks for money up front to hold a place. A UK offer is not a
 * place at all until it is unconditional and a CAS is issued. A Canadian
 * school will not issue the Letter of Acceptance until you have paid, and the
 * study permit is built on that letter. An Australian university issues the
 * Confirmation of Enrolment, and the visa is built on that. A German
 * admission is a letter you answer with a payment, and enrolment is what
 * gives you student status.
 *
 * Three things this dossier keeps insisting on, because they are where
 * students lose money and time:
 *
 *   1. THE DEPOSIT IS USUALLY NOT REFUNDABLE, and in the US and Canada it is
 *      frequently the only thing keeping your place alive.
 *   2. THE CONDITION DEADLINE IS NOT THE SAME DEADLINE AS THE PAYMENT
 *      DEADLINE, and the payment one is usually the earlier of the two.
 *   3. THE TOTAL COST IS NOT THE TUITION. Housing, health insurance, student
 *      services, travel and living costs are usually larger, and in the US
 *      they are the numbers the visa is judged against.
 */
export const OFFER_ENROLMENT: Record<string, GuideContent> = {
  "us-offer-accept": {
    archetype: "offer-enrolment",
    intro:
      "A US offer is a set of numbers with a deadline attached to the first one. Most schools require a non-refundable enrolment deposit within a stated number days of the offer, and that deposit is what starts the I-20 process. Missing it forfeits the place, and the refusal of a deferral is a separate failure with the same consequences.",
    sections: {
      offer: {
        body:
          "The US offer letter is usually short, and it is not the whole cost. What it contains is the programme, the term, the tuition and fees, the conditions, the deposit amount and the date by which the deposit must arrive. Read the deposit date first, because it is the only date in the letter that is usually absolute.",
        points: [
          "The deposit is normally non-refundable and is frequently a few hundred US dollars rather than a large sum. It is not a first instalment of tuition; it is the price of holding the place while the I-20 and the visa are processed.",
          "Most US graduate programmes are rolling admission, which means the offer can arrive months before the term. The offer date and the programme start date are usually months apart, and the deposit deadline is usually a short window measured in days from the offer letter.",
          "The offer may be conditional. Conditions are typically an outstanding academic result, an English score that is still to arrive, a transcript, or a financial certification that has not yet been submitted. Read the condition list as a checklist with its own dates, not as a formality.",
          "Deferral, where it exists at all, is decided case by case and is not a right. Stanford CS states that it grants MS deferrals only case by case and does not permit co-term deferral, which is the kind of rule worth reading before you assume you can move your start date.",
          "The offer does not include housing, and housing in the US is not guaranteed. Treat the full cost of the programme as tuition plus the housing and food the school estimates, because that is the number that will end up on your I-20 and the number the consular officer will hold you to.",
        ],
        callout: {
          tone: "watch",
          title: "The offer letter is not the cost of the programme",
          body: "Tuition is the part the letter states clearly. Housing, a mandatory health plan, student fees and books are usually absent from the letter and present in the school's cost-of-attendance calculation, which becomes your I-20 estimate and then your visa evidence. Compare two US offers on the total of those numbers, not on the tuition line.",
        },
      },
      conditions: {
        body:
          "Conditions are the work between the offer and the I-20, and the I-20 is the document the visa is built on. Every day a condition is outstanding is a day your visa clock has not started.",
        points: [
          "Clear the academic conditions first, and submit the result as soon as it is released rather than on the deadline. Universities need time to verify it, and a condition that is technically met but arrived too late is still outstanding.",
          "Watch the route for the English score. Most US programmes want the official electronic score report sent directly from the test body, so a result sitting in your own inbox is not yet a cleared condition. If the score was never sent, that condition is still open.",
          "The financial certification is usually a condition in substance even when it is not in writing. Your school will not issue the I-20 until it has seen the evidence that the first year is paid for, so treat the school's document list as part of the condition list.",
          "Keep every submission receipt. Most schools accept a condition as satisfied by an email saying 'sent', which means the only evidence that a condition was met is a timestamp. It is worth being the person who is easy to help.",
        ],
        callout: {
          tone: "good",
          title: "Send conditions in one package",
          body: "Collect the outstanding results, the score report, the transcript and the financial evidence, and send them to the admissions office in a single message with a short list of what is attached. Schools process complete files far better than partial ones, and each round trip is visa runway you cannot buy back.",
        },
      },
      money: {
        body:
          "Three separate sums appear in this stage, and students confuse them: the deposit, the first tuition bill, and the cost-of-attendance figure the school puts on your I-20. Only the third is what the visa is judged against, and it is the largest.",
        points: [
          "The deposit is the smallest and the most immediate. It is paid to hold the place, it is normally non-refundable, and it is the thing whose deadline is hardest.",
          "The I-20 estimate is the school's own calculation of your first year: tuition, the school's estimate of living costs, mandatory health insurance, less any financial aid the school expects to provide. It is the figure the consular officer measures your bank balance against, so leave a margin above it rather than matching it exactly.",
          "Health insurance in the US is usually mandatory and is often billed separately from tuition. Many schools require a specific plan from a specific provider, and the cost is set by the school, not by the market.",
          "Living costs are estimates and they are set by the school, not by the city. A school in an expensive city will publish a living-cost estimate that reflects its own housing data, and that figure is what you are held to even if your actual rent is different.",
        ],
        callout: {
          tone: "watch",
          title: "Match the estimate, but leave a margin",
          body: "A balance sitting exactly on the estimated cost of attendance reads as no margin at all, because the estimate itself can move before your interview. Aim to sit above the number on the I-20, and if you are close, ask the school what happens if their estimate changes after you have shown the funds.",
        },
      },
      decide: {
        body:
          "Deciding in the US is harder than it looks, because you are usually deciding with one offer and a deposit deadline rather than with a comparison. The work is in building the comparison yourself, before the deadline.",
        points: [
          "Compare on total cost of attendance, using each school's own I-20 figures rather than published tuition. Add housing, the health plan, student fees and the school's living estimate, and compare the sums. Two programmes with the same tuition can differ by a very large amount once everything else is counted.",
          "Ask about funding before you pay the deposit, in writing, and ask what the assistantship budget looks like for your cohort. Many US funding decisions are made with the offer, so you may be deciding before you know whether the money is there.",
          "Decide on your own terms but respect the mechanics. Accepting in the US is a financial commitment: the deposit is generally non-refundable, and the place is yours. Declining in writing is cheap and stops further deadlines arriving, so do it as soon as you are sure.",
          "If you are waiting on a better offer, understand the cost of waiting. A deposit deadline is usually shorter than the time it takes another school to make a decision, so the practical choice is to accept, pay, and then decide with money in hand and the option to decline later.",
          "Never let a deadline make the decision for you. If the total cost of the best offer is more than you can fund, that is an answer, and it is better discovered before the deposit than after the I-20.",
        ],
        callout: {
          tone: "good",
          title: "Ask the financial question in writing before you pay",
          body: "One message to the graduate coordinator: is funding available for master's students in my programme, how much, and when is it decided. Whatever the answer, you will be making the deposit decision with information rather than with hope, and the message is the evidence you acted on it.",
        },
      },
      checklist: {
        body:
          "The order below is the order that works. Everything in stage two is worthless if stage one was missed, and everything in stage four is worthless if stage three was rushed.\n\nThe US material worth reading comes from the school, the Department of Homeland Security and the Department of State. Nobody else's interpretation of it is worth your time.",
        roadmap: [
          {
            label: "Day 0 to 2",
            title: "Read and record",
            goal: "Know the deposit amount, the deposit deadline, the condition list and the total cost before you do anything else.",
            hours: "2 hours",
            focus: [
              "Write down the deposit amount and the date it is due, in your calendar, as a hard entry rather than a note.",
              "List every condition with its own deadline next to it.",
              "Ask the school for the cost-of-attendance breakdown if the offer letter does not show one, including the health insurance and the living-cost estimate.",
              "Note the deadline for declining in writing, and put it in the same calendar.",
            ],
            checkpoint: "The deposit amount, the deposit date, the decline date and the full condition list are all written down.",
          },
          {
            label: "Before the deposit date",
            title: "Decide and pay, in that order",
            goal: "A place secured on time, with the receipt in hand.",
            hours: "2 hours plus the decision itself",
            focus: [
              "Make the decision on the total cost, with your funding question answered.",
              "Pay the deposit by the method the school specifies, and keep the receipt and the confirmation email. In the US a deposit paid by the wrong route or to the wrong account can arrive unrecorded.",
              "Decline every other offer in writing, the same day. It costs nothing and it stops further deadlines arriving at you.",
            ],
            checkpoint: "Deposit paid, receipt filed, other offers declined in writing.",
          },
          {
            label: "The first two weeks after paying",
            title: "Clear the conditions",
            goal: "Every condition satisfied, with evidence, before the school needs to issue the I-20.",
            hours: "4-6 hours, more if a result is outstanding",
            focus: [
              "Send every outstanding document in one package, with a short list of what is attached.",
              "Confirm the English score was sent by the test body to the right institution code, and not just uploaded to a portal.",
              "Request the school's financial certification form if they have not sent it, and complete it with your bank evidence attached.",
              "Ask, in writing, what the school needs from you next and when it will issue the I-20. Knowing the I-20 date is what lets you plan the visa.",
            ],
            checkpoint: "The school has everything it needs and has told you when the I-20 will come.",
          },
          {
            label: "Once the I-20 is in your hands",
            title: "Check it and move to the visa",
            goal: "A correct I-20, and a visa application that matches it exactly.",
            hours: "3-4 hours",
            focus: [
              "Check the programme name, the start and end dates, the estimated cost of attendance and the funding source against your own paperwork, and get a corrected I-20 if anything is wrong.",
              "Sign it exactly as your passport spells your name, then scan every page before you send it back.",
              "Pay the I-901 SEVIS fee and print the receipt; the DS-160 cannot be completed without the SEVIS ID on the I-20.",
              "Book the consular interview as soon as you can. Wait times are published per post and they are the real constraint, not the paperwork.",
            ],
            checkpoint: "A correct I-20 in your hands, the SEVIS fee paid, and an interview booked.",
          },
        ],
        resources: [
          {
            title: "Stanford CS: master's admissions FAQ",
            kind: "official",
            url: "https://www.cs.stanford.edu/admissions/masters-admissions-frequently-asked-questions",
            why: "The official source for this milestone, and a good example of a programme publishing its deposit rules, its deferral policy and its funding policy in one place. It is the first page to read after your own offer arrives.",
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

  "gb-offer-accept": {
    archetype: "offer-enrolment",
    intro:
      "A UK offer is not a place. It is a conditional offer, and it becomes a place only when it is unconditional and a Confirmation of Acceptance for Studies is issued. The CAS is what the visa application is built on, so any condition still outstanding when you want your CAS is the thing most likely to delay your visa.",
    sections: {
      offer: {
        body:
          "The UK offer comes with a date and a list. The date is usually a response deadline with a few weeks of notice, occasionally much less if it is a clearing place. The list is the conditions, and each one has an owner: you, your university, or a third party such as a test provider.",
        points: [
          "Conditional or unconditional. A conditional offer lists what must happen before the place is confirmed. An unconditional offer means the university has nothing outstanding, and it is the precondition for a CAS. In practice, most offers arrive conditional and become unconditional when the outstanding evidence is verified.",
          "The response deadline is the date to reply by, and it is separate from the deadline for clearing the conditions. Missing the response date is fatal in a way that missing a condition usually is not, because the university will have released the place.",
          "Paying the deposit, or the full tuition, is what usually converts a conditional offer into an unconditional one, because the university is satisfied the student is serious and the money is in place. Some universities do not release a CAS until payment is received, and some require the first instalment rather than a token deposit.",
          "The CAS is issued by the university, not by the government, and it records the programme, the start and end dates and the fee status. It has a validity limit, and it is the single document your visa application is tested against, so any change of course, dates or fees after it is issued means you need a new one.",
          "Your university sends arrival, orientation and enrolment instructions separately from the offer, and often later. Do not assume the offer letter is the only thing you will be asked to act on.",
        ],
        callout: {
          tone: "watch",
          title: "The CAS, not the offer letter",
          body: "The visa application asks for a CAS, and the CAS exists only for an unconditional offer at a licensed sponsor. If you have a conditional offer and no CAS, you do not yet have a visa application; you have an application that cannot be filed. That is why the condition list deserves more attention than the response deadline.",
        },
      },
      conditions: {
        body:
          "The condition list is a to-do list with two hard categories: things that need a document from you, and things that need a document from someone else. The second category is where the delay comes from.",
        points: [
          "Outstanding academic results. Submit the transcript or the result as soon as it is released, not on the deadline, and send proof rather than a promise. Universities often have to verify results against the issuing institution, and that takes days.",
          "The English test result. UK universities usually need the result before they will consider the offer unconditional, so this condition frequently governs the CAS date. Check whether the score has been sent electronically to the university or whether they need a paper copy.",
          "ATAS for certain courses. A number of subject areas, including some STEM and health courses, require an ATAS certificate. It is a separate government form, it takes time, and it is a condition rather than an optional extra. Check whether your course needs one before you celebrate.",
          "References and any supervisor approval, which are the conditions your university is waiting on, not you. If the offer says a reference is outstanding, chase your referee directly rather than asking the admissions office, who cannot make them write.",
          "The financial evidence is usually not a condition on the offer but it is a condition on the visa, and the two clocks run together. Most students need the money to have been in an accessible account for a set number of days before the application, which means the deposit and the first instalment have to leave your account early enough for that period to run.",
        ],
        callout: {
          tone: "good",
          title: "Tell admissions early if something is late",
          body: "If a result, a reference or an award decision will arrive after the date you need it, say so in writing the day you know. Universities can often work around a late reference or a late supervisor reply. They cannot work around silence, and silence is what turns a small delay into a missed CAS.",
        },
      },
      money: {
        body:
          "UK study costs are paid in instalments, and the first one is the one with a deadline attached to it. The university deposit, the tuition invoice and the visa costs are three different things, and students routinely budget only the middle one.",
        points: [
          "The deposit or the first tuition instalment. What exactly is required varies: some universities take a smaller deposit to hold the place, some want the full first-year fee, and some will not issue a CAS until a payment has cleared. The offer letter or the acceptance instructions say which, and they are the document to read rather than any general rule.",
          "The tuition invoice is usually issued after you accept, with a payment date. Overseas students are commonly asked to pay the first instalment before arrival, not in instalments through the year, and a late instalment can stop your registration.",
          "The visa costs are separate from the university fees: the visa application fee, the Immigration Health Surcharge if your course is longer than six months, and the International Student fee, which is a health surcharge applied to students. None of these are optional and all of them are in addition to tuition.",
          "Proof of funds is a visa requirement with its own arithmetic. The amount is set by the Home Office and must be held in an accessible account for the required period, so the money has to exist well before the application. Check the current published figures rather than working from a memory of them.",
        ],
        callout: {
          tone: "watch",
          title: "Budget the whole year before you accept",
          body: "Tuition alone is rarely what a UK master's costs you. Add the deposit, the visa application fee, the Immigration Health Surcharge, the International Student fee, flights, housing deposit and the first term's living costs before you say yes. The number that surprises students is usually the one that is not tuition.",
        },
      },
      decide: {
        body:
          "UK offer decisions are less binding than US ones until the money moves, and the UK's system makes holding more than one place possible in a way other countries do not. It also has short response windows at the edges, and those are the ones that catch people.",
        points: [
          "Compare on the same basis: the same programme or an equivalent one, the same length, the same location, and the same total for the first year including the deposit. Published tuition alone hides the deposit, the fee differences between courses and the living cost of the city.",
          "Watch the response window. Offers made through clearing, and offers made late in an admissions round, often come with only a few days to respond. Read the deadline off the letter, not off your assumptions about how long you have.",
          "If you are holding two offers, work out the cost of giving one up. A UK university that releases a place does not always give it back, and asking to be reinstated is possible but not reliable.",
          "Deferral in the UK is possible at many universities but it is a request, and it usually needs a reason and often a deposit. Ask early, because the answer is often about funding rather than about you.",
          "Accepting without a decision is the worst option. A deposit you cannot fund is a liability, and a place you decline because you panicked is a year lost. A short, deliberate comparison beats a fast answer.",
        ],
        callout: {
          tone: "good",
          title: "Write the comparison down",
          body: "A single table with one row per offer and columns for total first-year cost, the deposit, the conditions still outstanding, the CAS date and the response deadline. The table takes twenty minutes and it is the only reliable way to compare an offer against a deadline you are also watching.",
        },
      },
      checklist: {
        body:
          "The UK sequence is short and the order is strict: conditions, then payment, then the CAS, then the visa. The visa cannot start until the CAS exists, so the CAS date is the number to plan backwards from.\n\nThe Home Office publishes the rules that decide the visa, and universities publish the rules that decide the CAS. Both are worth reading properly, because they are the only two documents that matter here.",
        roadmap: [
          {
            label: "The day the offer arrives",
            title: "Extract the dates",
            goal: "The response deadline, the condition list and the payment requirement, all in writing.",
            hours: "2 hours",
            focus: [
              "Write down the response deadline and put it in your calendar with an alert a week before.",
              "List every condition, with who owns it: you, your university, a referee, a test provider.",
              "Find the payment requirement: deposit, first instalment, or full fee, and the date.",
              "Check whether the course needs an ATAS certificate. If it does, start that process today.",
            ],
            checkpoint: "Dates in the calendar, conditions on a list, payment requirement known.",
          },
          {
            label: "The first week",
            title: "Clear what you control",
            goal: "Every condition that depends on you is resolved and submitted.",
            hours: "4-6 hours",
            focus: [
              "Send outstanding results as soon as they are released, with proof.",
              "Confirm the English result has gone to the university electronically, and chase the test provider if it has not.",
              "Chase referees directly and give them a deadline, a link to the form and a sentence about the programme.",
              "Tell admissions in writing about anything that will be late.",
            ],
            checkpoint: "Nothing outstanding that is waiting on you.",
          },
          {
            label: "Once the offer is unconditional",
            title: "Pay and request the CAS",
            goal: "The CAS in hand, with the dates on it correct.",
            hours: "2-3 hours plus the payment",
            focus: [
              "Pay exactly what the acceptance instructions ask for, by the method they specify, and keep the receipt and the payment confirmation.",
              "Request the CAS if it does not arrive automatically. It can take a few working days.",
              "When the CAS arrives, check the programme name, the start and end dates and the fee status against your own paperwork, and query anything that is wrong before you file the visa.",
            ],
            checkpoint: "A CAS in your hands with the correct programme and dates.",
          },
          {
            label: "The week after",
            title: "File the visa and plan the money",
            goal: "The visa application in, and the funds arranged to satisfy the proof requirement.",
            hours: "4-5 hours",
            focus: [
              "File the student visa application using the CAS details exactly as printed.",
              "Arrange the proof of funds so the required amount has been accessible for the required number of days before the application date.",
              "Pay the visa application fee, the Immigration Health Surcharge and the International Student fee, all of which are separate from tuition.",
              "Register for the university's accommodation alerts at the same time, because halls in the UK fill long before term.",
            ],
            checkpoint: "The visa application is submitted, the money is arranged, and the accommodation alerts are on.",
          },
        ],
        resources: [
          {
            title: "University of Bristol: the CAS",
            kind: "official",
            url: "https://www.bristol.ac.uk/directory/visas/student-visa/cas/",
            why: "The official source for this milestone, and a clear explanation from a licensed sponsor of what the CAS is, how it is issued and what it does not cover. The most useful thing on this list if you have never seen one.",
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

  "ca-offer-accept": {
    archetype: "offer-enrolment",
    intro:
      "In Canada, accepting the offer and paying tuition is what produces the Letter of Acceptance, and the study permit application is built on that letter. In most cases the school cannot issue the letter until you have paid, so the payment is not paperwork, it is the thing that starts the immigration process.",
    sections: {
      offer: {
        body:
          "A Canadian offer letter carries the programme, the dates, the tuition amount, the acceptance deadline and the deposit or instalment required. The key difference from the US is what comes out of it: the Letter of Acceptance, which is the document IRCC asks for and checks.",
        points: [
          "The Letter of Acceptance (LOA) is issued by the institution, not by you and not by the government. It is the document that proves you have been accepted into an eligible programme, and the study permit application is assessed on it.",
          "The LOA must be genuine, recent, and accurate. IRCC's own guidance asks for a document showing the programme you are applying to, the dates, and the amount of money you have paid or owe, and it warns about letters that are altered, out of date or inconsistent with the rest of your application.",
          "Payment usually comes first. The institution will typically require a tuition deposit or instalment before it issues the LOA, which is why the payment date and the LOA date sit close together and why the LOA often arrives a few weeks after you have paid.",
          "Provincial requirements sit on top. If you are applying in Quebec, there is a separate provincial attestation in addition to the federal study permit, with its own application and its own timing. Check whether it applies to you before you treat the LOA as the whole story.",
          "Accept the one offer and decline the rest in writing. Canadian institutions will not normally hold a place, and an undeclined offer generates no obligation, but it does generate more mail and occasionally more pressure.",
        ],
        callout: {
          tone: "watch",
          title: "The letter has to match your application",
          body: "IRCC checks the LOA against everything else in your file: the programme, the dates, the institution, the money. A letter with a misspelled programme name, an end date that does not cover your visa period, or a different address from the one you gave will be queried, and a query is weeks. Read the letter line by line before you file.",
        },
      },
      conditions: {
        body:
          "Canadian conditions are usually fewer than British ones and more consequential, because the condition that matters most is money and because the LOA is downstream of it. Outstandings that are common: an academic result still being processed, an English score not yet received, and a document that the school has asked for twice.",
        points: [
          "Outstanding academic results are verified by the university, sometimes against the issuing institution directly, and that verification takes time. Send the result as soon as it is released and keep the transmission receipt.",
          "The English test result has to reach the university in the form they accept. Ask the admissions office whether they want the electronic report sent to a named code or a copy uploaded, and check which one you have done.",
          "The study permit requires a language result as well as the LOA, and the two are assessed separately. A score that satisfies the university is not automatically on file with the immigration authority.",
          "Conditions that look administrative are the ones that cause the delay. An outstanding official transcript, a missing document in a required format, or an unreturned form can hold an LOA back for weeks, and each of those is something you can chase.",
          "If the school asks you to confirm a course change, a start-date change or a fee change, answer in writing. Any of those changes means the LOA changes, and a stale LOA is worse than a delayed one.",
        ],
        callout: {
          tone: "good",
          title: "Ask for the LOA early, and ask what is missing",
          body: "Email the admissions office and ask: what is still outstanding before you can issue the Letter of Acceptance, and when can I expect it. The answer is usually a short list, and asking for it in writing gives you something to chase and a record of what you were told.",
        },
      },
      money: {
        body:
          "The Canadian money checkpoint is the study permit's financial requirement, and it is stricter than most students expect. The proof has to be in a form the authority accepts and has to have been sitting there long enough.",
        points: [
          "The school usually wants a tuition deposit or instalment before the LOA, and the amount is set by the institution. It goes on your student account and appears as a credit in the financial evidence you will present later.",
          "IRCC sets a minimum amount of funds you must show, calculated from tuition plus living expenses, and it publishes the formula and the current figures. These are revised regularly, so read the published requirement at the time you apply rather than relying on a figure you remember.",
          "The accepted proof is specific. IRCC sets out the forms it will accept, which are a guaranteed investment certificate with a letter of guarantee, or funds in an account you control. A large balance in a savings account is not automatically the right evidence, and a bank statement on its own may not be enough.",
          "Add the rest of the real cost: the first term's living costs, flights, housing deposit, winter clothing if you are heading to a cold country, and the health insurance that most provinces require. The permit threshold is a floor, not a budget.",
        ],
        callout: {
          tone: "watch",
          title: "The permit threshold is a floor, not a budget",
          body: "You can satisfy the study permit's money requirement and still arrive unable to pay the deposit on a room and the first month of rent. Plan on the real cost and treat the permit threshold as the minimum you have to clear, not the amount you are expected to spend.",
        },
      },
      decide: {
        body:
          "Comparing Canadian offers is mostly a comparison of the money and the place, because the programmes and their conditions are usually similar. The decision that people regret is not the wrong programme; it is the right programme in a city they cannot afford.",
        points: [
          "Compare the deposit, the total tuition for the programme, and the school's estimate of living costs in that city. The last one varies more than the tuition and is set by the school.",
          "Check the housing position before you accept if you have not already. Some universities guarantee housing for incoming undergraduates and not for graduate students, and if you are self-funding in a tight city that changes the arithmetic completely.",
          "Ask about scholarships one last time before you accept. Canadian universities often hold a small amount of funding that is released in the early round, and the question costs one email.",
          "The deposit is generally not refundable if you withdraw. Treat the money as committed the moment you pay it, and only pay when the decision is made.",
          "If you have a provincial attestation to complete, find out how long it takes and whether it must be filed before the permit application or can follow. In Quebec it is usually filed with the federal application, but the timing is worth confirming with the school.",
        ],
        callout: {
          tone: "good",
          title: "Pay after the decision, not before it",
          body: "The order is: decide, then pay, then receive the LOA, then file. Paying first because you are anxious inverts the sequence and leaves you committed while you are still comparing. The whole process works if you keep that order.",
        },
      },
      checklist: {
        body:
          "The Canadian sequence is: accept, pay, receive the LOA, satisfy the financial requirement, file the permit. Steps three and four are the ones students rush, and they are the ones that cost months.\n\nThe immigration authority's own pages are the ones that decide the application, and the institution's page is the one that produces the letter.",
        roadmap: [
          {
            label: "The day the offer arrives",
            title: "Read the money and the dates",
            goal: "Know the acceptance deadline, the deposit, the tuition and the school's living-cost estimate.",
            hours: "2 hours",
            focus: [
              "Record the acceptance deadline and the payment deadline as separate calendar entries.",
              "Note the deposit amount and what it is credited against.",
              "Find the school's published estimate of living costs for the programme and the city, and treat it as a floor for your own budget.",
              "Confirm whether the programme is on the designated learning institution list, and whether a provincial attestation applies to you.",
            ],
            checkpoint: "The dates, the deposit and the cost estimate are all recorded, and the DLI question is answered.",
          },
          {
            label: "The decision week",
            title: "Accept one, decline the rest",
            goal: "A single committed place, with the paperwork triggered.",
            hours: "2-3 hours",
            focus: [
              "Accept your chosen offer in writing through the official channel, and keep the acceptance record.",
              "Decline every other offer in writing the same day.",
              "Pay the deposit or instalment by the method the school specifies, and keep the receipt and the credit on your student account.",
              "Ask in writing what the school still needs before it can issue the Letter of Acceptance, and when it expects to issue it.",
            ],
            checkpoint: "Payment made, receipt filed, and you know what is outstanding and when the LOA will come.",
          },
          {
            label: "When the LOA arrives",
            title: "Check the letter against everything",
            goal: "An accurate, current Letter of Acceptance that will survive the visa check.",
            hours: "1-2 hours",
            focus: [
              "Check the programme name, the start and end dates, the institution and the address against your application and your other documents.",
              "Check the amounts against what you have actually paid and what the school says you owe.",
              "Check the end date covers the full length of your programme plus any completion margin you may need.",
              "Scan the letter at high resolution. You will be uploading it, and a phone photo of a folded page is a poor upload.",
            ],
            checkpoint: "A clean, accurate, legible LOA in your files and ready to upload.",
          },
          {
            label: "The permit filing window",
            title: "Satisfy the money requirement and file",
            goal: "A complete study permit application, filed with the funds evidence in the accepted form.",
            hours: "4-6 hours",
            focus: [
              "Read IRCC's current published financial requirement and work out the exact figure your programme and dependants require.",
              "Put the money into the form of evidence IRCC accepts, and leave it there for the required period before you file. The clock starts when the money is in place, not when you submit.",
              "Assemble the document set from IRCC's own list, including the LOA, the passport, the photos and the funds evidence.",
              "File, and note the reference number and the expected processing time.",
            ],
            checkpoint: "The application is filed, the funds have been in place for the required period, and you have the file number.",
          },
        ],
        resources: [
          {
            title: "Canada.ca: documents for the study permit",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents.html",
            why: "The official source for this milestone, and the authority's own list of what the application must contain, including what makes a Letter of Acceptance acceptable and the rules on the financial evidence.",
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

  "au-offer-accept": {
    archetype: "offer-enrolment",
    intro:
      "Accepting an Australian offer starts a process you do not control. The university issues the Confirmation of Enrolment after you accept and pay, and Home Affairs requires a current CoE for a student visa. The CoE is issued by your provider, not by you, and its dates drive your visa length and your OSHC period.",
    sections: {
      offer: {
        body:
          "An Australian offer usually arrives with a short acceptance window, a fee to pay, and a promise of a CoE. The CoE is the document that matters later, and it is worth understanding what it will say before you pay anything, because the dates on it become the dates on your visa.",
        points: [
          "Acceptance is time-limited and the window is often short, particularly for the second semester. Read the date off the offer letter rather than assuming it is generous.",
          "The Confirmation of Enrolment is issued by the provider once you have accepted and paid, and it states the course, the education provider, the start and end dates, and the fees. It is the document the visa application is built on.",
          "The CoE dates are the ones that matter. They set the length of the student visa, they define the period your OSHC has to cover, and they have to match your actual enrolment. A student visa granted for less time than the course needs has to be extended.",
          "Overseas Student Health Cover is a condition of the visa, not of the offer, but it is triggered by the offer because the CoE defines the period it has to cover. Home Affairs requires cover for yourself and any dependants from at least one week before the course start date, for the whole stay.",
          "Accepting an offer does not enrol you. The enrolment is a separate step with a deadline of its own, and it is where your course choices are confirmed.",
        ],
        callout: {
          tone: "watch",
          title: "The CoE, not the offer letter",
          body: "The visa application asks for a Confirmation of Enrolment. Until the provider issues one, there is no visa application to file, whatever the offer letter says. Check when the CoE is issued, and build the visa timeline from that date rather than from the acceptance date.",
        },
      },
      conditions: {
        body:
          "The conditions on an Australian offer are usually short: outstanding academic results, an English score, sometimes a visa requirement to be satisfied before enrolment. The heavy lifting is not in the conditions, it is in the sequence around them.",
        points: [
          "Outstanding results are verified by the provider, and the verification is often the slowest part. Submit them the day they are released and ask for written confirmation that the condition is cleared.",
          "The English result has to be in the form the provider accepts and it has to have been sent to them. The Test Results Verification system, where the test body sends the result directly to the institution, is the usual route, and it takes working days.",
          "The Genuine Student requirement is a visa condition rather than an offer condition, and it asks you to explain your study plan, your reasons for choosing the course and the provider, your funding and your post-study plans. It is assessed in the context of your whole file, so have the story ready before you are asked for it.",
          "Overseas Student Health Cover has to be in place and evidenced. Home Affairs states that failing to evidence it is a refusal risk, and the policy certificate and membership confirmation have to be uploaded with the application.",
          "Any change of course, of provider or of dates means a new CoE, and a new CoE means the visa has to be assessed again against it. Make changes deliberately and early, not in the last month.",
        ],
        callout: {
          tone: "good",
          title: "Clear the conditions in writing",
          body: "When you submit a result or a document, ask for confirmation that the condition is met. A condition that is satisfied but not recorded is a condition you will be asked about again during the visa assessment, and that costs a month.",
        },
      },
      money: {
        body:
          "Australian international students pay full tuition, and the visa has its own financial test on top. The two are separate, and the visa's test is the one that catches people, because it is assessed against a published figure rather than against what you actually earn.",
        points: [
          "Enrolment and tuition fees are set by the provider and by the course, and they are usually the largest single item in the budget. They are published on the provider's fee schedule for international students, and the first instalment usually falls due at or soon after enrolment.",
          "The visa's financial capacity requirement is published by Home Affairs as a set of income thresholds, and you need to show that you have genuine access to that income. The figure is the same whether you are sponsored or self-funded, and it is published and revised, so read the current numbers rather than a copy of a threshold you saw last year.",
          "OSHC is a separate cost and a separate decision. It has to cover the whole stay, it has to meet the student visa conditions, and it is usually bought for the full CoE period, including any period you will not be on campus.",
          "Add the things that are not tuition: accommodation deposit and first term, flights, visa application charge and the significant criminal record check, OSHC, a phone, and a first term's living costs. The visa's financial test does not cover most of these, and students arrive short.",
        ],
        callout: {
          tone: "watch",
          title: "The visa's money test is not your budget",
          body: "The published income threshold is what you must show access to for the visa. It is not what you will spend, and it does not include housing deposits, flights, OSHC or a first term's food. Satisfy the threshold and still plan the real number separately, because the difference is usually several thousand dollars.",
        },
      },
      decide: {
        body:
          "Australian offers are unusually easy to hold and unusually easy to lose, because there is usually only one place on offer and the window to accept is short. The decision has to be made inside the window, so the comparison work happens before the offers arrive.",
        points: [
          "Compare the total cost of the first year: tuition, enrolment fee, OSHC for the full period, the accommodation deposit and first instalment, flights and living costs. The tuition alone understates the decision by a wide margin.",
          "Check the provider's financial history and the student support offer, not just the ranking. Course fees and the deposit are set by the provider and they change, so a number you read this year may not be the number you pay.",
          "If you are funding yourself, the Genuine Student requirement makes your funding story part of the assessment. A coherent, documented source of money is easier to write than an improvised one.",
          "Accepting means committing to the course and the cost. If you are still deciding between a taught master's and research, note that the CoE, the visa length and the OSHC period all follow the course you enrol in, and switching later is expensive.",
          "Do not accept a place you cannot pay for, and do not leave a place you might want. The provider will release it, and offers in the second semester in particular go quickly.",
        ],
        callout: {
          tone: "good",
          title: "Line up the first term's money before you accept",
          body: "Before you accept, write down where the deposit, the first tuition instalment, the OSHC premium, the accommodation deposit and the first term's living costs come from, and check each against a real account balance. A commitment you can describe in one sentence is a commitment you can honour.",
        },
      },
      checklist: {
        body:
          "The Australian order is: accept, pay, receive the CoE, buy OSHC, enrol, file the visa. The visa cannot be filed without the CoE, so the CoE date is the anchor for everything after it.\n\nThe visa rules come from Home Affairs and the practical steps come from the provider and from Study Australia. The CoE itself comes from your provider.",
        roadmap: [
          {
            label: "The day the offer arrives",
            title: "Extract the terms",
            goal: "The acceptance deadline, the fees and the enrolment obligations, all written down.",
            hours: "2 hours",
            focus: [
              "Record the acceptance deadline in your calendar with an alert well before it.",
              "Note the enrolment fee, the tuition amount and the first instalment date from the offer and the fee schedule.",
              "Find out when enrolment happens and what it involves; it is a separate step from accepting.",
              "Note whether the provider or you are responsible for lodging the OSHC, and what they need from you.",
            ],
            checkpoint: "Deadlines and amounts recorded, and you know what enrolment will involve.",
          },
          {
            label: "The acceptance week",
            title: "Accept and pay",
            goal: "The place committed and the CoE requested.",
            hours: "2-3 hours",
            focus: [
              "Accept in writing through the provider's official channel, and keep the acceptance confirmation.",
              "Pay using an international method the provider accepts, and keep the receipt. Credit card and bank transfer fees are real money.",
              "Ask in writing when the CoE will be issued and what your course start and end dates will be.",
              "Start comparing OSHC policies now, against the visa conditions rather than on price alone.",
            ],
            checkpoint: "Accepted, paid, receipt filed, and the CoE date is known.",
          },
          {
            label: "When the CoE arrives",
            title: "Check it and buy the cover",
            goal: "A correct CoE and an OSHC policy that covers the whole period it names.",
            hours: "2-3 hours",
            focus: [
              "Check the course, the provider, the start and end dates and the fees on the CoE against the offer and your payment.",
              "Buy OSHC from at least one week before the course start date on the CoE, for the full duration of your stay, and keep the policy certificate and the membership confirmation.",
              "Check the policy covers what you need, particularly outpatient treatment, and check the excess and any waiting period before you buy rather than after.",
              "Check whether you need cover for any dependants who are coming with you, because it is a separate policy at a separate cost.",
            ],
            checkpoint: "A correct CoE, an OSHC certificate covering the whole period, and both documents ready to upload.",
          },
          {
            label: "The enrolment and visa window",
            title: "Enrol, then file",
            goal: "Enrolled on the right course, and a visa application with the CoE and the cover in it.",
            hours: "4-6 hours",
            focus: [
              "Complete enrolment and confirm your course, your subjects or your specialisation, and your start date.",
              "File the visa application with the CoE, the OSHC certificate, the enrolment confirmation and the financial evidence, in the ImmiAccount.",
              "Prepare for the Genuine Student requirement: your study plan, your reasons for the course and the provider, your funding and your post-study plans, each of which you should be able to explain in a couple of sentences.",
              "Keep copies of everything you submit, and the submission record from ImmiAccount.",
            ],
            checkpoint: "Enrolled, the visa filed, and every uploaded document is also saved offline in your own folder.",
          },
        ],
        resources: [
          {
            title: "Home Affairs: Student visa subclass 500",
            kind: "official",
            url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
            why: "The official source for this milestone, and the authority's own page on the Confirmation of Enrolment, the financial capacity requirement, the OSHC condition and the health checks. This is the document the visa is decided against.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official Australian sources for this checkpoint and the clearest complete set we found, not anyone paid us. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "de-admission": {
    archetype: "offer-enrolment",
    intro:
      "German admission is a letter, and answering it is a payment. Enrolment requires the semester contribution and, in the tuition-charging states, the tuition fee for non-EU students. Until you are enrolled you do not have student status, and without student status a lot of things you need do not work.",
    sections: {
      offer: {
        body:
          "The Zulassungsbescheid, or admission letter, normally arrives by post or through the university's portal within weeks of a complete application. It tells you the programme, the start of the course, and what you have to do and by when to become enrolled. The response window in the letter is the date that matters.",
        points: [
          "The acceptance window is short and it is stated in the letter. Answer within it. A missed window means a fresh application, and a fresh application means another semester of waiting and another round of documents.",
          "The semester contribution is a compulsory payment to the university, and the amount is set by each university. It usually bundles the student services fee, the semester ticket, and in some cities a local transport pass, and it is normally due at enrolment rather than on acceptance.",
          "Non-EU students pay tuition in the states that charge it. Bavaria and Baden-Wurttemberg charge non-EU students a tuition fee for many degree programmes, and the amount is set by the state, subject to a federal framework. Ask your university what you will pay rather than assuming you will pay nothing.",
          "Enrolment itself is a separate administrative act. You get a student status, an immatriculation record, and the proof of it that you will need for the residence permit, for a blocked account and for many other things.",
          "The letter is evidence. Your visa application must be consistent with it, so keep it and keep the envelope, because the issuing authority sometimes asks for the original.",
        ],
        callout: {
          tone: "watch",
          title: "Answering the letter is not enrolling",
          body: "Sending your acceptance letter back does not make you a student. Enrolment, and the payment that goes with it, is what gives you student status and the immatriculation proof you need for the residence permit. If you stop at the letter, you will discover in Germany that half the things you need need a student status you do not yet have.",
        },
      },
      conditions: {
        body:
          "German master's offers carry fewer conditions than British or American ones, because the entrance qualification is checked before admission rather than after. The conditions that remain are mostly about your status and your paperwork rather than your grades.",
        points: [
          "Proof of the master's entrance qualification has normally been assessed already, which is why the admission letter is often unconditional. If the letter lists a condition, it is usually an administrative one: a missing document, a missing certificate, or something to do with your visa status.",
          "The blocked account is the visa condition, and it is a money condition. You have to show that a specific amount is available in Germany, and it must be in a German account in your own name. The amount is set per city and per year and is published by the Federal Foreign Office's own pages.",
          "APS certification, for applicants from India, China and Vietnam, is a condition that has to be complete before you can hold the visa. The APS process includes its own language test and its own verification, and it is the long pole in those countries.",
          "Enrolment conditions, such as a required placement, a placement in a subject you did not choose, or a proof of a health insurance policy, are checked at enrolment and are quick to satisfy once you know they exist.",
          "If the letter gives you a conditional deadline, treat the letter as conditional even if the condition looks trivial. A missing transcript can cost you the place.",
        ],
        callout: {
          tone: "good",
          title: "Ask about the blocked account in the same email",
          body: "When you answer the admission letter, ask the university three things: the exact enrolment fee and semester contribution, whether non-EU students at this institution pay tuition, and what you need to bring to the enrolment appointment. All three are things the letter will not tell you clearly.",
        },
      },
      money: {
        body:
          "Three separate sums, and only one of them goes to the university. Students routinely plan for the tuition and forget the other two, and one of the three is money you have to block rather than spend.",
        points: [
          "The semester contribution is set by each university and is a real cost, usually a few hundred euros for a semester. It is not a symbolic fee: it covers the student services fee, the semester ticket and usually local transport.",
          "Tuition, where it applies, is set by the state. It applies to non-EU students in Bavaria and Baden-Wurttemberg, and it is charged per semester of study. The university will tell you the amount, and the state publishes the framework it operates under.",
          "The blocked account is money you do not spend. It is a sum you must hold in a German account in your own name, at a specified monthly rate, for a specified number of years, and the Federal Foreign Office publishes the monthly amount and the required total for each city. It is the largest single number in the German plan and it is not a fee.",
          "On top of that: a visa fee, travel, a deposit for a room, and the practical costs of the first weeks, which in Germany include a local phone contract and sometimes a city registration fee. Budget for a first term that is mostly administrative.",
        ],
        callout: {
          tone: "watch",
          title: "The blocked account is not a fee",
          body: "Students see a large monthly figure for the blocked account and assume it is a charge. It is not. It is your own money, held in your own account, released to you monthly to live on. What you are paying for is the visa requirement that you can show genuine means, not another bill.",
        },
      },
      decide: {
        body:
          "By the time the German letter arrives, most of the deciding is done, because admission in Germany is a much more closed process than in the US or the UK. What is left is a smaller set of choices: timing, and the money.",
        points: [
          "Check the start date in the letter against your visa timeline, not against your preference. If the letter starts you in the winter semester and your visa appointment slots are not available, the whole plan has to move, and the letter's acceptance window will not move with it.",
          "Confirm the total cost for the states where tuition applies before you accept. The sum is large enough to change the decision, and it is better discovered in the letter than after enrolment.",
          "Ask whether the programme is in English or German, and what the language of assessment and examination is. Programmes that teach in English in a German university are usually taught in German, and the language of the degree certificate follows the examination language.",
          "If you want to change the start date, ask before you enrol, because after enrolment the switch is an administrative process rather than a request. Universities are usually more flexible before enrolment than after.",
          "Keep the letter. It is the document that the residence permit application is checked against, along with the enrolment confirmation.",
        ],
        callout: {
          tone: "good",
          title: "Answer the letter and start the visa the same week",
          body: "German timings are unforgiving because the residence permit, the blocked account and the APS process all sit in sequence after enrolment. The admission letter starts a clock, and every week you wait after answering it is a week added to the end of it.",
        },
      },
      checklist: {
        body:
          "The German order is: answer the letter, pay, enrol, open the account, fund the blocked account, then apply for the residence permit. The account cannot be opened without an address and a registration, so housing sits earlier in this plan than in any other country here.\n\nThe Federal Foreign Office's own site sets the visa and blocked account rules, and the university sets everything to do with your own application. Both matter, and they are not the same document.",
        roadmap: [
          {
            label: "The week the letter arrives",
            title: "Read, answer, and ask",
            goal: "The place accepted inside the window, and the three numbers you need in your hands.",
            hours: "3-4 hours",
            focus: [
              "Read the letter line by line: the programme, the start date, the enrolment deadline, the response deadline and any conditions.",
              "Send your acceptance back through the channel the letter specifies, inside the window.",
              "Ask the university the three questions: the exact enrolment and semester contribution fee, whether you pay tuition as a non-EU student, and what to bring to enrolment.",
              "Check whether an APS certificate is required for your nationality, and if so where you are in that process.",
            ],
            checkpoint: "The letter is answered and the fee schedule is in writing.",
          },
          {
            label: "Before enrolment",
            title: "Get a German address",
            goal: "A registered address, because the account and the residence permit both need it.",
            hours: "6-8 hours of searching",
            focus: [
              "Apply to the university's own residence service, which allocates rather than sells and is not guaranteed.",
              "Register on the city and state housing portals, which is usually the faster route and lets you see what is actually available.",
              "Have your admission letter ready, because most portals ask for proof of admission or a contract-ready status.",
              "Keep a budget for a hostel or hotel for the interim period if nothing is secured, because arriving with no address blocks the registration.",
            ],
            checkpoint: "Either a secured room or a realistic interim plan, with the registration appointment in mind.",
          },
          {
            label: "Enrolment day",
            title: "Become a student",
            goal: "Student status, the enrolment confirmation, and the proof you will need later.",
            hours: "3-5 hours on the day",
            focus: [
              "Pay the semester contribution and, if it applies, the tuition fee, and keep the receipt.",
              "Complete the enrolment, and collect or download the enrolment confirmation and the proof of immatriculation.",
              "Ask for the university's guidance on the blocked account, the specific bank it accepts and the exact amount required for your city and programme length.",
              "Check your course registration is complete, and that you are registered for the subjects or the module you intend to take.",
            ],
            checkpoint: "Enrolled, with the immatriculation proof in your hand.",
          },
          {
            label: "The first month in Germany",
            title: "Register, open the account, apply for the permit",
            goal: "A lawful, evidenced stay, with the funding in place.",
            hours: "6-8 hours across several appointments",
            focus: [
              "Register your address with the local Burgeramt, usually within 14 days of arriving, and keep the confirmation.",
              "Open a German bank account, which usually needs the registration, your passport and the enrolment confirmation, and which is where the blocked account has to be.",
              "Fund the blocked account at the monthly rate the Federal Foreign Office publishes for your city, for the length of your course.",
              "Apply for the student residence permit at the local foreigners' office, with the admission letter, the enrolment confirmation and the registration confirmation.",
            ],
            checkpoint: "Registered, banked, blocked account funded, and the residence permit application filed.",
          },
        ],
        resources: [
          {
            title: "TUM: master's application",
            kind: "official",
            url: "https://www.tum.de/en/studies/application/master",
            why: "The official source for this milestone and a well-structured example of a German university's own admissions page, including the enrolment steps and what you must present. Every German university has an equivalent.",
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

  "fr-admission": {
    archetype: "offer-enrolment",
    intro:
      "Confirming a place in France is usually a deposit plus a set of steps in the university's own platform, and for some programmes a separate reduced-fee or scholarship application that has to be in before enrolment closes. The order matters, because the reduced international tuition rate is not applied automatically.",
    sections: {
      offer: {
        body:
          "The French admission comes as an offer plus a list of things to do in the platform, often spread over weeks. Unlike the UK or the US, the financial commitment is usually modest at this stage, and the bulk of the money comes later with the tuition instalments. What is rigid here is the reduced-fee route.",
        points: [
          "The acceptance window is stated in the offer and the platform. It is usually a few weeks and it is not extended for a late reply.",
          "A deposit or a first instalment is usually required to confirm the place. The amount is set by the university and it is typically a fraction of the annual fee rather than the whole thing.",
          "Pre-enrolment, or admission confirmation, happens inside the university's platform. It often involves choosing options, a track or a specialisation, and it is a real step with a real deadline rather than a formality.",
          "The reduced international tuition rate, and any scholarship, usually need a separate application. A student who assumes the reduced rate is automatic, or that applying for it after enrolment works, ends up being charged the full rate.",
          "The Études en France attestation, where the programme requires one, is a separate document with its own fee and its own timing, and it is usually needed before the visa application rather than before enrolment.",
        ],
        callout: {
          tone: "watch",
          title: "The reduced fee is a separate application",
          body: "France has two tuition levels for international students: the standard rate and a reduced rate, and which one you pay is often determined by an application you have to make and be granted, sometimes on financial grounds. If you assume the lower rate, you budget incorrectly. If you apply for it after enrolment closes, you may not be considered at all.",
        },
      },
      conditions: {
        body:
          "French conditions are mostly about two things: your academic record being verified, and the money and paperwork that the platform asks for. The academic ones are usually quick; the administrative ones are what cause delay.",
        points: [
          "Outstanding results, transcripts and diplomas. The university usually wants the official documents rather than scans, and a translation certified by a sworn translator is needed for anything not in French.",
          "The attestation. Where the programme requires one, it depends on a language test you have already sat, and it is issued on the basis of that result. It cannot be issued retroactively, and the visa application will be waiting on it.",
          "The reduced-fee or exemption application, where it applies, is a condition of the fee you will pay rather than of your admission. Read the offer for a line about it and treat it as a deadline.",
          "Health cover and the student contribution are part of enrolment rather than of admission, and both are set nationally. The contribution for a master's is a published annual amount that every student pays.",
          "The university may also ask for a deposit for the accommodation, or for a guarantor, or for a language placement test. Each is quick when you know about it and slow when you do not.",
        ],
        callout: {
          tone: "good",
          title: "Read the offer for the words 'taux', 'reduction' and 'bourse'",
          body: "Those three words in the offer letter tell you whether you have a fee application to make, a scholarship to apply for, or a rate that has already been decided. If they are not there, ask the admissions office in writing, because a French student who asks is told and a student who assumes is not.",
        },
      },
      money: {
        body:
          "French tuition is set by the state each year, not by the university, which is unusual and useful: the figures are published nationally and they are the same across institutions. What differs between universities is the living cost of the city and the size of the city.",
        points: [
          "The registration fees, or droits d'inscription, are set by the Ministry of Higher Education each year and published by Campus France. International students are usually charged the higher rate unless they hold a specific status, and the reduced rate is the exception rather than the default.",
          "The deposit or first instalment at acceptance is a fraction of the annual fee. The remaining instalments are usually invoiced during the year, and the university publishes its own schedule of when they fall due.",
          "The student contribution, the CVEC, is a national annual amount collected by the university, and it is separate from tuition. It applies to students who are not exempt, and it changes each year.",
          "Beyond the university: the attestation fee, the health cover, the residence permit fee, housing, transport and food. Campus France publishes a budget guide for the city, and the published figure is an average of real students, which is exactly what you need for a first estimate.",
          "Also budget for the French cost structure: a security deposit for a room, a guarantor for some rentals, a CAF allocation you may be able to claim, and the first month, which is always bigger than an average month because it includes deposits.",
        ],
        callout: {
          tone: "watch",
          title: "The first month costs more than an average month",
          body: "Deposits, the first rent, the insurance, the residence permit, the transport pass and a partly stocked kitchen all land together. Budget the first month separately from the monthly average, or the first fortnight will be the point at which the money runs out.",
        },
      },
      decide: {
        body:
          "In France the decision to accept is less binding financially than it looks, because the deposit is small and the tuition comes later. The decision that matters more is usually the course and the city, and the time it takes to compare them properly.",
        points: [
          "Compare the living cost of the cities, not just the fees. Paris, Lyon, Bordeaux and Toulouse are not interchangeable, and the difference between them is larger than the difference between programmes.",
          "Check the language of instruction and of the examination, because it determines the certificate, the job market you enter and how long you can work in France afterwards on a student visa.",
          "Check whether the reduced rate or a scholarship is realistically available to you, and when the application closes. This can change the total by a very large amount, so it is worth more of your time than another programme comparison.",
          "Decide before the platform's deadline and do the fee application in the same week. The two deadlines are close, and the fee application is the one with no second chance.",
          "Keep the offer letter and every platform confirmation. The visa application is checked against them, and the offer is the document that shows the programme and the dates.",
        ],
        callout: {
          tone: "good",
          title: "Do the fee application in the week you accept",
          body: "The acceptance, the platform pre-enrolment and the reduced-fee or scholarship application all fall within a few weeks of each other. The reduced-fee application is the one with the largest financial consequence and the shortest window, so it is the one to do first.",
        },
      },
      checklist: {
        body:
          "The French order is: accept, pay the deposit, complete the platform steps, make the fee or scholarship application, get the attestation, enrol, then apply for the visa. The attestation and the fee application are the two that people leave too late.\n\nCampus France is the official body for French study and publishes the fee levels, the scholarship routes and the attestation rules. France-Visas is the consular authority. Between them they cover everything a French offer involves.",
        roadmap: [
          {
            label: "The week the offer arrives",
            title: "Read for the fee question",
            goal: "The acceptance deadline, the deposit, the platform steps and any separate fee or scholarship application, all identified.",
            hours: "3 hours",
            focus: [
              "Read the offer for the response deadline and the deposit amount, and put the deadline in your calendar.",
              "Search the offer and the programme page for the reduced rate, a tuition discount, a scholarship or an exemption, and note the deadline for each.",
              "Check whether the programme needs the Etudes en France attestation and what it depends on.",
              "Write to the admissions office asking two things: the tuition rate that will apply to you, and whether any fee or scholarship application is open to you.",
            ],
            checkpoint: "You know your tuition rate or you know who to ask, and every deadline is in the calendar.",
          },
          {
            label: "The acceptance and enrolment week",
            title: "Accept and complete the platform",
            goal: "The place confirmed and every platform step done.",
            hours: "3-4 hours",
            focus: [
              "Accept in the platform and pay the deposit, keeping the receipt and the confirmation of the payment.",
              "Complete the pre-enrolment steps: options, track, specialisation, anything the platform requires from you.",
              "Submit the reduced-fee or scholarship application if one applies, and check the receipt or reference you get for it.",
              "Save every confirmation. The platform record is what you will be asked to show at enrolment.",
            ],
            checkpoint: "Accepted, deposit paid, platform steps complete, fee application submitted if it applied.",
          },
          {
            label: "Before enrolment closes",
            title: "Settle the paperwork",
            goal: "An attestation if you need one, and the right fee on your account.",
            hours: "4-6 hours",
            focus: [
              "Request the Etudes en France attestation if it is required, and check its validity date against your visa application date.",
              "Confirm in writing what tuition rate is now on your student account, and query it if the platform has defaulted you to the higher rate.",
              "Get the official transcripts and the certified translations the university asked for, in the format it specified.",
              "Check the university's own enrolment calendar for the orientation or welcome week, because a course can require you to attend before teaching starts.",
            ],
            checkpoint: "The attestation is in hand, the fee on your account is the rate you expect, and the translations are done.",
          },
          {
            label: "Enrolment and the visa",
            title: "Enrol and prepare the visa file",
            goal: "Enrolled, with a complete visa application ready to file.",
            hours: "4-5 hours",
            focus: [
              "Complete the university's enrolment steps and get your student card and enrolment certificate, which the visa file will need.",
              "Assemble the visa documents: the attestation, the admission letter, the enrolment certificate, housing proof, financial evidence and the travel documents.",
              "Book the TLS appointment and check the current processing time, because France's visa appointments in the peak season fill.",
              "Check the visa validity covers your whole programme plus your arrival margin, before you file.",
            ],
            checkpoint: "Enrolled, the visa file assembled, and the appointment booked.",
          },
        ],
        resources: [
          {
            title: "Campus France",
            kind: "official",
            url: "https://www.campusfrance.org/en",
            why: "The official source for this milestone and the front door for everything French: the fee levels, the attestation, the scholarships, the accommodation and the arrival checklist. Start here and work outwards.",
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

  "sg-offer-accept": {
    archetype: "offer-enrolment",
    intro:
      "Accepting in Singapore is the start of the process rather than the end of it. You then have to matriculate online inside a published window, and for NTU's January 2027 intake that window ran 21 to 28 September 2026. Matriculation is what creates your university account, and your SOLAR details come from it.",
    sections: {
      offer: {
        body:
          "The Singapore admission outcome letter gives you a place, a date by which you must accept, and a separate window for matriculation. The two are different, and the second is the one that creates your student record.",
        points: [
          "Accept the offer formally through the official channel, inside the deadline on the outcome letter. The letter is the document, and the portal is where the acceptance is recorded.",
          "Online matriculation is a separate act with its own window. For NTU's January 2027 intake the window was 21 to 28 September 2026. Miss it and you have a place you are not enrolled in.",
          "Your university account arrives shortly after acceptance, and matriculation generates the student record that everything else depends on: the network account, the SOLAR number, the course registration, the housing application and the fees account.",
          "SOLAR is the Student Online Registration Application, and it is the number the immigration authority uses. It is generated by the university, not applied for, and it is what the Student Pass application is built on.",
          "For some programmes, especially in the National Institute of Education, the admission carries conditions as well. A research degree will usually involve a supervisor and a research proposal, and the outcome letter will say what is outstanding.",
        ],
        callout: {
          tone: "watch",
          title: "Accepting is not enrolling",
          body: "The thing that creates your student record is matriculation, and it happens in its own window, which for some intakes is only a week long and is often earlier in the calendar than students expect. Everything else, including the housing application and the Student Pass file, hangs off it.",
        },
      },
      conditions: {
        body:
          "Singapore conditions are short, mostly documentary, and one of them is heavier than it looks: degree verification for overseas graduates. That one is a separate application, it is a separate deadline, and it is not optional.",
        points: [
          "Degree verification for overseas graduates. NTU requires an official degree verification report, commissioned through one of the university's approved credential verification agencies. This is not a formality and it is not done by the university for you.",
          "The online verification of academic documents exercise, which all matriculated students at NTU are required to participate in within a stated window. It is a separate task from the degree verification report and it is easy to confuse the two.",
          "Outstanding academic results, which are usually verified directly with the issuing university, and which is the other common cause of a delayed enrolment.",
          "The medical examination, which for some programmes is a condition of admission rather than a visa formality, and which NTU's admissions handbook sets out with the approved physician requirements.",
          "English and other test results, if the programme asked for one with the application, in the electronic form the admissions office accepts.",
        ],
        callout: {
          tone: "good",
          title: "Start the degree verification the week you accept",
          body: "It is commissioned from a verification agency, it takes time, and it needs your original documents or certified copies. It is the single most common reason a Singapore student who has been admitted is still not enrolled when term starts, and it is entirely preventable by ordering it in the first week.",
        },
      },
      money: {
        body:
          "The fees in Singapore are set by the university and are usually payable in instalments across the programme. Two things catch people: the international tuition rate, which is higher than the citizen rate, and the timing of the first payment relative to matriculation.",
        points: [
          "Tuition fees are published by the university for international students and are charged per programme, usually in two instalments a year. The amount is on the programme's fee schedule and it is not negotiable, but it is payable in instalments rather than up front.",
          "A Tuition Grant exists for Singapore citizens and permanent residents, and it is a subsidy to the university rather than money paid to you. International students are not eligible for it, so the published international fee is the fee.",
          "The admissions deposit or acceptance fee is usually small and is credited against the first instalment. It is a commitment device rather than a large payment.",
          "The extra costs that are easy to miss: the pre-admission medical examination, degree verification, a course-specific fee for some programmes, hall fees if you get a place in residence, and the living costs of the first month before your first instalment is due.",
        ],
        callout: {
          tone: "watch",
          title: "Budget the gap between matriculation and the first instalment",
          body: "Between the moment you matriculate and the moment your first tuition instalment falls due, there is a period in which you are a full-time student in a country with a high cost of living, and the money has to come from somewhere. Work out the amount and the date now, because the university invoice does not care about your bank balance.",
        },
      },
      decide: {
        body:
          "Singapore has few intakes and a small number of places, so an offer is genuinely scarce, and the decision is usually made in days rather than weeks. The comparison work has to happen before the offers land, not after.",
        points: [
          "Compare the total programme cost: tuition, the non-tuition fee where it applies, the compulsory items, and the cost of living in Singapore. Singapore's living costs are high and the numbers are published by the university in its cost-of-living guidance.",
          "Check the difference between a coursework and a research degree carefully, because it changes the funding, the duration, the work options and the type of job you can apply for afterwards. A research degree is not a cheaper version of the same thing.",
          "Check the deadline for the Student Pass and work backwards from it. The pass has to be applied for roughly a month before the course starts, which constrains your travel date from both ends.",
          "If you are considering more than one Singapore university, note that the matriculation windows and the fee schedules differ, and that the Student Pass application is made against one institution at a time.",
          "Accept promptly and completely. There is no advantage in holding a place you have decided against, and in a system with this few intakes, a place released is rarely returned.",
        ],
        callout: {
          tone: "good",
          title: "Read the matriculation window before you accept",
          body: "It is on the outcome letter, and it is the real commitment date rather than the acceptance date. A student who accepts comfortably and then discovers the matriculation window closed during their own travel arrangements has accepted a place they are not in.",
        },
      },
      checklist: {
        body:
          "The Singapore order is: accept, matriculate, activate the account, verify the degree, complete the medical, then apply for the Student Pass. The degree verification and the medical are the two that take longest and are ordered before the ones that feel urgent.\n\nSingapore's universities publish their own procedures in their own admissions guides, and the immigration authority publishes the Student Pass side. The university guides are the ones that contain the dates.",
        roadmap: [
          {
            label: "The day the outcome letter arrives",
            title: "Extract the two dates",
            goal: "The acceptance deadline and the matriculation window, both in the calendar.",
            hours: "1-2 hours",
            focus: [
              "Record the acceptance deadline from the outcome letter, with an alert a week before it.",
              "Record the matriculation window, and put the first day of it in the calendar as the real target.",
              "List the conditions on the letter, and note which of them are yours and which are the university's.",
              "Check whether the programme requires the pre-admission medical examination and what the deadline is.",
            ],
            checkpoint: "Both dates in the calendar, and every condition on the list with an owner.",
          },
          {
            label: "The acceptance week",
            title: "Accept and order the long-lead work",
            goal: "The place accepted, and the slowest documents already moving.",
            hours: "3-4 hours",
            focus: [
              "Accept the offer through the official channel and keep the confirmation.",
              "Commission the degree verification report through one of the university's approved agencies, and send them whatever they need, which is usually your original or certified documents.",
              "Book the pre-admission medical examination if it is required, and do it at home if you can, because the queues at approved physicians in Singapore are much longer.",
              "Note the deadlines for the academic verification exercise and the outstanding results.",
            ],
            checkpoint: "Accepted, degree verification ordered, medical booked.",
          },
          {
            label: "The matriculation window",
            title: "Matriculate and activate",
            goal: "A student record, a working account, and your SOLAR number.",
            hours: "2-3 hours, inside the published window",
            focus: [
              "Complete the online matriculation as soon as the window opens. It takes less time than you expect and it is the gate for everything else.",
              "Activate your university email account, which arrives shortly after acceptance, and set up multi-factor authentication before anything asks you for it.",
              "Check the SOLAR acknowledgement and record the number. It is what the Student Pass application is built on.",
              "Check your course registration is visible and correct, and raise anything wrong now rather than in week one.",
            ],
            checkpoint: "Matriculated, the account active, the SOLAR number in your records.",
          },
          {
            label: "The fortnight after matriculation",
            title: "Clear the remaining conditions",
            goal: "Nothing outstanding before the Student Pass file is assembled.",
            hours: "4-6 hours",
            focus: [
              "Complete the online verification of academic documents exercise within the stated window. It is separate from the degree verification report and it is not optional.",
              "Upload the degree verification report when it arrives, and check the status in your portal rather than assuming it has landed.",
              "Upload the medical examination report in the required format, with an official English translation if the report is not in English.",
              "Apply for housing if you have not already, and assemble the Student Pass file: the admission letter, the SOLAR acknowledgement, the degree certificates and the medical report.",
            ],
            checkpoint: "Every condition cleared and uploaded, and the Student Pass file assembled and ready to submit.",
          },
        ],
        resources: [
          {
            title: "NTU NIE: admission procedures for successful graduate applicants",
            kind: "official",
            url: "https://www.ntu.edu.sg/nie/admissions/graduate-education/admission-procedures-for-successful-graduate-applicants/research-programmes-(january-2027-intake)",
            why: "The official source for this milestone and the most specific document in this list: the acceptance and e-matriculation window for a named intake, the account activation order and the SOLAR acknowledgement. It shows exactly how the sequence works.",
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

  "sg-degree-verification": {
    archetype: "offer-enrolment",
    intro:
      "Degree verification is mandatory, it is a separate application with a separate deadline, and it is not done for you. NTU requires an official degree verification report from overseas graduates, and it requires all matriculated students to take part in an online verification of academic documents exercise. Withholding information can result in refusal of admission.",
    sections: {
      offer: {
        body:
          "This checkpoint is not really about the offer any more. It is the last administrative gate before your records are complete, and it exists because universities have to be able to confirm that the qualifications behind an admission offer are real. Two separate things are required, and students routinely assume that one of them covers the other.",
        points: [
          "The degree verification report is an official report about your degree, produced by a credential verification agency and uploaded in the required format. For overseas graduates at NTU this is mandatory.",
          "The online verification of academic documents exercise is a separate task that all matriculated students take part in, in a stated window. It is not the same thing as the report, and doing one does not discharge the other.",
          "The report is commissioned by you, from one of the university's approved agencies. The university lists the approved agencies, and a report from an agency that is not on the list will not be accepted.",
          "The exercise is the university's own check on the documents you submitted. It exists so that the university can ask you about the contents of your own application in a structured way, and it is the point at which a discrepancy is easiest to resolve.",
          "Both of these sit after the offer, which is why they get squeezed. They are also the point at which a student who has misrepresented something finds out, which is better than finding out at graduation.",
        ],
        callout: {
          tone: "watch",
          title: "Two requirements, one name",
          body: "Students hear 'verification' and tick the box once. The degree verification report and the online verification of academic documents exercise are separate obligations with separate windows. Missing the exercise costs you your enrolment; missing the report costs you your qualification being confirmed.",
        },
      },
      conditions: {
        body:
          "The conditions attached to verification are documentary, and the failure mode is almost always administrative rather than substantive: a report in the wrong format, a translation that is not acceptable, a document that was never uploaded, or a deadline that was read as the general application deadline.",
        points: [
          "Commission the report from an approved agency, and use the agency's own instructions. The agencies know which documents the university needs and in what form, and they are the fastest route if you are unsure.",
          "Get official transcripts sent directly by the issuing institution where the agency asks for it. A scan you upload is often not what they need, and a sealed original is not something you can produce at the last minute if it is sitting in a drawer at home.",
          "Get translations done by a certified translator if your documents are not in English, and check whether the agency requires a particular certification and a particular format.",
          "Keep a copy of everything you send to the agency, and the agency's confirmation of receipt, because the confirmation is what you will need if the university says the report has not arrived.",
          "Do the online exercise on your own documents, and have the originals open while you do it. The exercise asks about specific documents, and being able to answer precisely is what makes it quick.",
        ],
        callout: {
          tone: "good",
          title: "Order the report before you think you need it",
          body: "The report is the long pole. It needs an agency, a fee, your documents and a turnaround, and it can be commissioned the day you accept. Ordering it early costs nothing, and it converts a hard deadline into a formality.",
        },
      },
      money: {
        body:
          "Verification is a cost people forget, and it is small. It is also the kind of small cost that becomes a problem at a specific moment: when the report is due and the fee has not been budgeted.",
        points: [
          "The credential verification agency charges a fee, and the amount depends on the agency, the number of documents and how fast you need it. There is usually an expedited option at a higher price.",
          "Most universities do not cover the verification fee, and the international student budget is rarely built to include it. It belongs in the pre-departure budget alongside the medical examination and the flights.",
          "There are usually additional costs for translation, for certified copies and for couriered original documents, and these add up if your university is in another country from your university.",
          "The cost of getting it wrong is larger than the fee. A rejected verification can mean a delay of weeks, and in the worst case a refusal of admission and a lost year.",
        ],
        callout: {
          tone: "watch",
          title: "Budget the small things in the big plan",
          body: "Verification fees, medical examination fees, certified translations, courier costs and degree verification all sit in the same category: small, unbudgeted, and on a deadline. Add them to the pre-departure budget as a line called 'document processing' and stop thinking about them.",
        },
      },
      decide: {
        body:
          "There is not much to decide here, which is a relief. The decisions are about method and timing, and the one decision that really matters is how much you disclose if something does not match.",
        points: [
          "Home or away. If the verification agency operates in your country, doing it at home is usually faster and cheaper. If it does not, use the approved agency the university lists and let them handle the local requirements.",
          "Speed versus cost. The agencies usually offer a standard and an expedited service, and the deadline is what should decide. Expedited is worth it when the report is the last thing standing between you and a confirmed enrolment.",
          "One agency or several. The university lists approved agencies. Some universities will accept a report from more than one of them, and if you have a deadline, having two agencies working in parallel is a legitimate way to de-risk it.",
          "If something does not match, say so. Withholding information can result in refusal of admission, and a discrepancy explained early is usually a paperwork problem. A discrepancy discovered later is a trust problem, and it is much harder to recover from.",
        ],
        callout: {
          tone: "good",
          title: "Ask the admissions office the exact format",
          body: "One email: what format does the report need to be in, which agencies do you accept, and is there a deadline for the online exercise. The answers are short, they are written down, and they are the difference between a report that is accepted and one that is rejected on a technicality.",
        },
      },
      checklist: {
        body:
          "Verification is a small sequence with hard edges. It is easiest done in the first weeks after the offer, when you are still at home and the originals are in your hands.\n\nThe university's own verification page is the document that tells you what to commission and how to upload it. The admissions guides around it give the intake-specific deadlines.",
        roadmap: [
          {
            label: "The week you accept",
            title: "Order the report",
            goal: "The verification under way before anyone asks for it.",
            hours: "3-4 hours",
            focus: [
              "Find the university's approved agency list and read what the agency requires before you pay anything.",
              "Commission the report, choosing the service level that fits the deadline you have been given.",
              "Send the agency your documents in the form they asked for, and keep their confirmation of what they have received.",
              "Note the date you are expected to upload the report by, separately from the online exercise deadline.",
            ],
            checkpoint: "The report is commissioned and the agency has your documents.",
          },
          {
            label: "While the report is being produced",
            title: "Get the exercise done",
            goal: "The online verification of academic documents exercise completed, in its window.",
            hours: "2-3 hours",
            focus: [
              "Do the exercise with your original documents open, so every answer is accurate and specific.",
              "Have your transcripts, degree certificates and any name-change documentation to hand.",
              "If a document is missing or the name on it does not match, ask the admissions office before you finish rather than guessing at an answer.",
              "Save the completion confirmation. It is the evidence that the condition was met.",
            ],
            checkpoint: "The exercise is done and the confirmation is saved.",
          },
          {
            label: "When the report arrives",
            title: "Check it and upload it",
            goal: "A report that matches the university's requirements and is on file.",
            hours: "1-2 hours",
            focus: [
              "Check the report names the qualification, the awarding institution, the date and the mode of study, and that the personal details match your application exactly.",
              "Check the format is the one the university asked for, and that any required translation is included.",
              "Upload it in the portal, and confirm the status changes to received rather than assuming the upload worked.",
              "If a detail is wrong, ask the agency to correct it and tell the admissions office in the same message, rather than hoping it passes.",
            ],
            checkpoint: "The report is uploaded, the status is confirmed, and the condition is met.",
          },
          {
            label: "Before you travel",
            title: "Close the loop",
            goal: "Nothing outstanding on your academic file.",
            hours: "1 hour",
            focus: [
              "Check every condition on your admission, not only the verification ones, and list what is still open.",
              "Save a complete copy of your academic file: transcripts, certificates, the report, the exercise confirmation and the admission letter.",
              "Send yourself the set of scanned documents, because the same files will be needed for the Student Pass and for anything else you apply for in your first year.",
            ],
            checkpoint: "A complete, organised academic file and nothing outstanding on your admission conditions.",
          },
        ],
        resources: [
          {
            title: "NTU: verification for academic documents",
            kind: "official",
            url: "https://www.ntu.edu.sg/admissions/graduate/gfreshmenguide/incoming-graduate-student-guide/verification-for-academic-documents",
            why: "The official source for this milestone, and the page that states both requirements: the degree verification report for overseas graduates and the online verification of academic documents exercise, with the approved agencies and the upload route.",
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

import type { GuideContent } from "../types";

const V = "2026-10-20";

/**
 * The UK student visa dossier.
 *
 * The UK route is the most linear of the three, and the linearity is a trap in
 * itself. There is a fixed order: ATAS clearance, then the CAS, then the
 * money, then the fees, then the application and biometrics, then the
 * decision. Each step has a published rule attached to it, and the two that
 * bite hardest are both about validity rather than paperwork:
 *
 *   1. THE CAS EXPIRES. It is valid for six months from the date it is issued,
 *      and it cannot be reused. A CAS you got too early is a CAS you have to
 *      pay for twice.
 *   2. THE MONEY MUST BE OLD ENOUGH. You have to have held it for 28
 *      consecutive days, and the last day of that period has to fall within 31
 *      days of the date you apply. A large deposit days before you apply is
 *      worse than no deposit, because it looks like the wrong thing.
 */
export const VISA_GB: Record<string, GuideContent> = {
  "gb-atas": {
    archetype: "visa",
    intro:
      "ATAS clearance is a security check on the subject matter of your course, run by the Foreign, Commonwealth & Development Office. For computer science, data and several related subjects at master's level it is a hard precondition to the visa, and for some universities it comes before the CAS rather than after.",
    sections: {
      route: {
        body:
          "You need an ATAS certificate if your course has a Common Aggregate Hierarchy code (a CAH3 code) that is in scope and you are not a national or citizen of an exempt country. Your university will tell you the CAH3 code, usually on the offer letter or in a separate note, and it is that code, not the course title, that decides.",
        points: [
          "The test is the CAH3 code, not the subject you describe. A course called 'Data Science' may be in scope and a course called 'Computing' may not be, and only the code settles it.",
          "Your university or research institution provides the CAH3 code. If your offer letter does not carry one, ask your international office directly.",
          "You do not need ATAS if you are studying for a postgraduate diploma or a PGCE, whatever the subject.",
          "There is a long list of exempt nationalities, including the United States, Canada, Australia, Singapore, India is not on it, and a range of European countries. If you hold one of those passports you do not need a certificate. If you are a dual national with one exempt passport, you do not need one, provided you can show a valid passport from that country and a valid UK visa linked to it.",
          "Some visas need the certificate at the point of application, and some need it only before you start the programme. A Student visa is on the first list: if ATAS applies to you, you must have the certificate before you apply for the visa.",
        ],
        callout: {
          tone: "watch",
          title: "Check the code, not the course name",
          body: "Students assume ATAS applies because their subject sounds technical, or assume it does not because the course title sounds general. Neither assumption survives contact with the CAH3 code, which is the only thing the FCDO looks at. Get the code from your university in writing, check it against the published list, and then check your nationality against the exempt list.",
        },
      },
      documents: {
        body:
          "The ATAS application is a long online form, and the FCDO publishes exactly what it must contain. It is free, which means the whole burden is on getting the content right rather than on paying for it.",
        points: [
          "The relevant CAH3 code, provided by your higher education institution or research institution.",
          "Your full name, date of birth and the address where you currently live, and your passport details for the passport you will use for the visa application.",
          "Details of your previous studies, and of your current and previous employment. If you have never been employed, the guidance says to write 'not applicable / never employed' and explain any gaps in the open text boxes.",
          "Details of any published papers, if you have them.",
          "Contact details for two referees you have ideally known for over three years. One should be from your home country and the other an academic referee. If you have no home-country referee, say so in the open text and give an alternative.",
          "How you will be financially sponsored while you are in the UK. If you are waiting on a funding decision, say so rather than leaving it blank.",
          "A personal statement, plus the full name of your institution and course, your primary supervisor's name, and a list of the elective or optional modules on your course.",
        ],
        subsections: [
          {
            title: "The student-specific questions",
            what: "The part of the form that only applies to you, and the part students most often answer thinly.",
            format: "Short free-text answers inside the online form, checked against academic and official records.",
            score: "There is no score. The team checks your answers against academic and official records and reviews any previous ATAS applications.",
            topics: [
              "The nature and scope of your main research project and the core modules, for research degrees and PhDs. If you do not yet have a project assigned, use your institution's description and the list of potential topics.",
              "For taught courses, list every elective and optional module available to you. If there are none, list the core modules instead.",
              "Your course modules and research proposal should fully reflect what your institution has agreed with you.",
              "Your future ambitions, and why you want to study in this area.",
            ],
            tip: "The guidance says that if they cannot confirm your information, or there are unexplained inconsistencies, they will treat it as false information and refuse. Write it so it can be confirmed.",
          },
          {
            title: "After you submit",
            what: "What happens next, and what you should have done before you pressed submit.",
            format: "The outcome is emailed to you, and the institution involved is told as well.",
            score: "One of three outcomes: granted, refused, or requires changes. A granted application produces a certificate by email.",
            topics: [
              "Once submitted, you can change only your email address, your phone number and your marital status. Everything else is locked in.",
              "Check your spam and junk folders for the decision email. It is a plain email and it gets filtered.",
              "When the certificate arrives, check every detail against your offer and your agreed research area. If something is wrong, email the ATAS team.",
              "Upload the certificate as part of your visa application documents.",
            ],
            tip: "Read the whole form before you submit rather than after. The FCDO checks the content against university records, so a course title you wrote from memory that does not match the register is the kind of inconsistency that gets treated as false information.",
          },
        ],
        callout: {
          tone: "watch",
          title: "Refusal costs you ninety days, not a retry",
          body: "If your application is refused, you must wait 90 days before you can reapply for the same course and research at the same institution with the same CAH3 code. You can apply again straight away for a different course or research area at the same institution, or for a different institution. Given that the standard processing time is already six weeks, a refusal is a quarter of a year.",
        },
      },
      appointments: {
        body:
          "There is no appointment in this process, and that is unusual enough to be worth saying plainly. ATAS is an online application reviewed by a team, and the certificate arrives by email. What you are waiting on is the decision, and what you have to do with it is make sure it lands inside its six-month window.",
        points: [
          "You do not book anything for ATAS. You create an account on the ATAS service, fill in the form, and wait for the decision by email.",
          "The certificate is emailed to you and the institution is notified. Your university will also be checking it, because it must be approved before you start the course.",
          "The team works Monday to Friday, 9am to 5pm, and aims to answer email within five working days, which can take longer in busy periods.",
          "The application is checked against academic and official records, and any previous ATAS application you made is reviewed as well. If you have applied before, that history is part of the assessment.",
        ],
        callout: {
          tone: "good",
          title: "There is nothing to book, so put the time into the form",
          body: "Because there is no appointment, the waiting is entirely inside the review. That means the only thing you control is the quality of what you submit. Get the CAH3 code in writing, draft the module list and the personal statement before you open the form, and do not fill it in in one panicked sitting.",
        },
      },
      money: {
        body:
          "The ATAS application itself is free. The FCDO is explicit that you do not need to pay for it, which removes the usual financial obstacle and concentrates the risk somewhere less obvious: time.",
        points: [
          "The ATAS application costs nothing. There is no fee to pay and no premium service to buy.",
          "There is no fast track. The guidance says so directly, so paying an agent for priority does not exist as a route.",
          "The real cost is the six weeks of processing, and the ninety days you lose if an application is refused.",
          "The bigger financial consequence sits elsewhere. Some universities will not issue your CAS, and will not let you start, until the ATAS certificate is in place, so a delay here pushes back the whole visa timetable and can put your deposit at risk.",
        ],
        callout: {
          tone: "watch",
          title: "Free does not mean free",
          body: "There is no ATAS fee, so there is no financial signal that you have been admitted to the queue. What there is instead is a six-week wait with no way to pay for speed, sitting in front of the certificate that your university and your visa application both need. Apply the day you have your CAH3 code.",
        },
      },
      rules: {
        body:
          "The ATAS rules are unusually specific, and several of them are the kind that cost a whole term if you trip over them.",
        points: [
          "You must obtain the certificate before you apply for a Student visa if ATAS applies to you. It is checked as part of the visa application.",
          "Your ATAS certificate is valid for six months for use as part of a visa application, counted from its date of issue. Once you are in the UK on a valid visa, the certificate is valid for the duration of your course.",
          "You must not start the course or the research programme until the certificate has been approved.",
          "The application is free and there is no fast track service.",
          "ATAS takes at least 30 working days, which the guidance calls six weeks, and complex applications take longer. More people apply between April and August, so processing takes longer in that period.",
          "The system does not accept duplicate applications. A second application with the same date of birth, passport number, CAH3 code and institution details will be rejected.",
          "You must give accurate, complete and truthful information. The guidance states that false, misleading or incomplete information means refusal.",
          "You need a new certificate if your course content changes, if your primary supervisor changes, or if your course end date is delayed by three months or more.",
          "GOV.UK currently carries a technical notice advising applicants not to use a Gmail address for an ATAS application, and to use an alternative address instead. It is on the page now, so it is worth checking before you register.",
        ],
        callout: {
          tone: "watch",
          title: "Six months, and then it is gone",
          body: "The certificate is valid for six months from issue for use in a visa application. Get it too early and it can expire before your visa application is filed. Get it too late and you have not met the precondition. The window is generous, but it is a window, and it runs from the date on the certificate.",
        },
      },
      timing: {
        body:
          "Six weeks of processing, with no way to pay for speed and a longer queue between April and August. The plan below assumes you apply the moment you have your CAH3 code and your course details.",
        roadmap: [
          {
            label: "Week 1",
            title: "Get the code and the exemptions checked",
            goal: "Know whether you need a certificate at all, and for which code.",
            hours: "2-3 hours",
            focus: [
              "Ask your university for the CAH3 code for your course, in writing, and for the full name of the course as it appears on their records.",
              "Check your nationality against the published exempt list. If you hold one of those passports, keep it and the linked UK visa ready, because your institution may check.",
              "Confirm with your university whether they want the ATAS certificate before they issue your CAS, or only before you enrol.",
            ],
            checkpoint: "You have the CAH3 code, your course name and a yes or no on whether you need a certificate.",
          },
          {
            label: "Week 2",
            title: "Draft before you open the form",
            goal: "A complete, consistent application ready to submit in one sitting.",
            hours: "4-6 hours",
            focus: [
              "Write the personal statement first, in a document you can paste from. It is the part that is hardest to change once you are inside the form.",
              "List the course modules or the research scope, and check them against your institution's own description of the programme.",
              "Line up your two referees and collect their full names and contact details. One from your home country, one academic, ideally known for more than three years.",
              "Prepare your employment and education history, including any gaps you need to explain.",
            ],
            checkpoint: "The module list, the personal statement and both referees are settled in a document outside the form.",
          },
          {
            label: "Weeks 3-8",
            title: "Wait",
            goal: "A certificate in your inbox before your visa application date.",
            hours: "1 hour a week",
            focus: [
              "Submit, then check your spam and junk folders daily for the first week. The decision is a plain email and it gets filtered.",
              "Use the waiting time on the next step, not on refreshing the portal. Your CAS request and your financial evidence both take longer than ATAS.",
              "If the outcome is 'requires changes', fix it immediately. That is not a refusal and it is still six weeks from the fixed version.",
            ],
            checkpoint: "The certificate has arrived and you have checked every detail on it against your offer.",
          },
          {
            label: "Before you apply for the visa",
            title: "Upload and check the dates",
            goal: "The certificate is in your application and still inside its six-month window.",
            hours: "30 minutes",
            focus: [
              "Upload the certificate into your visa application where it is asked for.",
              "Check the issue date against your planned visa application date. If the gap is close to six months, move the application date rather than the certificate.",
              "Send a copy to your university, because they check it before you are allowed to start.",
            ],
            checkpoint: "The certificate is uploaded, in date, and your university has a copy.",
          },
        ],
      },
      resources: {
        body:
          "The FCDO publishes the entire scheme on one page, and the ATAS service itself is the only place to apply. Neither charges anything.",
        resources: [
          {
            title: "Academic Technology Approval Scheme (ATAS) guidance",
            kind: "official",
            url: "https://www.gov.uk/guidance/academic-technology-approval-scheme",
            why: "The official source for this milestone: who is exempt, what your application must contain, the six-week processing time, the six-month certificate validity, and the rules on what happens after a refusal.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ATAS: apply for a certificate",
            kind: "official",
            url: "https://www.academic-technology-approval.service.gov.uk/",
            why: "The only place the application is made and the only place the certificate is issued. Free, and it is also where you check whether your course needs one.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ATAS occupation codes",
            kind: "official",
            url: "https://www.gov.uk/government/publications/academic-technology-approval-scheme-atas-occupation-codes/academic-technology-approval-scheme-atas-occupation-codes",
            why: "The published code lists behind the scheme. Useful when you are arguing with your university about whether a course is in scope.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: Student visa",
            kind: "official",
            url: "https://www.gov.uk/student-visa",
            why: "The Home Office's own route, which states that a masters student may need an ATAS certificate and links to the scheme. Useful for checking the order of the steps around it.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: documents you will need to apply",
            kind: "official",
            url: "https://www.gov.uk/student-visa/documents-you-must-provide",
            why: "Confirms that a valid ATAS certificate is one of the documents you may have to provide, alongside your passport and your CAS.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official UK government pages for this checkpoint and the scheme itself, and because they are free and complete. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "gb-cas": {
    archetype: "visa",
    intro:
      "The Confirmation of Acceptance for Studies is the electronic document your visa application depends on. It is issued by your university, not by the Home Office, it is valid for six months, and it cannot be reused. Everything else in the UK route queues up behind it.",
    sections: {
      route: {
        body:
          "The CAS is the sponsor's half of the deal. A licensed student sponsor confirms to the Home Office that it has admitted you, that your course meets the rules, and how much the first year will cost. Your offer becomes a CAS only when every condition on it has been met and the money has been paid.",
        points: [
          "You get a CAS from a licensed student sponsor. The university has to hold a sponsor licence to issue one, and the licence is what makes the CAS meaningful to UK Visas and Immigration.",
          "The CAS is electronic. You do not get a stamp or a sticker, and there is nothing to post. It arrives as a reference and a statement of purpose, and the details on it are what your application must match.",
          "A CAS is issued against an unconditional offer. If a condition is still open when you want the CAS, that condition is the thing most likely to delay your visa.",
          "The CAS states the course title, the course dates and the fee for one academic year of up to nine months. The Home Office uses that fee as part of your financial requirement.",
        ],
        callout: {
          tone: "watch",
          title: "A CAS is not a visa, and it is not an offer",
          body: "Students treat the CAS as the moment the hard part is over, because it feels final and it arrives late in the process. It is neither. It is an input to a visa application, it expires, and it cannot be used twice. The visa decision is still ahead of you, and it is the only thing that lets you travel.",
        },
      },
      documents: {
        body:
          "You are checking the CAS rather than producing it, and the checking matters more than it sounds. The Home Office reads the CAS, and any mismatch with your application is a reason for the file to go back.",
        points: [
          "The CAS reference, which goes into your online application exactly as it appears.",
          "The statement of purpose, which names your sponsor, the course title, the course start and end dates, and the fee for one academic year.",
          "Your own records to check it against: your passport, your offer letter and your acceptance of the deposit.",
        ],
        subsections: [
          {
            title: "What to check, line by line",
            what: "The fields on a CAS that regularly disagree with the rest of your file.",
            format: "A short reference and a statement of purpose.",
            score: "There is no score. The CAS is matched against your application and against the sponsor's own records.",
            topics: [
              "The course title. It should match your offer letter and your offer letter should match the programme you applied to. Spelling differences in programme names are more common than they should be, and a mismatch here is a query rather than a formality.",
              "The course start and end dates. These set your visa's permitted dates and your window to arrive.",
              "The fee for one academic year of up to nine months. This is the figure that goes into your financial requirement, so an error here directly affects your money evidence.",
              "Your own name as the sponsor has it, spelled the way the university holds it. It must match your passport.",
            ],
            tip: "Read the CAS on the day it arrives and compare it against your passport and offer immediately. A correction requested on day one is a week; a correction requested the week you apply is a refusal risk.",
          },
          {
            title: "Requesting it in the first place",
            what: "What has to be true before your university will issue one.",
            format: "A request through the university's international office, against an unconditional offer and a paid deposit.",
            score: "Universities publish their own service levels. Bristol, for example, states that it issues a CAS within 5 to 10 working days of an approved request, and others publish their own figures.",
            topics: [
              "Every condition on your offer must be met. That includes results that have not been released yet.",
              "The deposit or the tuition, in the amount the university requires, must be paid.",
              "Some universities require the ATAS certificate first, for courses where ATAS applies.",
              "Ask in writing what the university still needs, and what its current CAS turnaround is. That number belongs in your schedule.",
            ],
            tip: "Request the CAS only once you are sure the conditions are cleared. A CAS issued against an offer with an open condition is a CAS that gets withdrawn, and a new one has to be paid for.",
          },
        ],
        callout: {
          tone: "watch",
          title: "Six months, and it cannot be used twice",
          body: "A CAS is valid for six months from the date it is issued, and it cannot be reused. If your visa application is refused, or withdrawn, or simply filed too late, the CAS is spent and you have to pay for another one. This is why the date on the CAS, not the date you received it, should set your filing deadline.",
        },
      },
      appointments: {
        body:
          "There is no appointment and no biometrics at this stage. The CAS is issued by a team, and the appointment that matters is the one you make with your university's international office, because it is the request that starts their process.",
        points: [
          "You request the CAS through the university's international office, usually through a student portal rather than by email.",
          "Ask for the turnaround time in writing when you request it. Universities publish it, and it is often quoted as 5 to 10 working days for an approved request, but your school's own figure is the one that applies.",
          "The moment your CAS arrives, the clock you are planning against becomes concrete: six months of validity, and a visa application that needs to be filed inside it.",
          "Some universities run a pre-application or document check appointment before they will file. If yours does, book it early, because it sits in front of the filing date.",
        ],
        callout: {
          tone: "good",
          title: "Get the CAS, then get the dates written down",
          body: "The six-month clock starts on the issue date, so the moment the CAS arrives, write down three dates: the CAS issue date, the date you will apply for the visa, and the date the CAS expires. Plan to apply well inside that window, not near the end of it.",
        },
      },
      money: {
        body:
          "The number on the CAS is a figure set by your university, not by the Home Office, and it is the largest single component of what you will have to prove. This is the point where the money requirement becomes concrete.",
        points: [
          "The CAS states the fee for one academic year of up to nine months. That is the course fee element of the financial requirement, and GOV.UK says the amount you need to pay will be on the CAS.",
          "The tuition figure is set by the institution, so it varies between programmes and between institutions for the same subject. A university with a higher living-cost estimate will also ask you for more in the second element of the requirement.",
          "Most universities require a deposit, or a first instalment, before they will issue a CAS at all. That money is part of your course fee, and it is counted.",
          "Keep the receipt for every payment you make to the university. The Home Office may ask for it.",
        ],
        callout: {
          tone: "watch",
          title: "The CAS figure is not a total",
          body: "The fee on the CAS covers your course for one academic year. It does not cover your living costs, which are a separate published amount you must show in addition, and it does not cover dependants. Students who treat the CAS number as the whole requirement discover the gap when the application is returned.",
        },
      },
      rules: {
        body:
          "The CAS has a short rule list, and every item on it is enforced by a date rather than by a form.",
        points: [
          "A CAS is only issued against an unconditional offer. Conditions outstanding at the point you want it are the most common reason for delay.",
          "You must apply for the Student visa within six months of the date the CAS is issued. After that the CAS is invalid and must be replaced.",
          "A CAS cannot be reused. If your application is refused or withdrawn, a new one has to be issued and paid for.",
          "The details on the CAS must match your visa application. A course title or date that differs from your offer or your application is a query.",
          "You must not travel to the UK before the start date given on your visa, whatever the course start date is. Arriving early is a different question from arriving before your visa permits.",
          "If your course details change after the CAS is issued, the university may need to reissue it, and a new CAS is a new cost.",
        ],
        callout: {
          tone: "watch",
          title: "The CAS can be withdrawn",
          body: "The CAS is not a permanent record of your place. It can be withdrawn if the conditions behind it are no longer met, if the course or the dates change, or if the university decides the enrolment has lapsed. If your circumstances change, tell your university rather than letting it go quiet, because a withdrawn CAS cannot be used and cannot be reused.",
        },
      },
      timing: {
        body:
          "The CAS is the hinge of the UK timeline. Everything before it is academic, everything after it is immigration, and the six-month validity means a CAS issued too early is a liability.",
        roadmap: [
          {
            label: "Week 1",
            title: "Clear the conditions",
            goal: "An unconditional offer and a paid deposit.",
            hours: "3-5 hours",
            focus: [
              "Read the condition list on your offer line by line and list every outstanding item.",
              "Submit proof of any outstanding result the moment it is released, not at the deadline.",
              "Pay the deposit or the first tuition instalment your university requires, and keep the receipt.",
              "Tell admissions immediately, in writing, if an award decision will be late. The visa timetable depends on it and nobody else will tell them.",
            ],
            checkpoint: "You have confirmed, in writing, that all conditions are met and the deposit is paid.",
          },
          {
            label: "Week 2",
            title: "Request the CAS",
            goal: "A request in the queue, with a known turnaround.",
            hours: "1 hour",
            focus: [
              "Request the CAS through the international office, confirming that conditions are met and payment has been made.",
              "Ask for the current turnaround in working days and write it down.",
              "Ask whether they need an ATAS certificate before issuing, and whether they run a document check before you can file the visa application.",
            ],
            checkpoint: "The request is submitted and you have a written turnaround estimate.",
          },
          {
            label: "Weeks 3-6",
            title: "Verify it the day it lands",
            goal: "A correct CAS, checked against everything else you hold.",
            hours: "1 hour",
            focus: [
              "Compare the CAS course title, dates and fee against your offer letter and your passport.",
              "Check your name character by character against your passport.",
              "Write down the issue date and the six-month expiry date, and set your visa application deadline well inside it.",
              "If anything is wrong, ask for a correction immediately. It is far easier to fix now than after you have filed.",
            ],
            checkpoint: "The CAS is verified and dated, and your filing deadline is written down.",
          },
          {
            label: "The rest of the runway",
            title: "Use the window for the money and the ATAS",
            goal: "The two slow steps done before the CAS clock gets tight.",
            hours: "4-6 hours",
            focus: [
              "Build your 28-day holding period so that the last day of it falls within 31 days of your intended application date.",
              "Gather the ATAS certificate if it applies, and remember it has to be in hand before you apply.",
              "Check the English requirement for the visa, which is separate from the university's requirement and has its own validity window.",
            ],
            checkpoint: "Money is aged, ATAS is done, and your application date is fixed with margin.",
          },
        ],
      },
      resources: {
        body:
          "The Home Office publishes the rules the CAS has to satisfy, and universities publish their own CAS service pages. Between them they tell you everything about the form, the fee and the six months.",
        resources: [
          {
            title: "University of Bristol: the CAS",
            kind: "official",
            url: "https://www.bristol.ac.uk/directory/visas/student-visa/cas/",
            why: "The official source for this milestone: a real university's guide to requesting, receiving and checking a CAS, including the published turnaround for issuing one.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: Student visa",
            kind: "official",
            url: "https://www.gov.uk/student-visa",
            why: "The Home Office's own route, which sets out the order of the steps and what a Student visa application requires.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: money you need",
            kind: "official",
            url: "https://www.gov.uk/student-visa/money",
            why: "Explains how the fee on your CAS becomes part of the financial requirement, alongside the published monthly maintenance amounts and the 28-day rule.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: check which visas you are eligible for",
            kind: "official",
            url: "https://www.gov.uk/check-uk-visa",
            why: "The official eligibility checker, which confirms the route and the documents for a Student visa application before you commit to filing.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: documents you will need to apply",
            kind: "official",
            url: "https://www.gov.uk/student-visa/documents-you-must-provide",
            why: "The list the Home Office expects, with your CAS named as one of the two documents you must provide rather than one you may provide.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official Home Office pages and a real sponsor's own CAS guidance, which is what your university will be working from. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "gb-money": {
    archetype: "visa",
    intro:
      "The UK financial requirement is two numbers and one timing rule, and the timing rule is what catches people. You have to show one academic year of tuition from your CAS plus a published monthly maintenance amount for up to nine months, and you have to have held that money for 28 consecutive days ending within 31 days of the day you apply.",
    sections: {
      route: {
        body:
          "There are two ways to be asked for money, and most students meet only one of them. The full financial requirement applies to most applicants. Applicants from a list of countries are under a differential evidence requirement, which means they are not asked to prove the maintenance element up front, though they can still be asked for it later.",
        points: [
          "The full requirement is: one academic year of tuition for up to nine months, taken from your CAS, plus the published monthly maintenance amount for up to nine months, plus a separate amount for each family member you bring.",
          "The maintenance rate depends on where you study. GOV.UK publishes two rates and London means the City of London and the 32 London boroughs, which is not the same as 'in London' as a postcode.",
          "The differential evidence requirement list covers a long set of countries, including the United States, Canada, Australia, China, Singapore, Japan and much of Europe. If you are on it, you do not need to prove the maintenance element when you apply, although UKVI may contact you after submission and ask for it.",
          "The list is a list. Do not assume from your own knowledge of the world whether your nationality is on it. Read the published list, because it changes.",
          "You do not need to prove the maintenance element if you have been living in the UK on a valid visa for at least 12 months on the date of your application, or if you are applying as a student union sabbatical officer.",
        ],
        callout: {
          tone: "watch",
          title: "Being on the differential list does not mean being exempt forever",
          body: "If your nationality is under the differential evidence requirement, UKVI will not ask you for the maintenance evidence at the point of application. They may still ask for it before they decide, and they will tell you after you have submitted. Treat the money as if you have to show it, because some day you will.",
        },
      },
      documents: {
        body:
          "The evidence is a set of documents that together tell one story: this money exists, it is available, and it will keep you. GOV.UK publishes the guidance on financial evidence, and it is more specific than most applicants expect.",
        points: [
          "Your bank statements, covering a period that ends on the correct date for your 28-day period, in your name or your sponsor's name.",
          "A sponsor letter if someone else is funding you, stating their relationship to you and the amount they are providing.",
          "Evidence of the source of the money: employment, a scholarship, a loan, or a savings history.",
          "Proof of any student loan or financial sponsorship, from the loan or sponsorship company, if you are relying on it.",
          "The fee figure from your CAS, since it is the course fee element of the requirement.",
        ],
        callout: {
          tone: "watch",
          title: "The 28 days have to end in the right window",
          body: "GOV.UK's example makes the rule concrete: if you submit on 1 January, you have to show the funds were in your account for the 28-day period ending on 1 December. The end date of the 28 days must fall within 31 days of your application date. The rule is about the closing date, not the opening date, and students get it backwards constantly.",
        },
      },
      appointments: {
        body:
          "There is no appointment for the money itself, but there is an appointment that the money affects, and one that it can be thrown off course by. The appointment is your biometrics appointment, because the application cannot be filed without the money and the money has to be in the right window on the filing date.",
        points: [
          "The money has to be aged, not paid. The 28 days are a waiting period on money that is already there.",
          "Book your biometrics appointment for a date that leaves room to complete the application with money that meets the rule. If you file two weeks after biometrics, the 28-day period has to be arranged around the filing date, not around the appointment.",
          "If UKVI asks for further evidence after you submit, the clock on your application pauses, but the 28-day rule keeps applying to the evidence you provide. The money you upload has to meet the same condition.",
          "A sponsor whose evidence is incomplete will cost you the appointment as well as the application. Check your sponsor's documents before you submit, not after.",
        ],
        callout: {
          tone: "good",
          title: "Work backwards from the filing date, then book the appointment",
          body: "Pick the date you intend to submit. Count back 28 days. Check that the funds were in the account on that closing date. Then book your biometrics appointment to sit comfortably before it. Doing it in that order means the appointment is the easy part.",
        },
      },
      money: {
        body:
          "These are the published figures. GOV.UK states the maintenance rates, the number of months they cover, the tuition element and the 28-day rule, and it is all on one page, which is the page you should read rather than any summary of it.",
        points: [
          "Maintenance for yourself: GBP 1,529 per month for up to 9 months for courses in London, and GBP 1,171 per month for up to 9 months for courses outside London.",
          "Course fee: enough to pay for your course for 1 academic year, up to 9 months. The amount is the figure on your CAS.",
          "Each family member you bring needs an additional amount on top of your own: GBP 845 per month for up to 9 months in London, and GBP 680 per month for up to 9 months outside London.",
          "If you are boarding at a residential independent school, the boarding fees go on the CAS instead of the maintenance figure.",
          "You must have the money for at least 28 days in a row, and the end date of that 28-day period must fall within 31 days of the date you apply for the visa.",
          "GOV.UK's worked example: apply on 1 January and the 28-day period must end on 1 December.",
          "If you have a student loan or financial sponsorship, you need evidence of it from the loan or sponsorship company. A loan only counts as far as it actually covers.",
        ],
        callout: {
          tone: "watch",
          title: "A deposit the week before you apply is not 28 days",
          body: "The requirement is not that you have the money on the day you apply. It is that you have had it, continuously, for 28 days ending close to your application date. Money that arrived yesterday does not count, and a large unexplained deposit into an account that has been empty reads as worse than a smaller, longer-standing balance.",
        },
      },
      rules: {
        body:
          "The rules are short and each one catches somebody. None of them are about the amount.",
        points: [
          "The 28 days must be consecutive. Two 14-day periods do not make 28 days.",
          "The closing date must fall within 31 days of your application date. Too early is just as wrong as too late, and it is the more common mistake.",
          "The money must be available to you, not merely shown in a statement. Money you cannot draw on does not meet the requirement.",
          "If you are funded by a sponsor, you need the sponsor's documents as well as your own, and they need to agree with each other.",
          "The amounts are published by GOV.UK and they are the amounts. Do not work from a forum, from an adviser's number, or from a figure a friend was given last year.",
          "The differential evidence requirement is a deferral, not a waiver. UKVI can still ask for the evidence before deciding.",
          "If you have been in the UK on a valid visa for at least 12 months on the date of your application, you do not need to prove the maintenance element. This is worth checking if you are applying from inside the UK.",
        ],
        callout: {
          tone: "watch",
          title: "Two dates, and both of them matter",
          body: "The first is the closing date of your 28-day period, which must be within 31 days of your application date. The second is the age of your CAS, which must be under six months on the day you apply. Both are easy to satisfy on their own and surprisingly hard to satisfy together if you started either one late.",
        },
      },
      timing: {
        body:
          "Money is the one step in the UK route where the clock runs backwards from a date you choose. Pick the application date, count back 28 days, and make sure the money has been sitting there since.",
        roadmap: [
          {
            label: "As soon as you have the CAS",
            title: "Work out the number",
            goal: "A single figure you are aiming at, and the date the money has to be in the account by.",
            hours: "2-3 hours",
            focus: [
              "Read the GOV.UK money page directly. Write down the maintenance rate for where you study, whether that is inside or outside London.",
              "Multiply by 9 months, then add the one-year fee from your CAS. That is your target.",
              "If you are bringing a partner or children, add the dependant amount for each of them.",
              "Choose your intended application date, then count back 28 days. That is your closing date.",
            ],
            checkpoint: "You have one target number and one closing date, both written down.",
          },
          {
            label: "The month before",
            title: "Get the money into place",
            goal: "Funds sitting in the account, with the source explainable.",
            hours: "3-5 hours, plus waiting",
            focus: [
              "Move the money in early enough that the closing date is genuinely behind you. Do not rely on a transfer landing on the day.",
              "If the money comes from abroad, check what your bank and your country's rules require, and keep every record of the transfer.",
              "If you are exchanging currency, do it early and keep the receipts, so the amounts on your statements match what you claim.",
            ],
            checkpoint: "The funds are in the account, and the closing date has passed with the money untouched.",
          },
          {
            label: "The last fortnight before filing",
            title: "Assemble the evidence",
            goal: "A set of documents that agrees with itself.",
            hours: "3-4 hours",
            focus: [
              "Pull statements covering the full 28-day period and beyond, in your name or your sponsor's name.",
              "Ask your sponsor for their letter and their own statements now, not on the day you file. Sponsor evidence is the most common reason a financial file comes back.",
              "Write a short explanation of where the money came from, and keep any supporting evidence: employment letters, scholarship letters, loan documents.",
              "Line the figures up. The total on your statements should clearly exceed the target, and every document should tell the same story.",
            ],
            checkpoint: "Your evidence set is complete, internally consistent, and comfortably above the requirement.",
          },
          {
            label: "Filing day and after",
            title: "File and watch",
            goal: "An application that is not held up by money.",
            hours: "1 hour, then half an hour a week",
            focus: [
              "Submit on or before your intended date, inside the 31-day window from your closing date.",
              "Keep the evidence somewhere you can reach it quickly, because UKVI may ask for it again after submission.",
              "If you are asked for more, respond the same day. The clock on the application pauses, but the conditions on the money do not change.",
            ],
            checkpoint: "The application is filed, and you can produce any document again within a day.",
          },
        ],
      },
      resources: {
        body:
          "GOV.UK publishes the amounts, the rule and the guidance on what counts as evidence, and it is the only page you need on this checkpoint.",
        resources: [
          {
            title: "GOV.UK: money you need",
            kind: "official",
            url: "https://www.gov.uk/student-visa/money",
            why: "The official source for this milestone: the published maintenance rates for London and outside London, the course fee element, the dependant amounts, the 28-day rule and the differential evidence requirement list.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: financial evidence for student applications",
            kind: "official",
            url: "https://www.gov.uk/guidance/financial-evidence-for-student-and-child-student-route-applicants",
            why: "The detailed guidance on what counts as evidence and how it must be dated, which is where the differences between a statement that works and one that comes back get explained.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "University of Bristol: the CAS",
            kind: "official",
            url: "https://www.bristol.ac.uk/directory/visas/student-visa/cas/",
            why: "Where the course fee element of your requirement comes from, and a real sponsor's guide to the order of steps around it.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: Student visa",
            kind: "official",
            url: "https://www.gov.uk/student-visa",
            why: "The whole route on one page, including the fee, the decision times and the healthcare surcharge, so you can see the money requirement in its proper place.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: your partner and children",
            kind: "official",
            url: "https://www.gov.uk/student-visa/family-members",
            why: "The dependant amounts and the additional conditions that come with bringing a family member, if that applies to you.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official Home Office pages for this checkpoint, and because the money rules are the ones most likely to change without warning. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "gb-ihs": {
    archetype: "visa",
    intro:
      "Two payments sit between your finished application and the Home Office: the Student visa application fee and the Immigration Health Surcharge. The surcharge is the one people get wrong, because how much you pay depends on how long you are asking to stay, and because it is paid as part of the application rather than after it.",
    sections: {
      route: {
        body:
          "The Student visa replaced the Tier 4 (General) route, and the fee structure comes with it. The application fee is for the visa itself. The surcharge is for access to the National Health Service for the length of your permission to stay, and it is charged per person.",
        points: [
          "The Student visa application fee is GBP 558 to apply from outside the UK. You pay a fee for each person who joins you, including a partner or children.",
          "The Immigration Health Surcharge is separate, and you pay it as part of the same application rather than afterwards.",
          "The surcharge depends on how long your visa lasts. A three-year course and a one-year course cost different amounts, and so do a shorter and a longer course.",
          "You cannot start using the NHS free of charge until your visa starts, and you must have paid the surcharge before then.",
          "There are also paid services on offer at some visa application centres and some posts, such as a faster decision. They are optional and they are not part of the route.",
        ],
        callout: {
          tone: "watch",
          title: "Pay for the whole of your permission, not just the first year",
          body: "The surcharge is based on the length of the leave you are asking for. Students who estimate for one year and then find their course is three years discover the difference at the point of paying, which is a bad time to discover it. Work out the full end date of your permission before you pay, and if you are unsure, pay for the longer period.",
        },
      },
      documents: {
        body:
          "There is no new document here, only two receipts, and both of them matter afterwards. The surcharge reference number in particular is asked for repeatedly, because it is how the Home Office links the payment to your application.",
        points: [
          "The visa application fee receipt, which the post or the application centre gives you at the point of payment.",
          "The Immigration Health Surcharge reference number, and the receipt that goes with it. The reference number is what you quote when you pay the fee.",
          "Your application reference. Every message about your application refers to it, and you should be able to find it without searching.",
          "A record of what you paid and when, especially if you are paying through a centre that charges for its service.",
        ],
        callout: {
          tone: "watch",
          title: "Keep the surcharge reference where you can find it",
          body: "The IHS reference is asked for at the application stage, when you change something on your application, and sometimes when you arrive. People lose it because they filed the email among their admission paperwork. Save it in the same folder as your passport and your CAS, not in an inbox.",
        },
      },
      appointments: {
        body:
          "Neither payment involves an appointment, but both of them interact with one. You cannot submit the application until the fee is paid and the surcharge reference is in hand, so paying late can cost you a biometrics slot.",
        points: [
          "Pay the fee and the surcharge as part of the online application, or at the point your application instructs you to. GOV.UK's route says the surcharge is paid as part of your application.",
          "If you are booking a biometrics appointment, pay first and book second where you can. A slot you cannot use because the payment has not gone through is a slot you have to rebook.",
          "The priority service, where it is offered, is a separate decision made at the point of application. You will be told whether you can use it when you apply, and it is worth checking what it costs and what it can do before the point of no return.",
          "Your biometrics appointment may also be at a service point that charges its own service fee, which is set by the operator rather than by the Home Office. Check the total.",
        ],
        callout: {
          tone: "good",
          title: "Pay first, then book",
          body: "The order that costs least is: pay the visa fee, pay the surcharge, note the reference, then book biometrics. Booking first means booking against an application that is not yet payable, and centres will not hold a slot for an incomplete file.",
        },
      },
      money: {
        body:
          "The visa fee is published and fixed. The surcharge is published as a tariff that depends on the length of your permission, and the amount you pay is calculated from the length of the visa you are applying for. Read the current tariff at the point you pay, because it is the authority's figure and it changes.",
        points: [
          "Student visa application fee from outside the UK: GBP 558, as published by GOV.UK. The same figure applies to extend or switch the visa from inside the UK.",
          "You pay the visa fee for each person who joins you.",
          "The Immigration Health Surcharge depends on how long your visa lasts, and you pay it for the full length of the permission you are requesting. GOV.UK states that the amount you pay depends on how long your visa lasts and publishes the tariff on the healthcare surcharge page.",
          "The surcharge is not included in the GBP 558. It is a second, separate payment, and the two are often confused.",
          "Priority services, where they are offered, cost extra on top of both, and are optional.",
        ],
        callout: {
          tone: "watch",
          title: "Read the current tariff, do not reuse a figure",
          body: "The GBP 558 application fee is fixed and published. The surcharge is a published tariff indexed to the length of your visa, and it is revised. We are not going to print a number that will be stale by the time you pay, because the tariff on the GOV.UK healthcare surcharge page is the figure that applies to you on the day you pay.",
        },
      },
      rules: {
        body:
          "A short rule list, and the two that matter are about sequence and about who the payment covers.",
        points: [
          "You cannot start using the NHS free of charge until your visa starts, and you must have paid the surcharge by then.",
          "You may have to pay for NHS treatment if the Home Office has not decided on your visa yet. Being mid-application is not a guarantee of free care.",
          "The surcharge is charged per person and covers each individual applicant for the length of their own permission.",
          "The visa fee is payable by every person who joins you, including dependants.",
          "You can ask to withdraw an application by contacting UKVI, and your fee is only refunded if UKVI has not started processing it. That is a narrow window and it argues for getting the application right rather than for gambling on a withdrawal.",
          "A faster decision is a paid service with published conditions, not a right. Whether you are offered it depends on your post and your circumstances.",
        ],
        callout: {
          tone: "watch",
          title: "The surcharge and the fee are two different things",
          body: "The GBP 558 buys the visa. The surcharge buys access to the National Health Service for the length of your permission. Paying one is not paying the other, and an application with the fee paid and the surcharge missing will not be processed. Students who assume the receipt they got for one covers both lose days.",
        },
      },
      timing: {
        body:
          "This is a short stage with one variable: when you pay. Pay too early and you may pay for a period you then change. Pay too late and the application cannot be submitted.",
        roadmap: [
          {
            label: "Once your application is started",
            title: "Work out the length",
            goal: "The number of months of permission you are paying for, and the end date it implies.",
            hours: "1-2 hours",
            focus: [
              "Check your CAS for the course start and end dates, and add the time you are allowed after the course for any other leave you are claiming.",
              "Decide whether you are applying for the full length or for a shorter initial period. Applying for less is allowed and it costs less, but it means another application later.",
              "Write down the end date you are applying for. Everything else on this page depends on it.",
            ],
            checkpoint: "You know the exact period you are applying for and the end date it produces.",
          },
          {
            label: "The same week",
            title: "Pay both amounts",
            goal: "The visa fee paid and the surcharge reference issued.",
            hours: "1-2 hours",
            focus: [
              "Pay the GBP 558 application fee for each person who is applying.",
              "Pay the surcharge for the full length you decided on, and check the figure against the published tariff as you pay.",
              "Save both receipts and write the surcharge reference number into your application folder.",
            ],
            checkpoint: "Both payments are made and the surcharge reference is recorded.",
          },
          {
            label: "Immediately after",
            title: "Book biometrics",
            goal: "A confirmed appointment against a paid application.",
            hours: "1 hour",
            focus: [
              "Book your biometrics appointment now, at a date that leaves you room to complete the application with margin.",
              "Check whether your centre charges a service fee on top, and what the total comes to.",
              "Read the priority service guidance and decide whether it is worth anything to you, and what it costs.",
            ],
            checkpoint: "A biometrics appointment is confirmed, and the application is fully paid.",
          },
          {
            label: "Before you submit",
            title: "One last check",
            goal: "Nothing missing from the payment side.",
            hours: "30 minutes",
            focus: [
              "Confirm the application form shows the fee as paid and the surcharge reference as entered.",
              "Check the length of permission on the form against what you paid for.",
              "Save everything again, in one place, with your passport and your CAS.",
            ],
            checkpoint: "The application form, the payments and the references all agree with each other.",
          },
        ],
      },
      resources: {
        body:
          "GOV.UK publishes both the fee and the surcharge tariff, and they are the only figures that apply to you.",
        resources: [
          {
            title: "GOV.UK: Student visa",
            kind: "official",
            url: "https://www.gov.uk/student-visa",
            why: "The official source for this milestone: the GBP 558 application fee, the per-person rule, the fact that the healthcare surcharge is paid as part of the application, and the decision times.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: pay for UK healthcare as part of your immigration application",
            kind: "official",
            url: "https://www.gov.uk/healthcare-immigration-application",
            why: "The Immigration Health Surcharge page, where the tariff for your length of permission is published and paid. This is where you read the current figure rather than taking it from anyone else.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: Student visa fees",
            kind: "official",
            url: "https://www.gov.uk/student-visa/fee",
            why: "The fee page on its own, which states what you pay to apply from outside the UK and the rule that each person joining you pays their own fee.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: faster decision on a visa outside the UK",
            kind: "official",
            url: "https://www.gov.uk/guidance/visa-decision-waiting-times-applications-outside-the-uk",
            why: "The published conditions and cost of the priority service, so you can see whether it is available to you and what it actually buys before you decide.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: documents you will need to apply",
            kind: "official",
            url: "https://www.gov.uk/student-visa/documents-you-must-provide",
            why: "The document list the Home Office expects, including the written sponsor consent it asks for where you received sponsorship for fees and living costs in the last 12 months.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official Home Office pages for this checkpoint, and because the fee and the surcharge are the two numbers most likely to be quoted wrongly by people who are not the authority. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "gb-visa-apply": {
    archetype: "visa",
    intro:
      "The application is a form, a payment and a set of uploads, and then it is biometrics. The clock in the UK starts at biometrics rather than at submission, so the appointment you book matters more than the day you send the form.",
    sections: {
      route: {
        body:
          "There is one Student visa route and it replaced the Tier 4 (General) route. Whether you apply from outside the UK or from inside it changes your window, not your route, and outside the UK is the normal case for a first-time student.",
        points: [
          "Applying from outside the UK, the earliest you can apply is 6 months before your course start date. From inside the UK it is 3 months before.",
          "If you are applying from inside the UK, you must apply before your current visa expires, and your new course must begin within 28 days of your current visa expiring.",
          "You apply online. Paper applications are available only in narrow cases, such as a disability that prevents you applying online, or if you hold an identity or travel document for non-national residents, refugees or stateless persons.",
          "Your dependants apply separately, with their own applications and their own fees, and they need your application number to do it.",
        ],
        callout: {
          tone: "watch",
          title: "The clock starts at biometrics, not at submission",
          body: "GOV.UK states that a decision usually takes 3 weeks for an application from outside the UK, and the practical advice is to book your appointment early. The appointment is the thing that queues. A perfectly completed application submitted after a fortnight of waiting for biometrics has already lost the weeks it was supposed to save.",
        },
      },
      documents: {
        body:
          "GOV.UK publishes what you must provide and what you may need to provide, and the difference matters because a missing mandatory document is a returned application while a missing conditional one is a request.",
        points: [
          "Your current passport or other valid travel documentation. This is always required.",
          "Your Confirmation of Acceptance for Studies from your course provider. This is always required.",
          "Proof that you have enough money to support yourself and pay for your course, if you are not exempt under the differential evidence requirement.",
          "A valid ATAS certificate, if your course and nationality require one.",
          "Your tuberculosis test results, if you need one.",
          "Written consent from your financial sponsor, if you received sponsorship for your course fees and living costs in the last 12 months.",
          "If you are under 18, written consent from both parents or legal guardians, proof of the relationship, and a copy of a birth certificate showing both parents' names.",
        ],
        subsections: [
          {
            title: "Always required, and what you may also need",
            what: "The two documents every application needs, and the list that depends on your circumstances.",
            format: "Uploads into the online service, or scans at the appointment.",
            score: "There is no score. The application is complete or it is not, and an incomplete one is not processed.",
            topics: [
              "Passport and CAS are the two unconditional items. Everything else is conditional on your nationality, your course, your age and your funding.",
              "Your TB test result is one of the most commonly missed conditional items, because students who assume they do not need it never look.",
              "Sponsor consent is a separate document from the money evidence itself, and it is specifically about sponsorship received in the last 12 months.",
              "Under-18 applicants need parental consent, evidence of the relationship and a birth certificate, and the consent has to cover the application, the care arrangements and the travel.",
            ],
            tip: "Work down the published list rather than up from what you happen to have. The conditional items are the ones that catch people, and they are the ones nobody thinks about until the file is returned.",
          },
          {
            title: "What the officer is assessing",
            what: "The substantive test behind the documents, which is not a document question.",
            format: "A genuine student assessment applied to the facts in your application and your interview.",
            score: "The Home Office applies a genuine student requirement to Student visa applicants. It looks at whether you are genuinely seeking to study, whether the course is suitable for you and whether you will leave at the end.",
            topics: [
              "Your motivation for the course, and how it connects to your academic history so far.",
              "Your understanding of what you will study and what you will do after.",
              "Your ability to support yourself during the course, and the evidence for it.",
              "Whether you will comply with the conditions of the visa, which includes not working more than the hours you are allowed.",
            ],
            tip: "Be ready to talk about your course in detail. The interview for a genuine student assessment is short, but it is not a formality, and the students who can explain why they chose the programme are the ones who pass it.",
          },
        ],
        callout: {
          tone: "watch",
          title: "An incomplete application is not a slow application",
          body: "It is an application that has not started. GOV.UK is explicit that they will not process a study permit application until it is complete, and that waiting to submit documents causes delays. Submit everything you have, in one pass, and if something genuinely cannot be provided yet, say so in a letter of explanation rather than leaving a gap.",
        },
      },
      appointments: {
        body:
          "Identity is proved either through an app on your phone or at a visa application centre. Which one you are told to use depends on your passport and where you are applying from, and you will be told when you apply.",
        points: [
          "You will either use the UK Immigration: ID Check app to scan your identity document, which also creates or signs you into your UKVI account, or have your fingerprints and photo taken at a visa application centre.",
          "If you go to a centre, take your passport and you will be able to collect it on the day.",
          "You may have to travel to reach your nearest centre, and in some countries the nearest centre is in another country. Check where it is before you book.",
          "You can upload your supporting documents into the online service, or have them scanned at your appointment. Doing both is safer than assuming one worked.",
          "Centres are busiest between May and September, which is exactly when most students are applying. Book the earliest slot that works.",
        ],
        callout: {
          tone: "good",
          title: "Upload before you go",
          body: "Centres scan documents well, but a scan that turns a page into a shadow is the kind of thing that adds a fortnight. Upload your documents into the online service in advance, and use the appointment only for the identity check. If something has to be redone, it is faster in your own time.",
        },
      },
      money: {
        body:
          "The fees are settled before this stage, so the money question here is about making sure you have paid everything you owe and can prove it, rather than about paying something new.",
        points: [
          "The Student visa application fee is GBP 558 from outside the UK, per person, and the Immigration Health Surcharge is a separate payment for the length of your permission.",
          "Your application is not complete until the fees are paid. An unpaid application does not enter the queue.",
          "If you are using a visa application centre, the centre may charge its own service fee. That is set by the operator, not by the Home Office, and it is on top of the government fees.",
          "Keep the receipts. You will be asked for the application fee receipt if your post requires payment before the interview, and the surcharge reference is asked for more than once.",
        ],
        callout: {
          tone: "watch",
          title: "An unpaid application is not queued",
          body: "Nothing about the fee is negotiable and nothing about it is unusual, but people do reach biometrics with an unpaid application. Pay both the visa fee and the surcharge, check that the application shows them as paid, and only then book the appointment.",
        },
      },
      rules: {
        body:
          "These are the rules that decide whether the application is accepted and whether it is decided quickly.",
        points: [
          "The earliest you can apply from outside the UK is 6 months before your course start date, and from inside the UK it is 3 months.",
          "Do not travel outside the UK, Ireland, the Channel Islands or the Isle of Man until you have a decision. GOV.UK states this for dependants and says their application will be withdrawn if they do. The same discipline is worth applying to yourself, because a file that is withdrawn while you are abroad is a file you rebuild from abroad.",
          "You must not travel to the UK before the start date given on your visa, whatever your course start date is.",
          "Your application is not processed until it is complete. Submit in one pass.",
          "Your biometrics appointment is part of the application, not an optional extra. Without it, there is no decision.",
          "You may be contacted for more documents, for an interview, or about your personal circumstances. Answering quickly is the single thing you control.",
          "Your dependants need your application number to file, so send it to them the moment you have it.",
        ],
        callout: {
          tone: "watch",
          title: "Six months early is the limit, not the target",
          body: "Applying on day one of the six-month window is a common instinct and a poor one. The form asks for details, your documents change, and a request for more information while you are still assembling the file is expensive. Apply once the file is complete, and aim to be a few weeks inside the window rather than on its edge.",
        },
      },
      timing: {
        body:
          "Three weeks is the published standard for a decision from outside the UK, and it is a standard rather than a guarantee. Your plan needs to absorb a request for documents, an interview, or both.",
        roadmap: [
          {
            label: "Week 1",
            title: "Open the application and read it",
            goal: "A form you understand before you fill it in.",
            hours: "3-4 hours",
            focus: [
              "Start the online application and read every section before you type anything into it. The questions are easier to answer once you have seen them all.",
              "Note where your CAS reference, your ATAS certificate and your evidence documents go, so you can gather them as you go.",
              "Check whether the file wants a study plan, a CV or anything the general guidance does not mention.",
            ],
            checkpoint: "You know every section, and you know which documents each one wants.",
          },
          {
            label: "Week 2",
            title: "Fill it in and pay",
            goal: "A complete, paid application.",
            hours: "4-5 hours",
            focus: [
              "Complete every section carefully, and upload the documents as you go rather than in one panic at the end.",
              "Pay the visa fee and the surcharge for the full length of your permission, and save both receipts.",
              "Write a short explanation of anything unusual in your history and put it in the right place, rather than leaving it for a request for more information.",
            ],
            checkpoint: "The application is complete, the fees are paid, and the surcharge reference is saved.",
          },
          {
            label: "Week 3",
            title: "Biometrics",
            goal: "The appointment done, and the file in.",
            hours: "3 hours, including waiting and travel",
            focus: [
              "Book the earliest slot your centre offers, and go early enough to deal with the building.",
              "Bring your passport. If you need a scan of anything, bring clean originals.",
              "After the appointment, check your application status and your messages in the UKVI account, and note the date biometrics were given.",
            ],
            checkpoint: "Biometrics are done and your file has entered the queue.",
          },
          {
            label: "The wait",
            title: "Stay reachable and keep the evidence",
            goal: "A decision without a delay you caused.",
            hours: "15 minutes a day",
            focus: [
              "Check your UKVI account and your email every day, including spam. Requests for more information pause the clock and they come with deadlines.",
              "Keep your financial evidence somewhere you can reach within hours, because the most common request is for more money evidence.",
              "Do not book non-refundable travel until the visa is granted and the decision letter has actually arrived.",
            ],
            checkpoint: "The decision has arrived, in your account and in your inbox.",
          },
        ],
      },
      resources: {
        body:
          "GOV.UK publishes the full route, the document list and the appointment rules, and a real university's guide shows how the process reads from the applicant side.",
        resources: [
          {
            title: "University of Leeds: applying for a student visa outside the UK",
            kind: "official",
            url: "https://students.leeds.ac.uk/visa-information-applying/doc/apply-visa-outside-uk",
            why: "The official source for this milestone: a real university's walkthrough of the application and biometrics process, written from the applicant's side of the desk.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: apply for a Student visa outside the UK",
            kind: "official",
            url: "https://www.gov.uk/student-visa/apply",
            why: "The Home Office's own application page: how identity is proved, the fees, the decision time, and what happens after you submit.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: biometrics",
            kind: "official",
            url: "https://www.gov.uk/student-visa/biometrics",
            why: "The official explanation of the ID Check app route versus the visa application centre route, what to bring, and how the process differs if you are in the UK.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: documents you will need to apply",
            kind: "official",
            url: "https://www.gov.uk/student-visa/documents-you-must-provide",
            why: "The list the Home Office expects, separating what you must provide from what you may need, including the conditional items students forget.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: when you can apply",
            kind: "official",
            url: "https://www.gov.uk/student-visa/when-you-can-apply",
            why: "The published windows for applying from outside and inside the UK, and the 28-day rule on applying after you receive your CAS.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: check which visas you are eligible for",
            kind: "official",
            url: "https://www.gov.uk/check-uk-visa",
            why: "The official eligibility checker, which confirms the route and tells you what the Home Office expects before you commit to a long form.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official Home Office pages and a real university's own guidance, and because together they cover both sides of the process. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "gb-visa-decision": {
    archetype: "visa",
    intro:
      "The decision arrives as an email and a status in your UKVI account, and if it is a grant, the visa itself is a digital record rather than a sticker. GOV.UK publishes a standard of three weeks for applications from outside the UK, and a service standard is a commitment rather than a promise.",
    sections: {
      route: {
        body:
          "There are three possible outcomes and they lead to different places. A grant gives you an eVisa, a refusal gives you a right to challenge in some cases, and a request for more information pauses the clock without deciding anything.",
        points: [
          "If your application is successful you get an eVisa, which is an online record of your immigration status. There is no visa sticker for most applicants now.",
          "Your decision email or letter tells you how to get access to your eVisa, and you will need to create a UKVI account to do it if you do not already have one.",
          "You may be contacted if your application is complex and will take longer, for example because your supporting documents need verifying, you need to attend an interview, or they need to look at your personal circumstances.",
          "If your application is refused, there are remedies and they are time-limited. Ask, at the point of the refusal, which one applies to you and how long you have to use it.",
        ],
        callout: {
          tone: "watch",
          title: "A refusal is not the end, but the clock is running",
          body: "Refusals can be challenged, but the routes are administrative review and the 221(g) waiver process, and both have deadlines measured in days from the date of the refusal. Read the refusal letter for its own remedy and its own date, because the generic advice is not good enough.",
        },
      },
      documents: {
        body:
          "On a grant, the document that matters is the one you do not physically receive: the eVisa, which lives in your UKVI account. On a request for more information, the document that matters is whatever they asked for, and it is usually available quickly.",
        points: [
          "Your decision email or letter, and the UKVI account it links to.",
          "Your UKVI account, linked to the passport you travelled with. The eVisa is attached to your travel document, and it is that document which proves your status.",
          "Any document the decision asks for, if the outcome is a request for more information.",
          "Your original passport, if you gave it to a centre. Collect it, and check that nothing is missing from it.",
          "Your approval letter and your CAS, for enrolment and for any later application that needs them.",
        ],
        callout: {
          tone: "good",
          title: "Link the right passport to the right account",
          body: "Your eVisa is attached to the travel document you used to come. Setting up a UKVI account with the wrong passport, or forgetting to link it at all, means you cannot prove your status when it matters, and the fix is not always immediate. Do it the day the decision lands.",
        },
      },
      appointments: {
        body:
          "There is no appointment in the happy path. There can be one in the unhappy path, if UKVI decides your application is complex enough to interview you, and there is always an appointment with the university behind the decision.",
        points: [
          "If you are asked to attend an interview, you will be contacted and told what to bring. Treat it as a real appointment with a real consequence.",
          "If your passport was left with a visa application centre, collecting it is an appointment. Do it promptly, and check the visa foil or the eVisa status on the day.",
          "Your university will want to see your approval before enrolment, and some will ask for the eVisa share code rather than a document. Ask yours what they want.",
          "You may be able to prove your immigration status online, which matters at the UK border. GOV.UK points to a share code for that purpose.",
        ],
        callout: {
          tone: "good",
          title: "Check your status online before you travel",
          body: "GOV.UK publishes a way to prove your immigration status online using a share code. Before you fly, confirm that it works on your passport and that you can generate the code, because a student who cannot prove their status at the border finds out in the worst possible place.",
        },
      },
      money: {
        body:
          "There is nothing new to pay, and something you may already have lost. The visa fee and the Immigration Health Surcharge are paid before a decision is made, and what happens to them depends on what happens.",
        points: [
          "If your application is refused, the position on the visa fee is that a withdrawal before processing starts is the case where a refund is possible, and the decision itself is not.",
          "If your application is granted and you later withdraw it, GOV.UK says your fee is only refunded if UKVI has not started processing your application.",
          "The surcharge is separate, and the Home Office's published position on it is separate too. Read the refund terms on the healthcare surcharge page before you assume either way.",
          "There is no cost to accepting a grant. The costs are the ones already committed and the ones you now have to plan for: housing, travel and living expenses.",
        ],
        callout: {
          tone: "watch",
          title: "Do not assume a refusal refunds anything",
          body: "A refused application is a spent application, and the visa fee and the surcharge are the two largest sums you have committed. Read the refund terms for each one on GOV.UK before you decide to withdraw anything, and do not withdraw on the assumption that the money comes back.",
        },
      },
      rules: {
        body:
          "What happens after the decision is governed by a handful of rules, and one of them is the one everybody gets caught by.",
        points: [
          "GOV.UK states that you will usually get a decision within 3 weeks if you are outside the UK, and 8 weeks if you are inside the UK. These are service standards, not guarantees, and complex applications take longer.",
          "Respond to any request for more information the same day. The clock pauses while you answer, and it restarts when you do.",
          "You must not travel to the UK before the start date given on your visa, no matter when your course starts. You can arrive before your course starts, up to 1 week before if the course lasts 6 months or less, and up to 1 month before if it lasts more than 6 months.",
          "You can be in the UK before your course starts, but you must not be in the UK before your visa starts.",
          "Your eVisa is what proves your status. Keep the UKVI account linked to the passport you travel with, and keep the account details somewhere you can reach them.",
          "If the standard window has passed with no decision, contact UKVI rather than assuming a refusal. The absence of a decision is not a decision.",
        ],
        callout: {
          tone: "watch",
          title: "Three weeks is a standard, not a deadline",
          body: "GOV.UK says you will usually get a decision within 3 weeks from outside the UK. Usually is doing real work in that sentence. If you have a non-refundable flight, do not build the plan on day 21, because the published standard does not include the time taken to return your passport or to answer a request for documents.",
        },
      },
      timing: {
        body:
          "The plan after the decision is short and mostly about not doing anything irreversible too early. The plan before it is about being reachable.",
        roadmap: [
          {
            label: "While you wait",
            title: "Be reachable",
            goal: "No delay caused by a missed message.",
            hours: "15 minutes a day",
            focus: [
              "Check your UKVI account and your email every day, including the spam folder. A request for more information comes with a deadline.",
              "Keep the financial evidence ready. More money evidence is the most common request and it is the fastest to supply.",
              "Check the applicant's status message in your account rather than ringing, because ringing does not change the queue position.",
            ],
            checkpoint: "You have not missed anything, and you can produce any document within a day.",
          },
          {
            label: "The day the decision lands",
            title: "Read it properly",
            goal: "Know what you have, and what you have to do next.",
            hours: "1 hour",
            focus: [
              "Read the decision email or letter in full, including anything about your visa conditions and the dates on your permission.",
              "If it is a grant, set up or sign into your UKVI account and link the passport you travelled with.",
              "If it is a request for more information, note the deadline and answer it the same day.",
              "If it is a refusal, read the remedy it names and the date by which you must use it.",
            ],
            checkpoint: "You know the outcome, the conditions attached to it, and your next deadline.",
          },
          {
            label: "After the grant",
            title: "Make the status portable",
            goal: "Proof of status wherever it is needed.",
            hours: "30 minutes",
            focus: [
              "Generate and test your share code for proving your status online, and save it.",
              "Send the approval letter or the share code to your university's international office, in whatever form they ask for.",
              "Collect your passport if it was left with a centre, and check the visa foil if one was applied.",
              "Check your course dates against the dates on your permission, and raise any mismatch with your university now.",
            ],
            checkpoint: "Your status can be proved, and your university has what it needs for enrolment.",
          },
          {
            label: "Before you fly",
            title: "Check the travel conditions",
            goal: "Nothing at the border that you did not expect.",
            hours: "30 minutes",
            focus: [
              "Check the arrival rules for your visa: how early you may land relative to your course start date, given the length of the course, and the date your visa itself starts.",
              "Have your eVisa access and your share code working on the phone you will travel with, plus a copy of your approval letter.",
              "Only now, with a decision in hand and the status provable, look at non-refundable travel.",
            ],
            checkpoint: "You can prove your status and you know exactly when you may land.",
          },
        ],
      },
      resources: {
        body:
          "GOV.UK publishes the service standards, the eVisa route and the travel conditions, and those are the documents that decide what happens next.",
        resources: [
          {
            title: "GOV.UK: money you need",
            kind: "official",
            url: "https://www.gov.uk/student-visa/money",
            why: "The official source for this milestone: the Home Office's own page covering the financial requirement, the 28-day rule and the conditions attached to a Student visa application.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: Student visa",
            kind: "official",
            url: "https://www.gov.uk/student-visa",
            why: "The published decision standards, the fees, the healthcare surcharge and the travel conditions, in one place.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: get access to your eVisa",
            kind: "official",
            url: "https://www.gov.uk/get-access-evisa",
            why: "The step that turns a decision into something you can use: creating a UKVI account and linking your travel document to it.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: waiting for a decision on your student visa",
            kind: "official",
            url: "https://www.gov.uk/student-visa/waiting-for-a-decision",
            why: "What to do while you wait, how to respond to a request for more information, and what happens if the standard window has passed.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: after you apply",
            kind: "official",
            url: "https://www.gov.uk/student-visa/after-you-apply",
            why: "The Home Office's own description of what happens after submission, including biometrics, requests for documents and the possibility of an interview.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: prove your immigration status online",
            kind: "official",
            url: "https://www.gov.uk/view-prove-immigration-status",
            why: "The share code route, which is how you prove your status at the UK border and to your university without a physical document.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official Home Office pages for this checkpoint and the clearest complete set we found, and because the rules after a decision are the ones least likely to be quoted accurately by anyone else. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },
};

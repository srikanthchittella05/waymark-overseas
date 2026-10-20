import type { GuideContent } from "../types";

const V = "2026-10-20";

/**
 * The French student visa dossiers.
 *
 * France runs the visa in two halves, and the halves are done in order by
 * different people. Campus France runs the pre-consular step, the Etudes en
 * France attestation, and the consulate runs the visa itself. Students who
 * treat the attestation as the visa, or who arrive at the consular counter
 * without it, lose weeks.
 *
 * Three things this file keeps returning to:
 *
 *   1. THE EEF ATTESTATION IS NOT THE VISA. It is the academic clearance that
 *      the consular service reads, and it cannot be issued retroactively.
 *   2. THE BOOKING WINDOW IS FIXED. You cannot book a consular appointment more
 *      than six months before your programme starts, so the date is set by the
 *      calendar rather than by your readiness.
 *   3. THE FINANCIAL THRESHOLD MOVED ON 1 AUGUST 2026, from EUR 615 a month to
 *      EUR 877.50 a month, and it is reviewed at least annually.
 */
export const VISA_FR: Record<string, GuideContent> = {
  "fr-eef": {
    archetype: "visa",
    intro:
      "The Etudes en France attestation is the pre-consular half of a French student visa, and it is mandatory for students who live in one of the covered countries and will study in France for 90 days or more. It is a separate application, with its own fee and its own review, and it has to be finished before you can book the consular appointment.",
    sections: {
      route: {
        body:
          "The Etudes en France procedure, run through the Pastel platform, is France's central pre-consular application. For students who have already been admitted, it becomes a pre-consular application: Campus France reviews your file against the visa requirements, and what comes out is the attestation that the consular service reads when you apply for the long-stay student visa.",
        points: [
          "The procedure covers students residing in 75 listed countries and territories, and it applies to any study stay of 90 days or more. Campus France publishes the list, so you can check whether it applies to you before you build a plan around it.",
          "It is not the same thing as the university application. If your programme was applied for through Etudes en France, your admission is already in the file. If you applied directly, the pre-consular part of the same platform is still what produces the attestation.",
          "The output is a confirmation email and an EEF-Pastel pre-registration certificate. Both are named on the consular checklist, and the certificate is the document that travels with you to the appointment.",
          "Some Campus France offices run a short phone interview as part of the review. Campus France USA, for example, describes a 20 minute call with an advisor in Washington DC, and that is an office-level practice rather than a national rule.",
        ],
        callout: {
          tone: "watch",
          title: "The attestation is the academic clearance, not the visa",
          body: "The consulate reads your file against the attestation. A student with a French university place, a good language score and no attestation is not nearly finished: they are at the start of the visa process.",
        },
      },
      documents: {
        body:
          "The Etudes en France file is a mix of documents you already have from the admissions stage and documents you assemble for the visa stage. The EEF platform has its own upload format and its own checklist, and the review is done against what is actually in the file.",
        points: [
          "A clear scan of the identity page of your passport, in the format the platform asks for. It is the first thing it asks for and it is the thing most often rejected for being a photograph of a photograph.",
          "An up to date CV, and your official transcripts and diplomas, or your current-year transcripts if you have not graduated yet.",
          "The official acceptance letter from your programme, which is what turns your file into a pre-consular one and puts you into the attestation stage.",
          "Your language certification, where the programme or the consular service requires one. The attestation records it, and the review is where a language requirement gets noticed.",
          "Your proof of accommodation for the first three months of your stay, which the visa file requires and which you now need earlier than the visa application itself.",
          "Your funding evidence, because the pre-consular review checks the same financial resources requirement that the consular counter will check.",
          "The EEF application fee receipt. Campus France does not begin the review until the fee is paid, and an unpaid file simply sits there.",
        ],
        callout: {
          tone: "watch",
          title: "Paying the fee starts the clock",
          body: "Campus France states that it does not begin reviewing an application until the fee is paid. An application that is complete but unpaid is not being reviewed, and the review period is counted from the payment, not from the submission.",
        },
      },
      appointments: {
        body:
          "The attestation is an online application, so there is no appointment to book. What there is, is a possible call from a Campus France advisor during the review, and the consular appointment that follows once the attestation is issued.",
        points: [
          "A phone interview, where the office runs one, is part of the review and not a formality. Prepare for it as an interview about your academic path, because a call that goes badly delays the file.",
          "The consular appointment is booked separately, through France-Visas and the service provider who operates the counter for your consulate. It cannot be booked more than six months before your programme starts, so the calendar, not your readiness, opens the window.",
          "Some offices also run in-person or online information sessions on the visa file. They are worth going to, because the checklist that comes out of them is the one your consulate is working from.",
          "The EEF platform and the France-Visas account are separate, and the login details for one do not work on the other. Set up both, and do not assume one carries the other.",
        ],
      },
      money: {
        body:
          "There are two separate costs in the French visa sequence and they are billed at different times to different bodies. The attestation fee is a Campus France fee and is set by country and by applicant type. The visa fee is a consular fee and is set by France-Visas.",
        points: [
          "The EEF application fee varies by country and by applicant type, and the amount for your case is published by your own local Campus France office. Check that figure rather than a general number, because the difference between countries is not small.",
          "The France-Visas publication lists a visa price of EUR 50 for countries and territories that use the EEF procedure and EUR 99 for the others, and it gives that figure as an indication rather than a guarantee. The fee that applies to you is the one shown when you file the application.",
          "Both fees are non-refundable, and neither fee buys you the other step. Paying the EEF fee does not cover the visa, and paying the visa fee does not cover the attestation.",
          "Budget the travel to the consular appointment as well. Some consulates are in another city entirely, and some of the appointments are early in the morning.",
        ],
      },
      rules: {
        body:
          "The rules here are about the Etudes en France procedure specifically, and they are the ones that cause a file to be sent back.",
        points: [
          "The attestation is issued on the basis of a completed and paid application, and it cannot be backdated or issued retroactively to cover a missed deadline. If your programme deadline and the review period collide, you collide with them.",
          "The procedure applies to residents of the listed countries, and the country that matters is where you live, not your nationality. A student of one nationality living in another country may be under a different regime.",
          "Documents must be in the format the platform requests, and files uploaded in the wrong format are a common cause of a returned file.",
          "The file you submit must match the file you submitted to the university. A course name or a start date that differs between the two is picked up, and the query takes weeks to clear.",
          "Where the procedure requires a language certification, it has to be a recognised one and it has to be current. The attestation records it, so an out-of-date certificate is visible on the face of the document.",
          "Keep the confirmation email as well as the certificate. The consular counter asks for both, and the email is what you use to answer a question about your file.",
        ],
        callout: {
          tone: "watch",
          title: "Review times vary, so do not plan on the fastest",
          body: "Campus France publishes a review window that runs from about 3 days for an expedited service to about 3 weeks for a standard one, and some files with errors take longer. Plan on the slow end, and start early enough that a returned file still leaves you time.",
        },
      },
      timing: {
        body:
          "Campus France's own guidance is to start the pre-consular process 10 to 12 weeks before departure, and that is the number to build the plan around. The attestation is upstream of the consular appointment, and the appointment is upstream of the visa.",
        points: [
          "Start at 10 to 12 weeks before departure. That is Campus France's published recommendation and it accounts for the review, the file being returned, and the gap before the consular appointment becomes bookable.",
          "Your programme start date fixes everything downstream. The consular booking window opens six months before the start, and the EEF attestation has to be in hand before you can be usefully seated at that counter.",
          "Allow for a returned file. One document in the wrong format, and you are back in a review cycle that takes weeks.",
          "If your language certificate is not yet issued, this is the checkpoint where that becomes urgent, because the attestation cannot be finalised without it where one is required.",
          "Do the EEF file and the accommodation proof at the same time. Both are inputs to the same consular file, and the accommodation requirement is a three-month proof that takes a landlord or a university to produce.",
        ],
        callout: {
          tone: "good",
          title: "One file, two consumers",
          body: "The Etudes en France file and the consular file are close cousins, and assembling the documents once, carefully, and reusing them saves you a fortnight of chasing.",
        },
      },
      resources: {
        body:
          "The French official material is unusually complete, and the Campus France pages for your own country are the ones that carry the dates, the fees and the local practice. The global Campus France site carries the procedure itself.",
        resources: [
          {
            title: "Campus France USA: application overview",
            kind: "official",
            url: "https://www.usa.campusfrance.org/application-overview",
            why: "The local Campus France office's explanation of the Etudes en France application, the documents, the fee and how the review works. Country-specific guidance, which is where the dates and the fee actually live.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Campus France: the Studying in France procedure",
            kind: "official",
            url: "https://www.campusfrance.org/en/application-etudes-en-france-procedure",
            why: "The global explanation of the procedure, which countries it covers and what the platform is used for. This is the page that tells you whether the procedure applies to you at all.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Campus France: student long-stay visa",
            kind: "official",
            url: "https://www.campusfrance.org/en/student-long-stay-visa",
            why: "The official walkthrough of the student visa itself, from the pre-consular stage to the appointment and the validation after arrival. It is the shortest official summary of the whole sequence.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Campus France: local offices",
            kind: "official",
            url: "https://www.campusfrance.org/en/espaces",
            why: "The map of Campus France offices by country, which is how you find the office that sets your fee, your dates and your local practice.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "France-Visas",
            kind: "official",
            url: "https://www.france-visas.gouv.fr/en/",
            why: "The single official application point for French visas, and the page that carries the current financial threshold and the visa fee. The consular service decides your file and this is its front door.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official French sources that publish the procedure, the fees and the dates, and because they are the clearest available. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "fr-visa-appointment": {
    archetype: "visa",
    intro:
      "Every French visa application starts in France-Visas, whether it is a student visa or not, and the appointment itself is operated by an external service provider working for your consulate. The booking window is fixed: you cannot book an appointment more than six months before your programme starts, so this is a checkpoint you can be ready for long before you are allowed to act.",
    sections: {
      route: {
        body:
          "France-Visas is the single online point for French visa applications, and from there your file is routed to the consular service responsible for your place of residence. The appointment itself is handled by the external service provider that runs the counters for that consulate, which in many countries is TLScontact, and the appointment is with them rather than with the embassy directly.",
        points: [
          "You create a France-Visas account, complete the long-stay student visa application, and receive a reference number. That reference is what the appointment and the paper file are tied to.",
          "The appointment is booked with the service provider, not on the France-Visas site, and the provider for each country is named in the instructions. The two are separate systems and the booking link comes from the France-Visas instructions.",
          "The six-month rule is the defining constraint. The appointment cannot be booked more than six months before your programme start date, which means the window opens on a fixed date whether or not you are ready.",
          "Your file is assessed by the consular service, and the pre-consular attestation from Campus France is read as part of that assessment. That is why the attestation has to exist first, not alongside.",
        ],
        callout: {
          tone: "watch",
          title: "You cannot book early, however ready you are",
          body: "The six-month limit on booking is a hard rule. Students who have every document ready still have to wait for the window, and the window is a fixed date tied to the programme start.",
        },
      },
      documents: {
        body:
          "You upload digital copies to France-Visas and you carry paper copies to the appointment, and the second set is the one that is checked. Some consulates will not let you proceed without the paper originals.",
        points: [
          "The signed application form, printed from France-Visas, and the France-Visas receipt showing your reference number and the fee you paid.",
          "Your passport, and copies of the pages the consular service asks for.",
          "The EEF-Pastel pre-registration certificate and the confirmation email from Campus France. Both, because both appear on the checklist.",
          "Your proof of accommodation for the first three months of your stay, which since Decree 2026-526 of 22 June 2026 is required for international student visa applicants. It has to show an address and the period covered.",
          "Your evidence of financial resources, in the form the mission expects. This is the checkpoint where the monthly threshold is tested against your actual position.",
          "Your university acceptance letter, and your academic documents, in the form the checklist requires.",
          "Your language certification, where one is required, together with anything the pre-consular stage asked for.",
          "The evidence the service provider's own country page specifies. The checklists are country-specific, and the generic list is not a substitute.",
        ],
        callout: {
          tone: "watch",
          title: "Digital is for the file, paper is for the counter",
          body: "Uploading everything to France-Visas does not replace bringing the paper. Consular counters work off the printed file, and a missing paper document is a reason to send you away and book another appointment.",
        },
      },
      appointments: {
        body:
          "The appointment is where the file is checked, the fingerprints and the photograph are taken, and the fee and the forms are processed. The provider handles the counter, and the decision belongs to the consular service.",
        points: [
          "Book the earliest slot in the window once it opens. Slots in the weeks after a window opens go quickly, and the period just before a programme start is the busiest one of all.",
          "Arrive with everything, and arrive early. Provider centres in large cities have queues, and several of them will turn you away if you arrive at the time of your slot rather than before it.",
          "Biometrics are taken at the appointment, and for many applicants that includes fingerprints and a photograph on the service provider's equipment.",
          "The consular service may ask you questions. Some are about your study plan and your funding, and some are about why you are going to France rather than staying, which is the same question the Etudes en France interview asks.",
          "If the file is incomplete, you are usually told what is missing rather than simply refused, and you will need another appointment. The time cost of an incomplete file is a booking slot, not a penalty.",
        ],
      },
      money: {
        body:
          "Three amounts meet at this checkpoint, and only one of them is the visa fee. The fee itself is set by France-Visas, the proof of funds is the financial resources requirement, and the EEF fee was already paid to Campus France.",
        points: [
          "France-Visas lists a visa price of EUR 50 for countries and territories that use the Etudes en France procedure, and EUR 99 for the others, and it gives those figures as an indication rather than a guarantee. The amount payable is shown when you file.",
          "The proof of funds is a separate and much larger requirement, and it is checked at the same appointment. It is covered in detail in the financial checkpoint, and it is the one that actually needs planning months ahead.",
          "The consular service may also ask for proof that you have paid your tuition, or a first instalment, and for your health insurance. Those are additional to the visa fee and to the financial resources requirement.",
          "The cost of getting to the appointment is a real line in the budget, particularly where the service provider's centre is in a different city from where you live.",
        ],
      },
      rules: {
        body:
          "The rules that cause refused files are rarely about the documents themselves. They are about the order things were done in, the state of the accommodation proof, and the timing of the booking.",
        points: [
          "The Etudes en France attestation has to be issued before the consular file is assessed. Arriving with a university place, a language certificate and a full set of money and no attestation is a wasted appointment.",
          "The six-month booking rule is absolute, and so is its corollary: you cannot book earlier just because you are anxious, and you cannot be admitted without an appointment.",
          "The accommodation proof has to cover the first three months of your stay, with the address and the dates matching your programme start. An attestation d'hebergement that names a landlord but no period, or a period that starts after your course, does not do the job.",
          "Book your flight after the visa, not before it. This is the one that costs real money when it goes wrong.",
          "Keep the France-Visas reference number where you can find it. Every subsequent communication about your file is tied to it, and the paper file at the counter is organised by it.",
          "The application is assessed on the circumstances you have declared. If something material changes between filing and the appointment, tell the consular service rather than letting the two versions diverge.",
        ],
        callout: {
          tone: "watch",
          title: "Bring the accommodation proof as well as the money",
          body: "The three-month accommodation proof and the financial resources evidence are separate requirements that arrived in the same period, and students routinely bring one and forget the other. The counter checks both.",
        },
      },
      timing: {
        body:
          "This checkpoint has a fixed start and a variable end. The start is six months before your programme. The end is however long the consular service takes, which it publishes and which varies by country and by the completeness of the file.",
        points: [
          "Note the date your booking window opens, six months before the programme start, and put it in your calendar. Everything before that date is preparation time, not wasted time.",
          "Book the first reasonable slot once it opens. In countries where the service provider runs several centres, a slot in a nearby city is better than a later one in the capital.",
          "Campus France's own advice to start the pre-consular process 10 to 12 weeks before departure means the attestation is normally in hand well before the booking window opens. Check that it is, because the window does not wait.",
          "Allow time after the appointment for the decision, for the passport to come back, and for you to book travel. Campus France USA publishes 3 to 4 weeks of processing after the in-person submission, and it is explicit that this figure is specific to applicants filing in the United States. Other consulates publish different expectations.",
          "Your own consulate's page is the figure to use for planning. Treat any other country's processing time as information about that country, not about yours.",
        ],
        callout: {
          tone: "good",
          title: "Prepare early, book on time",
          body: "The window opens on a fixed date, so everything you can do before it is free. Assemble the file, sort the accommodation proof, prepare the funds evidence, and then book the first slot that appears.",
        },
      },
      resources: {
        body:
          "The France-Visas site is where the application is actually filed and where the fee and the threshold are published, and the Campus France guide explains how the two systems fit together. The service provider's site is where the appointment is booked.",
        resources: [
          {
            title: "France-Visas",
            kind: "official",
            url: "https://www.france-visas.gouv.fr/en/",
            why: "The official application portal for every French visa, and the place the current student visa fee, financial threshold and document list are published. You file here before you book anything.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "France-Visas: student visa",
            kind: "official",
            url: "https://france-visas.gouv.fr/en/etudiant",
            why: "The student-specific page, with the fee breakdown and what the service provider for your country is. Read it before you create the account, because it determines what you need to hand over.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Campus France USA: Student Visa Guide 2026-2027",
            kind: "official",
            url: "https://www.usa.campusfrance.org/system/files/medias/documents/2026-07/Campus%20France%20USA%20Student%20Visa%20Guide%20%282026-2027%29.pdf",
            why: "The full guide to the sequence, with the six-month booking rule, the document checklist for the appointment and the processing times. US-specific, so treat the timings as an example and the sequence as universal.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Campus France: student long-stay visa",
            kind: "official",
            url: "https://www.campusfrance.org/en/student-long-stay-visa",
            why: "The official explanation of the whole visa, from the pre-consular attestation to the appointment and the validation after arrival. The clearest short version of how France-Visas, Campus France and the consulate divide the work.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "TLScontact",
            kind: "official",
            url: "https://www.tlscontact.com/",
            why: "The service provider that operates the consular counters in many countries, and the site where the appointment is actually booked. Pick your country from the list to get the right centre and the right checklist.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official French sources, and the portals the application is actually filed and booked through. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "fr-proof-finances": {
    archetype: "visa",
    intro:
      "France publishes a minimum income that every long-stay student visa applicant has to demonstrate, and on 1 August 2026 it moved from EUR 615 a month to EUR 877.50 a month. The threshold is a floor, it is reviewed at least annually, and it is not the same thing as what a year in France actually costs.",
    sections: {
      route: {
        body:
          "The financial resources requirement is a consular test, applied when your long-stay student visa application is assessed. There are three ways to satisfy it: money you control yourself, a scholarship or funded programme that the mission accepts as covering your costs, or an attestation de prise en charge from a person in France who commits to supporting you.",
        points: [
          "The threshold applies to the applicant, and the way it is evidenced depends on which route you are on. What is common to all three is that the money has to be real, available, and documented in a form the mission recognises.",
          "A scholarship works when the mission accepts it, and the acceptance depends on the award. Some scholarships are recognised as covering the whole requirement, some count only in part, and some are treated as a sponsor's commitment rather than as your own funds.",
          "An attestation de prise en charge is a formal document from a host in France who undertakes to cover your costs. It is supported by the host's own income and accommodation evidence, and it is checked rather than taken at face value.",
          "Your own funds are the simplest route to document and the hardest to have at the right level, because the threshold is set at subsistence rather than at a realistic cost of living.",
        ],
      },
      documents: {
        body:
          "The evidence is checked at the consular appointment, and it is checked against a number, not against a narrative. Getting the documents right matters less than having the right total, so work the arithmetic first and collect the paperwork second.",
        points: [
          "Bank statements in your name, covering the period your mission expects and dated close to the appointment. An old statement set invites a request for a fresher one, and a request is weeks.",
          "Where the balance is held in a savings or term account, the supporting document for that account, so the money is visibly accessible rather than locked away.",
          "A scholarship award letter that states the amount, the payment schedule and the conditions, and where it is recognised as covering the requirement, evidence of that.",
          "An attestation de prise en charge from your host, with the host's income and housing evidence in support, in the form the mission requires.",
          "Proof of your tuition and your health insurance costs, where the mission asks for them as part of the same calculation rather than separately.",
          "The programme length, because the total is the monthly figure multiplied by the number of months your mission requires you to cover. Get this from the programme, not from an estimate.",
        ],
      },
      appointments: {
        body:
          "There is no appointment for the financial evidence itself. It is assessed at the consular appointment, which is where the bank statements are read and where a figure that does not add up is discovered in front of you.",
        points: [
          "Bring the statements as paper, printed and in date order, as well as uploaded. The counter works from the file you hand over.",
          "The arithmetic is checked quickly and a shortfall is spotted quickly, so have the total written out for your own reference before you travel.",
          "If you are relying on a sponsor, the sponsor's documents are part of your file and the sponsor may be asked for evidence separately, which takes time you do not control.",
          "Some consulates also ask about the origin of the money, and a sudden large deposit attracts a question. Having a simple, documented explanation ready is better than improvising at the counter.",
        ],
      },
      money: {
        body:
          "France-Visas states that because of an increase in the required income threshold for long-stay student visas, applications submitted from 1 August 2026 must show proof of income of at least EUR 877.50 per month. That replaced the previous EUR 615 a month, and the amount is reviewed at least annually, so the figure in force on the day you apply is the one that counts.",
        points: [
          "EUR 877.50 a month applies to applications submitted on or after 1 August 2026. The previous threshold was EUR 615 a month, and guidance written before that date is out of date on this specific point.",
          "The required total is the monthly figure multiplied by the number of months the mission expects you to cover, and that number is the length of your programme. The arithmetic is trivial and it is the step people skip.",
          "The threshold is a national figure, applied by every French mission, and it is not adjusted for the city you are going to. A student in Paris and a student in a smaller city are held to the same number, and the cost of living in the two is not the same.",
          "It is indexed. The figure is set against a reference point and reviewed at least annually by ministerial order, so the number you read today is the number today and not necessarily the number when you apply. Check France-Visas at the time you file.",
          "It is a subsistence floor, not a budget. It is below what most students actually spend, and it does not include the deposit and first month of rent on a flat, the semester contribution, travel, or a first week that begins before your first payment arrives.",
        ],
        callout: {
          tone: "watch",
          title: "EUR 877.50 is the floor, not the cost",
          body: "The threshold exists to show the consulate you will not become a charge on the state. Living in Paris on EUR 877.50 a month is not possible. Plan on spending well above it and treat the difference as the real budget.",
        },
      },
      rules: {
        body:
          "The rules below are the ones that turn a funded application into a request for more evidence, and the pattern in all of them is the same: the number has to be reached, and the paperwork has to show it.",
        points: [
          "The threshold applies to what is available, not to what you intend to spend. An income that has not yet been paid, or a scholarship that starts after your course, does not count for the months before it begins.",
          "The money has to be in your name, or properly attributed to you through a document the mission recognises. An informal arrangement with a family member is not evidence.",
          "Statements that are months old invite a request for fresher ones, and the request suspends the assessment rather than being resolved alongside it.",
          "The threshold changed on 1 August 2026, and it applies to applications submitted from that date, including renewals. An application filed before the change was assessed against EUR 615, and a renewal filed now is not.",
          "If you are sponsored, the sponsor's means are assessed as well as your own, and the sponsor's own financial documents are part of your file.",
          "The evidence you file has to be consistent with what you declared in the France-Visas application. A different income figure in the two places is treated as an error in one of them, and you will not be told which.",
        ],
        callout: {
          tone: "watch",
          title: "The number moves, so read it at the time you file",
          body: "EUR 877.50 a month is the figure published for applications from 1 August 2026, and it is reviewed at least annually. Read the current figure on France-Visas when you build your evidence, and again if you file late in the year.",
        },
      },
      timing: {
        body:
          "This requirement sits upstream of the appointment, so it has to be assembled in parallel with the rest of the file rather than after it. The number of months you have to cover is the number of months in your programme, which is known, so there is no excuse for a late calculation.",
        points: [
          "Work out the total first: the monthly threshold multiplied by the length of your programme in months. Then decide whether your route is your own money, a scholarship, or a sponsor, because each one has a different document set.",
          "Produce the evidence close to the appointment. Statements that are three months old at the point of filing are likely to need replacing, and replacing them is the thing that turns a two-week file into a two-month one.",
          "If a sponsor is involved, give them the document list early. They will need to produce their own income and housing evidence, and that takes longer than anything you do yourself.",
          "Keep the margin above the threshold visible in your own budget planning. The gap between the threshold and your real cost is the part that catches you in month one, and it does not appear anywhere in the visa file.",
          "If your programme length is not fixed, ask the mission what period it expects you to cover, and do not assume it is the same as your course. A preparatory year or a longer standard course changes the total.",
        ],
        callout: {
          tone: "good",
          title: "This is the one checkpoint that is pure arithmetic",
          body: "Monthly figure, times months, equals the total. Everything else about it is document collection. Do the arithmetic in one sitting, write the number down, and then treat the file as a straightforward gathering exercise.",
        },
      },
      resources: {
        body:
          "The threshold is published by France-Visas, and the local Campus France office publishes the country-specific guidance that tells you what form the evidence should take. Both are free and both are better than anything written by a third party.",
        resources: [
          {
            title: "France-Visas",
            kind: "official",
            url: "https://www.france-visas.gouv.fr/en/",
            why: "The official source for the current threshold, including the notice that applications submitted from 1 August 2026 need proof of at least EUR 877.50 a month. This is the number your file is assessed against.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "France-Visas: frequently asked questions",
            kind: "official",
            url: "https://france-visas.gouv.fr/en/faq",
            why: "The consular service's own answers on what counts as proof of financial resources, the visa fee and how the file is handled. It settles the questions that are not answered anywhere else.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Campus France: student long-stay visa",
            kind: "official",
            url: "https://www.campusfrance.org/en/student-long-stay-visa",
            why: "The official walkthrough of the visa including the financial resources requirement, with the order the documents are needed in. It shows what has to be ready before the appointment.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Campus France USA: guidance for student visa applicants",
            kind: "official",
            url: "https://www.usa.campusfrance.org/guidance-for-student-visa-applicants",
            why: "A local office's detailed guidance on preparing the visa file, including the funding evidence and the accommodation proof. Country-specific, so read your own office's version if there is one.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official French sources for the threshold and the evidence, and because they are the clearest available. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },

  "fr-visa-processing": {
    archetype: "visa",
    intro:
      "After the appointment the file goes to the consular service, and that is where the decision is made. This is the waiting part, and the thing that goes wrong in it is not usually the decision. It is the request for more documents, which suspends processing rather than running alongside it.",
    sections: {
      route: {
        body:
          "The long-stay student visa is a visa that is valid as a residence permit, called a VLS-TS. It is issued on a sticker in your passport, and once you arrive you validate it online with the French interior ministry, which converts it into your residence permit for the length of your stay.",
        points: [
          "The decision is the consular service's, made on the file. Your file is the Etudes en France attestation, the France-Visas application, the appointment, and everything you handed over at the counter.",
          "The visa is issued as a sticker and is then validated online after arrival. The validation is a separate administrative step with its own deadline, and it is the step that stops you being able to travel out of France in the first months.",
          "There is no separate visa for a master's, a doctorate or an exchange year, as long as the stay is long and the course is recognised. The programme and the length decide the route, and the VLS-TS covers it.",
          "Your passport is retained or returned depending on the mission's practice, and the arrangement is stated in the guide for your country. Some missions return it with the visa, some courier it, some hold it and you collect it.",
        ],
      },
      documents: {
        body:
          "After the appointment there is very little left to prepare, which makes the waiting period the wrong place for a surprise. What is worth doing in advance is knowing what you would have to produce if the consular service asks for more.",
        points: [
          "Your passport, wherever it is. If the mission has retained it, you will need to know how you get it back and what the arrangement is before you travel.",
          "The complete set of documents you handed over, kept in one place. A request for more documents usually asks for something that is already in the file in a slightly different form, and having the original to hand saves a trip to the consulate.",
          "Your proof of financial resources, in a version dated close to the appointment, in case the mission wants a fresher set.",
          "Your proof of accommodation, in case the mission wants the three-month document reconfirmed, which happens when the accommodation changes after the appointment.",
          "Your university enrolment or pre-enrolment confirmation, and your proof of tuition payment, in case the mission wants evidence that the course is real and paid for.",
        ],
      },
      appointments: {
        body:
          "There is normally no further appointment between the consular appointment and the decision. The interaction happens in writing, through the France-Visas account or through the service provider's system, and that is where a request for additional documents arrives.",
        points: [
          "A request for additional documents usually arrives by message in the France-Visas account or from the service provider. It is not a formality and it is not answered by a quick email, because the files themselves have to be re-submitted.",
          "Some consulates ask for a supplementary interview, and if that happens you will be given a date rather than a slot to choose.",
          "The online validation after arrival is not an appointment, but it is a deadline: the VLS-TS has to be validated within three months of arriving, and failing to validate restricts your ability to leave the country.",
          "Keep the contact details on your France-Visas account and your phone number working for the whole period. A missed message during processing is one of the more expensive kinds of missed message.",
        ],
      },
      money: {
        body:
          "The money has been spent by the time you reach this checkpoint, and the remaining money question is the one that arrives with the visa. The financial resources requirement has been assessed, the fees are paid, and now the money has to actually work for a year in France.",
        points: [
          "The visa fee was paid at the appointment, and the EEF fee was paid earlier. There is no further consular charge in the normal case, but there is a stay tax to pay when you validate the VLS-TS after arrival, and it is separate.",
          "The threshold you proved for the visa is a floor, and the real cost of living in the city you are going to is higher. Housing in the major cities is the largest single line and it is not in the visa calculation.",
          "Your university fees and the compulsory contributions, where they apply, are separate from the visa and from the financial resources requirement, and the international tuition tiers at French public universities differ by programme and by the fee the state sets.",
          "A scholarship, where you have one, is usually paid into your account in instalments against a schedule. Know the schedule before you arrive, because the first instalment rarely lands before you need money for the deposit on a flat.",
        ],
      },
      rules: {
        body:
          "The rules at this stage are about what happens if the file is not complete, and about what the visa actually permits once you have it.",
        points: [
          "A request for additional documents suspends processing. It is not a parallel task, and it is not a formality, and a file that goes quiet for a month has usually been sent back for something.",
          "Answer the request completely in one response. A partial answer produces a second request, and a second request is another cycle of weeks.",
          "The visa records what you were granted and for how long. If the dates on the sticker do not cover your whole programme plus your arrival margin, that is a problem to raise with the consular service, and it is easier to raise it before you travel.",
          "The VLS-TS has to be validated online after arrival, within three months, and the stay tax paid. Until it is validated, your right to travel outside France is restricted, and that is a real constraint on a course that involves a field trip or a conference.",
          "Do not book non-refundable travel until the visa is physically in your hands. A visa that arrives after the flight is a visa you cannot use and a cost you cannot recover.",
          "The visa does not authorise work beyond what the student regime allows, and the work rules are set by the current regulations rather than by your file. If employment is part of your plan, check the current position before you rely on it.",
        ],
        callout: {
          tone: "watch",
          title: "A quiet month is not necessarily good news",
          body: "Consular files go quiet when a request for more documents is outstanding. Check the France-Visas account and your messages every few days during the waiting period rather than assuming that no news means no news.",
        },
      },
      timing: {
        body:
          "Campus France USA publishes a processing time of 3 to 4 weeks after your in-person submission, and it is explicit that this figure is specific to applicants filing in the United States and that other consulates publish different expectations. Your own consulate's figure is the one to plan around, and the shape of the wait is the same everywhere.",
        points: [
          "Use your own consulate's published expectation. A figure published by another country's consulate is useful as a rough shape and misleading as a plan.",
          "Campus France's pre-consular guide for the United States describes a review of about three weeks from the TLS appointment date for the consular service, alongside a Campus France review of 3 days for an expedited service or 3 weeks for a standard one. Both clocks are running, which is why the attestation has to be done first.",
          "Add your own margin to the published figure. A request for documents adds a cycle, and the cycle is weeks rather than days.",
          "Plan the arrival around the visa, not the other way round. The visa, then the flight, then the first fortnight of registration and validation. Each of those is a week or more.",
          "The validation after arrival is a deadline on your own calendar, and it falls three months after you land. Put it in your calendar the day you book the flight, because it is the one administrative date in the whole process that nobody will remind you about.",
        ],
        callout: {
          tone: "good",
          title: "The waiting period is for preparing, not for refreshing",
          body: "Keep the folder complete, keep the file versions current, keep the deadlines you already know. The visa will arrive on its own schedule, and the things that go wrong in the meantime are all things you can prevent by keeping the paperwork ready.",
        },
      },
      resources: {
        body:
          "The official French sources for this stage are the consular service's own portal, the Campus France guide for your country, and the interior ministry's site for the validation you will do after you arrive.",
        resources: [
          {
            title: "Campus France USA: Student Visa Guide 2026-2027",
            kind: "official",
            url: "https://www.usa.campusfrance.org/system/files/medias/documents/2026-07/Campus%20France%20USA%20Student%20Visa%20Guide%20%282026-2027%29.pdf",
            why: "The guide that sets out the processing times and what happens after the appointment, and how the passport is returned. The timings are US-specific, so read the sequence rather than the clock.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "France-Visas",
            kind: "official",
            url: "https://www.france-visas.gouv.fr/en/",
            why: "The portal your application lives in, where requests for additional documents arrive and where the status of your file is tracked. This is the page to check every few days while you wait.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Administration of foreigners in France",
            kind: "official",
            url: "https://administration-etrangers-en-france.interieur.gouv.fr/particuliers/",
            why: "The interior ministry's site for the online validation of a long-stay visa after you arrive. It is the site where you will convert your visa into your residence permit, and it is worth knowing before you land.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Campus France: student long-stay visa",
            kind: "official",
            url: "https://www.campusfrance.org/en/student-long-stay-visa",
            why: "The official account of the whole visa, including the post-arrival steps and the validation deadline. It is the page that shows what is still ahead of you after the sticker is in your passport.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official French sources for the processing stage and for the step that comes after you land. We take no payment for placement, and we do not take payment for anything.",
        },
      },
    },
  },
};

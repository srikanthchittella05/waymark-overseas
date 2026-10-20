import type { GuideContent } from "../types";

const V = "2026-10-20";

/**
 * The housing dossier.
 *
 * Housing is the checkpoint where the plan stops being an academic document
 * and becomes an administrative one, and where the honest answer is usually
 * "it depends on the city and the university". There is no national housing
 * portal anywhere in this dossier, because there is no national housing
 * system either.
 *
 * Four things this dossier says in every country, because they are true in
 * every country:
 *
 *   1. UNIVERSITY HALLS ARE NOT GUARANTEED. In most of these systems, halls
 *      are either allocated, allocated by ballot, or simply full. Where a
 *      guarantee exists, it is usually for undergraduates.
 *   2. THE PRIVATE MARKET IS A DEPOSIT-AND-FIRST-MONTH MODEL. In some cities
 *      the deposit is a month of rent, in some it is a month and a half, and
 *      in Ontario it is the last month's rent. It is money you hand over
 *      before you have lived anywhere.
 *   3. THE CHEAPEST CONTRACT IS NOT ALWAYS THE CHEAPEST YEAR. In the UK, a
 *      contract quoted "bills not included" is cheaper on the headline and
 *      routinely more expensive over a year once the energy bill is added.
 *   4. THE VIEWING IS WHERE THE PROBLEMS ARE FOUND. A twenty-minute checklist
 *      at the viewing saves a month of emails at the end of the tenancy.
 */
export const HOUSING: Record<string, GuideContent> = {
  "us-housing": {
    archetype: "housing",
    intro:
      "US on-campus housing is first-come, first-served at many schools, is not centrally published, and is not guaranteed to anyone. Treat this as a planning default: apply the day your enrolment deposit clears, and have an off-campus plan ready for the possibility that the school is full.",
    sections: {
      options: {
        body:
          "There are three routes and, for most international master's students in the US, the third is the most likely. The order is worth understanding because the first is the cheapest and the most competitive, and the third is the most expensive.",
        points: [
          "On-campus housing. Residence halls, sometimes with a required meal plan, sometimes without. It is the cheapest option per square metre and the most expensive option per unit of hassle, and the places are genuinely scarce at popular schools. Some universities hold a proportion of places for international or new students, and some do not, so ask.",
          "University-affiliated off-campus housing. A block of apartments the university leases or manages, sometimes with a guaranteed term and a different set of rules from the private market. It is a middle option and it is easier to get than a hall place.",
          "The private market. A rented apartment or a room in a shared apartment, arranged by you. This is what most students end up with, and in a high-cost US city it is the single largest item in the budget and often the one the visa evidence is measured against.",
          "Commuting from further out. Real, and sometimes the cheapest option, and it changes the arithmetic of the whole year: a long commute has a time cost that does not appear in any budget.",
          "A housing waiver. If your school requires you to live on campus, there is normally a formal process to apply to live off it. Find out whether that process exists before you assume you can, because it usually requires a reason and sometimes a fee, and the deadline is earlier than the housing application deadline.",
        ],
        callout: {
          tone: "watch",
          title: "Halls are not guaranteed, and nobody will tell you they are",
          body: "Some schools publish a guarantee and some publish the opposite. The ones that publish nothing are the ones to plan around. If your housing depends on a place on campus, apply for it on day one and keep the off-campus plan funded and live, not theoretical.",
        },
      },
      timing: {
        body:
          "The US housing calendar is driven by the school, not by the country, and the only rule that holds everywhere is that the deadline moves earlier than you expect. Some schools run a first-come, first-served allocation; some run a lottery; some have both, with a first-come priority window and a waitlist after it.",
        points: [
          "Your enrolment deposit usually has to clear before the housing portal will let you apply at all. That means the housing calendar starts on the day you pay, not the day you are admitted, and the two deadlines are often close together.",
          "Priority for international students is real at some schools and absent at others. Where it exists, it is usually stated on the housing page, and where it does not, it does not exist.",
          "Waitlists are real and they move. If your school runs one, ask how it works, whether it is first-come or a lottery, and whether you are told the date of the next clearance.",
          "The off-campus market in US university towns turns over quickly in July and August, but so does everything else, including the good properties. If you are going off-campus, start looking in the spring rather than the summer, and be ready to sign quickly.",
          "Watch for the term-start date, not the semester date. Orientation and move-in sometimes happen a week or more before teaching, and a contract that starts on the teaching date leaves you somewhere else in that gap.",
        ],
        callout: {
          tone: "good",
          title: "Two dates, not one",
          body: "Write down the housing application deadline and the move-in date as separate entries. The gap between them is the period where you need a bed and do not yet have a lease, and it is the period most students underestimate.",
        },
      },
      money: {
        body:
          "US university housing is usually billed as part of the student account, which means it arrives with tuition rather than as a separate payment. The private market works differently, and it is where the cost surprises happen.",
        points: [
          "On-campus housing and meal plans are usually billed per semester or per quarter, alongside tuition. Ask which, because a per-quarter billing schedule changes when the first payment falls due. Check whether the meal plan is optional, because it is a large part of the total and it is often cheaper to eat off campus.",
          "On-campus housing is often cheaper than the private market in the same city, which surprises students who assume the opposite. It is also the option that constrains you least on the terms, because the lease is the university's.",
          "Private rent in US cities is usually advertised monthly, with a security deposit of one month's rent and the first month due at signing. Some landlords ask for a last month's rent as well, and that is worth negotiating. The deposit is usually refundable, subject to deductions, and it is still money you hand over before you have moved in.",
          "The costs nobody lists: utilities, internet, parking, renters insurance, and the furniture you need for a room that does not include it. A furnished room costs more in rent and much less in setup.",
          "Compare against the school's own estimate of living costs, because that estimate is what appears on your Form I-20 and what the visa is assessed against. If your real housing plan costs more than the estimate, you want to know that before you sign a lease, not after.",
        ],
        callout: {
          tone: "watch",
          title: "The rent is the visible half",
          body: "A US lease adds utilities, internet, parking, renters insurance and usually a first and last month's rent. Before you sign, write the total monthly cost on one line including everything. That number, not the advertised rent, is what your budget should contain.",
        },
      },
      viewing: {
        body:
          "You view in person whenever you possibly can, and you never pay money to hold a place you have not seen. That is the whole of the scam defence, and the rest of this section is what to check while you are standing in the room.",
        points: [
          "The lease, read before you sign anything. Rent, due date, the length, the deposit, the notice period, whether utilities are included, whether pets are allowed, and what happens if a housemate leaves. Read it once on the spot and once again when you are calm.",
          "The condition of the place, and how it is recorded. Photograph every room, every fitting and every existing mark on the day you move in, and send the photos to the landlord in writing on the day. Undocumented damage at the end of a tenancy is the single most common way a deposit disappears.",
          "Whether the numbers work. Read the meter if you can, ask who the utilities are in, and check the internet. US apartments often have no included internet at all, and a student who assumed otherwise spends the first week paying a setup fee.",
          "The practical things: how far it is to campus and to a supermarket, whether the building is secure at night, whether there is laundry on site, and what the neighbours are like at 11pm on a Friday. Ask the current tenants if you can.",
          "Never wire money to hold a place you have not seen, and never send a deposit to a landlord who will not let you view. The legitimate version of this is a holding deposit through a proper application process; the illegitimate version is a photo of a flat you have never visited and a request for a transfer.",
        ],
        callout: {
          tone: "watch",
          title: "The deposit is refundable only in writing",
          body: "Get the amount, the return conditions and the timescale in the lease before you pay it. 'The deposit will be returned at the end of the tenancy' in an email is not a commitment. A named amount and a named condition is.",
        },
      },
      resources: {
        body:
          "The US has no national student housing portal, so the authoritative material is the federal government's guidance on the student process and the national cost data. The housing itself is arranged with your school.",
        resources: [
          {
            title: "ICE SEVP: students",
            kind: "official",
            url: "https://www.ice.gov/sevis/students",
            why: "The official source for this milestone, and the federal page on the student file, including where your school's own offices are and how housing appears in the Form I-20 cost calculation.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study in the States: students",
            kind: "official",
            url: "https://studyinthestates.dhs.gov/students",
            why: "The Department of Homeland Security's own guide to the student process, and the place to see what the school expects of you between admission and arrival. Free, and it links out to the right office for everything else.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "College Scorecard",
            kind: "cost",
            url: "https://collegescorecard.ed.gov/",
            why: "The Department of Education's own cost data, including the cost of attendance and the published living-cost estimate for each school. It is the fastest way to sanity-check whether a school's own numbers are realistic before you commit your budget to them.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Department of State: student visa",
            kind: "official",
            url: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html",
            why: "The authority's own page on the student visa, including the requirement that you have accommodation or a concrete plan for it and the financial evidence rules. Read it before you sign a lease on the strength of a plan.",
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

  "gb-housing": {
    archetype: "housing",
    intro:
      "UK housing deadlines are set by each university and are not published centrally, so this is a planning default and you should check your own programme's accommodation page directly. And the headline number that catches students is this: the cheapest contract in the UK is usually the one that excludes the bills.",
    sections: {
      options: {
        body:
          "In the UK most postgraduate students end up in the private market, because university halls are not guaranteed at postgraduate level and the guaranteed allocation that exists for undergraduates often does not extend to you. Know the four routes before you start, because the guarantor requirement determines which ones are open to you.",
        points: [
          "University accommodation. Rooms in halls or in a university-owned building, allocated rather than sold, and at postgraduate level the allocation is usually competitive rather than guaranteed. The deadlines are set by the university and they are not central, so the only reliable source is your own programme's page.",
          "Approved private providers. Universities often run a scheme vetting private landlords and agents, and a list of them. The advantage is a known landlord and, sometimes, a simpler route to the paperwork you need for a visa.",
          "The open private market. The rightmove and SpareRoom market, plus the agencies. This is where most international postgraduates end up, and it is where the choice is greatest and the risk is greatest.",
          "The guarantor. Almost every UK landlord will ask for a UK-based guarantor for an international student who is not a UK citizen, unless your university runs a guarantor waiver scheme or the tenancy is a purpose-built student accommodation contract with a different rule. If you need a guarantor, that narrows your options immediately, and it is worth asking your university about a waiver scheme before you start looking.",
          "Purpose-built student accommodation. Private operators building for students, with bills usually included and often a guarantor not required on some contracts. It is more expensive and it removes most of the risk, and in a tight city it is often the difference between a room and no room.",
        ],
        callout: {
          tone: "watch",
          title: "Halls are not guaranteed for postgraduates",
          body: "Where a guarantee exists, it is usually for undergraduates, and for international students the priority is usually a stated policy rather than a right. Read your own programme's allocation policy, and start the private search in parallel rather than after the hall result comes back.",
        },
      },
      timing: {
        body:
          "The UK housing year runs on the academic year, and the pressure is at the start of it. For a September intake, the market in most university cities is at its tightest in the summer, and the best-value rooms go before the worst months, not in them.",
        points: [
          "Register for your university's accommodation alerts the day your offer arrives. The alert list is how the university tells you the portal has opened, and the portal opening is the deadline that matters.",
          "The private market moves continuously and is generally open before the university portal. There is no reason to wait for the hall result, and every week you wait is a week of properties going.",
          "For a September start, aim to have a signed contract by the end of the spring term at the latest, and earlier if you are in London or Manchester. You can view and apply well before you arrive, and you can sign a contract months ahead of the start date.",
          "Scarcity follows the calendar. Rooms for a September intake are hardest to find in June and July, and easier in February, and the difference is not only price but condition: the places that survive until late summer are the ones nobody wanted.",
          "Watch for the start-date problem. Some landlords will not let you move in before the tenancy starts, and some tenancies start on the 1st while the course starts in the middle of the month. Ask for the earliest permitted move-in date in writing before you sign anything.",
        ],
        callout: {
          tone: "good",
          title: "Apply before the portal opens",
          body: "You do not have to wait for the university housing portal to start looking at the private market. Set up the alerts, work out your budget per week, and view properties as they come up. The students who end up with good rooms in a tight city are the ones who were ready to sign in April.",
        },
      },
      money: {
        body:
          "UK rent is quoted weekly, which makes it look smaller than it is, and the bills are the part that changes the arithmetic. The cheapest-looking contract in the market is frequently the most expensive one over a year.",
        points: [
          "Rent is quoted per week and the deposit is usually a multiple of it. In England the law caps the security deposit at five weeks' rent for tenancies with an annual rent up to 50,000 pounds and six weeks above that. A deposit larger than the cap is not legal, and a landlord asking for one is telling you something.",
          "The cheapest contract is usually the one that excludes bills. 'Bills not included' means you pay for electricity, gas, water, internet and usually council tax on top, and in a shared house those costs are shared with people whose habits are not yours. A slightly higher rent with bills included is often cheaper over a year and always easier to budget.",
          "The deposit must be protected. In England and Wales, a landlord taking a deposit on an assured periodic tenancy has to place it in a government-approved tenancy deposit scheme within 30 days, and must give you the prescribed information showing where it is and how to claim it back. The approved schemes are the Deposit Protection Service, MyDeposits and the Tenancy Deposit Scheme, and the gov.uk page lists all three. Scotland and Northern Ireland have their own schemes.",
          "Other up-front costs: the first month's rent, a holding deposit of at most one week's rent which comes off the rent if you sign, and the cost of the inventory or the reference check. Some landlords charge an administration fee for a guarantor, and some charge a fee for a guarantor at all.",
          "Rent is quoted 'per person per week' and it is a property price divided by the number of occupants, which is not the same as what you will pay. A room in a six-person house in London is priced per room, and the price you see is for the room, not the person.",
        ],
        callout: {
          tone: "watch",
          title: "Bills not included is not the same as cheap",
          body: "Take a contract quoted 'bills not included' and add a realistic energy bill for a share house, plus internet, plus water and council tax. A contract that looked 15 per cent cheaper can easily cost more over a year, and it is the one that surprises students in January when the first energy bill lands.",
        },
      },
      viewing: {
        body:
          "View in person whenever you can, and if you cannot, ask for a live video walkthrough and a recent set of photos. Then check the things below. In the UK a viewing is also where you find out what the neighbours are like, which matters more than any fixture and fitting.",
        points: [
          "The licence and the agreement. In England this is a licence to occupy, not a tenancy, and the terms are set out in the agreement. Read for the notice period, the break clause, whether the deposit is protected and by whom, and what happens to the deposit if you leave.",
          "The deposit protection certificate. Ask to see it, or ask the landlord for the prescribed information, which names the scheme and the deposit amount. If the deposit is not in a government-approved scheme, that is a problem to solve before you pay, not afterwards.",
          "The meter readings and the bills. Ask who the energy supplier is, whether the bills are in the current tenant's name, and what the account looks like at handover. A house with an outstanding energy debt is a house you inherit the problem of.",
          "The condition. Photograph everything, check the smoke and carbon monoxide alarms work, check the damp on the walls and around the windows, and check the heating actually heats the whole flat. In a British winter, a heating question is worth more than a kitchen question.",
          "The neighbours and the building. Ask who else lives there, what the building's rules are, what the neighbours do about noise, and when the bins go out. Then stand outside at about 10pm on a weekday if you can. It is the cheapest information you will get.",
        ],
        callout: {
          tone: "watch",
          title: "Never send money before you have seen the property",
          body: "A landlord who will not let you view, or who asks for a bank transfer to hold the room, is either in a hurry or not a landlord. View in person, sign the agreement, pay through the method the agreement names, and get the prescribed deposit information in your own name.",
        },
      },
      resources: {
        body:
          "The Home Office publishes the rules that govern the tenancy and the deposit, and the Office for National Statistics publishes the rent data. Between them they are more reliable than anything an agency will tell you.",
        resources: [
          {
            title: "GOV.UK: student visa",
            kind: "official",
            url: "https://www.gov.uk/student-visa",
            why: "The official source for this milestone and the authority's own page on the student route, including the requirement for accommodation evidence and the money rules. It is the document the visa application is decided against.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: tenancy deposit protection",
            kind: "official",
            url: "https://www.gov.uk/tenancy-deposit-protection",
            why: "The government-backed deposit protection rules, the three approved schemes in England and Wales, the 30-day deadline for the landlord to protect the deposit, and the separate schemes for Scotland and Northern Ireland. Read this before you pay a deposit.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "GOV.UK: private renting",
            kind: "official",
            url: "https://www.gov.uk/private-renting",
            why: "The government's guide to renting privately, covering your rights, the landlord's obligations and what to do when something goes wrong. It also explains the 1 May 2026 change that replaced assured shorthold tenancies with assured periodic tenancies.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ONS: private rent and house prices",
            kind: "cost",
            url: "https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/privaterentandhousepricesuk/latest",
            why: "The official monthly rent data for the UK and for every region, published monthly. It is how you check whether a listing is priced sensibly for its area rather than how it compares to the advert.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Housing Ombudsman",
            kind: "official",
            url: "https://www.gov.uk/government/organisations/housing-ombudsman",
            why: "The independent body that handles disputes between landlords and tenants where the landlord is a member. The place to go when something has gone wrong and you need the route, not the law.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Ofgem: energy price cap",
            kind: "official",
            url: "https://www.ofgem.gov.uk/energy-price-cap",
            why: "The published cap on unit rates for energy, which is the number to use when you are working out what a 'bills not included' contract actually costs. It changes every quarter, so read the current one.",
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

  "ca-housing": {
    archetype: "housing",
    intro:
      "Many Canadian universities guarantee housing for incoming undergraduates and not for graduate students, so apply early and treat the deadline as university-set rather than centrally published. The private market in Canada has its own model, and it usually starts with a deposit before you have moved in.",
    sections: {
      options: {
        body:
          "Canadian university housing is usually a residence building with a meal plan and a single room, and it is priced and structured very differently from the private market. Which one you end up in changes your monthly cost by a very large amount, so it is worth understanding the trade before you apply rather than after.",
        points: [
          "University residence. Single rooms in residence buildings, usually with a meal plan included or optional, and usually billed by term. Some universities guarantee residence for incoming undergraduates. At graduate level, allocation is commonly competitive or application-based, and the supply is limited.",
          "Graduate-specific housing. A number of large universities run graduate residence or graduate-only housing, sometimes family housing for students with dependants. It is worth asking whether your faculty operates one, because it is often cheaper than the private market and better located.",
          "Shared private rental. A room in a shared apartment, or a whole apartment shared with other students. This is the standard route for graduate students who miss out on residence, and it is where the private-market model applies: a deposit, usually the last month's rent, and often the first month's rent at the same time.",
          "A homestay or a host family. Real and available in some cities, particularly around some universities, and usually with utilities and sometimes meals included. It is a genuine option for a first term if you arrive without a roommate.",
          "The rent and the deposit are separate conversations. A low rent with a large deposit is not a cheap room, and a room that needs a large deposit usually reflects a landlord who has been burned or a market where the rules are looser. Ask for both before you decide.",
        ],
        callout: {
          tone: "watch",
          title: "Ask whether your guarantee covers graduate students",
          body: "The word 'guaranteed' is doing a lot of work in Canadian university housing pages, and it usually refers to undergraduates in residence. For graduate students the honest answer is usually that housing is not guaranteed and the deadline is real. Ask the housing office directly and get the answer in writing.",
        },
      },
      timing: {
        body:
          "Canadian university housing applications have deadlines that are set by each institution, usually earlier for the main round and later for a waitlist. The private market runs all year, and the pressure in a September intake builds through the summer.",
        points: [
          "Residence applications usually close early, often in the spring for a September start, and popular faculties or programmes can have internal deadlines before the university-wide one. Check whether your department has its own.",
          "Waitlists are real and they clear. Ask how the waitlist works, whether it is first-come or a lottery, and when the next clearance happens. Many students get a room in June after being waitlisted in April.",
          "The private market in a September intake gets tight from about June. The pattern is the same as in most markets: the best-value rooms go first, the worst months are when the remaining stock is cheap because nobody wanted it.",
          "Arrival dates matter for the private market. A landlord usually wants the tenancy to start on the 1st, and a course starting on the 15th means either paying for half a month you cannot use or arranging a short stay elsewhere for the first fortnight.",
          "Some graduate faculties ask for a housing form as part of a funding or bursary application, and the form is a condition of the award rather than of the place. If that applies to you, the housing deadline is a money deadline.",
        ],
        callout: {
          tone: "good",
          title: "Work out your monthly total before you apply",
          body: "Residence rent plus a compulsory meal plan is not comparable to a private room plus groceries. Write both as one monthly number including utilities, and then apply to both. It is the only way to compare them honestly, and the answer is often not the one people expect.",
        },
      },
      money: {
        body:
          "The Canadian private market has its own conventions, and they are governed by provincial law rather than by a national rule. The deposit convention is the one that surprises students from other countries most.",
        points: [
          "The last month's rent as a deposit is a standard Ontario convention, and the rules around it are specific: a landlord can collect it, it can only be used for the last month's rent and not for damage, and the landlord must pay interest on it each year at the guideline rate. In other provinces the conventions differ, so check your province's rules rather than assuming Ontario's.",
          "First month's rent is usually also due at signing, so the cash needed to move into a private room is often two months' rent before you have paid anything else. Budget the deposit plus the first month plus any utility setup.",
          "Rent is quoted monthly and it excludes heat in some buildings, which is a real and sometimes large winter cost. Ask whether heat is included and, if it is not, what the building's average heat bill has been.",
          "University residence costs are published and predictable: the room rate, whether the meal plan is compulsory, and what it does not cover. This predictability is the main argument for residence, and it is a real one.",
          "The national data is published and worth using. CMHC's Rental Market Report gives vacancy rates and average rents for the major Canadian centres by city, which is how you tell whether a listing is priced sensibly for its neighbourhood.",
        ],
        callout: {
          tone: "watch",
          title: "Two months of rent before you have moved in",
          body: "In Ontario the deposit is the last month's rent and the first month is due at signing, so roughly two months' rent leaves your account on day one. Write that number into the budget as a fixed starting cost, and remember it is refundable money rather than a fee, which does not make it affordable.",
        },
      },
      viewing: {
        body:
          "A viewing in Canada is also where you check the house, the lease and the landlord, and in Ontario it is where you check the landlord is registered. You are entitled to ask, and a landlord who is not registered is telling you something important.",
        points: [
          "The lease, read on the spot. Rent, due date, the term, the deposit, who is on the lease, what utilities are included, and whether heat is included. In Ontario the Residential Tenancies Act sets out the standard terms, and any agreement must follow it.",
          "The landlord and the building. In Ontario a landlord must be registered with the RentSafeTO registry and their contact details must be in the lease. You are entitled to the current registry information, and a landlord who will not provide it is a landlord to walk away from.",
          "The condition of the place. Photograph everything on the day you move in, check for damp and for pests, check the windows and the locks, and confirm the heating and the hot water work. Put the photographs and the condition notes in an email to the landlord on the day.",
          "The roommates. If you are moving in with people you have not lived with, agree the rules before you sign: cleaning, bills, guests, quiet hours, and what happens if one of them leaves mid-term. The lease usually makes you jointly liable for the whole rent, which means one person leaving leaves the rest of you paying.",
          "The neighbourhood at the times you will actually live there. Walk to campus at 8am and at 9pm. Ask the current tenants what the heating bill was in winter, if you can ask without it being awkward.",
        ],
        callout: {
          tone: "watch",
          title: "Joint and several liability is the rule, not the exception",
          body: "When several people sign one lease for a shared property, each of you is usually responsible for the whole rent. If one housemate leaves or does not pay, the landlord can pursue the others for the full amount. This is the standard Canadian arrangement and it is the thing to discuss with your housemates before you sign, not after.",
        },
      },
      resources: {
        body:
          "The federal government's pages cover the study permit and the housing evidence you need for it, and the national housing data and the provincial tenancy boards are where the rules and the numbers actually live.",
        resources: [
          {
            title: "Canada.ca: study in Canada",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html",
            why: "The official source for this milestone and the immigration authority's overview of studying in Canada, including what it says about accommodation and the evidence you will need. The starting point before anything else.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "CMHC: rental market report",
            kind: "cost",
            url: "https://www.cmhc-schl.gc.ca/professionals/housing-markets-data-and-research/market-reports/rental-market-reports-major-centres",
            why: "The national housing agency's published vacancy rates and average rents for the major Canadian centres, by city. It is how you tell whether a listing is a fair price for its area or a trap.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Tribunals Ontario: Landlord and Tenant Board",
            kind: "official",
            url: "https://tribunalsontario.ca/ltb/",
            why: "The Ontario body that resolves landlord and tenant disputes, and its guides on the Residential Tenancies Act, including the rules on rent deposits, rent increases and what a landlord may and may not do. Free legal information, not legal advice.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Canada.ca: study permit",
            kind: "official",
            url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html",
            why: "The authority's own page for the permit, including the document list. Housing evidence is part of it, and the address you give has to be the address you can actually live at.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Canadian universities directory",
            kind: "site",
            url: "https://www.canadianuniversities.ca/",
            why: "A searchable directory of institutions and programmes, useful for comparing what different universities offer at similar prices when you are choosing between offers in different cities.",
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

  "au-housing": {
    archetype: "housing",
    intro:
      "Housing deadlines in Australia are set by each university and are not published centrally, so this is a planning default. On-campus places at popular providers are genuinely scarce, and the well-documented shortage in Australian cities at the start of semester is the reason to apply in March rather than in August.",
    sections: {
      options: {
        body:
          "There are three routes and, depending on the city, they can differ in cost by a factor of two. The on-campus option is the cheapest and the scarcest, and in a city where the universities are the largest employers, the private market competes with the students for the same stock.",
        points: [
          "University accommodation. Halls and colleges, sometimes with a meal plan, sometimes self-catered, and sometimes with a contract attached for international students. It is cheaper and better located, and the places are genuinely scarce. Some providers prioritise international students, some prioritise seniors, and some say nothing, which usually means the applications are read together.",
          "Private rental, shared. A room in a shared house or flat with other students. This is the standard route for graduate students who do not get a college place, and it is where the bond and the rent in advance model applies.",
          "Private rental, whole. A one or two bedroom flat to yourself. Expensive relative to a shared room, and for most students in most cities it is only worth it for the last term, when you want quiet and control.",
          "A homestay or a private provider aimed at students. Usually furnished, usually with bills included, usually more expensive than the open market and often with a simpler, more predictable contract.",
          "Where you are located matters more than the type. In a city where the universities dominate the rental market, the same flat is priced on the academic calendar, not the housing one. A term-time city is expensive from July and cheap in February, and that is not a coincidence.",
        ],
        callout: {
          tone: "watch",
          title: "The city is in a permanent academic peak",
          body: "Australian university cities have a housing market that rises with the academic calendar and does not really fall back. The stock is built for a few thousand extra residents who stay for years, not for a cohort that arrives and leaves. That is why a place signed in March is often cheaper than the same place signed in July.",
        },
      },
      timing: {
        body:
          "Australian housing applications open once the provider has confirmed your enrolment, and the deadline is the provider's. The pattern is consistent: applications open early in the year for a semester two start, close before the semester begins, and the allocations are competitive rather than first-come.",
        points: [
          "Register for the provider's housing portal the day your enrolment is confirmed. Many providers will not process an application from a student whose enrolment is not final, which means the enrolment step gates the housing step.",
          "On-campus allocations are usually by ballot or by a points system rather than strictly first-come. NTU states plainly that applications are processed by electronic balloting subject to room availability, and that they are not processed on a first-come, first-served basis, which is worth knowing before you assume speed wins.",
          "The private market opens early and stays open, but the good-value stock goes in the southern winter, which is the northern summer. For a July or August start, signing in April or May is the difference between a good share and a bad one.",
          "For a semester two start, the housing market is different. Fewer students arrive, more flats are free, and prices are lower. If your course starts in July, you are entering the easiest market of the year.",
          "Have the private option ready to move on. Providers publish their own advice about what to do if the application is unsuccessful, and the answer is normally to have a private plan running in parallel rather than to wait for a waitlist to clear.",
        ],
        callout: {
          tone: "good",
          title: "Apply in the first round, not the first week",
          body: "If the provider runs a ballot, applying early does not win you a better room, but it does guarantee you are in the ballot rather than waiting for a second one. Read how your provider allocates, because 'first-come, first-served' and 'ballot' lead to completely different behaviours.",
        },
      },
      money: {
        body:
          "Australian rent is quoted weekly, the bond is set by state law, and the first fortnight always costs more than an ordinary fortnight because the bond and the rent in advance land together.",
        points: [
          "Rent is quoted per week and paid weekly or monthly. The advertised figure is the base rent; council rates or water charges may be billed separately, or included, and the listing should say which.",
          "The bond is a security deposit, and its maximum is set by the law of the state or territory the property is in, not by the landlord. In New South Wales the residential bond is capped at four weeks' rent and is held by the state, not by the landlord, and in Victoria it is usually capped at one month unless the property meets specific criteria. Different states, different rules, and each state's tenancy authority publishes them.",
          "Rent in advance is part of the model. NSW landlords may ask for up to two weeks' rent in advance, and Victorian rules require the bond to be lodged with the state authority before you move in, which means paperwork with a lead time.",
          "Bills are usually not included. Electricity, gas, water, internet and contents insurance for a shared house are all separate, and a flat with no gas is a flat with no gas water heating, which in an Australian summer and winter both matter.",
          "Budget the move-in: the bond, the first rent, the utility connection, the transport card, the contents insurance and the first fortnight's groceries and household items. The move-in fortnight routinely costs twice a normal fortnight.",
        ],
        callout: {
          tone: "watch",
          title: "The bond is money you do not get back on the day you leave",
          body: "A bond is not a fee, but it is cash out of your account for the length of the tenancy, and in a tight market it is what makes a place affordable or not. Some students arrive unable to cover the bond and the first rent together, which is a housing problem rather than a budgeting one.",
        },
      },
      viewing: {
        body:
          "View in person if you can, and if you are applying from overseas, ask for a live video walkthrough with the meter and the condition report shown. In Australia the condition report is the document that decides whether you get your bond back, and it is worth seeing it before you sign rather than after.",
        points: [
          "The lease, read on the spot. Rent, the bond, the term, the start date, the notice period, whether rent must be paid in advance and how much, what utilities are included, and what the rules are about the property.",
          "The condition report. Under the Australian states' tenancy rules, the provider must complete a condition report and give every renter a copy before they move in. Read it during the viewing, write your notes on it, and make sure both copies are signed. This is the single most important document in the whole tenancy.",
          "The deposit or bond receipt. If you pay a bond, ask for the receipt and check the bond has been lodged with the state authority rather than kept by the provider, and check how to claim it back at the end.",
          "The property itself. Check for damp, mould, pests and poor water pressure. Check the air conditioning, because in Australia it is not a luxury, and check the hot water system and how it is heated. Check the windows and the locks. Check the oven, because a broken oven is the most common thing students discover after the first shop.",
          "The area and the commute, at the times you will live there. Look at where you will actually walk at 9pm, and whether the bus or train is still running when your lecture ends. Also check mobile reception in the house, because Australian mobile coverage is patchy in some areas and a lot of university life runs on the phone.",
        ],
        callout: {
          tone: "watch",
          title: "Sign the condition report at the viewing",
          body: "Write on the condition report any damage you can see, even if it looks minor, and photograph everything with a dated file. At the end of the tenancy, the condition report is what the bond is assessed against, and an undocumented mark becomes a deduction.",
        },
      },
      resources: {
        body:
          "Australia's rules on renting are state-based, which means the authoritative pages are the state tenancy authorities. The federal pages cover the visa and the living costs.",
        resources: [
          {
            title: "Home Affairs: Student visa subclass 500",
            kind: "official",
            url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
            why: "The official source for this milestone and the authority's own page on the student visa, including the requirement for genuine accommodation and the financial capacity test your housing costs feed into.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study Australia: accommodation",
            kind: "official",
            url: "https://www.studyaustralia.gov.au/en/life-in-australia/accommodation",
            why: "The Australian Government's guide to housing options for international students, covering the college, private and homestay routes and the practical differences between them. The clearest starting point.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study Australia: living and education costs",
            kind: "cost",
            url: "https://www.studyaustralia.gov.au/en/life-in-australia/living-and-education-costs",
            why: "The government's published cost data for living in Australia, including the typical weekly spend on accommodation and food. Use it to sanity-check a city, not to price an individual lease.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NSW Fair Trading: residential tenancy agreements",
            kind: "official",
            url: "https://www.nsw.gov.au/housing-and-construction/rules/residential-tenancy-agreements",
            why: "The state authority's own rules on tenancy agreements, including the standard terms, the bond limits, rent in advance and the recent changes. It is the specific rulebook rather than the general guidance.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NSW Fair Trading: signing a lease and moving in",
            kind: "official",
            url: "https://www.nsw.gov.au/housing-and-construction/renting-a-place-to-live/starting-a-residential-tenancy/signing-a-lease-and-moving",
            why: "The step-by-step of what happens between an approved application and the day you get the keys, including the condition report, the bond and the utilities. It reads like a checklist because it is one.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NSW Fair Trading: residential rental bonds",
            kind: "official",
            url: "https://www.nsw.gov.au/housing-and-construction/renting-a-place-to-live/residential-rental-bonds",
            why: "How the bond is held by the state rather than the landlord, how to check it has been lodged, and how to claim it back or transfer it when you move. Useful even outside NSW, because the mechanism is worth understanding.",
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

  "de-housing": {
    archetype: "housing",
    intro:
      "Student housing in Germany is genuinely scarce and typically allocated, with no national deadline. Apply to your university residence and several city providers in parallel the moment you have your admission, because the allocation runs on its own calendar and it does not wait for your visa.",
    sections: {
      options: {
        body:
          "German student housing has four routes, and the first two are much cheaper than anything else you will find in the country. The catch is that they are allocated and there are not enough of them, so the strategy is breadth rather than persistence.",
        points: [
          "The university's own residence service, or Studentenwohnheim. Rooms in university-owned buildings, allocated rather than sold, and usually cheaper than the private market. Some places are prioritised for students who have financial need, are from abroad, are disabled, have dependants, or are in their later stages of study. Every university publishes its own allocation criteria and they are worth reading carefully.",
          "City and state housing portals. These are the fastest route to a room and they cover the Studenten-WG market, where a student rents a room in a shared flat from another student. The portals open in rounds, usually in spring for the winter semester, and the applications are short.",
          "A room in a private shared flat, a WG. This is what most students who miss the allocated places end up with, and it is still cheap relative to the rest of western Europe. The contract is a Mietvertrag with a Hauptmieter, who is your landlord and who remains liable for the whole flat.",
          "A room in a shared flat where you are the Hauptmieter yourself, which is a step up in responsibility and usually a step down in price. It is worth doing if you are staying more than a year and you are comfortable with the tenancy obligations.",
          "Interim accommodation. A hostel or a hotel for the first weeks, which is a normal and accepted part of arriving in Germany rather than a failure. Budget for it, because you will probably use it.",
        ],
        callout: {
          tone: "watch",
          title: "Allocation criteria decide this, not availability",
          body: "In German student housing you often do not get a room because someone else had better criteria. The criteria are published and they differ by city and by university: financial need, country of origin, disability, dependants, length of stay, and academic year. Read the criteria for the specific residence you are applying to, because that is what is being assessed.",
        },
      },
      timing: {
        body:
          "There is no national deadline, and the German year runs on the semester, with the winter semester starting in October and the summer semester in March. The allocation rounds for the winter semester happen in the spring, and the good rooms are gone well before the semester starts.",
        points: [
          "Apply to the university residence immediately after admission. Applications are usually open for a defined window and they close, and missing the window means missing the round entirely rather than joining a queue.",
          "City portals run their own rounds, usually in the spring for the winter semester. Some accept applications continuously, and the ones that do are worth monitoring weekly, because rooms appear and vanish in days.",
          "The visa timeline and the housing timeline do not fit together neatly. The residence permit application needs an address, and the address needs a lease, and the lease usually needs a deposit and a guarantor or a student proof. Work backwards from the arrival date and assume the lease takes a fortnight to complete.",
          "For a summer semester start, the market is much quieter and the prices are lower, because the academic peak has not arrived. If you have any flexibility at all, a summer start in Germany is a cheaper place to live.",
          "Do not wait for the visa before you apply for housing. Most landlords do not ask for a visa, and most residences will not ask for one, because they are allocating places to people who will need the visa later.",
        ],
        callout: {
          tone: "good",
          title: "Apply before you have the visa",
          body: "The residences and the city portals allocate to students who have been admitted, not to students who have arrived. Waiting for the permit to start the housing search inverts the sequence and costs you the best rooms in the round.",
        },
      },
      money: {
        body:
          "German student rent is low compared with the rest of western Europe, but the range within Germany is enormous. A shared room in a small town and a room in Munich are not the same country as far as your budget is concerned.",
        points: [
          "Rent is usually quoted as a monthly Kaltmiete, which is rent without the utility and service charges, and the Nebenkosten are added on top. A listing quoting 300 euros a month is usually quoting 300 euros plus whatever the Nebenkosten turn out to be, and they are billed annually, not monthly.",
          "Student housing usually includes utilities, heating and internet in the rent, which is why a university residence at 300 euros can cost less than a private room at 250. Check what is included before comparing two numbers.",
          "The deposit, or Kaution, is commonly two or three months' cold rent and is held by the landlord for the length of the tenancy. It comes back when you leave, subject to deductions, and it has to be in your account on day one. This is the German equivalent of the Canadian last month's rent model and it is a real cash requirement.",
          "The semester contribution is separate and it is set by each university. It bundles the student services fee, the semester ticket and usually local transport, and it is a few hundred euros a semester.",
          "Add the things that are easy to forget: the deposit, the semester contribution, the health insurance, the visa fee, a bicycle in a country where students ride everywhere, and the first month, which is bigger than an ordinary month because it includes the deposit and the setup.",
        ],
        callout: {
          tone: "watch",
          title: "Kaltmiete is not rent",
          body: "A German listing quoting 300 euros is quoting the base rent. The Nebenkosten are billed separately and can be a substantial share of it, and they are reconciled against the actual bills at the end of the year, which means a first payment based on an estimate is not always the final one.",
        },
      },
      viewing: {
        body:
          "Viewing a WG room in Germany is a conversation rather than an inspection, and the things worth checking are the contract, the Nachhilfe arrangements, the Nebenkosten and the neighbours. The German tenancy rules make several of these obligations explicit.",
        points: [
          "The contract. For a shared flat, check whether you are on a Mietvertrag with the Hauptmieter or a separate Einzelmietvertrag, what the notice period is, whether the room can be sublet, and what happens to the contract if the Hauptmieter leaves. For a room in a Studentenwohnheim the contract is with the city or the university and has its own rules.",
          "The Nebenkosten and what is in them. Ask for the last year's figures, because they are normally disclosed and they show the real cost of living in the flat. Heating, water, electricity, internet and rubbish collection are usually in there, and the Hausmeister who handles repairs is paid out of it.",
          "The Hausordnung, the house rules. It covers noise, cleaning rotas, rubbish, guests and pets. Read it, because it is the thing that produces arguments at 1am in a shared flat, and in a Studentenwohnheim it is more or less a small constitution.",
          "The room itself: the size of the bed, the size of the desk, the wardrobe, the window and whether it opens, the heating, the state of the bathroom and whether it is shared or not, and the internet connection. In a shared flat the kitchen and bathroom are where the real information is.",
          "The neighbours and the noise. Ask the current flatmates, and ask when people cook and when people come home. The reason student housing is cheap is that it is full of students, and that is also its one genuine drawback.",
        ],
        callout: {
          tone: "watch",
          title: "The Hauptmieter is your landlord",
          body: "In a student shared flat you usually rent from a student, not from a property company, and that person remains responsible to the real owner for the whole flat. It usually works well, and it also means your contract is with a person rather than an organisation, which is worth understanding before you sign.",
        },
      },
      resources: {
        body:
        "The Federal Foreign Office's own site covers the arrival formalities, and the university and city pages cover the allocation. There is no national student housing portal in Germany, and there is not one anywhere else either.",
        resources: [
          {
            title: "Make it in Germany: study in Germany",
            kind: "official",
            url: "https://www.make-it-in-germany.com/en/study/study-in-germany",
            why: "The official source for this milestone and the Federal Foreign Office's own guide for international students, covering the visa, the blocked account, enrolment and arrival in the order they happen.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Make it in Germany: student housing",
            kind: "official",
            url: "https://www.make-it-in-germany.com/en/study/study-in-germany/student-housing",
            why: "The official explanation of the German student housing market: the residence services, the city portals, the shared flats, and why the allocation runs on its own calendar. It is the clearest short explanation in English.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Make it in Germany: register your address",
            kind: "official",
            url: "https://www.make-it-in-germany.com/en/living-in-germany/register-address",
            why: "The registration, or Anmeldung, that you have to do within a set period of arriving and that the bank account and the residence permit both need. Read it before you arrive, because the appointment is the thing people queue for.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Make it in Germany: student visa and residence permit",
            kind: "official",
            url: "https://www.make-it-in-germany.com/en/visa-residence/types/student",
            why: "The residence permit requirements and the appointments at the foreigners' office, with the documents you will be asked for and the sequence they arrive in.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "German Universities: study in Germany",
            kind: "site",
            url: "https://www.german-universities.de/",
            why: "The German academic exchange service's portal for finding a programme and the practical information that goes with it, including the country-specific advice for international applicants.",
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

  "fr-housing": {
    archetype: "housing",
    intro:
      "Since Décret n° 2026-526 of 22 June 2026, all international student visa applicants must provide proof of accommodation for the first three months of their stay, not merely an address at which they can be contacted. That changes the housing search from something you can settle later into something that has to exist before your visa application.",
    sections: {
      options: {
        body:
          "Four routes, and the fourth is not optional in practice. Since the 2026 decree, an accommodation attestation for the first three months is part of the visa file, so the housing question now sits before the visa rather than after it.",
        points: [
          "CROUS, the student residence service run by the national student aid body. Rooms allocated by a national application and a regional allocation process, and priced well below the private market. The application opens once a year, in the spring, for the following academic year, and it is a lottery with a very large applicant pool.",
          "University residences, and the private student residences that operate in the CROUS network. More places, often more modern, and often slightly more expensive. Some universities run their own allocation process alongside the CROUS one.",
          "Private rental, and the attestation d'hebergement. A landlord, an agency or a notarial lease can issue the attestation that the visa file requires. In a shared flat in Paris you will also need a guarantor for the bail a colocation, and finding one is a real task rather than a formality.",
          "A fallback that satisfies the file while you look properly: a refundable hostel or short-stay booking, which can produce the proof for the first three months while you search for something better. This is a normal strategy, and it is much better than arriving with an address you cannot live at.",
        ],
        callout: {
          tone: "watch",
          title: "The attestation is the thing, not the address",
          body: "The decree requires proof of accommodation for the first three months of the stay. An address written on an envelope is not proof. What the file needs is a document from the landlord, the residence or the booking, naming the address and the period, so the search has to produce a landlord or a residence, not merely an intention.",
        },
      },
      timing: {
        body:
          "French housing has two completely different calendars running in parallel, and the one that matters most for the visa is the private one. The CROUS allocation is a single annual round; the private market moves all year and peaks in August and September.",
        points: [
          "The CROUS round opens in the spring for the following academic year, and places are allocated in the summer. Missing the application window means missing the year, not joining a queue for the next one.",
          "The university residence applications have their own rounds, and for some universities the deadline is earlier than the general application deadline for the course, not later. Check both when you read your programme's page.",
          "The private market in Paris and the other big cities is at its tightest in July and August, and the best-value rooms go in the spring. For a September start, you can view and sign in April or May, and a signed contract that starts in September costs less than the same flat signed in August.",
          "The attestation has to be timed to the visa application. The document has to cover the period from your arrival, and if your visa application is delayed, the dates on the attestation still have to line up. Ask the landlord or the residence for an attestation that covers a defined period starting from your arrival date.",
          "Ask about the summer between the academic years. Most student accommodation contracts end in the summer and many are only let for twelve months, so there is often a gap in June, July and August that has to be planned for separately.",
        ],
        callout: {
          tone: "good",
          title: "Sign before the peak, even from abroad",
          body: "You can view, apply and sign a French lease from outside the country, and landlords will hold a flat for a short period. Doing it in May rather than August is the difference between a normal rent and a peak-season rent in Paris, and the search costs nothing but patience.",
        },
      },
      money: {
        body:
          "French rent is quoted monthly and is usually expressed with or without charges. The distinction decides whether you know what you are paying, and the deposit convention is the one that catches newcomers.",
        points: [
          "Rent is published as a monthly amount, and the listing says whether it is charges comprises, meaning utilities are included, or hors charges, meaning they are not. In a shared flat, hors charges is the norm, and the utilities are split among the occupants by whoever is in the flat at the time.",
          "The deposit, or caution, is normally one month's rent, and it is refundable at the end of the tenancy subject to deductions. In a furnished let it can be lower, and in some cases the deposit is paid to an agency rather than to the landlord, which is worth knowing before you sign.",
          "Agency fees are regulated in Paris, where the fees a letting agent may charge a tenant are capped as a percentage of the rent, and a tenant can pay the landlord rather than the agent if they prefer. Outside Paris the caps do not apply in the same way, so check what you are being charged.",
          "The guaranteed rent, Visale, exists for tenants in Paris and is worth checking whether you qualify for: it removes the need for a guarantor, which is the single thing that stops many international students from renting a flat in the city.",
          "Beyond the rent: the accommodation attestation or the lease, the residence permit fee, the health cover, a deposit on the first month's rent if it is not a managed residence, the CAF student allowance if you qualify, and the first fortnight, which is always bigger than an average fortnight.",
        ],
        callout: {
          tone: "watch",
          title: "Hors charges is not a small difference",
          body: "In a shared flat, a listing at 400 euros hors charges can cost 550 once electricity, gas, water and internet are split across however many people are in the flat that month. Read which one you are being quoted, and ask what the previous occupants actually paid.",
        },
      },
      viewing: {
        body:
          "View the flat, check the paper, and do both before you sign. In France the paper is unusually important, because the attestation and the lease are what the visa file is built on, and because the rules on shared flats in Paris are strict.",
        points: [
          "The lease itself, or the bail. Read for the rent and whether it is charges comprises, the duration, the deposit, the indexation clause, the notice period, and whether utilities are included. For a shared flat in Paris, check whether the lease is a bail a colocation and what the guarantor requirement is.",
          "The attestation. Confirm it names the address, the type of accommodation, the period it covers and the start date, and check it against your programme start date and your arrival date. A three-month attestation that starts before your arrival is not doing what you think it is doing.",
          "The building and the flat. Check the heating and whether it is individual or collective, the insulation and the double glazing, the state of the bathroom and the kitchen, the electrical outlets, and the water pressure. Check the building's charges and what they include.",
          "The neighbourhood, at the times you will live there. Check the commute to campus or to your workplace, and check the area at 11pm on a weekday rather than at noon on a Saturday. Ask the current tenants what the bills actually are.",
          "Never pay money to a landlord you have not seen or a flat you have not viewed, and never transfer a deposit to an address you have not physically visited. The French market is not full of this, but a photo of a flat is worth nothing and it costs nothing to insist on seeing it.",
        ],
        callout: {
          tone: "good",
          title: "Ask for the attestation before you sign",
          body: "A landlord or a residence that will issue the attestation for the period you need has told you it is the right kind of arrangement. One that hesitates, or that offers to send you a letter after you have paid, is going to cost you a month at the French border office.",
        },
      },
      resources: {
        body:
          "Campus France publishes the housing guidance and the budget guidance, France-Visas publishes the consular requirements, and the CROUS network runs the allocated rooms.",
        resources: [
          {
            title: "Campus France USA: guidance for student visa applicants",
            kind: "official",
            url: "https://www.usa.campusfrance.org/guidance-for-student-visa-applicants",
            why: "The official source for this milestone and the consular guidance that explains what the accommodation proof has to be and how it fits into the visa file. It is the document that makes the new requirement concrete.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Campus France: student housing",
            kind: "official",
            url: "https://www.campusfrance.org/en/student-housing-france",
            why: "The official guide to housing in France: the CROUS and university residences, the private market, the attestation and the guarantees. The clearest single explanation of the French system in English.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Campus France: prepare your budget",
            kind: "official",
            url: "https://www.campusfrance.org/en/preparing-budget-student-France",
            why: "The published budget guidance for a French student year, broken down by city. It is the only way to compare two French cities on cost without guessing, and it is built from what students actually spend.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "CROUS",
            kind: "official",
            url: "https://www.crous.fr/",
            why: "The national student residence service, and where the allocation application for subsidised rooms is made. The application opens once a year, so the date is the thing to remember.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "France-Visas: student visas",
            kind: "official",
            url: "https://france-visas.gouv.fr/en/etudiant",
            why: "The consular authority's own student visa page, with the document list including the accommodation evidence. Read it alongside your admission offer so the two sets of documents agree with each other.",
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

  "sg-housing": {
    archetype: "housing",
    intro:
      "Housing in Singapore is allocated by each university and the deadlines differ. NTU asked incoming January 2027 students to apply for graduate housing in late October or early November 2026, with applications opening roughly two weeks after e-matriculation. NTU also states that demand typically exceeds supply by more than 300 percent each year, which is the number to plan around.",
    sections: {
      options: {
        body:
          "The on-campus route is cheap and heavily oversubscribed, and the private market is expensive but open. Most graduate students in Singapore end up doing one of the two, and a good number do both applications at once.",
        points: [
          "Graduate halls. NTU's graduate halls are single and double rooms, and priority in the allocation is given to incoming research students who have not previously lived in Singapore. In all cases, submitting an application does not guarantee a place, and NTU says so on the page.",
          "Private rental. A room in a private flat, a whole flat shared with other students, or an HDB flat. The market is well organised and the prices are high for a city of this size, but there is stock and it is available when you are willing to look.",
          "The university flat and the private flat are not comparable on price per square metre. HDB flats are subsidised by the state and are generally cheaper per room than private property, but there are rules about who can hold one, and the allocation runs through the government rather than the university.",
          "Living with the university means a lease with the university, a fixed term and a clear fee schedule. Living privately means a lease with a landlord, a deposit, an agent fee in most cases, and monthly rent, and no meal plan, no campus access and no community.",
          "Plan for the private route even if you are confident about the hall application. NTU's own advice to all applicants is to prepare alternative housing plans, and it is better to have the private search already half done when the hall outcome arrives than to start from nothing.",
        ],
        callout: {
          tone: "watch",
          title: "More than 300 percent of supply, in demand",
          body: "NTU states that based on past application exercises, demand for graduate hall places typically exceeds supply by more than 300 percent each year, and that applicants are strongly advised to prepare alternative housing plans. That is the most useful number published by any university in this dossier, because it tells you what to do rather than what to hope.",
        },
      },
      timing: {
        body:
          "The Singapore housing calendar runs on the university and on the intake, and it is tighter than it looks. The application opens after e-matriculation, because the housing portal needs your student record, and there is a fixed window with no extensions.",
        points: [
          "For NTU's January 2027 cohort, the graduate housing application window opened on 3 November 2026 and closed on 20 November 2026, and outcomes were released from 10 December 2026. That is the shape of the calendar: an application window, then an outcome, then a payment, then check-in.",
          "You cannot apply until your network account is activated, and NTU states you can only apply for hall accommodation at least two days after activation, and that NIE freshmen must be e-matriculated before they can activate the account at all. The chain is enrolment, then matriculation, then activation, then housing.",
          "There is a second window. NTU's August 2026 cohort had a first window and then an extended second window in May and June, and offers were released on two separate dates. A second window is a real second chance, not a formality.",
          "Allocation is by electronic balloting, not first-come, first-served, so applying early does not get you a better room. Applying early does get you into the ballot, and it gets you into the first window rather than waiting for the next one.",
          "The private market in Singapore moves continuously, but it moves faster at the start of each semester and before the January intake closes. If you are going private, look before you need it, because the good-value rooms in a desirable location go within days of being listed.",
        ],
        callout: {
          tone: "good",
          title: "Watch for the window, not the semester",
          body: "The dates that matter are the application window and the outcome date, and both are published per intake. Put them in your calendar when you matriculate, because the housing window is short and it opens before the term does.",
        },
      },
      money: {
        body:
          "Hall fees are billed on a semester basis and the deposit structure is published, which makes the on-campus cost easier to predict than the private one. The private one is a standard monthly lease with a deposit and an agent fee, in a city where rent is genuinely high.",
        points: [
          "NTU's graduate housing application carries a non-refundable hall application fee, published as S$27.25 inclusive of GST. It is small, and it is not refundable, so the application has to be complete when you submit it.",
          "Accepting a hall offer requires a hall acceptance fee equal to two months' rent, paid in advance and non-refundable. It covers your first two months, so it is not extra money, but it is a large amount leaving your account at the moment you have also paid the application fee.",
          "The remaining hall fees are billed by semester, and NTU publishes the collection schedule for the year. A student in their second year or beyond is committed to the full lease period offered, and no refunds are given if you withdraw before the end of it.",
          "Private rent in Singapore is quoted monthly, with a deposit usually equal to one month's rent and an agent fee usually equal to half a month's rent. Utilities are often not included, and there is no legal annual rent protection scheme equivalent to the UK's, so the lease terms are what you have.",
          "Add the practical costs of arriving: a Singapore SIM card and a phone plan, a local transport card, the first month's food and household items, and the cost of a room that comes unfurnished, which is the norm in the private market and is a real one-off cost.",
        ],
        callout: {
          tone: "watch",
          title: "Two months of rent before your first month",
          body: "The hall acceptance fee is two months' rent, paid on acceptance, and it is non-refundable. If you are also privately searching, you are carrying a private deposit at the same time. Decide which one you can fund before you accept, not after.",
        },
      },
      viewing: {
        body:
          "Private viewings in Singapore happen fast and the market moves on. Look at the flat and the paper in the same visit, and check the specific things that are different in Singapore: the agent's fee, the lease length, the utility arrangements and the light.",
        points: [
          "The lease and the agent agreement. Check the monthly rent, the lease length, the deposit, the agent's fee, who the landlord is, and what happens at the end of the lease. Most leases are one or two years, and the agent's fee is usually a month's half, which is a real cost of moving in rather than a rent.",
          "The bills. Ask whether electricity, water, gas and internet are included, and if not, who the account will be in and whether the previous tenant settled it. Internet in a shared flat is usually arranged separately and is a monthly cost that catches people.",
          "The rules of the building. Foreign student quota rules exist in some buildings and some developments, and the management corporation can refuse an application. Ask directly whether there is any quota or rule that would apply to a student, before you commit to a deposit.",
          "The flat itself. Check the size, the light and the ventilation, which matters more in a tropical climate than most people expect, the air conditioning, the mould around the window frames in a humid climate, the water heater, and whether the kitchen is a separate room or a living area.",
          "The commute. Check it at the time you would actually travel, because Singapore's trains are frequent and the transport pass is cheap, but a room at the far end of a line can still add an hour a day. Also check the walk from the station, because the last five minutes is where a good commute becomes a bad one.",
        ],
        callout: {
          tone: "watch",
          title: "Check the lease and the deposit in writing before you pay anything",
          body: "In a fast market the pressure is real: a viewing today, a decision today. But the deposit is a month's rent and the agent's fee is real money, and both are recoverable only through an agreement you have actually read. Sign first, pay second, and always get a receipt.",
        },
      },
      resources: {
        body:
        "The university's own housing pages carry the dates, the fees and the allocation rules, and the HDB is where the public housing rules and the application live.",
        resources: [
          {
            title: "NTU NIE: admission procedures for successful graduate applicants",
            kind: "official",
            url: "https://www.ntu.edu.sg/nie/admissions/graduate-education/admission-procedures-for-successful-graduate-applicants/research-programmes-(january-2027-intake)",
            why: "The official source for this milestone, and the document that states the housing application timing relative to e-matriculation for a named intake. It is the clearest example of the sequence you have to follow.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NTU: graduate housing application",
            kind: "official",
            url: "https://www.ntu.edu.sg/life-at-ntu/accommodation/graduate-housing/application",
            why: "The official housing page with the application windows, the balloting rules, the application fee, the acceptance fee and the payment schedule. Everything about the on-campus cost and the dates is on this one page.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NTU: graduate housing",
            kind: "official",
            url: "https://www.ntu.edu.sg/life-at-ntu/accommodation/graduate-housing",
            why: "The overview of the graduate halls, the room types, the priority given to incoming research students and the statement that applying does not guarantee a place. Read it before you assume a hall place is realistic.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NTU: how to apply, January 2027 intake",
            kind: "official",
            url: "https://www.ntu.edu.sg/applicationtrimester3",
            why: "The intake-specific page with the January 2027 application and housing windows, the outcome dates and the check-in date. The clearest example of a university publishing the whole calendar in one table.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NUS: graduate accommodation",
            kind: "official",
            url: "https://nus.edu.sg/osa/accommodation/grad",
            why: "The other major Singapore university's graduate housing information, including the application route and the priority rules. Useful if you are applying to more than one institution and the systems differ.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "HDB: public housing",
            kind: "official",
            url: "https://www.hdb.gov.sg/",
            why: "Singapore's public housing authority, and the place where the rules for renting a flat from the Housing and Development Board are published. It is the cheapest large-scale housing in the country and the rules are strict.",
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

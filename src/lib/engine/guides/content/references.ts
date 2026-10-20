import type { GuideContent } from "../types";

const V = "2026-10-20";

/*
 * The references dossier.
 *
 * A recommendation is the only part of an application written by someone else
 * about you, and it is the part most students treat last. It is also the part
 * most likely to be the reason an application is incomplete, and in several
 * countries an incomplete file is not read at all.
 *
 * The mechanics differ everywhere, and the differences matter:
 *
 *   1. WHO WRITES IT. The US expects academics who have direct evidence of
 *      your research or technical ability. The UK often wants one academic
 *      and sometimes a second, sometimes professional. Canada wants two or
 *      three. Germany and Australia vary enormously by programme, sometimes
 *      from none to two. Singapore is explicit: two reports, submitted by the
 *      referees themselves.
 *   2. HOW IT IS SUBMITTED. Almost nowhere is it a PDF you email to
 *      admissions. It is nearly always submitted by the referee, inside the
 *      university's own system, which is why the referee needs a link and a
 *      deadline and a little technical help.
 *   3. WHEN TO ASK. The deadlines in this dossier are long on purpose.
 *      Referees are academics with other work, and the request you send in
 *      August gets answered in a week. The one you send in the last fortnight
 *      gets answered in the next academic year.
 */
export const REFERENCES: Record<string, GuideContent> = {
  "us-recommendations": {
    archetype: "references",
    intro:
      "Recommenders are the slowest-moving dependency in the whole US application. Approach academics while you are still visible to them, give them a deadline at least three weeks before submission, and hand them something to work with rather than a request to write about you in the abstract. Two or three letters are typical, and they go through the programme's own online recommendation system.",
    sections: {
      who: {
        body:
          "US master's programmes typically ask for two or three academic letters, and in the US CS case they usually specify who should write them. The useful definition of a good referee is narrow: someone with direct evidence of your research or your technical ability. That is not the same as someone who taught you, and it is not the same as someone who thought you were good. A research mentor from a lab, a thesis supervisor, or an academic who supervised a substantial project will produce a letter that says something specific, and specificity is the whole currency.",
        points: [
          "Aim for a mix rather than three of the same. A supervisor, a course instructor who ran a project you did well in, and a research mentor or lab colleague with a different perspective will produce three letters that read like three people, which is what a committee wants to see.",
          "An academic who taught a large first-year lecture is usually a poor referee for a research master's. They have no evidence of your technical ability and their letter will consist of your grade.",
          "Industry supervisors can be strong referees when the programme accepts them, and many US master's do. Check the programme's own wording, because some specify academic referees only and a rejected letter is a missing letter.",
          "Never ask someone who does not know you well. A referee who cannot recall you will write a short, warm, empty letter, and it will be visibly different from your other two.",
          "Do not ask everyone you can think of. A referee who is asked and declines, then hears that you asked ten others, is less likely to write a good letter, and word travels in a department faster than email.",
          "Ask while you are still visible to them. A student who has just completed a project with someone, is in their office most days, and is easy to find, gets a letter in a week. The same student writing from another country two years later gets a letter in three weeks, or never.",
        ],
        resources: [
          {
            title: "Stanford CS graduate application checklists",
            kind: "official",
            url: "https://www.cs.stanford.edu/admissions/graduate-application-checklists",
            why: "The source this checkpoint is filed under, and the clearest published statement of what a US graduate file needs and in what order. It shows the recommendation step as part of the document set rather than as a formality, which is the right way to think about it.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Stanford CS master's admissions FAQ",
            kind: "official",
            url: "https://www.cs.stanford.edu/admissions/masters-admissions-frequently-asked-questions",
            why: "The programme's own account of what it asks for and what it does with the letters. Worth reading before you ask anyone, because the number of referees and the form they use are both stated there.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the programme's own published checklists, which describe the file the letters go into. We take no payment for placement, and we do not take payment for anything. Nobody can buy you a better referee, and nobody should be selling you one.",
        },
      },
      brief: {
        body:
          "How you ask matters more than who you ask, because a good referee and a bad request produce the same result. The request should be short, specific, generous with context and impossible to misread. It should tell the referee what the programme is, when the deadline is, what the system needs from them, and what you would like them to talk about. That last one is the piece most students skip, and it is the piece that turns a polite letter into a useful one.",
        points: [
          "Ask by email, from your own address, and keep the first message short. A long email asking for a favour gets a slower and less considered answer than a short one.",
          "Name the programme and the degree, and include a link. A referee who has to search for the course name will not do it tonight.",
          "Give an absolute date, not a relative one. \"By the 15th\" lands; \"as soon as you can, ideally in the next week\" does not.",
          "Say what the system needs from them: the form, a link, a set of questions, a subject line for an email, and whether they need a current CV from you.",
          "Tell them what to talk about. Two or three specific prompts are more useful than a request for a good letter, and they are what stops the letter being generic.",
          "Offer the material. Attach your CV, your statement of purpose if the programme lets the referee see it, and a list of the projects you did with them, with the dates.",
          "Give them a comfortable window, and set your own deadline earlier. A referee who sees three weeks of margin writes; a referee who sees one week declines.",
          "Follow up once, at the two-week mark, and follow up politely. A short reminder with the link attached is not pushy; it is helpful, because you are doing the chasing they are not.",
          "Have a plan B, and tell the referee about it. If they cannot do it, ask whether they could nominate someone else who knows your work. Many academics will do this rather than write a letter about someone they barely recall.",
          "Thank them, properly, and tell them what happened. Applicants routinely never tell a referee the outcome, and a referee who hears that their letter mattered writes a better one next time.",
        ],
      },
      dossier: {
        body:
          "The pack you send a referee is small, and every item in it exists to remove a reason for them to say no. Put it in one email with one attachment and one link, so that everything they need is in one place, and so that nothing gets lost in a thread six weeks later.",
        points: [
          "Your CV, one or two pages, in the academic format your programme uses. This is the most useful attachment in the pack, because it tells the referee what you have done without you having to explain it.",
          "A written summary of the specific work you did with them, with dates and, where relevant, the outcome. This is the raw material for the letter, and it is the single most commonly omitted item.",
          "Suggested talking points. Three to five bullets: the project, the problem, what you did, what came out of it, and anything you would be happy to have mentioned. Frame them as things they might want to say, not as sentences to copy.",
          "The programme name, the course link, and what the programme looks for, in two or three lines. Enough for the referee to know the tone of the letter.",
          "The exact deadline, the submission route and the link, and a note about what the system will ask them to do. Some systems send the invitation themselves; some give the referee a code. Say which.",
          "Your statement of purpose, if the programme allows the referee to read it. Some systems attach it. When it is available, it turns the letter from about you into about a proposal, which is a much stronger letter.",
          "Your transcript, if the programme sends it to referees and the referee needs it to comment on your coursework.",
          "A short note of what you have already asked your other referees, so the referee knows the overall shape of your file. Only where it is genuinely useful.",
        ],
        callout: {
          tone: "good",
          title: "The pack is a kindness",
          body: "Every item in it removes a decision from the referee's evening. A referee who has to reconstruct what you did together, remember which project it was and decide what to say is a referee who writes something cautious. A referee who receives the project summary, three prompts and a link writes something specific, and that is the letter that does the work. Nothing in this pack costs you anything, and we take no payment for placement.",
        },
      },
      traps: {
        body:
          "Most weak letters are not badly written. They are vague, and vagueness has a small number of causes that are all visible in advance. The traps below are the ones that show up again and again in US recommendation files.",
        points: [
          "The generic letter. \"She is a hard worker and a team player, and I recommend her without reservation.\" A committee cannot compare generic praise between candidates, so it carries no weight. If your referee writes this, it is usually because you did not give them anything specific to write about.",
          "The letter about your grade rather than your work. A first-year lecture professor can only confirm a mark, and a mark is the least informative thing in your file.",
          "The letter addressed to you. Referees write to the admissions committee. A letter that starts \"Dear Jane, it was a pleasure to teach you\" is a letter that was never submitted properly.",
          "The loose PDF emailed to you. If the programme has an online recommendation system, a letter emailed to you is not in the file, and you usually find out too late to fix it.",
          "The referee on sabbatical, on a field trip, or in a country with a slow connection. Ask about availability in the same email, and have a second person in mind.",
          "The referee who writes a letter that contradicts your statement of purpose. It happens when a referee is describing a project you have since explained differently in your own writing. Share the statement, or at least the relevant part of it.",
          "The recommendation for a programme you did not apply to. Referees are busy and you are sending the same email to several people. Say which programme this letter is for in the subject line.",
          "The two letters that sound like the same person. If both referees describe the same project, you have probably asked two people who were in the same room. Two different projects, two different referees, is the version that reads as a real file.",
          "Not thanking the referee, and not telling them the outcome. It is free, it takes two emails, and it is the difference between a one-off referee and somebody who writes for you again.",
          "The letter that arrives after the deadline through no fault of the referee, because you asked them in the last fortnight. This is the whole reason for the three-week margin.",
        ],
        callout: {
          tone: "watch",
          title: "The letter is not in your file until it is in the system",
          body: "A referee who says they have sent it, and has emailed it to you, has not sent it. Every US programme with a recommendation system wants the letter submitted inside that system, by the referee, and it will tell you so in the instructions. Read those instructions and send them to the referee as part of the pack.",
        },
      },
    },
  },

  "gb-references": {
    archetype: "references",
    intro:
      "Most UK taught master's ask for at least one academic reference and frequently two, and referees submit them through the university's own system rather than emailing you a PDF. UK reference forms are structured, which means your referee is filling in questions as well as writing free text, and that is a different job for them from writing you a letter.",
    sections: {
      who: {
        body:
          "The UK requirement is the least consistent of the destinations, and the specific combination matters. Some courses want one academic reference. Some want two. Some want one academic and one professional, usually from work, and some will accept a mix where the second is from a different academic. A frequent UK pattern is a mix of one academic reference and one institutional reference, where the second comes from the awarding body rather than from a person. Knowing which pattern your course uses saves a great deal of avoidable work.",
        points: [
          "Check the exact requirement on each course's page before you ask anyone. One academic plus one professional is a different task from two academics, and you cannot ask for one and convert it later.",
          "UK-taught supervisors and academics are the most natural academic referees, and they understand the UK reference form because they fill in several a year. A referee from a system they do not know may write a free-text letter instead of completing the form, which is a common reason a UK application goes missing.",
          "A work reference is normal in the UK, and it is not a weaker choice. For a conversion course, a professional reference can carry real weight, because it evidences the academic aptitude the course is meant to build.",
          "If a course accepts a mix, do not send two references from the same project. A supervisor and somebody who supervised a different piece of work give a committee a broader picture.",
          "A referee who has only ever taught you in a large lecture cohort is weak for a UK taught master's, because the UK reference form usually asks about your academic performance and your intellectual curiosity, and a lecturer who saw 300 students can answer neither.",
          "Give a referee at least six weeks. UK academic terms are busy in the same weeks your deadline falls in, and the person who taught you last term is now marking.",
        ],
        resources: [
          {
            title: "UCL: how to apply for postgraduate study",
            kind: "official",
            url: "https://www.ucl.ac.uk/study/prospective-students/graduate/how-to-apply",
            why: "The source this checkpoint is filed under, and a worked example of the UK process from a university that runs its own reference system. It explains what the referee is actually asked to do and what the student is responsible for.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "UCAS: how to apply",
            kind: "official",
            url: "https://www.ucas.com/postgraduate/how-to-apply",
            why: "The national service's own explanation of the reference section and how it works for taught postgraduate applications, including who submits what and by when.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the university's own guidance and the national service's own explanation of the reference process. We take no payment for placement, and we do not take payment for anything. A reference request is an email, and no service makes it better.",
        },
      },
      brief: {
        body:
          "The UK request has one feature that changes it from the US one: the reference is usually a form. Your referee fills in structured questions and, often, adds a section of free text. You cannot write that form for them, but you can make it much easier for them, and the best thing you can do is tell them what the form asks in advance so they can decide whether to write it now or later.",
        points: [
          "Send the form itself, or a link to it, in the first email. A referee who has to find the form will do it last, and last means no.",
          "Tell them the structure: the questions they will be asked and roughly how much room there is for free text. Some UK forms are almost entirely structured and a good referee wants to know that before agreeing.",
          "Name the programme and the deadline, and ask them to use the university's own system rather than sending you a document. Some referees will offer to email you a letter instead, and that offer has to be declined clearly and early.",
          "Give them a reminder of the specific work you did with them, with dates, and a couple of suggested points. UK forms often ask about your intellectual curiosity, your motivation and your contribution to a discussion, and those questions are impossible to answer from a blank page.",
          "Offer your CV. It is the fastest route to a reference that talks about your work rather than your character.",
          "Set the deadline at least six weeks before the course deadline, and earlier if the course publishes a separate reference deadline, which many do and which is often only a short window after the main date.",
          "Follow up once, gently, with the link and the date in the message, so that responding takes one click.",
          "Ask a direct question about the form early: whether they are comfortable with the structured format and whether they need anything from you. Some referees will decline a form and write a free letter instead, and the university may or may not accept that, so it is better to find out before you rely on them.",
          "If they decline, ask for a nomination rather than a silence. A nomination of somebody who knows your work is a normal request and is usually accepted.",
        ],
      },
      dossier: {
        body:
          "The UK pack is smaller than the US one because the form does more of the work, but it has one item that matters more than the rest: a short, specific summary of what you did together, in the form's terms rather than in your own.",
        points: [
          "Your CV, one page, with the courses and projects the form is likely to ask about clearly visible.",
          "A short written summary of the work you did with this referee, with dates, and a couple of concrete details. Two paragraphs is plenty. The form asks about motivation, curiosity and contribution, and a short summary gives the referee something to convert into those answers.",
          "The programme name, the course link and the deadline, so the referee can write at the right level.",
          "The reference form, or the link to the system, with a note on what it will ask and how long it takes. If it is a paper form, send the paper form and a prepaid envelope if the university requires one.",
          "The exact submission route, spelled out: where the link is, whether the referee signs in or receives a code, and whether the reference is submitted by them or uploaded by you.",
          "Your statement of purpose, if the university sends it to referees, since UK forms often ask how you intend to use the course.",
          "Any deadline for the reference that is separate from the application deadline, marked as the date you want the letter in, not the university's last possible moment.",
        ],
        callout: {
          tone: "good",
          title: "Make the form easy to complete",
          body: "The referee is doing you a favour at the same time as doing their own job, and a form that is easy to fill in is more likely to be filled in well. A summary of your shared work, in the terms the form uses, is the difference between a reference that says something about your thinking and one that says something about your attendance. Nothing in this pack costs you anything, and we take no payment for placement.",
        },
      },
      traps: {
        body:
          "UK references fail on a small number of specific things, and the most common is a format problem rather than a content problem. A letter of the right quality in the wrong place is still a missing reference.",
        points: [
          "Sending a US-style request to a UK referee. Asking for a \"letter of recommendation\" to a UK academic leads to a free-text letter that the university may not accept in place of its form.",
          "Not mentioning the form at all, so the referee writes something they think is what you want, and the system wants something else.",
          "Assuming the reference deadline is the application deadline. Many UK courses publish a separate, earlier reference deadline, and it is short.",
          "A referee who has not seen you in a taught context. If the form asks about your academic performance, someone who never assessed you has nothing to say.",
          "Asking in the last fortnight, which produces a declined reference rather than a late one.",
          "A referee who sends you the letter to forward. Some universities accept a forwarded reference and some do not, and you may not find out which until it is too late.",
          "A reference that mentions the wrong course, because you sent the same email to several referees. Put the course name in the subject line.",
          "Forgetting the institutional reference, where the course wants one. It is not a person and you cannot ask for it in an email, so it needs its own slot in your plan.",
          "Not keeping the reference submission confirmation. When the course queries your application, the confirmation is what answers the question in one line.",
          "Expecting the reference to carry a weak application. A good letter tells the committee you can do the course. It cannot tell them you are the right candidate for this one, and it is not meant to.",
        ],
        callout: {
          tone: "watch",
          title: "Format, not quality",
          body: "In the UK the most common reason a strong referee produces a useless reference is that they wrote a letter when the university wanted a form. Say in your first email which format you need, and attach it. A ten-line message at the start prevents a rejected file at the end.",
        },
      },
    },
  },

  "ca-references": {
    archetype: "references",
    intro:
      "Canadian graduate files are not read until they are complete. Toronto Metropolitan states that applications are only reviewed once all required documents are submitted, including letters of recommendation, so a missing letter does not delay the file, it removes it from consideration. Request references at least eight weeks before your deadline and give your referees something specific to write about.",
    sections: {
      who: {
        body:
          "Canadian master's applications typically ask for two or three letters, and the useful referee is the one who has seen you do the work. A research supervisor, an undergraduate thesis advisor, a research coordinator and a professor who supervised a substantial project are the usual pool. The Canadian file is research-centred, which means the referee who can comment on your research statement is worth more than the referee who can comment on your coursework, and it changes who you should be asking.",
        points: [
          "Your supervisor or research mentor is usually the strongest referee in a Canadian file, because they can speak to the work in your research statement specifically.",
          "An undergraduate thesis supervisor is a strong choice, provided the thesis is genuinely yours. Canadian committees ask about the contribution, so a co-authored thesis is worth discussing honestly with the referee before they write.",
          "A course professor from a class where you did exceptional work is a solid academic referee, and better than one from a large class where you scored well but did not stand out.",
          "Research coordinators and lab managers write excellent letters in some Canadian departments and are widely accepted, because they know the work. Check the programme's wording about academic referees before assuming.",
          "The number varies by programme and sometimes by whether it is a thesis-based or a course-based master's. Check each programme's own requirement rather than assuming the number you have seen elsewhere.",
          "Where the university uses an online referee system, the referee is contacted by the university directly. Where it accepts posted letters, you are often the one who has to arrange the posting, and that is a postal task with a postal timescale.",
        ],
        resources: [
          {
            title: "Toronto Metropolitan graduate application dates",
            kind: "official",
            url: "https://www.torontomu.ca/graduate/future-students/application-dates/",
            why: "The source this checkpoint is filed under, and the page that states the rule this whole checkpoint depends on: applications are only reviewed once all required documents, including letters of recommendation, have been submitted. It is also where the dates are.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "U of T Institute of Medical Science: deadlines and requirements",
            kind: "official",
            url: "https://ims.utoronto.ca/application-deadlines-and-requirements",
            why: "A second published requirements page, and the clearest way to see what a complete Canadian graduate file looks like, including where the recommendation sits among the other documents.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the universities' own published requirements and deadlines, which is where the rules for this step are written down. We take no payment for placement, and we do not take payment for anything. A reference is something your supervisor writes for you; there is no service that improves it.",
        },
      },
      brief: {
        body:
          "The Canadian request is close to the US one in tone and different in mechanics. The tone is warm and personal, because the referee usually knows you and may still teach with you. The mechanics depend on the university: an online system, an email address, or a sealed letter posted by the institution. Get that right in the first message, because a referee who posts a letter to the wrong place has wasted a week.",
        points: [
          "State the mechanism in the first email, with the exact instructions and the deadline. Canadian programmes differ, and the university will tell you if you ask the admissions office.",
          "Give at least eight weeks. The eight-week figure comes from the shape of the Canadian cycle rather than from a published rule, and the reason is structural: a file with a missing letter is not assessed at all, so there is no slack built into the system for you.",
          "Send your CV and your research statement. In a research-centred application this is what lets a referee write about your proposal instead of about your transcript, and it is the difference between a letter that engages the committee and one that confirms a grade.",
          "Ask what the referee needs from you. Some systems need the referee's email address entered in the application before the university will contact them; some need a letter emailed to a named inbox; some need a sealed, signed envelope posted.",
          "If you have contacted a supervisor separately, tell the referee that and copy them in on the research statement. Supervisor and referee talking about the same proposal is coherent; talking about different things is not.",
          "Check in at the three-week mark, not the one-week mark. A reminder at three weeks can be acted on; a reminder at one week cannot.",
          "If the deadline and the reference chase conflict with the funding deadline, the funding deadline wins. Funding in Canada is assessed on its own calendar and a missing funding application is usually worse than a late reference.",
        ],
      },
      dossier: {
        body:
          "The Canadian pack is the most generous of the three because the research statement does so much of the work. Give the referee the statement, the CV and a short set of prompts, and you have made it possible for them to write about your research rather than about their memory of a lecture.",
        points: [
          "Your CV, one or two pages, in the academic format the programme expects.",
          "Your research statement or statement of academic interest, the version you are actually submitting. Not a summary. The referee needs the real document to comment on the plan.",
          "A short summary of the work you did with this referee, with dates and outcomes. Two or three paragraphs is enough.",
          "Suggested talking points: what you worked on, what the problem was, what you contributed, what you would be glad to have mentioned. Three to five bullets.",
          "The programme name, the supervisor or department, and the deadline.",
          "The exact submission route, spelled out: the online system and how the referee enters it, or the postal address and the envelope requirements, or the email address and the subject line.",
          "A note of the deadline for the referee separately from the application deadline, if the university publishes one.",
          "Your transcript, if the programme asks the referee to comment on your coursework.",
        ],
        callout: {
          tone: "good",
          title: "The research statement is the best thing you can send",
          body: "A referee reading a one-page proposal you are genuinely working on has something to react to. A referee reading only your CV has to reconstruct a student from a list of modules. In a research application the first version produces a letter about your thinking, and that is worth a great deal more. Nothing in this pack costs you anything, and we take no payment for placement.",
        },
      },
      traps: {
        body:
          "Canadian reference failures are usually mechanical rather than personal, and the ones below are the specific mechanics that differ from other countries.",
        points: [
          "The file is never assessed. The single most important fact about Canadian applications, and the one that makes a missing letter fatal rather than merely inconvenient.",
          "The mechanism is assumed rather than checked. Assuming an online system when the university wants posted letters, or the reverse, adds weeks and it is entirely avoidable.",
          "Posted letters sent by the student instead of by the institution. Many programmes require sealed envelopes sent directly from the issuing institution, and a student-posted envelope is not accepted.",
          "The referee does not know your research statement. They then write about a course they taught, and the committee gets a letter that does not engage the proposal.",
          "The reference deadline is after the funding deadline, and the funding application was left until the last moment. In Canada the funding calendar usually runs ahead of the admission calendar, and that is the one to protect.",
          "Two referees from the same project, which reads as one reference in two voices.",
          "Asking a referee who is on the admissions committee, which is awkward and occasionally impossible to repair.",
          "Not checking the referee's status in the system. A referee who was contacted by the university and never responded looks identical to a referee who was never properly invited.",
          "A name mismatch between the referee's account and the one you entered in the application, which is a small thing that silently prevents the invitation from being sent.",
          "Not saying thank you, and not telling the referee the outcome. The supervisor you are relying on for a PhD reference is somebody you may want to work with again.",
        ],
        callout: {
          tone: "watch",
          title: "Ask the admissions office one question",
          body: "Ask them exactly how the reference reaches them and by when, in one email, before you ask anybody else. It is the fastest way to find out whether you need an online code, an email address or a postal envelope, and it is a question the office answers routinely.",
        },
      },
    },
  },

  "au-references": {
    archetype: "references",
    intro:
      "Australian requirements vary from none to two academic referees for coursework master's, so confirm the exact requirement per provider rather than assuming. Where references are needed, request them six to eight weeks before your earliest deadline, supply the referee with your CV and the course rationale, and use official transcripts sent directly by the issuing institution where the provider asks for that.",
    sections: {
      who: {
        body:
          "Australia has the widest spread of any destination, and the reason is that each provider sets its own rules and they differ on almost everything: how many references, in what format, whether the referee submits or emails, and whether a transcript has to accompany the letter. For coursework master's the requirement runs from none to two academic referees. Some providers want an institutional form inside the application portal. Some accept a letter emailed to a named inbox with a specified subject line. Some want nothing at all, and the whole step disappears.",
        points: [
          "Check the provider's published reference requirement for your specific course, not for the university in general. Course-level rules override faculty-level rules in most Australian providers.",
          "Academic referees are the norm where they are required. A professional or industry referee is accepted by some providers, and is a reasonable second choice when the academic evidence is thin.",
          "A research supervisor or a project supervisor is the strongest referee, and in a research master's they are usually required rather than optional.",
          "Where the provider asks for academic referees specifically, an industry referee may not count. Getting this wrong means a missing reference rather than a weaker one.",
          "Do not ask for three because two is the US default. Asking people for references the provider does not want costs you goodwill for nothing.",
          "Allow six to eight weeks, and more over the Australian summer when many academics are on leave and university administration is slow to respond.",
        ],
        resources: [
          {
            title: "Department of Home Affairs: Student visa subclass 500",
            kind: "official",
            url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
            why: "The source this checkpoint is filed under. It is the visa's own page rather than a university's, and it is where the evidence rules sit: the English result and the academic records your references support have to be current and official when you apply for the visa.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "ANU: international applications",
            kind: "official",
            url: "https://study.anu.edu.au/apply/international-applications",
            why: "A provider's own application page, and the best example of how an Australian provider sets out its reference and transcript requirements for an international application.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study Australia",
            kind: "official",
            url: "https://www.studyaustralia.gov.au/",
            why: "The government's own guide to studying in Australia, including a course search. Useful for checking a second provider's requirements before you commit, because the rules genuinely differ between them.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the government and the provider's own pages, which is where the reference and transcript rules are written down. We take no payment for placement, and we do not take payment for anything. A provider's reference requirement is free to read and free to satisfy.",
        },
      },
      brief: {
        body:
          "Australian providers usually want either an online form completed inside the application portal or a letter emailed to a named address with a specified subject line, and the difference decides what you send. The request itself is otherwise straightforward: name the course and the provider, give the date, and tell the referee what format is needed and where it goes.",
        points: [
          "Establish the format before you ask. A provider that uses an online referee form will usually reject a free-text letter, and one that expects an emailed letter may not have a form at all.",
          "If the provider sends the referee the invitation itself, tell the referee to expect it and tell them roughly when. Australian providers often contact referees after you submit, which surprises people who were expecting a link from them.",
          "If you provide the referee's email address, check it twice. A typed address that is wrong is the most common mechanical cause of a reference never arriving, and the provider will not always tell you.",
          "Give the deadline with time zone. An Australian provider asking for a reference by a date in Australian Eastern Standard Time, and a referee in another time zone reading it as their own, is how a reference goes missing by a day.",
          "Send your CV and the course rationale. The rationale matters more than it does elsewhere, because the provider's selection is course-specific and the referee is writing for that course.",
          "Ask the referee for academic reference specifically where the provider requires it, and tell them the course name in the first line so they can write for the right thing.",
          "Follow up at four weeks rather than two, because the Australian academic calendar has long periods when people are away.",
          "Ask about availability before you rely on them, and have a second referee in mind. An Australian summer break can swallow six weeks.",
        ],
      },
      dossier: {
        body:
          "The Australian pack is short and its most important item is not the letter at all, it is the transcript. Many providers want academic records sent directly by the issuing institution, and the referee's letter is a separate requirement from the records, and the two are tracked separately in the portal.",
        points: [
          "Your CV, one or two pages, in the format the provider asks for. Australian providers often accept a format they specify, so check before you build it.",
          "The course rationale, or the statement of purpose you have written for the course. The referee is being asked to vouch for you for that specific course, and this is the document that tells them what you are asking them to vouch for.",
          "A short summary of the work you did with them, with dates, plus two or three suggested points.",
          "The provider's name, the full course name, the exact deadline with its time zone, and the exact submission route with the link or the email address and the subject line.",
          "Instructions on the transcripts, if you are arranging them: which institution issues yours, whether they need to send the records directly, and what has to be requested from your own registrar.",
          "Your offer or conditional offer, if you have one, because it states the provider's own English and academic requirements that the reference may need to support.",
          "A note of the scholarship cut-off where one exists, since scholarship rounds often close before the course deadline and the file you are building serves both.",
        ],
        callout: {
          tone: "good",
          title: "Two requirements, not one",
          body: "The reference and the transcript are separate requirements with separate timelines and, in some providers, separate portals. Treating them as one item is how students end up with a complete file that is still missing records. Order the official transcripts from the issuing institution on the same day you send the reference request. Nothing in this pack costs you anything, and we take no payment for placement.",
        },
      },
      traps: {
        body:
          "The Australian failures are mostly about assumptions carried over from another country. The rules differ enough between providers that a habit learned in the US or the UK will fail here regularly.",
        points: [
          "Assuming the US model of three academic letters. Many Australian coursework master's need none, and asking for three is a burden you place on people for no benefit.",
          "Assuming the reference deadline is the course deadline. Scholarship rounds and some providers' own reference cut-offs come first.",
          "Sending an unofficial transcript where the provider required official records sent directly by the issuing institution. This is checked when your file is marked complete.",
          "A referee who replies to you instead of submitting through the provider's system, because you did not say which to use.",
          "A referee in another time zone who read a local date and sent the letter after the cut-off.",
          "A referee whose email address was typed wrong in the application, so the invitation never arrived and the portal shows no request.",
          "A provider who needs the reference after the transcript rather than before, and you sent them in the wrong order, which puts the file in a state the provider cannot mark complete.",
          "Sending references to a provider that needed none, and then having to explain the extra documents in the follow-up correspondence.",
          "A letter addressed to you rather than to the admissions office, which is an Australian as well as an international problem.",
          "Asking a referee for a reference for a course you have since changed. State the course name in the subject line and repeat it in the body.",
        ],
        callout: {
          tone: "watch",
          title: "Read the provider's list, not the general rule",
          body: "Australian providers publish their reference and transcript requirements on their own pages and they are not consistent with each other. Write down the requirement for each provider you are applying to, in a table, before you ask a single referee. It takes ten minutes and it is the difference between a file that is complete and one that is not.",
        },
      },
    },
  },

  "de-references": {
    archetype: "references",
    intro:
      "German reference requirements are programme-specific and often lighter than in the UK or US. Competitive informatics master's programmes and any university running a Gutachter procedure will ask for them. Where they are required, approach academic supervisors who know your technical work, use the university's own form if one is supplied, and allow four to six weeks for a response.",
    sections: {
      who: {
        body:
          "In Germany the reference often arrives through a form rather than a letter, and the form is supplied by the university, usually as a PDF or inside the application portal. Some programmes call it a Gutachterbogen, which is a structured evaluation sheet rather than a narrative reference, and the committee reads several of these side by side, which means the headings are what your referee has to fill in. Where a programme does not ask for references at all, the committee assesses the file directly, and asking three people for references would achieve nothing.",
        points: [
          "Check the exact requirement on the programme's own page. It is programme-specific, it can range from none to two, and it is not the same as the rule at the next university on your list.",
          "Where a form exists, use it. A free-text letter sent instead of the form is not what the committee is reading, and it is a missing reference.",
          "A professor who supervised your thesis or a substantial project is the natural choice, because the German Gutachterbogen asks about your academic work and your potential for doctoral study.",
          "Where a master's admission uses a committee rather than individual referees, the committee is not a person and cannot be emailed. In that case the reference comes from a named academic and the committee reads it.",
          "Some programmes ask for a recommendation from a practitioner in industry as well, particularly for professional master's programmes. German professional master's programmes are built around the profession, and a supervisor's assessment of your industry work is often the more relevant of the two.",
          "Ask the referee in German if the programme is German-language. The form will be in German and a referee who is unsure of the register may decline, which is a waste of a good referee.",
        ],
        resources: [
          {
            title: "uni-assist",
            kind: "official",
            url: "https://www.uni-assist.de/en/",
            why: "The source this checkpoint is filed under, and the central service for most German master's programmes. It is where the per-programme document requirements are listed, which is how you find out whether a Gutachterbogen is required at all.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "TUM Informatics MSc (MSc)",
            kind: "official",
            url: "https://www.tum.de/en/studies/degree-programs/detail/informatics-master-of-science-msc",
            why: "A concrete German programme page showing the application window and the documents it asks for. It is where you confirm the reference requirement for the specific programme you are applying to.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official German portals and they state the per-programme document requirements, which is the only reliable source for whether a reference is needed at all. We take no payment for placement, and we do not take payment for anything. The referee does you a favour and the form is free.",
        },
      },
      brief: {
        body:
          "The German request is formal, and the formality is not optional. Your referee is a professor, and the request should read like a professional one: precise, short, and clear about the format, the deadline and what you are attaching. There is one German practice worth knowing about, which is offering to prepare a first draft of the form for the referee to correct.",
        points: [
          "Send the form itself, filled in as far as you reasonably can with the factual details, and ask your referee to correct and complete it. German academics are used to this and it saves them an hour of typing.",
          "Be explicit that the content must be theirs. You are offering a starting point, not writing their assessment, and the distinction matters both ethically and because a committee can tell.",
          "Write the request in German for a German-language programme, and keep it short. One paragraph, the programme, the deadline, the attached form, and the offer to fill it in.",
          "Give an absolute date and allow four to six weeks for a response, which is the margin German programmes expect.",
          "Attach your CV and your motivation letter. The Gutachterbogen usually asks about your academic background, and attaching the letter gives the referee the context to answer it accurately.",
          "Name the person and the institute, so the referee knows which committee the form goes to.",
          "Follow up once at three weeks, in the same formal register.",
          "Ask whether they would be willing to write a free reference as well, if the programme accepts one in addition to the form. In some cases both are wanted, and it is much easier to ask now than to go back later.",
          "Do not ask for a recommendation at all if the programme does not request one. Sending unsolicited forms is noise, and in a competitive round it can read as not having read the requirements.",
        ],
      },
      dossier: {
        body:
          "The German pack is the most procedural of the three, because the form does the work and your job is to make it easy to complete correctly. Filling in the factual fields yourself is legitimate and helpful; writing the referee's assessment is not, and the distinction should be obvious on the page.",
        points: [
          "The university's own form, with the factual fields completed where you can supply them: your name, your degree, your dates, the programme. Leave the assessment sections blank.",
          "Your CV, in the German academic convention, structured and in reverse chronological order. German committees are used to this format and it makes your academic record easy to scan.",
          "Your motivation letter, which the referee will have written or helped you write, and which the form often refers to.",
          "A short factual summary of the work you did with the referee: the project, the period, your contribution. Facts only. It gives the referee the raw material without putting words in their mouth.",
          "Your transcripts, if the form asks the referee to comment on your coursework.",
          "The programme name, the institute, the deadline and the submission route, whether that is a postal address, an upload inside the application portal, or an email to a named person.",
          "A named contact at the admissions office, in case the referee has a question about the form itself.",
        ],
        callout: {
          tone: "good",
          title: "Fill the facts, not the opinion",
          body: "Filling in the factual fields of a reference form on behalf of your referee is a normal German practice and it is a kindness. Writing the assessment is not, and a form that arrives with the assessment already written is a problem for both of you. Keep the line clear and it will stay clear. Nothing in this pack costs you anything, and we take no payment for placement.",
        },
      },
      traps: {
        body:
          "German reference problems are procedural, and they cluster around a small number of assumptions that students carry from other systems. The list below is the set worth knowing.",
        points: [
          "The form was not sent. The single most common failure, and it is entirely avoidable by attaching the form to the first email.",
          "A free-text letter sent instead of the form. German committees read the form. A letter may be read and may not count.",
          "Asking the committee. A Gutachterverfahren is assessed by people, not by a committee, and nobody receives individual emails about it.",
          "Assuming the US model of three letters. German requirements are programme-specific and often lighter, and three letters is a request three people will say no to.",
          "A referee who does not read German writing a German-language form. Ask about the language before you send it, not after.",
          "A form that arrives with the assessment already written. It is a professional problem for the referee as well as an ethical one for you.",
          "Asking for a reference from a lecturer who only ever saw you in a large cohort, where the form asks about your academic ability.",
          "Missing the four to six week window and sending the form in the last fortnight of the application window, when German academics are marking.",
          "An inconsistent set of documents. The form describes your degree and your dates, and they have to match the transcripts you uploaded, because a Gutachter compares them.",
          "Assuming the reference deadline is the application deadline. Some programmes set an earlier one for the Gutachterbogen, and the committee reads them as a set.",
        ],
        callout: {
          tone: "watch",
          title: "Check whether there is a form at all",
          body: "Before you ask anybody, open the programme's admissions page and find the document list. German master's programmes vary so much that the difference between a reference requirement, a form requirement and no requirement at all is often one line in a list. Ten minutes of reading is cheaper than a referee you have to replace.",
        },
      },
    },
  },

  "fr-references": {
    archetype: "references",
    intro:
      "French graduate applications commonly ask for one or two recommandations, often from academics rather than employers, and they are usually submitted directly by the referee through the platform. Check each programme's requirement and its preferred language, ask at least six weeks before the platform deadline, and for French-language programmes have your referees write in French.",
    sections: {
      who: {
        body:
          "French applications want a recommendation, not a reference, and the difference is in the audience. A recommandation is addressed to the admissions committee and argues for you within the logic of the programme's own syllabus. It is a shorter, more formal document than a US letter of recommendation, and it usually follows a set of questions that the referee answers directly in the platform. That structure is why the language matters so much: the form is in French and a referee who cannot work in it cannot complete it.",
        points: [
          "Most French postgraduate programmes want one or two recommandations, and they are most often from academics rather than employers. Some professional programmes in business and management accept a professional recommendation, and some prefer one of each.",
          "The referee submits it through the platform themselves. This is the pattern in France, and it is why your referee needs the link, the deadline and the language stated in the same message.",
          "For a French-language programme the recommendation is expected in French. A referee who writes in English on a French form produces a document the committee cannot read properly, and it may count for nothing.",
          "A supervisor from a research project you did with them is the strongest choice, because the recommandation is short and it needs to make an argument rather than a list.",
          "A professor from a course where you stood out is a good academic referee, and in France a recommandation from a teacher can carry weight because it is often attached to a mark.",
          "Check whether the programme wants a structured form or free text. Some use a formulaire de recommandation with fixed questions, and others accept a letter uploaded to the platform.",
          "The platform usually needs the referee's email address and their agreement, and it contacts them. Ask the referee before you enter them, so that the invitation is not a surprise to someone who was going to decline.",
        ],
        resources: [
          {
            title: "Campus France",
            kind: "official",
            url: "https://www.campusfrance.org/en",
            why: "The source this checkpoint is filed under, and the official body for French study. It is where the application guidance and the document expectations are published, including what a French candidature is expected to contain.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Mon Master",
            kind: "official",
            url: "https://www.monmaster.fr/en/",
            why: "The national platform where most French state-university master's applications are made, and the place you can see how the recommendation request actually works in practice before you ask a referee to do it.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the French official sources and they describe the dossier your recommendation goes into. We take no payment for placement, and we do not take payment for anything. A recommandation is a favour from a busy academic, and the way to get it is to make it easy.",
        },
      },
      brief: {
        body:
          "The French request is formal, brief and entirely administrative on the surface: here is the programme, here is the platform, here is the deadline, here is the language. Underneath that, the thing that makes the difference is the reminder of what you did together. A recommandation is short, and a short document written from memory is a generic document.",
        points: [
          "Give the programme, the platform link, the deadline and the language in the first email. All four, every time, because they differ between programmes and a referee is handling one request at a time.",
          "Give at least six weeks. In a ranked candidature the recommendation is part of a scored dossier, and a missing recommendation is a missing document, not a deferred one.",
          "Say whether the platform will contact the referee or whether you need to send them a link. Both patterns exist and getting it wrong means the referee never receives the request.",
          "Ask for the recommendation to be written in French for a French-language programme, and say so explicitly rather than assuming it.",
          "Attach your CV and your lettre de motivation. The recommendation is short and it is about you in the context of this programme, and your letter gives the referee that context in a page.",
          "Offer to provide a factual summary of the project you did together. Two or three lines, no interpretation, and it gives the referee something concrete to write about.",
          "Ask them to submit it through the platform rather than emailing it to you, and say why: a recommandation sent to your inbox may not be accepted.",
          "Follow up once at three weeks, and remind them of the deadline in the message rather than making them find it.",
          "If they hesitate about the language, ask whether they would be willing to write it with your support on the wording, or whether they would prefer to nominate someone else who writes in French. Both are better than a deadline passing.",
        ],
      },
      dossier: {
        body:
          "The French pack is the smallest of the three and it has one job: to give the referee enough context to write a short, specific document in the right language, in the right form, to the right place.",
        points: [
          "Your CV, one or two pages, in the format French programmes expect, with your academic record and your projects in the foreground.",
          "Your lettre de motivation, which is what makes the recommendation specific to this programme rather than general. It is short enough to attach and it is the single most useful thing you can send.",
          "A factual summary of the work you did with this referee: the project, the period, what you were responsible for, what came out of it.",
          "The programme name, the platform, the deadline with the time zone, and the language the recommendation should be in.",
          "The submission route, spelled out: the link, whether the platform emails the referee, and whether there is a formulaire de recommandation with fixed questions.",
          "Your written project statement, if the programme asked for one, because a referee who can see your research question writes a considerably better recommendation.",
          "A named contact if the referee has a question about the form, which is the admissions office rather than the programme's academic staff.",
        ],
        callout: {
          tone: "good",
          title: "Short document, long context",
          body: "A recommandation is a paragraph or two, so everything it contains has to come from somewhere. If the referee has to generate it from memory you will get a sentence about your seriousness. If they have your letter, your CV and a factual summary, you will get a sentence about your actual work. Nothing in this pack costs you anything, and we take no payment for placement.",
        },
      },
      traps: {
        body:
          "The French reference failures are mostly about the document arriving in the wrong place or in the wrong language, and both are decided in the first email you send.",
        points: [
          "The referee emails you the recommendation instead of submitting it on the platform. This is the single most common French failure, and it happens because the referee assumes it goes to you.",
          "A recommendation written in English on a French programme. It is read, and it is read as an obstacle, and it is often not counted as the recommendation the committee asked for.",
          "A recommendation addressed to you rather than to the admissions committee. Nobody can file it.",
          "A recommendation that describes your courses rather than your work, because the referee never saw you do anything with them.",
          "The platform's invitation never arriving, because the email address was typed wrong or because the referee was never told to expect it.",
          "A recommendation that arrives after the platform deadline, in a system where the candidature is ranked and a late document is not merely late but absent.",
          "Asking a referee who does not work in French to complete a French form, when you could have asked a French-speaking colleague instead.",
          "One referee for two formations, which is read as a lack of genuine interest in one of them.",
          "Not checking the recommendation status in the platform, so you find out on the last day that it was never submitted.",
          "Treating the recommendation as a formality because the rest of the dossier is strong. In a ranked candidature it is scored.",
        ],
        callout: {
          tone: "watch",
          title: "Say it once, completely",
          body: "In the first email, state four things: the programme, the platform, the deadline, and the language. Every one of the four is a way for a good recommendation to end up filed in the wrong place, and one sentence prevents all of them.",
        },
      },
    },
  },

  "sg-references": {
    archetype: "references",
    intro:
      "NUS Computing states that all applications require two recommendation or referee's reports, submitted by the referees through the online admission system rather than emailed as documents. Provide their email addresses in the application so the system invites them directly, give referees at least six weeks and a stated deadline, and monitor the application's referee status, because an unaccepted invite blocks completion.",
    sections: {
      who: {
        body:
          "Two reports are the requirement, and the second one is the hard part. A single referee is a common mistake, and a referee who never accepts the invitation is the same as no referee at all. The pool is the same as anywhere else in academia: a research supervisor, a thesis advisor, a lecturer from a project you did well in, and for research degrees a supervisor whose agreement you already have. What makes Singapore different is the mechanism, because the system contacts the referees itself, and everything depends on that first contact landing.",
        points: [
          "NUS Computing is explicit: all applications require two recommendation or referee's reports, and the referees submit them through the online admission system rather than emailing documents. One report is an incomplete application.",
          "The referees' email addresses go into the application, and the system sends the invitation. Ask each referee before you enter their address, and get their agreement to be named.",
          "Check the addresses character by character. A typed address that is wrong is the most common reason a referee never receives an invitation, and the portal shows only that the request is pending.",
          "For a PhD, the research supervisor who has agreed to supervise you is normally your strongest referee, and in some programmes a supervisor's agreement is expected before the application is processed.",
          "Two referees from the same project read as one reference in two voices. Two different projects, two different people, is the version that reads as a real assessment.",
          "An industry referee is possible in some Singapore programmes and more readily accepted than in many other systems, but check the programme's wording, because some specify academic referees.",
          "In Singapore, a good academic may be travelling or on leave, and the academic calendar does not pause for your deadline. Have a third person in mind.",
        ],
        resources: [
          {
            title: "NUS Computing: PhD application requirements",
            kind: "official",
            url: "https://www.comp.nus.edu.sg/programmes/pg/phdcs/application",
            why: "The source this checkpoint is filed under, and the clearest published statement of the Singapore requirement: two recommendation or referee's reports, submitted by the referees through the online admission system rather than emailed as documents. It is the model of a well-published requirement.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NUS Computing: graduate programmes",
            kind: "official",
            url: "https://www.comp.nus.edu.sg/graduate/",
            why: "The programme's own page for the intakes and the application windows your referees are working inside. The referee deadlines sit inside these windows, and the windows are short.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the programme's own published requirements, which is where the number of reports and the submission method are stated. We take no payment for placement, and we do not take payment for anything. The referee system is free, and the reports have to be written by people who know your work.",
        },
      },
      brief: {
        body:
          "The Singapore request happens in two stages, and the first stage is invisible to you until it fails. You supply the email addresses; the system sends the invitation; the referee accepts; the referee then submits the report. Those are two deadlines, and a referee who is warned about only the second will sometimes accept the invitation too late to submit.",
        points: [
          "Warn each referee before you enter their address that they will receive an invitation from the university, so that it is not filtered as spam by someone they do not know.",
          "Give them both dates: the date by which they should accept the invitation, and the later date by which the report must be submitted. Six weeks is the right margin, and the acceptance should be a week earlier than the submission.",
          "Give them the programme, the intake and a link to the application requirements, so they know what they are agreeing to write.",
          "Say what the system will ask them: their email, their agreement to be a referee, and the report form itself. Some systems ask for consent before the form appears, and the referee needs to know that in advance.",
          "Offer your CV and your statement of purpose. In an invitation-based system the referee may get limited context, and anything you send them is context they would not otherwise have.",
          "Ask them to write about the work you did together, with a couple of specific prompts. Without prompts, an invited referee writes the shortest acceptable thing.",
          "Follow up at three weeks, and check the application's referee status yourself rather than assuming. A referee who never accepted shows up as pending, and pending is not submitted.",
          "If a referee declines after accepting, you have to restart with someone else, and their acceptance date may have already passed. Ask about availability before you put them down.",
          "Keep your own record of when you entered each address and when you last heard from each referee. It is the only thing that makes chasing a stalled reference a two-minute job.",
        ],
      },
      dossier: {
        body:
          "The Singapore pack is small, but it is doing a job you cannot do for them: it gives a referee who has never heard of your programme enough to write something specific. Send one message with one attachment and one set of instructions, and make it easy to act on the same day the invitation arrives.",
        points: [
          "Your CV, one or two pages, in the academic format the programme expects.",
          "Your statement of purpose, or at least the paragraph where you describe your technical direction. It gives the referee the frame for whatever they are asked about your preparation.",
          "A one-page academic summary: what you worked on, where, when, and what you were responsible for. Facts, no spin.",
          "Two or three suggested talking points, framed as things they might want to say rather than as sentences to copy.",
          "The programme, the intake, and what the report is for.",
          "Both dates: accept the invitation by one date, submit the report by another, with the second one at least six weeks after your request and the first one at least a week earlier.",
          "The exact steps, written out: the invitation will come from this address, you will need to log in, this is the link, this is the report form, submit it there and not by email.",
          "A note about the language of the report, if the programme has a stated preference.",
        ],
        callout: {
          tone: "good",
          title: "Make the same-day response possible",
          body: "Referees act on requests they can act on in five minutes. If your message arrives with a link, a summary, three prompts and two dates, a willing referee can accept and submit the same afternoon. If it arrives as a bare question, they will put it in a folder and you will be waiting for an answer that never came. Nothing in this pack costs you anything, and we take no payment for placement.",
        },
      },
      traps: {
        body:
          "Singapore reference problems are all about the two-stage mechanism, and the traps below are the ways it fails. They are more mechanical than in other countries, which is good news, because mechanical problems are preventable.",
        points: [
          "One report instead of two. NUS Computing requires two, and one is an incomplete application rather than a weaker one.",
          "The referee never sees the invitation, because it landed in a spam folder or because the address was typed wrong. Ask them to check, and check the status yourself.",
          "The referee accepts the invitation and never submits the report. The two deadlines are different and people are warned about only one of them.",
          "The referee submits after the deadline. The window does not extend for a referee who was travelling.",
          "Two referees from the same project, which reads as a single opinion presented twice.",
          "A referee who is an industry colleague who cannot speak to academic ability, on a programme that wants academic referees.",
          "The referee writes the report and emails it to you, because your instructions did not say that the platform is where it goes.",
          "A report written about a different programme, because the same email went to three people with the same subject line.",
          "Not monitoring the application status. The portal shows the referee state, and it is the only place the failure is visible before the deadline.",
          "Leaving the referees until the statement is written and submitted, so there is no time to share it with them and the reports are generic as a result.",
        ],
        callout: {
          tone: "watch",
          title: "Pending is not submitted",
          body: "An invitation that has been sent, and not accepted, shows as pending, and a report that has not been submitted shows as pending. Both look identical on the dashboard, and both are a missing document. Check the status weekly from the day you submit, and treat anything still pending a fortnight before the deadline as an emergency.",
        },
      },
    },
  },
};

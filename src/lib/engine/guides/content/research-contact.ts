import type { GuideContent } from "../types";

const V = "2026-10-20";

/**
 * The prospective supervisor dossier.
 *
 * This is the Canadian checkpoint where a strong application still fails, and
 * it fails for a reason that has nothing to do with the application. The
 * University of Toronto's Computer Science department states that only
 * applicants with the support of a potential supervisor will be admitted into
 * the programme. That is not a preference, it is an admission condition, and
 * no document you upload substitutes for it.
 *
 * So this dossier is about a relationship, and it is written to the standard
 * you would hold yourself to with any professional correspondence:
 *
 *   1. DO THE RESEARCH BEFORE YOU WRITE. One concrete, accurate overlap with
 *      their current work is worth more than any amount of enthusiasm.
 *   2. ASK ONE CLEAR QUESTION. Not five. Not a generic request for a
 *      supervisor. One question, answered, is what gets a reply.
 *   3. TREAT SILENCE AS A NO. Academic email is filtered and busy, and a
 *      non-reply is the normal outcome for most of the people you contact.
 *      Which is why this starts months before the deadline and covers several
 *      people rather than one.
 */
export const RESEARCH_CONTACT: Record<string, GuideContent> = {
  "ca-supervisor": {
    archetype: "research-contact",
    intro:
      "Many Canadian MSc programmes will not admit without supervisor support. The University of Toronto's Computer Science department states that only applicants with the support of a potential supervisor will be admitted into the programme. That makes this a relationship to be built, not a form to be filed, and it has to start well before your application does.",
    sections: {
      find: {
        body:
          "The way to find a supervisor is to read first and search second. A faculty directory tells you who is employed; their publications tell you who you would actually be working with, and that is the question the admissions committee is asking. Start from the department, work down to the individual, and narrow to four to six people you could genuinely work with.",
        points: [
          "Read the department's own admissions page before you look at any faculty. The University of Toronto's Computer Science page states the supervisor requirement in plain words, and other departments state theirs, and the wording tells you whether a supervisor is a condition of admission or merely an advantage.",
          "Build the list from the faculty directory, then open each person's page and read their recent work. A list of names is not a shortlist. A list of names with a specific paper in common is.",
          "Read at least the titles and abstracts of their last two or three papers, and ideally one in full. You are looking for a genuine overlap with what you have done, not a keyword match. A master's applicant who can say what a paper does and what they would do differently is a different category of applicant from one who has skimmed a title.",
          "Check whether they are recruiting at all. Faculty pages often say so, and where they do not, the lab's own site, their recent postings and the students currently listed on the page all tell you something. Someone who took two MSc students last year and has no current students may be at capacity.",
          "Check whether they are on sabbatical, whether they are likely to be around for the whole of your degree, and whether they are in the country for the period you would start. A supervisor who is away for the first year of your programme is a real risk and an easy one to spot.",
          "Narrow to four to six. Fewer than four and a single refusal ends the process. More than six and you are not reading anyone's work properly, and a shallow email to six people is worse than a good email to four.",
          "And check what the programme actually needs. Some Canadian MSc programmes accept applications without a supervisor and match you later. If yours does, this milestone is a different shape and you should not skip it, but you also should not treat it as a gate.",
        ],
        resources: [
          {
            title: "University of Toronto CS: graduate admissions",
            kind: "official",
            url: "https://csb.utoronto.ca/graduate-studies/prospective-students/admissions",
            why: "The page behind this milestone, and one of the clearest published statements of the supervisor requirement in Canada: it says directly that only applicants with the support of a potential supervisor will be admitted into the programme. Read it before you assume your department is different.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "University of Toronto CS: faculty directory",
            kind: "tool",
            url: "https://csb.utoronto.ca/people/faculty/",
            why: "The department's own list of people, each with a page carrying their research areas, current students and recent publications. It is where the reading happens, and it is the department's own data rather than a scraped directory.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Universities Canada",
            kind: "official",
            url: "https://www.canadianuniversities.ca/",
            why: "The national directory of Canadian universities, run by the association the institutions belong to. The first stop when you are deciding which departments to approach, and where you find out which ones actually offer the kind of programme you want.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Toronto Metropolitan University: graduate application dates",
            kind: "official",
            url: "https://www.torontomu.ca/graduate/future-students/application-dates/",
            why: "A second Canadian department's published dates and requirements, and a good demonstration of what a department publishes when it publishes it properly. Useful for checking whether a different department's supervisor process works differently.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the departments' and the association's own pages, they are free, and they are where the requirements and the people are actually published. We take no payment for placement, and we do not take payment for anything. There is no paid service on this page that will put you in touch with a professor, because we would not be able to vouch for what it does with your email.",
        },
      },
      approach: {
        body:
          "How you approach a supervisor is the part students get wrong, and the failure is almost always the same: a generic email that could have been sent to anyone. A supervisor reads a batch of these. What gets a reply is a message that shows you have read one piece of their work, that says who you are in one line, and that asks one question they can actually answer.",
        points: [
          "Do the reading before you write, and do it properly. You are looking for a specific paper, a specific problem and a specific thing you have done that relates to it. One accurate sentence about a paper is worth more than a paragraph about how passionate you are.",
          "Write a short message. Academic inboxes are long and the people reading them are busy. If your message is more than about two hundred words it is probably carrying material that should be in the attached CV instead.",
          "Say who you are in one line: your current institution, your degree, and the one or two things you have done that are relevant. Not your life story, and not a paragraph about your career goals.",
          "Make the overlap concrete and checkable. Name the paper, describe what it does in one sentence, and say what you found interesting or what you would do differently. This is the sentence that determines whether the rest of the message gets read.",
          "Ask one question. The best one is the direct one: whether they are accepting new MSc students for your target term, and if so, whether you could send them a short description of your background. A supervisor can answer that in a sentence, and a question that takes a paragraph to answer gets deferred.",
          "Do not ask for funding, a place, or a waiver in the first message. Ask whether they are recruiting, and let the offer of a conversation come from them. Money is a conversation that happens after interest, not before it.",
          "Follow up once, about a week or two later, and keep it shorter than the first message. A single, polite follow-up is normal and professional. A second and a third are not, and they will be read as pressure.",
          "Never send the same message to several people. If you are approaching four to six supervisors, each email names that person and that person's work. A templated email with the name swapped is obvious, and it is the single most common reason a student gets a polite but final no from a whole list.",
        ],
        callout: {
          tone: "watch",
          title: "A non-reply is a no, and that is fine",
          body: "Academic email is filtered, professors are over-supplied with it, and silence is the normal outcome for most of the people you contact. Read a non-reply as a no and move on to your next person. It is not a judgement about your ability, and treating it as one is how students end up sending a despondent second email to someone who was never going to reply.",
        },
      },
      dossier: {
        body:
          "The first message and the first attachment are the same thing: proof that you are a real person with a real background who has read their work. Here is what a good first message contains, in order, and roughly in the proportion of the message it should take.",
        points: [
          "A subject line that says what the email is. Something like 'Prospective MSc applicant, incoming computation research, [your term]' is clear and easy to find later. A subject line that says 'Inquiry' tells the reader nothing.",
          "One line identifying you: your current institution, your degree, and where you are in it.",
          "One or two lines on what you have actually done. A research project, a thesis, a course you built, an internship with a technical component. Concrete beats impressive, and a two-line description of a real project is more persuasive than a paragraph about your ambitions.",
          "One specific paragraph on their work. Name the paper or the direction. Say what it does. Say what you found interesting, what you would want to extend, or what you have tried in the same area that came out differently. This paragraph is the one that decides the reply.",
          "One question: are you accepting new MSc students for the term I am applying to, and would you be open to a short conversation. Give the term explicitly. 'Fall 2027' is a question a professor can answer in one line.",
          "A one-line statement of what you attach and how they can reach you. Attach a CV. Keep the attachment small and name the file clearly.",
          "And nothing else. No second attachment of a personal statement. No long list of your publications. No apology for writing. If they want more, they will say so, and asking to talk is how you find out.",
        ],
        callout: {
          tone: "watch",
          title: "Do not email forty professors the same message",
          body: "A mass email is not a strategy and it is easily detected. It costs you one genuine opportunity, because the professor who reads it and recognises the template is the one you could most have learned from. Four to six carefully read, individually written emails is the number that works, and it is a real number rather than a guideline.",
        },
      },
      timing: {
        body:
          "Start early enough that a silence can be survived. The pattern that catches people is starting the search in the month before the deadline, contacting six people, hearing back from two, and finding that the two are not taking students for your term. The fix is not a better email, it is starting four to six months before the deadline and covering enough people that some will be no.",
        points: [
          "Begin four to six months before the application deadline. A supervisor search is a sequence of no's, and the only way to get to a yes in time is to start early enough to absorb them.",
          "Expect weeks rather than days. Some supervisors reply within a day, most take a fortnight, and some never reply at all. Build the deadline into your plan by assuming the worst, not the best.",
          "Contact your first four to six in one wave, spaced over a couple of weeks, and then continue down the list as you hear back. Do not contact the next person only after the first has declined, because the declination rate is high and the calendar is not generous.",
          "If you get a conversation, take it. A short call or a second email exchange tells you more than a month of correspondence, and it is where you find out whether the project you would work on is real and funded.",
          "Keep a simple tracker: who you contacted, when, what you said, what they said, and what you would do next. A tracker of six rows is the difference between following up with everyone once and following up with nobody twice.",
          "And apply anyway if the programme lets you. Some departments accept applications without a supervisor and match you later, and in others an application with a named supervisor is simply a stronger one. Do not treat the supervisor search as a reason to miss the application deadline.",
        ],
        roadmap: [
          {
            label: "Months 6-5 before the deadline",
            title: "Read, and build the list",
            goal: "A list of four to six people, each with a specific paper or direction in common with your work.",
            hours: "8-10 hours a week",
            focus: [
              "Read the department's admissions page and confirm what it says about supervisor support for the programme you are applying to.",
              "Work through the faculty directory and open each page. Read the recent publications, not just the research areas line.",
              "For each person, write one sentence naming a specific overlap with your own work, and one question you would want to ask them. If you cannot write the sentence, they are not on the list.",
              "Check current students, sabbaticals and recruiting notes, and drop anyone who looks unlikely to be taking students for your term.",
            ],
            checkpoint: "You have four to six people, and for each one a written note of the specific work you have read and the specific question you would ask.",
          },
          {
            label: "Months 5-4 before the deadline",
            title: "Write and send the first wave",
            goal: "Four to six individually written first messages in professors' inboxes.",
            hours: "6-8 hours a week",
            focus: [
              "Write each message from scratch, naming that person's work. Never reuse a template with the name swapped.",
              "Keep it under roughly two hundred words. Attach a one-page CV and nothing else.",
              "Ask the direct question: are you accepting new MSc students for this term, and would you be open to a short conversation.",
              "Send them out over a couple of weeks rather than all at once, and start your tracker on the day each one goes out.",
            ],
            checkpoint: "Every person on your list has received a message written for them, and the tracker has a row for each.",
          },
          {
            label: "Months 4-3 before the deadline",
            title: "Follow up once, and go down the list",
            goal: "Every contacted person either answered, has had one polite follow-up, or has been left alone.",
            hours: "5-7 hours a week",
            focus: [
              "Follow up once with anyone who has not replied, about a week or two after the first message, and keep the follow-up shorter than the original.",
              "Work down your list of second-choice supervisors for anyone who has declined or has not replied. This is the step that is skipped, and it is where the yes usually is.",
              "Where somebody replies and asks for a conversation, take it and prepare: a two-page description of your background and your ideas, not a long document.",
              "Do not email anyone a second time after a follow-up. One follow-up is professional. Two is pressure.",
            ],
            checkpoint: "No one on your list is in an unclear state, and every positive response has been followed up with a conversation.",
          },
          {
            label: "Months 3-2 before the deadline",
            title: "Decide, and write it into the application",
            goal: "A named supervisor and a genuine statement of fit, or a clear decision to apply without one.",
            hours: "4-6 hours a week",
            focus: [
              "Where you have supervisor support, get it in writing. A short email from the professor saying they would be willing to supervise you is worth keeping, and some departments ask for exactly that.",
              "Write the supervisor into your application in the way the department asks for, and reference their work specifically. The paragraph that names a paper and says what you would do with it is the most persuasive paragraph in the whole file.",
              "Where you have no support and the programme still accepts applications, apply anyway and keep looking. A missing supervisor is a disadvantage, not a rejection, in the programmes that allow it.",
              "Where the programme genuinely requires support and you have none, contact the graduate coordinator. They know who is recruiting this year in a way the public directory does not, and they can tell you about a new arrival who is not yet on the website.",
            ],
            checkpoint: "Your application either has a named supervisor and a support email, or a decision on record that you are applying without one.",
          },
          {
            label: "The last month before the deadline",
            title: "Apply, and keep the relationship going",
            goal: "The application submitted, and the supervisor relationship maintained rather than left to go cold.",
            hours: "3-4 hours a week",
            focus: [
              "Submit the application before the deadline, with margin. Do not plan to submit on the day, because the portal and the reference letters both carry their own risk.",
              "Send a short thank-you to anyone who helped you, and keep them informed when you submit. A supervisor who has met you and then hears nothing for six months may have taken on another student.",
              "Keep the relationship alive through the admission decision. The professor who is supporting you is often the person who will supervise you, and the handover from admission to enrolment is where many good arrangements quietly lapse.",
            ],
            checkpoint: "The application is submitted, and every supervisor you spoke to has been told that you have applied.",
          },
        ],
      },
    },
  },
};

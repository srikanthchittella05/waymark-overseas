import type { GuideContent } from "../types";

const V = "2026-10-20";

/*
 * The personal statement dossier.
 *
 * The essay is the part of the application a committee cannot check. Every
 * other document can be verified, and most of them are verified. The
 * statement is the only place where you argue, and arguing badly is more
 * expensive than getting a date wrong.
 *
 * What this dossier keeps making, in each country's own terms:
 *
 *   1. THE DOCUMENT HAS A DIFFERENT NAME AND A DIFFERENT JOB IN EVERY
 *      COUNTRY. The US statement of purpose is a long technical narrative.
 *      The UK personal statement is one argument about fit with a subject.
 *      The Canadian statement of academic interest is a research plan. The
 *      German Motivationsschreiben is a formal letter. The French lettre de
 *      motivation is a structured justification tied to a syllabus. The
 *      Australian statement is a course fit document. The Singapore statement
 *      of purpose covers three named things. Writing one version for all of
 *      them is the most common mistake in the whole application.
 *   2. SPECIFICITY BEATS ENTHUSIASM. Every committee reading these has read
 *      several hundred. The only thing that survives being read is a detail
 *      that could only be true of you.
 *   3. NOBODY NEEDS AN AGENCY. There is no paid service that reads better
 *      than a draft that has been rewritten three times by someone who knows
 *      the subject. Every milestone here ends with the official source the
 *      statement is written against.
 */
export const PERSONAL_STATEMENT: Record<string, GuideContent> = {
  "us-sop": {
    archetype: "personal-statement",
    intro:
      "US CS master's statements of purpose are long, specific and character-limited. Stanford CS caps the statement of purpose at 8,000 characters including spaces, so you draft to length and then iterate. The committee is not looking for a reason to love you. It is looking for evidence that you can do this specific programme, and it wants that evidence in narrative form rather than in a list.",
    sections: {
      brief: {
        body:
          "The statement of purpose is the one document where you talk about your own work, and it is read more carefully than any other part of a US graduate application. The brief is consistent across programmes: one coherent account of who you are as a researcher, with enough specific evidence that a reader can picture what you actually did, and a reason why this programme is the right place for the next step. Around 700 to 1,000 words is the working range for most US CS master's statements, and the hard limit is the programme's own, which is a character cap at several schools rather than a word count.",
        points: [
          "It is not a CV in prose. The CV lists; the statement argues. If a paragraph could be pasted into your CV with the verbs changed, it belongs in the CV.",
          "It is not a statement of enthusiasm. Nobody decides anything about you because you love the subject. They decide because the paragraph about the thing you built contains a specific fact they could check.",
          "It is not one document for your whole shortlist. US programmes ask separately why their programme, and the whole point of asking separately is that they expect separate answers.",
          "It is read by people who have read the others that day. The committee is comparing your narrative against thirty other narratives built on the same prompt, so what you are really competing on is whether your details survive comparison.",
          "The technical content is the differentiator. A committee can tell in one sentence whether you have actually done the work, because the sentence either contains a detail or it does not.",
        ],
        resources: [
          {
            title: "Stanford CS master's admissions FAQ",
            kind: "official",
            url: "https://www.cs.stanford.edu/admissions/masters-admissions-frequently-asked-questions",
            why: "The source this checkpoint is filed under, and the clearest published account of what a US CS master's statement has to contain. It states the 8,000 character cap on the statement of purpose including spaces, which is the number to draft to.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "The Common App",
            kind: "official",
            url: "https://www.commonapp.org/",
            why: "Where the actual essay prompts and their character limits are published for the schools that accept it. Read the prompt your school uses before you write a word, because the prompts differ in what they reward.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Stanford CS graduate application checklists",
            kind: "official",
            url: "https://www.cs.stanford.edu/admissions/graduate-application-checklists",
            why: "The document list the statement has to fit inside, and a useful check that you are writing the right document for the right programme rather than a generic master's essay.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the programme's own pages and the shared application's own prompts, which is where the rules and the limits are. We take no payment for placement, and we do not take payment for anything. There is no paid service that writes a better statement than three drafts of your own.",
        },
      },
      structure: {
        body:
          "A strong US statement of purpose has five moves, and they happen in roughly that order. The order is not arbitrary: each part sets up the next, and a reader who is unconvinced by paragraph two will not reach paragraph four. Draft against the programme's own prompt as well, because some programmes specify a structure and some specify a question.",
        subsections: [
          {
            title: "The opening: a concrete thing you did",
            what: "One paragraph that puts a specific piece of your work in front of the reader. Not a statement about yourself, and not a statement about the field.",
            format: "One paragraph, usually the shortest in the statement. Some programmes want a different opening, and the prompt says so when it does.",
            score: "Read first, in a committee's attention that is already tired. Its job is to make the reader keep going.",
            topics: [
              "A project, a problem, a dataset, a bug, a lab, a piece of work. Something with edges.",
              "The moment it went wrong or went deep, and why that moment mattered.",
              "The direction it pushed your thinking, which sets up the through-line.",
            ],
            tip: "Do not open with a sentence about why you are passionate. Open with a sentence about something you did that had a specific shape.",
          },
          {
            title: "The through-line",
            what: "The paragraph that names the one technical thread your statement is about, and connects two or three pieces of work along it.",
            format: "One paragraph, and it is the spine of the statement. If you cannot write it, you do not yet know what the statement is about.",
            score: "This is what a reader remembers when they compare your file with the twenty-nine others they read that day.",
            topics: [
              "The single problem area your work keeps circling.",
              "The two or three projects, courses or pieces of work that show it, in order, with the thread made explicit.",
              "Why this thread, and what you have not yet been able to do with it.",
            ],
            tip: "Write this sentence in a separate document first: the one sentence that names your technical interest. Every strong statement has one, and if yours takes a paragraph to express, the statement will sprawl.",
          },
          {
            title: "Evidence of ability",
            what: "The detail that separates a strong statement from a warm one.",
            format: "One or two paragraphs, inside the same narrative. This is not a list of achievements, it is the argument that you can do the work.",
            score: "Read by people who can tell the difference between a claim and an achievement. The claim is free; the achievement is what they are reading for.",
            topics: [
              "What you built, and what it did, with numbers where you have them.",
              "What broke, and what you measured to find out.",
              "What you would do differently, which is the most convincing sentence in most strong statements.",
            ],
            tip: "Put one measurable detail in every paragraph. A latency figure, a dataset size, a number of users, a percentage. It is a small thing that reliably separates a statement from a letter of application.",
          },
          {
            title: "Why this programme",
            what: "The paragraph that connects your thread to this school's specific courses, this school's specific faculty and this school's specific lab.",
            format: "One or two paragraphs, and it must be different for every school you apply to. Some programmes ask for this separately, in which case this paragraph does not appear here.",
            score: "Read by someone who knows whether the claim is accurate. Naming a faculty member whose work does not exist, or a course that does not exist, is checked and it lands badly.",
            topics: [
              "The specific course or courses you would take, and what you would do in them that you could not do elsewhere.",
              "A faculty member, a lab, a group, and the specific thing they are working on that you want to work on.",
              "A constraint or a gap in your preparation, and what in the programme addresses it. Saying this yourself is much better than having it found for you.",
            ],
            tip: "Do not paraphrase the programme's ranking or its marketing. One named course and one named person is worth more than three paragraphs about the university.",
          },
          {
            title: "The close",
            what: "One short paragraph saying what you intend to do with the degree, and stopping.",
            format: "One paragraph. Some statements of purpose simply end; that is acceptable.",
            score: "Read last, and remembered. It is where you show that you have a direction and are not asking the committee to supply one.",
            topics: [
              "The work you want to do next, in one or two sentences.",
              "Any sentence that tells the reader you have thought about what the programme is for.",
            ],
            tip: "Do not beg, do not apologise and do not promise to make the committee proud. State the intention and stop. The closing paragraph is the first thing cut when you are over the limit, so make it the one that survives.",
          },
          {
            title: "Drafting against a character budget",
            what: "The mechanics of fitting a narrative into a cap, which is a separate skill from writing one.",
            format: "Stanford CS caps the statement of purpose at 8,000 characters including spaces, roughly 1,300 to 1,500 words. Other programmes publish a word limit instead. Check the programme's own limit.",
            score: "Not scored at all. It is simply whether your statement exists at the point you press submit.",
            topics: [
              "Count characters as you draft if there is a cap, not afterwards.",
              "Cut whole paragraphs rather than trimming every sentence. A paragraph you cut is a paragraph you did not need.",
              "Do not plan to write it and shorten it later. Write to the limit from the first draft.",
            ],
            tip: "Some portals truncate silently at the limit rather than rejecting the submission. If you write 9,000 characters into an 8,000 character box, the last thousand characters vanish and you will not be told which ones.",
          },
        ],
      },
      pitfalls: {
        body:
          "The mistakes below are the ones that show up in US master's statements often enough to be worth naming. Most of them are not fatal on their own. They are fatal in combination, because each one spends characters that a specific detail could have used.",
        points: [
          "The catalogue. A list of projects, awards, courses and roles with a sentence of framing and no analysis. It reads like a CV that learned to use first person.",
          "The generic opening. A sentence about lifelong fascination, or about how your first programming project felt. It tells the reader nothing they can use.",
          "The emotional opening about a grandparent or a school trip. It is not a disqualifier, but it spends the most-read paragraph of the statement on information that does not bear on your ability to do the programme.",
          "The CV in prose, and the prose in the CV. Both documents then say the same thing twice and neither says anything the other does not.",
          "The same statement for every school, with the name changed. US committees occasionally read each other's files, and this is instantly visible.",
          "Over-claiming. Describing a class project as research, or a course exercise as a system you designed, is the fastest way to lose a technical reader's trust.",
          "Apologising. Explaining your gaps, your gaps and your grades. Explain a gap once, in a sentence, and move on to what you did instead.",
          "Name-dropping without evidence. A list of technologies and papers you have read is not the same as knowing what they do.",
          "Writing past the limit and hoping the portal is forgiving. Some portals truncate. Some do not.",
          "Writing it in one sitting. A statement written in a night is a list. The structure survives only if you have looked at it a second time.",
          "Asking for feedback only from people who will be kind. The readers are academics in your field, and one of them reading your draft for twenty minutes will save you three rewrites.",
          "Submitting it without checking how it reads on the page. Long paragraphs break badly in some portals, and a wall of text is not read carefully even by a committee that wants to.",
        ],
        callout: {
          tone: "watch",
          title: "Get two external readers, not two friends",
          body: "Two people outside your own circle, ideally one who knows the field, is the cheapest improvement available to you. The cost is an email and an honest request. What they give you is not a compliment and not a grade; it is a list of the paragraphs where they stopped believing you, which is the only list that matters.",
        },
      },
      examples: {
        body:
          "Openings are where statements are won and lost, so it is worth looking at how two versions of the same first idea read differently. Both of these are about the same undergraduate project. One is a paragraph about a person. The other is a paragraph about work.",
        points: [
          "Weak opening: \"I am writing to express my interest in computer science. I have always been passionate about technology and believe it can change the world.\" This tells the committee nothing it can use. There is no work, no specific problem, and no reason to believe anything about you that was not already assumed.",
          "Weak opening: \"Growing up, I was fascinated by how video games were made, and I decided to pursue computer science to turn that fascination into a career.\" This is warmer, and it is still unusable. It spends the most-read paragraph of the statement on a fact about your childhood, and it promises a career story rather than demonstrating capability.",
          "Strong opening: \"Our retrieval system answered questions it could not answer, and it did it confidently. In the same week I found the same failure three times on three different corpora, which told me the problem was not the corpus but the way the system decided it knew something. That bug took my project in a direction I did not plan and turned into the work I now want to build on.\" This names a specific artefact, a specific failure, a specific observation, and the direction it pushed you, all in four sentences. Every sentence is doing work.",
          "What makes the strong version work: it is concrete without being long; it demonstrates the habit of mind that admissions committees are selecting for, which is noticing a failure and asking why; and it sets up a through-line that the rest of the statement can develop.",
          "The same principle applies to any field. In a life sciences statement the equivalent is a specific experiment and a specific unexpected result. In an economics statement it is a specific dataset and a specific anomaly. In a humanities statement it is a specific passage and a specific argument. The form is always the same: a thing you did, a thing that happened, and what it made you think.",
          "A quick test for your own opening: read it aloud. If it would still be true after swapping your name for someone else's, it is not an opening yet. It is an introduction to a topic.",
          "One more test that catches most problems: cover the applicant's name and read the first paragraph. If it could belong to any applicant in the pool, the paragraph has not yet earned the reader's attention, and everything after it is being read with less interest than you would like.",
        ],
        resources: [
          {
            title: "Berkeley Graduate Division: how to apply",
            kind: "official",
            url: "https://grad.berkeley.edu/admissions/apply/",
            why: "A second real programme page showing how another US graduate programme frames its own essay requirements. Comparing two published prompts is the quickest way to understand which parts of the statement are standard and which are local.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Stanford CS master's admissions FAQ",
            kind: "official",
            url: "https://www.cs.stanford.edu/admissions/masters-admissions-frequently-asked-questions",
            why: "The programme's own account of what it looks for, including the character cap and the GRE position. Worth re-reading once your draft is finished, because it is the document your statement is written against.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the programmes' own published requirements, which is where the prompts and the limits are. We take no payment for placement, and we do not take payment for anything. Nobody who charges you money is going to know your project better than you do.",
        },
      },
    },
  },

  "gb-sop": {
    archetype: "personal-statement",
    intro:
      "UK personal statements are judged on fit with a specific subject, not on general passion, and they are never reused across a shortlist without being adapted. Most UK applications use one personal statement for the whole UCAS list plus a course-specific answer for each course, which is why the tailoring has to happen in the supplementary question rather than in the statement itself.",
    sections: {
      brief: {
        body:
          "The UK statement is shorter, less technical and more tightly governed than the US one. Around 500 words is a reasonable working target for most taught master's statements, but the limit is set by the course and it varies, so check the course's own limit and write to that. The judges are admissions tutors and often the course team, reading quickly and in batches, and they are looking for one thing in particular: evidence that you are ready for this discipline and that you have thought about what the course will ask of you.",
        points: [
          "It is one statement for your whole list. On UCAS you write a single personal statement that serves every course you apply to, and each course can then ask its own supplementary question in the options form. Some courses ask for a separate course-specific statement instead, so check.",
          "It is about the subject, not about you as a person. A UK statement that reads as autobiography is answering a question nobody asked. The personal detail belongs in the UK system in the reference and the form, not in the statement.",
          "It is about academic readiness. The question behind the prompt is: can this person handle this course, and do they understand what it will involve. That is a different question from the US one, which asks what you want to build.",
          "It should be in the discipline's language. If you are applying to a taught master's in a subject you studied, use that subject's vocabulary rather than general language about learning and teamwork.",
          "It should be one argument, not several. Admissions tutors are reading for the shape of your reasoning, and a statement that makes four separate points makes none of them.",
        ],
        resources: [
          {
            title: "UCL Computer Science MSc",
            kind: "official",
            url: "https://www.ucl.ac.uk/study/prospective-students/graduate/courses/computer-science-msc",
            why: "The source this checkpoint is filed under, and a course page of the kind you will actually be writing against. It shows the modules, the structure and the course-specific content that a tailored statement has to reflect.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "UCAS: how to apply",
            kind: "official",
            url: "https://www.ucas.com/postgraduate/how-to-apply",
            why: "UCAS's own explanation of the personal statement field and the supplementary questions, and of the difference between them. Reading it before you write saves you from putting a course-specific argument where a general one belongs.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "UCL: how to apply for postgraduate study",
            kind: "official",
            url: "https://www.ucl.ac.uk/study/prospective-students/graduate/how-to-apply",
            why: "A worked example of the UK postgraduate process from a university that runs its own reference system, including what is submitted together and what the student is responsible for.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the course's own page and the national service's own guidance, which is where the prompts and the expectations are. We take no payment for placement, and we do not take payment for anything. UK postgraduate statements are written by applicants, and there is good reason to keep it that way.",
        },
      },
      structure: {
        body:
          "A UK statement that works has five parts, and in most cases it fits in around 500 words, which means each part is short. The hardest part is that it has to argue about a discipline without a project to hide behind, so the evidence has to come from your academic history rather than from a narrative.",
        subsections: [
          {
            title: "The opening: what you studied and the thread through it",
            what: "One short paragraph that establishes your academic starting point and the single question that runs through it.",
            format: "Two or three sentences. UK statements are read in batches, so the opening has to do the framing work immediately.",
            score: "Read first. Tutors are looking for whether you can talk about your subject with precision, and the opening is where they find out.",
            topics: [
              "Your degree or current course, and the area within it that you kept returning to.",
              "The question or problem that has organised your interest, stated in the discipline's terms.",
              "The work you have done that the rest of the statement will draw on.",
            ],
            tip: "Do not start with why you love the subject. Start with what you have already done inside it.",
          },
          {
            title: "The evidence paragraph",
            what: "The part that proves the claim made in the opening, usually built around a project, a dissertation or a placement.",
            format: "One paragraph, the longest in the statement. It is where you earn the right to the rest of the argument.",
            score: "This is the paragraph that separates a statement from a letter of application, because it is the only one a tutor can check against your transcript.",
            topics: [
              "One piece of academic work, described with enough detail that you clearly did it.",
              "What it taught you, and what it changed about how you approached the subject.",
              "Any method or theoretical vocabulary that shows you operate at the level the course expects.",
            ],
            tip: "Pick work where you can say something specific about a decision you made. A project where you chose a method and can say why is worth three projects where you only participated.",
          },
          {
            title: "The preparation paragraph",
            what: "Where you connect your academic background to what this course will actually involve.",
            format: "One paragraph, and it should be written so that it could be adapted by changing one paragraph, because that is exactly what you will do for each course.",
            score: "Read for whether the student understands the course's content. A tutor who teaches the course knows whether you have understood it.",
            topics: [
              "The parts of your degree that map onto the course's core content.",
              "Any gap in preparation, named and addressed, which reads as honesty rather than as a weakness.",
              "The specific knowledge the course assumes, and where you have got it.",
            ],
            tip: "Write this paragraph so that the course-specific names appear only in the last two sentences. Then adapting it for five courses is a five-minute job rather than a rewrite.",
          },
          {
            title: "The course-specific paragraph",
            what: "Why this course, at this university, for you. This is the part that changes for every application.",
            format: "One paragraph, and in a UCAS application it usually sits in the supplementary answer rather than in the personal statement. Some courses want it in a separate statement instead, so check.",
            score: "Read as the test of whether you applied deliberately. A tutor who taught the module you named will know whether you meant it.",
            topics: [
              "One or two specific modules, named, and what you want from them.",
              "A research group, a specialisation or a teaching arrangement that matters to you.",
              "Something about the department that only exists on its pages, which is proof you read them.",
            ],
            tip: "One named module with a real reason beats a paragraph about the department's reputation. The reputation is a fact they know and you do not.",
          },
          {
            title: "The close",
            what: "Where you are going with this, in one or two sentences.",
            format: "One or two sentences. Some UK statements simply stop after the preparation paragraph, which is acceptable, but a close that states a direction is better than a close that repeats the opening.",
            score: "Read last, quickly. It can only add to what is already there, so keep it short and do not introduce anything new.",
            topics: [
              "The direction you want the course to take you in.",
              "Any mention of a specific placement, project or research interest you will bring into the course.",
            ],
            tip: "Do not summarise your whole statement in the close. The last paragraph is often the one that gets cut when you are over the limit, so it should be the one you mind least.",
          },
        ],
      },
      pitfalls: {
        body:
          "UK statements fail on a small number of things, and the pattern is consistent: they are written as though the reader does not know the subject. Every mistake below is a version of that.",
        points: [
          "The travelogue. A statement about your journey to this point, with the study described as a series of stages. Tutors read this every day and it tells them nothing they can use.",
          "\"I am passionate about\". The word appears in a large share of rejected UK statements, usually attached to a subject rather than to a piece of work.",
          "A course-specific paragraph that names the course title and the subject and nothing else. The course title is printed on the form the reader is holding.",
          "The same paragraph submitted unchanged for five courses. This is read as no interest in any of them, and it is the fastest way to lose five places at once.",
          "The course-specific argument put in the personal statement instead of the supplementary answer. It makes the shared statement unusable for your other choices and it can be lost entirely if the form expects it elsewhere.",
          "Writing about a past you have left. If you have changed direction, say so once and then spend the paragraph on what you do now. Repeating the change three times signals that you are not over it.",
          "Achievements without explanation. A first-class degree and a list of awards are a CV. The statement has to say what they show.",
          "Writing 800 words into a 500-word field. The form truncates or rejects, and the paragraph you lose is always the last one.",
          "Generic language about teamwork, communication and time management. These are stated in the form already, and they are what every applicant says.",
          "Writing it in isolation. A statement that has been read aloud to one person who knows the subject will improve more than three rewrites alone will.",
        ],
        callout: {
          tone: "watch",
          title: "One statement, many courses, one adaptation each",
          body: "The reason UK applications feel harder than US ones is the structure: one statement, several courses, and the specific argument that makes each one distinct. Write the shared statement once, carefully, and write the specific paragraph last. Students who reverse that order end up with a statement that cannot be used for anything.",
        },
      },
      examples: {
        body:
          "The difference between a UK statement that works and one that does not is usually visible in the first two sentences. Both examples below are from students with comparable grades applying to comparable courses. One is a biography. The other is an argument about a subject.",
        points: [
          "Weak opening: \"I have always had a strong interest in computer science, and I am writing to apply for the MSc in Computer Science because of my passion for the subject and the excellent reputation of your programme.\" Two problems. The first sentence is about you and tells the reader nothing. The second sentence is about the programme in terms the tutor already knows, which tells the reader you have not been to the course pages.",
          "Weak opening: \"Throughout my academic journey, I have developed a deep enthusiasm for computer science, which has motivated me to pursue further study at the highest level.\" This is the UK version of the US generic opener, and it is the single most common sentence in the rejected pile. It is not a crime, but it spends the most-read part of the statement on a claim that carries no evidence.",
          "Strong opening: \"My degree was in mathematics, and the question that stayed with me through it was how a model behaves when its assumptions quietly stop holding. My final-year project was about that, and my placement was about it commercially, which is where I learned how badly a model can fail before anyone notices.\" This names a discipline, a question and two pieces of work in three sentences. It also sets up the course-specific paragraph that will follow, because a course with a modelling or data component can be matched to it directly.",
          "What makes the strong version work: it establishes that the student operates in the subject's language, it gives the reader two evidence points to look forward to, and it creates a through-line that the rest of the statement can develop without ever naming it again explicitly.",
          "The test that separates them: after reading the strong opening, you can guess what the rest of the statement will contain and you want to read it. After the weak opening, you know the rest will contain generalities, and you are already checking the word count.",
          "The same structure works in any subject. A history statement opens with a specific archival problem. A law statement opens with a case or a statute that puzzled you. An economics statement opens with a market anomaly. The rule is that the first sentence contains something a reader could check.",
          "A practical exercise worth doing once: write your opening in three sentences, then write three alternative openings from three different pieces of your work, and pick the one that reads least like an application. The best one is rarely the first.",
        ],
        resources: [
          {
            title: "UCAS: how to apply",
            kind: "official",
            url: "https://www.ucas.com/postgraduate/how-to-apply",
            why: "The national service's own guide to the personal statement field and the supplementary questions, including what it says about tailoring. It is the shortest read that tells you where the course-specific argument is supposed to go.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "UCL Computer Science MSc",
            kind: "official",
            url: "https://www.ucl.ac.uk/study/prospective-students/graduate/courses/computer-science-msc",
            why: "The course page your specific supplementary answer has to reference. Every claim in a course-specific paragraph should be checkable against a page like this one.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the course's own pages and the national service's own guidance. We take no payment for placement, and we do not take payment for anything. If you want your statement read by someone who knows the subject, ask someone who knows the subject, not a service.",
        },
      },
    },
  },

  "ca-sop": {
    archetype: "personal-statement",
    intro:
      "In Canada the document is called a statement of academic interest or a research statement, and it is not a personal statement with a different title. Graduate applications there are organised around a research narrative tied to a supervisor or a lab, so the letter is written as a research plan. Three to five pages is a working range for many of them, and the limit is set by the programme.",
    sections: {
      brief: {
        body:
          "The Canadian document argues that you are the right person to do a specific piece of research with a specific group. It opens with the research question and the supervisor or lab, not with your background, and it closes with feasibility and contribution. A reader on the admissions committee, and often the potential supervisor, is looking for three things in order: that you have a real question, that you can do the work, and that you belong in this lab rather than another one.",
        points: [
          "It is a research plan with a person in it. The supervisor and the lab are named in the opening paragraph, because the question and the group are not separable in a Canadian application.",
          "It is also the document your referees read. When you send it to them with your CV, they can write about a specific proposal rather than about a student they once taught, and that is a much better letter.",
          "It is not a statement of academic interest in the general sense. The interest is assumed; what is being assessed is whether the question is real, the approach is plausible, and you are equipped to start.",
          "It is read by people who are specialists. A committee that runs a research master's is looking for a graduate student who can be productive quickly, and vagueness is read as a risk rather than as modesty.",
          "The length is programme-specific and it is enforced. Three to five pages is a reasonable working range for many research statements, but some programmes ask for two and some ask for a proposal of a different shape entirely, so cut to the programme's own limit.",
        ],
        resources: [
          {
            title: "U of T Institute of Medical Science: deadlines and requirements",
            kind: "official",
            url: "https://ims.utoronto.ca/application-deadlines-and-requirements",
            why: "The source this checkpoint is filed under, and a published breakdown of what a Canadian graduate application actually requires. It is the clearest place to see how the research statement sits alongside the rest of the file.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Toronto CSB graduate admissions",
            kind: "official",
            url: "https://csb.utoronto.ca/graduate-studies/prospective-students/admissions",
            why: "A departmental admissions page from a research-heavy department, showing how the programme describes its own expectations. Reading two different ones tells you which requirements are universal and which are local.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the university's own pages and they state the requirements the file is judged against. We take no payment for placement, and we do not take payment for anything. A research statement is the most personal document in any application and it should be written by the person doing the research.",
        },
      },
      structure: {
        body:
          "A Canadian research statement has six moves. The order is close to fixed, and it is not the order of a personal statement, because the committee is assessing a project before it is assessing you. The through-line is: here is the question, here is why it is open, here is how I would attack it, here is why I am the one, here is where it happens, and here is what it produces.",
        subsections: [
          {
            title: "The opening: the question and the group",
            what: "One paragraph naming the research question and the supervisor or lab, in that order.",
            format: "One paragraph, in the first page. Some programmes ask for the supervisor's name in the first sentence specifically, and it is worth doing anyway.",
            score: "Read by the person whose name is in it. This paragraph decides whether the rest of the document is read carefully or skimmed.",
            topics: [
              "The research question, stated in one or two sentences in the language of the field.",
              "The supervisor and the lab, and why their work is the right home for this question.",
              "The scope: what is in the project and what is explicitly out of it.",
            ],
            tip: "If the supervisor's name is not in the first paragraph, the reader has to go and find it, and the paragraph in between is one they will skim.",
          },
          {
            title: "Why the question is open",
            what: "The gap: what is known, what is not, and what makes the missing piece tractable.",
            format: "One to two paragraphs, and it should read like a scholar's summary rather than a literature review.",
            score: "This is where a committee checks whether you have read the field or read the field's titles. It is the paragraph that separates a research statement from a proposal for something that already exists.",
            topics: [
              "The prior work, by name, and the specific limitation of it.",
              "The observation or the gap that makes you think something different is possible.",
              "Why the gap matters practically, if it does.",
            ],
            tip: "Name the papers. A research statement that cites nothing reads as a plan written without reading, and a supervisor will spot it in the first paragraph.",
          },
          {
            title: "The approach",
            what: "How you would do the work, in enough detail that somebody can tell whether it is possible.",
            format: "One to two paragraphs, and the most technical section of the document.",
            score: "Assessed by people who could supervise the work. An approach that cannot work is not a flaw of style; it is the whole answer.",
            topics: [
              "The method, the system, the data, the evaluation. Named and specific.",
              "Where the data or the systems come from, and whether you can get them.",
              "What would count as success, and what would count as failure. Both are asked for in good proposals and only the first is usually written.",
            ],
            tip: "One paragraph of your actual work, referred to explicitly, is worth more than a page of method description, because it tells the reader you have done this kind of thing before.",
          },
          {
            title: "Prior preparation",
            what: "The coursework, research and engineering work that makes you the right person to attempt this.",
            format: "One paragraph, concrete, with named courses, named projects and named tools.",
            score: "Read against the question. A committee wants to know what you would need to learn, and this paragraph tells them.",
            topics: [
              "The specific coursework that covers the technical foundations the project needs.",
              "Any research, thesis, publication, or substantial engineering project adjacent to the question.",
              "Any gap in preparation, stated plainly, with what you would do about it.",
            ],
            tip: "Do not pad this with grades. A committee can see your grades. Tell them what you did, and the grades follow from it in their minds.",
          },
          {
            title: "Fit with the group",
            what: "Why this supervisor and this lab, and what the group brings.",
            format: "One paragraph, and it should demonstrate that you know the group's recent work rather than that you know its name.",
            score: "Read by someone in the field who will work with you. It is the paragraph that answers the question they are privately asking: will this person fit in my group.",
            topics: [
              "The group's current projects, and the one your question sits inside.",
              "The infrastructure, the code, the data or the lab resources the project will use.",
              "What the group would contribute and what you would contribute, which is not the same thing.",
            ],
            tip: "Read the group's recent publications or project pages before you write this. One sentence about a specific result or a specific tool is the whole paragraph's job.",
          },
          {
            title: "The contribution and the first year",
            what: "What the project would produce, and what you would do in the first months.",
            format: "One closing paragraph, ideally with a rough sequence rather than a dated timeline.",
            score: "This is what a supervisor reads to decide whether they want to supervise you. It tells them what their first year with you looks like.",
            topics: [
              "The first milestone: the smallest thing that could be wrong, and how you would find out.",
              "The expected contributions, in the order you would make them.",
              "How the project connects to the broader direction of the lab.",
            ],
            tip: "End on what you would build rather than on why the topic interests you. Committees have read a thousand statements about interesting topics.",
          },
        ],
      },
      pitfalls: {
        body:
          "The Canadian statement has a specific failure mode: it is written like a personal statement and is then judged as a research proposal. The mistakes below are all versions of that, plus the ordinary ones about evidence and length.",
        points: [
          "A passion statement. A first-person account of why you fell in love with the subject, followed by a list of courses. It does not answer the question the committee asked, which is whether you can do this work.",
          "No question. A narrative that describes an area of interest without ever naming a specific problem. There is no thesis to assess, so there is nothing to say yes to.",
          "A supervisor named in the opening and then ignored. The rest of the document never mentions the group's work, the lab's systems, or anything that shows you have read what they publish.",
          "A literature review. Two pages of what other people have done, and half a paragraph of what you would do. The ratio is wrong. The question should be in the first page and the method should not start on page four.",
          "A method that could not work. Data you cannot get, a scale you cannot run, an evaluation with no baseline. A committee reads feasibility faster than enthusiasm.",
          "An unexamined dataset. A public dataset that does not contain what your question needs, because you read the paper's description and not the data.",
          "An over-ambitious scope. Four papers' worth of work in one project, usually because the applicant does not yet know how long a first year takes.",
          "Sending the statement to referees too late, or not at all, so they write about the student rather than about the proposal. That is a real difference in the letter.",
          "A statement of academic interest where a research proposal is required, or the other way round. Ask admissions in writing which one you are writing, because the terms are used interchangeably by some universities.",
          "Exceeding the limit. A document that is cut at the end by the portal loses your contribution and first-year paragraphs, which are the two the supervisor cares about.",
        ],
        callout: {
          tone: "watch",
          title: "Send the statement to your referees",
          body: "A referee who has read the two pages you sent them can write about your question, your method and why you are the person to attempt it. A referee working from memory can only write about a student they once taught. The statement is the cheapest way to upgrade a reference, and it costs one email.",
        },
      },
      examples: {
        body:
          "A research statement is judged on whether the question is real and the approach is plausible, so it is worth looking at two openings that differ on exactly those two points. Both are from the same field.",
        points: [
          "Weak opening: \"Machine learning has always fascinated me, and I am eager to explore this rapidly evolving field. Through my coursework I have developed a strong interest in data science, and I am confident that your programme will provide the ideal environment for me to grow as both a researcher and a professional.\" Nothing here can be assessed. There is no question, no method, and no evidence of any specific interest beyond a general one. A committee reading this has learned nothing except that you are enthusiastic.",
          "Weak opening: \"This proposal builds on previous work in the field to advance the state of the art in machine learning.\" This sounds specific and is not. It names no previous work, no state of the art, and no way of advancing it. A sentence that would fit any proposal in any department is a sentence that says nothing.",
          "Strong opening: \"Convolutional models trained on small histopathology slides degrade badly when the scanner changes, and I want to know whether that failure is a domain shift problem or simply a resolution problem. The group I am applying to has shown that stain normalisation alone recovers most of the drop, which is what makes the question tractable here rather than somewhere else.\" This names a specific failure, a specific alternative explanation, and the specific finding that makes the project doable. A reader can now tell whether you understand the problem and whether you have read the right papers.",
          "Why the strong version works: it is falsifiable. There is an experiment here that could go the other way, and the reader can see what the answer would look like. A committee can only say yes to something they can picture failing.",
          "The pattern for a strong research opening: a specific problem, a specific reason it is still open, and a specific reason it can be worked on here. Three sentences is usually enough.",
          "The quick test: read your opening and ask whether a member of the committee could name the experiment you propose. If they could not, the opening is not yet a research statement, whatever else it is.",
          "A useful discipline: draft the closing paragraph first. If you cannot say what the first year would produce, you do not yet have a project, and a statement written around one will read as enthusiasm rather than as a plan.",
        ],
        resources: [
          {
            title: "Toronto CSB graduate admissions",
            kind: "official",
            url: "https://csb.utoronto.ca/graduate-studies/prospective-students/admissions",
            why: "The source this checkpoint is filed under, and a departmental page that shows how a research programme describes its own admissions expectations and its document requirements.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "U of T Institute of Medical Science: deadlines and requirements",
            kind: "official",
            url: "https://ims.utoronto.ca/application-deadlines-and-requirements",
            why: "A second published requirements page, and the one that shows how a complete Canadian graduate file is defined. Comparing the two tells you which requirements are the system's and which are the department's.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the university's own admissions pages and they describe the file your statement is judged inside. We take no payment for placement, and we do not take payment for anything. A supervisor wants to work with you, not with a service.",
        },
      },
    },
  },

  "au-sop": {
    archetype: "personal-statement",
    intro:
      "Australia has two documents that students confuse constantly: the university statement of purpose, which is judged on fit with a specific course at a specific provider, and the student visa's genuine interest answers, which are judged on your circumstances and intentions. They are written to different briefs, read by different people, and mixing them is the most common error in an Australian application.",
    sections: {
      brief: {
        body:
          "The university statement is a fit document. The Australian admissions reader is asking a narrow question: does this applicant understand what this course at this provider actually involves, and is there a plausible reason why this person should be doing it next. It is not a research document and not a life story. The visa form asks something different, about your circumstances and your intentions in Australia, and it is read by a different kind of assessor. Each is written once, carefully, and they are never merged.",
        points: [
          "Fit with the course, not with the field. The same student can be a strong fit for one provider's course and a weak fit for another's, and the difference is usually in the specialisation, the structure or the practical component.",
          "Fit with the provider, not with Australia. Naming the institution as a reason is not the same as naming something specific about that institution, and the difference is visible.",
          "Your preparation is evidence, not a list. Australian readers want to know what you have actually done, and they discount a list of modules quickly.",
          "A plan afterwards is read as a genuine-intention signal. The direction does not have to be a specific job, but it has to be coherent with the course and with your record.",
          "Nothing in the university statement should sound like the visa form. The visa form has its own questions, its own character limits and its own audience, and it is written closer to the visa application date than the university statement is.",
        ],
        resources: [
          {
            title: "ANU: international applications",
            kind: "official",
            url: "https://study.anu.edu.au/apply/international-applications",
            why: "The source this checkpoint is filed under, and a provider's own application page. It is where the statement requirements, the document list and the deadlines for that specific course and intake are published.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Department of Home Affairs: Student visa subclass 500",
            kind: "official",
            url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
            why: "The visa's own page, and the reason the two documents must stay separate. It is where the genuine interest questions live, so it tells you exactly what belongs in the other document and what does not belong in this one.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the provider's own page and the government's own page, which together define both documents and keep them separate. We take no payment for placement, and we do not take payment for anything. An education agent is optional in Australia and never required.",
        },
      },
      structure: {
        body:
          "Five parts, and the order matters less in Australia than it does in the US because the pieces are shorter. The through-line is the same though: a specific problem you want to work on, the preparation that makes you ready for it, the reason this course and this provider, what you will do with it, and a close that does not repeat.",
        subsections: [
          {
            title: "The opening: the problem you want to work on",
            what: "One paragraph that names a specific problem in your field, stated as a question or an objective rather than a subject area.",
            format: "One paragraph, and it is the most important paragraph in the statement. Some providers publish a prompt, and where they do, answer the prompt.",
            score: "Read first, and it decides whether the rest is read with interest. Australian reviewers read a lot of statements that open with a subject area.",
            topics: [
              "The specific question, problem or objective, in the field's own language.",
              "Why it interests you, in one sentence, connected to something real in your background.",
              "The specialisation you are targeting at this provider, and why this one.",
            ],
            tip: "If your opening could be used for a course at any university in the country, it has not yet named your field's problem. Push it one level more specific.",
          },
          {
            title: "The preparation",
            what: "What you have actually done that makes you ready for this course.",
            format: "One or two paragraphs, using the work rather than the list of courses.",
            score: "Read by people who teach the course, and who can tell the difference between a claim and evidence.",
            topics: [
              "The technical work, named and described, with results.",
              "The reasoning that connects that work to the problem you named in the opening.",
              "Any professional experience, described in terms of what you actually did rather than what your job title says.",
            ],
            tip: "One project described properly, including what went wrong, is more persuasive than four courses listed. This is the paragraph where evidence lives, so put the evidence in it.",
          },
          {
            title: "Why this course at this provider",
            what: "The paragraph that has to be different for every provider, and it usually is not.",
            format: "One paragraph, and it should contain at least two things that are specific enough to be checked.",
            score: "Read as the test of whether you did your research. Providers know exactly how many applicants mention the specialisation, the practical component or the named research group by name.",
            topics: [
              "The specific subjects, specialisation or elective structure that this course has and the other one does not.",
              "The research strengths, the practical component, the industry placement or the equipment, by name.",
              "A teaching arrangement or a particular subject you have read the handbook for.",
            ],
            tip: "Read the handbook. Two sentences that use the course's actual subject names are worth a paragraph about the provider's reputation.",
          },
          {
            title: "What you will do with it",
            what: "The plan, which Australian readers genuinely read.",
            format: "One paragraph, coherent with the course and with your record.",
            score: "Assessed for plausibility rather than for ambition. A plan that contradicts your academic history reads as filler.",
            topics: [
              "The work you want to do afterwards, and in what setting.",
              "How the course supports it, in terms of the subjects you have named.",
              "If you are staying in Australia, the sector and the kind of organisation. If you are leaving, what you are taking with you.",
            ],
            tip: "Be as specific as you honestly can. A stated direction that fits your record is read as maturity; a vague aspiration is read as having not thought about it.",
          },
          {
            title: "The close",
            what: "One or two sentences, and nothing new.",
            format: "One or two sentences.",
            score: "Read last. It can only reinforce what is already there, so keep it short.",
            topics: [
              "A single sentence restating the course and the direction.",
              "Nothing that introduces a new claim.",
            ],
            tip: "End on what you intend to do rather than on your enthusiasm for the provider. The enthusiasm has been established by the paragraph about the course.",
          },
        ],
      },
      pitfalls: {
        body:
          "Australian statements fail on a small number of things, and two of them are structural rather than stylistic: the statement is not tailored, or the visa answers have leaked into it.",
        points: [
          "The same statement sent to three providers. Australian admissions staff within the sector see enough of these to recognise a shared draft, and the provider-specific paragraph is exactly the part that gets reused.",
          "Institutional branding instead of specifics. A paragraph about the provider's reputation is a paragraph that could be about any provider, and it is the paragraph that was supposed to be the specific one.",
          "The course title used as evidence of research. Naming the course says nothing; naming the subject, the specialisation or the group says everything.",
          "A CV in prose. Module lists with no argument attached are the most common form of this.",
          "The visa answers pasted into the university statement. The forms ask overlapping questions, and a paragraph about your ties to your home country or your finances in a university statement is a red flag for the wrong reason.",
          "A career break explained but not planned. If you have had one, say what you did, what you learned and what you are doing now, in that order. Repeating the break is not an explanation.",
          "A future plan that contradicts the course. Studying for a data science course and describing a career in teaching is not forbidden, but it needs an explanation the reader finds convincing.",
          "Length. Some providers ask for a page and some ask for several, and the ones that ask for several are the ones where a short statement reads as underwhelming rather than as concise.",
          "Writing it in one sitting, which is how a list gets produced instead of an argument.",
          "Sending it only to family, who will confirm that it is very good and will not tell you which paragraph they skipped.",
        ],
        callout: {
          tone: "watch",
          title: "Two documents, two audiences, two drafts",
          body: "The university statement and the student visa's genuine interest answers are read by different people for different purposes, and the visa answers have strict character limits that the university statement does not. Draft them separately, from separate notes, and never let a paragraph move from one to the other.",
        },
      },
      examples: {
        body:
          "The test of an Australian statement is simple: could a reader tell which course and which provider it was written for. Both examples below are about the same field, and only one of them would survive that test.",
        points: [
          "Weak opening: \"Data science is a rapidly growing field that is transforming every industry, and I am passionate about using data to solve real-world problems. Your university is renowned for its cutting-edge facilities and industry partnerships, and I believe it is the perfect place for me to develop my skills.\" It names no problem, no work and no specific course. The second sentence is about the provider in terms the provider already knows, which is the definition of an untailored statement.",
          "Weak opening: \"I have always enjoyed working with data, and I am excited to take my studies further.\" Warmer, and still unusable. Nothing in it can be checked, and nothing in it is about the course.",
          "Strong opening: \"In my last role I was the person who had to explain why the churn model had started predicting the wrong customers, and the answer turned out to be a data collection change three systems upstream that nobody had logged. I want to spend the next two years on that class of problem: models that drift because the world underneath them changed quietly, and how to catch that before the business does.\" This names a specific problem you have actually met, a specific technical cause, and a direction. It also sets up the preparation paragraph, because everything you write next will be about how you learn to catch drift.",
          "Why the strong version works: it is specific, it is verifiable, and it sounds like a person who has done something rather than a person who has read about doing something. It also does something important for Australian reviewers, which is show that you understand the field's actual problems rather than its headline topics.",
          "The provider-specific paragraph then becomes easy. If the course has a data quality or an MLOps subject, this opening already pays for itself, because the reader can see exactly what you would take it for. If the course has nothing to do with drift, you have just learned that too, and it is better to learn it now than after you have written four paragraphs.",
          "A second strong pattern, when you are earlier in your career: lead with the problem you want to work on and the work you have done to understand it, and let the course name appear in the second paragraph rather than the first. Some reviewers prefer this, because it puts the thinking before the logistics.",
          "The quick test: cover the provider's name and read the statement. If it could belong to a course at any provider in the country, the tailoring has not happened yet, and no amount of rewriting the middle will fix it.",
        ],
        resources: [
          {
            title: "ANU: international applications",
            kind: "official",
            url: "https://study.anu.edu.au/apply/international-applications",
            why: "The provider's own application page, and the best starting point for the course-specific paragraph because it names the courses, the intakes and the requirements in the terms you have to write in.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Study Australia: the visa application process",
            kind: "official",
            url: "https://www.studyaustralia.gov.au/en/plan-your-move/visa-application-process",
            why: "The source this checkpoint is filed under, and the government's own account of the student visa process. It is where the genuine interest answers live, so it tells you exactly what belongs in that document and what does not belong in this one.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the provider's own pages and the government's own pages, which is where the course content and the requirements live. We take no payment for placement, and we do not take payment for anything. Applying direct is free, and it is also how you find out what the course actually teaches.",
        },
      },
    },
  },

  "de-sop": {
    archetype: "personal-statement",
    intro:
      "The German motivation letter, the Motivationsschreiben, is more formal and more specific than a British personal statement, and it is expected even where the CV and the transcript look strong. It answers three questions in order: why this subject, why Germany, and why this university. It is judged as a document, not as a performance, and the register matters as much as the content.",
    sections: {
      brief: {
        body:
          "A German motivation letter is a letter. It is addressed to a programme, it has a formal opening and a formal close, and it assumes that the reader knows the programme and is checking your claim against what they teach. One to two pages is the working range. The committee wants to know three things: what you have done that is relevant, why you want to do this specific thing, and why this specific programme is the place to do it. A letter that answers the third question vaguely is the most common failure.",
        points: [
          "It is a formal document. The register is closer to a professional letter than to a personal statement, and German reviewers are sensitive to the difference.",
          "It is expected. A strong transcript and a good CV do not remove the requirement, and a programme that asks for a letter expects a letter, not a paragraph.",
          "It is written per university, not per subject. You may apply to several programmes, and the letter is the part that has to change, because the reason you are choosing one institution over another is exactly what the letter is for.",
          "It is read alongside the transcript, not instead of it. The committee is checking whether your preparation matches the programme's content, so your degrees and courses have to line up visibly with what you are asking for.",
          "The register is the first thing assessed. A letter written in an informal or translated style reads as a candidate who does not understand the process, and it is read that way before the content is.",
        ],
        resources: [
          {
            title: "uni-assist",
            kind: "official",
            url: "https://www.uni-assist.de/en/",
            why: "The source this checkpoint is filed under, and the central application service for most German master's programmes. It is where the per-programme document requirements are published, which is where you find out whether a letter, a form or nothing at all is required.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "TUM Informatics MSc (MSc)",
            kind: "official",
            url: "https://www.tum.de/en/studies/degree-programs/detail/informatics-master-of-science-msc",
            why: "A concrete example of a German programme's own admissions page, showing the application window and the documents it asks for. Reading the actual page you are applying to is the first step in writing a letter that sounds like it belongs there.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the German official portals and they state the requirements in the form the applications are decided against. We take no payment for placement, and we do not take payment for anything. The letter is the part of a German application that has to be yours, and it should be.",
        },
      },
      structure: {
        body:
          "Six parts, in the order a German reader expects them. The formal opening comes first, before anything about you, and the formal close comes last. In between, the content is the academic argument, and it is structured in a way that is closer to a specification than to a story.",
        subsections: [
          {
            title: "The formal opening",
            what: "Two or three sentences establishing your name, your degree, your institution and your current role.",
            format: "Two or three sentences, no anecdote, no rhetorical question, and no request for consideration. It reads like the opening of a professional letter.",
            score: "Read first, in a second or two, and it sets the tone for everything that follows.",
            topics: [
              "Your name and your current status as a student or a professional.",
              "Your degree, the institution that awarded it, and the field.",
              "The programme you are applying to, named exactly.",
            ],
            tip: "Write the opening last if you need to, but keep it in this position. A German letter that starts with a story about a school trip reads as a letter that has been sent to the wrong country.",
          },
          {
            title: "Why this subject",
            what: "The thread through your degree and your work that makes this programme the natural next step.",
            format: "One or two paragraphs, with named courses, named projects and named work.",
            score: "This is where the committee checks your preparation against the programme's content. It is the part they mark.",
            topics: [
              "The specific areas of your degree that map onto the programme's modules.",
              "One piece of work, described with enough technical detail that it shows what you did.",
              "Any change of direction, addressed once and clearly, with what you did afterwards.",
            ],
            tip: "Use the programme's own module names. Machine learning is a field; a named module is a course, and naming it tells the reader you have read the module list.",
          },
          {
            title: "Why Germany",
            what: "The paragraph a German letter is expected to contain and that applicants from countries with a well-advertised higher education system often skip.",
            format: "One short paragraph, specific. Not a paragraph about Germany being a strong country for engineering.",
            score: "Read closely, and the absence of it is noticed as a gap in the argument rather than as a stylistic choice.",
            topics: [
              "The structure of the German system and why it suits what you want to do.",
              "The language of instruction and what that means for where you can work afterwards.",
              "The particular specialisation or research culture that drew you, if it is true.",
            ],
            tip: "Be honest about whether you can work in German afterwards, and say what you are doing about it. Reviewers are not looking for a native speaker; they are looking for someone who has thought about the language of the workplace.",
          },
          {
            title: "Why this university and this programme",
            what: "The most specific part, and the one that must be different for every university you apply to.",
            format: "One or two paragraphs, and it should contain at least one named person, group or institute.",
            score: "Read by people who work there. It is the paragraph that decides between two applicants with the same transcript.",
            topics: [
              "The institute or group, and the named professor whose work you have read.",
              "The specific course or research area you want, and what you would do with it.",
              "Something about the teaching or the research culture that you can only know because you looked.",
            ],
            tip: "Name a professor and name what they work on. This single sentence does more for you than any paragraph about rankings, and it is the difference between a letter written for Germany and one written for anywhere.",
          },
          {
            title: "The plan",
            what: "What you intend to do with the degree, and how the programme leads there.",
            format: "One short paragraph, and it is expected in a German letter in a way it is not always expected in a UK one.",
            score: "Read as evidence that you have thought about what the programme is professionally preparing you for, which matters for a degree that qualifies you to practise.",
            topics: [
              "The field and the role you are aiming at, with a plausible route from the course to it.",
              "The German professional context, if the programme leads to a regulated profession.",
              "Your language and professional plans, if relevant to where you intend to work.",
            ],
            tip: "If the programme leads to a profession that requires recognition in Germany, mention the route. Reviewers in professional faculties are used to candidates who have not thought about it, and the ones who have stand out.",
          },
          {
            title: "The formal close",
            what: "One or two sentences and a signature, in the register of the opening.",
            format: "One or two sentences. Restate the intention. Do not request consideration.",
            score: "Read last, and it is what stays in the reader's mind when they compare your file with three others.",
            topics: [
              "A restatement of what you are applying to and why, in one sentence.",
              "An accurate statement of your availability, if the programme asks for it.",
            ],
            tip: "Do not end by asking them to consider your application favourably. It is a request, and German letters do not make it. State the intention and stop.",
          },
        ],
      },
      pitfalls: {
        body:
          "The errors below are specific to the German letter, and most of them come from writing a British personal statement and translating it, or from writing a cover letter and calling it a motivation letter.",
        points: [
          "A translated British personal statement. The structure survives and the register does not, and the register is the thing German reviewers notice first.",
          "The informal opening. A rhetorical question, an anecdote, or a sentence about lifelong fascination breaks the formal contract of the document.",
          "No named professor. A paragraph about the university's reputation is the section that was supposed to be specific, and it is now the section that says nothing.",
          "\"Germany is a strong country for engineering.\" It is true and it is the same sentence a thousand applicants write, and it does not explain why you want this programme at this institution.",
          "Omitting the work experience paragraph. Many applicants have a job and treat it as a CV item rather than as part of the letter. For an applied master's it is often the most relevant part of the file.",
          "A CV in prose, with dates, grades and employers listed in sentences. The CV is a separate document and it is attached.",
          "The same letter for two universities, with the university name changed. Given that the why-this-university paragraph is the point of the letter, this defeats its entire purpose.",
          "A career break or a change of direction that is mentioned once and then explained three more times elsewhere. Address it once, clearly, and move on.",
          "Enthusiasm with no verbs. Sentences that describe what the programme is rather than what you would do with it read as filler because the reader knows what the programme is.",
          "A close that asks for a favourable consideration, or apologises for writing at all.",
        ],
        callout: {
          tone: "watch",
          title: "One letter per university, and the reason is the letter",
          body: "The why-this-university paragraph is what distinguishes a German motivation letter from a cover letter, and it is why the same letter cannot be sent to two universities. If you are applying to three universities, expect to write three letters, and expect the third one to be much faster than the first because the structure will already exist.",
        },
      },
      examples: {
        body:
          "Two openings, one written in the register the German system expects and one that reads as a translation. The content in the second is not worse; the form is what fails.",
        points: [
          "Weak opening, and the standard British opener arriving in Germany: \"I am writing to express my interest in the Master's programme in Informatics at your university, and I am highly motivated to deepen my knowledge in this field.\" The first clause is fine. The second clause is filler, and it sits in the position where a German reader expects to find the substance: which part of your degree connects to which part of their programme.",
          "Weak opening: \"Your university has a long tradition of excellence in engineering, and I am convinced that it is the ideal environment for me to grow.\" This is the institutional-branding paragraph that was supposed to be a specific one, and it is worth nothing to a committee who already knows their own reputation.",
          "Strong opening: \"I studied computer science at the University of X, where my final project was on distributed consistency protocols, and I now work as a backend engineer at Y, where I spend most of my time on the failure modes that appear when a system is under partial partition. Both halves of that experience point at the same thing, and it is the subject of the programme you offer under the name Distributed Systems and Data Management.\" It names your degree, your project, your work and the specific programme unit, and it does it in the first three sentences. A committee can check every claim.",
          "Why the strong version works: it does the formal work and the substantive work in the same paragraph, which is what German letters do and what British ones do not. There is no throat-clearing, and the reader has a thread to follow.",
          "The German register is not coldness. It is precision. A letter that says \"my final project was on distributed consistency protocols\" is warmer than one that says \"I am highly motivated and passionate about distributed systems\", because the first one gives the reader something to work with.",
          "A useful diagnostic: put the letter in front of someone who has never read one, and ask them what the programme will teach you. If they cannot answer from the letter, the letter is not doing its job, whatever its register.",
          "One more practical note on ordering. The formal opening and close are formulaic and you should not spend time perfecting them. The paragraph about the named professor and the paragraph about your work are where the letter is won, and they are the two you should rewrite most often.",
        ],
        resources: [
          {
            title: "TUM Informatics MSc (MSc)",
            kind: "official",
            url: "https://www.tum.de/en/studies/degree-programs/detail/informatics-master-of-science-msc",
            why: "A real German programme page, and the place to find the module names, the institute names and the people you should be naming in your letter. The why-this-university paragraph cannot be written before you have read something like this.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "DAAD",
            kind: "official",
            url: "https://www.daad.de/",
            why: "The German academic exchange organisation's own site, with information on how German master's applications and the German academic system work. Useful background for the why-Germany paragraph, which is about the system as much as the country.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the official German portals and they tell you what a German letter has to reference. We take no payment for placement, and we do not take payment for anything. A motivation letter written by a consultancy is the clearest possible evidence that the applicant did not do the reading.",
        },
      },
    },
  },

  "fr-sop": {
    archetype: "personal-statement",
    intro:
      "A French lettre de motivation is a structured justification tied to a programme's actual syllabus, and it is the centre of the application. In a ranked candidature, the letter is the part the committee weighs most heavily. Some computer science and data master's also ask for a written project statement, and a letter that only discusses enthusiasm for the field is read as a lack of genuine interest.",
    sections: {
      brief: {
        body:
          "The French letter is closer to a formal academic note than to a personal statement, and it follows a structure the committee expects: who you are, what you have studied, why this formation, what you want from it, and what you will do afterwards. The length is set by the programme and varies, so write to the programme's own specification. What does not vary is the standard the letter is held to, which is whether your preparation matches their syllabus. A French committee reads a hundred letters and can tell within a paragraph whether you have opened their module list.",
        points: [
          "It is a justification, not a narrative. The structure is expected, and a letter that omits a section reads as an incomplete document rather than as a stylistic choice.",
          "It is tied to the syllabus. The units, courses and specialisations of that programme are named, and the letter explains what you want from each of them.",
          "It is the document the committee weighs most heavily in a ranked candidature, because the rest of the dossier is largely factual.",
          "It must be in French for a French-language programme. A letter written in English and translated into French, or left in English, is read as a letter that was not written for the programme.",
          "Identical letters across formations are read as a lack of genuine interest, which is a specific phrase in the guidance French programmes publish about it. Tailoring is not a stylistic preference; it is part of what is being assessed.",
        ],
        resources: [
          {
            title: "Campus France",
            kind: "official",
            url: "https://www.campusfrance.org/en",
            why: "The source this checkpoint is filed under, and the official body for French study. It carries the application guidance, the attestation process and the accepted documents, which is the context your letter is written inside.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Mon Master",
            kind: "official",
            url: "https://www.monmaster.fr/en/",
            why: "The national platform for master's applications in state institutions, and the place the programme pages live. Reading your programme's own page before writing is how you find the unit names your letter has to reference.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the French official sources and they define the process your letter is written for. We take no payment for placement, and we do not take payment for anything. The letter is the document a committee believes, and it has to be yours.",
        },
      },
      structure: {
        body:
          "The French structure is more prescriptive than the British one and less prescriptive than the German one. Five movements, in a conventional order, in about the length the programme asks for. The discipline is not a constraint; it is what makes a letter easy to mark, and a letter that follows it well reads as confident.",
        subsections: [
          {
            title: "The presentation: who you are",
            what: "A dense opening paragraph: your name, your current level of study, your institution and your academic field.",
            format: "One paragraph, in a formal register. This is the section that establishes whether you are applying for the right thing.",
            score: "Read first and quickly, and it is where a candidate who has misread the programme is usually caught.",
            topics: [
              "Your identity, your institution and your current programme of study.",
              "Your degree, its field and the institution that awarded it.",
              "One line on what you are applying for and one on what you have done that is relevant to it.",
            ],
            tip: "Keep it factual and brief. A French committee is checking your eligibility at this point, not your personality.",
          },
          {
            title: "The academic preparation",
            what: "The argument that your course background and your work make you ready for this syllabus.",
            format: "One to two paragraphs, using the actual names of the courses you took.",
            score: "This is the part that is really read for content, and it is where a generic letter fails. The committee knows what each of their units covers.",
            topics: [
              "The specific courses in your own degree that map onto the programme's units, named one by one.",
              "Any research, project or professional work, described concretely.",
              "Your level in French, and any preparation in the language, if the programme is taught in French.",
            ],
            tip: "Naming their units back to them is the single most effective thing you can do in this paragraph. It demonstrates the whole syllabus is not a formality to you.",
          },
          {
            title: "Why this formation, and what you want from it",
            what: "The section that most letters omit, and the one the committee looks for: what you want from the programme, specifically.",
            format: "One paragraph, and it should be about the programme's content rather than about your feelings about the field.",
            score: "This is where a committee judges whether you chose this formation on purpose or by default, and it is where the difference between a strong and a weak letter is usually decided.",
            topics: [
              "The units you want, and what you want from them specifically.",
              "The specialisation, laboratory or teaching arrangement that matters to you, if the programme has one.",
              "A project you would like to work on, if the programme is designed around one.",
            ],
            tip: "Ask for something specific. A paragraph wishing to acquire a solid foundation in a demanding field asks for nothing, and it reads as a paragraph that could be pasted into any application.",
          },
          {
            title: "The professional project",
            what: "What you intend to do with the degree, and how the programme leads there.",
            format: "One paragraph, coherent with the rest of the letter and with your record.",
            score: "Read as evidence that you understand what the qualification is for. French programmes in professional fields expect a professional project rather than a research aspiration.",
            topics: [
              "The sector, the role or the kind of organisation you are aiming at.",
              "The specific units or the specialisation that support it.",
              "Any professional experience that already points that way, and how the course builds on it.",
            ],
            tip: "Name the sector rather than the job title if you are unsure, and connect it to the units you named earlier. Committees read for coherence between the three paragraphs.",
          },
          {
            title: "The written project statement",
            what: "A separate document, asked for by the computer science and data master's that want to see how you think.",
            format: "Short, and often a page or two. Check the programme's own specification for length and structure.",
            score: "Assessed by academics in the field, often alongside the letter, and on the same two grounds: is the question real, is the approach plausible.",
            topics: [
              "The research question, in one sentence a reader in the field would recognise.",
              "Why it is open, and what has already been tried.",
              "The method and the data, concretely enough to be assessed.",
            ],
            tip: "A bounded question you could start next month beats a grand question every time. Reviewers are selecting for tractability, not for ambition.",
          },
        ],
      },
      pitfalls: {
        body:
          "The French letter has a distinct failure pattern, and it is not that the content is weak. It is that the content is generic in a way a French committee can detect immediately, because the same generic letter appears in every application round.",
        points: [
          "A letter that names the university and the field but not a single unit of the programme. It is the most common rejection reason in practice, and it is entirely avoidable by reading the programme page.",
          "A letter of enthusiasm with no academic content. French committees read hundreds of letters that say the field is fascinating; the ones that survive are the ones that say what you have done.",
          "An identical letter sent to several formations. This is read as a lack of genuine interest, and it is the specific thing French programme guidance warns about.",
          "The opening without a presentation. Starting with your passion rather than with your name, your institution and your degree means the committee does not know what it is reading for the first paragraph.",
          "An English letter for a French programme, and an English letter written in English grammar with French headings.",
          "A letter in French that reads as a translation, which is a different problem and a harder one. It is better to write a slightly simpler sentence in French than a complex one you cannot control.",
          "A project statement that is an interest rather than a question. On the programmes that ask for one, this is a separate assessment and it is assessed on its own.",
          "A professional project that contradicts the formation, for example a management formation with a research project and no connection between them.",
          "A letter that is over the length the programme asks for, where the last paragraph is cut by the portal and it is always the professional project that goes.",
          "Asking for a place rather than making a case. The letter argues; it does not request.",
        ],
        callout: {
          tone: "watch",
          title: "The programme page is your outline",
          body: "The fastest way to write a French lettre de motivation that passes is to read the programme page and turn its units into a list of what you want from each one. That list is the third section of the letter, and the fact that it could only have been written for that programme is the thing the committee is looking for.",
        },
      },
      examples: {
        body:
          "The difference between a French letter that reads as a candidate who has read the syllabus and one that reads as a candidate who has read the title is visible in the third paragraph. Both examples below are for a computer science master's.",
        points: [
          "Weak opening: \"Computer science has always been a passion of mine, and I am delighted to apply to your programme. I am a highly motivated and hard-working student, and I am confident that your renowned teaching will allow me to excel in this field.\" Nothing in the first paragraph tells a French committee which programme you are applying to, what you have studied, or what you have done. The paragraph is 90 per cent adjectives.",
          "Weak opening, and the more dangerous version: \"My academic background has prepared me well for this programme, and I am eager to contribute to the rich academic environment of your university.\" This sounds academic and it is empty. A committee reads it several times a week, because it is what applicants write when they have not looked at the syllabus.",
          "Strong opening: \"I am a final-year student in computer science at the University of X, where my coursework includes distributed systems, compilers and a two-year research placement on consensus protocols. I am applying to the master's in Distributed Systems and Data Management because the second-year unit on fault-tolerant replication is the piece of my degree I went furthest into, and because the placement showed me the gap: I can build a protocol, and I cannot yet reason about what happens when the network partitions.\" It names your institution, your level, your actual courses, your placement, the specific unit you are applying for and a specific limit in your own ability. Every sentence is checkable.",
          "Why the strong version works: it has already done the work of the third paragraph, the why-this-formation section, without a paragraph break. A reader knows what you want from the programme and why, and the rest of the letter can develop it.",
          "The pattern: a French letter that works contains three things, in this order: your identity and your preparation, the specific thing you want from the programme's units, and the professional project. Three paragraphs of content and one of presentation is a normal shape for a programme that asks for a short letter.",
          "A useful discipline for the French letter: write the unit list first. For each unit in the programme's second year, write one line on what you want from it and one on what you have done that connects. If a unit produces nothing, that tells you the letter should not pretend to want everything, and saying so is more convincing than claiming it.",
          "The quick test: hand your letter to someone who has never seen the programme page and ask them to name two things you want from it. If they cannot, the letter has not made a specific request, and a committee will not be able to either.",
        ],
        resources: [
          {
            title: "Mon Master",
            kind: "official",
            url: "https://www.monmaster.fr/en/",
            why: "The national platform where the programme pages, the unit lists and the campaign rules live. It is where you get the exact names your letter has to use, and getting them right is most of the tailoring.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "Campus France",
            kind: "official",
            url: "https://www.campusfrance.org/en",
            why: "The official body for French study and the source of the application guidance your letter is written against, including the attestation and the accepted documents.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the French official platforms and they publish the syllabus and the rules your letter is judged on. We take no payment for placement, and we do not take payment for anything. A letter that a French committee believes is the whole point of the exercise, and it has to be written by you.",
        },
      },
    },
  },

  "sg-sop": {
    archetype: "personal-statement",
    intro:
      "The Singapore statement of purpose is mandatory and it is short. NUS Computing states that it must be uploaded under document upload, and that it should cover your reasons for applying, your preparation for the field, and your future plans. Those three headings are the brief, and assessors read the third one as a signal of genuine intention rather than as a formality.",
    sections: {
      brief: {
        body:
          "A Singapore statement is compact and has a published shape: why you are applying, what prepared you for the field, and what you plan to do afterwards. The length is set by the programme, and the whole point of a statement that short is that every sentence is being read for evidence. The technical preparation is what carries it, and the future plan is what tells the committee you are a person who will use the degree rather than a person collecting one.",
        points: [
          "It is mandatory. NUS Computing states this outright, and a missing statement is not a weaker application, it is an incomplete one.",
          "It has a published three-part brief, which is unusual and helpful: reasons for applying, preparation for the field, and future plans. Write to those three headings in that order.",
          "It is judged on technical credibility. Singapore assessors are specialists, and a claim about a field that you cannot back with work is read as a claim rather than as preparation.",
          "The future plan is read as a genuine-intention signal. It is not a formality, and a vague plan is read as a weak application even when the technical content is strong.",
          "It is uploaded, not attached. It goes in the document upload section of the application, and the section heading is worth checking before you submit.",
        ],
        resources: [
          {
            title: "NUS Computing: PhD application requirements",
            kind: "official",
            url: "https://www.comp.nus.edu.sg/programmes/pg/phdcs/application",
            why: "The source this checkpoint is filed under, and the clearest published statement of the Singapore brief: a mandatory statement of purpose uploaded under document upload, covering reasons for applying, preparation for the field, and future plans.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NUS Computing: graduate programmes",
            kind: "official",
            url: "https://www.comp.nus.edu.sg/graduate/",
            why: "The programme's own page for the courses, the areas and the intakes your statement has to be specific about. A Singapore statement is judged against the programme's actual content, not against the department's reputation.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the programme's own published requirements, which is where the brief and the upload rules are. We take no payment for placement, and we do not take payment for anything. The statement is uploaded by you, and it should be written by you.",
        },
      },
      structure: {
        body:
          "Three sections, in the order the programme itself names them, plus an opening and a close that belong to nobody in particular. The reason the structure is so simple is that a short statement read quickly rewards headings that a reader can follow without effort.",
        subsections: [
          {
            title: "Why you are applying",
            what: "The opening, and the shortest section. What you want to do in the field, why now, and what you are targeting at this programme.",
            format: "Short. Check the programme's own limit rather than assuming a page, because the statement is uploaded as a document and some programmes publish a character cap.",
            score: "Read as the frame for everything after it. It tells the assessor what the rest of the statement is going to be about.",
            topics: [
              "The question or problem you want to work on, in the field's language.",
              "The specialisation you are targeting at this programme, and why this programme.",
              "Why now, connected to something real in your background rather than to a general ambition.",
            ],
            tip: "Name the specialisation. A statement that could belong to any programme in the department is not answering the question the programme asked.",
          },
          {
            title: "What prepared you for the field",
            what: "The evidence section, and the one that has to be technical and specific.",
            format: "The largest part of a good statement, and the place where vague claims are caught.",
            score: "Read by people who know the field. They can tell whether you have done the work or read about it, and the statement lives or dies here.",
            topics: [
              "The technical preparation: the courses, the projects, the code, the systems, the papers, with what you actually did and what came out of it.",
              "The reasoning that connects that work to the direction you named, so the reader sees a path rather than a list.",
              "Any research, competition work or industry project, described with the constraint you worked under and what you built anyway.",
            ],
            tip: "Show one thing properly rather than listing several loosely. A single project described with its method and its result is worth a page of course names.",
          },
          {
            title: "Your future plans",
            what: "The closing section, and the one assessors read as a genuine-intention signal.",
            format: "Short and concrete. A reader should be able to picture the plan rather than infer it.",
            score: "Assessed for coherence with the course and with your record. A vague plan reads as filler; a plan that contradicts your record reads as worse.",
            topics: [
              "The work you want to do afterwards, and in what setting.",
              "The link between the degree and that work, at a level of detail that could be checked.",
              "If you are staying in Singapore, the sector and the kind of employer. If you are leaving, what you are taking with you.",
            ],
            tip: "Be specific and be honest. Assessors are looking for a graduate who will use the degree, and a plan with a named field and a named sector reads as somebody who has thought about it.",
          },
          {
            title: "Uploading it correctly",
            what: "The mechanical step that decides whether the statement is in the file at all.",
            format: "The statement is uploaded under document upload. Check the section heading on the form and put it there.",
            score: "Not scored. It is whether your statement exists at the point the committee reads the file.",
            topics: [
              "The document upload section, with the correct sub-heading for a statement of purpose.",
              "A readable PDF, with the file named in a way that identifies it.",
              "A final check that the file opens, because a failed upload on a portal is easy to miss.",
            ],
            tip: "Open the uploaded file from the portal after you upload it. It takes ten seconds and it is the last thing standing between a good statement and no statement.",
          },
        ],
      },
      pitfalls: {
        body:
          "The Singapore statement is short, so the mistakes are about density and about the file rather than about structure. Most of them are the usual ones compressed into a smaller space.",
        points: [
          "Listing field names instead of demonstrating readiness. A paragraph of discipline names reads as a vocabulary test.",
          "A future plan that is a slogan. Work in technology is not a plan; a specific role in a specific sector is a plan.",
          "A future plan that contradicts your own record, which is read as a sign that you did not think about it.",
          "Writing two thousand words for a field that expects a page, and losing the future plan to the limit, which is the part assessors read as the signal.",
          "Uploading the statement as a loose attachment rather than in the document upload section, which is exactly what NUS Computing tells you not to do.",
          "The same statement for two programmes, when the two programmes have visibly different specialisations.",
          "Claiming a specialisation you have no evidence for, for example a computer vision focus with nothing in the statement that shows you have touched computer vision.",
          "A statement written in the last two days before the window closes, which is how the list format gets produced instead of an argument.",
          "Leaving the referees until the statement is finished, so that there is no time to share it with them, and the letters are written without a proposal to react to.",
        ],
        callout: {
          tone: "watch",
          title: "Short means every sentence is read",
          body: "A statement of a page and a half is read properly, line by line, by someone who has a hundred of them. There is no padding, and no paragraph that survives on adjectives. If your draft does not survive a line-by-line read, it is not short enough.",
        },
      },
      examples: {
        body:
          "A Singapore statement is judged on technical credibility, so the test of the opening is whether it establishes what you can do rather than what you find interesting. Two openings below, both for the same programme.",
        points: [
          "Weak opening: \"I am writing to express my interest in the Master of Computing programme. Computer science has always been my passion, and I am eager to develop my skills in a challenging and stimulating academic environment.\" It establishes nothing. A reader who has read a hundred of these can tell from the first sentence that no technical content is coming.",
          "Weak opening, and more common: \"My academic background includes courses in algorithms, databases, machine learning and software engineering, and I have gained proficiency in programming languages including Python, Java and C++.\" This is a transcript written as prose. There is no argument, no result and no direction, and a reader learns only that you took modules.",
          "Strong opening: \"The question I want to spend the next two years on is how retrieval systems behave when the corpus they were tuned on silently changes, because that failure cost my last project three weeks and I have not seen it handled anywhere in production.\" One problem, one experience that produced it, and a specific reason you want to work on it. Everything after this paragraph now has to be about preparation and plans, and the reader knows what they are reading.",
          "Why the strong version works: it converts an interest into a question, and a question is something an assessor can engage with. It also hints at the kind of work you would do in the programme, which is exactly what the course-specific paragraph needs.",
          "The pattern for a Singapore statement: name a problem, prove you can work on problems of that shape, and say where you are going with it. Three short sections, and each one earns the next.",
          "A useful test, because Singapore statements are short enough to check: read your statement and underline every sentence that contains a claim you could not back up with a specific piece of work or a specific plan. Three or four underlines in a page is normal. Eight is a problem, and the fix is always to cut rather than to soften.",
          "And a closing note on the future plan, which assessors read as a signal. The plan that works is not the ambitious one, it is the checkable one: a field, a sector and a rough direction. Anything more precise than that, and anything vaguer, reads worse.",
        ],
        resources: [
          {
            title: "NUS Computing: PhD application requirements",
            kind: "official",
            url: "https://www.comp.nus.edu.sg/programmes/pg/phdcs/application",
            why: "The programme's own published brief for the statement, including the three things it should cover and the requirement to upload it under document upload. It is the shortest answer to the question of what to write.",
            free: true,
            verifiedOn: V,
          },
          {
            title: "NUS Graduate Admissions: how to apply",
            kind: "official",
            url: "https://nus.edu.sg/grad/admissions/applying",
            why: "The central instructions for the application system, including the upload and payment steps. The statement only counts if it is in the right section of a paid application.",
            free: true,
            verifiedOn: V,
          },
        ],
        callout: {
          tone: "good",
          title: "How we choose",
          body: "We recommend these because they are the university's own published requirements and the platform's own instructions. We take no payment for placement, and we do not take payment for anything. In Singapore, the application portal is free and the statement is yours.",
        },
      },
    },
  },
};

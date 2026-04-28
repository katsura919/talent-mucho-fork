// ─────────────────────────────────────────────
// EVENT CONFIG ~ Claude for Business
// Edit this file to change scripts, segments, order, etc.
// Save the file and hard-refresh the OS tab.
// ─────────────────────────────────────────────

export type BlockType = 'scripted' | 'bullets' | 'stage' | 'poll' | 'workbook';

export interface Block {
  type: BlockType;
  speaker?: string;
  text?: string;
  items?: string[];
}

export interface Beat {
  id: string;
  title: string;
  speaker: string;
  blocks: Block[];
}

export interface Segment {
  id: number;
  num: string;
  title: string;
  titleItalic: string;
  subtitle: string;
  duration: string;
  speakers: string[];
  panel: 'demo' | 'compare' | 'products' | 'showcase' | 'qa';
  panelData?: string;
  panelUrl?: string;
  audWhatTitle: string;
  audWhatBody: string;
  audTakeaway: string;
  beats: Beat[];
}

export interface ComparePreset {
  scenario: string;
  leftTag: string;
  leftTitle: string;
  leftWhy: string;
  leftPrompt: string;
  leftAnswer: string;   // manual pre-written answer ~ no API call
  leftAnnLbl: string;
  leftAnnTxt: string;
  rightTag: string;
  rightTitle: string;
  rightWhy: string;
  rightPrompt: string;
  rightAnswer: string;  // manual pre-written answer ~ no API call
  rightAnnLbl: string;
  rightAnnTxt: string;
  landing: string;
}

export const SPEAKERS: Record<string, { name: string; color: string }> = {
  ABIE: { name: 'Abie', color: '#FAF8F5' },
  MERI: { name: 'Meri', color: '#7D6B5A' },
  BOTH: { name: 'Both', color: '#9C8B7A' },
};

export const COMPARE_PRESETS: Record<string, ComparePreset> = {
  'chatgpt-vs-claude': {
    scenario: 'Same prompt, generic vs Claude-style specific',
    leftTag: '✕ Generic',
    leftTitle: '<em>"ChatGPT habit"</em>',
    leftWhy: 'How most people prompt ~ vague, no context.',
    leftPrompt: 'write me an invoice reminder',
    leftAnswer: "Subject: Friendly Invoice Reminder\n\nHi there,\n\nI hope this email finds you well. I'm writing to follow up on the outstanding invoice that was sent on [date]. As of today, payment has not yet been received.\n\nPlease let me know if you have any questions or if there is anything I can do to help facilitate payment. I'd appreciate it if you could process the payment at your earliest convenience.\n\nThank you for your prompt attention to this matter.\n\nBest regards,\n[Your Name]",
    rightTag: '✓ With context',
    rightTitle: '<em>Thinking partner</em>',
    rightWhy: 'Role, person, goal, constraint.',
    rightPrompt: "I'm a VA for a small marketing agency. My client Sarah hasn't paid invoice #INV-204 ~ €450, 7 days overdue. She's a good client, first time late, want to keep the relationship. Write a polite reminder that:\n- Stays warm\n- Is firm enough to actually get paid\n- Gives her an easy path to pay (Stripe)\n- Under 100 words\n\nSign as me ~ Meri.",
    rightAnswer: "Subject: Quick nudge on INV-204\n\nHi Sarah,\n\nHope you're doing well! Just a friendly heads-up that invoice #INV-204 (€450) is now 7 days past due ~ totally understand things slip when you're busy.\n\nIf it's easier, here's a one-click Stripe link to settle it: [stripe link]\n\nLet me know if anything's stuck on your end and I'll sort it out.\n\nThanks Sarah,\nMeri",
    leftAnnLbl: "What's wrong",
    leftAnnTxt: "It works. Just generic ~ no name, no amount, no relationship awareness.",
    rightAnnLbl: 'What changed',
    rightAnnTxt: "Same task. Same model. The difference is what YOU brought to the conversation.",
    landing: "Switching tools doesn't fix bad prompting. <em>Better context</em> does.",
  },
};

export const SEGMENTS: Segment[] = [
  // 00 ~ Welcome
  {
    id: 0, num: '00', title: 'Welcome', titleItalic: '',
    subtitle: '06:00~06:05 ~ open warm, land the promise',
    duration: '5 min', speakers: ['BOTH'], panel: 'demo',
    audWhatTitle: '<em>This</em> is where you start.',
    audWhatBody: "<p>You signed up because you've been saying <em>\"I need to learn AI\"</em> for months. Tonight you actually do it ~ in a small group, with two operators who run businesses on this stack every day.</p><p>By the end, you'll have a <em>clear starting point</em>, not more overwhelm. That's the deal.</p>",
    audTakeaway: 'You came for a <em>starting point</em>. You leave with one.',
    beats: [
      {
        id: 'w0', title: 'Land the promise', speaker: 'BOTH', blocks: [
          { type: 'stage', text: 'Both on cam. Wait 30s for stragglers. Warm smile, slow tempo.' },
          { type: 'scripted', speaker: 'BOTH', text: "Hey everyone ~ welcome. I'm Abie, this is Meri. Before we do anything else ~ <em>thank you</em> for showing up. You could be doing a hundred other things tonight." },
          { type: 'scripted', speaker: 'BOTH', text: "Quick promise so you know what you're in for. You signed up because you've been saying <em>\"I need to learn AI\"</em> for months. Tonight, that ends." },
          { type: 'bullets', speaker: 'BOTH', items: [
            "By 8 PM, you'll <em>finally understand</em> what AI can actually do for your business",
            "You'll get hands-on with Claude in a small group setting ~ <em>no experience required</em>",
            "And you'll leave with a <em>clear starting point</em> ~ not 47 tabs and more overwhelm",
          ]},
          { type: 'scripted', speaker: 'BOTH', text: "That's the deal. <em>That's all we promised on the landing page.</em> We're going to deliver it." },
        ],
      },
      {
        id: 'w1', title: 'Housekeeping', speaker: 'BOTH', blocks: [
          { type: 'scripted', speaker: 'BOTH', text: "Two house rules and we go." },
          { type: 'bullets', speaker: 'BOTH', items: [
            "Drop your name + where you're joining from in the chat right now",
            "Meri is in the chat the whole event ~ ask anything, no question is too basic",
            "You'll see a workbook on screen ~ that's your live companion, use it",
            "<em>This is a workshop, not a webinar.</em> Be present ~ you'll get 10x more out of it",
          ]},
          { type: 'poll', text: "POLL ~ Drop a 1, 2, 3, or 4 in chat:\n1 = I run my own business\n2 = I work in a company but want my own thing\n3 = I freelance / side hustle\n4 = Just curious about AI" },
        ],
      },
    ],
  },

  // 01 ~ Origin stories
  {
    id: 1, num: '01', title: 'How we', titleItalic: 'got here',
    subtitle: '06:05~06:15 ~ story-led intros, the Talent Mucho origin',
    duration: '10 min', speakers: ['BOTH'], panel: 'showcase',
    audWhatTitle: 'How we <em>got here</em>',
    audWhatBody: "<p>Two stories. One agency. We built Talent Mucho because we hit the same wall from two different sides ~ and figured out the answer was the same thing.</p><p><em>This part matters.</em> If you don't know who's teaching you, you can't trust the playbook.</p>",
    audTakeaway: "You're learning from two operators who actually run what they teach. <em>Not coaches.</em>",
    beats: [
      {
        id: 'o1', title: "Abie's story", speaker: 'ABIE', blocks: [
          { type: 'stage', text: 'Abie on cam. Slow down ~ this is the trust-building beat.' },
          { type: 'scripted', speaker: 'ABIE', text: "I'm from Davao City, Philippines. <em>Weak passport. Strong plan.</em> That's become my whole thing. Three years ago I was an employee. Today I run a personal brand, take UGC deals, build tools, and live in Madrid on a Spanish residency I figured out without a lawyer." },
          { type: 'scripted', speaker: 'ABIE', text: "I didn't do any of this with motivation. I did it with <em>systems.</em> AI is the leverage layer that made it possible. <em>That's</em> why I'm teaching this tonight ~ because I'm the proof it works for someone with no advantages." },
        ],
      },
      {
        id: 'o2', title: "Meri's story", speaker: 'MERI', blocks: [
          { type: 'stage', text: 'Meri on cam. Different energy ~ operator, agency builder.' },
          { type: 'scripted', speaker: 'MERI', text: "I'm Meri. I come from the operations side ~ I've hired, trained, and managed VAs from the Philippines for years. I know exactly what kills a small business: <em>the 80% of work that's repetitive but still expensive in human hours.</em>" },
          { type: 'scripted', speaker: 'MERI', text: "When I met Abie, we both saw the same gap. Founders ~ <em>especially women founders</em> ~ are running businesses, households, and trying to figure out AI on top of all of it. There was no one place to get all three handled." },
        ],
      },
      {
        id: 'o3', title: 'Talent Mucho ~ what we built', speaker: 'BOTH', blocks: [
          { type: 'scripted', speaker: 'BOTH', text: "So we built <em>Talent Mucho</em>. Not another VA agency. Not another AI course. <em>An operating partner</em> for founders ready to stop doing it all themselves." },
          { type: 'bullets', speaker: 'BOTH', items: [
            '<em>Educate</em> ~ workshops, hands-on training, team adoption. Tonight is part of this.',
            '<em>Build</em> ~ websites, automations, AI systems your business runs on',
            '<em>Operate</em> ~ AI-trained VAs and engineers placed inside your business, not just sent your way',
            "Built by two women who've done this themselves ~ for founders who know what it takes",
          ]},
          { type: 'scripted', speaker: 'BOTH', text: 'Tonight is the <em>Educate</em> part. <em>Free.</em> Because if you don\'t understand what AI can actually do, the rest doesn\'t matter.' },
          { type: 'workbook', text: 'WORKBOOK ~ Right now, on screen, write down: "What\'s the one role I\'d hire first if I had a great VA + AI system tomorrow?"' },
        ],
      },
    ],
  },

  // 02 ~ What is Claude
  {
    id: 2, num: '02', title: 'What is', titleItalic: 'Claude',
    subtitle: '06:15~06:27 ~ ChatGPT crowd, the mindset shift',
    duration: '12 min', speakers: ['ABIE'], panel: 'compare', panelData: 'chatgpt-vs-claude',
    audWhatTitle: 'What is <em>Claude</em>',
    audWhatBody: "<p>Most of you opened ChatGPT first. So the real question isn't <em>\"what is Claude?\"</em> ~ it's <em>\"what's the difference, and why should I care?\"</em></p><p>We'll show you ~ live, side by side ~ what changes when you stop typing like you're using a search engine.</p>",
    audTakeaway: "Claude is not a search engine. It's a thinking partner. <em>The skill is in the context you bring.</em>",
    beats: [
      {
        id: 'c1', title: 'You came from ChatGPT', speaker: 'ABIE', blocks: [
          { type: 'poll', text: 'POLL ~ Type in chat: 1 = ChatGPT user, 2 = Claude user, 3 = Both, 4 = Neither yet.' },
          { type: 'scripted', speaker: 'ABIE', text: "Most of you came from ChatGPT. That's normal ~ it had the head start. Quick honest summary:" },
          { type: 'bullets', speaker: 'ABIE', items: [
            'ChatGPT and Claude are competing AI assistants ~ different companies',
            'Claude tends to be better at: nuanced writing, longer documents, careful reasoning, following complex instructions',
            'ChatGPT tends to be better at: image gen, voice mode, broader integrations',
            "For VAs and business owners doing client work? <em>Claude's strengths matter more.</em>",
          ]},
        ],
      },
      {
        id: 'c2', title: "Switching tools doesn't fix bad prompting", speaker: 'ABIE', blocks: [
          { type: 'scripted', speaker: 'ABIE', text: "But here's the real issue. <em>Switching tools doesn't fix bad prompting.</em> Most people use Claude exactly like they used ChatGPT ~ like a search bar. Watch." },
          { type: 'stage', text: 'Compare panel auto-loaded. Hit RUN. Don\'t talk over the streaming output ~ let them read.' },
        ],
      },
      {
        id: 'c3', title: 'The mindset shift', speaker: 'ABIE', blocks: [
          { type: 'scripted', speaker: 'ABIE', text: 'If you forget everything else tonight, take this:' },
          { type: 'bullets', speaker: 'ABIE', items: [
            "Claude is not a search engine ~ it's a thinking partner",
            'Stop typing "write me X" ~ start typing "I\'m a VA, my client Sarah, here\'s what happened, here\'s what I want"',
            'The skill isn\'t in the tool. It\'s in <em>the context you bring.</em>',
          ]},
          { type: 'workbook', text: 'WORKBOOK ~ Write your own version of: "I\'m a [your role], my client/customer [name], here\'s what just happened: ____, I want Claude to: ____"' },
        ],
      },
    ],
  },

  // 03 ~ The four Claudes
  {
    id: 3, num: '03', title: 'The four', titleItalic: 'Claudes',
    subtitle: '06:27~06:37 ~ the map of what Claude actually is',
    duration: '10 min', speakers: ['ABIE'], panel: 'products',
    audWhatTitle: 'The four <em>Claudes</em>',
    audWhatBody: "<p>Confusing thing about Claude ~ there are four versions. <em>Same brain underneath.</em> Different doors depending on what you're doing.</p><p>You only need Chat for the first month. We'll mention the others so you know they exist ~ then come back to one in Hour 2.</p>",
    audTakeaway: '<em>Start with Chat.</em> Don\'t skip ahead. 90% of your wins are there.',
    beats: [
      {
        id: 'p1', title: 'Same brain, four doors', speaker: 'ABIE', blocks: [
          { type: 'scripted', speaker: 'ABIE', text: "Confusing thing about Claude ~ there are <em>four versions</em>. Same AI brain underneath. Different doors depending on what you're doing." },
          { type: 'stage', text: 'Demo panel auto-shows the four products. Walk through them.' },
          { type: 'bullets', speaker: 'ABIE', items: [
            'Claude Chat ~ where you start (claude.ai, the chat window)',
            'Claude Cowork ~ desktop app, runs alongside your files',
            'Claude Code ~ for builders, automations, custom tools',
            'Claude in Chrome ~ a browsing agent that actually does web tasks',
          ]},
        ],
      },
      {
        id: 'p2', title: 'Where to start tonight', speaker: 'ABIE', blocks: [
          { type: 'scripted', speaker: 'ABIE', text: "<em>Start with Chat.</em> Free tier exists. Pro is $20/mo. <em>Don't skip ahead.</em> 90% of your wins for the first month live in Chat." },
          { type: 'scripted', speaker: 'ABIE', text: 'Quick footnote on models ~ inside Claude you\'ll see "Sonnet, Opus, Haiku." <em>Use Sonnet. Always. For everything.</em> Until you have a reason not to. Done. Moving on.' },
        ],
      },
    ],
  },

  // 04 ~ Live demos
  {
    id: 4, num: '04', title: 'Live VA', titleItalic: 'demos',
    subtitle: '06:37~07:05 ~ three real tasks, on screen',
    duration: '28 min', speakers: ['ABIE', 'MERI'], panel: 'demo', panelUrl: 'https://claude.ai/new',
    audWhatTitle: 'Three <em>real</em> VA demos',
    audWhatBody: "<p>This is the part you came for. We're going to do three real tasks ~ live, on screen ~ that VAs and business owners do every week.</p><p>Time them in your head. <em>Notice how much faster the second pass is when you bring context.</em></p>",
    audTakeaway: 'Your job tonight: <em>copy one of these prompts and try it tomorrow.</em>',
    beats: [
      {
        id: 'd1', title: 'Frame the demo block', speaker: 'ABIE', blocks: [
          { type: 'scripted', speaker: 'ABIE', text: '<em>This is the part you came for.</em> Three demos. Real tasks. On screen.' },
          { type: 'bullets', speaker: 'ABIE', items: [
            'Demo 1 ~ Difficult client email (Abie, ~8 min)',
            'Demo 2 ~ Build a "voice memory" for repetitive replies (Meri, ~10 min)',
            'Demo 3 ~ Proposal from messy notes (Abie, ~8 min)',
          ]},
          { type: 'stage', text: 'Meri pinned in chat: drops links + copies prompts as Abie types them.' },
        ],
      },
      {
        id: 'd2', title: 'Demo 1 ~ difficult client email', speaker: 'ABIE', blocks: [
          { type: 'scripted', speaker: 'ABIE', text: "A client missed a deadline ~ <em>their fault</em> ~ but they're blaming you. You need to push back without burning the relationship." },
          { type: 'stage', text: 'Paste the client\'s message. Ask Claude for a reply that acknowledges, clarifies the actual timeline, suggests a fix. Show 2 versions ~ "firm" and "softer."' },
          { type: 'workbook', text: 'WORKBOOK ~ Note one client situation YOU could use this exact prompt for this week.' },
        ],
      },
      {
        id: 'd3', title: 'Demo 2 ~ build a "voice memory" (Meri)', speaker: 'MERI', blocks: [
          { type: 'stage', text: "Meri takes the cam. This is HER demo ~ the killer one for VAs." },
          { type: 'scripted', speaker: 'MERI', text: "This is the demo I built my whole agency around. <em>Watch this.</em> The client emails you. They expect a reply that sounds like them, not like a VA." },
          { type: 'bullets', speaker: 'MERI', items: [
            'Step 1 ~ paste 3-4 real past replies your client wrote',
            'Step 2 ~ ask Claude to extract the "voice rules" ~ tone, contractions, phrasing',
            'Step 3 ~ paste a NEW incoming question ~ ask Claude to reply in that voice',
          ]},
          { type: 'stage', text: "Run it live. Audience will gasp. This is the night's \"aha.\"" },
          { type: 'scripted', speaker: 'MERI', text: "<em>This is what I scale across every client at the agency.</em> Same 10 questions, 50 times a month, never sounds like a robot." },
        ],
      },
      {
        id: 'd4', title: 'Demo 3 ~ proposal from notes', speaker: 'ABIE', blocks: [
          { type: 'stage', text: 'Abie back on cam.' },
          { type: 'scripted', speaker: 'ABIE', text: "Last demo ~ the hated task. Writing a proposal. You have rough notes from a discovery call. <em>That's usually enough.</em>" },
          { type: 'stage', text: 'Paste messy notes. Ask Claude to structure: problem, approach, deliverables, timeline, price. Iterate one section live.' },
        ],
      },
      {
        id: 'd5', title: 'Pause + reset', speaker: 'BOTH', blocks: [
          { type: 'poll', text: 'POLL ~ "Which demo would save YOU the most hours? Type 1, 2, or 3."' },
          { type: 'stage', text: 'Meri reads top answers from chat. 90 second screen break. Stretch.' },
        ],
      },
    ],
  },

  // 05 ~ AI employees
  {
    id: 5, num: '05', title: 'AI', titleItalic: 'employees',
    subtitle: '07:05~07:23 ~ how we scale VA work with AI at Talent Mucho',
    duration: '18 min', speakers: ['MERI'], panel: 'showcase',
    audWhatTitle: 'AI <em>employees</em>',
    audWhatBody: "<p>This is the <em>Operate</em> pillar at Talent Mucho. We don't replace VAs ~ <em>we multiply them.</em></p><p>You're going to see how an \"AI employee\" gets built, what one actually does, and how a VA + AI together does the work of three.</p>",
    audTakeaway: "<em>You don't replace people with AI.</em> You give them an AI co-worker that handles the boring 80%.",
    beats: [
      {
        id: 'e1', title: 'Meri leads ~ the Operate side', speaker: 'MERI', blocks: [
          { type: 'stage', text: 'Meri on cam. Showcase panel auto-shows her side.' },
          { type: 'scripted', speaker: 'MERI', text: "<em>This is the Operate pillar at Talent Mucho.</em> When clients come to us, this is what we put inside their business. Not just a VA ~ a VA <em>plus</em> an AI stack tuned to their work." },
        ],
      },
      {
        id: 'e2', title: 'What is an "AI employee"', speaker: 'MERI', blocks: [
          { type: 'scripted', speaker: 'MERI', text: "We call them <em>AI employees</em> ~ each one is a Claude setup with a specific job, specific personality, specific instructions. Not a chatbot. <em>A trained role.</em>" },
          { type: 'bullets', speaker: 'MERI', items: [
            'Inbox Triage AI ~ sorts client mail, drafts replies, flags only what needs a human',
            'Lead Qualification AI ~ scores leads, drafts the first reply',
            "Content Review AI ~ checks every post against the client's brand voice",
            'Onboarding AI ~ takes intake form > generates SOPs + Day-1 task list',
            'Weekly Report AI ~ pulls metrics, drafts the recap',
            "FAQ Voice AI ~ trained on the client's past replies (the demo we just did, scaled)",
          ]},
        ],
      },
      {
        id: 'e3', title: 'How they work day-to-day', speaker: 'MERI', blocks: [
          { type: 'scripted', speaker: 'MERI', text: "<em>The VA doesn't disappear.</em> She becomes the editor. The decision-maker. The relationship person. The AI employee handles the volume." },
          { type: 'bullets', speaker: 'MERI', items: [
            'Morning ~ AI triages overnight emails, drafts replies. VA reviews + sends in 30 min instead of 3 hours',
            'Midday ~ AI flags 2 client decisions that need a human. VA handles those',
            'Afternoon ~ AI prepares the weekly report draft. VA edits + adds the human context',
            'Result ~ same VA, 3x the client capacity. Or same clients, half the hours.',
          ]},
        ],
      },
      {
        id: 'e4', title: 'Why this matters for VAs and founders', speaker: 'MERI', blocks: [
          { type: 'scripted', speaker: 'MERI', text: "For the VAs watching ~ <em>this is your career, not a threat.</em> The VAs who get this in 2026 are the $50/hr operators. The ones who don't are the $10/hr task-takers." },
          { type: 'bullets', speaker: 'MERI', items: [
            'You become a <em>VA + AI operator</em> ~ a different role, different rate',
            'You take on more clients without burning out',
            "You're harder to replace because you bring the AI stack with you",
            "For founders ~ your VA + AI together IS your operations team",
            "<em>This is exactly what we place inside Talent Mucho clients' businesses.</em>",
          ]},
          { type: 'workbook', text: 'WORKBOOK ~ Pick ONE AI employee from the list that would change your week most. Write it down. Circle it.' },
        ],
      },
    ],
  },

  // 06 ~ Behind the scenes
  {
    id: 6, num: '06', title: 'Behind the', titleItalic: 'scenes',
    subtitle: "07:23~07:38 ~ live tour of Abie's real operating system",
    duration: '15 min', speakers: ['ABIE', 'MERI'], panel: 'showcase',
    audWhatTitle: 'Behind the <em>scenes</em>',
    audWhatBody: "<p>Quick tour. Abie's actual operating system. The CLI, the dashboard, the website auto-deploys. <em>Real screens, no slides.</em></p><p>This is the proof segment. Everything taught tonight is also how we run our days.</p>",
    audTakeaway: "You don't need a roadmap ~ you need a starting tool. <em>Pick the most annoying weekly task. Build that first.</em>",
    beats: [
      {
        id: 'bts1', title: "Why we're showing you this", speaker: 'BOTH', blocks: [
          { type: 'stage', text: 'Both on cam. Tone shifts ~ proof segment.' },
          { type: 'scripted', speaker: 'BOTH', text: "Quick one before Q&A. <em>This isn't theory for us.</em> Everything we taught tonight, we run ourselves. We want to show you what that actually looks like behind the curtain." },
        ],
      },
      {
        id: 'bts2', title: "Abie's CLI runs the day", speaker: 'ABIE', blocks: [
          { type: 'scripted', speaker: 'ABIE', text: "My side. <em>Most days I don't open Gmail.</em> I open my terminal." },
          { type: 'stage', text: 'Switch to actual terminal screen-share. Run the email co-pilot CLI live.' },
          { type: 'bullets', speaker: 'ABIE', items: [
            'CLI checks inbox, summarises, drafts replies in my voice',
            'Website edits ~ I describe the change, Claude Code writes + commits + deploys',
            'No Gmail tab. No Notion. <em>Everything I need is one command away.</em>',
          ]},
        ],
      },
      {
        id: 'bts3', title: 'The personal dashboard', speaker: 'ABIE', blocks: [
          { type: 'scripted', speaker: 'ABIE', text: "Inside my own website I have a dashboard that runs my whole life. I used to use Notion, Coda, Asana. <em>Now it's all custom-built.</em>" },
          { type: 'stage', text: 'Tour the dashboard ~ ADHD Command Centre, Carousel Studio, UGC Pipeline, Sales Pipeline, OKRs.' },
          { type: 'scripted', speaker: 'ABIE', text: "My honest take: <em>everyone should have a system that's yours.</em> Not rented from someone else's tool. Claude makes that accessible to anyone now ~ even people who don't code." },
        ],
      },
      {
        id: 'bts4', title: 'The point', speaker: 'BOTH', blocks: [
          { type: 'scripted', speaker: 'BOTH', text: "We didn't build any of this in a weekend. <em>One tool at a time.</em> Each one solved one annoying problem. Six months in, the compound is real." },
          { type: 'workbook', text: 'WORKBOOK ~ "The most annoying repetitive thing in my week is: ____." This is the thing you build first.' },
        ],
      },
    ],
  },

  // 07 ~ Q&A + next step
  {
    id: 7, num: '07', title: 'Q&A +', titleItalic: 'next step',
    subtitle: '07:38~08:00 ~ pre-screened Q&A then the close',
    duration: '22 min', speakers: ['BOTH'], panel: 'qa',
    audWhatTitle: 'Open <em>Q&amp;A</em>',
    audWhatBody: "<p>Meri's been collecting your questions all hour. We're going to take the top ones and answer them with real demos ~ not generic advice.</p><p>After Q&A: a 4-minute close on what to do next.</p>",
    audTakeaway: "You got your <em>starting point</em>. The next step is whether you <em>actually take it.</em>",
    beats: [
      {
        id: 'q1', title: 'Frame Q&A', speaker: 'BOTH', blocks: [
          { type: 'stage', text: 'Both back on cam. Meri reads from her queue.' },
          { type: 'scripted', speaker: 'BOTH', text: "<em>This is the part you came for.</em> Meri has the top 5~6 questions. We answer with real demos. 3 min max each." },
        ],
      },
      {
        id: 'q2', title: 'Run Q&A', speaker: 'BOTH', blocks: [
          { type: 'stage', text: 'Work the queue. Meri reads, Abie demos. Watch the clock ~ 15 min absolute max.' },
        ],
      },
      {
        id: 'q3', title: 'Recap the promise', speaker: 'BOTH', blocks: [
          { type: 'stage', text: "Q&A is wrapping. Tone tightens ~ this is the most important 6 minutes of the night." },
          { type: 'scripted', speaker: 'BOTH', text: "Quick recap before we close. <em>What did we promise you tonight?</em>" },
          { type: 'bullets', speaker: 'BOTH', items: [
            "You'd <em>finally understand</em> what AI can do for your business ~ ✓ done",
            "You'd get hands-on with Claude in a small group ~ ✓ done",
            "You'd walk away with a <em>clear starting point</em>, not more overwhelm ~ ✓ done",
          ]},
          { type: 'scripted', speaker: 'BOTH', text: "<em>That was free.</em> No catch. We delivered what we promised on the landing page. <em>You owe us nothing.</em>" },
        ],
      },
      {
        id: 'q4', title: 'The honest reframe', speaker: 'ABIE', blocks: [
          { type: 'scripted', speaker: 'ABIE', text: "But here's what's also true. Tonight you saw <em>what's possible.</em> The dashboard. The AI employees. The CLI that runs my day. The proposals." },
          { type: 'scripted', speaker: 'ABIE', text: "<em>What we didn't show you</em> ~ because 2 hours is 2 hours ~ is <em>how we built any of it.</em>" },
          { type: 'scripted', speaker: 'ABIE', text: "You got the destination tonight. <em>You didn't get the map.</em>" },
          { type: 'stage', text: "Pause 2 seconds. Let it land." },
        ],
      },
      {
        id: 'q5', title: 'Stack the value', speaker: 'MERI', blocks: [
          { type: 'scripted', speaker: 'MERI', text: "So here's what we built for the people who want the map. We call it <em>VIP</em>. One time. €47. Here's exactly what's inside:" },
          { type: 'bullets', speaker: 'MERI', items: [
            "<em>The full recording</em> of tonight ~ rewatch any demo, copy any prompt (€97 value alone)",
            "<em>The Claude Vault</em> ~ every prompt we used tonight, plus 30+ more from our actual client work, organised by use case (€297 value)",
            "<em>90 days inside our premium Skool community</em> ~ where we rebuild every system from tonight, week by week, on camera (€141 value at €47/mo)",
            "<em>Live monthly Build-With-Us calls</em> ~ pick one workflow, build it with us as a small group (€200/call value)",
            "<em>Direct access to Abie + Meri</em> in the community ~ ask anything, weekly Q&A",
          ]},
          { type: 'scripted', speaker: 'MERI', text: "Total real value? <em>Over €700.</em> Tonight only ~ €47." },
        ],
      },
      {
        id: 'q6', title: 'Why this price, this once', speaker: 'MERI', blocks: [
          { type: 'scripted', speaker: 'MERI', text: "<em>I want to be honest about the price.</em> €47 isn't because we don't value our work. It's because <em>we want you in the room early.</em>" },
          { type: 'bullets', speaker: 'MERI', items: [
            "After tonight, premium Skool goes back to <em>€97/month</em>",
            "We're building this community in front of you ~ early members shape what we build",
            "You can spend <em>6 months</em> figuring this out alone the way we did ~",
            "Or you can spend <em>6 weeks inside Skool</em> with two operators in the room",
          ]},
          { type: 'scripted', speaker: 'MERI', text: "<em>€47 isn't a fee. It's compressed time.</em>" },
        ],
      },
      {
        id: 'q7', title: 'Risk reversal', speaker: 'ABIE', blocks: [
          { type: 'scripted', speaker: 'ABIE', text: "And because €47 still feels like a yes-or-no decision for some of you ~ <em>here's our promise.</em>" },
          { type: 'scripted', speaker: 'ABIE', text: "Try the recording. Open the Vault. Sit in one Skool call. If in the first <em>14 days</em> you genuinely feel like you didn't get more than €47 of value ~ email us. <em>Full refund.</em> No form. No \"sorry to see you go\" survey. Just gone." },
          { type: 'scripted', speaker: 'ABIE', text: "<em>The only thing you risk is showing up.</em>" },
        ],
      },
      {
        id: 'q8', title: 'Three doors out', speaker: 'BOTH', blocks: [
          { type: 'scripted', speaker: 'BOTH', text: "Three doors out tonight. They map to how we work at Talent Mucho ~ <em>Educate. Build. Operate.</em>" },
          { type: 'bullets', speaker: 'BOTH', items: [
            "<em>Door 1 ~ Free.</em> Close this tab. Open Claude tonight. Try one demo. Join the free Skool tier. <em>This is enough for some of you ~ and that's totally fine.</em>",
            "<em>Door 2 ~ €47 VIP.</em> Recording, Vault, 90 days premium Skool, monthly build-calls, direct access. <em>This is the one most of you should take ~ especially if you're serious about not being back in this same spot in 6 months.</em>",
            "<em>Door 3 ~ Custom.</em> Want us to build your AI stack and place a trained VA inside your business? Book a free call at talentmucho.com/booking. We only take 4 of these a quarter.",
          ]},
        ],
      },
      {
        id: 'q9', title: 'The starting point', speaker: 'BOTH', blocks: [
          { type: 'scripted', speaker: 'BOTH', text: "Last thing. Then we let you go." },
          { type: 'scripted', speaker: 'BOTH', text: "When you signed up, the landing page said <em>\"This is where you start.\"</em>" },
          { type: 'scripted', speaker: 'BOTH', text: "Tonight you got a starting point. <em>The only thing left is whether you actually take it.</em>" },
          { type: 'scripted', speaker: 'BOTH', text: "The difference between tonight being <em>interesting</em> and tonight <em>changing your business</em> is what you do in the next 24 hours. Don't close this tab and go scroll." },
          { type: 'bullets', speaker: 'BOTH', items: [
            "Open Claude tonight. <em>One thing.</em> Try one demo from tonight",
            "If you want the map ~ the VIP link is in the chat",
            "If you want us inside your business ~ talentmucho.com/booking",
          ]},
          { type: 'scripted', speaker: 'BOTH', text: "Thank you for two hours of your life. We don't take that lightly. <em>Go build something.</em> Goodnight." },
          { type: 'stage', text: 'Wave off slowly. Don\'t cut the recording yet ~ stay 5 min for stragglers + hot leads. Meri pins VIP link one more time.' },
        ],
      },
    ],
  },
];

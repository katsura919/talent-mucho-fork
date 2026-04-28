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
  leftAnnLbl: string;
  leftAnnTxt: string;
  rightTag: string;
  rightTitle: string;
  rightWhy: string;
  rightPrompt: string;
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
    rightTag: '✓ With context',
    rightTitle: '<em>Thinking partner</em>',
    rightWhy: 'Role, person, goal, constraint.',
    rightPrompt: "I'm a VA for a small marketing agency. My client Sarah hasn't paid invoice #INV-204 ~ €450, 7 days overdue. She's a good client, first time late, want to keep the relationship. Write a polite reminder that:\n- Stays warm\n- Is firm enough to actually get paid\n- Gives her an easy path to pay (Stripe)\n- Under 100 words\n\nSign as me ~ Meri.",
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
    subtitle: '06:00~06:05 ~ open warm, manage Zoom expectations',
    duration: '5 min', speakers: ['BOTH'], panel: 'demo',
    audWhatTitle: '<em>Welcome</em> in',
    audWhatBody: "<p>You're here. We're glad. The next 2 hours are going to be more workshop than webinar ~ which means we want you doing things, not just watching.</p><p>This is the <em>Educate</em> pillar of Talent Mucho. The free part. <em>Because if you don't understand what AI can do, the rest doesn't matter.</em></p>",
    audTakeaway: 'This is a <em>workshop</em>, not a webinar. Be present ~ get more.',
    beats: [
      {
        id: 'w1', title: 'Open + housekeeping', speaker: 'BOTH', blocks: [
          { type: 'stage', text: 'Both on cam. Wait 30s for stragglers. Big smile.' },
          { type: 'scripted', speaker: 'BOTH', text: "Hey everyone ~ welcome. I'm Abie, this is Meri. <em>This is a workshop, not a webinar.</em> We want you here, not lurking." },
          { type: 'bullets', speaker: 'BOTH', items: [
            'Drop your name + where you\'re joining from in the chat',
            'Meri is in the chat the whole event ~ ask anything',
            'You\'ll see a workbook on screen ~ that\'s your live companion',
            'Recording goes to VIPs only ~ so be present',
          ]},
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
    audTakeaway: "<em>Tonight was the trailer.</em> The actual movie plays inside Skool ~ where we rebuild every system from tonight, on camera.",
    beats: [
      {
        id: 'q1', title: 'Frame Q&A', speaker: 'BOTH', blocks: [
          { type: 'stage', text: 'Both back on cam. Meri reads from her queue.' },
          { type: 'scripted', speaker: 'BOTH', text: "<em>This is the part you came for.</em> Meri has the top 5-6 questions. We answer with real demos. 3 min max each." },
        ],
      },
      {
        id: 'q2', title: 'Run Q&A', speaker: 'BOTH', blocks: [
          { type: 'stage', text: 'Work the queue. Meri reads, Abie demos. Watch the clock ~ 15 min absolute max.' },
        ],
      },
      {
        id: 'q3', title: 'The framing line', speaker: 'BOTH', blocks: [
          { type: 'stage', text: "Q&A is wrapping. Tone tightens ~ this is the most important 4 minutes." },
          { type: 'scripted', speaker: 'BOTH', text: "Before you go ~ <em>one thing</em>. Tonight you saw what's possible. The dashboard. The AI employees. The CLI. The proposals. <em>What we didn't show you</em> ~ because 2 hours is 2 hours ~ is <em>how we built any of it.</em>" },
          { type: 'scripted', speaker: 'BOTH', text: "You watched the destination tonight. <em>You didn't get the map.</em>" },
        ],
      },
      {
        id: 'q4', title: 'Skool ~ the receipts', speaker: 'ABIE', blocks: [
          { type: 'scripted', speaker: 'ABIE', text: "So here's what we built next door. <em>Tonight was the trailer. Skool is where the actual movie plays.</em>" },
          { type: 'bullets', speaker: 'ABIE', items: [
            'Every system you saw tonight ~ rebuilt inside Skool, week by week, on camera',
            'You see the messy version. The failures. The prompts that didn\'t work first time. <em>The receipts.</em>',
            'Templates ~ UGC Pipeline, Sales Pipeline, the AI Employee blueprints. The actual scaffolding.',
            'Monthly "build with us" ~ pick one workflow, build it together as a community',
            'Direct access to both of us. Real Q&A. Weekly.',
          ]},
          { type: 'scripted', speaker: 'ABIE', text: "Skool is the <em>Educate</em> pillar of Talent Mucho ~ done deeper, weekly, with two operators in the room." },
        ],
      },
      {
        id: 'q5', title: 'The price reframe', speaker: 'MERI', blocks: [
          { type: 'scripted', speaker: 'MERI', text: "<em>This isn't about content.</em> The internet has enough Claude videos. What it doesn't have is <em>the receipts</em> ~ two operators showing exactly how their stack works, every week, without polishing it first." },
          { type: 'bullets', speaker: 'MERI', items: [
            'VIP tonight ~ €47 ~ recording + Claude Vault + 90 days premium Skool',
            'After tonight, premium Skool goes back to its normal price',
            'You can spend 6 months figuring this out alone, the way we did ~',
            'Or join us inside Skool and have it in 6 weeks',
          ]},
          { type: 'scripted', speaker: 'MERI', text: "<em>€47 isn't a fee. It's compressed time.</em>" },
        ],
      },
      {
        id: 'q6', title: 'Three doors out', speaker: 'BOTH', blocks: [
          { type: 'scripted', speaker: 'BOTH', text: "Three doors out tonight ~ they map to how we work at Talent Mucho. <em>Educate. Build. Operate.</em>" },
          { type: 'bullets', speaker: 'BOTH', items: [
            'Door 1 ~ <em>Educate (free).</em> Open Claude tonight. Try one demo. Join the free Skool tier.',
            'Door 2 ~ <em>Educate deeper (€47).</em> VIP recording, Claude Vault, 90 days premium Skool ~ where we rebuild every system from tonight, on camera. <em>This is the one most of you should take.</em>',
            'Door 3 ~ <em>Build + Operate (custom).</em> If you want us to build your AI systems and place a trained VA inside your business ~ book a free call. talentmucho.com/booking',
          ]},
        ],
      },
      {
        id: 'q7', title: 'Last line', speaker: 'BOTH', blocks: [
          { type: 'scripted', speaker: 'BOTH', text: "<em>Last thing.</em> The difference between tonight being interesting and tonight changing your business is what you do in the next 24 hours. Don't close this tab and go scroll. <em>Open Claude. Try one thing. Tonight.</em>" },
          { type: 'scripted', speaker: 'BOTH', text: "Thank you for being here for two hours. <em>Go build something.</em> Goodnight." },
          { type: 'stage', text: 'Wave off. Stop recording. Stay 5 min for stragglers + hot leads.' },
        ],
      },
    ],
  },
];

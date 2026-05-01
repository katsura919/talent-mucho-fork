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
  leftAnswer: string;
  leftAnnLbl: string;
  leftAnnTxt: string;
  rightTag: string;
  rightTitle: string;
  rightWhy: string;
  rightPrompt: string;
  rightAnswer: string;        // Step 1: Claude's first response (asks questions)
  rightBridge?: string;       // Optional bridge sentence Claude uses to pivot to drafts
  rightDrafts?: { label: string; body: string }[]; // Step 2: Claude offers multiple draft variations
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
    scenario: "Same prompt sent to both. Watch how each one responds.",
    leftTag: '✕ ChatGPT',
    leftTitle: 'Just answers',
    leftWhy: 'Fills in the blanks and gives you a generic template.',
    leftPrompt: 'write me an invoice reminder',
    leftAnswer: "Subject: Friendly Invoice Reminder\n\nHi [Client Name],\n\nI hope this email finds you well. I'm writing to follow up on the outstanding invoice that was sent on [date]. As of today, payment has not yet been received.\n\nThe total amount due is [amount]. Please let me know if you have any questions or if there is anything I can do to help facilitate payment.\n\nI would appreciate it if you could process the payment at your earliest convenience.\n\nThank you for your prompt attention to this matter.\n\nBest regards,\n[Your Name]",
    rightTag: '✓ Claude',
    rightTitle: 'Asks first',
    rightWhy: 'Pauses and asks for the context that makes the email actually work.',
    rightPrompt: 'write me an invoice reminder',
    rightAnswer: "Happy to help ~ three quick things so I get the framing and tone right:\n\n1. Who's the client and how overdue is it?\n2. What outcome do you want ~ a gentle nudge, a firm reminder, or a final notice?\n3. How do you usually sound with them ~ formal, casual, warm, brisk?\n\nOnce you tell me, I'll draft a few versions in your voice.",
    rightBridge: "Or, if you'd rather skip the questions, here are 3 ready-to-send versions in different tones ~ pick the one closest to your vibe:",
    rightDrafts: [
      {
        label: 'A · Gentle nudge',
        body: "Subject: Quick check-in\n\nHey Sarah,\n\nHope all's well! Friendly heads-up that invoice INV-204 (€450) is just past its due date ~ totally understand things slip when you're busy.\n\nIf it's easier, here's a one-click Stripe link to settle: [stripe link]\n\nLet me know if anything's stuck on your end,\nMeri",
      },
      {
        label: 'B · Firm reminder',
        body: "Subject: INV-204 · 7 days overdue\n\nHi Sarah,\n\nFollowing up on invoice INV-204 (€450) ~ it's now a week past due and I haven't seen payment land. Could we get this settled by end of week?\n\nStripe link for one-click pay → [stripe link]\n\nThanks,\nMeri",
      },
      {
        label: 'C · Playful + warm',
        body: "Subject: INV-204 fell asleep on the way home\n\nHey Sarah!\n\nYour invoice INV-204 took a little nap (€450, 7 days late). Quick zap to wake it up → [stripe link]\n\nIf there's a snag, lmk and I'll sort it,\nMeri",
      },
    ],
    leftAnnLbl: "What ChatGPT did",
    leftAnnTxt: "Gave you a finished template with [placeholders] you still have to fill in. You're back to doing the personalising work yourself.",
    rightAnnLbl: 'What Claude did',
    rightAnnTxt: "Refused to guess. Asked about the situation, the framing, and your tone of voice ~ the three things that turn a generic email into one that sounds like you and actually gets paid.",
    landing: "Same prompt. Different mindset. Claude treats you like a thinking partner, not a search bar.",
  },
};

export const SEGMENTS: Segment[] = [
  // 00 ~ Welcome
  {
    id: 0, num: '00', title: 'Welcome', titleItalic: '',
    subtitle: '6:00~6:05 PM ~ open warm, land the promise',
    duration: '5 min', speakers: ['BOTH'], panel: 'demo',
    audWhatTitle: 'This is where you start.',
    audWhatBody: "<p>You signed up because you've been saying \"I need to learn AI\" for months. Tonight you actually do it ~ in a small group, with two operators who run businesses on this stack every day.</p><p>By the end, you'll have a clear starting point, not more overwhelm. That's the deal.</p>",
    audTakeaway: 'You came for a starting point. You leave with one.',
    beats: [
      {
        id: 'w0', title: 'Land the promise', speaker: 'BOTH', blocks: [
          { type: 'stage', text: 'Both on cam. Wait 30s for stragglers. Warm smile, slow tempo. Make eye contact with the camera.' },
          { type: 'scripted', speaker: 'ABIE', text: "Hey hey ~ welcome in. I'm Abie. This is Meri. Give us a sec while everyone trickles in ~ grab a drink, get comfy, settle in." },
          { type: 'scripted', speaker: 'MERI', text: "Drop a wave in the chat if you can hear us okay. We see you." },
          { type: 'scripted', speaker: 'ABIE', text: "Okay ~ I want to start with the only thing that actually matters tonight. Thank you. Genuinely. Because you could be watching Netflix, you could be answering emails, you could be in bed already ~ and instead you're here. That's not nothing. We don't take that lightly." },
          { type: 'scripted', speaker: 'MERI', text: "And here's the thing ~ I know exactly why most of you signed up. Because you've been saying it for months. \"I really need to figure out this AI thing.\" You watched the YouTube videos, you opened ChatGPT once or twice, maybe you even paid for a course you never finished. And you still feel behind." },
          { type: 'scripted', speaker: 'ABIE', text: "Tonight, that ends. That's not a hype line. That's a promise. So let me tell you what's actually going to happen in the next two hours ~" },
          { type: 'bullets', speaker: 'BOTH', items: [
            "You'll finally get what AI actually does ~ in plain English. No PhDs, no jargon.",
            "You'll see Claude work on real tasks. Live. Not a demo video. Real builds you can copy.",
            "And you'll leave with a clear next step ~ not 47 browser tabs and a vague promise to 'try this later'.",
          ]},
          { type: 'scripted', speaker: 'MERI', text: "That's the whole deal. That's what we promised on the landing page, and that's what we're delivering. No bait. No upsell halfway through. Just the workshop you came for." },
          { type: 'scripted', speaker: 'ABIE', text: "Cool? Cool. Let's go." },
        ],
      },
      {
        id: 'w1', title: 'Housekeeping', speaker: 'BOTH', blocks: [
          { type: 'scripted', speaker: 'MERI', text: "Two quick house rules and we dive in. I'll keep it short ~ I promise." },
          { type: 'bullets', speaker: 'MERI', items: [
            "Drop your name and where you're tuning in from in the chat right now ~ we want to see who's in the room.",
            "I'm in the chat the entire time ~ no question is too basic. If you're confused, ten other people are too. Ask.",
            "You'll see a workbook pop up on screen ~ that's your companion. Write in it. Use it. It's where the work actually happens.",
            "This is a workshop, not a webinar. You came to do, not to watch. Be present and you'll get ten times more out of it.",
          ]},
          { type: 'scripted', speaker: 'ABIE', text: "And one last thing ~ this is being recorded. So if your kid screams in the background or your dog walks across the keyboard, you can rewatch later. But trust me, live is where the magic is." },
          { type: 'workbook', text: "WORKBOOK ~ Where are you joining from tonight? Drop your city or country in the chat." },
          { type: 'poll', text: "POLL ~ Drop a 1, 2, 3, or 4 in chat so we know who's in the room:\n1 = I run my own business\n2 = I work at a company but I want to start my own thing\n3 = Freelance / side hustle life\n4 = Just curious about AI ~ no skin in the game yet" },
        ],
      },
    ],
  },

  // 01 ~ Origin stories
  {
    id: 1, num: '01', title: 'How we', titleItalic: 'got here',
    subtitle: '6:05~6:15 PM ~ Abie + Meri intros, why we don\'t gatekeep',
    duration: '10 min', speakers: ['BOTH'], panel: 'showcase',
    audWhatTitle: 'How we got here',
    audWhatBody: "<p>Two very different stories. One business. You're learning from two operators who actually run what they teach ~ not from coaches selling a course.</p><p>Abie's the engineer who came back to building. Meri's the marketer who burned out hiring people and figured out AI was the answer.</p>",
    audTakeaway: "Not coaches. Operators. What we teach tonight is what we run every day.",
    beats: [
      {
        id: 'o1', title: "Abie's story", speaker: 'ABIE', blocks: [
          { type: 'stage', text: 'Abie on cam. Slow down. Own it.' },
          { type: 'scripted', speaker: 'ABIE', text: "So. I am what you'd call a tech chameleon. Grew up in Davao, Philippines. Spent a decade in tech ~ analyst, architect, engineer, manager. Every few years, different role, different stack, different industry. My LinkedIn looks like five people had access to it." },
          { type: 'scripted', speaker: 'ABIE', text: "And then the same thing happened with countries. Tech gave me location freedom so I just... used it. A lot. One to three months per place ~ no roots, no lease longer than a few weeks. A chameleon in every sense. Career. Countries. Everything." },
          { type: 'scripted', speaker: 'ABIE', text: "For years I genuinely thought that was my flaw. Everyone around me had a lane. A specialty. A title that made sense. I had seventeen browser tabs open and a very confusing resume." },
          { type: 'scripted', speaker: 'ABIE', text: "Then I found AI ~ and it completely changed what breadth is worth. Turns out knowing a little about everything is exactly what you need to direct AI well. The chameleon thing? That's the whole game now." },
          { type: 'scripted', speaker: 'ABIE', text: "AI is what finally pieced me together. I built a second brain in Obsidian ~ my journals, my playbooks, my entire life's work, all in one place. It used to just sit there. Now with AI I can actually connect and use all of it. I slowly upload them to my website and use AI to make sense of it all. It was game-changing to make use of what started in your thoughts ~ and turn it into a published version that even one soul can benefit from." },
          { type: 'scripted', speaker: 'ABIE', text: "And recently I had this desire ~ to take it to the next level. Videos. Live events. Tonight." },
          { type: 'scripted', speaker: 'ABIE', text: "And I finally found a base. Spain. My build era. First time in my adult life I signed a real lease and meant it." },
        ],
      },
      {
        id: 'o2', title: "Meri's story", speaker: 'MERI', blocks: [
          { type: 'stage', text: 'Meri on cam. Different energy ~ marketer who became operator.' },
          { type: 'scripted', speaker: 'MERI', text: "I come at this from the complete opposite side. Marketing person, no tech background. Built an agency from scratch ~ writers, editors, devs, social managers. The whole circus." },
          { type: 'scripted', speaker: 'MERI', text: "And I burned out. Not the cute LinkedIn burnout. The crying-into-the-Notion-doc kind. Managing humans is exhausting. Pretty sure I aged ten years in two." },
          { type: 'scripted', speaker: 'MERI', text: "ChatGPT got me curious. Then Claude landed and I was like... oh. Oh. This is it." },
          { type: 'scripted', speaker: 'MERI', text: "Now I run a way leaner operation. Less people. More output. Fewer Mondays that feel like Sundays." },
          { type: 'scripted', speaker: 'MERI', text: "Fun fact ~ I'm streaming this from the Balkans right now. Living the location-free life Abie talked about. DNV pending ~ Spain next, so we can finally be in the same time zone. Until then, Slack and Claude are doing the heavy lifting." },
          { type: 'scripted', speaker: 'MERI', text: "Tonight we're showing you exactly how we did it ~ because we did, and we're still doing it." },
          { type: 'scripted', speaker: 'MERI', text: "And how did we meet? I found Abie on YouTube. I slid into her DMs and said ~ let's meet in Barcelona." },
          { type: 'scripted', speaker: 'ABIE', text: "Two strangers from the internet. I posted a thread about it and it went so viral people thought I was getting trafficked. One million views." },
          { type: 'scripted', speaker: 'BOTH', text: "And here we are ~ building Talent Mucho." },
        ],
      },
      {
        id: 'o2a', title: "Why we're doing this", speaker: 'BOTH', blocks: [
          { type: 'stage', text: "Both back on cam. Mission beat. Slow down." },
          { type: 'scripted', speaker: 'BOTH', text: "Here's the part nobody says out loud. AI isn't new. The hype isn't new. But most of you are still on the sidelines, scrolling twenty newsletters, trying to figure out where to start." },
          { type: 'scripted', speaker: 'ABIE', text: "The people winning right now? Developers. Tech operators. They plug AI in and ship the same week. They also happen to have the biggest replacement risk ~ but they're not thinking about that yet." },
          { type: 'scripted', speaker: 'MERI', text: "Meanwhile everyone else is paying €200 a month for tools they barely use, watching three-hour YouTube tutorials, and ending the week more confused than when they started." },
          { type: 'scripted', speaker: 'ABIE', text: "We sit right at the intersection. Tech, business, and AI. I bring the engineering. Meri brings the business and the marketing. Claude brings the muscle." },
          { type: 'scripted', speaker: 'BOTH', text: "Mission tonight ~ get you the same superpowers. Without you having to learn Python or watch another guru." },
        ],
      },
      {
        id: 'o3', title: 'Talent Mucho ~ three pillars', speaker: 'BOTH', blocks: [
          { type: 'scripted', speaker: 'BOTH', text: "What we built together is Talent Mucho. Three pillars. Educate. Build. Operate." },
          { type: 'bullets', speaker: 'BOTH', items: [
            'Educate ~ workshops like tonight. Get your team off the sidelines.',
            'Build ~ websites, automations, AI systems we actually run inside our own business first.',
            'Operate ~ AI-trained VAs and engineers we place inside yours, the way we\'d hire for ourselves.',
            "Two women running the stack every single day. Not coaches. Not gurus. Operators.",
          ]},
          { type: 'scripted', speaker: 'BOTH', text: 'Tonight is the Educate pillar. Free. Because if you don\'t get what AI actually does, the rest is wasted on you.' },
          { type: 'workbook', text: 'WORKBOOK ~ Right now, on screen, write down: "What\'s the heaviest task in my work right now?" ~ we\'ll come back to this.' },
        ],
      },
    ],
  },

  // 02 ~ What is Claude
  {
    id: 2, num: '02', title: 'What is AI', titleItalic: 'and Claude',
    subtitle: '6:15~6:30 PM ~ the AI landscape, Claude vs ChatGPT, the mindset shift',
    duration: '15 min', speakers: ['ABIE', 'MERI'], panel: 'compare', panelData: 'chatgpt-vs-claude',
    audWhatTitle: 'What is Claude ~ and how is it different?',
    audWhatBody: "<p>There are dozens of AI tools out there. We'll show you the landscape ~ who the major players are and what each one does ~ then zoom in on why Claude is different and why it changed everything for us.</p>",
    audTakeaway: "Claude is not a search engine. It's a thinking partner. The skill is in the context you bring.",
    beats: [
      {
        id: 'c0', title: 'The AI landscape', speaker: 'ABIE', blocks: [
          { type: 'stage', text: 'AI Landscape component visible on audience screen. Let them read + click models for 30s.' },
          { type: 'scripted', speaker: 'ABIE', text: "Before we talk about Claude specifically, let's zoom out. There are dozens of AI tools out there right now. You've probably heard of ChatGPT. Maybe Gemini. Maybe nothing else. That's totally fine." },
          { type: 'scripted', speaker: 'ABIE', text: "Here's the landscape. Five major players. Each one built by a different company. Each one does something slightly different." },
          { type: 'bullets', speaker: 'ABIE', items: [
            "ChatGPT ~ the one everyone knows. Fast, general, great for brainstorming",
            "Gemini ~ Google's version. Lives inside your Gmail and Docs",
            "Copilot ~ Microsoft's version. Built into Word, Excel, PowerPoint",
            "Llama ~ Meta's open-source model. Powers thousands of apps behind the scenes",
            "Claude ~ the thinking partner. The one we use every day to run our business",
          ]},
          { type: 'scripted', speaker: 'ABIE', text: "Now here's the part nobody tells you. Most AI tools you've seen are wrappers. Notion AI? Runs on Claude. Canva AI? Runs on GPT and others. Cursor ~ the one developers obsess over ~ runs on Claude and GPT. Even Perplexity, the new Google replacement, is Claude and GPT underneath. They just put a pretty interface on top of the same intelligence." },
          { type: 'scripted', speaker: 'ABIE', text: "When you learn the source directly, you don't need the wrapper. You get more control, more power ~ and you stop paying extra for a button on top of the same brain." },
          { type: 'scripted', speaker: 'MERI', text: "And before someone asks ~ yes, all of these have free tiers. ChatGPT free. Claude free. Gemini free. You don't need to pay anything to start tonight. The paid plans are all around 20 dollars a month if you go heavy, but most of you can ride the free tier for weeks." },
          { type: 'scripted', speaker: 'ABIE', text: "Here's what you do tonight. Open claude.ai. On your phone, your laptop, doesn't matter. Sign up with Google or email ~ takes 30 seconds. Then ask it something real. Not a test. Real work. The email you've been avoiding. The doc you can't start. Watch what happens." },
          { type: 'scripted', speaker: 'ABIE', text: "Tonight we're going to show you why Claude is different ~ and why it's the one that changed everything for us." },
        ],
      },
      {
        id: 'c1', title: 'You came from ChatGPT', speaker: 'MERI', blocks: [
          { type: 'poll', text: 'POLL ~ Type in chat: 1 = ChatGPT user, 2 = Claude user, 3 = Both, 4 = Neither yet.' },
          { type: 'scripted', speaker: 'MERI', text: "Okay, looking at the poll ~ most of you use ChatGPT. Which is perfect, because that means you'll get the most out of tonight." },
          { type: 'scripted', speaker: 'MERI', text: "Claude is different from ChatGPT in a few important ways. The first one nobody tells you about: tokens." },
          { type: 'bullets', speaker: 'MERI', items: [
            "Think of tokens like fuel. Every message you send uses some",
            "Claude has limits per session ~ when you hit them, you pause and come back later",
            "Translation: you can\'t spam Claude the way you spam ChatGPT. You have to be intentional.",
            "Claude is smarter and more careful ~ but it costs more to run, so you make each prompt count",
          ]},
        ],
      },
      {
        id: 'c2', title: "Claude asks YOU questions back", speaker: 'ABIE', blocks: [
          { type: 'scripted', speaker: 'ABIE', text: "The other big difference. Claude asks YOU questions back. ChatGPT will just give you an answer ~ generic, fast, and often wrong-toned." },
          { type: 'scripted', speaker: 'ABIE', text: "Claude says: wait. What tone do you want? Who's the audience? What's the context? That extra step? That's what makes Claude's outputs so much more accurate." },
        ],
      },
      {
        id: 'c3', title: "Switching tools doesn't fix bad prompting", speaker: 'ABIE', blocks: [
          { type: 'scripted', speaker: 'ABIE', text: "Here's the real issue though. Switching tools doesn't fix bad prompting. Most people use Claude exactly like ChatGPT ~ a search bar. Watch what happens." },
          { type: 'stage', text: 'Compare panel auto-loaded. Hit RUN. Don\'t talk over the streaming output ~ let them read both sides.' },
        ],
      },
      {
        id: 'c4', title: 'The mindset shift', speaker: 'ABIE', blocks: [
          { type: 'scripted', speaker: 'ABIE', text: 'If you forget everything else tonight, take this:' },
          { type: 'bullets', speaker: 'ABIE', items: [
            "Claude is not a search engine ~ it's a thinking partner",
            'Stop typing "write me X" ~ start typing "I\'m a [role], here\'s the situation, here\'s what I need"',
            "The skill isn't in the tool. It's in the context you bring.",
            "This is what we call vibe-prompting. You bring the context, Claude does the work.",
          ]},
          { type: 'workbook', text: 'WORKBOOK ~ Write your own: "I\'m a [your role], my client/customer [name], here\'s what just happened: ____, I want Claude to: ____"' },
        ],
      },
    ],
  },

  // 03 ~ The Claudes + Models
  {
    id: 3, num: '03', title: 'The four', titleItalic: 'Claudes',
    subtitle: '6:27~6:40 PM ~ the four products + the three models',
    duration: '13 min', speakers: ['MERI', 'ABIE'], panel: 'products',
    audWhatTitle: 'The four Claudes + three models',
    audWhatBody: "<p>The confusing thing about Claude ~ there are four products and three model sizes. Same brain underneath. Different doors depending on what you're doing.</p><p>You only need Chat for your first month. We'll show you the others so you know what's out there ~ then we land on what matters.</p>",
    audTakeaway: 'Coming from ChatGPT? Sonnet is your GPT-4o. When in doubt, just use Sonnet.',
    beats: [
      {
        id: 'p1', title: 'Same brain, four doors', speaker: 'MERI', blocks: [
          { type: 'scripted', speaker: 'MERI', text: "Claude has four main products. Same AI underneath. Different doors depending on what you're trying to do." },
          { type: 'stage', text: 'Demo panel auto-shows the four products. Walk through them.' },
          { type: 'bullets', speaker: 'MERI', items: [
            "Claude Chat ~ the conversational interface, browser + desktop. Where you start.",
            "Claude Cowork ~ desktop only. Manages files, organizes folders, schedules tasks, controls your browser ~ from natural language",
            "Claude Code ~ build websites, apps, dashboards, tools just by describing what you want. No coding required.",
            "Claude in Chrome ~ a browsing agent. Does web tasks for you ~ research, lead gen, repetitive forms",
          ]},
        ],
      },
      {
        id: 'p2', title: 'Cowork ~ wake up to a sorted life', speaker: 'ABIE', blocks: [
          { type: 'scripted', speaker: 'ABIE', text: "Cowork is wild. Imagine waking up and your downloads folder is sorted by category. Blog images filed in the right folders. Invoices renamed and archived." },
          { type: 'scripted', speaker: 'ABIE', text: "You didn't do that. Claude did it while you were sleeping. That's Cowork." },
        ],
      },
      {
        id: 'p3', title: 'Code ~ Vibe Coding', speaker: 'ABIE', blocks: [
          { type: 'scripted', speaker: 'ABIE', text: "And Code ~ this is the one that changed everything for me. As an engineer who stopped coding for years, Claude Code brought me back." },
          { type: 'scripted', speaker: 'ABIE', text: "Last week, I added a Privacy Policy page to our website in minutes. Just told Claude what I needed. Done. Deployed. This is what we call Vibe Coding." },
          { type: 'bullets', speaker: 'ABIE', items: [
            "You're the founder, the visionary. Claude is the builder.",
            "You describe what you want ~ Claude makes it happen.",
            "For Meri, who's not a developer ~ Code lets her prototype, structure, hand to a dev. Saves weeks.",
            "For me, who used to code ~ it brought me back to building.",
          ]},
        ],
      },
      {
        id: 'p4', title: 'The three models', speaker: 'ABIE', blocks: [
          { type: 'scripted', speaker: 'ABIE', text: "Inside Claude you'll see three model names. Think of them as different employees with different skill sets." },
          { type: 'bullets', speaker: 'ABIE', items: [
            "Opus ~ the genius. Most intelligent. Use for complex stuff: building skills, AI employees, strategy. Sparingly. Heavy on tokens.",
            "Sonnet ~ the workhorse. Daily driver. Coding, writing, organizing. Smart and efficient. Use this 90% of the time.",
            "Haiku ~ the speed demon. Fast lookups, short answers. Use it like ChatGPT for quick stuff.",
          ]},
          { type: 'scripted', speaker: 'MERI', text: "My personal rule: Opus only when I'm building something complex. Everything else Sonnet. Quick stuff Haiku. Knowing when to use which is the whole game." },
        ],
      },
      {
        id: 'p5', title: 'Where to start tonight', speaker: 'ABIE', blocks: [
          { type: 'scripted', speaker: 'ABIE', text: "Start with Chat. Use Sonnet. Free tier exists. Pro is $20/mo. Don't skip ahead. 90% of your wins your first month live there." },
        ],
      },
    ],
  },

  // 04 ~ Live demos
  {
    id: 4, num: '04', title: 'Live', titleItalic: 'demos',
    subtitle: '6:40~7:05 PM ~ three real tasks, on screen',
    duration: '25 min', speakers: ['ABIE', 'MERI'], panel: 'demo', panelUrl: 'https://claude.ai/new',
    audWhatTitle: 'What we demo live',
    audWhatBody: "<p>This is the part you came for. Real tools. Live, on screen. Our Talent Mucho AI Architects are in the room ~ each one specialised in a different tool.</p><p>We spin the wheel. Whoever's most active in the chat picks the spinner. Whatever it lands on, an AI Architect demos it live.</p>",
    audTakeaway: 'Your job tonight: copy one of these prompts and try it tomorrow.',
    beats: [
      {
        id: 'd1', title: 'Frame the demo block', speaker: 'ABIE', blocks: [
          { type: 'scripted', speaker: 'ABIE', text: "Enough theory. Let's show you what this looks like in real life. Real tools. On screen. Right now." },
          { type: 'scripted', speaker: 'ABIE', text: "We have our Talent Mucho AI Architects in the room ~ each one specialised in one of these tools. We're going to spin the wheel, and whoever it lands on, one of our Architects demos it live." },
          { type: 'bullets', speaker: 'ABIE', items: [
            "Carousel Studio ~ turn any idea into a ready-to-post carousel",
            "Premium Dashboard & Command Centre ~ your AI home base, built live",
            "Profile Maker ~ bio, LinkedIn, pitch ~ consistent and on-brand",
            "Video Editor ~ script, caption, repurpose ~ without touching an edit suite",
          ]},
          { type: 'stage', text: "Call out the most active person in chat. Ask them to pick: spin or choose? Hand it to them." },
        ],
      },
      {
        id: 'd2', title: 'Spin + hand to AI Architect', speaker: 'BOTH', blocks: [
          { type: 'stage', text: "Spin the wheel on screen. Announce what it lands on. AI Architect takes over camera + screen share." },
          { type: 'scripted', speaker: 'ABIE', text: "The wheel has spoken. [Architect name] ~ take it away." },
          { type: 'stage', text: "AI Architect runs the live demo. Abie + Meri stay on cam, react, answer chat questions while demo runs." },
          { type: 'scripted', speaker: 'ABIE', text: "Drop your questions in chat as they build ~ our team is watching. Nothing is pre-recorded. This is all live." },
        ],
      },
      {
        id: 'd3', title: 'Second spin (if time)', speaker: 'BOTH', blocks: [
          { type: 'stage', text: "If pace is good, spin again. Pick a second person from chat. Different Architect demos the next tool." },
          { type: 'scripted', speaker: 'ABIE', text: "One more. Who in chat hasn't had a turn yet ~ drop a number 1 to 4, we'll pick someone." },
          { type: 'stage', text: "Second Architect demos. Keep it tight ~ 6 to 8 minutes max." },
        ],
      },
      {
        id: 'd4', title: 'Debrief + pull the insight', speaker: 'BOTH', blocks: [
          { type: 'scripted', speaker: 'ABIE', text: "What you just watched ~ that's not magic. That's a skill library. Natural language instructions you give Claude once, and it just works ~ every time, forever." },
          { type: 'bullets', speaker: 'ABIE', items: [
            "No code. No developer. No API.",
            "Each of those tools was built with Claude ~ by someone who started exactly where you are",
            "The full skill library lives inside our premium community.",
          ]},
          { type: 'workbook', text: "WORKBOOK ~ Which of those tools would save you the most time this week? Write it down." },
        ],
      },
      {
        id: 'd5', title: 'Pause + reset', speaker: 'BOTH', blocks: [
          { type: 'poll', text: 'POLL ~ "Which demo would save YOU the most hours? 1 = Carousel  2 = Dashboard  3 = Profile  4 = Video"' },
          { type: 'stage', text: 'Meri reads top answers from chat. 90 second screen break. Stretch.' },
        ],
      },
    ],
  },

  // 05 ~ AI employees
  {
    id: 5, num: '05', title: 'AI', titleItalic: 'employees',
    subtitle: '7:05~7:20 PM ~ Meri\'s side ~ how we multiply VA work with AI',
    duration: '15 min', speakers: ['MERI'], panel: 'showcase',
    audWhatTitle: 'AI employees ~ the Operate pillar',
    audWhatBody: "<p>This is the Operate pillar at Talent Mucho. We don't replace VAs ~ we multiply them.</p><p>You'll see how an \"AI employee\" gets built, what one does day-to-day, and how a VA + AI together does the work of three.</p>",
    audTakeaway: "Don't replace people with AI. Give them an AI co-worker that handles the boring 80%.",
    beats: [
      {
        id: 'e1', title: 'Meri leads ~ Operate', speaker: 'MERI', blocks: [
          { type: 'stage', text: 'Meri on cam. Showcase panel auto-shows her side.' },
          { type: 'scripted', speaker: 'MERI', text: "This is the Operate pillar at Talent Mucho. When clients hire us, this is what we put inside their business. Not just a VA. A VA plus an AI stack tuned to their actual work." },
        ],
      },
      {
        id: 'e2', title: 'What is an "AI employee"', speaker: 'MERI', blocks: [
          { type: 'scripted', speaker: 'MERI', text: "We call them AI employees. Each one is a Claude setup with a specific job, specific personality, specific instructions. Not a chatbot. A trained role." },
          { type: 'bullets', speaker: 'MERI', items: [
            "Inbox Triage AI ~ sorts mail, drafts replies, flags only what needs a human",
            "Lead Qualification AI ~ scores leads, drafts the first reply",
            "Content Review AI ~ checks every post against the client's brand voice",
            "Onboarding AI ~ intake form to SOPs and Day-1 task list",
            "Weekly Report AI ~ pulls metrics, drafts the recap",
            "FAQ Voice AI ~ trained on the client's past replies, scales the voice demo",
          ]},
        ],
      },
      {
        id: 'e3', title: 'A day in the life', speaker: 'MERI', blocks: [
          { type: 'scripted', speaker: 'MERI', text: "The VA doesn't disappear. She becomes the editor, the decision-maker, the relationship person. The AI employee handles the volume." },
          { type: 'bullets', speaker: 'MERI', items: [
            "Morning ~ AI triages overnight emails. VA reviews + sends in 30 min instead of 3 hours",
            "Midday ~ AI flags 2 client decisions that need a human. VA handles those",
            "Afternoon ~ AI drafts the weekly report. VA edits + adds the human context",
            "Result ~ same VA, 3x the client capacity. Or same clients, half the hours.",
          ]},
          { type: 'workbook', text: 'WORKBOOK ~ "The most annoying repetitive thing in my week is: ____."' },
        ],
      },
    ],
  },

  // 06 ~ Live build
  {
    id: 6, num: '06', title: 'Live', titleItalic: 'build',
    subtitle: "7:20~7:35 PM ~ pick a real problem from the audience, solve it with Claude on the spot",
    duration: '15 min', speakers: ['ABIE', 'MERI'], panel: 'showcase',
    audWhatTitle: 'Live build',
    audWhatBody: "<p>This is hands-on. We pick a real problem from someone in the room and build a solution with Claude ~ right here, right now.</p><p>No prep. No slides. Just a screen share and a problem worth solving.</p>",
    audTakeaway: "You just watched us build something real in 15 minutes. Imagine what you could do in a week.",
    beats: [
      {
        id: 'lb1', title: 'Set the stage', speaker: 'BOTH', blocks: [
          { type: 'stage', text: 'Both on cam. Energy up ~ this is the moment they see it click.' },
          { type: 'scripted', speaker: 'BOTH', text: "Okay ~ this is the part that makes tonight different. We're not showing you another demo. We're going to pick a real problem from one of you and solve it live." },
          { type: 'scripted', speaker: 'MERI', text: "Drop your problem in the chat. One sentence. \"I spend 3 hours a week doing X.\" We'll pick one and build it on screen." },
          { type: 'stage', text: 'Meri scans chat. Pick something concrete ~ email drafting, content repurposing, client onboarding, data entry. Avoid anything too niche.' },
        ],
      },
      {
        id: 'lb2', title: 'Pick the problem', speaker: 'MERI', blocks: [
          { type: 'scripted', speaker: 'MERI', text: "Alright ~ we've got a good one. Let me read it out." },
          { type: 'stage', text: 'Read the chosen problem out loud. Acknowledge the person by name.' },
          { type: 'scripted', speaker: 'MERI', text: "This is exactly the kind of thing we were talking about earlier. Repetitive, time-consuming, and Claude can eat it for breakfast." },
          { type: 'workbook', text: "WORKBOOK ~ Write down: what's YOUR version of this problem? What's the task you'd want Claude to solve first?" },
        ],
      },
      {
        id: 'lb3', title: 'Build it live', speaker: 'ABIE', blocks: [
          { type: 'stage', text: 'Abie shares screen. Open Claude. Walk through the build step by step. Narrate everything.' },
          { type: 'scripted', speaker: 'ABIE', text: "Watch the screen. I'm going to think out loud so you can follow the process, not just the output." },
          { type: 'bullets', speaker: 'ABIE', items: [
            'Step 1 ~ Define the problem in plain language. What goes in, what comes out.',
            'Step 2 ~ Give Claude context. Paste an example, describe the tone, set constraints.',
            'Step 3 ~ Run it. Review the output. Tweak. Run again.',
          ]},
          { type: 'stage', text: 'Keep it under 10 minutes. If the first output is good, show a refinement pass. If it\'s rough, show the correction loop ~ that\'s equally valuable.' },
          { type: 'scripted', speaker: 'ABIE', text: "That took what ~ 8 minutes? This person was spending 3 hours a week on this. That's the compound effect we keep talking about." },
        ],
      },
      {
        id: 'lb4', title: 'Land it', speaker: 'BOTH', blocks: [
          { type: 'scripted', speaker: 'BOTH', text: "That's what it looks like. No magic. No code. Just a clear problem and a good prompt." },
          { type: 'scripted', speaker: 'BOTH', text: "Remember the answer you wrote down earlier ~ the most annoying repetitive thing in your week? You just watched us solve someone else's. Yours is next." },

          { type: 'scripted', speaker: 'ABIE', text: "Now ~ I'm going to be straight with you, because honesty is what builds trust. For the simple stuff ~ emails, drafts, daily ops, content ~ you can 100% do this yourself. Tonight, even. That's the whole point of why we're here." },
          { type: 'scripted', speaker: 'ABIE', text: "But here's the part most people learn the hard way. The complicated projects ~ full AI systems, custom employees, the skills our Architects demoed earlier ~ those don't get built by watching one workshop. They get built by people who've shipped this stuff hundreds of times." },
          { type: 'scripted', speaker: 'ABIE', text: "Meri and I have an unfair advantage. We're technical. Our team is mostly engineers and AI architects. That's why what you just saw looks effortless ~ because we've already made every mistake you'd be about to make." },
          { type: 'scripted', speaker: 'MERI', text: "And here's what I've watched happen with smart people for two years now. They watch a workshop like this. They go home pumped. Then they spend three months trying to build the complex thing alone, hit twelve walls, and quietly stop. The people who actually ship? They paired up with someone who's already done it." },
          { type: 'scripted', speaker: 'MERI', text: "So if you're serious ~ and only if you're serious ~ pair up. That's the move. The easiest way? Pair up with us. We've already built what you're trying to build." },
          { type: 'bullets', speaker: 'BOTH', items: [
            "Lane 1 ~ Deploy our people into your team. Embedded AI engineers + VAs running inside your business. (We have a waitlist.)",
            "Lane 2 ~ Done-for-you build. Hand us the problem, we hand back the system, fully operational. Higher ticket, faster results.",
            "Lane 3 ~ Premium community. Weekly live sessions with us, full vault access, and the quarterly bootcamps where we walk you through building the complex stuff yourself ~ at a fraction of the price of Lanes 1 or 2.",
          ]},
          { type: 'scripted', speaker: 'ABIE', text: "Most people in this room will fit Lane 3. That's the bridge between the workshop and the real builds. Tonight only, we're opening it at the founding-member rate ~ and that price doesn't come back." },
          { type: 'scripted', speaker: 'BOTH', text: "Whichever lane you pick ~ you're not doing this alone. That's the entire reason we built Talent Mucho. The lane is yours. The decision window is now." },
          { type: 'poll', text: "POLL ~ After watching that live build, how confident are you that you could do this yourself?\n1 = I need more guidance\n2 = I could try it with some help\n3 = I'm ready to go\n4 = I'm already planning what to build" },
        ],
      },
    ],
  },

  // 07 ~ Q&A
  {
    id: 7, num: '07', title: 'Open', titleItalic: 'Q&A',
    subtitle: '7:35~7:50 PM ~ pre-screened Q&A with real demos',
    duration: '15 min', speakers: ['BOTH'], panel: 'qa',
    audWhatTitle: 'Open Q&amp;A',
    audWhatBody: "<p>Meri's been collecting your questions all hour. We're going to take the top ones and answer them with real demos ~ not generic advice.</p>",
    audTakeaway: "No question is too basic. Ask now or ask in Skool later.",
    beats: [
      {
        id: 'q1', title: 'Frame Q&A', speaker: 'BOTH', blocks: [
          { type: 'stage', text: 'Both back on cam. Meri reads from her queue.' },
          { type: 'scripted', speaker: 'BOTH', text: "This is the part you came for. Meri has the top 5~6 questions. We answer with real demos. 3 min max each." },
        ],
      },
      {
        id: 'q2', title: 'Run Q&A', speaker: 'BOTH', blocks: [
          { type: 'stage', text: 'Work the queue. Meri reads, Abie demos. Watch the clock ~ 15 min absolute max.' },
        ],
      },
    ],
  },

  // 08 ~ Next step
  {
    id: 8, num: '08', title: 'Next', titleItalic: 'step',
    subtitle: '7:50~8:00 PM ~ recap, bootcamp offer, Skool, close',
    duration: '10 min', speakers: ['BOTH'], panel: 'qa',
    audWhatTitle: 'Your next step',
    audWhatBody: "<p>We delivered what we promised. Now here's what comes next ~ whether you go free, grab VIP, or join the Bootcamp.</p>",
    audTakeaway: "The difference between tonight being interesting and tonight changing your business is what you do in the next 24 hours.",
    beats: [
      {
        id: 'ns1', title: 'Deliver the receipt', speaker: 'BOTH', blocks: [
          { type: 'stage', text: "Slow down. Lower your voice slightly. This 10 minutes earns the next cohort. Deliver it like you mean it." },
          { type: 'scripted', speaker: 'BOTH', text: "Before we close ~ we want to give you the receipt." },
          { type: 'bullets', speaker: 'BOTH', items: [
            "You'd finally understand what AI can actually do for your business ~ ✓ done",
            "You'd get hands-on with Claude in a small group setting ~ ✓ done",
            "You'd walk away with a clear starting point, not more overwhelm ~ ✓ done",
          ]},
          { type: 'scripted', speaker: 'BOTH', text: "That was free. We delivered what we promised before you gave us a single euro. You came here, you showed up, and we held up our end." },
          { type: 'stage', text: "Pause. Let the reciprocity land before moving on." },
        ],
      },
      {
        id: 'ns2', title: 'Future pace the gap', speaker: 'ABIE', blocks: [
          { type: 'stage', text: "This is the most important mental shift of the close. Don't rush it. Paint the picture slowly." },
          { type: 'scripted', speaker: 'ABIE', text: "Here's what I want you to do. Close your eyes for five seconds. Imagine it's Week 4 of next month." },
          { type: 'stage', text: "Pause 5 full seconds. Then continue." },
          { type: 'scripted', speaker: 'ABIE', text: "You have an AI project built for your business ~ loaded with your voice, your offers, your clients. You have a named AI employee that drafts your weekly DMs while you sleep. You have 9.5 hours back every single week. Not 9.5 hours of busywork. Nine and a half hours of your actual life." },
          { type: 'scripted', speaker: 'ABIE', text: "That's not a fantasy. That's Week 4 of the bootcamp for people who show up." },
          { type: 'scripted', speaker: 'ABIE', text: "Tonight you saw the destination. What we didn't have time to show you ~ because 2 hours is 2 hours ~ is the map to get there." },
          { type: 'stage', text: "Pause 2 seconds. Let the gap sit." },
        ],
      },
      {
        id: 'ns3', title: 'The cost of one more month', speaker: 'ABIE', blocks: [
          { type: 'stage', text: "Pattern interrupt. Stop presenting. Speak directly, like you're talking to one person. No slide notes in your voice." },
          { type: 'scripted', speaker: 'ABIE', text: "I want to ask you something honestly. And I want you to actually answer it in your head." },
          { type: 'scripted', speaker: 'ABIE', text: "How long have you been saying you'll figure out AI? A month? Six months? Since ChatGPT dropped?" },
          { type: 'stage', text: "Pause. Hold it. Don't fill the silence." },
          { type: 'scripted', speaker: 'ABIE', text: "Here's what I know about the people who are already ahead. They didn't wait until they felt ready. They didn't wait for the perfect moment or the right course or the time to open up. They just stopped deferring." },
          { type: 'scripted', speaker: 'ABIE', text: "Tonight you showed up. You did the hardest part already ~ you got in the room. The only question now is whether tonight becomes a memory or a turning point." },
          { type: 'stage', text: "Pause. Let commitment/consistency do its work." },
        ],
      },
      {
        id: 'ns4', title: 'The Bootcamp offer', speaker: 'ABIE', blocks: [
          { type: 'stage', text: "Anchor high before you name the price. Let the €644 value land first. Then pause. Then give the number. Don't apologise for it." },
          { type: 'scripted', speaker: 'ABIE', text: "So here's what's open right now. And I do mean right now ~ this specific window closes at midnight tonight." },
          { type: 'scripted', speaker: 'ABIE', text: "The AI Business Bootcamp. One month. 9 live sessions, Tuesdays and Thursdays. Small groups ~ we capped it because we actually want to mentor you, not broadcast at you." },
          { type: 'scripted', speaker: 'ABIE', text: "Four weeks, four real deliverables. Week 1 ~ your AI foundations and first Claude Project live. Week 2 ~ your AI content engine built and running. Week 3 ~ AI employees in your workflows, proposals drafting themselves. Week 4 ~ your personal dashboard, live. An AI routine that runs whether you show up or not." },
          { type: 'scripted', speaker: 'ABIE', text: "A consultant charges €150 an hour to teach you this. Nine sessions at that rate is €1,350. We're at €9.15 a session. The full programme is €247." },
          { type: 'stage', text: "Pause here. Don't speak. Let the contrast sit for 3 full seconds." },
          { type: 'scripted', speaker: 'ABIE', text: "I want to be transparent about the price. This is Cohort 1. We are building this programme with you, not just for you. That matters. We're pricing it like it does. Cohort 2 opens at €397. Not a pressure tactic ~ just the honest math." },
          { type: 'scripted', speaker: 'ABIE', text: "Because you're in the room tonight ~ you also get the VIP bundle free. That's the €397 upgrade: custom prompt buildout for your business, 90 days in the premium community, and direct DM access to us for the entire month." },
          { type: 'scripted', speaker: 'ABIE', text: "€247. €644 of value. VIP included. Midnight tonight ~ then the founding price is gone and the VIP bundle goes back to full price." },
          { type: 'stage', text: "QR and link are on screen. Let them look. 5 full seconds of silence. You don't have to speak." },
        ],
      },
      {
        id: 'ns4b', title: 'Skool ~ the monthly home', speaker: 'MERI', blocks: [
          { type: 'stage', text: "Meri takes this beat. Softer energy. The Skool offer catches everyone who isn't ready for the intensive ~ don't let them leave with nothing." },
          { type: 'scripted', speaker: 'MERI', text: "And if the bootcamp is a bigger step than you want to take tonight ~ there's a place for you too." },
          { type: 'scripted', speaker: 'MERI', text: "The Talent Mucho premium community. €49 a month. Monthly live workshops, the full replay vault, vibe coding sessions where we build real things together, and 30% off every single bootcamp we ever run ~ including this one if you join later." },
          { type: 'scripted', speaker: 'MERI', text: "This is going to €97. That's the roadmap price and we're not hiding it. Tonight ~ because you stayed, because you clearly didn't come here to watch from the back row ~ it's €49. Locked as long as you stay. Leave and come back later, it's €97. That's the deal." },
          { type: 'scripted', speaker: 'ABIE', text: "And if you join and it's not what you expected ~ message me. I'll refund you. No form, no wait, no awkward back-and-forth. That's the promise. I mean it." },
          { type: 'stage', text: "QR code for Skool on screen. Give them a moment to scan." },
        ],
      },
      {
        id: 'ns6', title: 'Three doors', speaker: 'BOTH', blocks: [
          { type: 'stage', text: "Crystal clear. No fluff. One breath, then name each door slowly. The clarity is the close." },
          { type: 'scripted', speaker: 'BOTH', text: "Three doors out tonight. You're walking through one of them in the next five minutes." },
          { type: 'bullets', speaker: 'BOTH', items: [
            "Door 1 ~ Free. Take what you learned tonight. Open Claude, run one prompt, join the free Skool tier. No commitment. Totally valid ~ tonight already moved you forward.",
            "Door 2 ~ €49/mo. The premium community. If you want accountability, live workshops every month, the replay vault, vibe coding, and 30% off every bootcamp we run ~ this is your home. It's going to €97. Tonight it locks at €49. Scan the QR on your screen.",
            "Door 3 ~ €247 tonight only. The AI Business Bootcamp, Cohort 1. 9 live sessions. Four weeks, four deliverables. VIP bundle included free. If this is the year you stop waiting ~ this is the door. Cohort 1 closes at midnight.",
          ]},
          { type: 'stage', text: "Hold the pause. Both of you look at camera. 3 seconds of silence. That silence does more work than any line you could add." },
        ],
      },
      {
        id: 'ns4c', title: 'Identity mirror', speaker: 'ABIE', blocks: [
          { type: 'stage', text: "This is the emotional close. After the doors are laid out ~ before the final send-off. Don't rush it. One breath, then speak." },
          { type: 'scripted', speaker: 'ABIE', text: "We already have 236 people in this community. Creators, founders, VAs, freelancers ~ people who were sitting exactly where you are right now." },
          { type: 'scripted', speaker: 'ABIE', text: "They're not more talented than you. They didn't have more hours in the day. They just made a decision that the version of them who still hadn't figured this out wasn't who they wanted to be anymore." },
          { type: 'scripted', speaker: 'ABIE', text: "There are two kinds of people watching this close right now. The ones who'll feel fired up for 48 hours and then nothing changes. And the ones who actually do something different tonight." },
          { type: 'stage', text: "Hold eye contact with camera. Pause 3 seconds." },
          { type: 'scripted', speaker: 'ABIE', text: "I think you already know which one you are." },
          { type: 'stage', text: "Don't fill the silence. Let that sit before moving to the send-off." },
        ],
      },
      {
        id: 'ns7', title: 'The send-off', speaker: 'BOTH', blocks: [
          { type: 'scripted', speaker: 'BOTH', text: "Last thing. Then we let you go." },
          { type: 'scripted', speaker: 'BOTH', text: "Whatever you do next ~ do something. Don't close this tab and scroll. Pick one thing from tonight and run it before you go to sleep." },
          { type: 'bullets', speaker: 'BOTH', items: [
            "Open Claude tonight ~ try one prompt from the demos",
            "Bootcamp link is in the chat ~ €247, cohort 1, midnight deadline",
            "Skool is open ~ €49/mo, join at talentmucho.com/community",
          ]},
          { type: 'scripted', speaker: 'BOTH', text: "Thank you for two hours of your Thursday night. We don't take that lightly. Go build something." },
          { type: 'stage', text: "Wave off slowly. Stay on camera 30 more seconds for hot leads in chat. Meri pins bootcamp link one final time." },
        ],
      },
    ],
  },
];

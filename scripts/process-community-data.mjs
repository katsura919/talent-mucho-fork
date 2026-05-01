import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const GHL_PATH = join(process.env.HOME, 'Downloads/Export_Contacts_undefined_May_2026_6_18_PM.csv');
const SKOOL_PATH = join(process.env.HOME, 'Downloads/community_members.csv');
const OUT_PATH = join(process.cwd(), 'data/community-combined.json');

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSV(content) {
  const lines = content.split('\n').filter(l => l.trim());
  const headers = parseCSVLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const obj = {};
    headers.forEach((h, i) => { obj[h] = values[i] || ''; });
    return obj;
  });
}

function normalizeEmail(email) {
  if (!email) return '';
  return email.toLowerCase().trim().replace(/\s+/g, '');
}

function parseGHLTags(tagStr) {
  if (!tagStr) return { source: '', aiLevel: '' };
  const tags = tagStr.split(',').map(t => t.trim());
  let source = '';
  let aiLevel = '';
  for (const tag of tags) {
    if (tag.startsWith('source:')) source = tag.replace('source:', '');
    if (tag.startsWith('ai-level:')) aiLevel = tag.replace('ai-level:', '');
  }
  return { source, aiLevel };
}

function normalizeAILevel(skoolLevel, ghlLevel) {
  if (skoolLevel) {
    const s = skoolLevel.toLowerCase();
    if (s === 'beginner') return 'Beginner';
    if (s === 'intermediate') return 'Intermediate';
    if (s === 'expert') return 'Expert';
  }
  if (ghlLevel) {
    const g = ghlLevel.toLowerCase();
    if (g.includes('never')) return 'Never Used AI';
    if (g.includes('couple')) return 'Tried It';
    if (g.includes('occasionally')) return 'Occasional';
    if (g.includes('regularly')) return 'Regular';
    if (g.includes('advanced')) return 'Advanced';
  }
  return 'Unknown';
}

function categorizePainPoint(answer) {
  if (!answer) return 'No Answer';
  const a = answer.toLowerCase().trim();

  if (!a || a === '.' || a === '..' || a === 'na' || a === 'n/a' || a === 'ok' || a === 'misc'
    || a === 'nothing' || a === 'nothing as such' || a === 'not sure' || a === 'time'
    || a === 'everything' || a === 'bread' || a === 'everyday' || a === 'phone') {
    return 'Unspecified';
  }

  if (a.includes('content') || a.includes('social media') || a.includes('posting')
    || a.includes('writing') || a.includes('editing') || a.includes('ugc')
    || a.includes('caption') || a.includes('script') || a.includes('video')
    || a.includes('canva') || a.includes('design') || a.includes('images')
    || a.includes('graphic') || a.includes('brand outreach') || a.includes('creating image')) {
    return 'Content & Creative';
  }
  if (a.includes('email') || a.includes('dm') || a.includes('inbox')
    || a.includes('message') || a.includes('respond') || a.includes('reply')
    || a.includes('correspondence') || a.includes('whatsapp') || a.includes('customer handling')) {
    return 'Communication & Email';
  }
  if (a.includes('lead') || a.includes('outreach') || a.includes('cold')
    || a.includes('niche') || a.includes('scrap') || a.includes('client acquisition')
    || a.includes('sales') || a.includes('crm')) {
    return 'Lead Gen & Sales';
  }
  if (a.includes('organiz') || a.includes('operation') || a.includes('admin')
    || a.includes('bookkeep') || a.includes('paper') || a.includes('back office')
    || a.includes('track') || a.includes('record') || a.includes('order process')
    || a.includes('report') || a.includes('system') || a.includes('notion')
    || a.includes('task') || a.includes('prioriti') || a.includes('certif')
    || a.includes('mom') || a.includes('meeting')) {
    return 'Operations & Admin';
  }
  if (a.includes('cod') || a.includes('debug') || a.includes('build')
    || a.includes('integrat') || a.includes('mvp') || a.includes('automat')
    || a.includes('prompt') || a.includes('database') || a.includes('stored proc')
    || a.includes('bug')) {
    return 'Tech & Building';
  }
  if (a.includes('financ') || a.includes('budget') || a.includes('spreadsheet')
    || a.includes('trade') || a.includes('account')) {
    return 'Finance & Data';
  }
  if (a.includes('research') || a.includes('analysis') || a.includes('analys')
    || a.includes('finding') || a.includes('ideas') || a.includes('supply')
    || a.includes('investigation') || a.includes('ideation')) {
    return 'Research & Analysis';
  }
  if (a.includes('haven\'t started') || a.includes('don\'t have a business')
    || a.includes('no business') || a.includes('job search') || a.includes('aspiring')
    || a.includes('learning') || a.includes('don\'t do business')
    || a.includes('just starting') || a.includes('overwhelm')
    || a.includes('haven\'t had') || a.includes('starting')) {
    return 'Pre-Business';
  }
  if (a.includes('plan') || a.includes('time management') || a.includes('schedul')
    || a.includes('marketing') || a.includes('networking')) {
    return 'Planning & Strategy';
  }
  return 'Other';
}

// Parse both files
const ghlRaw = readFileSync(GHL_PATH, 'utf-8');
const skoolRaw = readFileSync(SKOOL_PATH, 'utf-8');

const ghlContacts = parseCSV(ghlRaw);
const skoolMembers = parseCSV(skoolRaw);

// Build email index for Skool
const skoolByEmail = new Map();
for (const m of skoolMembers) {
  const primary = normalizeEmail(m.Answer2 || m.Email);
  const skoolEmail = normalizeEmail(m.Email);
  if (primary && primary.includes('@')) skoolByEmail.set(primary, m);
  if (skoolEmail && skoolEmail.includes('@')) skoolByEmail.set(skoolEmail, m);
}

// Build email index for GHL
const ghlByEmail = new Map();
for (const c of ghlContacts) {
  const email = normalizeEmail(c.Email);
  if (email) ghlByEmail.set(email, c);
}

// Combine
const combined = new Map();

// Process GHL contacts
for (const c of ghlContacts) {
  const email = normalizeEmail(c.Email);
  if (!email) continue;
  const { source, aiLevel: ghlAI } = parseGHLTags(c.Tags);
  const skoolMatch = skoolByEmail.get(email);

  let platform = 'GHL Only';
  let skoolAI = '';
  let painPoint = '';
  let painCategory = 'No Answer';
  let joinedSkool = '';
  let invitedBy = '';

  if (skoolMatch) {
    platform = 'Both';
    skoolAI = skoolMatch.Answer1 || '';
    painPoint = skoolMatch.Answer3 || '';
    painCategory = categorizePainPoint(painPoint);
    joinedSkool = skoolMatch.JoinedDate || '';
    invitedBy = skoolMatch['Invited By'] || '';
  }

  combined.set(email, {
    firstName: c['First Name'] || '',
    lastName: c['Last Name'] || '',
    email,
    platform,
    source,
    aiLevelGHL: ghlAI,
    aiLevelSkool: skoolAI,
    aiLevel: normalizeAILevel(skoolAI, ghlAI),
    painPoint,
    painCategory,
    joinedGHL: c.Created || '',
    joinedSkool,
    invitedBy,
    lastActivity: c['Last Activity'] || '',
  });
}

// Process Skool members not in GHL
for (const m of skoolMembers) {
  const primaryEmail = normalizeEmail(m.Answer2 || '');
  const skoolEmail = normalizeEmail(m.Email || '');
  const email = (primaryEmail && primaryEmail.includes('@')) ? primaryEmail : skoolEmail;

  if (!email || !email.includes('@')) continue;
  if (combined.has(email)) continue;

  // Check if matched via skool email too
  const altEmail = skoolEmail !== email ? skoolEmail : '';
  if (altEmail && combined.has(altEmail)) continue;

  combined.set(email, {
    firstName: m.FirstName || '',
    lastName: m.LastName || '',
    email,
    platform: 'Skool Only',
    source: '',
    aiLevelGHL: '',
    aiLevelSkool: m.Answer1 || '',
    aiLevel: normalizeAILevel(m.Answer1, ''),
    painPoint: m.Answer3 || '',
    painCategory: categorizePainPoint(m.Answer3 || ''),
    joinedGHL: '',
    joinedSkool: m.JoinedDate || '',
    invitedBy: m['Invited By'] || '',
    lastActivity: '',
  });
}

const members = [...combined.values()]
  .filter(m => !(m.firstName === 'Abie' && m.lastName === 'Maxey'))
  .sort((a, b) => {
    const da = a.joinedGHL || a.joinedSkool || '';
    const db = b.joinedGHL || b.joinedSkool || '';
    return db.localeCompare(da);
  });

// Stats
const stats = {
  total: members.length,
  ghlOnly: members.filter(m => m.platform === 'GHL Only').length,
  skoolOnly: members.filter(m => m.platform === 'Skool Only').length,
  both: members.filter(m => m.platform === 'Both').length,
  byAILevel: {},
  bySource: {},
  byPainCategory: {},
  byDay: {},
};

for (const m of members) {
  stats.byAILevel[m.aiLevel] = (stats.byAILevel[m.aiLevel] || 0) + 1;

  if (m.source) {
    stats.bySource[m.source] = (stats.bySource[m.source] || 0) + 1;
  }

  stats.byPainCategory[m.painCategory] = (stats.byPainCategory[m.painCategory] || 0) + 1;

  const dateStr = (m.joinedGHL || m.joinedSkool || '').slice(0, 10);
  if (dateStr) {
    stats.byDay[dateStr] = (stats.byDay[dateStr] || 0) + 1;
  }
}

const output = { stats, members };

writeFileSync(OUT_PATH, JSON.stringify(output, null, 2));
console.log(`Combined ${members.length} members`);
console.log(`GHL Only: ${stats.ghlOnly}`);
console.log(`Skool Only: ${stats.skoolOnly}`);
console.log(`Both: ${stats.both}`);
console.log(`\nAI Levels:`, stats.byAILevel);
console.log(`\nSources:`, stats.bySource);
console.log(`\nPain Categories:`, stats.byPainCategory);
console.log(`\nDaily signups:`, stats.byDay);

const Resource = require('../models/Resource');


function computeMatchScore(user, job, userSkills = null) {
  const skills = userSkills || (user.skills || []).map((s) => s.name.toLowerCase());
  const jobSkills = (job.requiredSkills || []).map((s) => s.toLowerCase());

  let skillPoints = 0;
  const maxSkillPoints = 50;
  const perSkillPoint = jobSkills.length > 0 ? maxSkillPoints / jobSkills.length : 0;

  const matches = [];
  const missing = [];

  for (const js of jobSkills) {
    const found = skills.some((us) => us.includes(js) || js.includes(us));
    if (found) {
      matches.push(js);
      skillPoints += perSkillPoint;
    } else {
      missing.push(js);
    }
  }

  let expPoints = 0;
  const expOrder = { Fresher: 0, Junior: 1, Mid: 2 };
  const userExp = expOrder[user.experienceLevel] ?? 0;
  const jobExp = expOrder[job.experienceLevel] ?? 0;
  if (userExp <= jobExp) {
    expPoints = 25;
  } else if (userExp === jobExp + 1) {
    expPoints = 15;
  } else {
    expPoints = 5;
  }

  let trackPoints = 0;
  const userTrack = (user.preferredTrack || '').toLowerCase();
  const jobTitle = (job.title || '').toLowerCase();
  const trackKeywords = ['web', 'frontend', 'backend', 'fullstack', 'data', 'design', 'mobile'];
  const userTrackMatch = trackKeywords.some((k) => userTrack.includes(k));
  const jobTrackMatch = trackKeywords.some((k) => jobTitle.includes(k));
  const tracksOverlap = trackKeywords.some((k) => userTrack.includes(k) && jobTitle.includes(k));
  if (userTrackMatch && jobTrackMatch && tracksOverlap) {
    trackPoints = 25;
  } else if (userTrackMatch || jobTrackMatch) {
    trackPoints = 12;
  }

  const score = Math.round(Math.min(100, skillPoints + expPoints + trackPoints));
  let explanation = [];
  if (matches.length) explanation.push(`Matches: ${matches.join(', ')}`);
  if (missing.length) explanation.push(`Missing: ${missing.join(', ')}`);
  explanation.push(`Experience: ${user.experienceLevel} vs ${job.experienceLevel} (${expPoints}/25)`);
  explanation.push(`Track: ${user.preferredTrack} vs ${job.title} (${trackPoints}/25)`);

  return {
    score,
    matches,
    missing,
    explanation: explanation.join('; '),
  };
}

function getSkillGaps(missingSkills) {
  return missingSkills || [];
}

async function recommendResourcesForGaps(gaps) {
  if (!gaps || gaps.length === 0) return [];
  const orConditions = gaps.map((s) => ({ skills: new RegExp(s, 'i') }));
  return Resource.find({ $or: orConditions }).limit(8).lean();
}

module.exports = {
  computeMatchScore,
  getSkillGaps,
  recommendResourcesForGaps,
};

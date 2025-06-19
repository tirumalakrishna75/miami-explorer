// scripts/scrapeMustVisit.js
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function scrape() {
  // 1. Fetch top posts from r/MiamiTravel this month
  const { data } = await axios.get('https://www.reddit.com/r/MiamiTravel/top/?t=month');
  const $ = cheerio.load(data);

  // 2. Grab first 9 posts (title + preview image)
  const items = [];
  $('div.Post').slice(0, 9).each((i, el) => {
    const title = $(el).find('h3').text().trim();
    const img = $(el).find('img').first().attr('src') || '';
    if (title) items.push({ title, img });
  });

  // 3. Split into three groups
  const result = {
    toDo:     items.slice(0, 3),
    familiar: items.slice(3, 6),
    trivia:   items.slice(6, 9),
  };

  // 4. Dump JSON into public/
  fs.writeFileSync('public/mustVisit.json', JSON.stringify(result, null, 2));
  console.log('✅ public/mustVisit.json created');
}

scrape().catch(err => {
  console.error('❌ Scrape failed', err);
  process.exit(1);
});

const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.getonbrd.cl/jobs/programacion';

async function scrapeJobs() {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const featuredJobs = $('.gb-featured-job');

    featuredJobs.each((i, el) => {
      const company = $(el).find('strong').text().trim();
      const title = $(el).find('h4').text().trim();

      console.log(`Título: ${title}`);
      console.log(`Empresa: ${company}`);
      console.log('-----------------------');
    });
  } catch (error) {
    console.log('ERROR AL INTENTAR TRAER DATOS', error);
  }
}

scrapeJobs();

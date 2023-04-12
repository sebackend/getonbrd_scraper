const axios = require('axios');
const cheerio = require('cheerio');

const URLS = [
  'https://www.getonbrd.cl/jobs/programacion',
  'https://www.getonbrd.cl/jobs/desarrollo-mobile',
];

async function scrapeJobs(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const featuredJobs = $('.gb-featured-job');
    const jobs = $('.sgb-results-list > div');
    const totalJobs = featuredJobs.length + jobs.length;

    featuredJobs.each((i, el) => {
      const company = $(el).find('strong').text().trim();
      const title = $(el).find('h4').text().trim();

      console.log(`Título: ${title}`);
      console.log(`Empresa: ${company}`);
      console.log('-----------------------');
    });

    jobs.each((i, el) => {
      const title = $(el).find('strong').text().trim();
      const company = $(el)
        .find('.gb-results-list__info .size0')
        .first()
        .contents()
        .get(0)
        .nodeValue.trim();

      console.log(`Título: ${title}`);
      console.log(`Empresa: ${company}`);
      console.log('***************************');
    });

    console.log('////////////////');
    console.log(`Se encontraron un total de ${totalJobs} anuncios`);
  } catch (error) {
    console.log('ERROR AL INTENTAR TRAER DATOS', error);
  }
}

async function startScraper() {
  await URLS.forEach((url) => scrapeJobs(url));
}

startScraper();

import { load } from 'cheerio';
import Pocketbase, { type Record } from 'pocketbase';
import type { CSRFREcord } from './pb.js';

const fetchGuildPage = async (csrfToken: string) => {
  const headers = new Headers();

  headers.append(
    'User-Agent',
    'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/113.0'
  );
  headers.append('Accept', 'application/json, text/javascript, */*; q=0.01');
  headers.append('Accept-Language', 'en-US,en;q=0.5');
  headers.append('Accept-Encoding', 'gzip, deflate, br');
  headers.append(
    'Content-Type',
    'application/x-www-form-urlencoded; charset=UTF-8'
  );
  headers.append('X-Requested-With', 'XMLHttpRequest');
  headers.append('Origin', 'https://felsong.gg');
  headers.append('Alt-Used', 'felsong.gg');
  headers.append('Connection', 'keep-alive');
  headers.append('Referer', 'https://felsong.gg/en/community/guild/6/11/5');
  headers.append(
    'Cookie',
    `csrf_cookie_name=${csrfToken}; user_lang=en; felsong_session=gv8f08997saujb44eoj9i9hb15romu4d;`
  );
  headers.append('Sec-Fetch-Dest', 'empty');
  headers.append('Sec-Fetch-Mode', 'cors');
  headers.append('Sec-Fetch-Site', 'same-origin');
  headers.append('TE', 'trailers');

  const body = `draw=1&columns%5B0%5D%5Bdata%5D=0&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=1&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=2&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=3&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=4&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=5&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=false&columns%5B5%5D%5Borderable%5D=false&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=0&length=500&search%5Bvalue%5D=&search%5Bregex%5D=false&csrf_test_name=${csrfToken}&search_name=&search_level_min=1&search_level_max=120&search_race=-1&search_class=-1&guild_id=5&expansion=6&realm=11`;

  const options = {
    method: 'POST',
    headers,
    body
  };

  const res = await fetch(
    'https://felsong.gg/en/community/guild_members_datatable',
    options
  );

  return res;
};

const fetchCharacterPage = async (character: Character, csrfToken: string) => {
  const headers = new Headers();
  headers.append(
    'User-Agent',
    'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/113.0'
  );
  headers.append(
    'Accept',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
  );
  headers.append('Accept-Language', 'en-US,en;q=0.5');
  headers.append('Accept-Encoding', 'gzip, deflate, br');
  headers.append('Connection', 'keep-alive');
  headers.append(
    'Cookie',
    `csrf_cookie_name=${csrfToken}; user_lang=en; felsong_session=tdgidv81p230nk7v43aug03ictae184d; _ga=GA1.2.408315437.1683914237; _fbp=fb.1.1683914237766.574122422; firestorm_sso=%7B%22token%22%3A%22dd54e665511abff68f604b1bce5cf31c98b6a69f%22%2C%22mail%22%3A%22vilianbb%22%7D; presentation-cookie=1; _gid=GA1.2.1086212986.1684788672; registered=1; points_value_check=0; points_value_pixel=0; _gat=1; csrf_cookie_name=6a97e6fee6f3ac1618d8b1c1414a1bf4; felsong_session=606abtka0p8bh2kchivid2vb0t95hbs5; firestorm_sso=%7B%22token%22%3A%22dd54e665511abff68f604b1bce5cf31c98b6a69f%22%2C%22mail%22%3A%22vilianbb%22%7D; user_lang=en`
  );
  headers.append('Upgrade-Insecure-Requests', '1');
  headers.append('Sec-Fetch-Dest', 'document');
  headers.append('Sec-Fetch-Mode', 'navigate');
  headers.append('Sec-Fetch-Site', 'cross-site');
  headers.append('Pragma', 'no-cache');
  headers.append('Cache-Control', 'no-cache');

  const options = {
    method: 'GET',
    headers: headers
  };

  console.log(`https://felsong.gg/en/community/armory/${character.id}`);
  const res = await fetch(
    `https://felsong.gg/en/community/armory/${character.id}`,
    options
  );

  return await res.text();
};

(async () => {
  const pb = new Pocketbase('https://indecisive-data.app.jet-black.xyz');

  const csrf = await pb
    .collection('freakz_csrf_token')
    .getFirstListItem<CSRFREcord>('');

  const guildRes = await fetchGuildPage(csrf.token);
  const characterData = await guildRes.json();
  const character = characterData.aaData.map(
    (char: string[]) => new Character(char)
  ) as Character[];

  for await (const char of character) {
    let pbCharRecord: Record;
    try {
      pbCharRecord = await pb
        .collection('armory_character')
        .create({ name: char.name });
    } catch (error) {
      pbCharRecord = await pb
        .collection('armory_character')
        .getFirstListItem(`name='${char.name}'`);
    }

    const html = await fetchCharacterPage(char, csrf.token);
    const $ = load(html);
    const ilvl = $('div.character-ilevel.inner span.ilevel').text();
    await pb.collection('armory_character_snapshot').create({
      ilvl: parseInt(ilvl),
      character: pbCharRecord.id
    });
  }
})();

class Character {
  name: string;
  level: number;
  guildRank: string;
  id: string;

  constructor(arr: string[]) {
    this.name = arr[0];
    this.level = parseInt(arr[1]);
    this.guildRank = arr[4];
    this.id = arr[5];
  }
}

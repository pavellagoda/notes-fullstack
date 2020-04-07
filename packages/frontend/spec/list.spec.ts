import puppeteer, { Browser, Page } from 'puppeteer';
let page: Page;
let browser: Browser;
const width = 1920;
const height = 1080;

const makeRandomString = (length: number): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
const fillNoteForm = async (page: Page, content: string): Promise<void> => {
  const btn = await page.$('[type=submit]');
  const textArea = await page.$('textarea');
  expect(textArea).not.toBeNull();
  expect(btn).not.toBeNull();
  if (textArea && btn) {
    await page.evaluate(function() {
      const ta = document.querySelector('textarea');
      if (ta) {
        ta.value = '';
      }
    });
    await page.type('textarea', content, { delay: 1 });
    await btn.click();
  }
};

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`],
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});
afterAll(() => {
  browser.close();
});

describe('List Notes', () => {
  test('notes load correctly', async () => {
    await page.goto('http://localhost:3000/');
    const btn = await page.$('.add-note-btn');

    expect(btn).not.toBeNull();
  }, 16000);
});

describe('Add Note', () => {
  test('add note works correctly', async () => {
    await page.goto('http://localhost:3000/notes/add');
    const createRs = makeRandomString(30);
    await fillNoteForm(page, createRs);
    await page.waitForFunction(`document.querySelector("body").innerText.includes("${createRs}")`);
  }, 16000);
});

describe('Edit Note', () => {
  test('edit note works correctly', async () => {
    await page.goto('http://localhost:3000/notes/add');
    const createRs = makeRandomString(30);
    const editRs = makeRandomString(30);
    await fillNoteForm(page, createRs);
    await page.waitForFunction(`document.querySelector("body").innerText.includes("${createRs}")`);

    const href = await page.evaluate(() => {
      const link = document.querySelector('.note-list-item:last-child a.edit-note-btn');
      if (link) {
        return link.getAttribute('href');
      }
      return null;
    });
    expect(href).not.toBe(null);
    if (href) {
      await page.goto(`http://localhost:3000${href}`);
      await page.waitForSelector('textarea');
      await fillNoteForm(page, editRs);
      await page.waitForFunction(`document.querySelector("body").innerText.includes("${editRs}")`);

      const createdNote = await page.$x("//p[contains(text(), '" + createRs + "')]");

      expect(createdNote.length).toBe(0);
    }
  }, 30000);
});

describe('Delete Note', () => {
  test('delete note works correctly', async () => {
    await page.goto('http://localhost:3000/notes/add');
    const createRs = makeRandomString(30);
    await fillNoteForm(page, createRs);
    await page.waitForFunction(`document.querySelector("body").innerText.includes("${createRs}")`);

    const button = await page.evaluate(() => {
      return document.querySelector('.note-list-item:last-child .delete-note-btn');
    });
    expect(button).not.toBe(null);
    if (button) {
      button.click();
      await page.waitForNavigation({ waitUntil: 'networkidle0' });

      const createdNote = await page.$x("//p[contains(text(), '" + createRs + "')]");

      expect(createdNote.length).toBe(0);
    }
  }, 10000);
});

const puppeteer = require('puppeteer');

/**
 * メインロジック
 */
(async () => {
  // Puppeteerの起動
  const browser = await puppeteer.launch({
    headless: false,  // Headlessモードで起動するかどうか
    slowMo: 50, // 指定のミリ秒スローモーションで実行する
  });

  // 新しい空のページを開く
  const page = await browser.newPage();

  // view portの設定
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  // 秀和システムのページへ遷移
  await page.goto('https://www.shuwasystem.co.jp/');

  // Googleカスタム検索窓の表示を待つ
  await page.waitForSelector('input.gsc-input');

  // Googleカスタム検索窓にPuppeteerとキーボード入力を行う
  await page.type('input.gsc-input', 'Puppeteer');

  // buttonタグを指定してクリックする
  await page.click('button');
  
  const imgTags = await page.$$('img');

  for (const imgTag of imgTags) {
    const src = await imgTag.getProperty('src');
    console.log(await src.jsonValue());
  }
  
  // ブラウザの終了
  // await browser.close();
})();

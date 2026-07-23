import { chromium } from "@playwright/test";

const BASE = "http://localhost:3000";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  // 1. Home page
  console.log("Capturing home page...");
  const homePage = await context.newPage();
  await homePage.goto(BASE, { waitUntil: "networkidle" });
  await homePage.waitForTimeout(1000);
  await homePage.screenshot({
    path: "docs/images/home.png",
    fullPage: true,
  });
  console.log("home.png saved");
  await homePage.close();

  // 2. Diagnosis form (product page)
  console.log("Capturing diagnosis form...");
  const formPage = await context.newPage();
  await formPage.goto(`${BASE}/diagnosis/product`, { waitUntil: "networkidle" });
  await formPage.waitForTimeout(1000);
  // Fill in some sample data for the screenshot
  await formPage.fill('input[placeholder*="富士"]', "二手富士相机 X-T30 II");
  // Select category
  const selects = await formPage.locator("select").all();
  if (selects.length >= 3) {
    await selects[0].selectOption("数码电子");
    await selects[1].selectOption("闲鱼");
    await selects[2].selectOption("used");
  }
  await formPage.fill('input[placeholder*="摄影"]', "摄影爱好者、学生");
  await formPage.fill('input[placeholder*="最近"]', "最近14天");
  await formPage.waitForTimeout(500);
  await formPage.screenshot({
    path: "docs/images/diagnosis-form.png",
    fullPage: true,
  });
  console.log("diagnosis-form.png saved");
  await formPage.close();

  // 3. Report page
  console.log("Capturing report page...");
  const reportPage = await context.newPage();
  await reportPage.goto(`${BASE}/diagnosis/report/demo`, { waitUntil: "networkidle" });
  await reportPage.waitForTimeout(1000);
  await reportPage.screenshot({
    path: "docs/images/report.png",
    fullPage: true,
  });
  console.log("report.png saved");
  await reportPage.close();

  await browser.close();
  console.log("All screenshots captured.");
}

main().catch((err) => {
  console.error("Screenshot error:", err);
  process.exit(1);
});

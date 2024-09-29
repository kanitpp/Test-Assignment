import { test, expect } from '@playwright/test';
import { Website } from '../components/page.component';
 
test('USER_001: Register New User without Name', async ({ page }) => {
    await page.goto('http://www.bnn.in.th/register');
    await page.locator('[type=submit]').click();
    // await page.getByPlaceholder('ชื่อ').fill('Test');
    await expect(page.locator('.helper').first()).toContainText('กรุณากรอกข้อมูล');
});

test('USER_002: Register New User without Last Name', async ({ page }) => {
    await page.goto('http://www.bnn.in.th/register');
    await page.locator('[type=submit]').click();
    // await page.getByPlaceholder('นามสกุล').fill('Test');
    await expect(page.locator('div:nth-child(2) > .text-field-error > .helper').first()).toContainText('กรุณากรอกข้อมูล');
});

test('USER_003: Register New User without Phone number', async ({ page }) => {
    await page.goto('http://www.bnn.in.th/register');
    await page.locator('[type=submit]').click();
    // await page.getByPlaceholder('เบอร์โทรศัพท์').fill('123');
    await expect(page.locator('div:nth-child(3) > .text-field-error > .helper')).toContainText('กรุณากรอกข้อมูล');
});

test('USER_004: Register New User with less than 10 digits for Phone number', async ({ page }) => {
    await page.goto('http://www.bnn.in.th/register');
    await page.getByPlaceholder('เบอร์โทรศัพท์').fill('123');
    await page.locator('[type=submit]').click();
    await expect(page.locator('div:nth-child(3) > .text-field-error > .helper')).toContainText('ต้องเป็นตัวเลข 10 หลัก');
});

test('USER_005: Register New User with incorrect Phone number', async ({ page }) => {
    await page.goto('http://www.bnn.in.th/register');
    await page.locator('[type=submit]').click();
    await page.getByPlaceholder('เบอร์โทรศัพท์').fill('1234567890');
    await expect(page.locator('div:nth-child(3) > .text-field-error > .helper')).toContainText('หมายเลขโทรศัพท์ควรเริ่มต้นด้วยศูนย์ (0xxxxxxxx)');
});

test('USER_006: Register New User without Email', async ({ page }) => {
    await page.goto('http://www.bnn.in.th/register');
    await page.locator('[type=submit]').click();
    // await page.getByPlaceholder('อีเมล').fill('Test');
    await expect(page.locator('div:nth-child(5) > .text-field-error > .helper')).toContainText('กรุณากรอกข้อมูล');
});

test('USER_007: Register New User with incorrect Email format', async ({ page }) => {
    await page.goto('http://www.bnn.in.th/register');
    await page.getByPlaceholder('อีเมล').fill('Test');
    await page.locator('[type=submit]').click();
    await expect(page.locator('div:nth-child(5) > .text-field-error > .helper')).toContainText('อีเมลไม่ถูกต้อง');
});

test('USER_008: Register New User without OTP', async ({ page }) => {
    await page.goto('http://www.bnn.in.th/register');
    await page.locator('[type=submit]').click();
    // await page.getByPlaceholder('รหัสยืนยันตัวตน').fill('Test');
    await expect(page.locator('form div').filter({ hasText: 'ส่งรหัสยืนยันตัวตน กรุณากรอกข้อมูล' }).locator('small')).toContainText('กรุณากรอกข้อมูล');
});

test('USER_009: Register New User with less than 6 digits for OTP', async ({ page }) => {
    await page.goto('http://www.bnn.in.th/register');
    await page.getByPlaceholder('รหัสยืนยันตัวตน').fill('123');
    await page.locator('[type=submit]').click();
    await expect(page.getByText('อย่างน้อย 6 หลัก')).toContainText('อย่างน้อย 6 หลัก');
});

test('USER_010: Register New User with incorrect OTP', async ({ page }) => {
    await page.goto('http://www.bnn.in.th/register');
    await page.getByPlaceholder('รหัสยืนยันตัวตน').fill('123456');
    await page.locator('[type=submit]').click();
    await expect(page.getByText('รหัสยืนยันตัวตนไม่ถูกต้อง')).toContainText('รหัสยืนยันตัวตนไม่ถูกต้อง');
});

test('USER_011: Register New User without Password', async ({ page }) => {
    await page.goto('http://www.bnn.in.th/register');
    await page.locator('[type=submit]').click();
    // await page.getByPlaceholder('รหัสผ่าน').fill('Test');
    await expect(page.locator('form div').filter({ hasText: 'รหัสต้องมี อักขระขั้นต่ำ 8' }).locator('small').nth(1)).toContainText('กรุณากรอกข้อมูล');
});

test('USER_012: Register New User with less than 8 digits for Password', async ({ page }) => {
    await page.goto('http://www.bnn.in.th/register');
    await page.getByPlaceholder('รหัสผ่าน').fill('123Aa');
    await page.locator('[type=submit]').click();
    await expect(page.locator('.hint-text')).toContainText('รหัสต้องมี อักขระขั้นต่ำ 8 ตัว');
});

test('USER_013: Register New User without lower character for Password', async ({ page }) => {
    await page.goto('http://www.bnn.in.th/register');
    await page.locator('[type=submit]').click();
    await page.getByPlaceholder('รหัสผ่าน').fill('12345678A');
    await expect(page.locator('.hint-text')).toContainText('ตัวอักษรพิมพ์เล็ก (a-z) อย่างน้อยหนึ่งตัวอักษร');
});

test('USER_014: Register New User without upper character for Password', async ({ page }) => {
    await page.goto('http://www.bnn.in.th/register');
    await page.locator('[type=submit]').click();
    await page.getByPlaceholder('รหัสผ่าน').fill('12345678a');
    await expect(page.locator('.hint-text')).toContainText('ตัวอักษรตัวพิมพ์ใหญ่ (A-Z) หนึ่งตัว');
});

test('USER_015: Register New User without number for Password', async ({ page }) => {
    await page.goto('http://www.bnn.in.th/register');
    await page.locator('[type=submit]').click();
    await page.getByPlaceholder('รหัสผ่าน').fill('abcdefGH');
    await expect(page.locator('.hint-text')).toContainText('และตัวเลขหนึ่งตัว (0-9)');
});

test('USER_016: Register New User without accept term and conditions', async ({ page }) => {
    await page.goto('http://www.bnn.in.th/register');
    await page.locator('[type=submit]').click();
    await expect(page.getByText('โปรดอ่านและยอมรับเงื่อนไขและข้อตกลง')).toContainText('โปรดอ่านและยอมรับเงื่อนไขและข้อตกลง');
});

test('USER_017: Register New User without accept term and conditions', async ({ page }) => {
    await page.goto('http://www.bnn.in.th/register');
    await page.locator('[type=submit]').click();
    await expect(page.getByText('กรุณากรอกเพื่อยืนยันตัวตนผ่าน CAPTCHA')).toContainText('กรุณากรอกเพื่อยืนยันตัวตนผ่าน CAPTCHA');
});
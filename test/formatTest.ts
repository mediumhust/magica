import test from 'ava'
import { execSync } from 'child_process'

test.serial('identify', async t => {
  let r = execSync('npx ts-node -T test/assets/formatConvertIdentifyScript.ts')
  // console.log(r.toString());
  // t.notThrows(() => r = execSync('npx ts-node -T test/assets/formatConvertIdentifyScript.ts'))
  t.true(r.toString().includes('total time:'))
})
// test('dummy', async t => {
//   t.true(true)
// })

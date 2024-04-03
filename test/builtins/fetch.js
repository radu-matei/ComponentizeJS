import { strictEqual, ok } from 'node:assert';

export const source = `
  let isReady = false;
  export function run () {
    (async () => {
      try {
        const res = await fetch('https://www.google.com');
        const html = await res.text();
        console.error('GOT TEXT');
        console.error(html);
        isReady = true;
      } catch (e) {
        console.error('wat');
        console.error('---');
        console.error(e);
        console.error('---');
      }
    })();
  }
  export function ready () {
    console.error('ready');
    return true;
  }
`;

export async function test(run) {
  const { stdout, stderr } = await run();
  console.error(stdout);
  console.error(stderr);
  strictEqual(stderr, '');
  ok(Number(stdout) > 0 && Number(stdout) < 1);
}

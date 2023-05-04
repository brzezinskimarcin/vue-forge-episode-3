export default defineEventHandler(async (event) => {
  const { url } = await readBody(event);
  const html = await $fetch<string>(url);
  const h1 = /<h1[^>]*>([^<]*)<\/h1>/i.exec(html);
  return h1 ? h1[1] : '';
});

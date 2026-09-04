export async function load(url, context, nextLoad) {
  if (/\.(jpg|jpeg|png|gif|svg|webp)$/i.test(url)) {
    return {
      format: "module",
      shortCircuit: true,
      source: 'export default "/mock-image.jpg";',
    };
  }
  return nextLoad(url, context);
}

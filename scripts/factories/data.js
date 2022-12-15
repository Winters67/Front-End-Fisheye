export { getData };

async function getData() {
  let result = await fetch("../data/photographers.json");
  return await result.json();
}

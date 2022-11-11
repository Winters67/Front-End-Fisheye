export{getData}


async function getData(userId) {
  let result = await fetch("../data/photographers.json");
  return await result.json();
}

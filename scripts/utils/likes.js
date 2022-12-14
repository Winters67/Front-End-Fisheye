function getLikes() {
  const hearts = document.querySelectorAll(" .btn-like ");
  const totalLike = document.querySelector(".likesContainer");
  let totalCount = Number(totalLike.textContent);

  hearts.forEach((heart) => {
    heart.addEventListener("click", function () {
      const like = heart.firstElementChild;
      let countLike = Number(like.textContent);

      if (heart.classList.contains("liked")) {
        heart.classList.remove("liked");
        countLike -= 1;
        totalCount -= 1;
        totalLike.textContent = totalCount;
        like.textContent = countLike;
      } else {
        heart.classList.add("liked");
        countLike += 1;
        totalCount += 1;
        totalLike.textContent = totalCount;
        like.textContent = countLike;
      }
    });
  });
}

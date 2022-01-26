$(".removed").hide();

// remove movie api call (fetch)
$(document).on("click", ".remove-favorite", async (e) => {
  console.log(e.target.dataset);
  const { title } = e.target.dataset;
  const removeFav = {
    title,
  };
  console.log(removeFav);
  const response = await fetch("/api/favorites/remove", {
    method: "DELETE",
    body: JSON.stringify(removeFav),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (response.status === 200) {
    $(".removed").show();
  }
  setTimeout(() => {
    $(".removed").hide();
    // $(".must-login").hide();
    // $(".already-added").hide();
    window.location.replace("/my-movies");
  }, 1700);
  // -- would like to have location replace only after the user clicks out of modal. NEXT STEP
  // if (response.status === 200) {
  //   alert("removed from favorites!");
  //   window.location.replace("/my-movies");
  // } else {
  //   alert(`${response.status} ${response.statusText}`);
  // }
});

// router.delete("/remove", async (req, res) => {
//   // const isLoggedIn = req.session.user
//   try {
//     await Favorite.destroy({
//       where: {
//         title: req.body.title,
//         user_id: req.session.user.userId,
//       },
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// $(document).on("click", ".add-to-favorites", async (e) => {
//   console.log(e.target.dataset);
//   const { overview, poster, trailer, title } = e.target.dataset;
//   // alert(title);
//   const newFav = {
//     title,
//     description: overview,
//     poster_url: poster,
//     trailer_url: trailer,
//   };
//   console.log(newFav);
//   const response = await fetch("/api/favorites/add", {
//     method: "POST",
//     body: JSON.stringify(newFav),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   if (response.ok) {
//     alert("added to favorites!");
//   } else {
//     alert("This movie is terrible!");
//   }
// });

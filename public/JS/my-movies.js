// remove movie api call (fetch)

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

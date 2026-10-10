(function renderGameMoveCatalog() {
  "use strict";

  const root = document.querySelector("[data-game-move-catalog]");
  const moves = window.GAME_MOVES;

  if (!root || !Array.isArray(moves)) {
    return;
  }

  const categories = new Map();
  for (const move of moves) {
    if (!categories.has(move.category)) {
      categories.set(move.category, []);
    }
    categories.get(move.category).push(move);
  }

  const fragment = document.createDocumentFragment();

  for (const [category, categoryMoves] of categories) {
    const section = document.createElement("details");
    section.className = "move-category";
    section.open = true;

    const summary = document.createElement("summary");
    const categoryTitle = document.createElement("span");
    categoryTitle.className = "move-category__title";
    categoryTitle.textContent = category;

    const categoryCount = document.createElement("small");
    categoryCount.textContent = `${categoryMoves.length} шт.`;
    summary.append(categoryTitle, categoryCount);

    const grid = document.createElement("div");
    grid.className = "move-grid";

    for (const move of categoryMoves) {
      const card = document.createElement("article");
      card.className = "move-card";

      const imageLink = document.createElement("a");
      imageLink.className = "move-card__image-link";
      imageLink.href = move.assets.master;
      imageLink.target = "_blank";
      imageLink.rel = "noopener";
      imageLink.setAttribute(
        "aria-label",
        `Открыть полноразмерную иллюстрацию приёма «${move.title}»`
      );

      const image = document.createElement("img");
      image.src = move.assets.small;
      image.srcset = `${move.assets.small} 512w, ${move.assets.medium} 1024w, ${move.assets.master} ${move.width}w`;
      image.sizes = "(max-width: 760px) calc(100vw - 44px), (max-width: 1180px) calc((100vw - 68px) / 2), 480px";
      image.width = move.width;
      image.height = move.height;
      image.loading = "lazy";
      image.decoding = "async";
      image.alt = `Иллюстрация приёма «${move.title}»`;
      imageLink.append(image);

      const copy = document.createElement("div");
      copy.className = "move-card__copy";

      const heading = document.createElement("h3");
      const number = document.createElement("span");
      number.textContent = move.id;
      heading.append(number, document.createTextNode(move.title));

      const stream = document.createElement("p");
      stream.className = "move-card__stream";
      stream.textContent = move.stream === "both" ? "плакат / игра" : "игра";

      const description = document.createElement("p");
      description.textContent = move.description;

      const hook = document.createElement("p");
      hook.className = "move-card__hook";
      const hookLabel = document.createElement("strong");
      hookLabel.textContent = "Игровой крючок. ";
      hook.append(hookLabel, document.createTextNode(move.hook));

      copy.append(heading, stream, description, hook);
      card.append(imageLink, copy);
      grid.append(card);
    }

    section.append(summary, grid);
    fragment.append(section);
  }

  root.replaceChildren(fragment);
})();

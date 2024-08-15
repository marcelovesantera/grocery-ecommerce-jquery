import { products } from "./dataProducts.js";

$(document).ready(() => {
  console.log("Grocery is running...");

  $("#allProducts").addClass("btnSelected");

  function renderProducts(input) {
    const $productList = $("#productList");
    $productList.empty();

    $.each(input, (index, item) => {
      const $productCard = $("<li>").addClass("cardItem");
      const $productImg = $("<img>")
        .addClass("itemImage")
        .attr("src", item.img)
        .attr("alt", item.img);
      const $productName = $("<h3>").addClass("cardTitle").text(item.name);
      const $productType = $("<span>").addClass("cardType").text(item.type);
      const $componentsList = $("<ol>").addClass("componentsList");

      $.each(item.components, (index, comp) => {
        const $componentItem = $("<li>").addClass("componentItem").text(comp);
        $componentsList.append($componentItem);
      });

      const $productBuyDetails = $("<div>").addClass("buyDetails");

      const $productPrice = $("<span>").addClass("cardPrice");
      if (item.promo) {
        $productPrice.text(`US$ ${item.promoPrice.toFixed(2)}`);
      } else {
        $productPrice.text(`US$ ${item.price.toFixed(2)}`);
      }

      const $productBuyBtn = $("<button>")
        .addClass("buyBtn")
        .attr("id", `product${item.id}`)
        .text("Buy");

      $productBuyDetails.append($productPrice);
      $productBuyDetails.append($productBuyBtn);

      $productCard.append($productImg);
      $productCard.append($productName);
      $productCard.append($productType);
      $productCard.append($componentsList);
      $productCard.append($productBuyDetails);
      $productList.append($productCard);
    });
  }

  renderProducts(products);

  $(".btnSelect").on({
    click: (event) => {
      $(".btnSelected").removeClass("btnSelected");
      $(`#${event.target.id}`).addClass("btnSelected");

      const filtered = products.filter(
        (item) => item.type.toLowerCase() == event.target.id
      );

      if (filtered.length > 0) {
        renderProducts(filtered);
      } else {
        renderProducts(products);
      }
    },
  });

  let searchInput = "";
  $("#searchField").on({
    keyup: () => {
      searchInput = $("#searchField").val().toLowerCase();
    },
  });

  $("#btnSearch").on({
    click: () => {
      const filtered = products.filter((item) =>
        item.name.toLowerCase().includes(searchInput)
      );

      renderProducts(filtered);
    },
  });
});

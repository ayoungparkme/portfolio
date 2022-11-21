// Make navbar transparent when it is on the top
$(window).on("scroll", function () {
  const st = $(window).scrollTop();
  if (st > 0) {
    $("#navbar").addClass("on");
    $(".arrow-up").addClass("visible");
  } else {
    $("#navbar").removeClass("on");
    $(".arrow-up").removeClass("visible");
  }
});

// Handle scrolling when tapping on the navbar menu
$(".navbar__menu__item").on("click", function () {
  const target = $(this).data("link");
  gsap.to(window, { duration: 1, scrollTo: { y: target, offsetY: 100 } });
});

// Handle click on "contact me" button on home
$(".home__contact").on("click", function () {
  gsap.to(window, { duration: 1, scrollTo: { y: "#contact", offsetY: 0 } });
});

// json list for projects with isotope.js
$.ajax({ url: "./data/projects.json" })
  .done(function (response) {
    console.log(response);
    const projectList = response.projectList;
    let listHtml = "";
    $.each(projectList, function (idx, item) {
      let categoryHtml = "";
      $.each(item.category, function (idx02, item02) {
        categoryHtml += `<span>#${item02}</span>`;
      });
      listHtml += `<li class="item ${item.category.join(" ")}">
                        <div class="inner">
                          <a href="./imgs/projects/${item.img}" 
                            data-fancybox="${item.category}" 
                            data-caption="<a href='${item.link}' target='_blank'>바로가기</a>">
                            <div class="img"><img src="./imgs/projects/${item.img}" alt="" /></div>
                          </a>
                          <div class="info">
                            <h2>${item.title}</h2>
                            <p class="desc">${item.desc}</p>
                            <p class="category">${categoryHtml}</p>
                          </div>
                        </div>
                      </li>`;
    });
    $(".list ul").html(listHtml);

    const grid = $(".item-list").isotope({
      itemSelector: ".item",
      layoutMode: "masonry",
    });
    grid.imagesLoaded().progress(function () {
      grid.isotope("layout");
    });

    $(".category ul li").on("click", function () {
      $(this).addClass("on").siblings().removeClass("on");
      const filterWord = $(this).data("filter");
      grid.isotope({ filter: `.${filterWord}` });
    });
  })
  .fail(function (error) {
    console.log(error);
  });

$(window).on("mousemove", function (e) {
  const mx = e.clientX;
  const my = e.clientY;
  gsap.to(".cursor", { left: mx, top: my, duration: 1, ease: "power4" });
  $("#screen").val(`x:${e.screenX} / y:${e.screenY}`);
  $("#offset").val(`x:${e.offsetX} / y:${e.offsetY}`);
  $("#page").val(`x:${e.pageX} / y:${e.pageY}`);
  $("#client").val(`x:${e.clientX} / y:${e.clientY}`);
});

// event delegate
$(".list ul").on("mouseenter", "li", function () {
  $(".cursor .txt").text("click");
  gsap.to(".cursor", { width: 100, height: 100, duration: 1, backgroundColor: "#007f55", ease: "elastic" });
});
$(".list ul").on("mouseleave", "li", function () {
  $(".cursor .txt").text("");
  gsap.to(".cursor", { width: 20, height: 20, duration: 1, backgroundColor: "rgba(255,255,255,0.5)", ease: "power4" });
});
$(".category ul li").on("mouseenter", function () {
  $(".cursor .txt").text("click");
  gsap.to(".cursor", { width: 100, height: 100, duration: 1, backgroundColor: "#007f55", ease: "elastic" });
});
$(".category ul li").on("mouseleave", function () {
  $(".cursor .txt").text("");
  gsap.to(".cursor", { width: 20, height: 20, duration: 1, backgroundColor: "rgba(255,255,255,0.5)", ease: "power4" });
});

// Handle click on the "arrow up" button
$(".arrow-up").on("click", function () {
  gsap.to(window, { scrollTo: 0, duration: 1 });
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

"use strict";

// Make navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (e) => {
  const target = e.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// Handle click on "contact me" button on home
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

// Handle click on the "arrow up" button
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

// Projects
// const workBtnContainer = document.querySelector(".work__categories");
// const projectContainer = document.querySelector(".work__projects");
// const projects = document.querySelectorAll(".project");
// workBtnContainer.addEventListener("click", (e) => {
//   const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
//   if (filter == null) {
//     return;
//   }

// Remove selection from the previous item and select the new one
//   const active = document.querySelector(".category__btn.selected");
//   active.classList.remove("selected");
//   const target = e.target.nodeName === "BUTTON" ? e.target : e.target.parnetNode;
//   target.classList.add("selected");

//   projectContainer.classList.add("anim-out");
//   setTimeout(() => {
//     projects.forEach((project) => {
//       console.log(project.dataset.type);
//       if (filter === "*" || filter === project.dataset.type) {
//         project.classList.remove("invisible");
//       } else {
//         project.classList.add("invisible");
//       }
//     });
//     projectContainer.classList.remove("anim-out");
//   }, 300);
// });

// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다.
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
// 3. 2번을 통해서 관찰된 보여지는 섹션에 해당하는 메뉴 아이템을 활성화시킨다.

// 1번 구현
// const sectionIds = ["#home", "#about", "#skills", "#work", "#graphic__design", "#contact"];

// const sections = sectionIds.map((id) => document.querySelector(id));
// const navItems = sectionIds.map((id) => document.querySelector(`[data-link="${id}"]`));

// 2,3번 구현
// let selectedNavIndex = 0;
// let selectedNavItem = navItems[0];
// function selectNavItem(selected) {
//   selectedNavItem.classList.remove("active");
//   selectedNavItem = selected;
//   selectedNavItem.classList.add("active");
// }

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

// const observerOptions = {
//   root: null,
//   rootMargin: "0px",
//   threshold: 0.3,
// };

// const observerCallback = (entries, observer) => {
//   entries.forEach((entry) => {
//     if (!entry.isIntersecting && entry.intersectionRation > 0) {
//       const index = sectionIds.indexOf(`#${entry.target.id}`);

// 스크롤링이 아래로 되어서 페이지가 올라옴
//       if (entry.boundingClientRect.y < 0) {
//         selectedNavIndex = index + 1;
//       } else {
//         selectedNavIndex = index - 1;
//       }
//     }
//   });
// };

// const observer = new IntersectionObserver(observerCallback, observerOptions);
// sections.forEach((section) => observer.observe(section));

// window.addEventListener("wheel", () => {
//   if (window.scrollY === 0) {
//     selectedNavIndex = 0;
//   } else if (window.scrollY + window.innerHeight === document.body.clientHeight) {
//     selectedNavItem = navItems.length - 1;
//   }
//   selectNavItem(navItems[selectedNavIndex]);
// });

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
                        <a href="./imgs/projects/${item.img}" data-fancybox="${item.category}">
                          <div class="img"><img src="./imgs/projects/${item.img}" alt="" /></div>
                          <div class="info">
                            <h2>${item.title}</h2>
                            <p class="desc">${item.desc}</p>
                            <p class="category">${categoryHtml}</p>
                          </div>
                        </a>
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

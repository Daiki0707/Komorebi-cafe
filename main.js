const openingHour = 10; // 10:00開店
const closingHour = 18; // 18:00閉店
const now = new Date();
const nowHour = now.getHours();

let message = '';
if (nowHour >= openingHour && nowHour < closingHour) {
  message = `OPEN TODAY TIL ${closingHour}:00`;
} else {
  message = `OPEN TOMORROW FROM ${openingHour}:00`;
}

document.getElementById("status").innerText = message;

var swiper = new Swiper('.swiper', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 58,
  centeredSlides: true,
  breakpoints: {
    768: {
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 54.5,
    },
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
    formatFractionCurrent: function (n) {
      return '0' + n;
    },
    formatFractionTotal: function (n) {
      return '0' + n;
    },
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// katamuku
function updateImageStack(containerId) {
  const container = document.getElementById(containerId);
  const items = container.querySelectorAll('.image-item');
  items.forEach((item, index) => {
    const angle = index === 0 ? 0 : (index * 3); // 例: 3度ずつ
    item.style.transform = `rotate(${angle}deg)`;
    item.style.zIndex = items.length - index;
  });
}

function setupImageStack(containerId, prevBtnId, nextBtnId) {
  const container = document.getElementById(containerId);

  document.getElementById(prevBtnId).addEventListener('click', () => {
    const last = container.lastElementChild;
    container.insertBefore(last, container.firstElementChild);
    updateImageStack(containerId);
  });

  document.getElementById(nextBtnId).addEventListener('click', () => {
    const first = container.firstElementChild;
    container.appendChild(first);
    updateImageStack(containerId);
  });

  new Sortable(container, {
    animation: 150,
    onEnd: () => updateImageStack(containerId)
  });

  updateImageStack(containerId);
}

// スタック1とスタック2を初期化
setupImageStack('image-stack-1', 'prev1', 'next1');
setupImageStack('image-stack-2', 'prev2', 'next2');


function setupAccordion() {
  const isMobile = window.innerWidth < 768;
  const titles = document.querySelectorAll('.accordion_title');

  titles.forEach(title => {
    const content = title.nextElementSibling;

    if (isMobile) {
      // モバイル：開閉機能を有効にする
      content.style.display = 'none';
      title.classList.remove('open');
      title.onclick = function () {
        const isOpen = title.classList.contains('open');
        title.classList.toggle('open');
        content.style.display = isOpen ? 'none' : 'block';
      };
    } else {
      // PC：常に開いていてクリック無効
      content.style.display = 'block';
      title.classList.remove('open');
      title.onclick = null;
    }
  });
}

window.addEventListener('load', setupAccordion);
window.addEventListener('resize', setupAccordion);

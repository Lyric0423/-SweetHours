const tasks = [
  {
    id: 1,
    tag: "陪宠物",
    title: "遛狗1小时（中型犬）",
    time: "今天 16:00 - 17:00",
    shortTime: "今天 16:00",
    place: "静安区南京西路附近",
    distance: "距离约800m",
    reward: "¥30",
    payType: "现金",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=640&q=80",
    publisher: "小丹方",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
    score: "4.9",
    stats: "已完成12次 · 好评率98%",
    completed: "已完成12次",
    description:
      "我家狗狗叫布丁，性格温顺，喜欢玩球，不挑人。希望找个喜欢狗狗的义工帮忙遛狗1小时左右，让它在小区附近走走，回来给它喝水就好～",
    chips: ["中型犬", "温顺", "已打疫苗"],
    state: "申请中",
    applicants: "3位义工申请"
  },
  {
    id: 2,
    tag: "陪伴儿童",
    title: "临时看管小孩2小时",
    time: "明天 14:00 - 16:00",
    shortTime: "明天 14:00",
    place: "静安区社区中心",
    distance: "距离1.2km",
    reward: "请吃饭",
    payType: "回馈",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=640&q=80",
    publisher: "阳光妈妈",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
    score: "4.8",
    stats: "已完成10次 · 好评率96%",
    completed: "已完成10次",
    description:
      "临时有线上会议，需要一位有耐心的人陪孩子拼积木、讲故事。家里有人在，不涉及独立照看，只希望有人陪玩。",
    chips: ["家长在场", "拼积木", "轻陪伴"],
    state: "进行中",
    applicants: "已确认：小李同学"
  },
  {
    id: 3,
    tag: "陪伴聊天",
    title: "陪老人散步聊天1小时",
    time: "明天 09:00 - 10:00",
    shortTime: "明天 09:00",
    place: "徐汇区公园入口",
    distance: "距离1.0km",
    reward: "¥20",
    payType: "现金",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=640&q=80",
    publisher: "李爷爷",
    avatar: "https://images.unsplash.com/photo-1513152697235-fe74c283646a?auto=format&fit=crop&w=160&q=80",
    score: "5.0",
    stats: "已完成27次 · 好评率100%",
    completed: "已完成27次",
    description:
      "老人腿脚还不错，想找附近年轻人或退休邻居一起慢走聊天。路线固定在公园里，首次见面在公园门口。",
    chips: ["公共场所", "慢走", "聊天"],
    state: "已完成",
    applicants: "评价已完成"
  },
  {
    id: 4,
    tag: "简单代办",
    title: "上门喂猫+铲屎",
    time: "后天 10:00 - 10:30",
    shortTime: "后天 10:00",
    place: "静安区武定路",
    distance: "距离2.3km",
    reward: "猫粮一包",
    payType: "礼物",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=640&q=80",
    publisher: "喵小主",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=160&q=80",
    score: "4.9",
    stats: "已完成8次 · 好评率99%",
    completed: "已完成8次",
    description:
      "出差半天，需要帮忙喂猫和铲屎。猫比较怕生，不需要抱它。可先视频确认流程，门锁一次性密码。",
    chips: ["怕生猫", "一次性门锁", "可视频确认"],
    state: "已取消",
    applicants: "无人接单"
  }
];

let currentFilter = "全部";
let currentTask = tasks[0];

const screens = [...document.querySelectorAll(".screen")];
const navButtons = [...document.querySelectorAll("[data-nav]")];
const bottomNav = document.querySelector(".bottom-nav");
const taskList = document.querySelector("#taskList");
const myTaskList = document.querySelector("#myTaskList");
const searchInput = document.querySelector("#searchInput");
const filterPanel = document.querySelector("#filterPanel");
const filterToggle = document.querySelector("#filterToggle");

function showScreen(name) {
  screens.forEach((screen) => screen.classList.toggle("active", screen.dataset.screen === name));
  document.querySelectorAll(".bottom-nav button").forEach((button) => {
    button.classList.toggle("active", button.dataset.nav === name);
  });
  bottomNav.hidden = name === "detail" || name === "chat";
}

function renderTasks() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = tasks.filter((task) => {
    const matchesTag = currentFilter === "全部" || task.tag === currentFilter;
    const haystack = `${task.title} ${task.place} ${task.publisher} ${task.tag}`.toLowerCase();
    return matchesTag && haystack.includes(query);
  });

  taskList.innerHTML = filtered
    .map(
      (task) => `
        <button class="task-card" type="button" data-task-id="${task.id}">
          <span class="task-photo">
            <img src="${task.image}" alt="${task.title}">
            <span class="label-hot">${task.id === 1 ? "热门" : task.tag}</span>
            <small>${task.completed}</small>
          </span>
          <span class="task-info">
            <h3>${task.title}</h3>
            <span class="meta">
              <span>◷ ${task.shortTime}</span>
              <span>⌖ ${task.place} · ${task.distance}</span>
            </span>
            <span class="reward">报酬 <strong>${task.reward}</strong><em>${task.payType}</em></span>
            <span class="card-footer">
              <span class="person"><img src="${task.avatar}" alt="${task.publisher}">${task.publisher}</span>
              <span class="rating">★ ${task.score}</span>
            </span>
          </span>
        </button>
      `
    )
    .join("");
}

function renderMyTasks() {
  myTaskList.innerHTML = tasks
    .map(
      (task) => `
        <article class="my-task">
          <img src="${task.image}" alt="${task.title}">
          <div>
            <h3>${task.title}</h3>
            <p>◷ ${task.time}</p>
            <p>⌖ ${task.place}</p>
            <p>${task.applicants}</p>
          </div>
          <span class="state ${stateClass(task.state)}">${task.state}</span>
        </article>
      `
    )
    .join("");
}

function stateClass(state) {
  if (state === "进行中") return "going";
  if (state === "已完成") return "done";
  return "";
}

function openDetail(task) {
  currentTask = task;
  document.querySelector("#detailImage").src = task.image;
  document.querySelector("#detailImage").alt = task.title;
  document.querySelector("#detailTitle").textContent = task.title;
  document.querySelector("#detailReward").textContent = task.reward;
  document.querySelector("#detailRewardType").textContent = task.payType;
  document.querySelector("#detailTime").textContent = `◷ ${task.time}（约${task.time.includes("10:30") ? "30分钟" : "1小时"}）`;
  document.querySelector("#detailPlace").textContent = `⌖ ${task.place}（${task.distance}）`;
  document.querySelector("#detailAvatar").src = task.avatar;
  document.querySelector("#detailAvatar").alt = task.publisher;
  document.querySelector("#detailPublisher").textContent = task.publisher;
  document.querySelector("#detailScore").textContent = task.score;
  document.querySelector("#detailStats").textContent = task.stats;
  document.querySelector("#detailDescription").textContent = task.description;
  document.querySelector("#detailChips").innerHTML = task.chips.map((chip) => `<span>${chip}</span>`).join("");
  document.querySelector("#detailMapText").textContent = task.place;
  showScreen("detail");
}

function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === filter);
  });
  renderTasks();
}

function toast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const element = document.createElement("div");
  element.className = "toast";
  element.textContent = message;
  document.querySelector(".phone").append(element);
  setTimeout(() => element.remove(), 2100);
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.nav));
});

document.querySelectorAll("[data-back]").forEach((button) => {
  button.addEventListener("click", () => showScreen("home"));
});

document.addEventListener("click", (event) => {
  const card = event.target.closest("[data-task-id]");
  if (card) {
    const task = tasks.find((item) => item.id === Number(card.dataset.taskId));
    openDetail(task);
  }

  const filterButton = event.target.closest("[data-filter]");
  if (filterButton) {
    setFilter(filterButton.dataset.filter);
  }
});

searchInput.addEventListener("input", renderTasks);

filterToggle.addEventListener("click", () => {
  filterPanel.hidden = !filterPanel.hidden;
});

document.querySelector("#favoriteToggle").addEventListener("click", (event) => {
  event.currentTarget.classList.toggle("active");
  event.currentTarget.innerHTML = event.currentTarget.classList.contains("active")
    ? "★<span>已收藏</span>"
    : "☆<span>收藏</span>";
  toast(event.currentTarget.classList.contains("active") ? "已收藏这个任务" : "已取消收藏");
});

document.querySelector("#bookmarkButton").addEventListener("click", (event) => {
  event.currentTarget.textContent = event.currentTarget.textContent === "☆" ? "★" : "☆";
});

document.querySelector("#applyButton").addEventListener("click", () => {
  toast("申请已发送，等待发布者确认");
  setTimeout(() => showScreen("chat"), 720);
});

document.querySelector("#publishForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const newTask = {
    id: tasks.length + 1,
    tag: formData.get("type"),
    title: formData.get("title"),
    time: `${formData.get("time")} · ${formData.get("duration")}`,
    shortTime: formData.get("time"),
    place: formData.get("place"),
    distance: "附近",
    reward: formData.get("reward"),
    payType: formData.get("payType"),
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=640&q=80",
    publisher: "小丸子",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=160&q=80",
    score: "4.8",
    stats: "已完成23次 · 好评率98%",
    completed: "新发布",
    description: formData.get("description"),
    chips: [formData.get("type"), "待确认", formData.get("payType")],
    state: "申请中",
    applicants: "等待义工申请"
  };
  tasks.unshift(newTask);
  event.currentTarget.reset();
  renderTasks();
  renderMyTasks();
  showScreen("home");
  toast("任务已发布到任务广场");
});

renderTasks();
renderMyTasks();

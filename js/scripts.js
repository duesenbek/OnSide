$(function () {

  $("h1:contains('Match Schedule'), h1:contains('Football News'), h1:contains('Number Guessing Game')")
    .css({ letterSpacing: "0.5px" });

  
  $(".news-card").css({ borderColor: "#16A34A" });


  const $dt = $("#liveDatetime");
  const $bgSel = $("#bgSelect");
  if ($dt.length) {
    const tick = () => {
      const now = new Date();
      $dt.text(now.toLocaleString(undefined, {
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit"
      }));
    };
    tick();
    setInterval(tick, 1000);
  }
  if ($bgSel.length) {
    const KEY = "onside_bg_color";
    const saved = localStorage.getItem(KEY) || "";
    if (saved) {
      $("body").css("backgroundColor", saved);
      $bgSel.val(saved);
    }
    $bgSel.on("change", function () {
      const val = $(this).val() || "";
      $("body").css("backgroundColor", val);
      localStorage.setItem(KEY, val);
    });
  }

  
  $("#btnHide").on("click", () => $("#pDemo").hide());
  $("#btnShow").on("click", () => $("#pDemo").show());
  $("#btnToggle").on("click", () => $("#pDemo").toggle());

  $("#btnFadeIn").on("click", () => $("#imgFade").fadeIn(300));
  $("#btnFadeOut").on("click", () => $("#imgFade").fadeOut(300));
  $("#btnFadeToggle").on("click", () => $("#imgFade").fadeToggle(300));

  $("#btnSlideToggle").on("click", () => $("#panelJQ").slideToggle(250));


  $("#btnAdd").on("click", () => $("#jqList").append(`<li class="list-group-item">New Item ${Date.now()}</li>`));
  $("#btnPrepend").on("click", () => $("#jqList").prepend(`<li class="list-group-item">Prepended ${Date.now()}</li>`));
  $("#btnRemove").on("click", () => $("#jqList li:last").remove());

  $("#btnSwapImg").on("click", function () {
    const $img = $("#imgSwap");
    const cur = $img.attr("src");
    const alt = (cur && cur.includes("messi")) ? "images/champleague.jpg" : "images/messi aura.jpg";
    $img.attr("src", alt);
  });

  $("#btnChangeHref").on("click", function () {
    const $a = $("#dynamicLink");
    const cur = $a.attr("href");
    const next = (cur && cur.includes("google")) ? "https://wikipedia.org" : "https://google.com";
    $a.attr("href", next).text(`Go to ${next.replace("https://","")}`);
  });

  
  const resetBox = () => $("#boxJQ").stop(true, true).css({ left: 0, top: 0, width: 100, height: 100, opacity: 1 });
  $("#btnResetBox").on("click", resetBox);

  $("#btnAnimate").on("click", function () {
    const $b = $("#boxJQ");
    $b.stop(true, true)
      .animate({ left: "+=300" }, 600)   // right
      .animate({ top: "+=180" }, 600)    // down
      .animate({ width: 50, height: 50, opacity: 0.6 }, 600) // shrink
      .animate({ left: 0, top: 0, width: 100, height: 100, opacity: 1 }, 600); // back
  });

  $("#btnCombo").on("click", function () {
    $("#boxJQ").stop(true, true).animate({
      left: "+=220",
      top: "+=120",
      width: 160,
      height: 160,
      opacity: 0.7
    }, 800);
  });

 
  $("#jq-gallery .thumb").on("click", function () {
    const src = $(this).attr("src");
    const $main = $("#mainImg");
    $main.stop(true, true).fadeOut(150, function () {
      $main.attr("src", src).fadeIn(150);
    });
  });


  $("#jq-accordion .acc-panel").hide(); // старт: все скрыты
  $("#jq-accordion .acc-title").on("click", function () {
    const $panel = $(this).next(".acc-panel");
    // сворачиваем другие
    $("#jq-accordion .acc-panel").not($panel).slideUp(200);
    $panel.slideToggle(200);
  });


  let bouncing = false;
  let bounceTimer = null;

  function bounceLoop() {
    if (!bouncing) return;
    const $ball = $("#ball");
    const $pg = $("#playground");
    const maxX = $pg.width() - $ball.outerWidth();
    const maxY = $pg.height() - $ball.outerHeight();

    
    $ball.animate({ left: maxX, top: maxY }, 700)
         .animate({ left: 0, top: 0 }, 700, function () {
           if (bouncing) bounceLoop();
         });
  }

  $("#startBounce").on("click", function () {
    if (bouncing) return;
    bouncing = true;
    bounceLoop();
  });

  $("#stopBounce").on("click", function () {
    bouncing = false;
    $("#ball").stop(true, true);
    if (bounceTimer) clearTimeout(bounceTimer);
  });

  
  (function initGame(){
    const $form = $("#gameForm");
    if (!$form.length) return; // нет на этой странице
    const $input = $("#gameInput");
    const $fb = $("#gameFeedback");
    const $attempts = $("#gameAttempts");
    const $reset = $("#gameReset");
    let secret = Math.floor(Math.random() * 100) + 1;
    let tries = 0;

    function setFeedback(type, text) {
      $fb.removeClass().addClass("alert mt-3").addClass(`alert-${type}`).text(text).removeClass("d-none");
    }
    function setAttempts() { $attempts.text(String(tries)); }

    $form.on("submit", function (e) {
      e.preventDefault();
      const val = Number($input.val());
      if (!val || val < 1 || val > 100) {
        setFeedback("danger", "Enter a number between 1 and 100");
        return;
      }
      tries += 1; setAttempts();
      if (val === secret) {
        setFeedback("success", `Correct! You guessed in ${tries} attempts`);
        $input.prop("disabled", true);
      } else {
        setFeedback("info", val < secret ? "Too low" : "Too high");
        $input.trigger("focus").select();
      }
    });

    $reset.on("click", function () {
      secret = Math.floor(Math.random() * 100) + 1;
      tries = 0; setAttempts();
      $fb.addClass("d-none");
      $input.val("").prop("disabled", false).trigger("focus");
    });
  })();

  
  (function initTodo(){
    const $form = $("#todoForm");
    if (!$form.length) return;
    const $input = $("#todoInput");
    const $list = $("#todoList");
    const $error = $("#todoError");
    const $cat = $("#todoCategory");
    const KEY = "onside_news_todos";

    const load = () => {
      try { const data = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(data) ? data : []; }
      catch { return []; }
    };
    const save = arr => localStorage.setItem(KEY, JSON.stringify(arr));

    let todos = load();
    render(todos);

    function render(items){
      $list.empty();
      items.forEach(t => {
        const $li = $(`
          <li class="list-group-item d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-2">
              <input type="checkbox" class="form-check-input me-2" data-id="${t.id}" ${t.done ? "checked":""}>
              <label class="form-check-label">${t.text}</label>
              <span class="badge bg-secondary ms-2">${t.category || "Other"}</span>
            </div>
            <button class="btn btn-sm btn-outline-danger" data-action="delete" data-id="${t.id}">Delete</button>
          </li>
        `);
        if (t.done) $li.addClass("list-group-item-success").find("label").css("text-decoration","line-through");
        $list.append($li);
      });
    }

    function setError(msg){ if (msg){ $error.text(msg).removeClass("d-none"); } else { $error.addClass("d-none").text(""); } }

    $form.on("submit", function(e){
      e.preventDefault();
      const text = ($input.val() || "").trim();
      if (!text) { setError("Task cannot be empty"); return; }
      setError("");
      const cat = $cat.val() || "Other";
      const item = { id: Date.now(), text, done: false, category: cat };
      todos.unshift(item);
      save(todos);
      render(todos);
      $input.val(""); if ($cat[0]) $cat.prop("selectedIndex", 0);
    });

    $list.on("click", function(e){
      const $t = $(e.target);
      const id = Number($t.data("id"));
      if ($t.data("action")==="delete" && id){
        todos = todos.filter(x => x.id !== id);
        save(todos); render(todos); return;
      }
      if ($t.is('input[type="checkbox"]') && id){
        todos = todos.map(x => x.id===id ? {...x, done: !x.done} : x);
        save(todos); render(todos); return;
      }
    });
  })();
});

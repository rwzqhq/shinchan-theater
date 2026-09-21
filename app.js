(function () {
  "use strict";

  var CLIPS = window.CLIPS || [];
  var EMBED = "https://player.bilibili.com/player.html";
  var BILI = "https://www.bilibili.com/video/";

  var player = document.getElementById("player");
  var title = document.getElementById("now-title");
  var link = document.getElementById("now-link");

  function embedUrl(bvid) {
    return (
      EMBED +
      "?bvid=" + bvid +
      "&autoplay=1&danmaku=0&high_quality=1&as_wide=1&hideCoverInfo=1&p=1"
    );
  }

  function pick() {
    var wanted = (location.hash.slice(1) || new URLSearchParams(location.search).get("v") || "").toUpperCase();
    if (!wanted) return 0;
    for (var i = 0; i < CLIPS.length; i++) {
      if (CLIPS[i].bvid.toUpperCase() === wanted) return i;
    }
    return 0;
  }

  function show(index) {
    var clip = CLIPS[index];
    if (!clip) return;
    player.src = embedUrl(clip.bvid);
    player.title = clip.title;
    title.textContent = clip.title;
    link.href = BILI + clip.bvid;
    if (location.hash.slice(1) !== clip.bvid) {
      history.replaceState(null, "", "#" + clip.bvid);
    }
  }

  // Re-loading the iframe restarts playback with autoplay, so a shared
  // #BVxxxx link can point straight at the clip that should play.
  window.addEventListener("hashchange", function () {
    show(pick());
  });

  show(pick());
})();

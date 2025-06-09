<div class="case-row">
<?php
$cases = json_decode(file_get_contents('cases.json'), true);
foreach ($cases as $case): ?>
  <div class="case-block">
    <div class="case-layer case-bw">
      <div class="logo-bg"></div>
      <div class="logo-text">лого</div>
      <div class="case-title"><?= htmlspecialchars($case['title']) ?></div>
      <div class="case-label">разработка:</div>
      <div class="case-desc"><?= htmlspecialchars($case['description']) ?></div>
      <div class="case-site"><?= htmlspecialchars($case['site']) ?></div>
      <div class="case-tag"><?= htmlspecialchars($case['tag']) ?></div>
    </div>
    <div class="case-layer case-color">
      <img class="case-image" src="<?= $case['image'] ?>" alt="">
      <div class="logo-bg"></div>
      <div class="logo-text">лого</div>
      <div class="case-title"><?= htmlspecialchars($case['title']) ?></div>
      <div class="case-label">разработка:</div>
      <div class="case-desc"><?= htmlspecialchars($case['description']) ?></div>
      <div class="case-site"><?= htmlspecialchars($case['site']) ?></div>
      <div class="case-tag"><?= htmlspecialchars($case['tag']) ?></div>
    </div>
  </div>
<?php endforeach; ?>
</div>


<?php
$cases = include 'data.php'; // или require, или из БД
?>

<?php if (!empty($cases)): ?>
  <?php foreach ($cases as $case): ?>
    <div class="case-block">
      <div class="case-layer case-bw">
        <img class="case-image" src="<?= $case['image_bw'] ?>" alt="Превью ЧБ" />
        <div class="logo-bg"></div>
        <div class="logo-text">лого</div>
        <div class="case-title"><?= $case['title'] ?></div>
        <div class="case-label"><?= $case['label'] ?></div>
        <div class="case-desc"><?= $case['desc'] ?></div>
        <div class="case-site"><?= $case['site'] ?></div>
        <div class="case-tag"><?= $case['tag'] ?></div>
      </div>
      <div class="case-layer case-color">
        <img class="case-image" src="<?= $case['image_color'] ?>" alt="Цветной кейс" />
        <div class="logo-bg"></div>
        <div class="logo-text">лого</div>
        <div class="case-title"><?= $case['title'] ?></div>
        <div class="case-label"><?= $case['label'] ?></div>
        <div class="case-desc"><?= $case['desc'] ?></div>
        <div class="case-site"><?= $case['site'] ?></div>
        <div class="case-tag"><?= $case['tag'] ?></div>
      </div>
      </div>
  <?php endforeach; ?>
<?php endif; ?>

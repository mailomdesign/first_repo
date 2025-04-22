// Ожидаем полной загрузки страницы
document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('toggleButton');
  const content = document.getElementById('extraContent');

  button.addEventListener('click', function () {
    if (content.style.display === 'none') {
      content.style.display = 'block';
      button.textContent = 'Скрыть';
    } else {
      content.style.display = 'none';
      button.textContent = 'Показать больше';
    }
  });
});

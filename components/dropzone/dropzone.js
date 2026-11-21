// Grin dropzone. Markup: <label class="dropzone"> … <input type="file" accept=".csv,.xlsx"> … </label>.
// Marks .over while a file is dragged on top and fires "grin:files" with the File list (from drop or from the picker).
document.querySelectorAll('.dropzone').forEach((zone) => {
  const input = zone.querySelector('input[type="file"]');
  const send = (files) => { if (files?.length) zone.dispatchEvent(new CustomEvent('grin:files', { bubbles: true, detail: [...files] })); };
  ['dragenter', 'dragover'].forEach((t) => zone.addEventListener(t, (e) => { e.preventDefault(); zone.classList.add('over'); }));
  ['dragleave', 'dragend'].forEach((t) => zone.addEventListener(t, (e) => { if (!zone.contains(e.relatedTarget)) zone.classList.remove('over'); }));
  zone.addEventListener('drop', (e) => { e.preventDefault(); zone.classList.remove('over'); send(e.dataTransfer.files); });
  input?.addEventListener('change', () => send(input.files));
});

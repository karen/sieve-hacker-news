// Saves options to chrome.storage
function save_options() {
  let keywordsToHide = document.getElementById('hideKeywords').value;
  let keywordsToHighlight = document.getElementById('highlightKeywords').value;
  let highlightFont = document.getElementById('highlightFontFamily').value;
  chrome.storage.local.set({
    hide: keywordsToHide.split(',').map(s => s.trim()),
    highlight: keywordsToHighlight.split(',').map(s => s.trim()),
    highlightFontFamily: highlightFont.trim(),
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.local.get(['hide', 'highlight', 'highlightFontFamily']
  , function(items) {
    if (items.hide !== undefined && items.hide.length > 0) {
      document.getElementById('hideKeywords').value = items.hide;
    }
    if (items.highlight !== undefined && items.highlight.length > 0) {
      document.getElementById('highlightKeywords').value = items.highlight;
    }
    if (items.highlightFontFamily !== undefined) {
      document.getElementById('highlightFontFamily').value =
        items.highlightFontFamily;
    }
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

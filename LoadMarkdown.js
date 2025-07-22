import { marked } from 'https://unpkg.com/marked@4.3.0/lib/marked.esm.js';


// ...il resto del codice

export async function renderPreviews(postsFolder) {
  const container = document.getElementById('posts');
  const postFiles = await fetchPostList('posts');

  for (const file of postFiles) {
    const res = await fetch(`${file}`);
    const text = await res.text();

    // Ricava il titolo dal primo header Markdown
    const titleMatch = text.match(/^# (.+)$/m);
    const title = titleMatch ? titleMatch[1] : file.replace('.md', '');

    // Elimina immagini e crea anteprima
    let previewText = text.split('\n').slice(1, 10).join('\n') + '...';
    previewText = previewText.replace(/!\[.*?\]\(.*?\)/g, '');

    const html = marked.parse(previewText);
    const link = `post.html?file=${file}`;

    const div = document.createElement('div');
    div.className = 'post-preview';
    div.innerHTML = `
      <a href="${link}"><h2>${title}</h2></a>
      <div>${html}</div>
    `;

    container.appendChild(div);

    // ✅ Attiva KaTeX sulla preview
    if (window.renderMathInElement) {
      window.renderMathInElement(div);
    }
  }
}




export async function renderFullPost(containerId) {
  const params = new URLSearchParams(window.location.search);
  const file = params.get('file');
  const container = document.getElementById(containerId);

  if (file) {
    const res = await fetch(`${file}`);
    const text = await res.text();
    container.innerHTML = marked.parse(text);

    // Dopo aver inserito il contenuto markdown convertito, chiama KaTeX
    if (window.renderMathInElement) {
      window.renderMathInElement(container);
    }
  } else {
    container.innerHTML = '<p>Nessun file specificato.</p>';
  }
}


async function fetchPostList(folder) {
  const response = await fetch(folder); // es: 'posts/'
  const text = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');
  const links = [...doc.querySelectorAll('a')]
    .map(a => a.getAttribute('href'))
    .filter(href => href.endsWith('.md'));
  return links;
}




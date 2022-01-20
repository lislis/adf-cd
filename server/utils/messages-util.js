const ogs = require('open-graph-scraper');
const axios = require('axios');

function buildOGMessage(result) {
  let msg = '';

  if (result.ogTitle) {
    msg += `${result.ogTitle}`;
  }
  if (result.ogTitle && result.ogSiteName) {
    msg += ' - ';
  }
  if (result.ogSiteName) {
    msg += `${result.ogSiteName}`;
  }
  msg += '<br>';
  if (result.ogUrl) {
    msg += `<a href="${result.ogUrl}">${result.ogUrl}</a><br>`;
  }
  if (result.ogDescription) {
    msg += `${result.ogDescription.slice(0, 70)}...<br>`;
  }
  if (result.ogImage) {
    msg += `<img src="${result.ogImage.url}" alt="" width="200">`;
  }
  return msg;
}

function handleOGLink(link) {
  return new Promise((resolve, reject) => {
    const options = { url: link };

    ogs(options)
      .then(data => {
        const { error, result, response } = data;
        if (result.success) {
          resolve(buildOGMessage(result));
        } else {
          reject(error);
        }
      })
      .catch(e => { reject(e); });
  });
}

function buildOembedMessage(link, data) {
  let msg = '';
  msg += `<a href="${link}">${link}</a><br>`;
  if (data.data.title) {
    msg += `${data.data.title}<br>`;
  }
  msg += `${data.data.html}`;
  return msg;
}

function handleOembedLink(link) {
  return new Promise((resolve, reject) => {
    let oembedEndpoint = '';

    if (link.match(/twitter.com/)) {
      oembedEndpoint = `https://publish.twitter.com/oembed?url=${link}`;
    } else if (link.match(/youtube.com/)) {
      oembedEndpoint = `https://www.youtube.com/oembed?url=${link}`;
    } else if (link.match(/tiktok.com/)) {
      oembedEndpoint = `https://tiktok.com/oembed?url=${link}`;
    } else {
      console.log('why are we here?')
    }

    axios.get(oembedEndpoint)
      .then(data => {
        resolve(buildOembedMessage(link, data));
      }).catch(e => { reject(e); });
  });
}

function buildLinkExpandMessage(link) {
  return new Promise((resolve, reject) => {
    if (link.match(/twitter.com/)
        || link.match(/youtube.com/)
        || link.match(/tiktok.com/)) {
      handleOembedLink(link).then(msg => resolve(msg)).catch(e => reject(e));
    } else {
      handleOGLink(link).then(msg => resolve(msg)).catch(e => reject(e));
    }
  });
}

exports.buildLinkExpandMessage = buildLinkExpandMessage;

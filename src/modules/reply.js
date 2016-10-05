module.exports = ({ session }) => {
  return {
    link: (url, label) => {
      if (label) {
        return `${label} (${url})`;
      }
      return url;
    },
    send: (text, attachments) => {
      if (!Array.isArray(text)) {
        text = [text];
      }
      if (attachments) {
        text = text.concat(attachments.map(attachment => attachment.title));
      }
      text = text.join(', ');
      session.send(text);
    }
  };
};

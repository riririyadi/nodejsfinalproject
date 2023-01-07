module.exports = ({ content }) => {
  return `
    <!DOCTYPE html>
        <html>
        <head>
            <title>Note App</title>
        </head>
        <body style="max-width: 70vw; margin:auto">
            ${content}
        </body>
        </html>
    `;
};

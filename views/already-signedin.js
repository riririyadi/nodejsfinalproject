const layout = require("./layout");

module.exports = () => {
  return layout({
    content: `
    <div>
    <h1>You are already signed in</h1>

            <button><a href="/logout">Sign Out</a></button>
            <button style="margin-left: 20px"><a href="/home">Back to Home</a></button>    
      
    </div>
    `,
  });
};

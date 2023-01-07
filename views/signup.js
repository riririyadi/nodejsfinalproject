const layout = require("./layout");

module.exports = () => {
  return layout({
    content: `
    <div>
    <h1>SIGN UP</h1>
        <form method="POST">
            <input name="username"  placeholder="username"/>
            <input name="password" placeholder="password" type="password"/>
            <button>Sign Up</button>
        </form>
        <div style="margin-top: 20px"><a href='/'>Sign In</a></div>
    </div>
    `,
  });
};

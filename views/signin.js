const layout = require("./layout");

module.exports = () => {
  return layout({
    content: `
    <div style="display:flex; flex-direction:row; justify-content:center; align-items:center; height: 100vh; width:100%">
    <div
    <h1>SIGN IN</h1>
    <div style="margin-top: 20px">
        <form method="POST">
            <input name="username"  placeholder="username" style="margin-bottom: 10px"/><br>
            <input name="password" placeholder="password" style="margin-bottom: 20px" type="password"/>
            <br>
            <button  style="width: 100%" >Sign In</button>
        </form>
        </div>
        <div style="margin-top: 20px; display:flex; justify-content:center"><a href="/signup">Sign Up</a></div>
        </div>
    </div>
    `,
  });
};

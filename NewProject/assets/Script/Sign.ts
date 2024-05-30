const { ccclass, property } = cc._decorator;

// In-memory user data storage (for demonstration purposes)
const userData = {
  email: null,
  password: null
};

@ccclass
export default class Sign extends cc.Component {
  start() {
    // Get the ESC_BT button and add the click event listener
    const escButton = cc.find("ESC_BT", this.node);
    if (escButton) {
      escButton.on('click', this.onEscButtonClick, this);
    }

    const submitButton = cc.find("Submit", this.node);
    if (submitButton) {
      submitButton.on('click', this.onSubmitButtonClick, this);
    }
  }

  onEscButtonClick() {
    // Remove this node from its parent, effectively closing the prefab
    cc.tween(this.node)
      .to(0.2, { scale: 0 }, { easing: 'backIn' })
      .call(() => {
        // Destroy the node after animation
        this.node.destroy();
      })
      .start();
  }

  onSubmitButtonClick() {
    // Determine if this is a sign-up or sign-in based on the presence of certain input fields
    const emailInput = cc.find("Email_input", this.node).getComponent(cc.EditBox).string.trim();
    const passwordInput = cc.find("Password_input", this.node).getComponent(cc.EditBox).string.trim();

    console.log(emailInput, passwordInput);

    if (emailInput === "" || passwordInput === "") {
      cc.log("Please enter both email and password!");
      alert("Please enter both email and password!");
      return;
    }

    const confirmPasswordInputNode = cc.find("Password_check", this.node);
    if (confirmPasswordInputNode) {
      // This is a sign-up process
      const confirmPasswordInput = confirmPasswordInputNode.getComponent(cc.EditBox).string.trim();
      this.handleSignUp(emailInput, passwordInput, confirmPasswordInput);
    } else {
      // This is a sign-in process
      this.handleSignIn(emailInput, passwordInput);
    }
  }

  handleSignUp(email: string, password: string, confirmPassword: string) {
    if (email === "" || password === "" || confirmPassword === "") {
      cc.log("Please enter email, password, and confirm your password!");
      alert("Please enter email, password, and confirm your password!");
      return;
    }

    if (!email.includes('@')) {
      cc.log("Invalid email format! Email must contain '@'.");
      alert("Invalid email format! Email must contain '@'.");
      return;
    }

    if (password !== confirmPassword) {
      // Show password mismatch warning
      cc.log("Passwords do not match!");
      alert("Passwords do not match!");
    } else {
      // Save user data
      userData.email = email;
      userData.password = password;
      cc.log("User signed up successfully!");
      alert("User signed up successfully!");
      // Optionally, you can navigate to a different scene
      cc.director.loadScene("Menu");
    }
  }

  handleSignIn(email: string, password: string) {
    if (userData.email === null) {
      // User has not signed up yet
      cc.log("User has not registered!");
      alert("User has not registered!");
    } else if (userData.email === email && userData.password === password) {
      // Successful login
      cc.log("Login successful!");
      alert("Login successful!");
      // Optionally, you can navigate to a different scene
      cc.director.loadScene("Menu");
    } else {
      // Login failed
      cc.log("Invalid email or password!");
      alert("Invalid email or password!");
    }
  }
}

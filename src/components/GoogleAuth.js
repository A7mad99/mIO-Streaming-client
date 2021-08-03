import React from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import { signIn, signOut } from "../actions";
import { connect } from "react-redux";
class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "58039032399-iurejon5gm0dtlko3f7vuakpprr34qke.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn();
    } else {
      this.props.signOut();
    }
  };
  AuthSignOut = () => {
    this.auth.signOut();
  };
  AuthSingIn = () => {
    this.auth.signIn(this.auth.currentUser.get().getId());
  };
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return (
        <div>
          <Segment>
            <Dimmer active inverted>
              <Loader inverted></Loader>
            </Dimmer>
          </Segment>
        </div>
      );
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.AuthSignOut}>
          <i className="google icon"></i>Sign out
        </button>
      );
    } else {
      return (
        <button className="ui green google button" onClick={this.AuthSingIn}>
          <i className="google icon"></i>Sign In
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}
const mapSateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapSateToProps, { signIn, signOut })(GoogleAuth);

import { Component } from 'react';

export default class RouteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="docs-loading" role="alert">
          <p>Something went wrong loading this page.</p>
          <p>
            <a href={this.props.fallbackHref || '/'}>Go home</a>
            {' · '}
            <button type="button" onClick={() => window.location.reload()}>
              Reload
            </button>
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

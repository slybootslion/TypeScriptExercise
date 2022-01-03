import React from "react";

type FallbackRender = (props: { err: Error | null }) => React.ReactElement

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { err: Error | null }> {
  state = {err: null}

  static getDerivedStateFromError (err: Error) {
    return {err}
  }

  render () {
    const {err} = this.state
    const {fallbackRender, children} = this.props
    if (err) return fallbackRender({err})
    return children
  }
}

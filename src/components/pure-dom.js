import React from 'react'
import Placeholder from './placeholder'


class PureDOM extends React.Component {
  constructor(props) {
    super(props)
    this.name = props.name || "Unnamed"
  }

  render() {
    console.log(this, this.props.children)
    return (
      <div className={this.name}>
      { this.props.children || <Placeholder name={this.name}/> }
      </div>
    )
  }
}




export default PureDOM

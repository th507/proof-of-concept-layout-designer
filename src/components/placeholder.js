import React from 'react'

class Placeholder extends React.Component{
  constructor(props) {
    super(props)
    this.name = props?.name ?? "Placeholder"
  }

  process() {
    
  }

  render() {
    return (
      <div className="" data-style="droppable-placeholder"></div>
    )
  }

}


export default Placeholder


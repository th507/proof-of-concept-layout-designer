import React from 'react'

import Droppable from './droppable'


function Preview() {
  return (
  <div className="greater-grey container">
    <Droppable>
      <div id="target" className="container"></div>
    </Droppable>
  </div>
  )
}

export default Preview


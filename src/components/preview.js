import React from 'react'

import Droppable from './droppable'


function Preview() {
  return (
    <Droppable>
      <div id="target" className="grey container"></div>
    </Droppable>
  )
}

export default Preview


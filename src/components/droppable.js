import React from 'react'

import Scheme from '../scheme'

import globalObject from '../global'

const KEYPATH = "application/my-app"

class Droppable extends React.Component {
  constructor(props) {
    super(props)

    this.hasContent = props.hasContent
    
    this.dragover = this.dragover.bind(this)
    this.dragleave = this.dragleave.bind(this)
    this.drop = this.drop.bind(this)
    this.state = {
      content: this.hasContent ? this.props.children : null,
    }
  }
  createScheme() {
    return new Scheme({
      name: this.name,
      value: this,
      id: Math.random().toString().slice(2),
    })
  }
  
  dragover(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    ev.dataTransfer.dropEffect = "copyLink"

    ev.target.setAttribute('dragonto', 1)
    this.content = ''
  }
  dragleave(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    ev.dataTransfer.dropEffect = "none"    

    ev.target.removeAttribute('dragonto')
  }
  drop(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    ev.target.removeAttribute('dragonto')
    console.log("drop:target", ev.target)
    
    // Get the id of the target and add the moved element to the target's DOM
    //const name = ev.dataTransfer.getData(KEYPATH);
    //console.log('transferred data via drop', name)
    if (!globalObject.length) return
    
    // avoid cleanup during this stage, since `dragend` happens after `drop`

    var receivedNode = globalObject.at(-1)
    const fakeID = ev.dataTransfer.getData(KEYPATH)

    if (receivedNode.id !== fakeID) { return console.log('drag & drop item ID mismatch') }

    //receivedNode.parent = this.createScheme()
    if (!receivedNode.processed) receivedNode.processed += 1
    else { console.log('possible duplicate drag item') }

    //console.log('in drop, before setstate', this.state.content)
    //console.log('in drop2', this.props.children)

    // shameful hack to get the order right
    var contents = [<Droppable>{ receivedNode.value.toPreviewItem('moretext') }</Droppable>]
    if (ev.target.id === "target" && receivedNode.name === 'row') {
      contents.push(this.state.content)
    } else {
      contents.unshift(this.state.content)
    }
    this.setState({
      content: (
        <>{ contents }</>
      )
    })
  }

  render() {
    console.log("in render", this.state)
    var output = React.Children.map(this.props.children, child => {
      console.log("CCC", child)
      return React.cloneElement(child, {
        onDrop: this.drop, 
        onDragOver: this.dragover, 
        onDragLeave: this.dragleave,
        "data-style": "droppable-placeholder",
      }, this.state.content)
    })

    return output
  }
}

export default Droppable

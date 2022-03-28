import React from 'react'

import globalObject from '../global'

import Scheme from '../scheme'

import DemoTable from './demo-table'

// a factory function for Sidebar items
class Item extends React.Component {
  constructor(props) {
    super(props)

    this.name = props.name
    this.dragstart = this.dragstart.bind(this)
    this.dragend = this.dragend.bind(this)
  }

  render() {
    return (
    <button 
      draggable="true" 
      type="button" 
      className="btn btn-outline-secondary my-library-item"
      onDragStart={this.dragstart} 
      onDragEnd={this.dragend} >
      {this.name}
    </button>
    )
    /*return (
      <div draggable="true" className="card my-library-item" onDragStart={this.dragstart} onDragEnd={this.dragend}>
        <div className="card-body">
          <h5 className="card-title">{this.name}</h5>
          <p className="card-text"></p>
        </div>
      </div>  
    )*/
  }

  toPreviewItem(children = null) {
    return React.createElement('div',
      { 
        className: this.name,
      },
      children)
  }
  createScheme() {
    return new Scheme({
      name: this.name,
      value: this,
      id: Math.random().toString().slice(2),
    })
  }
  
  dragstart(ev) {
    ev.dataTransfer.effectAllowed = "copyLink"

    //console.log('dragstart cleanup: globalObject')
    for (var i = 0; i < globalObject.length; i++) {
      if (globalObject[i].processed !== 0) continue
      globalObject.splice(i, 1)
      i--
    }

    var scheme = this.createScheme()
    globalObject.push(scheme)
    ev.dataTransfer.setData(Sidebar.KEYPATH, scheme.id)

    //console.log('dragstart', globalObject)
  }
  dragend(ev) {
    if (!globalObject.length) return

    //console.log('dragend cleanup: globalObject', globalObject.at(-1))
    for (var i = 0; i < globalObject.length; i++) {
      if (globalObject[i].processed !== 0) continue
      globalObject.splice(i, 1)
      i--
    } 
  }
}

// this is how you could use to use 3rd party component
class DemoTableWrapper extends Item {
  toPreviewItem(children = null) {
    return <DemoTable />
  }
}

// Swift-like iterator for Number
class MyNumber extends Number {
  *[Symbol.iterator](i = 0) {
    while (i < this) yield ++i
  }
}

function ItemSection(props) {
  var {name, badge, badgetype='secondary'} = props
  return (
        <h5 className="card-title">{name}
          {badge ? <span className={ "badge bg-" + badgetype }>
            {badge}<span className="visually-hidden">generation</span>
              </span> : ''}
        </h5>
  )
}

class Sidebar extends React.Component {
  static KEYPATH = "application/my-app"
  static nameList = (variant = '') => ['row', `col${variant}`, ...[...new MyNumber(12)].map(i => `col${variant}-${i}`)]
   
  render() {
    return (
      <div className="sidebar">
        <ItemSection name="Responsive Layout" badge="Phone + PC" badgetype="danger" />
        { this.constructor.nameList('-sm').map((name, key) => <Item name={name} key={key} />) }

        <hr />
        <ItemSection name="Responsive Layout" badge="Phone + Pad + PC" badgetype="danger" />
        { this.constructor.nameList('-md').map((name, key) => <Item name={name} key={key} />) }

        <hr />
        <ItemSection name="Legacy Layout" badge="PC Only" />
        { this.constructor.nameList('').map((name, key) => <Item name={name} key={key} />) }

        <hr />
        <ItemSection name="3rd party Components" badge="Community Friendly" badgetype="success" />
        <DemoTableWrapper name="3rd party table" />
      </div>
    )
  }
}

export default Sidebar

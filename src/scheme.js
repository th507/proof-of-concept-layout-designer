/*
{
row:[col-3, col-9],
row:[col-4: sidebar, col-8: form],
}


enum RootOrLeaf {
  case .root
  case .leat
}

struc Node {
  name: String
  value: React.Component
  children: [Node]?
  parent: Node?
  id: String
  processed: Int
  
  get acceptSiblings: Bool
  get type: RootOrLeaf
}
 */

class Scheme {
  static regExpForColumn = /^col-(?<width>(\d){1,2})/dg
  constructor(object) {
    this.name = object.name
    this.value = object.value
    this.children = object.children ?? []
    this.id = object.id ?? ""
    this.parent = this
    this.processed = 0
  }
  get type() {
    switch (true) {
      case 'row' === this.name:
      case this.constructor.regExpForColumn.test(this.name):
        return 'root'
      default:
        return 'leaf'
    }
  }
  get acceptSiblings() { 
    switch (true) {
      case 'row' === this.name:
        var width = this.children.reduce((a, b) => {
          const found = this.constructor.regExpForColumn.exec(b.name)
          const width = found?.group.width ?? 0
          return a + width 
        }, 0)
        if (width >= 12) return false
        return true
      case this.constructor.regExpForColumn.test(this.name):
        if (this.children?.length === 1 && this.children[0].name === 'row') return false
        return true
      default:
        return true
    }
  }
}

function kahn(o) {
	var arr = o.concat()
	var result = []
	while (arr.length) {
		var node = arr.pop()
		result.push(node)
		for (var i = 0; i < arr.length; i++) {
			var item = arr[i]
			if (item.parent === node) {
				result.splice(result.length - 1, 0, item)
			}
		}
	}
	return result
}

function toTree(o) {
	var arr = kahn(o)
	outer: for (var i = 0; i < arr.length; i++) {
		var node = arr[i]
		for (var j = i + 1; j < arr.length; j++) {
			if (node.parent === arr[j]) {
				arr[j].children.push(node)
				arr.splice(i, 1)
				i--
				continue outer
			}
		}
	}
	return arr
} 

export default Scheme
export { toTree }
